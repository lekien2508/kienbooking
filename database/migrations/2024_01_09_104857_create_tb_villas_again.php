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
        Schema::create('tb_villas', function (Blueprint $table) {
            $table->id();
            $table->string('name', 255);
            $table->string('slug')->unique();
            $table->string('type', 255);
            $table->integer('project_id');
            $table->float('area');
            $table->integer('floor');
            $table->text('location')->nullable();
            $table->string('view', 50)->nullable();
            $table->text('images')->nullable();
            $table->text('avatar')->nullable();
            $table->text('note')->nullable();
            $table->boolean('status');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_villas_again');
    }
};
