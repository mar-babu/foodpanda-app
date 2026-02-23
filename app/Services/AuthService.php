<?php

declare(strict_types=1);

namespace App\Services;

use App\Repositories\UserRepository;
use App\Models\User;
use App\Traits\HandlesAuthentication;
use Laravel\Passport\PersonalAccessTokenResult;
use Illuminate\Support\Facades\Log;

class AuthService
{
    use HandlesAuthentication;

    public function __construct(
        protected UserRepository $userRepository
    ) {}

    public function attemptLogin(string $email, string $password): ?PersonalAccessTokenResult
    {
        try {
            $user = $this->userRepository->findByEmail($email);
            if ($this->validateCredentials($user, $password)) {
                return $user->createToken('sso-token');
            }
        } catch (\Exception $ex) {
            Log::error('Failed attempt login error: ' . $ex->getMessege());
        }
        return null;
    }

    public function findOrCreateFromSso(array $userData): User
    {
        return $this->userRepository->findByEmail($userData['email'])
            ?? $this->userRepository->create($userData);
    }
}
