<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Media;
use App\Models\Profile;
use App\Models\Project;
use App\Support\ImageOptimizer;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class MediaController extends Controller
{
    public function index(): Response
    {
        $mediaList = Media::orderBy('created_at', 'desc')->get();
        $profile = Profile::first();

        return Inertia::render('Admin/Media/Index', [
            'mediaList' => $mediaList,
            'currentResumeId' => $profile?->resume_media_id,
            'currentPortraitId' => $profile?->portrait_media_id,
        ]);
    }

    public function upload(Request $request): RedirectResponse
    {
        $request->validate([
            'file' => [
                'required',
                'file',
                'mimetypes:image/jpeg,image/png,image/webp,application/pdf',
                'max:10240', // Max 10MB
            ],
            'alt_text' => ['nullable', 'string', 'max:255'],
        ]);

        $file = $request->file('file');
        $mime = $file->getMimeType();

        // Enforce image 5MB limit
        if (str_starts_with($mime, 'image/') && $file->getSize() > 5 * 1024 * 1024) {
            return back()->withErrors(['file' => 'Ukuran gambar maksimal 5 MB.']);
        }

        // Generate randomized safe storage name per PRD 7 & 12
        $extension = $file->getClientOriginalExtension();
        $randomName = Str::random(40).'.'.$extension;

        try {
            $path = $file->storeAs('uploads', $randomName, 'public');
        } catch (\Throwable $e) {
            report($e);

            return back()->withErrors([
                'file' => 'Gagal menyimpan berkas. Periksa izin folder penyimpanan di server.',
            ]);
        }

        // Disk 'public' memakai throw => false, jadi penulisan yang gagal
        // tidak melempar error. Pastikan berkasnya benar-benar ada sebelum
        // membuat baris media (kalau tidak, DB akan mencatat berkas palsu).
        if (! is_string($path) || ! Storage::disk('public')->exists($path)) {
            return back()->withErrors([
                'file' => 'Gagal menyimpan berkas. Periksa izin folder penyimpanan di server.',
            ]);
        }

        [$width, $height] = str_starts_with($mime, 'image/')
            ? @getimagesize($file->getRealPath()) ?: [null, null]
            : [null, null];

        $mimeType = $mime;
        $bytes = $file->getSize();

        // Ship WebP instead of multi-megabyte PNG/JPEG originals.
        // The original file is kept next to it (same base name) so the
        // conversion can always be redone from the untouched source.
        if (str_starts_with($mime, 'image/') && $mime !== 'image/webp') {
            $optimized = ImageOptimizer::optimize(
                Storage::disk('public')->path($path),
                'public',
                $path
            );

            if ($optimized !== null) {
                $path = $optimized['path'];
                $mimeType = $optimized['mime'];
                $bytes = $optimized['bytes'];
                $width = $optimized['width'];
                $height = $optimized['height'];
            }
        }

        Media::create([
            'disk' => 'public',
            'path' => $path,
            'mime_type' => $mimeType,
            'bytes' => $bytes,
            'width' => $width,
            'height' => $height,
            'alt_text' => $request->input('alt_text'),
            'original_name' => $file->getClientOriginalName(),
            'visibility' => 'public',
        ]);

        return back()->with('success', 'Berkas media berhasil diunggah.');
    }

    public function destroy(Media $media): RedirectResponse
    {
        // Integrity check per PRD 9: reject delete if used by published content
        $isUsedInProfile = Profile::where('portrait_media_id', $media->id)
            ->orWhere('resume_media_id', $media->id)
            ->exists();

        $isUsedInProject = Project::where('cover_media_id', $media->id)->exists();

        if ($isUsedInProfile || $isUsedInProject) {
            return back()->withErrors(['error' => 'Media tidak dapat dihapus karena masih digunakan pada konten profil atau proyek.']);
        }

        if (Storage::disk($media->disk)->exists($media->path)) {
            Storage::disk($media->disk)->delete($media->path);
        }

        $media->delete();

        return back()->with('success', 'Berkas media berhasil dihapus.');
    }

    public function setAsResume(Media $media): RedirectResponse
    {
        if ($media->mime_type !== 'application/pdf') {
            return back()->withErrors(['error' => 'Berkas CV harus dalam format PDF.']);
        }

        $profile = Profile::first();
        if ($profile) {
            $profile->update(['resume_media_id' => $media->id]);
        }

        return back()->with('success', 'Berkas CV aktif berhasil diperbarui.');
    }

    public function setAsPortrait(Media $media): RedirectResponse
    {
        if (! str_starts_with($media->mime_type, 'image/')) {
            return back()->withErrors(['error' => 'Foto profil harus berupa gambar (JPEG, PNG, WebP).']);
        }

        $profile = Profile::first();
        if ($profile) {
            $profile->update(['portrait_media_id' => $media->id]);
        }

        return back()->with('success', 'Foto profil berhasil diperbarui.');
    }
}
