
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { Briefcase, LogOut, User, Plus, Home } from 'lucide-react';

export function Navbar() {
    const navigate = useNavigate();
    const { isAuthenticated, user, logout } = useAuth();

    async function handleLogout() {
        await logout();
        navigate('/')
    }

    return (
          <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Briefcase className="h-8 w-8 text-primary-600" />
              <span className="text-2xl font-bold text-primary-600">GigFlow</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition"
            >
              <Home size={20} />
              <span>Browse Gigs</span>
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/create-gig"
                  className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition"
                >
                  <Plus size={20} />
                  <span>Post Gig</span>
                </Link>
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition"
                >
                  <User size={20} />
                  <span>Dashboard</span>
                </Link>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600">Hi, {user?.name}</span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 text-red-600 hover:text-red-700 transition"
                  >
                    <LogOut size={20} />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                  Login
                </Link>
                <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium shadow-md transition-all active:scale-95">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
    
}