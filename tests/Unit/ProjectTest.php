<?php

namespace Tests\Unit;

use App\Models\Project;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProjectTest extends TestCase
{
    use RefreshDatabase;

    public function test_published_scope_excludes_draft_projects(): void
    {
        Project::create([
            'slug' => 'draft-project',
            'title' => 'Draft Project',
            'excerpt' => 'Draft excerpt',
            'problem_markdown' => 'Problem',
            'role_summary' => 'Role',
            'solution_markdown' => 'Solution',
            'category' => 'Software Engineering',
            'status' => 'draft',
        ]);

        Project::create([
            'slug' => 'published-project',
            'title' => 'Published Project',
            'excerpt' => 'Published excerpt',
            'problem_markdown' => 'Problem',
            'role_summary' => 'Role',
            'solution_markdown' => 'Solution',
            'category' => 'AI Engineering',
            'status' => 'published',
            'published_at' => now(),
        ]);

        $published = Project::published()->get();

        $this->assertCount(1, $published);
        $this->assertEquals('published-project', $published->first()->slug);
    }

    public function test_by_category_scope_filters_correctly(): void
    {
        Project::create([
            'slug' => 'p1',
            'title' => 'P1',
            'excerpt' => 'Ex',
            'problem_markdown' => 'Prob',
            'role_summary' => 'Role',
            'solution_markdown' => 'Sol',
            'category' => 'AI Engineering',
            'status' => 'published',
            'published_at' => now(),
        ]);

        Project::create([
            'slug' => 'p2',
            'title' => 'P2',
            'excerpt' => 'Ex',
            'problem_markdown' => 'Prob',
            'role_summary' => 'Role',
            'solution_markdown' => 'Sol',
            'category' => 'Backend Services',
            'status' => 'published',
            'published_at' => now(),
        ]);

        $aiProjects = Project::published()->byCategory('AI Engineering')->get();
        $this->assertCount(1, $aiProjects);
        $this->assertEquals('p1', $aiProjects->first()->slug);
    }
}
