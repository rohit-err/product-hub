import { useNavigate } from 'react-router-dom';
import { type Product, Routes } from '../types';
import { useProductStore } from '../stores/product.store';
import { useAuthStore } from '../stores/auth.store';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const navigate = useNavigate();
  const toggleLike = useProductStore((s) => s.toggleLike);
  const userId = useAuthStore((s) => s.user?._id);

  const isLiked = product.likedBy.includes(userId || '');

  return (
    <article className="bg-surface-container-lowest rounded-lg border border-outline-variant card-shadow overflow-hidden flex flex-col group transition-transform hover:-translate-y-1 duration-200">
      <div className="aspect-video w-full bg-surface-variant overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=No+Image';
          }}
        />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2 gap-4">
          <h2 className="font-bold text-sm text-on-surface truncate">{product.name}</h2>
          <span className="text-sm font-medium text-gold shrink-0">${product.price.toFixed(2)}</span>
        </div>

        <p className="text-sm text-on-surface-variant line-clamp-2 mb-6 flex-grow">
          {product.description}
        </p>

        <div className="flex justify-between items-center pt-4 border-t border-outline-variant mt-auto">
          <button
            onClick={() => toggleLike(product._id)}
            className="text-on-surface-variant hover:text-error transition-colors p-2 rounded hover:bg-surface"
          >
            <span
              className="material-symbols-outlined"
              style={isLiked ? { fontVariationSettings: "'FILL' 1", color: '#C9A84C' } : {}}
            >
              favorite
            </span>
          </button>

          <button
            onClick={() => navigate(`${Routes.EDIT_PRODUCT}/${product._id}`)}
            className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded hover:bg-surface"
          >
            <span className="material-symbols-outlined">edit</span>
          </button>
        </div>
      </div>
    </article>
  );
}
