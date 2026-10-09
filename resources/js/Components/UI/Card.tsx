import React from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    hoverEffect?: boolean;
    soft?: boolean;
    className?: string;
    children: React.ReactNode;
}

export default function Card({ hoverEffect = false, soft = false, className = '', children, ...rest }: Props) {
    const base = 'rounded-2xl p-6 sm:p-8 transition duration-200 border';
    const bgStyle = soft ? 'bg-[#F0F7F6] border-transparent' : 'bg-white border-[#DDE5EA] shadow-xs';
    const hoverStyle = hoverEffect ? 'hover:border-[#64748B]/40 hover:shadow-md' : '';

    return (
        <div className={`${base} ${bgStyle} ${hoverStyle} ${className}`.trim()} {...rest}>
            {children}
        </div>
    );
}
