<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Media extends Model
{
    use HasFactory;

    protected $fillable = [
        'disk',
        'path',
        'mime_type',
        'bytes',
        'width',
        'height',
        'alt_text',
        'original_name',
        'visibility',
    ];

    protected $appends = ['url'];

    public function getUrlAttribute(): string
    {
        return Storage::disk($this->disk)->url($this->path);
    }
}
