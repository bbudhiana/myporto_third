<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Http\Requests\ContactSubmissionRequest;
use App\Jobs\SendContactNotificationJob;
use App\Models\ContactMessage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Validation\ValidationException;

class ContactController extends Controller
{
    public function store(ContactSubmissionRequest $request): RedirectResponse
    {
        $ip = $request->ip() ?: '127.0.0.1';
        $ipHash = hash('sha256', $ip);
        $emailHash = hash('sha256', (string) $request->input('email'));

        // 1. Rate Limiting per IP per PRD 7.1 (5 submissions per 10 minutes)
        $ipThrottleKey = "contact_ip:{$ipHash}";
        $emailThrottleKey = "contact_email:{$emailHash}";

        if (RateLimiter::tooManyAttempts($ipThrottleKey, 5) || RateLimiter::tooManyAttempts($emailThrottleKey, 5)) {
            $seconds = max(
                RateLimiter::availableIn($ipThrottleKey),
                RateLimiter::availableIn($emailThrottleKey)
            );

            throw ValidationException::withMessages([
                'message' => "Terlalu banyak permintaan pesan. Silakan coba kembali dalam {$seconds} detik.",
            ]);
        }

        RateLimiter::hit($ipThrottleKey, 600);
        RateLimiter::hit($emailThrottleKey, 600);

        $validated = $request->validated();

        // 2. Anti-duplicate submission token check per PRD 7.1
        $existing = ContactMessage::where('submission_token', $validated['submission_token'])->first();
        if ($existing) {
            return back()->with('success', 'Pesan Anda sudah tersimpan. Terima kasih telah menghubungi saya.');
        }

        // 3. Transactional persistence & queued notification
        DB::transaction(function () use ($validated, $ipHash) {
            $contactMessage = ContactMessage::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'company' => $validated['company'] ?? null,
                'purpose' => $validated['purpose'],
                'message' => $validated['message'],
                'consent_at' => now(),
                'privacy_notice_version' => '1.0',
                'submission_token' => $validated['submission_token'],
                'status' => 'unread',
                'notification_status' => 'pending',
                'ip_hash' => $ipHash,
            ]);

            SendContactNotificationJob::dispatch($contactMessage)->afterCommit();
        });

        // Rotate session token to prevent reuse
        session()->forget('contact_submission_token');

        return back()->with('success', 'Pesan Anda sudah tersimpan. Terima kasih telah menghubungi saya.');
    }
}
