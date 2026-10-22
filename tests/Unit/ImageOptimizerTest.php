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

    public function test_a_corrupted_file_returns_null_instead_of_throwing(): void
    {
        Storage::fake('public');

        $path = 'uploads/broken.jpg';
        Storage::disk('public')->put($path, "\xFF\xD8 broken data \xFF\xD9");

        $this->assertNull(ImageOptimizer::optimize(
            Storage::disk('public')->path($path),
            'public',
            $path
        ));
    }

    public function test_a_non_image_file_returns_null_instead_of_throwing(): void
    {
        Storage::fake('public');

        $path = 'uploads/document.pdf';
        Storage::disk('public')->put($path, '%PDF-1.4 pretend this is a pdf');

        $this->assertNull(ImageOptimizer::optimize(
            Storage::disk('public')->path($path),
            'public',
            $path
        ));
    }

    public function test_large_images_are_downscaled_to_the_dimension_limit(): void
    {
        Storage::fake('public');

        $path = 'uploads/huge.png';
        $this->writeInfographicPng($path, 4000, 3000);

        $optimized = ImageOptimizer::optimize(
            Storage::disk('public')->path($path),
            'public',
            $path
        );

        $this->assertNotNull($optimized);
        $this->assertLessThanOrEqual(
            ImageOptimizer::MAX_DIMENSION,
            max($optimized['width'], $optimized['height']),
            'Gambar besar harus diperkecil agar hemat memori di server.'
        );
    }

    public function test_it_replaces_a_file_owned_by_another_user(): void
    {
        Storage::fake('public');

        $path = 'uploads/foreign.png';
        $this->writeInfographicPng($path);

        // Berkas hasil milik "user lain" dan hanya bisa dibaca.
        $target = Storage::disk('public')->path('uploads/foreign.webp');
        file_put_contents($target, 'old content');
        chmod($target, 0444);

        $optimized = ImageOptimizer::optimize(
            Storage::disk('public')->path($path),
            'public',
            $path
        );

        $this->assertNotNull($optimized, 'Berkas milik user lain harus tetap bisa diganti.');
        $this->assertSame('uploads/foreign.webp', $optimized['path']);
        $this->assertNotSame('old content', Storage::disk('public')->get('uploads/foreign.webp'));
        $this->assertFalse(
            Storage::disk('public')->exists('uploads/foreign.webp.tmp'),
            'Berkas sementara harus dibersihkan.'
        );
    }

    public function test_it_returns_null_when_gd_is_unavailable(): void
    {
        // Simulasikan PHP tanpa GD: jalankan subprocess dengan disable_functions.
        $script = <<<'PHP'
require getcwd().'/vendor/autoload.php';
$app = require_once getcwd().'/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();
$missing = App\Support\ImageOptimizer::missingFunctions();
$result = App\Support\ImageOptimizer::optimize('/tmp/does-not-matter.jpg');
echo json_encode(['missing' => $missing, 'result' => $result]);
PHP;

        $command = sprintf(
            'php -d disable_functions=imagewebp,imagecreatefromjpeg,imagecreatefrompng,imagerotate,imageflip -r %s',
            escapeshellarg($script)
        );

        $output = shell_exec($command.' 2>&1');

        $this->assertIsString($output, 'Subprocess harus mengembalikan output.');
        $this->assertStringNotContainsString('Fatal error', $output, 'Tanpa GD, kode tidak boleh fatal.');
        $this->assertStringNotContainsString('undefined function', $output, 'Fungsi GD tidak boleh dipanggil tanpa guard.');

        $decoded = json_decode(trim($output), true);

        $this->assertIsArray($decoded, 'Output harus JSON: '.$output);
        $this->assertNotEmpty($decoded['missing'], 'Fungsi GD yang dimatikan harus terdeteksi.');
        $this->assertNull($decoded['result'], 'Optimasi harus dilewati, bukan error.');
    }
}
