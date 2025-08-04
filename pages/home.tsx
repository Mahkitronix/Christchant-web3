import { useUserAuth } from '@/hooks/useUserAuth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const Home = () => {
  const { logout } = useUserAuth();
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/auth/sign-in');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      router.push('/auth/sign-in');
    }
  }, [user, router]);

  if (!user) {
    return null; // or a loading spinner
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Christchant</h1>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Welcome back, {user.firstName ? `${user.firstName} ${user.lastName || ''}` : user.email}!
            </h2>
            <p className="mt-2 text-gray-600">
              You have successfully logged in to your account.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
