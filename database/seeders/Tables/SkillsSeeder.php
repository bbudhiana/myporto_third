<?php

namespace Database\Seeders\Tables;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SkillsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /**
         * Command :
         * artisan seed:generate --table-mode --tables=users,social_links,skill_groups,skills,site_settings,projects,project_skill,project_media,profiles,media,experiences,contact_messages
         */
        $dataTables = [
            [
                'context' => null,
                'created_at' => '2026-10-08 16:14:26',
                'id' => 1,
                'name' => 'Clean Architecture & Domain Design',
                'skill_group_id' => 1,
                'sort_order' => 1,
                'updated_at' => '2026-10-08 16:14:26',
            ],
            [
                'context' => null,
                'created_at' => '2026-10-08 16:14:26',
                'id' => 2,
                'name' => 'RESTful & GraphQL API Design',
                'skill_group_id' => 1,
                'sort_order' => 2,
                'updated_at' => '2026-10-08 16:14:26',
            ],
            [
                'context' => null,
                'created_at' => '2026-10-08 16:14:26',
                'id' => 3,
                'name' => 'Type-Safe Frontend Development',
                'skill_group_id' => 1,
                'sort_order' => 3,
                'updated_at' => '2026-10-08 16:14:26',
            ],
            [
                'context' => null,
                'created_at' => '2026-10-08 16:14:26',
                'id' => 4,
                'name' => 'Automated Testing (Unit & Feature]',
                'skill_group_id' => 1,
                'sort_order' => 4,
                'updated_at' => '2026-10-08 16:14:26',
            ],
            [
                'context' => null,
                'created_at' => '2026-10-08 16:14:26',
                'id' => 5,
                'name' => 'LLM Evaluation & Integration',
                'skill_group_id' => 2,
                'sort_order' => 1,
                'updated_at' => '2026-10-08 16:14:26',
            ],
            [
                'context' => null,
                'created_at' => '2026-10-08 16:14:26',
                'id' => 6,
                'name' => 'RAG Pipeline Architecture',
                'skill_group_id' => 2,
                'sort_order' => 2,
                'updated_at' => '2026-10-08 16:14:26',
            ],
            [
                'context' => null,
                'created_at' => '2026-10-08 16:14:26',
                'id' => 7,
                'name' => 'Prompt Engineering & Constraints',
                'skill_group_id' => 2,
                'sort_order' => 3,
                'updated_at' => '2026-10-08 16:14:26',
            ],
            [
                'context' => null,
                'created_at' => '2026-10-08 16:14:26',
                'id' => 8,
                'name' => 'Safety & Data Observability',
                'skill_group_id' => 2,
                'sort_order' => 4,
                'updated_at' => '2026-10-08 16:14:26',
            ],
            [
                'context' => null,
                'created_at' => '2026-10-08 16:14:26',
                'id' => 9,
                'name' => 'Modular Monoliths & Microservices',
                'skill_group_id' => 3,
                'sort_order' => 1,
                'updated_at' => '2026-10-08 16:14:26',
            ],
            [
                'context' => null,
                'created_at' => '2026-10-08 16:14:26',
                'id' => 10,
                'name' => 'CI/CD Automation Pipelines',
                'skill_group_id' => 3,
                'sort_order' => 2,
                'updated_at' => '2026-10-08 16:14:26',
            ],
            [
                'context' => null,
                'created_at' => '2026-10-08 16:14:26',
                'id' => 11,
                'name' => 'Database Optimization & Indexing',
                'skill_group_id' => 3,
                'sort_order' => 3,
                'updated_at' => '2026-10-08 16:14:26',
            ],
            [
                'context' => null,
                'created_at' => '2026-10-08 16:14:26',
                'id' => 12,
                'name' => 'Code Review & Quality Standards',
                'skill_group_id' => 3,
                'sort_order' => 4,
                'updated_at' => '2026-10-08 16:14:26',
            ],
            [
                'context' => null,
                'created_at' => '2026-10-08 16:14:26',
                'id' => 13,
                'name' => 'Relational Databases (MariaDB, PostgreSQL]',
                'skill_group_id' => 4,
                'sort_order' => 1,
                'updated_at' => '2026-10-08 16:14:26',
            ],
            [
                'context' => null,
                'created_at' => '2026-10-08 16:14:26',
                'id' => 14,
                'name' => 'Containerization (Docker]',
                'skill_group_id' => 4,
                'sort_order' => 2,
                'updated_at' => '2026-10-08 16:14:26',
            ],
            [
                'context' => null,
                'created_at' => '2026-10-08 16:14:26',
                'id' => 15,
                'name' => 'Caching & Queue Management',
                'skill_group_id' => 4,
                'sort_order' => 3,
                'updated_at' => '2026-10-08 16:14:26',
            ],
            [
                'context' => null,
                'created_at' => '2026-10-08 16:14:26',
                'id' => 16,
                'name' => 'Security & Role-based Access',
                'skill_group_id' => 4,
                'sort_order' => 4,
                'updated_at' => '2026-10-08 16:14:26',
            ],
        ];

        DB::table('skills')->insertOrIgnore($dataTables);
    }
}
