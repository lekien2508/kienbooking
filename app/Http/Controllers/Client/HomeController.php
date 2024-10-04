<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        return view('client.home');
    }

    public function getAboutUs()
    {
        return view ('client.about-us');
    }

    public function getContact()
    {
        return view('client.contact');
    }
}
