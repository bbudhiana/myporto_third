import React from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import Card from '@/Components/UI/Card';
import Badge from '@/Components/UI/Badge';
import Button from '@/Components/UI/Button';
import ProjectCard from '@/Components/Portfolio/ProjectCard';
import { PaginatedData, ProjectCardDTO } from '@/types/portfolio';

interface Props {
    projects: PaginatedData<ProjectCardDTO>;
    categories: string[];
    selectedCategory: string | null;
}

export default function ProjectsIndex({ projects, categories, selectedCategory }: Props) {
    const { site } = usePage().props as { site?: { url?: string } };

    const handleCategoryClick = (category: string | null) => {
        router.get(
            '/projects',
            category ? { category } : {},
            { preserveState: true, preserveScroll: true }
        );
    };

    return (
        <PublicLayout>
            <Head>
                <title>Studi Kasus & Proyek | Bana Budhiana</title>
                <meta
                    name="description"
                    content="Kumpulan studi kasus, keputusan arsitektur teknis, dan portofolio rekayasa perangkat lunak serta solusi AI oleh Bana Budhiana."
                />
                <link rel="canonical" href={`${site?.url ?? ''}/projects`} />
            </Head>

            <section className="py-12 sm:py-16 border-b border-[#DDE5EA]">
                <div className="max-w-6xl mx-auto px-5 sm:px-8">
                    <div className="max-w-3xl space-y-4">
                        <Badge variant="accent">Portofolio Kerja</Badge>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#172B3A] tracking-tight">
                            Studi Kasus & Proyek Pilihan
                        </h1>
                        <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
                            Penjelasan mendalam mengenai tantangan sistem, keputusan arsitektur, trade-off rekayasa, serta hasil yang dapat dipertanggungjawabkan.
                        </p>
                    </div>

                    {/* Filter categories per PRD 4 & 7 (query ?category=) */}
                    <div className="flex flex-wrap items-center gap-2 pt-8">
                        <button
                            type="button"
                            onClick={() => handleCategoryClick(null)}
                            className={`px-4 py-2 rounded-xl text-sm font-semibold transition min-h-[44px] ${
                                !selectedCategory
                                    ? 'bg-[#0F766E] text-white shadow-xs'
                                    : 'bg-white border border-[#DDE5EA] text-[#475569] hover:bg-[#F0F7F6]'
                            }`}
                        >
                            Semua Kategori
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                type="button"
                                onClick={() => handleCategoryClick(cat)}
                                className={`px-4 py-2 rounded-xl text-sm font-semibold transition min-h-[44px] ${
                                    selectedCategory === cat
                                        ? 'bg-[#0F766E] text-white shadow-xs'
                                        : 'bg-white border border-[#DDE5EA] text-[#475569] hover:bg-[#F0F7F6]'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="py-12 sm:py-16">
                <div className="max-w-6xl mx-auto px-5 sm:px-8">
                    {projects.data.length === 0 ? (
                        <div className="py-16 text-center space-y-4 bg-white rounded-2xl border border-[#DDE5EA] p-8">
                            <p className="text-lg font-semibold text-[#172B3A]">
                                Tidak ada proyek dalam kategori ini.
                            </p>
                            <p className="text-sm text-[#475569]">
                                Silakan pilih kategori lain atau reset filter untuk melihat seluruh proyek.
                            </p>
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => handleCategoryClick(null)}
                            >
                                Reset Filter
                            </Button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {projects.data.map((project) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    showFeaturedBadge
                                    skillLimit={4}
                                />
                            ))}
                        </div>
                    )}

                    {/* Pagination links if multiple pages */}
                    {projects.links && projects.links.length > 3 && (
                        <div className="flex items-center justify-center gap-2 mt-12 pt-8 border-t border-[#DDE5EA]">
                            {projects.links.map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.url || '#'}
                                    preserveScroll
                                    className={`px-3.5 py-2 rounded-xl text-sm font-medium transition min-h-[44px] flex items-center justify-center ${
                                        link.active
                                            ? 'bg-[#0F766E] text-white'
                                            : !link.url
                                            ? 'text-[#64748B]/40 cursor-not-allowed'
                                            : 'bg-white border border-[#DDE5EA] text-[#475569] hover:bg-[#F0F7F6]'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}
