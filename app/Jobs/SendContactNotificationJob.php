<?php

namespace App\Jobs;

use App\Models\ContactMessage;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Throwable;

class SendContactNotificationJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 3;
    public int $backoff = 30;

    public function __construct(public ContactMessage $contactMessage)
    {
    }

    public function handle(): void
    {
        $admin = User::first();
        $adminEmail = $admin?->email ?? env('ADMIN_EMAIL', 'bana@bbudhiana.com');

        try {
            // Send email notification to admin without raw email body in log
            Mail::raw(
                "Pesan baru diterima dari website:\n\n" .
                "Pengirim: {$this->contactMessage->name} ({$this->contactMessage->email})\n" .
                "Perusahaan: " . ($this->contactMessage->company ?: '-') . "\n" .
                "Tujuan: {$this->contactMessage->purpose}\n" .
                "Waktu: {$this->contactMessage->created_at}\n\n" .
                "Buka panel admin untuk membaca dan menindaklanjuti pesan ini.",
                function ($message) use ($adminEmail) {
                    $message->to($adminEmail)
                        ->subject("[Portofolio Bana Budhiana] Pesan Kontak Baru: {$this->contactMessage->name}");
                }
            );

            $this->contactMessage->update([
                'notification_status' => 'sent',
            ]);
        } catch (Throwable $e) {
            Log::warning('Gagal mengirimkan notifikasi email kontak admin: ' . $e->getMessage(), [
                'message_id' => $this->contactMessage->id,
            ]);

            throw $e;
        }
    }

    public function failed(?Throwable $exception): void
    {
        // Fail-safe per PRD 7.1: Failure does not delete message, marks notification_status failed for admin retry
        $this->contactMessage->update([
            'notification_status' => 'failed',
        ]);

        Log::error('Notifikasi email kontak admin gagal setelah percobaan maksimal.', [
            'message_id' => $this->contactMessage->id,
        ]);
    }
}
