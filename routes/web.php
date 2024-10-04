<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/administrator', [Admin\AdminHomeController::class, 'index'])->name('admin.home');

Route::get('/administrator/projects', [Admin\ProjectController::class, 'index'])->name('admin.project');
Route::get('/administrator/fetch-projects', [Admin\ProjectController::class, 'fetch'])->name('admin.project.fetch');
Route::post('/administrator/create-project', [Admin\ProjectController::class, 'create'])->name('admin.project.create');
Route::put('/administrator/update-project', [Admin\ProjectController::class, 'update'])->name('admin.project.update');
Route::put('/administrator/change-status-project', [Admin\ProjectController::class, 'change'])->name('admin.project.change');
Route::delete('/administrator/delete-project', [Admin\ProjectController::class, 'delete'])->name('admin.project.delete');

Route::get('administrator/villas', [Admin\VillaController::class, 'index'])->name('admin.villa');
Route::get('/administrator/fetch-villas', [Admin\VillaController::class, 'fetch'])->name('admin.villa.fetch');
Route::get('/administrator/fetch-modal-villas', [Admin\VillaController::class, 'fetchModal'])->name('admin.villa.fetch.modal');
//Route::post('administrator/create-villa', [Admin\VillaController::class, 'create'])->name('admin.villa.create');
//Route::put('/administrator/update-villa', [Admin\VillaController::class, 'update'])->name('admin.villa.update');
//Route::put('/administrator/change-status-villa', [Admin\VillaController::class, 'change'])->name('admin.villa.change');
//Route::delete('/administrator/delete-villa', [Admin\VillaController::class, 'delete'])->name('admin.villa.delete');

Route::get('/administrator/utilities', [Admin\UtilityController::class, 'index'])->name('admin.utility');
Route::get('/administrator/fetch-utilities', [Admin\UtilityController::class, 'fetch'])->name('admin.utility.fetch');
//Route::post('/administrator/create-utility', [Admin\UtilityController::class, 'create'])->name('admin.utility.create');
//Route::put('/administrator/update-utility', [Admin\UtilityController::class, 'update'])->name('admin.utility.update');
//Route::put('/administrator/change-status-utility', [Admin\UtilityController::class, 'change'])->name('admin.utility.change');
//Route::delete('/administrator/delete-utility', [Admin\UtilityController::class, 'delete'])->name('admin.utility.delete');

Route::get('/administrator/utilities', [Admin\UtilityController::class, 'index'])->name('admin.utility');
Route::get('/administrator/fetch-utilities', [Admin\UtilityController::class, 'fetch'])->name('admin.utility.fetch');

Route::get('/', [Client\HomeController::class, 'index'])->name('client.home');
Route::get('/about-us', [Client\HomeController::class, 'getAboutUs'])->name('client.home.about-us');
Route::get('/contact',[Client\HomeController::class, 'getContact'])->name('client.home.contact');

Route::get('/rooms', [Client\RoomController::class, 'index'])->name('client.rooms');

Route::get('/news', [Client\NewsController::class, 'index'])->name('client.news');
