import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import Button from '@/Components/UI/Button';
import FormInput from '@/Components/UI/FormInput';
import FormTextarea from '@/Components/UI/FormTextarea';

interface Props {
    submissionToken: string;
    contextProjectTitle?: string;
}

export default function ContactForm({ submissionToken, contextProjectTitle }: Props) {
    const [isSuccess, setIsSuccess] = useState(false);

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        name: '',
        email: '',
        company: '',
        purpose: 'cooperation',
        message: contextProjectTitle
            ? `Halo Bana, saya tertarik berdiskusi terkait studi kasus "${contextProjectTitle}"...\n\n`
            : '',
        consent: false,
        website_url: '', // Honeypot field per PRD 7.1
        submission_token: submissionToken,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        clearErrors();

        post('/contact', {
            preserveScroll: true,
            onSuccess: () => {
                setIsSuccess(true);
                reset('name', 'email', 'company', 'message', 'consent', 'website_url');
            },
        });
    };

    if (isSuccess) {
        return (
            <div className="p-8 rounded-2xl bg-[#E3F3EF] border border-[#0F766E]/20 text-center space-y-4" role="status" aria-live="polite">
                <div className="w-12 h-12 rounded-full bg-[#0F766E] text-white flex items-center justify-center mx-auto text-xl">
                    ✓
                </div>
                <h3 className="text-xl font-bold text-[#172B3A]">
                    Pesan Anda Sudah Tersimpan
                </h3>
                <p className="text-sm text-[#475569] max-w-md mx-auto leading-relaxed">
                    Terima kasih telah menghubungi saya. Pesan Anda telah masuk ke kotak pesan dan akan segera saya tinjau.
                </p>
                <div className="pt-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsSuccess(false)}
                    >
                        Kirim Pesan Lain
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Honeypot field for bot prevention per PRD 7.1 */}
            <div className="hidden" aria-hidden="true">
                <label htmlFor="website_url">Website</label>
                <input
                    type="text"
                    id="website_url"
                    tabIndex={-1}
                    autoComplete="off"
                    value={data.website_url}
                    onChange={(e) => setData('website_url', e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput
                    id="name"
                    label="Nama Lengkap"
                    required
                    placeholder="Nama Anda"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    error={errors.name}
                />

                <FormInput
                    id="email"
                    type="email"
                    label="Alamat Email"
                    required
                    placeholder="nama@perusahaan.com"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    error={errors.email}
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput
                    id="company"
                    label="Perusahaan / Organisasi"
                    hint="Opsional"
                    placeholder="Nama instansi atau perorangan"
                    value={data.company}
                    onChange={(e) => setData('company', e.target.value)}
                    error={errors.company}
                />

                <div>
                    <label htmlFor="purpose" className="block text-sm font-semibold text-[#172B3A] mb-1.5">
                        Tujuan Diskusi <span className="text-[#B91C1C]" aria-hidden="true">*</span>
                    </label>
                    <select
                        id="purpose"
                        value={data.purpose}
                        onChange={(e) => setData('purpose', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#64748B]/60 hover:border-[#64748B] focus-visible:outline-2 focus-visible:outline-[#1D4ED8] text-base bg-white min-h-[44px]"
                    >
                        <option value="cooperation">Kerja Sama Proyek / Klien</option>
                        <option value="opportunity">Peluang Karir Profesional</option>
                        <option value="discussion">Diskusi Teknis / Lainnya</option>
                    </select>
                </div>
            </div>

            <FormTextarea
                id="message"
                label="Pesan"
                required
                rows={5}
                placeholder="Tuliskan konteks kebutuhan, rincian proyek, atau pertanyaan Anda (minimal 20 karakter)..."
                value={data.message}
                onChange={(e) => setData('message', e.target.value)}
                error={errors.message}
            />

            <div className="space-y-1 pt-1">
                <div className="flex items-start gap-3">
                    <input
                        id="consent"
                        type="checkbox"
                        checked={data.consent}
                        onChange={(e) => setData('consent', e.target.checked)}
                        className="mt-1 w-4 h-4 rounded text-[#0F766E] border-[#64748B] focus:ring-[#1D4ED8]"
                    />
                    <label htmlFor="consent" className="text-xs text-[#475569] leading-relaxed select-none">
                        Saya menyetujui pemrosesan data kontak untuk keperluan komunikasi ini sesuai{' '}
                        <a href="/privacy" target="_blank" className="text-[#0F766E] font-medium underline">
                            Kebijakan Privasi
                        </a>
                        . <span className="text-[#B91C1C]">*</span>
                    </label>
                </div>
                {errors.consent && (
                    <p className="text-xs text-[#B91C1C] font-medium" role="alert">
                        {errors.consent}
                    </p>
                )}
            </div>

            <div className="pt-2">
                <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    disabled={processing}
                    className="w-full sm:w-auto"
                >
                    {processing ? 'Mengirim...' : 'Kirim Pesan'}
                </Button>
            </div>
        </form>
    );
}
