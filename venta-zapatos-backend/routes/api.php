<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

Route::get('/test', function () {
    return response()->json(['message' => 'API route is working']);
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Rutas públicas de productos (cualquiera puede verlas)
Route::get('/products', [ProductController::class, 'index']);
// MOVER esta línea *fuera* del grupo 'auth:sanctum'
Route::get('/products/{id}', [ProductController::class, 'show']);

// Rutas protegidas por token (solo accesibles con token válido)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Rutas de productos protegidas (crear, editar, eliminar, mis productos)
    Route::get('/my-products', [ProductController::class, 'myProducts']);
    Route::post('/products', [ProductController::class, 'store']);
    // Route::get('/products/{id}', [ProductController::class, 'show']);
    Route::put('/products/{id}', [ProductController::class, 'update']);
    Route::delete('/products/{id}', [ProductController::class, 'destroy']);
});
