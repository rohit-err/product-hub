import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '../stores/auth.store';
import { signupSchema } from '../validators/auth.validator';
import { zodValidator } from '../lib/validator';
import { Routes } from '../types';

export default function Signup() {
  const navigate = useNavigate();
  const { signup, isLoading } = useAuthStore();
  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  });

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { valid } = zodValidator(signupSchema, form);
    if (!valid) return;

    try {
      await signup(form.name, form.email, form.mobile, form.password);
      toast.success('Registration successful');
      navigate(Routes.HOME);
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <main className="w-full max-w-[450px]">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-6 card-shadow">
          <div className="text-center mb-8">
            <h1 className="font-bold text-2xl text-primary-container">ProductHub</h1>
            <p className="text-sm text-on-surface-variant mt-2">Create your professional account</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-xs font-medium text-on-background mb-2 uppercase tracking-wider">Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
                placeholder="Jane Doe"
                className="input-base"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-on-background mb-2 uppercase tracking-wider">Email Address</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                placeholder="jane@company.com"
                className="input-base"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-on-background mb-2 uppercase tracking-wider">Mobile Number</label>
              <input
                type="tel"
                value={form.mobile}
                onChange={(e) => update('mobile', e.target.value)}
                placeholder="9876543210"
                className="input-base"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-on-background mb-2 uppercase tracking-wider">Password</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => update('password', e.target.value)}
                placeholder="••••••••"
                className="input-base"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-on-background mb-2 uppercase tracking-wider">Confirm Password</label>
              <input
                type="password"
                value={form.confirmPassword}
                onChange={(e) => update('confirmPassword', e.target.value)}
                placeholder="••••••••"
                className="input-base"
              />
            </div>

            <div className="pt-2">
              <button type="submit" disabled={isLoading} className="btn-primary">
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <Link to={Routes.LOGIN} className="font-medium text-sm text-primary-container hover:text-primary-container/80">
              Already have an account? Login
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
