import React from 'react';
import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Card from '@/Components/UI/Card';
import Badge from '@/Components/UI/Badge';
import { PaginatedData } from '@/types/portfolio';

interface Props {
    messages: PaginatedData<any>;
    currentStatus: string | null;
    unreadCount: number;
}

export default function MessagesIndex({ messages, currentStatus, unreadCount }: Props) {
    const handleStatusFilter = (status: string | null) => {
        router.get('/admin/messages', status ? { status } : {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleDelete = (id: number, name: string) => {
        if (confirm(`Apakah Anda yakin ingin menghapus pesan dari "${name}"?`)) {
            router.delete(`/admin/messages/${id}`);
        }
    };

    const statusTabs = [
        { label: 'Semua Pesan', value: null },
        { label: `Belum Dibaca (${unreadCount})`, value: 'unread' },
        { label: 'Sudah Dibaca', value: 'read' },
        { label: 'Diarsipkan', value: 'archived' },
        { label: 'Spam', value: 'spam' },
    ];

    return (
        <AdminLayout title="Kotak Masuk Pesan Kontak">
            <div className="space-y-6">
                {/* Status Tabs */}
                <div className="flex flex-wrap gap-2">
                    {statusTabs.map((tab) => {
                        const isActive = currentStatus === tab.value;
                        return (
                            <button
                                key={tab.label}
                                type="button"
                                onClick={() => handleStatusFilter(tab.value)}
                                className={`px-4 py-2 rounded-xl text-xs font-semibold transition min-h-[44px] ${
                                    isActive
                                        ? 'bg-[#0F766E] text-white shadow-xs'
                                        : 'bg-white border border-[#DDE5EA] text-[#475569] hover:bg-[#F0F7F6]'
                                }`}
                            >
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                <Card>
                    {messages.data.length === 0 ? (
                        <p className="text-sm text-[#475569] py-12 text-center">
                            Tidak ada pesan dalam kategori ini.
                        </p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="border-b border-[#DDE5EA] text-xs uppercase text-[#475569] font-semibold">
                                    <tr>
                                        <th className="py-3 px-4">Pengirim</th>
                                        <th className="py-3 px-4">Tujuan</th>
                                        <th className="py-3 px-4">Ringkasan Pesan</th>
                                        <th className="py-3 px-4">Waktu</th>
                                        <th className="py-3 px-4 text-right">Tindakan</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#DDE5EA]">
                                    {messages.data.map((msg) => (
                                        <tr
                                            key={msg.id}
                                            className={`hover:bg-[#F0F7F6]/50 transition ${
                                                msg.status === 'unread' ? 'bg-[#F0F7F6]/30 font-medium' : ''
                                            }`}
                                        >
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-2">
                                                    {msg.status === 'unread' && (
                                                        <span className="w-2 h-2 rounded-full bg-[#0F766E]" />
                                                    )}
                                                    <span className="font-bold text-[#172B3A]">{msg.name}</span>
                                                </div>
                                                <span className="text-xs text-[#475569] block">{msg.email}</span>
                                                {msg.company && (
                                                    <span className="text-xs text-[#475569]/80 block">{msg.company}</span>
                                                )}
                                            </td>
                                            <td className="py-3 px-4">
                                                <Badge variant="neutral">
                                                    {msg.purpose === 'cooperation'
                                                        ? 'Kerja Sama'
                                                        : msg.purpose === 'opportunity'
                                                        ? 'Peluang Karir'
                                                        : 'Diskusi Teknis'}
                                                </Badge>
                                            </td>
                                            <td className="py-3 px-4 text-[#475569] max-w-xs truncate">
                                                {msg.message}
                                            </td>
                                            <td className="py-3 px-4 text-xs text-[#475569] whitespace-nowrap">
                                                {new Date(msg.created_at).toLocaleString('id-ID', {
                                                    dateStyle: 'medium',
                                                    timeStyle: 'short',
                                                })}
                                            </td>
                                            <td className="py-3 px-4 text-right space-x-2 whitespace-nowrap">
                                                <Link
                                                    href={`/admin/messages/${msg.id}`}
                                                    className="text-xs font-semibold text-[#0F766E] hover:underline"
                                                >
                                                    Baca Detail
                                                </Link>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(msg.id, msg.name)}
                                                    className="text-xs font-semibold text-[#B91C1C] hover:underline"
                                                >
                                                    Hapus
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </Card>
            </div>
        </AdminLayout>
    );
}
