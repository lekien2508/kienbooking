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
        Schema::table('tb_villas', function (Blueprint $table){
            $table->dropColumn('bedroom');
            $table->dropColumn('wc');
            $table->dropColumn('price');
//            $table->decimal('list_price',9, 3);
//            $table->decimal('selling_price', 9, 3);
            $table->boolean('status');
            $table->string('type', 255)->after('slug');
            $table->float('area');
//            $table->boolean('checkin_checkout_type');
//            $table->timestamp('start_checkin')->nullable();
//            $table->timestamp('end_checkin')->nullable();
//            $table->timestamp('start_checkout')->nullable();
//            $table->timestamp('end_checkout')->nullable();
            $table->string('location', 500);
            $table->string('view', 50)->nullable();
            /* Relate to:
                tb_rooms: bedroom, bathroom, livingroom,....
                tb_furnitures_in_rooms: twins bed, single bed, air conditional,....
                tb_rules: time checkin, checkout, policy,....
                tb_faqs: FAQs about villa...
                tb_packages: price for packages, fees,...
                tb_booking,
                tb_utilities,
                tb_type_utilities,
                tb_group_utilities,
                tb_type: type of amenities, services, furnitures,..
            */
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
