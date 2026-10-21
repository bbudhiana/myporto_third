<?php
namespace Database\Seeders\Tables;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UsersSeeder extends Seeder
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

        // 1. Admin User per PRD FR-11 & 7.2
        $adminEmail = env('ADMIN_EMAIL', 'bana@bbudhiana.com');
        $adminPassword = env('ADMIN_PASSWORD', 'BanaAdmin2026!');

        $dataTables = [
            [
                'created_at' => '2026-10-08 16:14:26',
                'email' => $adminEmail,
                'email_verified_at' => now(),
                'id' => 1,
                'name' => 'Bana Budhiana',
                'password' => Hash::make($adminPassword),
                'remember_token' => 'ohDcpXCobd6P4iZdpmNGbl6UzBlPBHvhz0mGdd3XUjOMqsH1nsge0mafV9LS',
                'updated_at' => '2026-10-08 16:14:26',
            ]
        ];
        
        DB::table("users")->insert($dataTables);
    }
}