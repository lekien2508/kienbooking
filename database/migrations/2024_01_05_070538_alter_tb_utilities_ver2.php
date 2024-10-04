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
        //
        Schema::table('tb_utilities', function (Blueprint $table){
            $table->dropColumn('type_utilities_id');
            $table->dropColumn('group_utilities_id');
            $table->integer('type_utility_id');
            $table->integer('group_utility_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
