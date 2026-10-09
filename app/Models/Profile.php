<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Profile extends Model
{
    use HasFactory;

    protected $fillable = [
        'display_name',
        'headline',
        'hero_summary',
        'about_markdown',
        'location',
        'public_email',
        'portrait_media_id',
        'resume_media_id',
        'status',
        'verification_status',
        'source_url',
        'source_note',
        'verified_at',
        'published_at',
    ];

    protected $hidden = [
        'source_note',
    ];

    protected function casts(): array
    {
        return [
            'verified_at' => 'datetime',
            'published_at' => 'datetime',
        ];
    }

    public function portraitMedia(): BelongsTo
    {
        return $this->belongsTo(Media::class, 'portrait_media_id');
    }

    public function resumeMedia(): BelongsTo
    {
        return $this->belongsTo(Media::class, 'resume_media_id');
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('status', 'published')
            ->whereNotNull('published_at')
            ->where('published_at', '<=', now());
    }
}
