<?php
namespace Database\Seeders\Tables;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProfilesSeeder extends Seeder
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
                'about_markdown' => 'Sebagai Software dan AI Engineer, saya mengutamakan pemecahan masalah yang berorientasi pada nilai nyata dan keberlanjutan sistem jangka panjang. Pendekatan rekayasa perangkat lunak yang saya terapkan menekankan kontrak data yang kokoh, modularitas arsitektur, dan otomatisasi pengujian.

Pada ranah integrasi model kecerdasan buatan, fokus utama adalah keandalan keluaran, efisiensi latensi, dan kepatuhan privasi data, memastikan adopsi AI memberikan manfaat praktis dan terukur bagi operasional bisnis.',
                'created_at' => '2026-10-09 09:44:00',
                'display_name' => 'Bana Budhiana, SKom, M.M.',
                'headline' => 'Senior Software and AI Engineer',
                'hero_summary' => 'Merancang dan Mengembangkan perangkat lunak dan solusi AI dengan fokus pada kebutuhan bisnis, keandalan sistem, dan kemudahan pengembangan.',
                'id' => 5,
                'location' => 'Jakarta dan Tangerang, Indonesia',
                'portrait_media_id' => 3,
                'public_email' => 'budhiana.bana@gmail.com',
                'published_at' => '2026-10-09 09:47:14',
                'resume_media_id' => 1,
                'source_note' => NULL,
                'source_url' => NULL,
                'status' => 'published',
                'updated_at' => '2026-10-15 15:07:02',
                'verification_status' => 'owner_confirmed',
                'verified_at' => '2026-10-09 09:47:14',
            ]
        ];
        
        DB::table("profiles")->insert($dataTables);
    }
}