<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Skill extends Model
{
    use HasFactory;

    protected $fillable = [
        'skill_group_id',
        'name',
        'context',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'sort_order' => 'integer',
        ];
    }

    public function group(): BelongsTo
    {
        return $this->belongsTo(SkillGroup::class, 'skill_group_id');
    }

    public function projects(): BelongsToMany
    {
        return $this->belongsToMany(Project::class, 'project_skill');
    }
}
