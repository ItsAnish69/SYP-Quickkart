import { useEffect, useState } from 'react';
import axios from 'axios';
import { Star } from 'lucide-react';

const HomeReviewsSection = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/reviews');
        const reviewRows = Array.isArray(response.data?.data) ? response.data.data : [];
        setReviews(reviewRows);
      } catch (error) {
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading || reviews.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">What customers say</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Reviews</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((review) => (
            <article key={review.id} className="bg-[#faf8f5] border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-1 text-amber-500 mb-3">
                {[...Array(5)].map((_, index) => (
                  <Star key={index} size={14} className="fill-current" />
                ))}
              </div>

              <p className="text-sm text-gray-700 leading-6 mb-4">"{review.comment}"</p>

              <div className="text-xs text-gray-500">
                <p className="font-semibold text-gray-800">{review.user_name}</p>
                <p>{review.product_name}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeReviewsSection;
