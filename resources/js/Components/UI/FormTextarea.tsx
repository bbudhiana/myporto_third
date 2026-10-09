import React from 'react';

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    id: string;
    error?: string;
    hint?: string;
    required?: boolean;
}

export default function FormTextarea({
    label,
    id,
    error,
    hint,
    required = false,
    className = '',
    rows = 4,
    ...rest
}: Props) {
    const errorId = `${id}-error`;
    const hintId = `${id}-hint`;

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-1.5">
                <label htmlFor={id} className="block text-sm font-semibold text-[#172B3A]">
                    {label} {required && <span className="text-[#B91C1C]" aria-hidden="true">*</span>}
                </label>
                {hint && !error && (
                    <span id={hintId} className="text-xs text-[#475569]">
                        {hint}
                    </span>
                )}
            </div>
            <textarea
                id={id}
                rows={rows}
                required={required}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? errorId : hint ? hintId : undefined}
                className={`w-full px-4 py-2.5 rounded-xl border bg-white text-[#172B3A] placeholder-[#475569]/60 transition duration-150 text-base focus-visible:outline-2 focus-visible:outline-offset-1 resize-y ${
                    error
                        ? 'border-[#B91C1C] focus-visible:outline-[#B91C1C]'
                        : 'border-[#64748B]/60 hover:border-[#64748B] focus-visible:outline-[#1D4ED8]'
                } ${className}`}
                {...rest}
            />
            {error && (
                <p id={errorId} className="mt-1.5 text-xs text-[#B91C1C] flex items-center gap-1 font-medium" role="alert">
                    <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>{error}</span>
                </p>
            )}
        </div>
    );
}
