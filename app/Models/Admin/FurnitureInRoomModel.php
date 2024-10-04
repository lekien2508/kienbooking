<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FurnitureInRoomModel extends Model
{
    use HasFactory;
    protected $table = 'tb_furnitures_in_rooms';
    protected $fillable = [
        'name', 'quantity', 'room_id', 'created_at', 'updated_at'
    ];
}
