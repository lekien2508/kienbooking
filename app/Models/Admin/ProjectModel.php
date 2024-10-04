<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProjectModel extends Model
{
    use HasFactory;

    protected $table = "tb_projects";

    protected $fillable = [
        'name', 'slug', 'province', 'address', 'status', 'created_at', 'updated_at'
    ];

    public function villa(): HasMany
    {
        return $this->hasMany(VillaModel::class);
    }
}
