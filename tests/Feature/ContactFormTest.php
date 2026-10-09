<?php

namespace Tests\Feature;

use App\Jobs\SendContactNotificationJob;
use App\Models\ContactMessage;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Queue;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Tests\TestCase;

class ContactFormTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        RateLimiter::clear('contact_ip:' . hash('sha256', '127.0.0.1'));
        RateLimiter::clear('contact_email:' . hash('sha256', 'john@example.com'));
    }

    public function test_valid_contact_form_submission_stores_message_and_dispatches_job(): void
    {
        Queue::fake();

        $token = (string) Str::uuid();

        $response = $this->post('/contact', [
            'name' => 'Budi Santoso',
            'email' => 'budi@example.com',
            'company' => 'PT Teknologi Indonesia',
            'purpose' => 'cooperation',
            'message' => 'Halo Pak Bana, kami tertarik untuk mendiskusikan implementasi solusi AI pada sistem kami.',
            'consent' => true,
            'submission_token' => $token,
        ]);

        $response->assertSessionHasNoErrors();
        $response->assertRedirect();

        $this->assertDatabaseHas('contact_messages', [
            'name' => 'Budi Santoso',
            'email' => 'budi@example.com',
            'company' => 'PT Teknologi Indonesia',
            'purpose' => 'cooperation',
            'submission_token' => $token,
            'status' => 'unread',
            'notification_status' => 'pending',
        ]);

        Queue::assertPushed(SendContactNotificationJob::class);
    }

    public function test_honeypot_field_submission_is_rejected_as_spam(): void
    {
        Queue::fake();

        $response = $this->post('/contact', [
            'name' => 'Spam Bot',
            'email' => 'bot@spammer.com',
            'purpose' => 'cooperation',
            'message' => 'Penawaran promosi produk yang sangat menguntungkan Anda saat ini.',
            'consent' => true,
            'submission_token' => (string) Str::uuid(),
            'website_url' => 'https://spam-site.com', // Bot filled honeypot
        ]);

        $response->assertSessionHasErrors(['website_url']);
        $this->assertDatabaseMissing('contact_messages', [
            'email' => 'bot@spammer.com',
        ]);
        Queue::assertNothingPushed();
    }

    public function test_submission_fails_when_required_fields_are_missing(): void
    {
        $response = $this->post('/contact', []);

        $response->assertSessionHasErrors(['name', 'email', 'purpose', 'message', 'consent', 'submission_token']);
    }

    public function test_submission_fails_when_message_is_less_than_20_chars(): void
    {
        $response = $this->post('/contact', [
            'name' => 'Budi',
            'email' => 'budi@example.com',
            'purpose' => 'discussion',
            'message' => 'Terlalu pendek',
            'consent' => true,
            'submission_token' => (string) Str::uuid(),
        ]);

        $response->assertSessionHasErrors(['message']);
    }

    public function test_duplicate_submission_token_is_idempotent_and_does_not_duplicate_message(): void
    {
        Queue::fake();

        $token = (string) Str::uuid();

        ContactMessage::create([
            'name' => 'Ahmad',
            'email' => 'ahmad@example.com',
            'purpose' => 'opportunity',
            'message' => 'Pesan pertama yang sudah tersimpan pada sistem sebelumnya.',
            'consent_at' => now(),
            'privacy_notice_version' => '1.0',
            'submission_token' => $token,
            'status' => 'unread',
            'notification_status' => 'pending',
        ]);

        // Second attempt with exact same submission token (retry / double-click)
        $response = $this->post('/contact', [
            'name' => 'Ahmad',
            'email' => 'ahmad@example.com',
            'purpose' => 'opportunity',
            'message' => 'Pesan pertama yang sudah tersimpan pada sistem sebelumnya.',
            'consent' => true,
            'submission_token' => $token,
        ]);

        $response->assertSessionHasNoErrors();
        $this->assertEquals(1, ContactMessage::where('submission_token', $token)->count());
        Queue::assertNothingPushed();
    }

    public function test_rate_limiter_blocks_more_than_5_submissions_in_window(): void
    {
        Queue::fake();

        for ($i = 0; $i < 5; $i++) {
            $this->post('/contact', [
                'name' => "User {$i}",
                'email' => "user{$i}@example.com",
                'purpose' => 'discussion',
                'message' => "Pesan pengujian nomor {$i} dengan panjang karakter di atas dua puluh.",
                'consent' => true,
                'submission_token' => (string) Str::uuid(),
            ]);
        }

        // 6th attempt should be blocked by rate limiter
        $response = $this->post('/contact', [
            'name' => 'User 6',
            'email' => 'user6@example.com',
            'purpose' => 'discussion',
            'message' => 'Pesan keenam yang seharusnya terkena rate limit throttle.',
            'consent' => true,
            'submission_token' => (string) Str::uuid(),
        ]);

        $response->assertSessionHasErrors(['message']);
    }

    public function test_notification_job_handles_failure_gracefully(): void
    {
        $message = ContactMessage::create([
            'name' => 'Klien Test',
            'email' => 'klien@example.com',
            'purpose' => 'cooperation',
            'message' => 'Pesan kerja sama untuk pengujian penanganan error notifikasi.',
            'consent_at' => now(),
            'privacy_notice_version' => '1.0',
            'submission_token' => (string) Str::uuid(),
            'status' => 'unread',
            'notification_status' => 'pending',
        ]);

        $job = new SendContactNotificationJob($message);
        $job->failed(new \Exception('SMTP timeout simulation'));

        $message->refresh();
        $this->assertEquals('failed', $message->notification_status);
        $this->assertDatabaseHas('contact_messages', ['id' => $message->id]);
    }
}
