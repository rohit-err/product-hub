export interface User {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  createdBy: string;
  likedBy: string[];
  createdAt: string;
  updatedAt: string;
}

export const Routes = {
  LOGIN: '/login',
  SIGNUP: '/signup',
  HOME: '/',
  ADD_PRODUCT: '/add-product',
  EDIT_PRODUCT: '/edit-product',
  LIKED_PRODUCTS: '/liked-products',
  PROFILE: '/profile',
} as const;
