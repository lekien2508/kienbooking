<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VillaModel extends Model
{
    use HasFactory;

    protected $table = 'tb_villas';

    protected $fillable = [
        'name', 'slug', 'type', 'area', 'location', 'view', 'created_at', 'updated_at'
    ];
}
