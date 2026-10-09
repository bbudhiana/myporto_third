import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import Card from '@/Components/UI/Card';
import Badge from '@/Components/UI/Badge';

export default function Privacy() {
    return (
        <PublicLayout>
            <Head>
                <title>Kebijakan Privasi | Bana Budhiana</title>
                <meta
                    name="description"
                    content="Kebijakan privasi dan ketentuan pemrosesan data pesan kontak pada portofolio profesional Bana Budhiana."
                />
                <link rel="canonical" href="http://localhost:9007/privacy" />
            </Head>

            <section className="py-12 sm:py-16">
                <div className="max-w-3xl mx-auto px-5 sm:px-8 space-y-8">
                    <div className="space-y-3">
                        <Badge variant="neutral">Transparansi Data</Badge>
                        <h1 className="text-3xl sm:text-4xl font-bold text-[#172B3A] tracking-tight">
                            Kebijakan Privasi
                        </h1>
                        <p className="text-sm text-[#475569]">
                            Versi 1.0 • Berlaku per 8 Oktober 2026
                        </p>
                    </div>

                    <Card className="space-y-6 text-[#475569] text-base leading-relaxed">
                        <section className="space-y-2">
                            <h2 className="text-lg font-bold text-[#172B3A]">
                                1. Pendahuluan
                            </h2>
                            <p>
                                Dokumen ini menjelaskan bagaimana data pribadi pengunjung dikumpulkan, digunakan, dan dilindungi saat mengakses website dan menggunakan formulir kontak Bana Budhiana. Privasi Anda dihargai dengan meminimalkan pengumpulan data hanya pada hal yang benar-benar esensial untuk komunikasi profesional.
                            </p>
                        </section>

                        <section className="space-y-2">
                            <h2 className="text-lg font-bold text-[#172B3A]">
                                2. Data yang Dikumpulkan
                            </h2>
                            <p>
                                Melalui formulir kontak publik, website ini hanya mengumpulkan data yang Anda masukkan secara sukarela:
                            </p>
                            <ul className="list-disc list-inside space-y-1 text-sm pl-2">
                                <li>Nama lengkap (untuk identifikasi komunikasi).</li>
                                <li>Alamat email (sebagai alamat korespondensi balasan).</li>
                                <li>Nama perusahaan atau instansi (opsional, untuk konteks kerja sama).</li>
                                <li>Tujuan dan isi pesan komunikasi.</li>
                                <li>Waktu pengiriman dan hash IP yang digunakan semata-mata untuk pembatasan spam (rate limiting).</li>
                            </ul>
                        </section>

                        <section className="space-y-2">
                            <h2 className="text-lg font-bold text-[#172B3A]">
                                3. Tujuan dan Penggunaan Data
                            </h2>
                            <p>
                                Data yang dikirimkan hanya digunakan untuk:
                            </p>
                            <ul className="list-disc list-inside space-y-1 text-sm pl-2">
                                <li>Merespons pertanyaan, konsultasi, atau penawaran kerja sama profesional.</li>
                                <li>Mencegah penyalahgunaan sistem dan pengiriman pesan spam massal.</li>
                            </ul>
                            <p className="text-sm font-medium text-[#172B3A]">
                                Data Anda tidak pernah dijual, disewakan, atau dibagikan kepada pihak ketiga untuk kepentingan pemasaran.
                            </p>
                        </section>

                        <section className="space-y-2">
                            <h2 className="text-lg font-bold text-[#172B3A]">
                                4. Masa Retensi Data
                            </h2>
                            <p>
                                Pesan yang diterima disimpan selama maksimal 180 (seratus delapan puluh) hari kalender, setelah itu pesan akan diarsipkan atau dihapus dari basis data aktif secara berkala, kecuali apabila komunikasi berlanjut ke tahap kontrak kerja sama formal.
                            </p>
                        </section>

                        <section className="space-y-2">
                            <h2 className="text-lg font-bold text-[#172B3A]">
                                5. Hak Pengunjung
                            </h2>
                            <p>
                                Anda berhak meminta konfirmasi apakah data Anda tersimpan, meminta salinan pesan yang telah dikirimkan, atau meminta penghapusan pesan kontak Anda lebih awal dari sistem kami.
                            </p>
                            <p>
                                Untuk mengajukan permintaan penghapusan data, Anda dapat menghubungi langsung melalui saluran kontak yang tertera di beranda website.
                            </p>
                        </section>
                    </Card>

                    <div className="pt-4 flex items-center justify-between text-sm">
                        <Link href="/" className="text-[#0F766E] font-medium hover:underline">
                            ← Kembali ke Beranda
                        </Link>
                        <Link href="/#contact" className="text-[#0F766E] font-medium hover:underline">
                            Formulir Kontak →
                        </Link>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
