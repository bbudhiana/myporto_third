<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SocialLink extends Model
{
    use HasFactory;

    protected $fillable = [
        'label',
        'url',
        'sort_order',
        'enabled',
    ];

    protected function casts(): array
    {
        return [
            'sort_order' => 'integer',
            'enabled' => 'boolean',
        ];
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('enabled', true)->orderBy('sort_order', 'asc');
    }
}
