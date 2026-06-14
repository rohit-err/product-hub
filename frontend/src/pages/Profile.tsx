import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/auth.store';
import { Routes } from '../types';
import Loader from '../components/Loader';

export default function Profile() {
  const { user, fetchProfile, logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) fetchProfile();
  }, []);

  const handleLogout = () => {
    logout();
    navigate(Routes.LOGIN);
  };

  if (!user) {
    return <Loader />;
  }

  return (
    <div className="flex justify-center items-start py-8 px-6">
      <div className="w-full max-w-[480px] bg-surface-container-lowest border border-outline-variant/30 rounded-lg card-shadow overflow-hidden">
        {/* Avatar Section */}
        <div className="pt-8 pb-6 flex flex-col items-center border-b border-outline-variant/30 bg-[#FDFDFD]">
          <div className="w-24 h-24 rounded-full bg-primary-container flex items-center justify-center mb-4 shadow-sm">
            <span className="text-3xl font-bold text-secondary-fixed tracking-tight">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <h1 className="font-bold text-2xl text-on-surface">{user.name}</h1>
        </div>

        {/* Details */}
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:justify-between py-4 border-b border-outline-variant/30 px-4">
            <span className="text-xs font-medium text-on-surface-variant uppercase tracking-wider mb-1 sm:mb-0">Name</span>
            <span className="text-sm text-on-surface font-medium">{user.name}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between py-4 border-b border-outline-variant/30 px-4">
            <span className="text-xs font-medium text-on-surface-variant uppercase tracking-wider mb-1 sm:mb-0">Email</span>
            <span className="text-sm text-on-surface font-medium">{user.email}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between py-4 px-4">
            <span className="text-xs font-medium text-on-surface-variant uppercase tracking-wider mb-1 sm:mb-0">Mobile Number</span>
            <span className="text-sm text-on-surface font-medium">{user.mobile}</span>
          </div>

          {/* Logout */}
          <div className="mt-8 pt-6 border-t border-outline-variant/30 flex justify-center">
            <button
              onClick={handleLogout}
              className="w-full sm:w-auto px-8 py-3 border border-error text-error font-medium text-sm rounded hover:bg-error/5 transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">logout</span>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
