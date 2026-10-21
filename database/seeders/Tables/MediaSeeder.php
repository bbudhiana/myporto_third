<?php
namespace Database\Seeders\Tables;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MediaSeeder extends Seeder
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
                'alt_text' => 'My Latest CV',
                'bytes' => 279725,
                'created_at' => '2026-10-09 09:22:21',
                'disk' => 'public',
                'height' => NULL,
                'id' => 1,
                'mime_type' => 'application/pdf',
                'original_name' => 'Software and AI Optimation Engineer - Classic.pdf',
                'path' => 'uploads/YWknkAUe0LVjyFMTKhYFcAkP5Sxf7t8v90nWWV2e.pdf',
                'updated_at' => '2026-10-09 09:22:21',
                'visibility' => 'public',
                'width' => NULL,
            ],
            [
                'alt_text' => 'My Latest Photo Profile',
                'bytes' => 44239,
                'created_at' => '2026-10-09 09:23:51',
                'disk' => 'public',
                'height' => 1024,
                'id' => 2,
                'mime_type' => 'image/jpeg',
                'original_name' => '1000209833.jpg',
                'path' => 'uploads/wOQgtRl43bOZAMyic37mxjRsi9Y7NXSebVzhOZtI.jpg',
                'updated_at' => '2026-10-09 09:23:51',
                'visibility' => 'public',
                'width' => 683,
            ],
            [
                'alt_text' => 'My Latest Photo Profile',
                'bytes' => 2536949,
                'created_at' => '2026-10-09 11:34:30',
                'disk' => 'public',
                'height' => 3456,
                'id' => 3,
                'mime_type' => 'image/jpeg',
                'original_name' => 'IMG_9830.JPG',
                'path' => 'uploads/pXPSB2OhYgCyUb6Fx1AWxSRuCaL4nAwzbbjuA4Kk.JPG',
                'updated_at' => '2026-10-09 11:34:30',
                'visibility' => 'public',
                'width' => 5184,
            ],
            [
                'alt_text' => 'My Latest Photo Profile',
                'bytes' => 46004,
                'created_at' => '2026-10-13 05:28:19',
                'disk' => 'public',
                'height' => 217,
                'id' => 4,
                'mime_type' => 'image/png',
                'original_name' => 'Bana.png',
                'path' => 'uploads/lYnoe0n8iBmRbh9V9ghvV0bcanaiwSTiCZNQKnPB.png',
                'updated_at' => '2026-10-13 05:28:19',
                'visibility' => 'public',
                'width' => 140,
            ],
            [
                'alt_text' => 'Ilustrasi Otmasi Alur kerja berbasis LLM',
                'bytes' => 1761175,
                'created_at' => '2026-10-15 08:55:06',
                'disk' => 'public',
                'height' => 1199,
                'id' => 5,
                'mime_type' => 'image/png',
                'original_name' => 'Infografik Otomasi Alur Kerja Berbasis LLM.png',
                'path' => 'uploads/BKuYH0jDsidH4eINsYCdmYka5eGt1ZxuEq2LQFgk.png',
                'updated_at' => '2026-10-15 08:55:06',
                'visibility' => 'public',
                'width' => 1312,
            ],
            [
                'alt_text' => 'Managemen Model Terintergrasi',
                'bytes' => 1740914,
                'created_at' => '2026-10-15 08:58:52',
                'disk' => 'public',
                'height' => 1024,
                'id' => 6,
                'mime_type' => 'image/png',
                'original_name' => 'Infografik Platform Manajemen Konten Terintegrasi.png',
                'path' => 'uploads/rbS1rTr7Nhi1dM8FyT0tvuNKh4Dh6z79XBLoHyCZ.png',
                'updated_at' => '2026-10-15 08:58:52',
                'visibility' => 'public',
                'width' => 1536,
            ],
            [
                'alt_text' => 'API transaksional Terdistribusi',
                'bytes' => 1725561,
                'created_at' => '2026-10-15 09:02:33',
                'disk' => 'public',
                'height' => 1024,
                'id' => 7,
                'mime_type' => 'image/png',
                'original_name' => 'Infografik Layanan API Transaksional Terdistribusi.png',
                'path' => 'uploads/99jt98lEpcZcf6GweFqXXCYo3aJ41veqiEKfzcX6.png',
                'updated_at' => '2026-10-15 09:02:33',
                'visibility' => 'public',
                'width' => 1536,
            ]
        ];
        
        DB::table("media")->insert($dataTables);
    }
}