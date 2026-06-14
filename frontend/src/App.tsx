import { BrowserRouter, Routes as RouterRoutes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Routes } from './types';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import LikedProducts from './pages/LikedProducts';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <RouterRoutes>
        <Route path={Routes.LOGIN} element={<Login />} />
        <Route path={Routes.SIGNUP} element={<Signup />} />
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path={Routes.HOME} element={<Home />} />
          <Route path={Routes.ADD_PRODUCT} element={<AddProduct />} />
          <Route path={`${Routes.EDIT_PRODUCT}/:id`} element={<EditProduct />} />
          <Route path={Routes.LIKED_PRODUCTS} element={<LikedProducts />} />
          <Route path={Routes.PROFILE} element={<Profile />} />
        </Route>
        <Route path="*" element={<Navigate to={Routes.HOME} replace />} />
      </RouterRoutes>
    </BrowserRouter>
  );
}
