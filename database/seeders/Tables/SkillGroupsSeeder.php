<?php
namespace Database\Seeders\Tables;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SkillGroupsSeeder extends Seeder
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
         *
         */

        $dataTables = [
            [
                'created_at' => '2026-10-08 16:14:26',
                'description' => 'Disiplin arsitektur dan pengembangan perangkat lunak modern.',
                'id' => 1,
                'name' => 'Software Engineering',
                'sort_order' => 1,
                'updated_at' => '2026-10-08 16:14:26',
            ],
            [
                'created_at' => '2026-10-08 16:14:26',
                'description' => 'Evaluasi, integrasi, dan operasionalisasi model kecerdasan buatan.',
                'id' => 2,
                'name' => 'AI Engineering',
                'sort_order' => 2,
                'updated_at' => '2026-10-08 16:14:26',
            ],
            [
                'created_at' => '2026-10-08 16:14:26',
                'description' => 'Strategi pengiriman perangkat lunak andal dan skalabel.',
                'id' => 3,
                'name' => 'Architecture & Delivery',
                'sort_order' => 3,
                'updated_at' => '2026-10-08 16:14:26',
            ],
            [
                'created_at' => '2026-10-08 16:14:26',
                'description' => 'Pengelolaan basis data, komputasi terisolasi, dan infrastruktur.',
                'id' => 4,
                'name' => 'Data & Infrastructure',
                'sort_order' => 4,
                'updated_at' => '2026-10-08 16:14:26',
            ]
        ];
        
        DB::table("skill_groups")->insert($dataTables);
    }
}