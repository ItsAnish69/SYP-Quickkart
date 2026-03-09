import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Heart, Star, Zap, TrendingUp, ShoppingCart } from "lucide-react";
import firstImg from "../img/homePageImg/img10.avif";
import lowPrice from "../img/homePageImg/lowprice.avif";
import promotionImage from "../img/homePageImg/promotion.avif";
import gradientBg from "../img/homePageImg/gradientBg.png";

const home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [likedProducts, setLikedProducts] = useState({});
  const [cart, setCart] = useState([]);
  const [showAddedNotification, setShowAddedNotification] = useState(null);

  // Hero carousel images
  const heroImages = [
    firstImg,
    lowPrice,
    promotionImage,
    firstImg,
  ];

  // Categories data
  const categories = [
    { id: 1, name: "Electronics", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop", count: "2.5K+" },
    { id: 2, name: "Fashion", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop", count: "5.2K+" },
    { id: 3, name: "Home & Living", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop", count: "3.8K+" },
    { id: 4, name: "Beauty", image: "https://images.unsplash.com/photo-1631730486268-f1d17b7d0b11?w=300&h=300&fit=crop", count: "2.1K+" },
    { id: 5, name: "Sports", image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=300&h=300&fit=crop", count: "1.9K+" },
    { id: 6, name: "Books & Media", image: "https://images.unsplash.com/photo-150784272343-583f20270319?w=300&h=300&fit=crop", count: "1.3K+" },
  ];

  // Trending products
  const trendingProducts = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: "2,499",
      originalPrice: "4,999",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
      rating: 4.8,
      reviews: 1240,
      discount: 50,
      badge: "Flash Sale",
    },
    {
      id: 2,
      name: "Premium Smartwatch",
      price: "5,999",
      originalPrice: "9,999",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
      rating: 4.6,
      reviews: 856,
      discount: 40,
      badge: "Hot Deal",
    },
    {
      id: 3,
      name: "Camera Lens",
      price: "8,999",
      originalPrice: "14,999",
      image: "https://images.unsplash.com/photo-1606986628025-35d57e735ae0?w=300&h=300&fit=crop",
      rating: 4.9,
      reviews: 542,
      discount: 40,
      badge: "Trending",
    },
    {
      id: 4,
      name: "Gaming Keyboard",
      price: "1,999",
      originalPrice: "3,999",
      image: "https://images.unsplash.com/photo-1587829191301-47d1a0b8b47e?w=300&h=300&fit=crop",
      rating: 4.7,
      reviews: 723,
      discount: 50,
      badge: "Flash Sale",
    },
  ];

  // All products for grid
  const allProducts = [
    ...trendingProducts,
    {
      id: 5,
      name: "Portable Speaker",
      price: "1,499",
      originalPrice: "2,999",
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop",
      rating: 4.5,
      reviews: 345,
      discount: 50,
    },
    {
      id: 6,
      name: "USB-C Cable",
      price: "299",
      originalPrice: "599",
      image: "https://images.unsplash.com/photo-1621540489099-981a58a6b580?w=300&h=300&fit=crop",
      rating: 4.4,
      reviews: 1523,
      discount: 50,
    },
    {
      id: 7,
      name: "Phone Stand",
      price: "399",
      originalPrice: "799",
      image: "https://images.unsplash.com/photo-1559163853-cd4628902d4a?w=300&h=300&fit=crop",
      rating: 4.6,
      reviews: 892,
      discount: 50,
    },
    {
      id: 8,
      name: "Screen Protector",
      price: "199",
      originalPrice: "499",
      image: "https://images.unsplash.com/photo-1520923642038-b4259acecbd7?w=300&h=300&fit=crop",
      rating: 4.3,
      reviews: 2341,
      discount: 60,
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const previousSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
  };

  const toggleLike = (productId) => {
    setLikedProducts((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
    setShowAddedNotification(product.id);
    setTimeout(() => setShowAddedNotification(null), 2000);
  };

  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-lg shadow hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative overflow-hidden h-56 bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {product.discount && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-md text-sm font-bold">
            -{product.discount}%
          </div>
        )}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-md text-xs font-bold flex items-center gap-1">
            <Zap size={14} /> {product.badge}
          </div>
        )}
        <button
          onClick={() => toggleLike(product.id)}
          className="absolute bottom-3 right-3 bg-white rounded-full p-2 shadow hover:bg-gray-100 transition-colors"
        >
          <Heart
            size={20}
            className={likedProducts[product.id] ? "fill-red-500 text-red-500" : "text-gray-400"}
          />
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 line-clamp-2 h-14">{product.name}</h3>
        <div className="flex items-center gap-2 my-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
              />
            ))}
          </div>
          <span className="text-xs text-gray-600">({product.reviews})</span>
        </div>
        <div className="flex items-baseline gap-2 my-3">
          <span className="text-xl font-bold text-gray-900">Rs {product.price}</span>
          <span className="text-sm text-gray-500 line-through">Rs {product.originalPrice}</span>
        </div>
        <button onClick={() => addToCart(product)} className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
          <ShoppingCart size={18} /> Add to Cart
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Hero Carousel Section */}
      <section className="pt-25 pb-5 bg-white">
        <div className="container mx-auto px-4 lg:px-20">
          {/* Hero Carousel */}
          <div className="relative rounded-xl overflow-hidden shadow-lg h-96 md:h-[500px] mb-8">
            <div className="relative w-full h-full">
              {heroImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <img src={image} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black bg-opacity-10"></div>
                </div>
              ))}
            </div>

            {/* Carousel Controls */}
            <button
              onClick={previousSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all z-10 hidden md:block"
            >
              <ChevronLeft size={24} className="text-gray-800" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all z-10 hidden md:block"
            >
              <ChevronRight size={24} className="text-gray-800" />
            </button>

            {/* Carousel Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentSlide ? "bg-white w-8" : "bg-white bg-opacity-50 w-2"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Promotion Banners */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            <div className="relative rounded-lg overflow-hidden h-40 shadow-md group cursor-pointer">
              <img
                src={gradientBg}
                alt="Promo 1"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-500 opacity-40 flex items-center justify-center">
                <div className="text-center text-white">
                  <p className="text-lg font-semibold">Special Offer</p>
                  <p className="text-3xl font-bold">50% OFF</p>
                </div>
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden h-40 shadow-md group cursor-pointer">
              <img
                src={gradientBg}
                alt="Promo 2"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-500 opacity-40 flex items-center justify-center">
                <div className="text-center text-white">
                  <p className="text-lg font-semibold">Flash Sale</p>
                  <p className="text-3xl font-bold">6 Hrs</p>
                </div>
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden h-40 shadow-md group cursor-pointer">
              <img
                src={gradientBg}
                alt="Promo 3"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-500 opacity-40 flex items-center justify-center">
                <div className="text-center text-white">
                  <p className="text-lg font-semibold">New Arrival</p>
                  <p className="text-3xl font-bold">Shop Now</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Categories Section */}
      <section className="py-12 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 lg:px-20">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Top Categories</h2>
            <div className="w-20 h-1 bg-green-500 rounded-full"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer"
              >
                <div className="relative overflow-hidden h-48 bg-gray-100">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-gray-800 group-hover:text-green-500 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{category.count} items</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-20">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                <TrendingUp className="text-green-500" /> Trending Now
              </h2>
              <div className="w-20 h-1 bg-green-500 rounded-full"></div>
            </div>
            <a href="/product" className="text-green-500 hover:text-green-600 font-semibold transition-colors">
              View All →
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* All Products Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 lg:px-20">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Featured Products</h2>
            <div className="w-20 h-1 bg-green-500 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {allProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg">
              Explore More Products
            </button>
          </div>
        </div>
      </section>

      {/* Hero Section - Team Design */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto p-10">
          <div className="text-center gap-5">
            <p className="text-sm text-gray-600 uppercase tracking-wide">ABOUT</p>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              The dream team of
              <br />
              Shopping Ecommerce.
            </h1>
            <p className="text-gray-600 text-lg">Our SEO Marketing Online Expert</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-items-center p-12">
            <div className="bg-white rounded-lg p-8 shadow-lg max-w-sm">
              <div className="mb-6 h-64 bg-gradient-to-br from-green-100 to-green-50 rounded-lg flex items-center justify-center">
                <div className="text-6xl">👨‍💻</div>
              </div>
              <p className="text-gray-700 text-sm mb-3">01</p>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                SEO Website Design
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Expert Web designing for online sales to elevate your brand and reach more customers effectively.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 shadow-lg max-w-sm">
              <div className="mb-6 h-64 bg-gradient-to-br from-green-100 to-green-50 rounded-lg flex items-center justify-center">
                <div className="text-6xl">👨‍💻</div>
              </div>
              <p className="text-gray-700 text-sm mb-3">02</p>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                SEO Website Design
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Expert Web designing for online sales to elevate your brand and reach more customers effectively.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 shadow-lg max-w-sm">
              <div className="mb-6 h-64 bg-gradient-to-br from-green-100 to-green-50 rounded-lg flex items-center justify-center">
                <div className="text-6xl">👩‍💼</div>
              </div>
              <p className="text-gray-700 text-sm mb-3">03</p>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Business Strategy
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Get a strategy for growing an online business and expanding your network with experts in the industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 bg-gradient-to-r from-green-500 to-green-600">
        <div className="container mx-auto px-4 lg:px-20">
          <div className="max-w-2xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="mb-6 text-green-50">Get exclusive deals and the latest products delivered to your inbox</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-green-500 hover:bg-gray-100 font-bold px-8 py-3 rounded-lg transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default home;