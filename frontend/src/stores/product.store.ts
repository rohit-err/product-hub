import { create } from 'zustand';
import api from '../lib/axios';
import type { Product } from '../types';

interface ProductState {
  products: Product[];
  likedProducts: Product[];
  isLoading: boolean;
  fetchProducts: () => Promise<void>;
  fetchLikedProducts: () => Promise<void>;
  addProduct: (data: { name: string; price: number; image: string; description: string }) => Promise<boolean>;
  updateProduct: (id: string, data: { name: string; price: number; image: string; description: string }) => Promise<boolean>;
  toggleLike: (id: string) => Promise<void>;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  likedProducts: [],
  isLoading: false,

  fetchProducts: async () => {
    set({ isLoading: true });
    try {
      const { data } = await api.get('/products');
      set({ products: data.products, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  fetchLikedProducts: async () => {
    set({ isLoading: true });
    try {
      const { data } = await api.get('/products/liked');
      set({ likedProducts: data.products, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  addProduct: async (productData) => {
    try {
      const { data } = await api.post('/products', productData);
      set({ products: [data.product, ...get().products] });
      return true;
    } catch (error: any) {
      throw error.response?.data?.message || 'Failed to add product';
    }
  },

  updateProduct: async (id, productData) => {
    try {
      const { data } = await api.put(`/products/${id}`, productData);
      set({
        products: get().products.map((p) => (p._id === id ? data.product : p)),
      });
      return true;
    } catch (error: any) {
      throw error.response?.data?.message || 'Failed to update product';
    }
  },

  toggleLike: async (id) => {
    try {
      const { data } = await api.patch(`/products/${id}/like`);
      set({
        products: get().products.map((p) => (p._id === id ? data.product : p)),
        likedProducts: get().likedProducts.filter((p) => p._id !== id),
      });
    } catch {
      // silently fail
    }
  },
}));
