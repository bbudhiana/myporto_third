<?php

namespace App\Support;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

/**
 * Converts raster images to WebP so the public site stops shipping
 * multi-megabyte PNGs (the infographics were 1.6-2.4 MB each).
 *
 * The conversion is strictly optional: when the server lacks GD/WebP, or
 * anything goes wrong, the original upload is kept and the upload still
 * succeeds. Photo orientation is taken from the EXIF "Orientation" tag and
 * baked into the pixels, so the result looks exactly like the source and no
 * browser can rotate it a second time (the re-encoded file carries no EXIF).
 */
class ImageOptimizer
{
    public const QUALITY = 85;

    /** Dimensi terpanjang (px) sebelum gambar di-downscale. */
    public const MAX_DIMENSION = 3000;

    /**
     * Fungsi GD yang wajib ada agar konversi bisa berjalan.
     *
     * @var list<string>
     */
    private const REQUIRED_FUNCTIONS = [
        'imagewebp',
        'imagecreatefromjpeg',
        'imagecreatefrompng',
        'imagerotate',
        'imageflip',
    ];

    /**
     * Fungsi GD yang tidak tersedia di environment ini.
     *
     * @return list<string>
     */
    public static function missingFunctions(): array
    {
        return array_values(array_filter(
            self::REQUIRED_FUNCTIONS,
            static fn (string $function): bool => ! function_exists($function)
        ));
    }

    public static function isSupported(): bool
    {
        return extension_loaded('gd') && self::missingFunctions() === [];
    }

    /**
     * @return array{path: string, mime: string, bytes: int, width: int, height: int}|null
     */
    public static function optimize(
        string $absolutePath,
        string $disk = 'public',
        string $relativePath = '',
        ?string $targetRelative = null
    ): ?array {
        if (! self::isSupported()) {
            Log::warning('Optimasi media dilewati: ekstensi GD/WebP tidak tersedia di PHP server.', [
                'missing' => self::missingFunctions(),
            ]);

            return null;
        }

        try {
            return self::convert($absolutePath, $disk, $relativePath, $targetRelative);
        } catch (\Throwable $e) {
            Log::warning('Optimasi media dilewati: '.$e->getMessage(), [
                'path' => $absolutePath,
            ]);

            return null;
        }
    }

    /**
     * @return array{path: string, mime: string, bytes: int, width: int, height: int}|null
     */
    private static function convert(
        string $absolutePath,
        string $disk,
        string $relativePath,
        ?string $targetRelative
    ): ?array {
        $info = @getimagesize($absolutePath);

        if ($info === false) {
            return null;
        }

        [$width, $height] = $info;
        $source = self::load($absolutePath, $info[2]);

        if ($source === null) {
            return null;
        }

        $orientation = self::exifOrientation($absolutePath);

        if ($orientation !== 1) {
            $rotated = self::applyExifOrientation($source, $orientation);

            if ($rotated instanceof \GdImage) {
                imagedestroy($source);
                $source = $rotated;

                // A 90/270 rotation swaps the dimensions.
                [$width, $height] = [$height, $width];
            }
        }

        $source = self::downscale($source, self::MAX_DIMENSION);

        $width = imagesx($source);
        $height = imagesy($source);

        $target = $targetRelative ?? preg_replace('/\.(png|jpe?g|webp)$/i', '.webp', $relativePath ?: $absolutePath);

        if ($target === null) {
            imagedestroy($source);

            return null;
        }

        $targetAbsolute = Storage::disk($disk)->path($target);

        // Jangan menimpa file sumber dengan dirinya sendiri.
        if ($targetAbsolute === $absolutePath) {
            imagedestroy($source);

            return null;
        }

        // Tulis ke berkas sementara lalu rename: berkas milik user lain masih
        // bisa diganti selama foldernya writable, dan tidak ada berkas
        // setengah jadi yang tertinggal.
        $temporary = $targetAbsolute.'.tmp';
        @unlink($temporary);

        imagealphablending($source, false);
        imagesavealpha($source, true);

        $written = @imagewebp($source, $temporary, self::QUALITY);
        imagedestroy($source);

        if ($written === false || ! is_file($temporary)) {
            @unlink($temporary);

            return null;
        }

        $originalBytes = (int) @filesize($absolutePath);
        $optimizedBytes = (int) @filesize($temporary);

        // Keep the original when WebP does not actually pay off.
        if ($optimizedBytes >= $originalBytes) {
            @unlink($temporary);

            return null;
        }

        if (! @rename($temporary, $targetAbsolute)) {
            @unlink($temporary);

            return null;
        }

        return [
            'path' => $target,
            'mime' => 'image/webp',
            'bytes' => $optimizedBytes,
            'width' => $width,
            'height' => $height,
        ];
    }

    /**
     * Rotate/flip the pixels so the image matches the orientation the
     * camera intended (EXIF Orientation values 2-8).
     */
    public static function applyExifOrientation(\GdImage $image, int $orientation): \GdImage
    {
        $result = match ($orientation) {
            2 => imageflip($image, IMG_FLIP_HORIZONTAL),
            3 => imagerotate($image, 180, 0),
            4 => imageflip($image, IMG_FLIP_VERTICAL),
            5 => imagerotate(imageflip($image, IMG_FLIP_HORIZONTAL), -90, 0),
            6 => imagerotate($image, -90, 0),
            7 => imagerotate(imageflip($image, IMG_FLIP_HORIZONTAL), 90, 0),
            8 => imagerotate($image, 90, 0),
            default => $image,
        };

        return $result instanceof \GdImage ? $result : $image;
    }

    /**
     * Read the EXIF orientation of a file (1 when there is none).
     */
    public static function exifOrientation(string $absolutePath): int
    {
        if (! function_exists('exif_read_data')) {
            return 1;
        }

        $exif = @exif_read_data($absolutePath);

        if (! is_array($exif) || ! isset($exif['Orientation']) || ! is_numeric($exif['Orientation'])) {
            return 1;
        }

        $orientation = (int) $exif['Orientation'];

        return $orientation >= 1 && $orientation <= 8 ? $orientation : 1;
    }

    /**
     * Perkecil gambar besar supaya hemat memori & waktu di server.
     */
    private static function downscale(\GdImage $image, int $maxDimension): \GdImage
    {
        $width = imagesx($image);
        $height = imagesy($image);
        $largest = max($width, $height);

        if ($largest <= $maxDimension) {
            return $image;
        }

        $ratio = $maxDimension / $largest;
        $newWidth = max(1, (int) round($width * $ratio));
        $newHeight = max(1, (int) round($height * $ratio));

        $resized = imagecreatetruecolor($newWidth, $newHeight);
        imagealphablending($resized, false);
        imagesavealpha($resized, true);
        imagecopyresampled($resized, $image, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);
        imagedestroy($image);

        return $resized;
    }

    private static function load(string $path, int $type): ?\GdImage
    {
        $image = match ($type) {
            IMAGETYPE_JPEG => @imagecreatefromjpeg($path),
            IMAGETYPE_PNG => @imagecreatefrompng($path),
            IMAGETYPE_WEBP => function_exists('imagecreatefromwebp') ? @imagecreatefromwebp($path) : null,
            default => null,
        };

        return $image instanceof \GdImage ? $image : null;
    }
}
