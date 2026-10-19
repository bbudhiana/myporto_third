<?php

namespace Database\Seeders;

use App\Models\Experience;
use App\Models\Profile;
use App\Models\Project;
use App\Models\Skill;
use App\Models\SkillGroup;
use App\Models\SocialLink;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Admin User per PRD FR-11 & 7.2
        $adminEmail = env('ADMIN_EMAIL', 'bana@bbudhiana.com');
        $adminPassword = env('ADMIN_PASSWORD', 'BanaAdmin2026!');

        User::firstOrCreate(
            ['email' => $adminEmail],
            [
                'name' => 'Bana Budhiana',
                'password' => Hash::make($adminPassword),
                'email_verified_at' => now(),
            ]
        );

        // 2. Profile per PRD 5.1 & 5.4
        Profile::updateOrCreate(
            ['display_name' => 'Bana Budhiana, SKom, M.M.'],
            [
                'headline' => 'Senior Software and AI Engineer',
                'hero_summary' => 'Merancang perangkat lunak dan solusi AI dengan fokus pada kebutuhan bisnis, keandalan sistem, dan kemudahan pengembangan.',
                'about_markdown' => "Sebagai Software dan AI Engineer, saya mengutamakan pemecahan masalah yang berorientasi pada nilai nyata dan keberlanjutan sistem jangka panjang. Pendekatan rekayasa perangkat lunak yang saya terapkan menekankan kontrak data yang kokoh, modularitas arsitektur, dan otomatisasi pengujian.\n\nPada ranah integrasi model kecerdasan buatan, fokus utama adalah keandalan keluaran, efisiensi latensi, dan kepatuhan privasi data, memastikan adopsi AI memberikan manfaat praktis dan terukur bagi operasional bisnis.",
                'location' => 'Tangerang dan Jakarta, Indonesia',
                'public_email' => 'contact@bbudhiana.com',
                'status' => 'published',
                'verification_status' => 'owner_confirmed',
                'verified_at' => now(),
                'published_at' => now(),
            ]
        );

        // 3. Experience per PRD 5.2 (Wajib: 2026–sekarang, tanpa bulan buatan)
        Experience::firstOrCreate(
            ['title' => 'Senior Software and AI Engineer', 'start_year' => 2026],
            [
                'organization' => 'Independen',
                'employment_type' => 'Freelance',
                'location' => 'Tangerang dan Jakarta',
                'start_month' => null, // Sesuai PRD: tampilkan tahun tanpa bulan buatan
                'end_year' => null,
                'end_month' => null,
                'is_current' => true,
                'description_markdown' => "Mengembangkan perangkat lunak dan integrasi AI dengan menerjemahkan kebutuhan bisnis menjadi solusi teknis yang terstruktur, andal, dan mudah dipelihara. Lingkup peran mencakup perancangan arsitektur aplikasi, pengembangan layanan backend dan antarmuka pengguna, serta integrasi model AI ke dalam alur kerja yang relevan. Pendekatan engineering menekankan kualitas kode, keamanan data, pengujian, dan evaluasi keluaran AI agar solusi dapat digunakan secara bertanggung jawab dalam konteks operasional.",
                'status' => 'published',
                'verification_status' => 'owner_confirmed',
                'verified_at' => now(),
                'published_at' => now(),
                'sort_order' => 1,
            ]
        );

        // 4. Skill Groups & Skills per PRD 5.3
        $groups = [
            [
                'name' => 'Software Engineering',
                'description' => 'Disiplin arsitektur dan pengembangan perangkat lunak modern.',
                'skills' => [
                    'Clean Architecture & Domain Design',
                    'RESTful & GraphQL API Design',
                    'Type-Safe Frontend Development',
                    'Automated Testing (Unit & Feature)',
                ],
            ],
            [
                'name' => 'AI Engineering',
                'description' => 'Evaluasi, integrasi, dan operasionalisasi model kecerdasan buatan.',
                'skills' => [
                    'LLM Evaluation & Integration',
                    'RAG Pipeline Architecture',
                    'Prompt Engineering & Constraints',
                    'Safety & Data Observability',
                ],
            ],
            [
                'name' => 'Architecture & Delivery',
                'description' => 'Strategi pengiriman perangkat lunak andal dan skalabel.',
                'skills' => [
                    'Modular Monoliths & Microservices',
                    'CI/CD Automation Pipelines',
                    'Database Optimization & Indexing',
                    'Code Review & Quality Standards',
                ],
            ],
            [
                'name' => 'Data & Infrastructure',
                'description' => 'Pengelolaan basis data, komputasi terisolasi, dan infrastruktur.',
                'skills' => [
                    'Relational Databases (MariaDB, PostgreSQL)',
                    'Containerization (Docker)',
                    'Caching & Queue Management',
                    'Security & Role-based Access',
                ],
            ],
        ];

        foreach ($groups as $gIndex => $gData) {
            $group = SkillGroup::firstOrCreate(
                ['name' => $gData['name']],
                [
                    'description' => $gData['description'],
                    'sort_order' => $gIndex + 1,
                ]
            );

            foreach ($gData['skills'] as $sIndex => $skillName) {
                Skill::firstOrCreate(
                    [
                        'skill_group_id' => $group->id,
                        'name' => $skillName,
                    ],
                    [
                        'sort_order' => $sIndex + 1,
                    ]
                );
                $this->call(\Database\Seeders\Tables\CacheLocksSeeder::class);
        $this->call(\Database\Seeders\Tables\ContactMessagesSeeder::class);
    }
        }

        // 5. Featured Projects per PRD 5.3
        $projects = [
            [
                'slug' => 'platform-manajemen-konten-terintegrasi',
                'title' => 'Platform Manajemen Konten Terintegrasi',
                'category' => 'Software Engineering',
                'featured' => true,
                'excerpt' => 'Perancangan sistem modular dengan performa tinggi, alur kerja revisi aman, dan optimasi query multi-tier.',
                'role_summary' => 'Lead Software Architect',
                'problem_markdown' => "Kebutuhan terhadap sistem penerbitan konten yang memiliki integritas verifikasi tinggi, pencegahan kebocoran draft ke ranah publik, dan kemudahan pemeliharaan tanpa dependensi berlebih.",
                'solution_markdown' => "Menerapkan pendekatan modular monolith dengan Laravel dan React/Inertia SSR. Mengimplementasikan snapshot revisi JSON transaksional, isolasi cache otomatis per rilis, dan validasi server-side yang ketat.",
                'tradeoffs_markdown' => "Memilih monolith modular dibanding microservices untuk meminimalkan kompleksitas operasional pada skala awal seraya menjaga batas pemisahan domain yang bersih.",
                'outcomes_markdown' => "Sistem terbukti andal dalam menyajikan halaman dengan latensi rendah, menjamin draft tidak terpublikasi tanpa persetujuan, dan mempermudah audit riwayat konten.",
                'sort_order' => 1,
            ],
            [
                'slug' => 'sistem-otomasi-alur-kerja-llm',
                'title' => 'Sistem Otomasi Alur Kerja Berbasis LLM',
                'category' => 'AI Engineering',
                'featured' => true,
                'excerpt' => 'Integrasi model bahasa cerdas untuk ekstraksi dan validasi dokumen semi-terstruktur dengan kontrol keamanan ketat.',
                'role_summary' => 'Senior AI Engineer',
                'problem_markdown' => "Proses peninjauan dokumen manual membutuhkan waktu lama dan rawan kekeliruan, sementara model bahasa generatif tanpa kontrol rawan menghasilkan halusinasi dan kebocoran data sensitif.",
                'solution_markdown' => "Merancang pipeline RAG dengan verifikasi skema keluaran terstruktur (JSON Schema enforcement), penanganan latensi melalui antrean asinkron, dan logging data teranonimkan.",
                'tradeoffs_markdown' => "Membatasi fleksibilitas prompt bebas demi memastikan keluaran konsisten 100% terhadap kontrak data yang divalidasi sistem.",
                'outcomes_markdown' => "Meningkatkan akurasi ekstraksi informasi dokumen terstruktur secara konsisten dan memangkas waktu proses tanpa mengorbankan kepatuhan keamanan data.",
                'sort_order' => 2,
            ],
            [
                'slug' => 'layanan-api-transaksional-terdistribusi',
                'title' => 'Layanan API Transaksional Terdistribusi',
                'category' => 'Backend Services',
                'featured' => true,
                'excerpt' => 'Pembangunan endpoint berlatensi rendah dengan penanganan lonjakan antrean dan observabilitas terpadu.',
                'role_summary' => 'Senior Backend Engineer',
                'problem_markdown' => "Tantangan lonjakan beban transaksi simultan yang menyebabkan risiko duplikasi data dan kegagalan notifikasi pihak ketiga.",
                'solution_markdown' => "Menerapkan token idempoten deduplikasi, transaksi database bertahap, dan pemrosesan notifikasi berbasis worker antrean yang dapat di-retry otomatis.",
                'tradeoffs_markdown' => "Sedikit trade-off pada throughput puncak demi jaminan integritas data bebas duplikasi 100% pada kondisi jaringan fluktuatif.",
                'outcomes_markdown' => "Penyelesaian transaksi tercatat stabil dengan pemulihan otomatis pada kegagalan layanan eksternal.",
                'sort_order' => 3,
            ],
        ];

        foreach ($projects as $pData) {
            Project::firstOrCreate(
                ['slug' => $pData['slug']],
                array_merge($pData, [
                    'status' => 'published',
                    'verification_status' => 'owner_confirmed',
                    'verified_at' => now(),
                    'published_at' => now(),
                ])
            );
        }

        // 6. Social Links per PRD 5.4 & 9
        $socials = [
            ['label' => 'GitHub', 'url' => 'https://github.com', 'sort_order' => 1],
            ['label' => 'LinkedIn', 'url' => 'https://linkedin.com', 'sort_order' => 2],
        ];

        foreach ($socials as $sData) {
            SocialLink::firstOrCreate(
                ['label' => $sData['label']],
                $sData
            );
        }
    }
}
