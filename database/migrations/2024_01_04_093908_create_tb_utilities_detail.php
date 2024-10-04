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
        Schema::create('tb_utilities_detail', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->integer('villa_id');
            $table->integer('utilities_id');
            $table->boolean('outstanding');
            $table->string('fee', 50)->nullable();
            $table->string('note', 50)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_utilities_detail');
    }
};
