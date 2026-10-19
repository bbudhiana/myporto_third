import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import Card from '@/Components/UI/Card';
import Badge from '@/Components/UI/Badge';
import Button from '@/Components/UI/Button';
import { ProjectDetailDTO } from '@/types/portfolio';

interface Props {
    project: ProjectDetailDTO;
}

export default function ProjectShow({ project }: Props) {
    const pageTitle = `${project.title} | Studi Kasus Bana Budhiana`;

    return (
        <PublicLayout>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={project.excerpt} />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={project.excerpt} />
                <meta property="og:type" content="article" />
                <link rel="canonical" href={`http://localhost:9007/projects/${project.slug}`} />
            </Head>

            {/* Header & Meta */}
            <article className="py-12 sm:py-16">
                <div className="max-w-4xl mx-auto px-5 sm:px-8 space-y-8">
                    {/* Breadcrumbs / Back button */}
                    <div className="flex items-center gap-2 text-sm text-[#475569]">
                        <Link href="/projects" className="hover:text-[#0F766E] flex items-center gap-1">
                            ← Kembali ke Daftar Proyek
                        </Link>
                    </div>

                    <header className="space-y-4">
                        <div className="flex flex-wrap items-center gap-2">
                            <Badge variant="accent">{project.category}</Badge>
                            <span className="text-xs text-[#475569] font-medium">
                                Peran: {project.roleSummary}
                            </span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#172B3A] tracking-tight leading-tight">
                            {project.title}
                        </h1>

                        <p className="text-lg sm:text-xl text-[#475569] leading-relaxed">
                            {project.excerpt}
                        </p>

                        {/* Technology Badges */}
                        {project.skills.length > 0 && (
                            <div className="pt-2 flex flex-wrap gap-2">
                                {project.skills.map((skill, idx) => (
                                    <Badge key={idx} variant="neutral">
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        )}

                        {/* External Project Links per PRD */}
                        {(project.projectUrl || project.repositoryUrl) && (
                            <div className="pt-4 flex flex-wrap items-center gap-3">
                                {project.projectUrl && (
                                    <Button
                                        href={project.projectUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        variant="primary"
                                        size="sm"
                                    >
                                        Kunjungi Proyek ↗
                                    </Button>
                                )}
                                {project.repositoryUrl && (
                                    <Button
                                        href={project.repositoryUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        variant="outline"
                                        size="sm"
                                    >
                                        Repositori Kode ↗
                                    </Button>
                                )}
                            </div>
                        )}
                    </header>

                    {/* Cover Media if present */}
                                 {project.coverUrl && (
                         <div className="rounded-2xl overflow-hidden border border-[#DDE5EA] shadow-xs">
                             <img
                                 src={project.coverUrl}
                                 alt={project.title}
                                 className="w-full h-auto object-contain"
                             />
                         </div>
                     )}

                    {/* Study Case Core Sections per PRD 5.3 */}
                    <div className="space-y-10 pt-6">
                        {/* 1. Problem Statement */}
                        <section className="space-y-3">
                            <h2 className="text-xl sm:text-2xl font-bold text-[#172B3A] flex items-center gap-2">
                                <span className="w-2 h-6 bg-[#0F766E] rounded-full inline-block" />
                                Konteks & Masalah
                            </h2>
                            <div className="text-base text-[#475569] leading-relaxed whitespace-pre-line pl-4 border-l-2 border-[#DDE5EA]">
                                {project.problemMarkdown}
                            </div>
                        </section>

                        {/* 2. Solution & Technical Approach */}
                        <section className="space-y-3">
                            <h2 className="text-xl sm:text-2xl font-bold text-[#172B3A] flex items-center gap-2">
                                <span className="w-2 h-6 bg-[#0F766E] rounded-full inline-block" />
                                Pendekatan & Solusi Teknis
                            </h2>
                            <div className="text-base text-[#475569] leading-relaxed whitespace-pre-line pl-4 border-l-2 border-[#DDE5EA]">
                                {project.solutionMarkdown}
                            </div>
                        </section>

                        {/* 3. Trade-offs & Engineering Decisions */}
                        {project.tradeoffsMarkdown && (
                            <section className="space-y-3">
                                <h2 className="text-xl sm:text-2xl font-bold text-[#172B3A] flex items-center gap-2">
                                    <span className="w-2 h-6 bg-[#0F766E] rounded-full inline-block" />
                                    Trade-off & Keputusan Rekayasa
                                </h2>
                                <div className="text-base text-[#475569] leading-relaxed whitespace-pre-line pl-4 border-l-2 border-[#DDE5EA]">
                                    {project.tradeoffsMarkdown}
                                </div>
                            </section>
                        )}

                        {/* 4. Outcomes & Results */}
                        {project.outcomesMarkdown && (
                            <section className="space-y-3">
                                <h2 className="text-xl sm:text-2xl font-bold text-[#172B3A] flex items-center gap-2">
                                <span className="w-2 h-6 bg-[#0F766E] rounded-full inline-block" />
                                Hasil & Dampak Sistem
                                </h2>
                                <div className="text-base text-[#475569] leading-relaxed whitespace-pre-line pl-4 border-l-2 border-[#DDE5EA]">
                                    {project.outcomesMarkdown}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Media Attachments */}
                    {project.media && project.media.length > 0 && (
                        <div className="pt-8 border-t border-[#DDE5EA] space-y-6">
                            <h3 className="text-xl font-bold text-[#172B3A]">
                                Lampiran & Dokumentasi Visual
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {project.media.map((item) => (
                                    <div key={item.id} className="rounded-xl border border-[#DDE5EA] overflow-hidden bg-white">
                                        <img
                                            src={item.url}
                                            alt={item.altText || project.title}
                                            className="w-full h-48 object-cover"
                                            loading="lazy"
                                        />
                                        {item.caption && (
                                            <p className="p-3 text-xs text-[#475569] border-t border-[#DDE5EA]">
                                                {item.caption}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Contextual CTA per PRD 4 */}
                    <div className="mt-12 p-8 rounded-2xl bg-[#F0F7F6] border border-[#DDE5EA] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                        <div className="space-y-1">
                            <h3 className="text-lg font-bold text-[#172B3A]">
                                Tertarik dengan Pendekatan Solusi Ini?
                            </h3>
                            <p className="text-sm text-[#475569]">
                                Diskusikan kebutuhan arsitektur atau integrasi AI Anda bersama Bana Budhiana.
                            </p>
                        </div>
                        <Button href="/#contact" variant="primary" size="md">
                            Hubungi Saya
                        </Button>
                    </div>
                </div>
            </article>
        </PublicLayout>
    );
}
