import { ButtonHTMLAttributes } from 'react';

export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center justify-center rounded-xl border border-transparent bg-[#0F766E] px-5 py-2.5 text-sm font-semibold text-white transition duration-150 ease-in-out hover:bg-[#115E59] active:bg-[#0D4F4A] focus:outline-none focus-visible:outline-2 focus-visible:outline-[#1D4ED8] disabled:opacity-50 min-h-[44px] shadow-xs ${
                    disabled && 'opacity-25 cursor-not-allowed'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
