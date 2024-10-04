<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin\UtilityModel;
use Illuminate\Http\Request;

class UtilityController extends Controller
{
    public function index()
    {
        return view('admin.utility.utility');
    }

    public function fetch()
    {
        $utilities = UtilityModel::all();
        return response()->json(['utilities' => $utilities]);
    }
}
