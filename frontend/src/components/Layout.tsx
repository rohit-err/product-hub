import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './Navbar';
import { useAuthStore } from '../stores/auth.store';

export default function Layout() {
  const { user, fetchProfile } = useAuthStore();

  useEffect(() => {
    if (!user) fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  );
}
