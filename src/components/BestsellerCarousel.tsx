import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import nextButton from '../assets/icon/nextButton.png';
import { Products, type Product } from '../data/products';
import { ProductCard } from './ProductCard';

export const BestsellerCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const productsPerPage = 3;
  const bestsellers = Products.filter(product => product.bestseller === true);
  const totalPages = Math.ceil(bestsellers.length / productsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === totalPages - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalPages - 1 : prevIndex - 1
    );
  };

  const visibleProducts = bestsellers.slice(
    currentIndex * productsPerPage,
    (currentIndex + 1) * productsPerPage
  );

  return (
    <div className="relative py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-5">
          <h2 className="text-4xl md:text-5xl font-bold font-lora text-white mb-2">
            Produk Terlaris
          </h2>
          <p className="text-gray-200 text-xl font-inter">Temukan produk terlaris kami yang selalu diminati pelanggan</p>
        </div>

        <div className="relative bg-tertiary p-8 rounded-[90px] w-ful flex justify-center">
          <button
            onClick={prevSlide}
            className="absolute left-[-50px] top-1/2 -translate-y-1/2 -translate-x-6 p-3 z-10 transition-colors select-none"
            aria-label="Previous slide"
          >
            <img 
              src={nextButton} 
              alt="Previous"
              draggable="false"
              className="select-none pointer-events-none"
            />
          </button>

          <div className="overflow-hidden w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center max-w-5xl mx-auto"
              >
                {visibleProducts.map((product: Product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={nextSlide}
            className="absolute right-[-50px] rotate-180 top-1/2 -translate-y-1/2 translate-x-6 p-3 z-10 transition-colors select-none"
            aria-label="Next slide"
          >
            <img 
              src={nextButton}
              alt="Next"
              draggable="false"
              className="select-none pointer-events-none"
            />
          </button>
        </div>

        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                currentIndex === index ? 'bg-[#F5F5DC]' : 'bg-[#F5F5DC] opacity-50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
