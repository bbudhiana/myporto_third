import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import Card from '@/Components/UI/Card';
import Badge from '@/Components/UI/Badge';
import Button from '@/Components/UI/Button';

interface Props {
    project: any;
}

export default function ProjectPreview({ project }: Props) {
    return (
        <PublicLayout>
            <Head title={`[Preview] ${project.title}`} />

            {/* Private preview top banner per PRD 7.2 */}
            <div className="bg-amber-100 border-b border-amber-300 px-5 py-3 text-center text-sm font-semibold text-amber-900 flex items-center justify-between">
                <span>
                    ⚠️ Mode Preview Privat (Hanya Terlihat oleh Admin). Status Proyek: <span className="uppercase">{project.status}</span>
                </span>
                <div className="flex items-center gap-3">
                    <Link
                        href={`/admin/projects/${project.id}/edit`}
                        className="text-xs bg-amber-800 text-white px-3 py-1 rounded-lg hover:bg-amber-900 transition"
                    >
                        Edit Proyek
                    </Link>
                    <Link
                        href="/admin/projects"
                        className="text-xs underline text-amber-900 hover:text-black"
                    >
                        Tutup Preview
                    </Link>
                </div>
            </div>

            {/* Same layout as public ProjectShow */}
            <article className="py-12 sm:py-16">
                <div className="max-w-4xl mx-auto px-5 sm:px-8 space-y-8">
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

                        {project.skills.length > 0 && (
                            <div className="pt-2 flex flex-wrap gap-2">
                                {project.skills.map((skill: string, idx: number) => (
                                    <Badge key={idx} variant="neutral">
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        )}
                    </header>

                    {project.coverUrl && (
                        <div className="rounded-2xl overflow-hidden border border-[#DDE5EA] shadow-xs">
                            <img
                                src={project.coverUrl}
                                alt={project.title}
                                className="w-full h-auto max-h-[480px] object-cover"
                            />
                        </div>
                    )}

                    <div className="space-y-10 pt-6">
                        <section className="space-y-3">
                            <h2 className="text-xl sm:text-2xl font-bold text-[#172B3A] flex items-center gap-2">
                                <span className="w-2 h-6 bg-[#0F766E] rounded-full inline-block" />
                                Konteks & Masalah
                            </h2>
                            <div className="text-base text-[#475569] leading-relaxed whitespace-pre-line pl-4 border-l-2 border-[#DDE5EA]">
                                {project.problemMarkdown}
                            </div>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-xl sm:text-2xl font-bold text-[#172B3A] flex items-center gap-2">
                                <span className="w-2 h-6 bg-[#0F766E] rounded-full inline-block" />
                                Pendekatan & Solusi Teknis
                            </h2>
                            <div className="text-base text-[#475569] leading-relaxed whitespace-pre-line pl-4 border-l-2 border-[#DDE5EA]">
                                {project.solutionMarkdown}
                            </div>
                        </section>

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
                </div>
            </article>
        </PublicLayout>
    );
}
