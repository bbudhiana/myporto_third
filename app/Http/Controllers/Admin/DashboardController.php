<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use App\Models\ContentRevision;
use App\Models\Experience;
use App\Models\Media;
use App\Models\Profile;
use App\Models\Project;
use App\Models\Skill;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        $profile = Profile::first();

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalProjects' => Project::count(),
                'publishedProjects' => Project::where('status', 'published')->count(),
                'draftProjects' => Project::where('status', 'draft')->count(),
                'totalExperiences' => Experience::count(),
                'totalSkills' => Skill::count(),
                'totalMedia' => Media::count(),
                'unreadMessages' => ContactMessage::where('status', 'unread')->count(),
                'totalMessages' => ContactMessage::count(),
            ],
            'recentMessages' => ContactMessage::orderBy('created_at', 'desc')->take(5)->get(),
            'recentRevisions' => ContentRevision::with('editor')->orderBy('created_at', 'desc')->take(5)->get(),
            'hasProfile' => $profile !== null,
        ]);
    }
}
