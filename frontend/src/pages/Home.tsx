import { useEffect } from 'react';
import { useProductStore } from '../stores/product.store';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';

export default function Home() {
  const { products, fetchProducts, isLoading } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <header className="flex items-baseline gap-3 mb-8">
        <h1 className="font-bold text-2xl text-primary">Products</h1>
        <span className="bg-surface-variant text-on-surface-variant text-xs px-2 py-0.5 rounded-full">
          {products.length} Products
        </span>
      </header>

      {isLoading ? (
        <Loader />
      ) : products.length === 0 ? (
        <p className="text-center text-on-surface-variant py-12">No products found. Add your first product!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
