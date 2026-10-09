<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->string('display_name');
            $table->string('headline');
            $table->text('hero_summary');
            $table->longText('about_markdown');
            $table->string('location')->nullable();
            $table->string('public_email')->nullable();
            $table->foreignId('portrait_media_id')->nullable()->constrained('media')->nullOnDelete();
            $table->foreignId('resume_media_id')->nullable()->constrained('media')->nullOnDelete();
            $table->enum('status', ['draft', 'published', 'archived'])->default('draft');
            $table->enum('verification_status', ['unverified', 'source_verified', 'owner_confirmed'])->default('owner_confirmed');
            $table->string('source_url')->nullable();
            $table->text('source_note')->nullable();
            $table->timestamp('verified_at')->nullable();
            $table->timestamp('published_at')->nullable();
            $table->timestamps();

            $table->index(['status', 'published_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('profiles');
    }
};
