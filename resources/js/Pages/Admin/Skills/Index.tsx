import React, { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Card from '@/Components/UI/Card';
import Badge from '@/Components/UI/Badge';
import Button from '@/Components/UI/Button';
import FormInput from '@/Components/UI/FormInput';

interface Props {
    groups: any[];
}

export default function SkillsIndex({ groups }: Props) {
    const [selectedGroupId, setSelectedGroupId] = useState<number | null>(groups[0]?.id || null);

    const groupForm = useForm({
        name: '',
        description: '',
        sort_order: 0,
    });

    const skillForm = useForm({
        skill_group_id: selectedGroupId || '',
        name: '',
        context: '',
        sort_order: 0,
    });

    const handleCreateGroup = (e: React.FormEvent) => {
        e.preventDefault();
        groupForm.post('/admin/skills/groups', {
            onSuccess: () => groupForm.reset(),
        });
    };

    const handleCreateSkill = (e: React.FormEvent) => {
        e.preventDefault();
        skillForm.setData('skill_group_id', selectedGroupId || '');
        skillForm.post('/admin/skills', {
            onSuccess: () => skillForm.reset('name', 'context'),
        });
    };

    const handleDeleteGroup = (id: number, name: string) => {
        if (confirm(`Hapus kelompok kompetensi "${name}" beserta seluruh skill di dalamnya?`)) {
            router.delete(`/admin/skills/groups/${id}`);
        }
    };

    const handleDeleteSkill = (id: number, name: string) => {
        if (confirm(`Hapus skill "${name}"?`)) {
            router.delete(`/admin/skills/${id}`);
        }
    };

    return (
        <AdminLayout title="Kelola Kelompok Kompetensi & Keahlian">
            <div className="space-y-8">
                {/* Add new group form */}
                <Card>
                    <h3 className="text-sm font-bold text-[#172B3A] mb-3 uppercase tracking-wider">
                        Tambah Kelompok Kompetensi Baru
                    </h3>
                    <form onSubmit={handleCreateGroup} className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
                        <FormInput
                            id="group_name"
                            label="Nama Kelompok"
                            required
                            placeholder="Contoh: AI Engineering"
                            value={groupForm.data.name}
                            onChange={(e) => groupForm.setData('name', e.target.value)}
                            error={groupForm.errors.name}
                        />
                        <FormInput
                            id="group_description"
                            label="Deskripsi Singkat"
                            placeholder="Penjelasan disiplin"
                            value={groupForm.data.description}
                            onChange={(e) => groupForm.setData('description', e.target.value)}
                            error={groupForm.errors.description}
                        />
                        <div className="pb-0.5">
                            <Button type="submit" variant="primary" size="md" disabled={groupForm.processing}>
                                Simpan Kelompok
                            </Button>
                        </div>
                    </form>
                </Card>

                {/* Groups & Skills Display */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {groups.map((group) => (
                        <Card key={group.id} className="space-y-4">
                            <div className="flex items-start justify-between border-b border-[#DDE5EA] pb-3">
                                <div>
                                    <h4 className="font-bold text-base text-[#172B3A]">
                                        {group.name}
                                    </h4>
                                    {group.description && (
                                        <p className="text-xs text-[#475569]">{group.description}</p>
                                    )}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleDeleteGroup(group.id, group.name)}
                                    className="text-xs text-[#B91C1C] hover:underline"
                                >
                                    Hapus
                                </button>
                            </div>

                            {/* Skills in Group */}
                            <div className="space-y-2">
                                {group.skills.length === 0 ? (
                                    <p className="text-xs text-[#475569] italic">
                                        Belum ada keahlian di kelompok ini.
                                    </p>
                                ) : (
                                    <div className="flex flex-wrap gap-2">
                                        {group.skills.map((skill: any) => (
                                            <span
                                                key={skill.id}
                                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#F0F7F6] border border-[#DDE5EA] text-xs font-medium text-[#172B3A]"
                                            >
                                                <span>{skill.name}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDeleteSkill(skill.id, skill.name)}
                                                    className="text-[#B91C1C] hover:font-bold ml-1"
                                                    title="Hapus skill"
                                                >
                                                    ×
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Add Skill to this group */}
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    router.post('/admin/skills', {
                                        skill_group_id: group.id,
                                        name: e.currentTarget.skill_name.value,
                                    }, {
                                        onSuccess: () => (e.target as any).reset(),
                                    });
                                }}
                                className="pt-2 flex gap-2"
                            >
                                <input
                                    name="skill_name"
                                    type="text"
                                    required
                                    placeholder="+ Tambah skill ke kelompok ini"
                                    className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-[#64748B]/60 bg-white"
                                />
                                <Button type="submit" variant="secondary" size="sm">
                                    Tambah
                                </Button>
                            </form>
                        </Card>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}
