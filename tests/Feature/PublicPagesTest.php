<?php

namespace Tests\Feature;

use App\Models\Experience;
use App\Models\Profile;
use App\Models\Project;
use App\Models\SkillGroup;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class PublicPagesTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        Profile::create([
            'display_name' => 'Bana Budhiana',
            'headline' => 'Senior Software and AI Engineer',
            'hero_summary' => 'Merancang perangkat lunak dan solusi AI.',
            'about_markdown' => 'Bio...',
            'status' => 'published',
            'published_at' => now(),
        ]);

        Experience::create([
            'title' => 'Senior Software and AI Engineer',
            'start_year' => 2026,
            'is_current' => true,
            'status' => 'published',
            'published_at' => now(),
        ]);

        $group = SkillGroup::create(['name' => 'Software Engineering', 'sort_order' => 1]);
        $group->skills()->create(['name' => 'Architecture', 'sort_order' => 1]);

        Project::create([
            'slug' => 'test-project',
            'title' => 'Test Project',
            'excerpt' => 'Excerpt',
            'problem_markdown' => 'Problem',
            'role_summary' => 'Lead',
            'solution_markdown' => 'Solution',
            'category' => 'Software Engineering',
            'featured' => true,
            'status' => 'published',
            'published_at' => now(),
        ]);

        Project::create([
            'slug' => 'draft-project',
            'title' => 'Draft Project',
            'excerpt' => 'Excerpt',
            'problem_markdown' => 'Problem',
            'role_summary' => 'Lead',
            'solution_markdown' => 'Solution',
            'category' => 'AI Engineering',
            'featured' => false,
            'status' => 'draft',
        ]);
    }

    public function test_homepage_can_be_rendered_with_props(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Public/Home')
            ->has('profile')
            ->has('experiences', 1)
            ->has('skillGroups', 1)
            ->has('featuredProjects', 1)
            ->has('submissionToken')
            ->where('profile.displayName', 'Bana Budhiana')
        );
    }

    public function test_projects_index_can_be_rendered_and_filtered(): void
    {
        $response = $this->get('/projects');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Public/Projects/Index')
            ->has('projects.data', 1)
            ->where('projects.data.0.slug', 'test-project')
        );

        $filterResponse = $this->get('/projects?category=NonExistent');
        $filterResponse->assertStatus(200);
        $filterResponse->assertInertia(fn (Assert $page) => $page
            ->component('Public/Projects/Index')
            ->has('projects.data', 0)
        );
    }

    public function test_published_project_detail_can_be_rendered(): void
    {
        $response = $this->get('/projects/test-project');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Public/Projects/Show')
            ->where('project.title', 'Test Project')
            ->where('project.category', 'Software Engineering')
        );
    }

    public function test_draft_project_returns_404(): void
    {
        $response = $this->get('/projects/draft-project');

        $response->assertStatus(404);
    }

    public function test_privacy_page_can_be_rendered(): void
    {
        $response = $this->get('/privacy');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Public/Privacy')
        );
    }

    public function test_resume_returns_404_when_no_resume_is_uploaded(): void
    {
        $response = $this->get('/resume');

        $response->assertStatus(404);
    }

    public function test_sitemap_returns_valid_xml_with_only_published_projects(): void
    {
        $response = $this->get('/sitemap.xml');

        $response->assertStatus(200);
        $response->assertHeader('Content-Type', 'application/xml; charset=utf-8');
        $response->assertSee('test-project');
        $response->assertDontSee('draft-project');
    }
}
