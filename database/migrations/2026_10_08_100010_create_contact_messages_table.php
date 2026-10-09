<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('contact_messages', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('company')->nullable();
            $table->string('purpose');
            $table->text('message');
            $table->timestamp('consent_at');
            $table->string('privacy_notice_version')->default('1.0');
            $table->string('submission_token')->unique();
            $table->enum('status', ['unread', 'read', 'archived', 'spam'])->default('unread');
            $table->enum('notification_status', ['pending', 'sent', 'failed'])->default('pending');
            $table->string('ip_hash')->nullable();
            $table->timestamps();

            $table->index(['status', 'created_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('contact_messages');
    }
};
