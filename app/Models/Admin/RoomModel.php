<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoomModel extends Model
{
    use HasFactory;

    protected $table = 'tb_rooms';
    protected $fillable = [
        'name', 'slug', 'villa_id', 'view', 'area', 'created_at', 'updated_at', 'note'
    ];
}
