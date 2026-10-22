<?php

namespace Tests\Unit;

use App\Support\ImageOptimizer;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ImageOptimizerTest extends TestCase
{
    private function writeInfographicPng(string $path, int $width = 1200, int $height = 800): int
    {
        $image = imagecreatetruecolor($width, $height);
        imagefill($image, 0, 0, imagecolorallocate($image, 15, 118, 110));

        for ($i = 0; $i < 6; $i++) {
            imagefilledrectangle(
                $image,
                80 + $i * 180,
                240,
                220 + $i * 180,
                320,
                imagecolorallocate($image, 255, 255, 255)
            );
        }

        ob_start();
        imagepng($image);
        imagedestroy($image);
        $bytes = ob_get_clean();

        Storage::disk('public')->put($path, $bytes);

        return strlen($bytes);
    }

    /**
     * Sisipkan APP1 EXIF berisi Orientation ke dalam JPEG.
     */
    private function jpegWithOrientation(int $orientation, int $width = 120, int $height = 60): string
    {
        $image = imagecreatetruecolor($width, $height);
        imagefill($image, 0, 0, imagecolorallocate($image, 200, 30, 30));
        imagefilledrectangle($image, 0, 0, $width - 1, $height - 1, imagecolorallocate($image, 20, 90, 220));

        ob_start();
        imagejpeg($image, null, 92);
        imagedestroy($image);
        $jpeg = ob_get_clean();

        $tiff = 'II'.pack('v', 42).pack('V', 8)
            .pack('v', 1)
            .pack('v', 0x0112).pack('v', 3).pack('V', 1).pack('v', $orientation).pack('v', 0)
            .pack('V', 0);

        $payload = "Exif\0\0".$tiff;
        $app1 = "\xFF\xE1".pack('n', strlen($payload) + 2).$payload;

        return "\xFF\xD8".$app1.substr($jpeg, 2);
    }

    public function test_it_converts_a_heavy_png_into_a_smaller_webp(): void
    {
        Storage::fake('public');

        $path = 'uploads/infographic.png';
        $originalBytes = $this->writeInfographicPng($path);

        $optimized = ImageOptimizer::optimize(
            Storage::disk('public')->path($path),
            'public',
            $path
        );

        $this->assertNotNull($optimized, 'PNG besar seharusnya bisa dikonversi ke WebP.');
        $this->assertSame('uploads/infographic.webp', $optimized['path']);
        $this->assertSame('image/webp', $optimized['mime']);
        $this->assertSame(1200, $optimized['width']);
        $this->assertSame(800, $optimized['height']);
        $this->assertLessThan($originalBytes, $optimized['bytes']);
        $this->assertTrue(Storage::disk('public')->exists('uploads/infographic.webp'));
    }

    public function test_it_never_leaves_a_stray_webp_when_conversion_is_rejected(): void
    {
        Storage::fake('public');

        $path = 'uploads/tiny.png';
        $this->writeInfographicPng($path, 8, 8);

        $optimized = ImageOptimizer::optimize(
            Storage::disk('public')->path($path),
            'public',
            $path
        );

        if ($optimized === null) {
            $this->assertFalse(
                Storage::disk('public')->exists('uploads/tiny.webp'),
                'Berkas .webp yang lebih besar harus dihapus, bukan ditinggalkan.'
            );
        }

        $this->assertTrue(Storage::disk('public')->exists($path));
    }

    public function test_it_reads_the_exif_orientation(): void
    {
        Storage::fake('public');

        $path = 'uploads/photo.jpg';
        Storage::disk('public')->put($path, $this->jpegWithOrientation(6));

        $this->assertSame(6, ImageOptimizer::exifOrientation(Storage::disk('public')->path($path)));
    }

    public function test_a_rotated_photo_is_stored_upright_with_swapped_dimensions(): void
    {
        Storage::fake('public');

        $path = 'uploads/photo.jpg';
        Storage::disk('public')->put($path, $this->jpegWithOrientation(6, 120, 60));

        $optimized = ImageOptimizer::optimize(
            Storage::disk('public')->path($path),
            'public',
            $path
        );

        $this->assertNotNull($optimized, 'JPEG dengan EXIF orientation harus dikonversi.');
        $this->assertSame(60, $optimized['width'], 'Lebar harus tertukar setelah rotasi 90 derajat.');
        $this->assertSame(120, $optimized['height'], 'Tinggi harus tertukar setelah rotasi 90 derajat.');

        $webp = Storage::disk('public')->get($optimized['path']);
        $decoded = imagecreatefromstring($webp);

        $this->assertNotFalse($decoded);
        $this->assertSame(60, imagesx($decoded));
        $this->assertSame(120, imagesy($decoded));

        // Piksel biru yang berada di kiri atas pada gambar asli harus tetap
        // berada di kiri atas setelah orientasi dinormalkan.
        $color = imagecolorat($decoded, 1, 1);
        $channels = [($color >> 16) & 0xFF, ($color >> 8) & 0xFF, $color & 0xFF];

        foreach ([20, 90, 220] as $index => $expected) {
            $this->assertLessThanOrEqual(
                6,
                abs($channels[$index] - $expected),
                'Kanal warna piksel harus tetap di posisi yang sama setelah orientasi dinormalkan.'
            );
        }
    }
}
