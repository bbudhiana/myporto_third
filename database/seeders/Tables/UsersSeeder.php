<?php

namespace Database\Seeders\Tables;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

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
         */

        // 1. Admin User per PRD FR-11 & 7.2
        // config(), bukan env(): env() selalu null setelah config:cache.
        $adminEmail = config('portfolio.admin_email');
        $adminPassword = config('portfolio.admin_password');

        $dataTables = [
            [
                'created_at' => '2026-10-08 16:14:26',
                'email' => $adminEmail,
                'email_verified_at' => now(),
                'id' => 1,
                'name' => 'Bana Budhiana',
                'password' => Hash::make($adminPassword),
                'updated_at' => '2026-10-08 16:14:26',
            ],
        ];

        DB::table('users')->insertOrIgnore($dataTables);
    }
}
