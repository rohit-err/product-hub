import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useProductStore } from '../stores/product.store';
import { productSchema } from '../validators/product.validator';
import { zodValidator } from '../lib/validator';
import { Routes } from '../types';

export default function EditProduct() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, updateProduct, fetchProducts } = useProductStore();
  const [form, setForm] = useState({ name: '', price: '', image: '', description: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
      return;
    }
    const product = products.find((p) => p._id === id);
    if (product) {
      setForm({
        name: product.name,
        price: String(product.price),
        image: product.image,
        description: product.description,
      });
    }
  }, [products, id]);

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...form, price: Number(form.price) };

    const { valid } = zodValidator(productSchema, payload);
    if (!valid) return;

    setLoading(true);
    try {
      await updateProduct(id!, payload);
      toast.success('Product updated successfully!');
      navigate(Routes.HOME);
    } catch (error: any) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[600px] mx-auto px-6 py-8">
      <h1 className="font-bold text-2xl text-on-background mb-6">Edit Product</h1>

      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant card-shadow p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">Product Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              className="input-base"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">Product Price</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-on-surface-variant">$</span>
              <input
                type="number"
                step="0.01"
                value={form.price}
                onChange={(e) => update('price', e.target.value)}
                className="input-base pl-8"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">Product Image URL</label>
            <input
              type="url"
              value={form.image}
              onChange={(e) => update('image', e.target.value)}
              className="input-base"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">Product Description</label>
            <textarea
              value={form.description}
              onChange={(e) => update('description', e.target.value)}
              rows={4}
              className="input-base h-auto py-3 resize-none"
            />
          </div>

          <div className="pt-4 border-t border-outline-variant flex justify-end">
            <button type="submit" disabled={loading} className="btn-primary w-auto px-8">
              {loading ? 'Updating...' : 'Update Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
