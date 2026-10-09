<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'organization',
        'employment_type',
        'location',
        'start_year',
        'start_month',
        'end_year',
        'end_month',
        'is_current',
        'description_markdown',
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

    protected $appends = [
        'period_label',
    ];

    protected function casts(): array
    {
        return [
            'start_year' => 'integer',
            'start_month' => 'integer',
            'end_year' => 'integer',
            'end_month' => 'integer',
            'is_current' => 'boolean',
            'verified_at' => 'datetime',
            'published_at' => 'datetime',
            'sort_order' => 'integer',
        ];
    }

    public function getPeriodLabelAttribute(): string
    {
        $monthNames = [
            1 => 'Jan', 2 => 'Feb', 3 => 'Mar', 4 => 'Apr',
            5 => 'Mei', 6 => 'Jun', 7 => 'Jul', 8 => 'Agu',
            9 => 'Sep', 10 => 'Okt', 11 => 'Nov', 12 => 'Des',
        ];

        $startStr = $this->start_month && isset($monthNames[$this->start_month])
            ? "{$monthNames[$this->start_month]} {$this->start_year}"
            : (string) $this->start_year;

        if ($this->is_current) {
            return "{$startStr} – Sekarang";
        }

        if ($this->end_year) {
            $endStr = $this->end_month && isset($monthNames[$this->end_month])
                ? "{$monthNames[$this->end_month]} {$this->end_year}"
                : (string) $this->end_year;

            return "{$startStr} – {$endStr}";
        }

        return $startStr;
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('status', 'published')
            ->whereNotNull('published_at')
            ->where('published_at', '<=', now())
            ->orderBy('is_current', 'desc')
            ->orderBy('start_year', 'desc')
            ->orderBy('start_month', 'desc')
            ->orderBy('sort_order', 'asc');
    }
}
