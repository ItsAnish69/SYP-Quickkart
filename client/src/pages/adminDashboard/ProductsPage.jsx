import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Plus, X } from 'lucide-react';

const initialForm = {
  department: 'clothing',
  name: '',
  price: '',
  oldPrice: '',
  rating: '',
  reviews: '',
  color: '',
  image: '',
  images: '',
  description: '',
};

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState(initialForm);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data?.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openModal = () => {
    setError('');
    setFormData(initialForm);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (isSubmitting) return;
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim()) {
      setError('Product name is required');
      return;
    }

    if (!formData.price || Number.isNaN(Number(formData.price))) {
      setError('Valid product price is required');
      return;
    }

    if (!formData.image.trim()) {
      setError('Image URL is required');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        department: formData.department,
        name: formData.name,
        price: Number(formData.price),
        oldPrice: formData.oldPrice ? Number(formData.oldPrice) : null,
        rating: formData.rating ? Number(formData.rating) : 0,
        reviews: formData.reviews ? Number(formData.reviews) : 0,
        color: formData.color,
        image: formData.image,
        images: formData.images
          .split(',')
          .map((value) => value.trim())
          .filter(Boolean),
        description: formData.description,
      };
      const response = await axios.post('http://localhost:5000/api/products', payload);
      const createdProduct = response.data?.data;
      if (createdProduct) {
        setProducts((prev) => [createdProduct, ...prev]);
      }
      setIsModalOpen(false);
      setFormData(initialForm);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create product');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex-1 p-4 sm:p-7">
      <div className="mb-6">
        <button
          type="button"
          onClick={openModal}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-[10px] bg-[#5B5FEF] text-white text-sm font-semibold hover:opacity-90 transition mb-3"
        >
          <Plus size={16} /> Add Product
        </button>
        <h1 className="text-[1.6rem] font-bold tracking-tight">Products</h1>
        <p className="text-gray-500 text-sm mt-1">Create and manage products from the products table.</p>
      </div>

      <div className="bg-white rounded-[14px] shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-sm text-gray-400">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="py-16 text-center text-sm text-gray-400">No products found. Use Add Product to create your first record.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-100 bg-[#F9FAFC]">
                  <th className="text-left text-[0.78rem] font-semibold text-gray-500 uppercase tracking-wider py-3 px-4">ID</th>
                  <th className="text-left text-[0.78rem] font-semibold text-gray-500 uppercase tracking-wider py-3 px-4">Department</th>
                  <th className="text-left text-[0.78rem] font-semibold text-gray-500 uppercase tracking-wider py-3 px-4">Name</th>
                  <th className="text-left text-[0.78rem] font-semibold text-gray-500 uppercase tracking-wider py-3 px-4">Price</th>
                  <th className="text-left text-[0.78rem] font-semibold text-gray-500 uppercase tracking-wider py-3 px-4">Rating</th>
                  <th className="text-left text-[0.78rem] font-semibold text-gray-500 uppercase tracking-wider py-3 px-4">Reviews</th>
                  <th className="text-left text-[0.78rem] font-semibold text-gray-500 uppercase tracking-wider py-3 px-4">Description</th>
                  <th className="text-left text-[0.78rem] font-semibold text-gray-500 uppercase tracking-wider py-3 px-4">Created</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-gray-50 last:border-b-0">
                    <td className="py-3.5 px-4 text-sm text-gray-700">{product.id}</td>
                    <td className="py-3.5 px-4 text-sm text-gray-700 capitalize">{product.department || '-'}</td>
                    <td className="py-3.5 px-4 text-sm font-semibold text-gray-800">{product.name || '-'}</td>
                    <td className="py-3.5 px-4 text-sm text-gray-700">${Number(product.price || 0).toFixed(2)}</td>
                    <td className="py-3.5 px-4 text-sm text-gray-700">{Number(product.rating || 0).toFixed(1)}</td>
                    <td className="py-3.5 px-4 text-sm text-gray-700">{product.reviews || 0}</td>
                    <td className="py-3.5 px-4 text-sm text-gray-700">{product.description || '-'}</td>
                    <td className="py-3.5 px-4 text-sm text-gray-500">{new Date(product.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/45 flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.22)] border border-gray-100">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold">Add Product</h2>
              <button
                type="button"
                onClick={closeModal}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-[#F5F6FA] hover:text-gray-600 transition"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#5B5FEF]"
                >
                  <option value="clothing">Clothing</option>
                  <option value="electronics">Electronics</option>
                  <option value="groceries">Groceries</option>
                  <option value="home-kitchen">Home & Kitchen</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#5B5FEF]"
                  placeholder="Enter product name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#5B5FEF]"
                  placeholder="Enter product price"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Old Price</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    name="oldPrice"
                    value={formData.oldPrice}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#5B5FEF]"
                    placeholder="Optional"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#5B5FEF]"
                    placeholder="0 - 5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reviews Count</label>
                  <input
                    type="number"
                    min="0"
                    name="reviews"
                    value={formData.reviews}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#5B5FEF]"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#5B5FEF]"
                  placeholder="Optional color"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Primary Image URL *</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#5B5FEF]"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gallery Image URLs</label>
                <input
                  type="text"
                  name="images"
                  value={formData.images}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#5B5FEF]"
                  placeholder="Comma separated URLs"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#5B5FEF] resize-none"
                  placeholder="Enter product description"
                />
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2.5 text-sm font-semibold rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2.5 text-sm font-semibold rounded-lg bg-[#5B5FEF] text-white hover:opacity-90 transition disabled:opacity-60"
                >
                  {isSubmitting ? 'Creating...' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default ProductsPage;
