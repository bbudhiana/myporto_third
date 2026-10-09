<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Jobs\SendContactNotificationJob;
use App\Models\ContactMessage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MessageController extends Controller
{
    public function index(Request $request): Response
    {
        $status = $request->query('status');

        $query = ContactMessage::orderBy('created_at', 'desc');

        if ($status && in_array($status, ['unread', 'read', 'archived', 'spam'])) {
            $query->where('status', $status);
        }

        $messages = $query->paginate(15)->withQueryString();

        $unreadCount = ContactMessage::where('status', 'unread')->count();

        return Inertia::render('Admin/Messages/Index', [
            'messages' => $messages,
            'currentStatus' => $status,
            'unreadCount' => $unreadCount,
        ]);
    }

    public function show(ContactMessage $message): Response
    {
        if ($message->status === 'unread') {
            $message->update(['status' => 'read']);
        }

        return Inertia::render('Admin/Messages/Show', [
            'message' => $message,
        ]);
    }

    public function updateStatus(Request $request, ContactMessage $message): RedirectResponse
    {
        $validated = $request->validate([
            'status' => ['required', 'in:unread,read,archived,spam'],
        ]);

        $message->update($validated);

        return back()->with('success', 'Status pesan berhasil diubah.');
    }

    public function retryNotification(ContactMessage $message): RedirectResponse
    {
        SendContactNotificationJob::dispatch($message);

        return back()->with('success', 'Notifikasi pesan sedang dicoba ulang melalui antrean.');
    }

    public function destroy(ContactMessage $message): RedirectResponse
    {
        $message->delete();

        return redirect()->route('admin.messages.index')->with('success', 'Pesan berhasil dihapus.');
    }
}
