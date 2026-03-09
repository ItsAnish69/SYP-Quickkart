import React, { useEffect } from 'react';
import ProductDrawer from '../components/ProductDrawer';

const product = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Top Banner Section with Collections */}
      <section className="pt-24 pb-12 bg-gradient-to-r from-gray-100 to-gray-50">
        <div className="container mx-auto px-4 lg:px-20 flex flex-col md:flex-row justify-end items-left gap-10">

            {/* Banner Content */}
            <div className="flex flex-col items-start p-5 md:text-left">
              <p className="text-green-600 font-semibold text-sm mb-2 uppercase tracking-wider">
                ✨ Collections
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Explore The Various Collection
              </h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Don't miss out to shopping collection from us! You'll not see it down.
              </p>
              <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg transition-colors inline-block">
                Shop Now →
              </button>
            </div>
          </div>
      </section>

      {/* Main Products Drawer */}
      <ProductDrawer />
    </>
  );
};

export default product;