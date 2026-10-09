import React from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import Button from '@/Components/UI/Button';
import Card from '@/Components/UI/Card';
import Badge from '@/Components/UI/Badge';

interface Props {
    canLogin?: boolean;
}

export default function Welcome({ canLogin }: Props) {
    return (
        <PublicLayout>
            <Head title="Bana Budhiana | Senior Software and AI Engineer">
                <meta
                    name="description"
                    content="Portofolio profesional Bana Budhiana, Senior Software and AI Engineer. Merancang perangkat lunak dan solusi AI dengan fokus pada kebutuhan bisnis, keandalan sistem, dan kemudahan pengembangan."
                />
            </Head>

            {/* Hero Section per PRD 5.1 & 6.3 */}
            <section className="py-16 sm:py-24 border-b border-[#DDE5EA]">
                <div className="max-w-6xl mx-auto px-5 sm:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        {/* Text Content (7 cols on desktop) */}
                        <div className="lg:col-span-7 space-y-6">
                            <div className="inline-flex items-center gap-2">
                                <Badge variant="accent">
                                    Portofolio Profesional
                                </Badge>
                                <span className="text-xs text-[#475569] font-medium">
                                    Tangerang & Jakarta • 2026
                                </span>
                            </div>

                            <div className="space-y-3">
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#172B3A] tracking-tight leading-[1.15]">
                                    Bana Budhiana
                                </h1>
                                <p className="text-xl sm:text-2xl font-semibold text-[#0F766E] tracking-tight">
                                    Senior Software and AI Engineer
                                </p>
                            </div>

                            <p className="text-base sm:text-lg text-[#475569] leading-relaxed max-w-2xl">
                                Merancang perangkat lunak dan solusi AI dengan fokus pada kebutuhan bisnis, keandalan sistem, dan kemudahan pengembangan. Mengembangkan arsitektur aplikasi end-to-end dengan integritas data dan kode yang teruji.
                            </p>

                            <div className="flex flex-wrap items-center gap-4 pt-2">
                                <Button href="#projects" variant="primary" size="lg">
                                    Lihat Proyek
                                </Button>
                                <Button href="#contact" variant="secondary" size="lg">
                                    Hubungi Saya
                                </Button>
                            </div>
                        </div>

                        {/* Visual / Monogram Composition per PRD 6.3 (5 cols on desktop) */}
                        <div className="lg:col-span-5 flex justify-center lg:justify-end">
                            <div className="w-full max-w-sm rounded-3xl bg-gradient-to-br from-[#FFFFFF] to-[#F0F7F6] border border-[#DDE5EA] p-8 shadow-sm flex flex-col items-center text-center space-y-6">
                                <div className="w-28 h-28 rounded-2xl bg-[#E3F3EF] border-2 border-[#0F766E]/20 flex items-center justify-center text-4xl font-extrabold text-[#0F766E] shadow-inner">
                                    BB
                                </div>
                                <div className="space-y-1">
                                    <h3 className="font-bold text-lg text-[#172B3A]">
                                        Bana Budhiana
                                    </h3>
                                    <p className="text-xs text-[#475569] font-medium">
                                        Engineering • AI Solutions • Web Architecture
                                    </p>
                                </div>
                                <div className="w-full pt-4 border-t border-[#DDE5EA] grid grid-cols-2 gap-3 text-left">
                                    <div className="p-3 bg-white rounded-xl border border-[#DDE5EA]/80">
                                        <p className="text-xs text-[#475569]">Fokus</p>
                                        <p className="text-sm font-semibold text-[#172B3A]">Full-Stack & AI</p>
                                    </div>
                                    <div className="p-3 bg-white rounded-xl border border-[#DDE5EA]/80">
                                        <p className="text-xs text-[#475569]">Status</p>
                                        <p className="text-sm font-semibold text-[#0F766E]">Aktif 2026</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tentang Section per PRD 5.1 (#about) */}
            <section id="about" className="py-16 sm:py-20 border-b border-[#DDE5EA]">
                <div className="max-w-6xl mx-auto px-5 sm:px-8">
                    <div className="max-w-3xl space-y-6">
                        <Badge variant="neutral">Tentang & Pendekatan Kerja</Badge>
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#172B3A] tracking-tight">
                            Menerjemahkan Kompleksitas Menjadi Solusi yang Andal
                        </h2>
                        <div className="space-y-4 text-base text-[#475569] leading-relaxed">
                            <p>
                                Sebagai Software dan AI Engineer, saya mengutamakan pemecahan masalah yang berorientasi pada nilai nyata dan keberlanjutan sistem jangka panjang. Pendekatan rekayasa perangkat lunak yang saya terapkan menekankan kontrak data yang kokoh, modularitas arsitektur, dan otomatisasi pengujian.
                            </p>
                            <p>
                                Pada ranah integrasi model kecerdasan buatan, fokus utama adalah keandalan keluaran, efisiensi latensi, dan kepatuhan privasi data, memastikan adopsi AI memberikan manfaat praktis dan terukur bagi operasional bisnis.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Proyek Unggulan Section per PRD 5.3 (#projects) */}
            <section id="projects" className="py-16 sm:py-20 border-b border-[#DDE5EA] bg-white">
                <div className="max-w-6xl mx-auto px-5 sm:px-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10">
                        <div>
                            <Badge variant="accent">Bukti & Hasil Kerja</Badge>
                            <h2 className="text-2xl sm:text-3xl font-bold text-[#172B3A] tracking-tight mt-2">
                                Studi Kasus & Proyek Pilihan
                            </h2>
                        </div>
                        <Button href="/projects" variant="outline" size="sm">
                            Semua Proyek →
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Placeholder Card for CMS integration in Phase 4 */}
                        <Card hoverEffect className="flex flex-col justify-between">
                            <div className="space-y-4">
                                <div className="h-44 rounded-xl bg-[#F0F7F6] border border-[#DDE5EA] flex items-center justify-center p-6 text-center">
                                    <span className="text-xs font-semibold uppercase tracking-wider text-[#0F766E]">
                                        Enterprise Architecture
                                    </span>
                                </div>
                                <div className="space-y-2">
                                    <Badge variant="neutral">Software Engineering</Badge>
                                    <h3 className="text-lg font-bold text-[#172B3A]">
                                        Platform Manajemen Konten Terintegrasi
                                    </h3>
                                    <p className="text-sm text-[#475569] line-clamp-3">
                                        Perancangan sistem modular dengan performa tinggi, alur kerja revisi aman, dan optimasi query multi-tier.
                                    </p>
                                </div>
                            </div>
                            <div className="mt-6 pt-4 border-t border-[#DDE5EA] flex items-center justify-between text-xs text-[#475569]">
                                <span>Peran: Lead Architect</span>
                                <span className="text-[#0F766E] font-medium">Published</span>
                            </div>
                        </Card>

                        <Card hoverEffect className="flex flex-col justify-between">
                            <div className="space-y-4">
                                <div className="h-44 rounded-xl bg-[#E3F3EF] border border-[#0F766E]/20 flex items-center justify-center p-6 text-center">
                                    <span className="text-xs font-semibold uppercase tracking-wider text-[#0F766E]">
                                        AI & Data Integration
                                    </span>
                                </div>
                                <div className="space-y-2">
                                    <Badge variant="neutral">AI Engineering</Badge>
                                    <h3 className="text-lg font-bold text-[#172B3A]">
                                        Sistem Otomasi Alur Kerja Berbasis LLM
                                    </h3>
                                    <p className="text-sm text-[#475569] line-clamp-3">
                                        Integrasi model bahasa cerdas untuk ekstraksi dan validasi dokumen semi-terstruktur dengan validasi ketat.
                                    </p>
                                </div>
                            </div>
                            <div className="mt-6 pt-4 border-t border-[#DDE5EA] flex items-center justify-between text-xs text-[#475569]">
                                <span>Peran: AI Engineer</span>
                                <span className="text-[#0F766E] font-medium">Published</span>
                            </div>
                        </Card>

                        <Card hoverEffect className="flex flex-col justify-between">
                            <div className="space-y-4">
                                <div className="h-44 rounded-xl bg-[#F0F7F6] border border-[#DDE5EA] flex items-center justify-center p-6 text-center">
                                    <span className="text-xs font-semibold uppercase tracking-wider text-[#0F766E]">
                                        High-Scale API
                                    </span>
                                </div>
                                <div className="space-y-2">
                                    <Badge variant="neutral">Backend Services</Badge>
                                    <h3 className="text-lg font-bold text-[#172B3A]">
                                        Layanan API Transaksional Terdistribusi
                                    </h3>
                                    <p className="text-sm text-[#475569] line-clamp-3">
                                        Pembangunan endpoint berlatensi rendah dengan penanganan lonjakan antrean dan observabilitas lengkap.
                                    </p>
                                </div>
                            </div>
                            <div className="mt-6 pt-4 border-t border-[#DDE5EA] flex items-center justify-between text-xs text-[#475569]">
                                <span>Peran: Backend Engineer</span>
                                <span className="text-[#0F766E] font-medium">Published</span>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Pengalaman Section per PRD 5.2 (#experience) */}
            <section id="experience" className="py-16 sm:py-20 border-b border-[#DDE5EA]">
                <div className="max-w-6xl mx-auto px-5 sm:px-8">
                    <div className="max-w-2xl mb-10">
                        <Badge variant="accent">Riwayat Karir</Badge>
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#172B3A] tracking-tight mt-2">
                            Pengalaman Profesional
                        </h2>
                    </div>

                    <div className="space-y-8 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-[#DDE5EA]">
                        {/* Wajib per PRD 5.2: Senior Software and AI Engineer 2026-sekarang */}
                        <div className="relative flex items-start gap-6 group">
                            <div className="w-7 h-7 rounded-full bg-[#0F766E] ring-4 ring-[#E3F3EF] flex items-center justify-center shrink-0 mt-1">
                                <div className="w-2.5 h-2.5 rounded-full bg-white" />
                            </div>
                            <Card className="flex-1">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                                    <h3 className="text-lg font-bold text-[#172B3A]">
                                        Senior Software and AI Engineer
                                    </h3>
                                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#E3F3EF] text-[#0F766E] w-fit">
                                        2026 – Sekarang
                                    </span>
                                </div>
                                <p className="text-xs font-medium text-[#475569] mb-3">
                                    Independen • Tangerang & Jakarta (Freelance)
                                </p>
                                <p className="text-sm text-[#475569] leading-relaxed">
                                    Mengembangkan perangkat lunak dan integrasi AI dengan menerjemahkan kebutuhan bisnis menjadi solusi teknis yang terstruktur, andal, dan mudah dipelihara. Lingkup peran mencakup perancangan arsitektur aplikasi, pengembangan layanan backend dan antarmuka pengguna, serta integrasi model AI ke dalam alur kerja operasional.
                                </p>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Kompetensi Section per PRD 5.3 (#skills) */}
            <section id="skills" className="py-16 sm:py-20 border-b border-[#DDE5EA] bg-white">
                <div className="max-w-6xl mx-auto px-5 sm:px-8">
                    <div className="max-w-2xl mb-10">
                        <Badge variant="neutral">Kompetensi Inti</Badge>
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#172B3A] tracking-tight mt-2">
                            Keahlian & Disiplin Rekayasa
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Card soft className="space-y-3">
                            <h3 className="font-bold text-base text-[#172B3A]">
                                Software Engineering
                            </h3>
                            <ul className="text-sm text-[#475569] space-y-1.5 list-disc list-inside">
                                <li>Clean Architecture & Domain Design</li>
                                <li>RESTful & GraphQL API Design</li>
                                <li>Type-Safe Frontend Development</li>
                                <li>Automated Testing (Unit & Feature)</li>
                            </ul>
                        </Card>

                        <Card soft className="space-y-3">
                            <h3 className="font-bold text-base text-[#172B3A]">
                                AI Engineering
                            </h3>
                            <ul className="text-sm text-[#475569] space-y-1.5 list-disc list-inside">
                                <li>LLM Evaluation & Integration</li>
                                <li>RAG Pipeline Architecture</li>
                                <li>Prompt Engineering & Constraints</li>
                                <li>Safety & Data Observability</li>
                            </ul>
                        </Card>

                        <Card soft className="space-y-3">
                            <h3 className="font-bold text-base text-[#172B3A]">
                                Architecture & Delivery
                            </h3>
                            <ul className="text-sm text-[#475569] space-y-1.5 list-disc list-inside">
                                <li>Modular Monoliths & Microservices</li>
                                <li>CI/CD Automation Pipelines</li>
                                <li>Database Optimization & Indexing</li>
                                <li>Code Review & Quality Standards</li>
                            </ul>
                        </Card>

                        <Card soft className="space-y-3">
                            <h3 className="font-bold text-base text-[#172B3A]">
                                Data & Infrastructure
                            </h3>
                            <ul className="text-sm text-[#475569] space-y-1.5 list-disc list-inside">
                                <li>Relational Databases (MariaDB, PostgreSQL)</li>
                                <li>Containerization (Docker)</li>
                                <li>Caching & Queue Management</li>
                                <li>Security & Role-based Access</li>
                            </ul>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Kontak Section per PRD 7.1 (#contact) */}
            <section id="contact" className="py-16 sm:py-24">
                <div className="max-w-6xl mx-auto px-5 sm:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        <div className="lg:col-span-5 space-y-6">
                            <Badge variant="accent">Mulai Diskusi</Badge>
                            <h2 className="text-3xl font-bold text-[#172B3A] tracking-tight">
                                Hubungi Saya
                            </h2>
                            <p className="text-base text-[#475569] leading-relaxed">
                                Tertarik mendiskusikan peluang kolaborasi, konsultasi arsitektur perangkat lunak, atau eksplorasi integrasi solusi AI? Silakan kirimkan pesan melalui formulir ini.
                            </p>
                            <div className="p-5 rounded-2xl bg-[#F0F7F6] border border-[#DDE5EA] space-y-2">
                                <p className="text-xs font-semibold uppercase tracking-wider text-[#0F766E]">
                                    Komitmen Privasi
                                </p>
                                <p className="text-xs text-[#475569]">
                                    Informasi yang Anda kirimkan hanya digunakan untuk merespons kebutuhan Anda secara profesional dan tidak pernah dibagikan kepada pihak lain.
                                </p>
                            </div>
                        </div>

                        <div className="lg:col-span-7">
                            <Card className="shadow-sm">
                                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-semibold text-[#172B3A] mb-1">
                                                Nama Lengkap <span className="text-[#B91C1C]">*</span>
                                            </label>
                                            <input
                                                id="name"
                                                type="text"
                                                placeholder="Nama Anda"
                                                className="w-full px-4 py-2.5 rounded-xl border border-[#64748B]/60 hover:border-[#64748B] focus-visible:outline-2 focus-visible:outline-[#1D4ED8] text-base"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-semibold text-[#172B3A] mb-1">
                                                Alamat Email <span className="text-[#B91C1C]">*</span>
                                            </label>
                                            <input
                                                id="email"
                                                type="email"
                                                placeholder="nama@perusahaan.com"
                                                className="w-full px-4 py-2.5 rounded-xl border border-[#64748B]/60 hover:border-[#64748B] focus-visible:outline-2 focus-visible:outline-[#1D4ED8] text-base"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="purpose" className="block text-sm font-semibold text-[#172B3A] mb-1">
                                            Tujuan Diskusi <span className="text-[#B91C1C]">*</span>
                                        </label>
                                        <select
                                            id="purpose"
                                            className="w-full px-4 py-2.5 rounded-xl border border-[#64748B]/60 hover:border-[#64748B] focus-visible:outline-2 focus-visible:outline-[#1D4ED8] text-base bg-white"
                                        >
                                            <option value="cooperation">Kerja Sama Proyek / Klien</option>
                                            <option value="opportunity">Peluang Karir Profesional</option>
                                            <option value="discussion">Diskusi Teknis / Lainnya</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-semibold text-[#172B3A] mb-1">
                                            Pesan <span className="text-[#B91C1C]">*</span>
                                        </label>
                                        <textarea
                                            id="message"
                                            rows={4}
                                            placeholder="Deskripsikan konteks kebutuhan atau pertanyaan Anda..."
                                            className="w-full px-4 py-2.5 rounded-xl border border-[#64748B]/60 hover:border-[#64748B] focus-visible:outline-2 focus-visible:outline-[#1D4ED8] text-base"
                                        />
                                    </div>

                                    <div className="flex items-start gap-2 pt-1">
                                        <input
                                            id="consent"
                                            type="checkbox"
                                            className="mt-1 w-4 h-4 rounded text-[#0F766E] border-[#64748B]/60 focus:ring-[#1D4ED8]"
                                        />
                                        <label htmlFor="consent" className="text-xs text-[#475569]">
                                            Saya menyetujui pemrosesan data kontak untuk keperluan komunikasi ini sesuai{' '}
                                            <a href="/privacy" className="text-[#0F766E] underline hover:text-[#115E59]">
                                                Kebijakan Privasi
                                            </a>
                                            .
                                        </label>
                                    </div>

                                    <div className="pt-2">
                                        <Button type="submit" variant="primary" size="md" className="w-full sm:w-auto">
                                            Kirim Pesan
                                        </Button>
                                    </div>
                                </form>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
