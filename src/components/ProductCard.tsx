import { Heart, ShoppingCart } from 'lucide-react';
import type { Product } from '../data/products';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import type { FC, MouseEvent } from 'react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  
  const handleCardClick = (e: MouseEvent<HTMLDivElement>) => {
    // Prevent navigation if clicking on buttons
    if ((e.target as HTMLElement).closest('button')) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    navigate(`/products/${product.id}`);
  };

  return (
    <div 
      className="bg-tertiary-dark rounded-3xl p-5 shadow-lg flex flex-col h-auto w-auto hover:shadow-xl transition-transform hover:scale-105 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative mb-4">
        <img 
          src={product.image}
          alt={product.name}
          className="w-[256px] h-[256px] object-cover rounded-2xl"
        />
      </div>
      
      <div className="flex-grow">
        <div className="flex items-center justify-between">
            <div className='flex-row'>
                <h3 className="font-semibold text-md text-black">{product.name}</h3>
                <p className="text-black font-bold text-lg">
                    {new Intl.NumberFormat('id-ID', { 
                    style: 'currency', 
                    currency: 'IDR',
                    maximumFractionDigits: 0 
                    }).format(product.price)}
                </p>
            </div>
          <div className="flex gap-2">
            <button
                  onClick={() => setIsLiked(!isLiked)}
                  className="p-2 rounded-full hover:bg-gray-100"
                  aria-label={isLiked ? 'Hapus dari favorit' : 'Tambahkan ke favorit'}
                >
                  <Heart
                    size={35}
                    className={isLiked ? 'fill-red-500 text-red-500' : 'text-red-500'}
                    strokeWidth={isLiked ? 2 : 1.5}
                  />
            </button>
            <button 
              className="p-2 rounded-xl bg-primary hover:bg-primary-light transition-colors"
              aria-label="Add to cart"
            >
              <ShoppingCart className="w-8 h-auto text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
