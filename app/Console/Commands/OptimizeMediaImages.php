<?php

namespace App\Console\Commands;

use App\Models\Media;
use App\Support\ImageOptimizer;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class OptimizeMediaImages extends Command
{
    protected $signature = 'media:optimize
                            {--source= : Folder berisi file asli (dipakai untuk memulihkan orientasi foto)}';

    protected $description = 'Convert existing PNG/JPEG media to WebP to cut page weight';

    public function handle(): int
    {
        $source = $this->option('source');
        $media = Media::whereIn('mime_type', ['image/png', 'image/jpeg', 'image/webp'])->get();

        if ($media->isEmpty()) {
            $this->info('Tidak ada media gambar untuk dioptimasi.');

            return self::SUCCESS;
        }

        $converted = 0;
        $savedBytes = 0;
        $skipped = 0;

        foreach ($media as $item) {
            $disk = Storage::disk($item->disk);
            $target = $this->targetPath($item);
            $origin = $this->originPath($item, $source);

            if ($origin === null) {
                $skipped++;
                $label = $item->original_name ?? $item->path;
                $this->line("Dilewati (file asli tidak ditemukan): {$label}");

                continue;
            }

            $optimized = ImageOptimizer::optimize(
                $origin['absolute'],
                $item->disk,
                $origin['relative'],
                $target
            );

            if ($optimized === null) {
                $skipped++;
                $this->line("Dilewati (WebP tidak lebih kecil): {$item->path}");

                continue;
            }

            $originalBytes = (int) $item->bytes;
            $item->update([
                'path' => $optimized['path'],
                'mime_type' => $optimized['mime'],
                'bytes' => $optimized['bytes'],
                'width' => $optimized['width'],
                'height' => $optimized['height'],
            ]);

            $converted++;
            $savedBytes += max(0, $originalBytes - $optimized['bytes']);
        }

        $this->info("{$converted} berkas dikonversi ke WebP, hemat ~".number_format($savedBytes / 1024).' KB.');
        $this->info("{$skipped} berkas dilewati (tidak ada file asli atau WebP tidak lebih kecil).");

        return self::SUCCESS;
    }

    /**
     * Path relatif tujuan: basis nama yang sama dengan file saat ini.
     */
    private function targetPath(Media $item): string
    {
        return preg_replace('/\.[^.]+$/', '.webp', $item->path) ?? $item->path;
    }

    /**
     * @return array{absolute: string, relative: string}|null
     */
    private function originPath(Media $item, ?string $source): ?array
    {
        $disk = Storage::disk($item->disk);

        if ($source !== null) {
            $name = $item->original_name;

            if ($name === null) {
                return null;
            }

            foreach (glob(rtrim($source, '/').'/*') ?: [] as $candidate) {
                if (strcasecmp(basename($candidate), $name) === 0) {
                    return ['absolute' => $candidate, 'relative' => $item->path];
                }
            }

            return null;
        }

        // Tanpa --source: pakai file asli yang tersimpan di samping hasil WebP.
        $candidate = preg_replace('/\.[^.]+$/', '', $item->path);
        $original = null;

        foreach (['.png', '.jpg', '.jpeg', '.JPG', '.PNG', '.JPEG'] as $extension) {
            if ($disk->exists($candidate.$extension)) {
                $original = $candidate.$extension;

                break;
            }
        }

        if ($original === null) {
            return $disk->exists($item->path)
                ? ['absolute' => $disk->path($item->path), 'relative' => $item->path]
                : null;
        }

        return ['absolute' => $disk->path($original), 'relative' => $original];
    }
}
