<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Experience;
use App\Models\Profile;
use App\Models\Project;
use App\Models\SkillGroup;
use App\Models\SocialLink;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __invoke(): Response
    {
        $profile = Profile::published()->with(['portraitMedia', 'resumeMedia'])->first();

        $experiences = Experience::published()->get()->map(fn ($exp) => [
            'id' => $exp->id,
            'title' => $exp->title,
            'organization' => $exp->organization,
            'employmentType' => $exp->employment_type,
            'location' => $exp->location,
            'startYear' => $exp->start_year,
            'startMonth' => $exp->start_month,
            'endYear' => $exp->end_year,
            'endMonth' => $exp->end_month,
            'isCurrent' => (bool) $exp->is_current,
            'periodLabel' => $exp->period_label,
            'descriptionMarkdown' => $exp->description_markdown,
        ]);

        $skillGroups = SkillGroup::with(['skills' => fn ($q) => $q->orderBy('sort_order', 'asc')])
            ->orderBy('sort_order', 'asc')
            ->get()
            ->map(fn ($group) => [
                'id' => $group->id,
                'name' => $group->name,
                'description' => $group->description,
                'skills' => $group->skills->map(fn ($s) => [
                    'id' => $s->id,
                    'name' => $s->name,
                    'context' => $s->context,
                ]),
            ]);

        $featuredProjects = Project::published()
            ->featured()
            ->with(['coverMedia', 'skills'])
            ->take(3)
            ->get()
            ->map(fn ($proj) => [
                'id' => $proj->id,
                'slug' => $proj->slug,
                'title' => $proj->title,
                'excerpt' => $proj->excerpt,
                'category' => $proj->category,
                'roleSummary' => $proj->role_summary,
                'coverUrl' => $proj->coverMedia?->url,
                'skills' => $proj->skills->map(fn ($s) => $s->name),
            ]);

        $socialLinks = SocialLink::active()->get()->map(fn ($soc) => [
            'id' => $soc->id,
            'label' => $soc->label,
            'url' => $soc->url,
        ]);

        // One-time submission token for anti-duplicate contact form per PRD 7.1
        $submissionToken = Str::uuid()->toString();
        session(['contact_submission_token' => $submissionToken]);

        return Inertia::render('Public/Home', [
            'profile' => $profile ? [
                'displayName' => $profile->display_name,
                'headline' => $profile->headline,
                'heroSummary' => $profile->hero_summary,
                'aboutMarkdown' => $profile->about_markdown,
                'location' => $profile->location,
                'hasResume' => $profile->resume_media_id !== null,
                'portraitUrl' => $profile->portraitMedia?->url,
            ] : null,
            'experiences' => $experiences,
            'skillGroups' => $skillGroups,
            'featuredProjects' => $featuredProjects,
            'socialLinks' => $socialLinks,
            'submissionToken' => $submissionToken,
        ]);
    }
}
