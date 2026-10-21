<?php
namespace Database\Seeders\Tables;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProjectSkillSeeder extends Seeder
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
            
        ];
        
        DB::table("project_skill")->insert($dataTables);
    }
}