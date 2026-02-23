<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Interfaces\UserInterface;
use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class UserRepository implements UserInterface
{
    public function findByEmail(string $email): User
    {
        return User::where('email', $email)->firstOrFail();
    }

    public function create(array $data): User
    {
        return User::updateOrCreate(
        ['email' => $data['email']],
        [
            'name'              => $data['name'] ?? $data['email'],
            'email_verified_at' => now(),
            // password not needed for SSO users – or generate random if required
            'password'          => bcrypt(Str::random(16)),
        ]
    );
    }
}
