<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContentRevision;
use App\Models\Media;
use App\Models\Profile;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function edit(): Response
    {
        $profile = Profile::firstOrCreate(
            ['display_name' => 'Bana Budhiana, SKom, M.M.'],
            [
                'headline' => 'Senior Software and AI Engineer',
                'hero_summary' => 'Merancang perangkat lunak dan solusi AI dengan fokus pada kebutuhan bisnis, keandalan sistem, dan kemudahan pengembangan.',
                'about_markdown' => "Sebagai Software dan AI Engineer, saya mengutamakan pemecahan masalah yang berorientasi pada nilai nyata dan keberlanjutan sistem jangka panjang. Pendekatan rekayasa perangkat lunak yang saya terapkan menekankan kontrak data yang kokoh, modularitas arsitektur, dan otomatisasi pengujian.\n\nPada ranah integrasi model kecerdasan buatan, fokus utama adalah keandalan keluaran, efisiensi latensi, dan kepatuhan privasi data, memastikan adopsi AI memberikan manfaat praktis dan terukur bagi operasional bisnis.",
                'location' => 'Tangerang dan Jakarta, Indonesia',
                'public_email' => 'contact@bbudhiana.com',
                'status' => 'draft',
            ]
        );

        $mediaList = Media::orderBy('created_at', 'desc')->get();

        return Inertia::render('Admin/Profile/Edit', [
            'profile' => $profile,
            'mediaList' => $mediaList,
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'display_name' => ['required', 'string', 'max:100'],
            'headline' => ['required', 'string', 'max:150'],
            'hero_summary' => ['required', 'string', 'max:500'],
            'about_markdown' => ['required', 'string'],
            'location' => ['nullable', 'string', 'max:100'],
            'public_email' => ['nullable', 'email', 'max:150'],
            'status' => ['required', 'in:draft,published,archived'],
            'portrait_media_id' => ['nullable', 'exists:media,id'],
            'resume_media_id' => ['nullable', 'exists:media,id'],
        ]);

        // Convert empty strings to null for nullable foreign key fields
        if (isset($validated['portrait_media_id']) && $validated['portrait_media_id'] === '') {
            $validated['portrait_media_id'] = null;
        }
        if (isset($validated['resume_media_id']) && $validated['resume_media_id'] === '') {
            $validated['resume_media_id'] = null;
        }

        $profile = Profile::firstOrFail();

        DB::transaction(function () use ($profile, $validated) {
            // Save version snapshot before update per PRD 7.2
            ContentRevision::create([
                'entity_type' => 'profile',
                'entity_id' => $profile->id,
                'snapshot_json' => $profile->toArray(),
                'editor_id' => auth()->id() ?? 1, // Fallback to admin user ID 1 if not authenticated
                'version' => ContentRevision::where('entity_type', 'profile')->where('entity_id', $profile->id)->count() + 1,
            ]);

            if ($validated['status'] === 'published' && ! $profile->published_at) {
                $validated['published_at'] = now();
            }

            $profile->update($validated);
        });

        return back()->with('success', 'Profil berhasil diperbarui dan versi revisi telah dicatat.');
    }
}
