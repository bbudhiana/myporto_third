<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;

class ResumeController extends Controller
{
    public function __invoke(): Response
    {
        $profile = Profile::published()->with('resumeMedia')->first();

        if (! $profile || ! $profile->resumeMedia) {
            abort(404, 'CV belum tersedia.');
        }

        $media = $profile->resumeMedia;

        if (! Storage::disk($media->disk)->exists($media->path)) {
            abort(404, 'File CV tidak ditemukan di media storage.');
        }

        return Storage::disk($media->disk)->download(
            $media->path,
            'CV-Bana-Budhiana.pdf',
            [
                'Content-Type' => 'application/pdf',
                'X-Robots-Tag' => 'noindex, nofollow',
            ]
        );
    }
}
