import React from 'react';
import { Link } from '@inertiajs/react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseProps {
    variant?: ButtonVariant;
    size?: ButtonSize;
    className?: string;
    children: React.ReactNode;
    onClick?: (event: React.MouseEvent<Element>) => void;
}

interface ButtonProps extends BaseProps, Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'onClick'> {
    href?: never;
}

interface LinkProps extends BaseProps {
    href: string;
    target?: string;
    rel?: string;
}

type Props = ButtonProps | LinkProps;

export const getButtonClasses = (variant: ButtonVariant = 'primary', size: ButtonSize = 'md', className: string = ''): string => {
    const base = 'inline-flex items-center justify-center font-medium rounded-xl transition duration-150 ease-in-out select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]';

    const variants: Record<ButtonVariant, string> = {
        primary: 'bg-[#0F766E] text-white hover:bg-[#115E59] active:bg-[#0D4F4A] shadow-xs',
        secondary: 'bg-[#E3F3EF] text-[#0F766E] hover:bg-[#D0ECE6] active:bg-[#BDE4DB] font-semibold',
        outline: 'border border-[#DDE5EA] bg-white text-[#172B3A] hover:bg-[#F0F7F6] hover:border-[#64748B] active:bg-[#E3F3EF]',
        ghost: 'text-[#475569] hover:text-[#172B3A] hover:bg-[#F0F7F6]',
        danger: 'bg-[#B91C1C] text-white hover:bg-[#991B1B] active:bg-[#7F1D1D]',
    };

    const sizes: Record<ButtonSize, string> = {
        sm: 'px-3.5 py-2 text-sm',
        md: 'px-5 py-2.5 text-base',
        lg: 'px-6 py-3.5 text-lg',
    };

    return `${base} ${variants[variant]} ${sizes[size]} ${className}`.trim();
};

export default function Button(props: Props) {
    const { variant = 'primary', size = 'md', className = '', children, onClick } = props;
    const classes = getButtonClasses(variant, size, className);

    if ('href' in props && props.href) {
        const isExternal = props.href.startsWith('http') || props.href.startsWith('mailto:') || props.href.startsWith('tel:');
        if (isExternal) {
            return (
                <a
                    href={props.href}
                    target={props.target}
                    rel={props.rel || (props.target === '_blank' ? 'noopener noreferrer' : undefined)}
                    onClick={(e) => onClick?.(e)}
                    className={classes}
                >
                    {children}
                </a>
            );
        }
        return (
            <Link
                href={props.href}
                onClick={(e) => onClick?.(e)}
                className={classes}
            >
                {children}
            </Link>
        );
    }

    const { disabled, type = 'button' } = props as ButtonProps;
    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
            className={classes}
        >
            {children}
        </button>
    );
}
