<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContentRevision;
use App\Models\Experience;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class ExperienceController extends Controller
{
    public function index(): Response
    {
        $experiences = Experience::orderBy('start_year', 'desc')
            ->orderBy('sort_order', 'asc')
            ->get();

        return Inertia::render('Admin/Experiences/Index', [
            'experiences' => $experiences,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:150'],
            'organization' => ['nullable', 'string', 'max:150'],
            'employment_type' => ['nullable', 'string', 'max:50'],
            'location' => ['nullable', 'string', 'max:100'],
            'start_year' => ['required', 'integer', 'min:1990', 'max:2050'],
            'start_month' => ['nullable', 'integer', 'between:1,12'],
            'end_year' => ['nullable', 'integer', 'min:1990', 'max:2050'],
            'end_month' => ['nullable', 'integer', 'between:1,12'],
            'is_current' => ['boolean'],
            'description_markdown' => ['nullable', 'string'],
            'status' => ['required', 'in:draft,published,archived'],
            'sort_order' => ['integer'],
        ]);

        if (! empty($validated['is_current'])) {
            $validated['end_year'] = null;
            $validated['end_month'] = null;
        }

        if ($validated['status'] === 'published') {
            $validated['published_at'] = now();
        }

        Experience::create($validated);

        return back()->with('success', 'Pengalaman profesional berhasil ditambahkan.');
    }

    public function update(Request $request, Experience $experience): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:150'],
            'organization' => ['nullable', 'string', 'max:150'],
            'employment_type' => ['nullable', 'string', 'max:50'],
            'location' => ['nullable', 'string', 'max:100'],
            'start_year' => ['required', 'integer', 'min:1990', 'max:2050'],
            'start_month' => ['nullable', 'integer', 'between:1,12'],
            'end_year' => ['nullable', 'integer', 'min:1990', 'max:2050'],
            'end_month' => ['nullable', 'integer', 'between:1,12'],
            'is_current' => ['boolean'],
            'description_markdown' => ['nullable', 'string'],
            'status' => ['required', 'in:draft,published,archived'],
            'sort_order' => ['integer'],
        ]);

        if (! empty($validated['is_current'])) {
            $validated['end_year'] = null;
            $validated['end_month'] = null;
        }

        DB::transaction(function () use ($experience, $validated) {
            ContentRevision::create([
                'entity_type' => 'experience',
                'entity_id' => $experience->id,
                'snapshot_json' => $experience->toArray(),
                'editor_id' => auth()->id(),
                'version' => ContentRevision::where('entity_type', 'experience')->where('entity_id', $experience->id)->count() + 1,
            ]);

            if ($validated['status'] === 'published' && ! $experience->published_at) {
                $validated['published_at'] = now();
            }

            $experience->update($validated);
        });

        return back()->with('success', 'Pengalaman profesional berhasil diperbarui.');
    }

    public function destroy(Experience $experience): RedirectResponse
    {
        $experience->delete();

        return back()->with('success', 'Pengalaman profesional telah dihapus.');
    }

    public function togglePublish(Experience $experience): RedirectResponse
    {
        $newStatus = $experience->status === 'published' ? 'draft' : 'published';

        $experience->update([
            'status' => $newStatus,
            'published_at' => $newStatus === 'published' ? ($experience->published_at ?: now()) : null,
        ]);

        return back()->with('success', "Status pengalaman diubah menjadi {$newStatus}.");
    }
}
