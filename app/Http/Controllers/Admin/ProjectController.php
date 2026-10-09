<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContentRevision;
use App\Models\Media;
use App\Models\Project;
use App\Models\Skill;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(): Response
    {
        $projects = Project::with(['coverMedia', 'skills'])
            ->orderBy('sort_order', 'asc')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Admin/Projects/Index', [
            'projects' => $projects,
        ]);
    }

    public function create(): Response
    {
        $skills = Skill::orderBy('name')->get();
        $mediaList = Media::orderBy('created_at', 'desc')->get();

        return Inertia::render('Admin/Projects/Form', [
            'project' => null,
            'skills' => $skills,
            'mediaList' => $mediaList,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:150'],
            'slug' => ['nullable', 'string', 'max:150', 'unique:projects,slug'],
            'excerpt' => ['required', 'string', 'max:500'],
            'category' => ['required', 'string', 'max:100'],
            'role_summary' => ['required', 'string', 'max:150'],
            'problem_markdown' => ['required', 'string'],
            'solution_markdown' => ['required', 'string'],
            'tradeoffs_markdown' => ['nullable', 'string'],
            'outcomes_markdown' => ['nullable', 'string'],
            'featured' => ['boolean'],
            'cover_media_id' => ['nullable', 'exists:media,id'],
            'project_url' => ['nullable', 'url', 'max:255'],
            'repository_url' => ['nullable', 'url', 'max:255'],
            'status' => ['required', 'in:draft,published,archived'],
            'sort_order' => ['integer'],
            'skills' => ['array'],
            'skills.*' => ['exists:skills,id'],
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        if ($validated['status'] === 'published') {
            $validated['published_at'] = now();
        }

        DB::transaction(function () use ($validated) {
            $skills = $validated['skills'] ?? [];
            unset($validated['skills']);

            $project = Project::create($validated);
            $project->skills()->sync($skills);
        });

        return redirect()->route('admin.projects.index')->with('success', 'Studi kasus proyek berhasil dibuat.');
    }

    public function edit(Project $project): Response
    {
        $project->load(['skills', 'coverMedia']);
        $skills = Skill::orderBy('name')->get();
        $mediaList = Media::orderBy('created_at', 'desc')->get();

        return Inertia::render('Admin/Projects/Form', [
            'project' => $project,
            'skills' => $skills,
            'mediaList' => $mediaList,
        ]);
    }

    public function update(Request $request, Project $project): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:150'],
            'slug' => ['required', 'string', 'max:150', 'unique:projects,slug,' . $project->id],
            'excerpt' => ['required', 'string', 'max:500'],
            'category' => ['required', 'string', 'max:100'],
            'role_summary' => ['required', 'string', 'max:150'],
            'problem_markdown' => ['required', 'string'],
            'solution_markdown' => ['required', 'string'],
            'tradeoffs_markdown' => ['nullable', 'string'],
            'outcomes_markdown' => ['nullable', 'string'],
            'featured' => ['boolean'],
            'cover_media_id' => ['nullable', 'exists:media,id'],
            'project_url' => ['nullable', 'url', 'max:255'],
            'repository_url' => ['nullable', 'url', 'max:255'],
            'status' => ['required', 'in:draft,published,archived'],
            'sort_order' => ['integer'],
            'skills' => ['array'],
            'skills.*' => ['exists:skills,id'],
        ]);

        DB::transaction(function () use ($project, $validated) {
            ContentRevision::create([
                'entity_type' => 'project',
                'entity_id' => $project->id,
                'snapshot_json' => $project->toArray(),
                'editor_id' => auth()->id(),
                'version' => ContentRevision::where('entity_type', 'project')->where('entity_id', $project->id)->count() + 1,
            ]);

            if ($validated['status'] === 'published' && ! $project->published_at) {
                $validated['published_at'] = now();
            }

            $skills = $validated['skills'] ?? [];
            unset($validated['skills']);

            $project->update($validated);
            $project->skills()->sync($skills);
        });

        return redirect()->route('admin.projects.index')->with('success', 'Studi kasus proyek berhasil diperbarui.');
    }

    public function destroy(Project $project): RedirectResponse
    {
        $project->delete();

        return back()->with('success', 'Proyek berhasil dihapus.');
    }

    public function togglePublish(Project $project): RedirectResponse
    {
        $newStatus = $project->status === 'published' ? 'draft' : 'published';

        $project->update([
            'status' => $newStatus,
            'published_at' => $newStatus === 'published' ? ($project->published_at ?: now()) : null,
        ]);

        return back()->with('success', "Status proyek diubah menjadi {$newStatus}.");
    }

    public function preview(Project $project): Response
    {
        $project->load(['coverMedia', 'skills', 'media']);

        return Inertia::render('Admin/Projects/Preview', [
            'project' => [
                'id' => $project->id,
                'slug' => $project->slug,
                'title' => $project->title,
                'excerpt' => $project->excerpt,
                'category' => $project->category,
                'roleSummary' => $project->role_summary,
                'problemMarkdown' => $project->problem_markdown,
                'solutionMarkdown' => $project->solution_markdown,
                'tradeoffsMarkdown' => $project->tradeoffs_markdown,
                'outcomesMarkdown' => $project->outcomes_markdown,
                'projectUrl' => $project->project_url,
                'repositoryUrl' => $project->repository_url,
                'coverUrl' => $project->coverMedia?->url,
                'status' => $project->status,
                'skills' => $project->skills->map(fn ($s) => $s->name),
                'media' => $project->media->map(fn ($m) => [
                    'id' => $m->id,
                    'url' => $m->url,
                    'altText' => $m->alt_text,
                    'caption' => $m->pivot->caption,
                ]),
            ],
        ]);
    }
}
