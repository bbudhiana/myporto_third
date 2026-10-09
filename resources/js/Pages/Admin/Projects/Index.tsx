import React from 'react';
import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Card from '@/Components/UI/Card';
import Badge from '@/Components/UI/Badge';
import Button from '@/Components/UI/Button';

interface Props {
    projects: any[];
}

export default function ProjectsIndex({ projects }: Props) {
    const togglePublish = (id: number) => {
        router.post(`/admin/projects/${id}/toggle-publish`);
    };

    const handleDelete = (id: number, title: string) => {
        if (confirm(`Apakah Anda yakin ingin menghapus proyek "${title}"?`)) {
            router.delete(`/admin/projects/${id}`);
        }
    };

    return (
        <AdminLayout title="Kelola Studi Kasus Proyek">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-[#475569]">
                            Daftar studi kasus proyek. Proyek dengan status draft hanya dapat dilihat melalui fitur Preview Privat.
                        </p>
                    </div>
                    <Button href="/admin/projects/create" variant="primary" size="sm">
                        + Tambah Studi Kasus
                    </Button>
                </div>

                <Card>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="border-b border-[#DDE5EA] text-xs uppercase text-[#475569] font-semibold">
                                <tr>
                                    <th className="py-3 px-4">Judul Studi Kasus</th>
                                    <th className="py-3 px-4">Kategori</th>
                                    <th className="py-3 px-4">Status</th>
                                    <th className="py-3 px-4 text-right">Tindakan</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#DDE5EA]">
                                {projects.map((project) => (
                                    <tr key={project.id} className="hover:bg-[#F0F7F6]/50">
                                        <td className="py-3 px-4">
                                            <div className="flex items-center gap-2">
                                                <p className="font-bold text-[#172B3A]">{project.title}</p>
                                                {project.featured && (
                                                    <Badge variant="accent">Unggulan</Badge>
                                                )}
                                            </div>
                                            <p className="text-xs text-[#475569]">slug: /{project.slug}</p>
                                        </td>
                                        <td className="py-3 px-4 text-[#475569]">
                                            <Badge variant="neutral">{project.category}</Badge>
                                        </td>
                                        <td className="py-3 px-4">
                                            <Badge variant={project.status === 'published' ? 'accent' : 'neutral'}>
                                                {project.status}
                                            </Badge>
                                        </td>
                                        <td className="py-3 px-4 text-right space-x-2">
                                            <Link
                                                href={`/admin/projects/${project.id}/preview`}
                                                className="text-xs font-semibold text-[#0F766E] hover:underline"
                                            >
                                                Preview Privat
                                            </Link>
                                            <button
                                                type="button"
                                                onClick={() => togglePublish(project.id)}
                                                className="text-xs font-semibold text-teal-700 hover:underline"
                                            >
                                                {project.status === 'published' ? 'Jadikan Draft' : 'Publish'}
                                            </button>
                                            <Link
                                                href={`/admin/projects/${project.id}/edit`}
                                                className="text-xs font-semibold text-blue-600 hover:underline"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                type="button"
                                                onClick={() => handleDelete(project.id, project.title)}
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
