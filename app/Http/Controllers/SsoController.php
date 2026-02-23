<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Services\AuthService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;
use Illuminate\Support\Facades\Log;

class SsoController extends Controller
{
    public function handleSsoCallback(Request $request, AuthService $authService)
    {
        $token = $request->query('token');

        if (!$token) {
            return Inertia::location(route('login'))->with('error', 'Missing token');
        }

        $apiUrl = config('app.ecommerce_url') . '/api/user';

        $response = Http::withToken($token)
            ->acceptJson()
            ->get($apiUrl);

        if ($response->successful()) {
            $userData = $response->json();
            $user = $authService->findOrCreateFromSso($userData);

            Auth::login($user, true);

            return Inertia::location(route('dashboard'));
        }

        return Inertia::location(route('login'))->with('error', 'Invalid or expired token');
    }

    public function logout(Request $request)
    {
        \Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/login');
    }
}