import React from 'react';
import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Card from '@/Components/UI/Card';
import Button from '@/Components/UI/Button';
import FormInput from '@/Components/UI/FormInput';
import FormTextarea from '@/Components/UI/FormTextarea';

interface Props {
    profile: any;
    mediaList: any[];
}

export default function ProfileEdit({ profile, mediaList }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        display_name: profile.display_name || '',
        headline: profile.headline || '',
        hero_summary: profile.hero_summary || '',
        about_markdown: profile.about_markdown || '',
        location: profile.location || '',
        public_email: profile.public_email || '',
        status: profile.status || 'draft',
        portrait_media_id: profile.portrait_media_id || '',
        resume_media_id: profile.resume_media_id || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put('/admin/profile');
    };

    return (
        <AdminLayout title="Kelola Profil & Identitas">
            <div className="max-w-4xl space-y-6">
                <Card>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormInput
                                id="display_name"
                                label="Nama Tampilan"
                                required
                                value={data.display_name}
                                onChange={(e) => setData('display_name', e.target.value)}
                                error={errors.display_name}
                            />

                            <FormInput
                                id="headline"
                                label="Peran / Headline Utama"
                                required
                                value={data.headline}
                                onChange={(e) => setData('headline', e.target.value)}
                                error={errors.headline}
                            />
                        </div>

                        <FormTextarea
                            id="hero_summary"
                            label="Kalimat Ringkasan Hero"
                            required
                            rows={2}
                            value={data.hero_summary}
                            onChange={(e) => setData('hero_summary', e.target.value)}
                            error={errors.hero_summary}
                        />

                        <FormTextarea
                            id="about_markdown"
                            label="Uraian Lengkap Tentang Saya & Pendekatan Kerja"
                            required
                            rows={6}
                            value={data.about_markdown}
                            onChange={(e) => setData('about_markdown', e.target.value)}
                            error={errors.about_markdown}
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormInput
                                id="location"
                                label="Lokasi"
                                value={data.location}
                                onChange={(e) => setData('location', e.target.value)}
                                error={errors.location}
                            />

                            <FormInput
                                id="public_email"
                                type="email"
                                label="Email Publik"
                                value={data.public_email}
                                onChange={(e) => setData('public_email', e.target.value)}
                                error={errors.public_email}
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label htmlFor="status" className="block text-sm font-semibold text-[#172B3A] mb-1.5">
                                    Status Publikasi
                                </label>
                                <select
                                    id="status"
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-[#64748B]/60 bg-white text-base min-h-[44px]"
                                >
                                    <option value="draft">Draft (Privat)</option>
                                    <option value="published">Published (Publik)</option>
                                    <option value="archived">Archived (Diarsipkan)</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="portrait_media_id" className="block text-sm font-semibold text-[#172B3A] mb-1.5">
                                    Foto Potret Profil
                                </label>
                                <select
                                    id="portrait_media_id"
                                    value={data.portrait_media_id}
                                    onChange={(e) => setData('portrait_media_id', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-[#64748B]/60 bg-white text-base min-h-[44px]"
                                >
                                    <option value="">Gunakan Inisial Monogram BB</option>
                                    {mediaList
                                        .filter((m) => m.mime_type.startsWith('image/'))
                                        .map((m) => (
                                            <option key={m.id} value={m.id}>
                                                {m.original_name}
                                            </option>
                                        ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="resume_media_id" className="block text-sm font-semibold text-[#172B3A] mb-1.5">
                                    Berkas CV Aktif (PDF)
                                </label>
                                <select
                                    id="resume_media_id"
                                    value={data.resume_media_id}
                                    onChange={(e) => setData('resume_media_id', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-[#64748B]/60 bg-white text-base min-h-[44px]"
                                >
                                    <option value="">Belum Ada CV (Tombol Disembunyikan)</option>
                                    {mediaList
                                        .filter((m) => m.mime_type === 'application/pdf')
                                        .map((m) => (
                                            <option key={m.id} value={m.id}>
                                                {m.original_name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        </div>

                        <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#DDE5EA]">
                            <Button type="submit" variant="primary" size="md" disabled={processing}>
                                {processing ? 'Menyimpan...' : 'Simpan Perubahan Profil'}
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </AdminLayout>
    );
}
