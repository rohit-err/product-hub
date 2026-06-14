import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useProductStore } from '../stores/product.store';
import { productSchema } from '../validators/product.validator';
import { zodValidator } from '../lib/validator';
import { Routes } from '../types';

export default function AddProduct() {
  const navigate = useNavigate();
  const addProduct = useProductStore((s) => s.addProduct);
  const [form, setForm] = useState({ name: '', price: '', image: '', description: '' });
  const [loading, setLoading] = useState(false);

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
      await addProduct(payload);
      toast.success('Product added successfully!');
      navigate(Routes.HOME);
    } catch (error: any) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[600px] mx-auto px-6 py-8">
      <h1 className="font-bold text-2xl text-on-background mb-6">Add New Product</h1>

      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant card-shadow p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">Product Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              placeholder="Enter product name"
              className="input-base"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">Product Price ($)</label>
            <input
              type="number"
              step="0.01"
              value={form.price}
              onChange={(e) => update('price', e.target.value)}
              placeholder="0.00"
              className="input-base"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">Product Image URL</label>
            <input
              type="url"
              value={form.image}
              onChange={(e) => update('image', e.target.value)}
              placeholder="https://..."
              className="input-base"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">Product Description</label>
            <textarea
              value={form.description}
              onChange={(e) => update('description', e.target.value)}
              placeholder="Enter product details..."
              rows={4}
              className="input-base h-auto py-3 resize-none"
            />
          </div>

          <div className="pt-4 border-t border-outline-variant flex justify-end">
            <button type="submit" disabled={loading} className="btn-primary w-auto px-8">
              {loading ? 'Adding...' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
