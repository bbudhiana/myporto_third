<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ContentRevision extends Model
{
    use HasFactory;

    protected $fillable = [
        'entity_type',
        'entity_id',
        'snapshot_json',
        'editor_id',
        'version',
    ];

    protected function casts(): array
    {
        return [
            'snapshot_json' => 'array',
            'version' => 'integer',
        ];
    }

    public function editor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'editor_id');
    }
}
