<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('media', function (Blueprint $table) {
            $table->id();
            $table->string('disk')->default('public');
            $table->string('path')->unique();
            $table->string('mime_type');
            $table->unsignedBigInteger('bytes');
            $table->unsignedInteger('width')->nullable();
            $table->unsignedInteger('height')->nullable();
            $table->string('alt_text')->nullable();
            $table->string('original_name');
            $table->enum('visibility', ['public', 'private'])->default('public');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('media');
    }
};
