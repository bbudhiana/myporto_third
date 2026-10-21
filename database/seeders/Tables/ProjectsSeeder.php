<?php
namespace Database\Seeders\Tables;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProjectsSeeder extends Seeder
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
                'category' => 'Software Engineering',
                'cover_media_id' => 6,
                'created_at' => '2026-10-08 16:14:26',
                'excerpt' => 'Perancangan sistem modular dengan performa tinggi, alur kerja revisi aman, dan optimasi query multi-tier.',
                'featured' => 1,
                'id' => 1,
                'outcomes_markdown' => 'Sistem terbukti andal dalam menyajikan halaman dengan latensi rendah, menjamin draft tidak terpublikasi tanpa persetujuan, dan mempermudah audit riwayat konten.',
                'problem_markdown' => 'Kebutuhan terhadap sistem penerbitan konten yang memiliki integritas verifikasi tinggi, pencegahan kebocoran draft ke ranah publik, dan kemudahan pemeliharaan tanpa dependensi berlebih.',
                'project_url' => 'https://newsai.my.id/',
                'published_at' => '2026-10-08 16:14:26',
                'repository_url' => 'https://github.com/bbudhiana/mynews_with_deepseek',
                'role_summary' => 'Lead Software Architect',
                'slug' => 'platform-manajemen-konten-terintegrasi',
                'solution_markdown' => 'Menerapkan pendekatan modular monolith dengan Laravel dan React/Inertia SSR. Mengimplementasikan snapshot revisi JSON transaksional, isolasi cache otomatis per rilis, dan validasi server-side yang ketat.',
                'sort_order' => 1,
                'source_note' => NULL,
                'source_url' => NULL,
                'status' => 'published',
                'title' => 'Platform Manajemen Konten Terintegrasi',
                'tradeoffs_markdown' => 'Memilih monolith modular dibanding microservices untuk meminimalkan kompleksitas operasional pada skala awal seraya menjaga batas pemisahan domain yang bersih.',
                'updated_at' => '2026-10-15 09:19:44',
                'verification_status' => 'owner_confirmed',
                'verified_at' => '2026-10-08 16:14:26',
            ],
            [
                'category' => 'AI Engineering',
                'cover_media_id' => 5,
                'created_at' => '2026-10-08 16:14:26',
                'excerpt' => 'Integrasi model bahasa cerdas untuk ekstraksi dan validasi dokumen semi-terstruktur dengan kontrol keamanan ketat.',
                'featured' => 1,
                'id' => 2,
                'outcomes_markdown' => 'Meningkatkan akurasi ekstraksi informasi dokumen terstruktur secara konsisten dan memangkas waktu proses tanpa mengorbankan kepatuhan keamanan data.',
                'problem_markdown' => 'Proses peninjauan dokumen manual membutuhkan waktu lama dan rawan kekeliruan, sementara model bahasa generatif tanpa kontrol rawan menghasilkan halusinasi dan kebocoran data sensitif.',
                'project_url' => 'https://cmsbyai.indoez.com/',
                'published_at' => '2026-10-08 16:14:26',
                'repository_url' => 'https://github.com/bbudhiana/mycms_with_deepseek',
                'role_summary' => 'Senior AI Engineer',
                'slug' => 'sistem-otomasi-alur-kerja-llm',
                'solution_markdown' => 'Merancang pipeline RAG dengan verifikasi skema keluaran terstruktur (JSON Schema enforcement], penanganan latensi melalui antrean asinkron, dan logging data teranonimkan.',
                'sort_order' => 2,
                'source_note' => NULL,
                'source_url' => NULL,
                'status' => 'published',
                'title' => 'Sistem Otomasi Alur Kerja Berbasis LLM',
                'tradeoffs_markdown' => 'Membatasi fleksibilitas prompt bebas demi memastikan keluaran konsisten 100% terhadap kontrak data yang divalidasi sistem.',
                'updated_at' => '2026-10-15 09:21:58',
                'verification_status' => 'owner_confirmed',
                'verified_at' => '2026-10-08 16:14:26',
            ],
            [
                'category' => 'Backend Services',
                'cover_media_id' => 7,
                'created_at' => '2026-10-08 16:14:26',
                'excerpt' => 'Pembangunan endpoint berlatensi rendah dengan penanganan lonjakan antrean dan observabilitas terpadu.',
                'featured' => 1,
                'id' => 3,
                'outcomes_markdown' => 'Penyelesaian transaksi tercatat stabil dengan pemulihan otomatis pada kegagalan layanan eksternal.',
                'problem_markdown' => 'Tantangan lonjakan beban transaksi simultan yang menyebabkan risiko duplikasi data dan kegagalan notifikasi pihak ketiga.',
                'project_url' => NULL,
                'published_at' => '2026-10-08 16:14:26',
                'repository_url' => NULL,
                'role_summary' => 'Senior Backend Engineer',
                'slug' => 'layanan-api-transaksional-terdistribusi',
                'solution_markdown' => 'Menerapkan token idempoten deduplikasi, transaksi database bertahap, dan pemrosesan notifikasi berbasis worker antrean yang dapat di-retry otomatis.',
                'sort_order' => 3,
                'source_note' => NULL,
                'source_url' => NULL,
                'status' => 'published',
                'title' => 'Layanan API Transaksional Terdistribusi',
                'tradeoffs_markdown' => 'Sedikit trade-off pada throughput puncak demi jaminan integritas data bebas duplikasi 100% pada kondisi jaringan fluktuatif.',
                'updated_at' => '2026-10-15 09:02:43',
                'verification_status' => 'owner_confirmed',
                'verified_at' => '2026-10-08 16:14:26',
            ]
        ];
        
        DB::table("projects")->insert($dataTables);
    }
}