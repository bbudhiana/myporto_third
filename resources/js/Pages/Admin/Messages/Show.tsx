import React from 'react';
import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Card from '@/Components/UI/Card';
import Badge from '@/Components/UI/Badge';
import Button from '@/Components/UI/Button';

interface Props {
    message: any;
}

export default function MessageShow({ message }: Props) {
    const updateStatus = (status: string) => {
        router.patch(`/admin/messages/${message.id}/status`, { status });
    };

    const handleDelete = () => {
        if (confirm('Apakah Anda yakin ingin menghapus pesan ini secara permanen?')) {
            router.delete(`/admin/messages/${message.id}`);
        }
    };

    const retryNotification = () => {
        router.post(`/admin/messages/${message.id}/retry-notification`);
    };

    return (
        <AdminLayout title={`Detail Pesan dari ${message.name}`}>
            <div className="max-w-3xl space-y-6">
                <div className="flex items-center justify-between">
                    <Link
                        href="/admin/messages"
                        className="text-sm text-[#475569] hover:text-[#0F766E] flex items-center gap-1"
                    >
                        ← Kembali ke Kotak Masuk
                    </Link>

                    <div className="flex items-center gap-2">
                        <select
                            value={message.status}
                            onChange={(e) => updateStatus(e.target.value)}
                            className="text-xs px-3 py-1.5 rounded-lg border border-[#64748B]/60 bg-white"
                        >
                            <option value="unread">Tandai Belum Dibaca</option>
                            <option value="read">Tandai Sudah Dibaca</option>
                            <option value="archived">Arsipkan</option>
                            <option value="spam">Tandai Spam</option>
                        </select>

                        <button
                            type="button"
                            onClick={handleDelete}
                            className="px-3 py-1.5 rounded-lg bg-red-50 text-[#B91C1C] hover:bg-red-100 text-xs font-semibold"
                        >
                            Hapus
                        </button>
                    </div>
                </div>

                <Card className="space-y-6">
                    {/* Header info */}
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-4 border-b border-[#DDE5EA]">
                        <div>
                            <div className="flex items-center gap-2">
                                <h2 className="text-xl font-bold text-[#172B3A]">
                                    {message.name}
                                </h2>
                                <Badge variant="neutral">
                                    {message.purpose === 'cooperation'
                                        ? 'Kerja Sama'
                                        : message.purpose === 'opportunity'
                                        ? 'Peluang Karir'
                                        : 'Diskusi Teknis'}
                                </Badge>
                            </div>
                            <p className="text-sm text-[#475569] mt-0.5">
                                Email:{' '}
                                <a
                                    href={`mailto:${message.email}?subject=Balasan: Diskusi Portofolio Bana Budhiana`}
                                    className="text-[#0F766E] font-medium underline"
                                >
                                    {message.email}
                                </a>
                                {message.company && ` • Instansi: ${message.company}`}
                            </p>
                        </div>

                        <div className="text-right text-xs text-[#475569]">
                            <p>
                                {new Date(message.created_at).toLocaleString('id-ID', {
                                    dateStyle: 'full',
                                    timeStyle: 'medium',
                                })}
                            </p>
                            <div className="mt-1 flex items-center justify-end gap-1">
                                <span>Status notifikasi:</span>
                                <span
                                    className={`font-semibold ${
                                        message.notification_status === 'sent'
                                            ? 'text-[#0F766E]'
                                            : message.notification_status === 'failed'
                                            ? 'text-[#B91C1C]'
                                            : 'text-amber-600'
                                    }`}
                                >
                                    {message.notification_status}
                                </span>
                                {message.notification_status === 'failed' && (
                                    <button
                                        type="button"
                                        onClick={retryNotification}
                                        className="ml-2 text-xs text-blue-600 underline"
                                    >
                                        Coba Ulang
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Message Body */}
                    <div className="space-y-2">
                        <span className="text-xs font-bold text-[#475569] uppercase tracking-wider block">
                            Isi Pesan:
                        </span>
                        <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#DDE5EA] text-[#172B3A] text-base leading-relaxed whitespace-pre-wrap">
                            {message.message}
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="pt-4 border-t border-[#DDE5EA] flex flex-wrap items-center justify-between gap-4">
                        <Button
                            href={`mailto:${message.email}?subject=Balasan: Diskusi Portofolio Bana Budhiana`}
                            variant="primary"
                            size="md"
                        >
                            Balas Melalui Email ↗
                        </Button>

                        <div className="text-xs text-[#475569]">
                            Token ID: <code className="bg-slate-100 px-1 py-0.5 rounded">{message.submission_token}</code>
                        </div>
                    </div>
                </Card>
            </div>
        </AdminLayout>
    );
}
