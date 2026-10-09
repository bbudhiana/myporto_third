<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContactMessage extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'company',
        'purpose',
        'message',
        'consent_at',
        'privacy_notice_version',
        'submission_token',
        'status',
        'notification_status',
        'ip_hash',
    ];

    protected function casts(): array
    {
        return [
            'consent_at' => 'datetime',
        ];
    }

    public function scopeUnread(Builder $query): Builder
    {
        return $query->where('status', 'unread');
    }
}
