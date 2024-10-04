<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PackageModel extends Model
{
    use HasFactory;
    protected $table = 'tb_packages';
    protected $fillable = [
        'name', 'list_price', 'selling_price', 'breakfast', 'breakfast_fee', 'lunch', 'lunch_fee', 'dinner', 'dinner_fee', 'refund', 'villa_id', 'created_at', 'updated_at'
    ];
}
