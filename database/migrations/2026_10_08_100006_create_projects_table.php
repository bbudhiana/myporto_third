<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title');
            $table->text('excerpt');
            $table->longText('problem_markdown');
            $table->text('role_summary');
            $table->longText('solution_markdown');
            $table->longText('tradeoffs_markdown')->nullable();
            $table->longText('outcomes_markdown')->nullable();
            $table->string('category');
            $table->boolean('featured')->default(false);
            $table->foreignId('cover_media_id')->nullable()->constrained('media')->nullOnDelete();
            $table->string('project_url')->nullable();
            $table->string('repository_url')->nullable();
            $table->enum('status', ['draft', 'published', 'archived'])->default('draft');
            $table->enum('verification_status', ['unverified', 'source_verified', 'owner_confirmed'])->default('owner_confirmed');
            $table->string('source_url')->nullable();
            $table->text('source_note')->nullable();
            $table->timestamp('verified_at')->nullable();
            $table->timestamp('published_at')->nullable();
            $table->integer('sort_order')->default(0);
            $table->timestamps();

            $table->index(['status', 'published_at']);
            $table->index(['featured', 'sort_order']);
            $table->index('category');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
