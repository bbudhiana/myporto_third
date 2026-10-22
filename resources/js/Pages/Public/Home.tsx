import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import Button from '@/Components/UI/Button';
import Card from '@/Components/UI/Card';
import Badge from '@/Components/UI/Badge';
import SectionHeading from '@/Components/UI/SectionHeading';
import ProjectCard from '@/Components/Portfolio/ProjectCard';
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
    const { site } = usePage().props as { site?: { url?: string } };
    const displayName = profile?.displayName || 'Bana Budhiana';
    const headline = profile?.headline || 'Senior Software and AI Engineer';
    const heroSummary =
        profile?.heroSummary ||
        'Merancang perangkat lunak dan solusi AI dengan fokus pada kebutuhan bisnis, keandalan sistem, dan kemudahan pengembangan.';

    // Data nyata dari props — tidak ada angka rekaan.
    const currentRole = experiences.find((exp) => exp.isCurrent);
    const currentRoleLabel = currentRole
        ? [currentRole.employmentType, currentRole.organization].filter(Boolean).join(' · ')
        : null;
    const proofStats = [
        { label: 'Studi Kasus', value: featuredProjects.length },
        { label: 'Kelompok Kompetensi', value: skillGroups.length },
        { label: 'Rekam Jejak', value: experiences.length },
    ];

    // Structured Data JSON-LD per PRD 11.2
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: displayName,
        jobTitle: headline,
        description: heroSummary,
        url: site?.url ?? (typeof window !== 'undefined' ? window.location.origin : ''),
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
                <link rel="canonical" href={`${site?.url ?? ''}/`} />
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            </Head>

            {/* Hero Section per PRD 5.1 & 6.3 */}
            <section className="relative overflow-hidden border-b border-[#DDE5EA] bg-gradient-to-tr from-[#F0F7F6]/70 via-[#F8FAFC] to-[#E3F3EF]/60">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#0F766E]/10 blur-3xl"
                />
                <div className="relative max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                        <div className="lg:col-span-7 space-y-7">
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#0F766E] ring-1 ring-[#0F766E]/20">
                                    <span className="relative flex h-2 w-2" aria-hidden="true">
                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0F766E] opacity-60 motion-reduce:animate-none" />
                                        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#0F766E]" />
                                    </span>
                                    {currentRoleLabel ? `Aktif · ${currentRoleLabel}` : 'Portofolio Profesional'}
                                </span>
                                {profile?.location && (
                                    <span className="text-xs font-medium text-[#475569]">
                                        {profile.location}
                                    </span>
                                )}
                            </div>

                            <div className="space-y-4">
                                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-[#172B3A] tracking-tight leading-[1.05]">
                                    {displayName}
                                </h1>
                                <p className="text-xl sm:text-2xl font-bold bg-[length:0pt_0pt_0pt_1.5pt] bg-gradient-to-r from-[#0F766E] to-[#115E59] bg-clip-text text-transparent">
                                    {headline}
                                </p>
                            </div>

                            <p className="text-base sm:text-lg font-medium text-[#475569] leading-relaxed max-w-2xl">
                                {heroSummary}
                            </p>

                            <div className="flex flex-wrap items-center gap-4">
                                <Button href="#projects" variant="primary" size="lg" className="hover:shadow-md hover:shadow-[#0F766E]/20 active:scale-[0.98]">
                                    Lihat Proyek
                                </Button>
                                <Button href="#contact" variant="secondary" size="lg" className="hover:shadow-md hover:shadow-[#0F766E]/20 active:scale-[0.98]">
                                    Hubungi Saya
                                </Button>
                                {profile?.hasResume && (
                                    <a href="/resume" className="inline-flex items-center justify-center font-medium rounded-xl transition duration-150 ease-in-out select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] min-h-[44px] border border-[#DDE5EA] bg-white text-[#172B3A] hover:bg-[#F0F7F6] hover:border-[#64748B] active:bg-[#E3F3EF] px-6 py-3.5 text-lg hover:shadow-md hover:shadow-[#0F766E]/20 active:scale-[0.98]">Unduh CV</a>
                                )}
                            </div>

                            {/* Proof row — angka dari data nyata (props DB) */}
                            <dl className="grid grid-cols-3 gap-4 border-t border-[#DDE5EA] pt-6 max-w-lg">
                                {proofStats.map((stat) => (
                                    <div key={stat.label} className="space-y-1">
                                        <dt className="order-2 text-xs font-medium uppercase tracking-wider text-[#475569]">
                                            {stat.label}
                                        </dt>
                                        <dd className="order-1 text-3xl font-extrabold tabular-nums text-[#172B3A]">
                                            {stat.value}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>

                        {/* Portrait card (5 cols) */}
                        <div className="lg:col-span-5">
                            <figure className="relative mx-auto max-w-sm overflow-hidden rounded-3xl border border-[#DDE5EA] bg-white shadow-xl transition-transform duration-300 hover:-translate-y-1 motion-reduce:hover:translate-y-0">
                                <div className="aspect-[4/5] w-full bg-[#F0F7F6]">
                                    {profile?.portraitUrl ? (
                                        <img
                                            src={profile.portraitUrl}
                                            alt={`Potret ${displayName}`}
                                            width={profile.portraitWidth ?? undefined}
                                            height={profile.portraitHeight ?? undefined}
                                            className="h-full w-full object-cover object-top"
                                            loading="eager"
                                            decoding="async"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center bg-[#E3F3EF] text-5xl font-extrabold text-[#0F766E]">
                                            BB
                                        </div>
                                    )}
                                </div>
                                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0B2029]/90 via-[#0B2029]/60 to-transparent px-5 pb-5 pt-12 text-white">
                                    <p className="text-sm font-semibold">{displayName}</p>
                                    <p className="text-xs text-white/80">{headline}</p>
                                </figcaption>
                            </figure>

                            {socialLinks.length > 0 && (
                                <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
                                    {socialLinks.map((social) => (
                                        <a
                                            key={social.id}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="rounded-lg border border-[#DDE5EA] bg-white px-3 py-1.5 text-xs font-semibold text-[#172B3A] transition-colors hover:bg-[#E3F3EF] hover:text-[#0F766E]"
                                        >
                                            {social.label}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Tentang Section per PRD 5.1 (#about) */}
            <section id="about" className="py-16 sm:py-20 border-b border-[#DDE5EA]">
                <div className="max-w-6xl mx-auto px-5 sm:px-8">
                    <div className="max-w-3xl space-y-6">
                        <SectionHeading
                            eyebrow="Tentang & Pendekatan Kerja"
                            title="Menerjemahkan Kompleksitas Menjadi Solusi yang Andal"
                        />
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
                        <SectionHeading
                            eyebrow="Bukti & Hasil Kerja"
                            title="Studi Kasus & Proyek Pilihan"
                        />
                        <Button href="/projects" variant="outline" size="sm">
                            Semua Proyek →
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredProjects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Garis Waktu Pengalaman Section per PRD 5.2 (#experience) */}
            <section id="experience" className="py-16 sm:py-20 border-b border-[#DDE5EA]">
                <div className="max-w-6xl mx-auto px-5 sm:px-8">
                    <div className="max-w-2xl mb-10">
                        <SectionHeading eyebrow="Riwayat Karir" title="Pengalaman Profesional" />
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
                        <SectionHeading eyebrow="Kompetensi Inti" title="Keahlian & Disiplin Rekayasa" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {skillGroups.map((group, index) => (
                            <Card key={group.id} soft className={`${index === 0 ? "space-y-4 border-2 border-[#0F766E]/20" : "space-y-4 border border-[#DDE5EA]/50"} hover:border-[#F0F7F6]/50 hover:transition-colors`}>
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
                            <SectionHeading
                                eyebrow="Mulai Diskusi"
                                title="Hubungi Saya"
                                lead="Tertarik mendiskusikan peluang kolaborasi, konsultasi arsitektur perangkat lunak, atau eksplorasi integrasi solusi AI? Silakan kirimkan pesan melalui formulir ini."
                            />
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

                            {profile?.publicEmail && (
                                <a
                                    href={`mailto:${profile.publicEmail}`}
                                    className="inline-flex items-center gap-2 text-sm font-medium text-[#0F766E] hover:underline"
                                >
                                    <span className="text-[#475569] font-normal">Atau tulis langsung ke</span>
                                    {profile.publicEmail}
                                </a>
                            )}
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
