<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UtilityModel extends Model
{
    use HasFactory;
    protected $table = 'tb_utilities';
    protected $fillable = [
        'name', 'type_utilities_id', 'group_utilities_id', 'note', 'created_at', 'updated_at'
    ];
}
