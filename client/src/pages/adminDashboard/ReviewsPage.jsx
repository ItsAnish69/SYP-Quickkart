import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Plus, X } from 'lucide-react';

const initialForm = {
  user_id: '',
  product_id: '',
  comment: '',
};

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState(initialForm);

  const fetchReviews = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/reviews');
      setReviews(response.data?.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
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

    if (!formData.user_id || Number.isNaN(Number(formData.user_id))) {
      setError('Valid user_id is required');
      return;
    }

    if (!formData.product_id || Number.isNaN(Number(formData.product_id))) {
      setError('Valid product_id is required');
      return;
    }

    if (!formData.comment.trim()) {
      setError('Comment is required');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        user_id: Number(formData.user_id),
        product_id: Number(formData.product_id),
        comment: formData.comment,
      };

      const response = await axios.post('http://localhost:5000/api/reviews', payload);
      const createdReview = response.data?.data;
      if (createdReview) {
        setReviews((prev) => [createdReview, ...prev]);
      }
      setIsModalOpen(false);
      setFormData(initialForm);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create review');
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
          <Plus size={16} /> Add Review
        </button>
        <h1 className="text-[1.6rem] font-bold tracking-tight">Reviews</h1>
        <p className="text-gray-500 text-sm mt-1">Create and manage reviews from the comments table.</p>
      </div>

      <div className="bg-white rounded-[14px] shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-sm text-gray-400">Loading reviews...</div>
        ) : reviews.length === 0 ? (
          <div className="py-16 text-center text-sm text-gray-400">No reviews found. Use Add Review to create your first record.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-100 bg-[#F9FAFC]">
                  <th className="text-left text-[0.78rem] font-semibold text-gray-500 uppercase tracking-wider py-3 px-4">ID</th>
                  <th className="text-left text-[0.78rem] font-semibold text-gray-500 uppercase tracking-wider py-3 px-4">User</th>
                  <th className="text-left text-[0.78rem] font-semibold text-gray-500 uppercase tracking-wider py-3 px-4">Product</th>
                  <th className="text-left text-[0.78rem] font-semibold text-gray-500 uppercase tracking-wider py-3 px-4">Comment</th>
                  <th className="text-left text-[0.78rem] font-semibold text-gray-500 uppercase tracking-wider py-3 px-4">Created</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((review) => (
                  <tr key={review.id} className="border-b border-gray-50 last:border-b-0">
                    <td className="py-3.5 px-4 text-sm text-gray-700">{review.id}</td>
                    <td className="py-3.5 px-4 text-sm font-semibold text-gray-800">{review.user_name || '-'}</td>
                    <td className="py-3.5 px-4 text-sm text-gray-700">{review.product_name || '-'}</td>
                    <td className="py-3.5 px-4 text-sm text-gray-700">{review.comment || '-'}</td>
                    <td className="py-3.5 px-4 text-sm text-gray-500">{new Date(review.created_at).toLocaleString()}</td>
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
              <h2 className="text-lg font-semibold">Add Review</h2>
              <button
                type="button"
                onClick={closeModal}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-[#F5F6FA] hover:text-gray-600 transition"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">User ID *</label>
                  <input
                    type="number"
                    min="1"
                    name="user_id"
                    value={formData.user_id}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#5B5FEF]"
                    placeholder="e.g. 1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product ID *</label>
                  <input
                    type="number"
                    min="1"
                    name="product_id"
                    value={formData.product_id}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#5B5FEF]"
                    placeholder="e.g. 2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Comment *</label>
                <textarea
                  rows={4}
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#5B5FEF] resize-none"
                  placeholder="Write a customer review..."
                />
              </div>

              <p className="text-xs text-gray-500">Tip: Use existing IDs from Users and Products tables.</p>

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
                  {isSubmitting ? 'Creating...' : 'Create Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default ReviewsPage;
