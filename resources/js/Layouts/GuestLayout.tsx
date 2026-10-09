import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#F8FAFC] p-4 sm:p-6 text-[#172B3A]">
            <div className="mb-6 text-center">
                <Link href="/" className="inline-flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4ED8] rounded-xl p-1">
                    <span className="w-12 h-12 rounded-2xl bg-[#E3F3EF] border border-[#0F766E]/20 text-[#0F766E] font-bold text-lg flex items-center justify-center shadow-xs transition-colors group-hover:bg-[#0F766E] group-hover:text-white">
                        BB
                    </span>
                    <div className="text-left">
                        <span className="font-bold text-base text-[#172B3A] block">
                            Bana Budhiana
                        </span>
                        <span className="text-xs text-[#475569] font-medium block">
                            Panel Kelola Konten (Admin)
                        </span>
                    </div>
                </Link>
            </div>

            <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl border border-[#DDE5EA] shadow-xs">
                {children}
            </div>

            <div className="mt-6 text-center text-xs text-[#475569]">
                <Link href="/" className="hover:text-[#0F766E] transition">
                    ← Kembali ke Halaman Utama
                </Link>
            </div>
        </div>
    );
}
