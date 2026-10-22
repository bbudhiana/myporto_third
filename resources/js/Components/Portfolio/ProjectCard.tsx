import React from 'react';
import { Link } from '@inertiajs/react';
import Badge from '@/Components/UI/Badge';
import { ProjectCardDTO } from '@/types/portfolio';

interface Props {
    project: ProjectCardDTO;
    showFeaturedBadge?: boolean;
    skillLimit?: number;
}

export default function ProjectCard({ project, showFeaturedBadge = false, skillLimit = 3 }: Props) {
    // Frame mengikuti orientasi foto agar tidak ada letterbox besar:
    // foto potret memakai frame 4/5, foto lanskap 16/10.
    const ratio = project.coverWidth && project.coverHeight ? project.coverWidth / project.coverHeight : 1.6;
    const frameClass = ratio < 1 ? 'aspect-[4/5]' : 'aspect-[16/10]';

    return (
        <Link
            href={`/projects/${project.slug}`}
            className="group block h-full rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] transition-transform duration-300 hover:-translate-y-0.5 motion-reduce:hover:translate-y-0"
        >
            <article className="h-full flex flex-col rounded-2xl bg-white border border-[#DDE5EA] shadow-xs overflow-hidden transition duration-300 group-hover:shadow-md group-hover:border-[#64748B]/40">
                <div className={`relative ${frameClass} w-full overflow-hidden bg-[#F0F7F6] border-b border-[#DDE5EA]`}>
                    {project.coverUrl ? (
                        <img
                            src={project.coverUrl}
                            alt={project.title}
                            width={project.coverWidth ?? undefined}
                            height={project.coverHeight ?? undefined}
                            className="h-full w-full object-contain p-2 transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:group-hover:scale-100"
                            loading="lazy"
                            decoding="async"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center p-6 text-center transition-colors group-hover:bg-[#E3F3EF]">
                            <span className="text-xs font-semibold uppercase tracking-wider text-[#0F766E]">
                                {project.category}
                            </span>
                        </div>
                    )}
                </div>

                <div className="flex flex-1 flex-col justify-between gap-4 p-6">
                    <div className="space-y-3">
                        <div className="flex flex-wrap items-center gap-2">
                            <Badge variant="neutral">{project.category}</Badge>
                            {showFeaturedBadge && project.featured && (
                                <Badge variant="accent">Unggulan</Badge>
                            )}
                        </div>

                        <h3 className="text-lg font-bold leading-snug text-[#172B3A] transition-colors group-hover:text-[#0F766E]">
                            {project.title}
                        </h3>

                        <p className="text-sm leading-relaxed text-[#475569] line-clamp-3">
                            {project.excerpt}
                        </p>
                    </div>

                    {project.skills.length > 0 && (
                        <ul className="flex flex-wrap gap-1.5">
                            {project.skills.slice(0, skillLimit).map((skill) => (
                                <li
                                    key={skill}
                                    className="rounded-md bg-[#F0F7F6] px-2.5 py-0.5 text-xs font-medium text-[#475569]"
                                >
                                    {skill}
                                </li>
                            ))}
                        </ul>
                    )}

                    <div className="flex items-center justify-between gap-3 border-t border-[#DDE5EA] pt-4 text-xs text-[#475569]">
                        <span className="truncate">Peran: {project.roleSummary}</span>
                        <span className="shrink-0 font-medium text-[#0F766E] group-hover:underline">
                            Baca Studi Kasus →
                        </span>
                    </div>
                </div>
            </article>
        </Link>
    );
}
