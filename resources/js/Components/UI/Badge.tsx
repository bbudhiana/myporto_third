import React from 'react';

export type BadgeVariant = 'accent' | 'neutral' | 'outline';

interface Props {
    variant?: BadgeVariant;
    className?: string;
    children: React.ReactNode;
}

export default function Badge({ variant = 'accent', className = '', children }: Props) {
    const base = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors';

    const variants: Record<BadgeVariant, string> = {
        accent: 'bg-[#E3F3EF] text-[#0F766E]',
        neutral: 'bg-[#F0F7F6] text-[#475569]',
        outline: 'border border-[#DDE5EA] text-[#475569] bg-white',
    };

    return (
        <span className={`${base} ${variants[variant]} ${className}`.trim()}>
            {children}
        </span>
    );
}
