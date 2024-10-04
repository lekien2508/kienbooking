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
        Schema::create('tb_packages', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('name', 255);
            $table->decimal('list_price', 9, 3);
            $table->decimal('selling_price', 9, 3);
            $table->boolean('breakfast');
            $table->decimal('breakfast_fee', 9, 3)->nullable();
            $table->boolean('lunch');
            $table->decimal('lunch_fee', 9, 3)->nullable();
            $table->boolean('dinner');
            $table->decimal('dinner_fee', 9, 3)->nullable();
            $table->boolean('refund');
            $table->integer('villa_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_packages');
    }
};
