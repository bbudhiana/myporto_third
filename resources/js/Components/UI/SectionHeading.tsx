import React from 'react';
import Badge from '@/Components/UI/Badge';

interface Props {
    eyebrow?: string;
    title: string;
    lead?: string;
    /** 'bar' dipakai untuk heading di dalam halaman detail (studi kasus). */
    variant?: 'plain' | 'bar';
    className?: string;
}

export default function SectionHeading({ eyebrow, title, lead, variant = 'plain', className = '' }: Props) {
    if (variant === 'bar') {
        return (
            <div className={`space-y-3 ${className}`.trim()}>
                <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold tracking-tight text-[#172B3A]">
                    <span className="inline-block h-6 w-1 shrink-0 rounded-full bg-[#0F766E]" aria-hidden="true" />
                    {title}
                </h2>
                {lead && <p className="text-sm text-[#475569] leading-relaxed pl-4">{lead}</p>}
            </div>
        );
    }

    return (
        <div className={`space-y-3 ${className}`.trim()}>
            {eyebrow && <Badge variant="accent">{eyebrow}</Badge>}
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#172B3A]">{title}</h2>
            {lead && <p className="text-base sm:text-lg leading-relaxed text-[#475569] max-w-2xl">{lead}</p>}
        </div>
    );
}
