<?php

namespace Tests\Unit;

use App\Models\Experience;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExperienceTest extends TestCase
{
    use RefreshDatabase;

    public function test_period_label_formats_year_only_current(): void
    {
        $exp = Experience::create([
            'title' => 'Senior Software and AI Engineer',
            'start_year' => 2026,
            'is_current' => true,
            'status' => 'published',
            'published_at' => now(),
        ]);

        $this->assertEquals('2026 – Sekarang', $exp->period_label);
    }

    public function test_period_label_formats_with_month_and_end_year(): void
    {
        $exp = Experience::create([
            'title' => 'Software Engineer',
            'start_year' => 2023,
            'start_month' => 6,
            'end_year' => 2025,
            'end_month' => 12,
            'is_current' => false,
            'status' => 'published',
            'published_at' => now(),
        ]);

        $this->assertEquals('Jun 2023 – Des 2025', $exp->period_label);
    }

    public function test_published_scope_excludes_draft_and_future(): void
    {
        Experience::create([
            'title' => 'Draft Exp',
            'start_year' => 2022,
            'is_current' => false,
            'status' => 'draft',
        ]);

        Experience::create([
            'title' => 'Published Exp',
            'start_year' => 2024,
            'is_current' => false,
            'status' => 'published',
            'published_at' => now(),
        ]);

        $published = Experience::published()->get();

        $this->assertCount(1, $published);
        $this->assertEquals('Published Exp', $published->first()->title);
    }
}
