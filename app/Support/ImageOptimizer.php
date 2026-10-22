<?php

namespace App\Support;

use Illuminate\Support\Facades\Storage;

/**
 * Converts raster images to WebP so the public site stops shipping
 * multi-megabyte PNGs (the infographics were 1.6-2.4 MB each).
 *
 * Photo orientation is taken from the EXIF "Orientation" tag and baked
 * into the pixels, so the result looks exactly like the source and no
 * browser can rotate it a second time (the re-encoded file carries no EXIF).
 */
class ImageOptimizer
{
    public const QUALITY = 85;

    /**
     * @return array{path: string, mime: string, bytes: int, width: int, height: int}|null
     */
    public static function optimize(
        string $absolutePath,
        string $disk = 'public',
        string $relativePath = '',
        ?string $targetRelative = null
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
            $source = self::applyExifOrientation($source, $orientation);

            // A 90/270 rotation swaps the dimensions.
            [$width, $height] = [$height, $width];
        }

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

        imagealphablending($source, false);
        imagesavealpha($source, true);

        if (! imagewebp($source, $targetAbsolute, self::QUALITY)) {
            imagedestroy($source);

            return null;
        }

        imagedestroy($source);

        $originalBytes = (int) @filesize($absolutePath);
        $optimizedBytes = (int) @filesize($targetAbsolute);

        // Keep the original when WebP does not actually pay off.
        if ($optimizedBytes >= $originalBytes) {
            @unlink($targetAbsolute);

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
        return match ($orientation) {
            2 => imageflip($image, IMG_FLIP_HORIZONTAL),
            3 => imagerotate($image, 180, 0),
            4 => imageflip($image, IMG_FLIP_VERTICAL),
            5 => imagerotate(imageflip($image, IMG_FLIP_HORIZONTAL), -90, 0),
            6 => imagerotate($image, -90, 0),
            7 => imagerotate(imageflip($image, IMG_FLIP_HORIZONTAL), 90, 0),
            8 => imagerotate($image, 90, 0),
            default => $image,
        };
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

    private static function load(string $path, int $type): ?\GdImage
    {
        $image = match ($type) {
            IMAGETYPE_JPEG => @imagecreatefromjpeg($path),
            IMAGETYPE_PNG => @imagecreatefrompng($path),
            IMAGETYPE_WEBP => @imagecreatefromwebp($path),
            default => null,
        };

        return $image instanceof \GdImage ? $image : null;
    }
}
