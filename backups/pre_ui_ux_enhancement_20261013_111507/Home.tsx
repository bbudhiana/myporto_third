import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import Button from '@/Components/UI/Button';
import Card from '@/Components/UI/Card';
import Badge from '@/Components/UI/Badge';
import {
    ExperienceDTO,
    ProfileDTO,
    ProjectCardDTO,
    SkillGroupDTO,
    SocialLinkDTO,
} from '@/types/portfolio';
import ContactForm from '@/Components/Portfolio/ContactForm';

interface Props {
    profile: ProfileDTO | null;
    experiences: ExperienceDTO[];
    skillGroups: SkillGroupDTO[];
    featuredProjects: ProjectCardDTO[];
    socialLinks: SocialLinkDTO[];
    submissionToken: string;
}

export default function Home({
    profile,
    experiences,
    skillGroups,
    featuredProjects,
    socialLinks,
    submissionToken,
}: Props) {
    const displayName = profile?.displayName || 'Bana Budhiana';
    const headline = profile?.headline || 'Senior Software and AI Engineer';
    const heroSummary =
        profile?.heroSummary ||
        'Merancang perangkat lunak dan solusi AI dengan fokus pada kebutuhan bisnis, keandalan sistem, dan kemudahan pengembangan.';

    // Structured Data JSON-LD per PRD 11.2
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: displayName,
        jobTitle: headline,
        description: heroSummary,
        url: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:9007',
        sameAs: socialLinks.map((s) => s.url),
    };

    return (
        <PublicLayout>
            <Head>
                <title>{`${displayName} | ${headline}`}</title>
                <meta name="description" content={heroSummary} />
                <meta property="og:title" content={`${displayName} | ${headline}`} />
                <meta property="og:description" content={heroSummary} />
                <meta property="og:type" content="profile" />
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            </Head>

            {/* Hero Section per PRD 5.1 & 6.3 */}
            <section className="py-16 sm:py-24 border-b border-[#DDE5EA] bg-gradient-to-tr from-[#F0F7F6]/10 to-[#E3F3EF]/10">
                <div className="max-w-6xl mx-auto px-5 sm:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-7 space-y-6">
                            <div className="inline-flex items-center gap-2">
                                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#0F766E]/10"><span className="text-[0F766E]">*</span><span className="text-xs font-medium text-[#0F766E] uppercase tracking-wider">Portofolio Profesional</span></div>
                                {profile?.location && (
                                    <span className="text-xs text-[#475569] font-medium">
                                        {profile.location}
                                    </span>
                                )}
                            </div>

                            <div className="space-y-3">
                                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-[#172B3A] tracking-tight leading-[1.15]">
                                    {displayName}
                                </h1>
                                <p className="text-xl sm:text-2xl font-bold bg-[length:0pt_0pt_0pt_1.5pt] bg-gradient-to-r from-[#0F766E] to-[#115E59] bg-clip-text text-transparent">
                                    {headline}
                                </p>
                            </div>

                            <p className="text-base sm:text-lg font-medium text-[#475569] leading-relaxed max-w-2xl">
                                {heroSummary}
                            </p>

                            <div className="flex flex-wrap items-center gap-4 pt-2">
                                <Button href="#projects" variant="primary" size="lg" className="hover:shadow-md hover:shadow-[#0F766E]/20 active:scale-[0.98]">
                                    Lihat Proyek
                                </Button>
                                <Button href="#contact" variant="secondary" size="lg" className="hover:shadow-md hover:shadow-[#0F766E]/20 active:scale-[0.98]">
                                    Hubungi Saya
                                </Button>
                                {profile?.hasResume && (
    <a href="/resume" className="inline-flex items-center justify-center font-medium rounded-xl transition duration-150 ease-in-out select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] border border-[#DDE5EA] bg-white text-[#172B3A] hover:bg-[#F0F7F6] hover:border-[#64748B] active:bg-[#E3F3EF] px-6 py-3.5 text-lg hover:shadow-md hover:shadow-[#0F766E]/20 active:scale-[0.98]">Unduh CV</a>
                                )}
                            </div>
                        </div>

                        {/* Monogram / Visual Composition (5 cols) */}
                        <div className="lg:col-span-5 flex justify-center lg:justify-end">
                            <div className="w-full max-w-sm rounded-full border-4 border-[#0F766E]/20 bg-white p-4 flex flex-col items-center text-center space-y-4 hover:scale-[1.03] hover:transition-transform">
                                 {profile?.portraitUrl ? (
                                     <img
                                         src={profile.portraitUrl}
                                         alt="Portrait"
                                         className="w-28 h-28 rounded-2xl border-2 border-[#0F766E]/20 flex items-center justify-center text-4xl font-extrabold text-[#0F766E] shadow-inner object-cover"
                                     />
                                 ) : (
                                     <div className="w-28 h-28 rounded-2xl bg-[#E3F3EF] border-2 border-[#0F766E]/20 flex items-center justify-center text-4xl font-extrabold text-[#0F766E] shadow-inner">
                                         BB
                                     </div>
                                 )}
                                <div className="space-y-1">
                                    <h3 className="font-bold text-lg text-[#172B3A]">
                                        {displayName}
                                    </h3>
                                    <p className="text-xs text-[#475569] font-medium">
                                        {headline}
                                    </p>
                                </div>

                                {socialLinks.length > 0 && (
                                    <div className="flex items-center gap-3 pt-2">
                                        {socialLinks.map((social) => (
                                            <a
                                                key={social.id}
                                                href={social.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-3 py-1.5 rounded-lg border border-[#DDE5EA] bg-white text-xs font-semibold text-[#172B3A] hover:bg-[#E3F3EF] hover:text-[#0F766E] transition-colors"
                                            >
                                                {social.label}
                                            </a>
                                        ))}
                                    </div>
                                )}
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
                        <div className="space-y-4 text-base text-[#475569] leading-relaxed whitespace-pre-line">
                            {profile?.aboutMarkdown || (
                                <>
                                    <p>
                                        Sebagai Software dan AI Engineer, saya mengutamakan pemecahan masalah yang berorientasi pada nilai nyata dan keberlanjutan sistem jangka panjang. Pendekatan rekayasa perangkat lunak yang saya terapkan menekankan kontrak data yang kokoh, modularitas arsitektur, dan otomatisasi pengujian.
                                    </p>
                                    <p>
                                        Pada ranah integrasi model kecerdasan buatan, fokus utama adalah keandalan keluaran, efisiensi latensi, dan kepatuhan privasi data, memastikan adopsi AI memberikan manfaat praktis dan terukur bagi operasional bisnis.
                                    </p>
                                </>
                            )}
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
                        {featuredProjects.map((project) => (
                            <Link
                                key={project.id}
                                href={`/projects/${project.slug}`}
                                className="group block focus-visible:outline-2 focus-visible:outline-[#1D4ED8] rounded-2xl"
                            >
                                <Card hoverEffect className="h-full flex flex-col justify-between">
                                    <div className="space-y-4">
                                        {project.coverUrl ? (
                                            <img
                                                src={project.coverUrl}
                                                alt={project.title}
                                                className="w-full h-44 object-cover rounded-xl border border-[#DDE5EA]"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="h-44 rounded-xl bg-[#F0F7F6] border border-[#DDE5EA] flex items-center justify-center p-6 text-center group-hover:bg-[#E3F3EF] transition-colors">
                                                <span className="text-xs font-semibold uppercase tracking-wider text-[#0F766E]">
                                                    {project.category}
                                                </span>
                                            </div>
                                        )}

                                        <div className="space-y-3">
                                            <Badge variant="neutral">{project.category}</Badge>
                                            <h3 className="text-lg font-bold text-[#172B3A] group-hover:text-[#0F766E] transition-colors">
                                                {project.title}
                                            </h3>
                                            <p className="text-sm text-[#475569] line-clamp-3">
                                                {project.excerpt}
                                            </p>
                                        </div>

                                        {project.skills.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5 pt-2">
                                                {project.skills.slice(0, 3).map((skill, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="text-xs px-2.5 py-0.5 rounded-md bg-[#F0F7F6] text-[#475569] font-medium"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-6 pt-4 border-t border-[#DDE5EA] flex items-center justify-between text-xs text-[#475569]">
                                        <span>Peran: {project.roleSummary}</span>
                                        <span className="text-[#0F766E] font-medium group-hover:underline">
                                            Baca Studi Kasus →
                                        </span>
                                    </div>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Garis Waktu Pengalaman Section per PRD 5.2 (#experience) */}
            <section id="experience" className="py-16 sm:py-20 border-b border-[#DDE5EA]">
                <div className="max-w-6xl mx-auto px-5 sm:px-8">
                    <div className="max-w-2xl mb-10">
                        <Badge variant="accent">Riwayat Karir</Badge>
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#172B3A] tracking-tight mt-2">
                            Pengalaman Profesional
                        </h2>
                    </div>

                    <div className="space-y-8 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-[#DDE5EA]">
                        {experiences.map((exp) => (
                            <div key={exp.id} className="relative flex items-start gap-6 group">
                                <div
                                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-1 ring-4 ${
                                        exp.isCurrent
                                            ? 'bg-[#0F766E] ring-[#E3F3EF]'
                                            : 'bg-[#64748B] ring-slate-100'
                                    }`}
                                >
                                    <div className="w-2.5 h-2.5 rounded-full bg-white" />
                                </div>
                                <Card className="flex-1">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                                        <h3 className="text-lg font-bold text-[#172B3A]">
                                            {exp.title}
                                        </h3>
                                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#E3F3EF] text-[#0F766E] w-fit">
                                            {exp.periodLabel}
                                        </span>
                                    </div>
                                    <p className="text-xs font-medium text-[#475569] mb-3">
                                        {[exp.organization, exp.employmentType, exp.location]
                                            .filter(Boolean)
                                            .join(' • ')}
                                    </p>
                                    {exp.descriptionMarkdown && (
                                        <p className="text-sm text-[#475569] leading-relaxed whitespace-pre-line">
                                            {exp.descriptionMarkdown}
                                        </p>
                                    )}
                                </Card>
                            </div>
                        ))}
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
                        {skillGroups.map((group) => (
                            <Card key={group.id} soft className="space-y-4">
                                <div>
                                    <h3 className="font-bold text-base text-[#172B3A]">
                                        {group.name}
                                    </h3>
                                    {group.description && (
                                        <p className="text-xs text-[#475569] mt-1">
                                            {group.description}
                                        </p>
                                    )}
                                </div>
                                <ul className="text-sm text-[#475569] space-y-3 list-disc">
                                    {group.skills.map((skill) => (
                                        <li key={skill.id} className="leading-relaxed">
                                            <span className="font-medium text-[#172B3A]">{skill.name}</span>
                                            {skill.context && (
                                                <span className="ml-2 text-xs text-[#475569]"> – {skill.context}</span>
                                            )}
                                        </li>
                                        ))}
                                </ul>
                            </Card>
                        ))}
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
                            <div className="p-5 rounded-2xl bg-[#F0F7F6] border border-[#DDE5EA] space-y-3">
                                <p className="text-xs font-semibold uppercase tracking-wider text-[#0F766E]">
                                    Komitmen Privasi
                                </p>
                                <p className="text-xs text-[#475569]">
                                    Informasi yang Anda kirimkan hanya digunakan untuk merespons kebutuhan Anda secara profesional dan tidak pernah dibagikan kepada pihak lain sesuai{' '}
                                    <Link href="/privacy" className="text-[#0F766E] underline">
                                        Kebijakan Privasi
                                    </Link>
                                    .
                                </p>
                            </div>
                        </div>

                        <div className="lg:col-span-7">
                            <Card className="shadow-xs">
                                <ContactForm submissionToken={submissionToken} />
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
