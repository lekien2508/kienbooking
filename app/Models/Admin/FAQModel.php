<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FAQModel extends Model
{
    use HasFactory;
    protected $table = 'tb_faqs';
    protected $fillable = [
        'villa_id', 'question', 'answer', 'created_at', 'updated_at'
    ];
}
