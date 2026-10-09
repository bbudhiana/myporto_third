<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use App\Models\SkillGroup;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SkillController extends Controller
{
    public function index(): Response
    {
        $groups = SkillGroup::with(['skills' => fn ($q) => $q->orderBy('sort_order', 'asc')])
            ->orderBy('sort_order', 'asc')
            ->get();

        return Inertia::render('Admin/Skills/Index', [
            'groups' => $groups,
        ]);
    }

    public function storeGroup(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'description' => ['nullable', 'string', 'max:255'],
            'sort_order' => ['integer'],
        ]);

        SkillGroup::create($validated);

        return back()->with('success', 'Kelompok kompetensi berhasil ditambahkan.');
    }

    public function updateGroup(Request $request, SkillGroup $group): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'description' => ['nullable', 'string', 'max:255'],
            'sort_order' => ['integer'],
        ]);

        $group->update($validated);

        return back()->with('success', 'Kelompok kompetensi berhasil diperbarui.');
    }

    public function destroyGroup(SkillGroup $group): RedirectResponse
    {
        $group->delete();

        return back()->with('success', 'Kelompok kompetensi berhasil dihapus.');
    }

    public function storeSkill(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'skill_group_id' => ['required', 'exists:skill_groups,id'],
            'name' => ['required', 'string', 'max:100'],
            'context' => ['nullable', 'string', 'max:255'],
            'sort_order' => ['integer'],
        ]);

        Skill::create($validated);

        return back()->with('success', 'Kompetensi berhasil ditambahkan.');
    }

    public function destroySkill(Skill $skill): RedirectResponse
    {
        $skill->delete();

        return back()->with('success', 'Kompetensi berhasil dihapus.');
    }
}
