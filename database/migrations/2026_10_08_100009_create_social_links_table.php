<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('social_links', function (Blueprint $table) {
            $table->id();
            $table->string('label');
            $table->string('url');
            $table->integer('sort_order')->default(0);
            $table->boolean('enabled')->default(true);
            $table->timestamps();

            $table->index(['enabled', 'sort_order']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('social_links');
    }
};
