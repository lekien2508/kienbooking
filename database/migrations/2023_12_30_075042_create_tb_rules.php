<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tb_rules', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->integer('villa_id');
            $table->string('rule', 200);
            $table->text('content');
            $table->string('note', 300);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_rules');
    }
};