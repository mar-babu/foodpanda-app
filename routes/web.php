<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\SsoController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/sso/callback', [SsoController::class, 'handleSsoCallback']);

Route::get('/login', function () {
    $ecommerceUrl = rtrim(config('app.ecommerce_url'), '/');
    $callback = urlencode(url('/sso/callback'));
    return redirect()->away("{$ecommerceUrl}?redirect_back={$callback}");
})->name('login');

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::post('/logout', [SsoController::class, 'logout'])->name('logout');

});
