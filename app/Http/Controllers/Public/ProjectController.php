<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(Request $request): Response
    {
        $category = $request->query('category');

        $categories = Project::published()
            ->select('category')
            ->distinct()
            ->pluck('category')
            ->values();

        $projects = Project::published()
            ->byCategory($category)
            ->with(['coverMedia', 'skills'])
            ->paginate(9)
            ->withQueryString()
            ->through(fn ($proj) => [
                'id' => $proj->id,
                'slug' => $proj->slug,
                'title' => $proj->title,
                'excerpt' => $proj->excerpt,
                'category' => $proj->category,
                'roleSummary' => $proj->role_summary,
                'featured' => (bool) $proj->featured,
                'coverUrl' => $proj->coverMedia?->url,
                'skills' => $proj->skills->map(fn ($s) => $s->name),
            ]);

        return Inertia::render('Public/Projects/Index', [
            'projects' => $projects,
            'categories' => $categories,
            'selectedCategory' => $category,
        ]);
    }

    public function show(string $slug): Response
    {
        $project = Project::published()
            ->where('slug', $slug)
            ->with(['coverMedia', 'skills', 'media'])
            ->firstOrFail();

        return Inertia::render('Public/Projects/Show', [
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
