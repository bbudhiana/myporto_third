import React from 'react';
import { useForm, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Card from '@/Components/UI/Card';
import Button from '@/Components/UI/Button';
import FormInput from '@/Components/UI/FormInput';
import FormTextarea from '@/Components/UI/FormTextarea';

interface Props {
    project: any | null;
    skills: any[];
    mediaList: any[];
}

export default function ProjectForm({ project, skills, mediaList }: Props) {
    const isEdit = Boolean(project);

    const { data, setData, post, put, processing, errors } = useForm({
        title: project?.title || '',
        slug: project?.slug || '',
        excerpt: project?.excerpt || '',
        category: project?.category || 'Software Engineering',
        role_summary: project?.role_summary || '',
        problem_markdown: project?.problem_markdown || '',
        solution_markdown: project?.solution_markdown || '',
        tradeoffs_markdown: project?.tradeoffs_markdown || '',
        outcomes_markdown: project?.outcomes_markdown || '',
        featured: Boolean(project?.featured),
        cover_media_id: project?.cover_media_id || '',
        project_url: project?.project_url || '',
        repository_url: project?.repository_url || '',
        status: project?.status || 'draft',
        sort_order: project?.sort_order || 0,
        skills: project?.skills ? project.skills.map((s: any) => s.id) : [],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit) {
            put(`/admin/projects/${project.id}`);
        } else {
            post('/admin/projects');
        }
    };

    const toggleSkill = (id: number) => {
        const current = [...data.skills];
        const index = current.indexOf(id);
        if (index > -1) {
            current.splice(index, 1);
        } else {
            current.push(id);
        }
        setData('skills', current);
    };

    return (
        <AdminLayout title={isEdit ? `Edit: ${project.title}` : 'Tambah Studi Kasus Proyek'}>
            <div className="max-w-4xl space-y-6">
                <div className="flex items-center justify-between">
                    <Link href="/admin/projects" className="text-sm text-[#475569] hover:text-[#0F766E]">
                        ← Kembali ke Daftar Proyek
                    </Link>
                </div>

                <Card>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormInput
                                id="title"
                                label="Judul Proyek"
                                required
                                placeholder="Contoh: Platform Manajemen Konten"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                error={errors.title}
                            />

                            <FormInput
                                id="slug"
                                label="URL Slug"
                                hint="Biarkan kosong untuk otomatisasi dari judul"
                                placeholder="platform-manajemen-konten"
                                value={data.slug}
                                onChange={(e) => setData('slug', e.target.value)}
                                error={errors.slug}
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormInput
                                id="category"
                                label="Kategori"
                                required
                                placeholder="Contoh: Software Engineering, AI Engineering"
                                value={data.category}
                                onChange={(e) => setData('category', e.target.value)}
                                error={errors.category}
                            />

                            <FormInput
                                id="role_summary"
                                label="Peran Anda"
                                required
                                placeholder="Contoh: Lead Architect, AI Engineer"
                                value={data.role_summary}
                                onChange={(e) => setData('role_summary', e.target.value)}
                                error={errors.role_summary}
                            />
                        </div>

                        <FormTextarea
                            id="excerpt"
                            label="Ringkasan / Excerpt"
                            required
                            rows={2}
                            placeholder="Ringkasan 2–3 kalimat yang tampil pada kartu proyek"
                            value={data.excerpt}
                            onChange={(e) => setData('excerpt', e.target.value)}
                            error={errors.excerpt}
                        />

                        {/* Core Case Study Sections */}
                        <div className="space-y-4 pt-2 border-t border-[#DDE5EA]">
                            <h3 className="font-bold text-sm text-[#172B3A] uppercase tracking-wider">
                                Konten Studi Kasus Mendalam
                            </h3>

                            <FormTextarea
                                id="problem_markdown"
                                label="1. Konteks & Masalah (Problem)"
                                required
                                rows={4}
                                placeholder="Jelaskan masalah bisnis atau tantangan teknis yang dihadapi..."
                                value={data.problem_markdown}
                                onChange={(e) => setData('problem_markdown', e.target.value)}
                                error={errors.problem_markdown}
                            />

                            <FormTextarea
                                id="solution_markdown"
                                label="2. Pendekatan & Solusi Teknis (Solution)"
                                required
                                rows={4}
                                placeholder="Jelaskan solusi arsitektur dan implementasi teknis..."
                                value={data.solution_markdown}
                                onChange={(e) => setData('solution_markdown', e.target.value)}
                                error={errors.solution_markdown}
                            />

                            <FormTextarea
                                id="tradeoffs_markdown"
                                label="3. Keputusan Teknis & Trade-offs (Opsional)"
                                rows={3}
                                placeholder="Jelaskan trade-off atau keputusan alternatif yang dipertimbangkan..."
                                value={data.tradeoffs_markdown}
                                onChange={(e) => setData('tradeoffs_markdown', e.target.value)}
                                error={errors.tradeoffs_markdown}
                            />

                            <FormTextarea
                                id="outcomes_markdown"
                                label="4. Bukti Hasil & Dampak (Outcomes)"
                                rows={3}
                                placeholder="Jelaskan hasil fungsional atau dampak operasional yang terverifikasi..."
                                value={data.outcomes_markdown}
                                onChange={(e) => setData('outcomes_markdown', e.target.value)}
                                error={errors.outcomes_markdown}
                            />
                        </div>

                        {/* Skills Selection */}
                        <div className="pt-2 border-t border-[#DDE5EA] space-y-2">
                            <label className="block text-sm font-semibold text-[#172B3A]">
                                Hubungkan Kompetensi / Teknologi Terkait
                            </label>
                            <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-3 rounded-xl border border-[#DDE5EA] bg-white">
                                {skills.map((skill) => {
                                    const isSelected = data.skills.includes(skill.id);
                                    return (
                                        <button
                                            key={skill.id}
                                            type="button"
                                            onClick={() => toggleSkill(skill.id)}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                                                isSelected
                                                    ? 'bg-[#0F766E] text-white shadow-xs'
                                                    : 'bg-[#F0F7F6] text-[#475569] hover:bg-[#E3F3EF]'
                                            }`}
                                        >
                                            {skill.name} {isSelected ? '✓' : '+'}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Media Cover & External Links */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-[#DDE5EA]">
                            <div>
                                <label htmlFor="cover_media_id" className="block text-sm font-semibold text-[#172B3A] mb-1.5">
                                    Gambar Sampul (Media)
                                </label>
                                <select
                                    id="cover_media_id"
                                    value={data.cover_media_id}
                                    onChange={(e) => setData('cover_media_id', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-[#64748B]/60 bg-white text-base min-h-[44px]"
                                >
                                    <option value="">Sampul Tipografis Default</option>
                                    {mediaList
                                        .filter((m) => m.mime_type.startsWith('image/'))
                                        .map((m) => (
                                            <option key={m.id} value={m.id}>
                                                {m.original_name}
                                            </option>
                                        ))}
                                </select>
                            </div>

                            <FormInput
                                id="project_url"
                                label="URL Live Demo (Opsional)"
                                placeholder="https://..."
                                value={data.project_url}
                                onChange={(e) => setData('project_url', e.target.value)}
                                error={errors.project_url}
                            />

                            <FormInput
                                id="repository_url"
                                label="URL Repositori (Opsional)"
                                placeholder="https://github.com/..."
                                value={data.repository_url}
                                onChange={(e) => setData('repository_url', e.target.value)}
                                error={errors.repository_url}
                            />
                        </div>

                        {/* Status & Featured */}
                        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#DDE5EA]">
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <input
                                        id="featured"
                                        type="checkbox"
                                        checked={data.featured}
                                        onChange={(e) => setData('featured', e.target.checked)}
                                        className="w-4 h-4 rounded text-[#0F766E] border-[#64748B] focus:ring-[#1D4ED8]"
                                    />
                                    <label htmlFor="featured" className="text-sm font-medium text-[#172B3A]">
                                        Tampilkan di Beranda (Featured)
                                    </label>
                                </div>

                                <div className="flex items-center gap-2">
                                    <label htmlFor="status" className="text-sm font-semibold text-[#172B3A]">
                                        Status:
                                    </label>
                                    <select
                                        id="status"
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value)}
                                        className="px-3 py-1.5 rounded-lg border border-[#64748B]/60 bg-white text-sm"
                                    >
                                        <option value="draft">Draft</option>
                                        <option value="published">Published</option>
                                        <option value="archived">Archived</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Link
                                    href="/admin/projects"
                                    className="px-4 py-2 rounded-xl border border-[#DDE5EA] text-sm font-medium text-[#475569] hover:bg-[#F0F7F6]"
                                >
                                    Batal
                                </Link>
                                <Button type="submit" variant="primary" size="md" disabled={processing}>
                                    {processing ? 'Menyimpan...' : 'Simpan Studi Kasus'}
                                </Button>
                            </div>
                        </div>
                    </form>
                </Card>
            </div>
        </AdminLayout>
    );
}
