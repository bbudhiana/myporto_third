import React from 'react';
import { Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Card from '@/Components/UI/Card';
import Badge from '@/Components/UI/Badge';
import Button from '@/Components/UI/Button';

interface Props {
    stats: {
        totalProjects: number;
        publishedProjects: number;
        draftProjects: number;
        totalExperiences: number;
        totalSkills: number;
        totalMedia: number;
        unreadMessages: number;
        totalMessages: number;
    };
    recentMessages: any[];
    recentRevisions: any[];
    hasProfile: boolean;
}

export default function Dashboard({ stats, recentMessages, recentRevisions }: Props) {
    return (
        <AdminLayout title="Ringkasan Operasional">
            <div className="space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="space-y-2">
                        <span className="text-xs font-semibold text-[#475569] uppercase tracking-wider">
                            Studi Kasus Proyek
                        </span>
                        <div className="flex items-baseline justify-between">
                            <span className="text-3xl font-extrabold text-[#172B3A]">
                                {stats.totalProjects}
                            </span>
                            <span className="text-xs font-semibold text-[#0F766E]">
                                {stats.publishedProjects} Published
                            </span>
                        </div>
                        <p className="text-xs text-[#475569]">
                            {stats.draftProjects} draft belum terpublikasi
                        </p>
                    </Card>

                    <Card className="space-y-2">
                        <span className="text-xs font-semibold text-[#475569] uppercase tracking-wider">
                            Pengalaman Karir
                        </span>
                        <div className="flex items-baseline justify-between">
                            <span className="text-3xl font-extrabold text-[#172B3A]">
                                {stats.totalExperiences}
                            </span>
                            <Badge variant="accent">Terverifikasi</Badge>
                        </div>
                        <p className="text-xs text-[#475569]">Timeline berurutan</p>
                    </Card>

                    <Card className="space-y-2">
                        <span className="text-xs font-semibold text-[#475569] uppercase tracking-wider">
                            Kompetensi & Skill
                        </span>
                        <div className="flex items-baseline justify-between">
                            <span className="text-3xl font-extrabold text-[#172B3A]">
                                {stats.totalSkills}
                            </span>
                            <span className="text-xs text-[#475569]">4 Kelompok</span>
                        </div>
                        <p className="text-xs text-[#475569]">Tanpa persentase buatan</p>
                    </Card>

                    <Card className="space-y-2">
                        <span className="text-xs font-semibold text-[#475569] uppercase tracking-wider">
                            Pesan Masuk (Inbox)
                        </span>
                        <div className="flex items-baseline justify-between">
                            <span className="text-3xl font-extrabold text-[#172B3A]">
                                {stats.unreadMessages}
                            </span>
                            <Badge variant={stats.unreadMessages > 0 ? 'accent' : 'neutral'}>
                                {stats.unreadMessages} Belum Dibaca
                            </Badge>
                        </div>
                        <p className="text-xs text-[#475569]">Total {stats.totalMessages} pesan kontak</p>
                    </Card>
                </div>

                {/* Recent Messages & Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Recent Inquiries */}
                    <Card className="space-y-4">
                        <div className="flex items-center justify-between border-b border-[#DDE5EA] pb-3">
                            <h2 className="text-base font-bold text-[#172B3A]">
                                Pesan Masuk Terbaru
                            </h2>
                            <Link
                                href="/admin/messages"
                                className="text-xs font-semibold text-[#0F766E] hover:underline"
                            >
                                Lihat Semua →
                            </Link>
                        </div>

                        {recentMessages.length === 0 ? (
                            <p className="text-sm text-[#475569] py-6 text-center">
                                Belum ada pesan kontak yang masuk.
                            </p>
                        ) : (
                            <div className="space-y-3">
                                {recentMessages.map((msg) => (
                                    <Link
                                        key={msg.id}
                                        href={`/admin/messages/${msg.id}`}
                                        className="block p-3 rounded-xl border border-[#DDE5EA] hover:bg-[#F0F7F6] transition"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-bold text-[#172B3A]">
                                                {msg.name}
                                            </span>
                                            <span className="text-xs text-[#475569]">
                                                {new Date(msg.created_at).toLocaleDateString('id-ID')}
                                            </span>
                                        </div>
                                        <p className="text-xs text-[#475569] line-clamp-1 mt-1">
                                            {msg.message}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </Card>

                    {/* Content Revisions Trail */}
                    <Card className="space-y-4">
                        <div className="flex items-center justify-between border-b border-[#DDE5EA] pb-3">
                            <h2 className="text-base font-bold text-[#172B3A]">
                                Riwayat Snapshot Revisi Konten
                            </h2>
                            <Badge variant="neutral">Audit Trail</Badge>
                        </div>

                        {recentRevisions.length === 0 ? (
                            <p className="text-sm text-[#475569] py-6 text-center">
                                Belum ada catatan revisi. Setiap perubahan konten akan tersimpan otomatis di sini.
                            </p>
                        ) : (
                            <div className="space-y-3">
                                {recentRevisions.map((rev) => (
                                    <div
                                        key={rev.id}
                                        className="p-3 rounded-xl border border-[#DDE5EA] bg-white flex items-center justify-between"
                                    >
                                        <div>
                                            <span className="text-xs font-bold text-[#172B3A] uppercase tracking-wider">
                                                {rev.entity_type} #{rev.entity_id}
                                            </span>
                                            <span className="text-xs text-[#475569] block">
                                                Versi {rev.version} dicatat oleh {rev.editor?.name || 'Admin'}
                                            </span>
                                        </div>
                                        <span className="text-xs text-[#475569]">
                                            {new Date(rev.created_at).toLocaleDateString('id-ID')}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}
