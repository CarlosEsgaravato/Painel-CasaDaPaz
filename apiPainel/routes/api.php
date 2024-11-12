<?php

use App\Http\Controllers\Api\UsuarioController;
use App\Http\Controllers\Api\VoluntariosController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\GaleriaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ImageController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('usuarios', UsuarioController::class)->except([
    'create', 'edit'
]);

Route::post('/login', [AuthController::class, 'login']);

Route::post('/galeria/upload', [GaleriaController::class, 'upload']);

Route::apiResource('voluntarios', VoluntariosController::class)->except([
    'create', 'edit'
]);

Route::post('/upload', [ImageController::class, 'upload']);
Route::get('/images', [ImageController::class, 'index']);
Route::delete('/images/{id}', [ImageController::class, 'destroy']);