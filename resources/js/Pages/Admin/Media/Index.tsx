import React, { useRef } from 'react';
import { useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Card from '@/Components/UI/Card';
import Badge from '@/Components/UI/Badge';
import Button from '@/Components/UI/Button';
import FormInput from '@/Components/UI/FormInput';

interface Props {
    mediaList: any[];
    currentResumeId: number | null;
    currentPortraitId: number | null;
}

export default function MediaIndex({ mediaList, currentResumeId, currentPortraitId }: Props) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        file: null as File | null,
        alt_text: '',
    });

    const handleUpload = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/media/upload', {
            forceFormData: true,
            onSuccess: () => {
                reset();
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            },
        });
    };

    const handleDelete = (id: number, name: string) => {
        if (confirm(`Hapus berkas media "${name}"?`)) {
            router.delete(`/admin/media/${id}`);
        }
    };

    const setAsResume = (id: number) => {
        router.post(`/admin/media/${id}/set-as-resume`);
    };

    const setAsPortrait = (id: number) => {
        router.post(`/admin/media/${id}/set-as-portrait`);
    };

    return (
        <AdminLayout title="Kelola Media & Berkas CV">
            <div className="space-y-8">
                {/* Upload Form per PRD 7 & 12 */}
                <Card>
                    <h3 className="text-sm font-bold text-[#172B3A] mb-3 uppercase tracking-wider">
                        Unggah Berkas Baru
                    </h3>
                    <p className="text-xs text-[#475569] mb-4">
                        Format yang diizinkan: Gambar (JPEG, PNG, WebP) maks. 5 MB, atau Berkas CV (PDF) maks. 10 MB. Format SVG/HTML tidak diizinkan.
                    </p>

                    <form onSubmit={handleUpload} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
                        <div className="sm:col-span-5">
                            <label htmlFor="file" className="block text-sm font-semibold text-[#172B3A] mb-1.5">
                                Pilih Berkas
                            </label>
                            <input
                                ref={fileInputRef}
                                id="file"
                                type="file"
                                required
                                accept="image/jpeg,image/png,image/webp,application/pdf"
                                onChange={(e) => setData('file', e.target.files ? e.target.files[0] : null)}
                                className="w-full text-sm text-[#475569] file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#E3F3EF] file:text-[#0F766E] hover:file:bg-[#D0ECE6]"
                            />
                            {errors.file && (
                                <p className="text-xs text-[#B91C1C] mt-1 font-medium">{errors.file}</p>
                            )}
                        </div>

                        <div className="sm:col-span-5">
                            <FormInput
                                id="alt_text"
                                label="Teks Alternatif (Alt Text) / Keterangan"
                                placeholder="Deskripsi untuk aksesibilitas gambar"
                                value={data.alt_text}
                                onChange={(e) => setData('alt_text', e.target.value)}
                                error={errors.alt_text}
                            />
                        </div>

                        <div className="sm:col-span-2 pb-0.5">
                            <Button type="submit" variant="primary" size="md" disabled={processing} className="w-full">
                                {processing ? 'Mengunggah...' : 'Unggah'}
                            </Button>
                        </div>
                    </form>
                </Card>

                {/* Media Grid */}
                <Card>
                    <h3 className="text-sm font-bold text-[#172B3A] mb-4 uppercase tracking-wider">
                        Daftar Berkas Tersimpan ({mediaList.length})
                    </h3>

                    {mediaList.length === 0 ? (
                        <p className="text-sm text-[#475569] py-8 text-center">
                            Belum ada berkas yang diunggah.
                        </p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {mediaList.map((media) => {
                                const isImage = media.mime_type.startsWith('image/');
                                const isPdf = media.mime_type === 'application/pdf';
                                const isResume = currentResumeId === media.id;
                                const isPortrait = currentPortraitId === media.id;

                                return (
                                    <div
                                        key={media.id}
                                        className="rounded-xl border border-[#DDE5EA] p-4 flex flex-col justify-between bg-white space-y-3"
                                    >
                                        <div className="space-y-2">
                                            {isImage ? (
                                                <div className="h-36 rounded-lg bg-[#F8FAFC] overflow-hidden border border-[#DDE5EA]">
                                                    <img
                                                        src={media.url}
                                                        alt={media.alt_text || media.original_name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="h-36 rounded-lg bg-[#F0F7F6] border border-[#0F766E]/20 flex flex-col items-center justify-center p-4 text-center">
                                                    <span className="text-2xl">📄</span>
                                                    <span className="text-xs font-bold text-[#0F766E] uppercase tracking-wider mt-1">
                                                        Dokumen PDF
                                                    </span>
                                                </div>
                                            )}

                                            <div>
                                                <p className="font-bold text-xs text-[#172B3A] truncate" title={media.original_name}>
                                                    {media.original_name}
                                                </p>
                                                <p className="text-[11px] text-[#475569]">
                                                    {(media.bytes / 1024).toFixed(1)} KB • {media.mime_type}
                                                </p>
                                            </div>

                                            <div className="flex flex-wrap gap-1.5">
                                                {isResume && <Badge variant="accent">CV Aktif</Badge>}
                                                {isPortrait && <Badge variant="accent">Foto Profil</Badge>}
                                            </div>
                                        </div>

                                        <div className="pt-2 border-t border-[#DDE5EA] flex flex-wrap items-center justify-between gap-2 text-xs">
                                            {isPdf && !isResume && (
                                                <button
                                                    type="button"
                                                    onClick={() => setAsResume(media.id)}
                                                    className="text-[#0F766E] font-semibold hover:underline"
                                                >
                                                    Jadikan CV Aktif
                                                </button>
                                            )}
                                            {isImage && !isPortrait && (
                                                <button
                                                    type="button"
                                                    onClick={() => setAsPortrait(media.id)}
                                                    className="text-[#0F766E] font-semibold hover:underline"
                                                >
                                                    Jadikan Foto Profil
                                                </button>
                                            )}
                                            <button
                                                type="button"
                                                onClick={() => handleDelete(media.id, media.original_name)}
                                                className="text-[#B91C1C] hover:underline ml-auto"
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </Card>
            </div>
        </AdminLayout>
    );
}
