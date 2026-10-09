<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'title',
        'excerpt',
        'problem_markdown',
        'role_summary',
        'solution_markdown',
        'tradeoffs_markdown',
        'outcomes_markdown',
        'category',
        'featured',
        'cover_media_id',
        'project_url',
        'repository_url',
        'status',
        'verification_status',
        'source_url',
        'source_note',
        'verified_at',
        'published_at',
        'sort_order',
    ];

    protected $hidden = [
        'source_note',
    ];

    protected function casts(): array
    {
        return [
            'featured' => 'boolean',
            'verified_at' => 'datetime',
            'published_at' => 'datetime',
            'sort_order' => 'integer',
        ];
    }

    public function coverMedia(): BelongsTo
    {
        return $this->belongsTo(Media::class, 'cover_media_id');
    }

    public function skills(): BelongsToMany
    {
        return $this->belongsToMany(Skill::class, 'project_skill');
    }

    public function media(): BelongsToMany
    {
        return $this->belongsToMany(Media::class, 'project_media')
            ->withPivot('caption', 'sort_order')
            ->orderByPivot('sort_order', 'asc');
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('status', 'published')
            ->whereNotNull('published_at')
            ->where('published_at', '<=', now())
            ->orderBy('sort_order', 'asc')
            ->orderBy('published_at', 'desc');
    }

    public function scopeFeatured(Builder $query): Builder
    {
        return $query->where('featured', true);
    }

    public function scopeByCategory(Builder $query, ?string $category): Builder
    {
        if (!empty($category) && $category !== 'all') {
            return $query->where('category', $category);
        }

        return $query;
    }
}
