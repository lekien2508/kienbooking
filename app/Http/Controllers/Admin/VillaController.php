<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin\ProjectModel;
use App\Models\Admin\VillaModel;
use Illuminate\Http\Request;

class VillaController extends Controller
{
    public function index()
    {
        return view('admin.villa.villa');
    }

    public function fetch()
    {
        $villas = VillaModel::all();
        return response()->json(['villas' => $villas]);
    }

    public function fetchModal()
    {
        $projects = ProjectModel::select(['id', 'name'])->get();
        return response()->json(['projects' => $projects]);
    }
}
