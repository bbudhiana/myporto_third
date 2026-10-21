<?php
namespace Database\Seeders\Tables;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SocialLinksSeeder extends Seeder
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
                'enabled' => 1,
                'id' => 1,
                'label' => 'GitHub',
                'sort_order' => 1,
                'updated_at' => '2026-10-08 16:14:26',
                'url' => 'https://github.com',
            ],
            [
                'created_at' => '2026-10-08 16:14:26',
                'enabled' => 1,
                'id' => 2,
                'label' => 'LinkedIn',
                'sort_order' => 2,
                'updated_at' => '2026-10-08 16:14:26',
                'url' => 'https://linkedin.com',
            ]
        ];
        
        DB::table("social_links")->insert($dataTables);
    }
}