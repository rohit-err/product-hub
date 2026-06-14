import { useEffect } from 'react';
import { useProductStore } from '../stores/product.store';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';

export default function LikedProducts() {
  const { likedProducts, fetchLikedProducts, isLoading } = useProductStore();

  useEffect(() => {
    fetchLikedProducts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <header className="mb-8">
        <h1 className="font-bold text-2xl text-primary">Liked Products</h1>
        <p className="text-sm text-on-surface-variant mt-2">Review your saved products. Click the heart to unlike.</p>
      </header>

      {isLoading ? (
        <Loader />
      ) : likedProducts.length === 0 ? (
        <p className="text-center text-on-surface-variant py-12">No liked products yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {likedProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
