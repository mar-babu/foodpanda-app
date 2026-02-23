import { Head, Link, usePage } from '@inertiajs/react';
import type { SharedProps } from '@inertiajs/react';
import { router } from '@inertiajs/react';

interface Props extends SharedProps {
  // add more props
}

export default function Dashboard() {
  const { auth } = usePage<Props>().props;
  const user = auth.user;

  const handleOpenEcommerce = () => {
    window.open(import.meta.env.VITE_ECOMMERCE_URL + '/dashboard', '_blank');
  };

  const handleLogout = () => {
    router.post('/logout', {}, {
      preserveState: false,
      onSuccess: () => {
        // optional
      },
      onError: (errors) => {
        console.error('Logout failed', errors);
      },
    });
  };

  return (
    <>
      <Head title="Dashboard" />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* header */}
        <header className="bg-white dark:bg-gray-800 shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {import.meta.env.VITE_APP_NAME || 'Dashboard'}
            </h1>

            <div className="flex items-center gap-4">
              <span className="text-gray-700 dark:text-gray-300">
                Welcome, <strong>{user?.name || 'Guest'}</strong>
              </span>
              <button
                onClick={handleLogout}
                className="px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* main Content */}
        <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <h2 className="text-2xl font-semibold mb-4">
                Hello, {user?.name}!
              </h2>

              <p className="mb-6 text-gray-600 dark:text-gray-400">
                You are successfully logged in via SSO.
              </p>

              {/* Quick stats / cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 p-6 rounded-xl shadow">
                  <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                    Welcome Message
                  </h3>
                  <p className="mt-2 text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                    You're in!
                  </p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-800 p-6 rounded-xl shadow">
                  <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                    Last Login
                  </h3>
                  <p className="mt-2 text-xl text-gray-700 dark:text-gray-300">
                    {new Date().toLocaleDateString()}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-800 p-6 rounded-xl shadow">
                  <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                    Status
                  </h3>
                  <p className="mt-2 text-xl font-semibold text-green-600 dark:text-green-400">
                    Active
                  </p>
                </div>

                <div className="mt-8">
                  <button
                    onClick={handleOpenEcommerce}
                    className="text-blue-600 hover:underline"
                  >
                    Open Ecommerce Dashboard →
                  </button>
                </div>
              </div>

              <div className="mt-10 text-center">
                <Link
                  href="/"
                  className="inline-block px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
                >
                  Go to Home
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
