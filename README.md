# Foodpanda App – (SSO Client)

This is the **client application** that receives SSO authentication from the Ecommerce app.

### Features

- No separate login form (automatic login after Ecommerce authentication – as per task)
- `/sso/callback?token=...` endpoint:
  - Validates token against Ecommerce `/api/user`
  - Finds or creates user → `Auth::login()`
  - Redirects to dashboard
- Dashboard showing user info + link to Ecommerce dashboard
- Logout (destroys local session)
- Optional `/login` route redirects to Ecommerce login

### Live Demo

**URL:** https://foodpanda-app.ar-techpro.com  

(No direct login – start from Ecommerce app)

### Quick Test Steps

1. Start login from Ecommerce: https://ecommerce-app.ar-techpro.com  
2. Login there → go to Ecommerce dashboard  
3. Click **"Login to Foodpanda via SSO"**  
4. Automatically redirected here → **Foodpanda Dashboard** (logged in)

**Test Credentials** (managed in Ecommerce)  
Email: `test@example.com`  
Password: `password123`

### Local Setup

```bash
git clone https://github.com/mar-babu/foodpanda-app.git
cd foodpanda-app
composer install
cp .env.example .env
# edit .env → set DB + VITE_ECOMMERCE_URL=https://ecommerce-app.ar-techpro.com
php artisan key:generate
php artisan migrate --seed
npm install && npm run build
php artisan serve
```

### Technical Notes

- Laravel 12 + Inertia.js (React) + Tailwind + SSR  
- Repository pattern (UserRepository) + Service layer (AuthService)

**Deployed on Cpanel** – clean commit history maintained.

Screenshots included in `/screenshots/` folder.

### Ping me for any questions
- Email: ar_cse@yahoo.com
- Mobile: +8801681195152
