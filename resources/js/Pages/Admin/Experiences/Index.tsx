import React, { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Card from '@/Components/UI/Card';
import Badge from '@/Components/UI/Badge';
import Button from '@/Components/UI/Button';
import FormInput from '@/Components/UI/FormInput';
import FormTextarea from '@/Components/UI/FormTextarea';

interface Props {
    experiences: any[];
}

export default function ExperiencesIndex({ experiences }: Props) {
    const [editingExp, setEditingExp] = useState<any | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    const { data, setData, post, put, reset, processing, errors } = useForm({
        title: '',
        organization: '',
        employment_type: '',
        location: '',
        start_year: 2026,
        start_month: '',
        end_year: '',
        end_month: '',
        is_current: true,
        description_markdown: '',
        status: 'published',
        sort_order: 0,
    });

    const openCreate = () => {
        reset();
        setEditingExp(null);
        setIsCreating(true);
    };

    const openEdit = (exp: any) => {
        setIsCreating(false);
        setEditingExp(exp);
        setData({
            title: exp.title || '',
            organization: exp.organization || '',
            employment_type: exp.employment_type || '',
            location: exp.location || '',
            start_year: exp.start_year || 2026,
            start_month: exp.start_month ? String(exp.start_month) : '',
            end_year: exp.end_year ? String(exp.end_year) : '',
            end_month: exp.end_month ? String(exp.end_month) : '',
            is_current: Boolean(exp.is_current),
            description_markdown: exp.description_markdown || '',
            status: exp.status || 'draft',
            sort_order: exp.sort_order || 0,
        });
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingExp) {
            put(`/admin/experiences/${editingExp.id}`, {
                onSuccess: () => {
                    setEditingExp(null);
                    reset();
                },
            });
        } else {
            post('/admin/experiences', {
                onSuccess: () => {
                    setIsCreating(false);
                    reset();
                },
            });
        }
    };

    const togglePublish = (id: number) => {
        router.post(`/admin/experiences/${id}/toggle-publish`);
    };

    const handleDelete = (id: number, title: string) => {
        if (confirm(`Hapus pengalaman "${title}"?`)) {
            router.delete(`/admin/experiences/${id}`);
        }
    };

    return (
        <AdminLayout title="Kelola Pengalaman Karir">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-[#475569]">
                            Daftar riwayat karir profesional. Pengalaman terbaru dapat disetel sebagai aktif (sekarang).
                        </p>
                    </div>
                    {!isCreating && !editingExp && (
                        <Button variant="primary" size="sm" onClick={openCreate}>
                            + Tambah Pengalaman
                        </Button>
                    )}
                </div>

                {/* Form Add / Edit */}
                {(isCreating || editingExp) && (
                    <Card className="border-[#0F766E]/30 shadow-md">
                        <div className="flex items-center justify-between border-b border-[#DDE5EA] pb-3 mb-4">
                            <h3 className="text-base font-bold text-[#172B3A]">
                                {editingExp ? 'Edit Pengalaman' : 'Tambah Pengalaman Baru'}
                            </h3>
                            <button
                                type="button"
                                onClick={() => {
                                    setIsCreating(false);
                                    setEditingExp(null);
                                }}
                                className="text-xs text-[#475569] hover:underline"
                            >
                                Batal
                            </button>
                        </div>

                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <FormInput
                                    id="title"
                                    label="Jabatan / Peran"
                                    required
                                    placeholder="Contoh: Senior Software and AI Engineer"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    error={errors.title}
                                />

                                <FormInput
                                    id="organization"
                                    label="Perusahaan / Klien"
                                    placeholder="Opsional jika independen"
                                    value={data.organization}
                                    onChange={(e) => setData('organization', e.target.value)}
                                    error={errors.organization}
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <FormInput
                                    id="employment_type"
                                    label="Jenis Hubungan Kerja"
                                    placeholder="Contoh: Freelance, Full-time, Kontrak"
                                    value={data.employment_type}
                                    onChange={(e) => setData('employment_type', e.target.value)}
                                    error={errors.employment_type}
                                />

                                <FormInput
                                    id="location"
                                    label="Lokasi"
                                    placeholder="Contoh: Tangerang dan Jakarta"
                                    value={data.location}
                                    onChange={(e) => setData('location', e.target.value)}
                                    error={errors.location}
                                />
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                <FormInput
                                    id="start_year"
                                    type="number"
                                    label="Tahun Mulai"
                                    required
                                    value={data.start_year}
                                    onChange={(e) => setData('start_year', parseInt(e.target.value, 10))}
                                    error={errors.start_year}
                                />

                                <div>
                                    <label htmlFor="start_month" className="block text-sm font-semibold text-[#172B3A] mb-1.5">
                                        Bulan Mulai (Opsional)
                                    </label>
                                    <select
                                        id="start_month"
                                        value={data.start_month}
                                        onChange={(e) => setData('start_month', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-[#64748B]/60 bg-white text-base min-h-[44px]"
                                    >
                                        <option value="">Tanpa Bulan</option>
                                        {[...Array(12)].map((_, i) => (
                                            <option key={i + 1} value={i + 1}>
                                                Bulan {i + 1}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {!data.is_current && (
                                    <>
                                        <FormInput
                                            id="end_year"
                                            type="number"
                                            label="Tahun Selesai"
                                            value={data.end_year}
                                            onChange={(e) => setData('end_year', e.target.value)}
                                            error={errors.end_year}
                                        />

                                        <div>
                                            <label htmlFor="end_month" className="block text-sm font-semibold text-[#172B3A] mb-1.5">
                                                Bulan Selesai
                                            </label>
                                            <select
                                                id="end_month"
                                                value={data.end_month}
                                                onChange={(e) => setData('end_month', e.target.value)}
                                                className="w-full px-4 py-2.5 rounded-xl border border-[#64748B]/60 bg-white text-base min-h-[44px]"
                                            >
                                                <option value="">Tanpa Bulan</option>
                                                {[...Array(12)].map((_, i) => (
                                                    <option key={i + 1} value={i + 1}>
                                                        Bulan {i + 1}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    id="is_current"
                                    type="checkbox"
                                    checked={data.is_current}
                                    onChange={(e) => setData('is_current', e.target.checked)}
                                    className="w-4 h-4 rounded text-[#0F766E] border-[#64748B] focus:ring-[#1D4ED8]"
                                />
                                <label htmlFor="is_current" className="text-sm font-medium text-[#172B3A]">
                                    Pekerjaan Masih Berjalan (Status: "Sekarang")
                                </label>
                            </div>

                            <FormTextarea
                                id="description_markdown"
                                label="Uraian Tanggung Jawab & Disiplin Kerja"
                                rows={4}
                                value={data.description_markdown}
                                onChange={(e) => setData('description_markdown', e.target.value)}
                                error={errors.description_markdown}
                            />

                            <div className="flex items-center justify-end gap-3 pt-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        setIsCreating(false);
                                        setEditingExp(null);
                                    }}
                                >
                                    Batal
                                </Button>
                                <Button type="submit" variant="primary" size="sm" disabled={processing}>
                                    {processing ? 'Menyimpan...' : 'Simpan Pengalaman'}
                                </Button>
                            </div>
                        </form>
                    </Card>
                )}

                {/* Experience List Table */}
                <Card>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="border-b border-[#DDE5EA] text-xs uppercase text-[#475569] font-semibold">
                                <tr>
                                    <th className="py-3 px-4">Jabatan & Periode</th>
                                    <th className="py-3 px-4">Organisasi</th>
                                    <th className="py-3 px-4">Status</th>
                                    <th className="py-3 px-4 text-right">Tindakan</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#DDE5EA]">
                                {experiences.map((exp) => (
                                    <tr key={exp.id} className="hover:bg-[#F0F7F6]/50">
                                        <td className="py-3 px-4">
                                            <p className="font-bold text-[#172B3A]">{exp.title}</p>
                                            <p className="text-xs text-[#0F766E] font-medium">
                                                {exp.period_label}
                                            </p>
                                        </td>
                                        <td className="py-3 px-4 text-[#475569]">
                                            {exp.organization || '(Independen)'}
                                        </td>
                                        <td className="py-3 px-4">
                                            <Badge variant={exp.status === 'published' ? 'accent' : 'neutral'}>
                                                {exp.status}
                                            </Badge>
                                        </td>
                                        <td className="py-3 px-4 text-right space-x-2">
                                            <button
                                                type="button"
                                                onClick={() => togglePublish(exp.id)}
                                                className="text-xs font-semibold text-[#0F766E] hover:underline"
                                            >
                                                {exp.status === 'published' ? 'Jadikan Draft' : 'Publish'}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => openEdit(exp)}
                                                className="text-xs font-semibold text-blue-600 hover:underline"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleDelete(exp.id, exp.title)}
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
                </Card>
            </div>
        </AdminLayout>
    );
}
