<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('content_revisions', function (Blueprint $table) {
            $table->id();
            $table->string('entity_type');
            $table->unsignedBigInteger('entity_id');
            $table->json('snapshot_json');
            $table->foreignId('editor_id')->constrained('users')->cascadeOnDelete();
            $table->unsignedInteger('version')->default(1);
            $table->timestamps();

            $table->index(['entity_type', 'entity_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('content_revisions');
    }
};
