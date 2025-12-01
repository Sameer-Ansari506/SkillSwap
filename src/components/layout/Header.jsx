import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Button from '../ui/Button.jsx';
import useAuth from '../../hooks/useAuth.js';
import { logout } from '../../features/auth/authSlice.js';

const Header = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();
  return (
    <header className="gradient-bg sticky top-0 z-50 backdrop-blur-xl border-b-4 border-white/30" style={{ boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)' }}>
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-3xl transform group-hover:rotate-12 transition-all shadow-lg">
            🎓
          </div>
          <span className="text-3xl font-black text-white drop-shadow-lg group-hover:scale-110 transition-transform">
            SkillSwap
          </span>
        </Link>
        <nav className="flex gap-4 items-center">
          <Link 
            to="/discover" 
            className="px-4 py-2 rounded-xl font-bold text-white hover:bg-white/20 transition-all backdrop-blur-sm flex items-center gap-2 hover:scale-105"
          >
            🔍 Discover
          </Link>
          {isAuthenticated ? (
            <div className="flex gap-3 items-center">
              <Link 
                to="/dashboard" 
                className="px-4 py-2 rounded-xl font-bold text-white hover:bg-white/20 transition-all backdrop-blur-sm flex items-center gap-2 hover:scale-105"
              >
                📊 Dashboard
              </Link>
              <button
                onClick={() => dispatch(logout())}
                className="px-5 py-2 bg-white/90 hover:bg-white text-purple-600 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                👋 Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <Link to="/login">
                <button className="px-5 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 border-2 border-white/30">
                  Log in
                </button>
              </Link>
              <Link to="/register">
                <button className="px-5 py-2 bg-white hover:bg-white/95 text-purple-600 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105">
                  🚀 Sign up free
                </button>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
