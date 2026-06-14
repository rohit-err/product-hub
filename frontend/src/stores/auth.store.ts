import { create } from 'zustand';
import api from '../lib/axios';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, mobile: string, password: string) => Promise<boolean>;
  fetchProfile: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  isLoading: false,

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      set({ user: data.user, token: data.token, isLoading: false });
      return true;
    } catch (error: any) {
      set({ isLoading: false });
      throw error.response?.data?.message || 'Login failed';
    }
  },

  signup: async (name, email, mobile, password) => {
    set({ isLoading: true });
    try {
      const { data } = await api.post('/auth/signup', { name, email, mobile, password, confirmPassword: password });
      localStorage.setItem('token', data.token);
      set({ user: data.user, token: data.token, isLoading: false });
      return true;
    } catch (error: any) {
      set({ isLoading: false });
      throw error.response?.data?.message || 'Signup failed';
    }
  },

  fetchProfile: async () => {
    try {
      const { data } = await api.get('/auth/profile');
      set({ user: data.user });
    } catch {
      localStorage.removeItem('token');
      set({ user: null, token: null });
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },
}));
