import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import Button from '@/Components/UI/Button';

interface Props {
    status?: number;
    message?: string;
}

export default function ErrorPage({ status = 404, message }: Props) {
    const title = {
        503: '503: Layanan Sedang Tidak Tersedia',
        500: '500: Terjadi Kesalahan Server',
        404: '404: Halaman Tidak Ditemukan',
        403: '403: Akses Ditolak',
    }[status] || 'Terjadi Kesalahan';

    const description = {
        503: 'Sistem sedang dalam proses pemeliharaan. Silakan coba beberapa saat lagi.',
        500: 'Mohon maaf, terjadi gangguan teknis internal pada server. Tim sedang menanganinya.',
        404: 'Halaman yang Anda tuju tidak ditemukan atau konten telah dipindahkan ke tautan lain.',
        403: 'Anda tidak memiliki hak akses untuk membuka halaman ini.',
    }[status] || (message || 'Terjadi kesalahan saat memproses permintaan Anda.');

    return (
        <PublicLayout>
            <Head title={title} />
            <div className="py-24 sm:py-32 flex items-center justify-center">
                <div className="max-w-md mx-auto px-5 text-center space-y-6">
                    <div className="w-20 h-20 rounded-2xl bg-[#E3F3EF] border border-[#0F766E]/20 text-[#0F766E] font-extrabold text-3xl flex items-center justify-center mx-auto shadow-inner">
                        {status}
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-2xl sm:text-3xl font-bold text-[#172B3A] tracking-tight">
                            {title}
                        </h1>
                        <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                            {description}
                        </p>
                    </div>

                    <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                        <Button href="/" variant="primary" size="md">
                            Kembali ke Beranda
                        </Button>
                        <Button href="/projects" variant="outline" size="md">
                            Lihat Proyek
                        </Button>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
