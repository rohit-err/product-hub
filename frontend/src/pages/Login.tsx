import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '../stores/auth.store';
import { loginSchema } from '../validators/auth.validator';
import { zodValidator } from '../lib/validator';
import { Routes } from '../types';

export default function Login() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { valid } = zodValidator(loginSchema, { email, password });
    if (!valid) return;

    try {
      await login(email, password);
      toast.success('Login successful');
      navigate(Routes.HOME);
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <main className="w-full max-w-[400px]">
        <div className="bg-surface-container-lowest rounded-lg card-shadow border border-outline-variant/30 p-6 sm:p-8">
          <div className="text-center mb-8">
            <h1 className="font-bold text-2xl text-primary-container">ProductHub</h1>
            <p className="text-sm text-on-surface-variant mt-1">Sign in to your workspace.</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <label className="block text-sm font-medium text-on-surface mb-2" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="input-base"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-on-surface mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input-base"
              />
            </div>

            <button type="submit" disabled={isLoading} className="btn-primary mt-2">
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-on-surface-variant">
              Don't have an account?{' '}
              <Link to={Routes.SIGNUP} className="font-medium text-primary-container hover:text-primary-container/80">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
