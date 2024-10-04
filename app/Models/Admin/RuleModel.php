<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RuleModel extends Model
{
    use HasFactory;

    protected $table = 'tb_rules';
    protected $fillable = [
        'villa_id', 'rule', 'content', 'note', 'created_at', 'updated_at'
    ];
}
