<?php

namespace Tests\Feature;

use App\Models\ContactMessage;
use App\Models\Experience;
use App\Models\Media;
use App\Models\Profile;
use App\Models\Project;
use App\Models\User;
use Illuminate\Contracts\Filesystem\Filesystem;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;
use Mockery;
use Tests\TestCase;

class AdminPanelTest extends TestCase
{
    use RefreshDatabase;

    protected User $admin;

    protected function setUp(): void
    {
        parent::setUp();

        $this->admin = User::create([
            'name' => 'Bana Budhiana',
            'email' => 'admin@bbudhiana.com',
            'password' => bcrypt('AdminPassword123!'),
        ]);

        Profile::create([
            'display_name' => 'Bana Budhiana',
            'headline' => 'Senior Software and AI Engineer',
            'hero_summary' => 'Hero text',
            'about_markdown' => 'About text',
            'status' => 'draft',
        ]);
    }

    public function test_unauthenticated_user_cannot_access_admin_routes(): void
    {
        $response = $this->get('/admin');
        $response->assertRedirect('/login');

        $profileResponse = $this->get('/admin/profile');
        $profileResponse->assertRedirect('/login');

        $projectsResponse = $this->get('/admin/projects');
        $projectsResponse->assertRedirect('/login');
    }

    public function test_authenticated_admin_can_access_dashboard(): void
    {
        $response = $this->actingAs($this->admin)->get('/admin');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Admin/Dashboard')
            ->has('stats')
        );
    }

    public function test_admin_can_update_profile_and_creates_revision(): void
    {
        $response = $this->actingAs($this->admin)->put('/admin/profile', [
            'display_name' => 'Bana Budhiana Updated',
            'headline' => 'Senior Software and AI Engineer',
            'hero_summary' => 'Updated hero summary',
            'about_markdown' => 'Updated about text',
            'location' => 'Jakarta',
            'status' => 'published',
        ]);

        $response->assertSessionHasNoErrors();
        $this->assertDatabaseHas('profiles', [
            'display_name' => 'Bana Budhiana Updated',
            'status' => 'published',
        ]);

        $this->assertDatabaseHas('content_revisions', [
            'entity_type' => 'profile',
            'editor_id' => $this->admin->id,
        ]);
    }

    public function test_admin_can_create_and_toggle_experience(): void
    {
        $response = $this->actingAs($this->admin)->post('/admin/experiences', [
            'title' => 'AI Consultant',
            'organization' => 'Tech Corp',
            'start_year' => 2025,
            'is_current' => false,
            'end_year' => 2026,
            'status' => 'draft',
            'sort_order' => 1,
        ]);

        $response->assertSessionHasNoErrors();
        $exp = Experience::where('title', 'AI Consultant')->first();
        $this->assertNotNull($exp);
        $this->assertEquals('draft', $exp->status);

        // Toggle to publish
        $toggleResponse = $this->actingAs($this->admin)->post("/admin/experiences/{$exp->id}/toggle-publish");
        $toggleResponse->assertSessionHasNoErrors();
        $this->assertEquals('published', $exp->fresh()->status);
    }

    public function test_admin_can_create_and_preview_draft_project(): void
    {
        $response = $this->actingAs($this->admin)->post('/admin/projects', [
            'title' => 'Sistem RAG Enterprise',
            'slug' => 'sistem-rag-enterprise',
            'excerpt' => 'Excerpt sistem RAG',
            'category' => 'AI Engineering',
            'role_summary' => 'Lead AI Engineer',
            'problem_markdown' => 'Problem text',
            'solution_markdown' => 'Solution text',
            'status' => 'draft',
            'featured' => false,
            'sort_order' => 1,
        ]);

        $response->assertSessionHasNoErrors();
        $project = Project::where('slug', 'sistem-rag-enterprise')->first();
        $this->assertNotNull($project);

        // Public access to draft gives 404
        $this->get('/projects/sistem-rag-enterprise')->assertStatus(404);

        // Admin private preview gives 200
        $previewResponse = $this->actingAs($this->admin)->get("/admin/projects/{$project->id}/preview");
        $previewResponse->assertStatus(200);
        $previewResponse->assertInertia(fn (Assert $page) => $page
            ->component('Admin/Projects/Preview')
            ->where('project.slug', 'sistem-rag-enterprise')
        );
    }

    public function test_media_upload_rejects_unauthorized_mimetypes(): void
    {
        Storage::fake('public');

        // SVG upload should be rejected per PRD 12
        $svgFile = UploadedFile::fake()->create('icon.svg', 100, 'image/svg+xml');

        $response = $this->actingAs($this->admin)->post('/admin/media/upload', [
            'file' => $svgFile,
        ]);

        $response->assertSessionHasErrors(['file']);
    }

    public function test_media_upload_accepts_valid_pdf_and_image(): void
    {
        Storage::fake('public');

        $pdfFile = UploadedFile::fake()->create('cv.pdf', 500, 'application/pdf');

        $response = $this->actingAs($this->admin)->post('/admin/media/upload', [
            'file' => $pdfFile,
            'alt_text' => 'Curriculum Vitae',
        ]);

        $response->assertSessionHasNoErrors();
        $this->assertDatabaseHas('media', [
            'mime_type' => 'application/pdf',
            'original_name' => 'cv.pdf',
        ]);
    }

    public function test_media_upload_reports_a_friendly_error_when_storage_is_not_writable(): void
    {
        $disk = Mockery::mock(Filesystem::class);
        $disk->shouldReceive('putFileAs')->andReturn(false);
        $disk->shouldReceive('exists')->andReturn(false);
        Storage::shouldReceive('disk')->with('public')->andReturn($disk);

        $response = $this->actingAs($this->admin)->post('/admin/media/upload', [
            'file' => UploadedFile::fake()->create('photo.jpg', 500, 'image/jpeg'),
        ]);

        $response->assertSessionHasErrors('file');
        $response->assertStatus(302);
        $this->assertDatabaseCount('media', 0);
    }

    public function test_media_upload_reports_a_friendly_error_when_storage_throws(): void
    {
        $disk = Mockery::mock(Filesystem::class);
        $disk->shouldReceive('putFileAs')->andThrow(new \RuntimeException('Permission denied'));
        Storage::shouldReceive('disk')->with('public')->andReturn($disk);

        $response = $this->actingAs($this->admin)->post('/admin/media/upload', [
            'file' => UploadedFile::fake()->create('photo.jpg', 500, 'image/jpeg'),
        ]);

        $response->assertSessionHasErrors('file');
        $response->assertStatus(302);
        $this->assertDatabaseCount('media', 0);
    }

    public function test_media_upload_converts_a_photo_to_webp_with_the_correct_orientation(): void
    {
        Storage::fake('public');

        // Foto potret dengan EXIF Orientation 6: pixel mentah landscape,
        // tapi harus disimpan tegak (dimensi tertukar).
        $image = imagecreatetruecolor(600, 400);
        imagefill($image, 0, 0, imagecolorallocate($image, 15, 118, 110));
        for ($i = 0; $i < 8; $i++) {
            imagefilledrectangle(
                $image,
                40 + $i * 70,
                120,
                90 + $i * 70,
                260,
                imagecolorallocate($image, 255, 255, 255)
            );
        }
        ob_start();
        imagejpeg($image, null, 92);
        imagedestroy($image);
        $jpeg = ob_get_clean();

        $tiff = 'II'.pack('v', 42).pack('V', 8)
            .pack('v', 1)
            .pack('v', 0x0112).pack('v', 3).pack('V', 1).pack('v', 6).pack('v', 0)
            .pack('V', 0);
        $payload = "Exif\0\0".$tiff;
        $jpeg = "\xFF\xD8"."\xFF\xE1".pack('n', strlen($payload) + 2).$payload.substr($jpeg, 2);

        $response = $this->actingAs($this->admin)->post('/admin/media/upload', [
            'file' => UploadedFile::fake()->createWithContent('photo.jpg', $jpeg),
        ]);

        $response->assertSessionHasNoErrors();

        $media = Media::firstWhere('mime_type', 'image/webp');

        $this->assertNotNull($media, 'Foto seharusnya dikonversi ke WebP.');
        $this->assertSame(400, $media->width, 'Lebar harus tertukar karena orientasi 6.');
        $this->assertSame(600, $media->height, 'Tinggi harus tertukar karena orientasi 6.');
        $this->assertTrue(Storage::disk('public')->exists($media->path));
    }

    public function test_media_cannot_be_deleted_if_used_in_profile_or_project(): void
    {
        Storage::fake('public');

        $media = Media::create([
            'disk' => 'public',
            'path' => 'uploads/test.jpg',
            'mime_type' => 'image/jpeg',
            'bytes' => 1024,
            'original_name' => 'test.jpg',
        ]);

        // Link to profile as portrait
        $profile = Profile::first();
        $profile->update(['portrait_media_id' => $media->id]);

        $response = $this->actingAs($this->admin)->delete("/admin/media/{$media->id}");
        $response->assertSessionHasErrors(['error']);
        $this->assertDatabaseHas('media', ['id' => $media->id]);
    }

    public function test_admin_can_manage_contact_messages(): void
    {
        $message = ContactMessage::create([
            'name' => 'Calon Klien',
            'email' => 'client@corp.com',
            'purpose' => 'cooperation',
            'message' => 'Halo ingin mendiskusikan penawaran proyek arsitektur sistem.',
            'consent_at' => now(),
            'submission_token' => 'token-abc',
            'status' => 'unread',
        ]);

        // Detail view marks as read
        $this->actingAs($this->admin)->get("/admin/messages/{$message->id}")->assertStatus(200);
        $this->assertEquals('read', $message->fresh()->status);

        // Update status to archived
        $this->actingAs($this->admin)->patch("/admin/messages/{$message->id}/status", [
            'status' => 'archived',
        ])->assertSessionHasNoErrors();
        $this->assertEquals('archived', $message->fresh()->status);

        // Delete message
        $this->actingAs($this->admin)->delete("/admin/messages/{$message->id}")->assertRedirect('/admin/messages');
        $this->assertDatabaseMissing('contact_messages', ['id' => $message->id]);
    }
}
