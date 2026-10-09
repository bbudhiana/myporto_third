<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('experiences', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('organization')->nullable();
            $table->string('employment_type')->nullable();
            $table->string('location')->nullable();
            $table->unsignedSmallInteger('start_year');
            $table->unsignedTinyInteger('start_month')->nullable();
            $table->unsignedSmallInteger('end_year')->nullable();
            $table->unsignedTinyInteger('end_month')->nullable();
            $table->boolean('is_current')->default(false);
            $table->text('description_markdown')->nullable();
            $table->enum('status', ['draft', 'published', 'archived'])->default('draft');
            $table->enum('verification_status', ['unverified', 'source_verified', 'owner_confirmed'])->default('owner_confirmed');
            $table->string('source_url')->nullable();
            $table->text('source_note')->nullable();
            $table->timestamp('verified_at')->nullable();
            $table->timestamp('published_at')->nullable();
            $table->integer('sort_order')->default(0);
            $table->timestamps();

            $table->index(['status', 'published_at']);
            $table->index('start_year');
            $table->index('sort_order');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('experiences');
    }
};
