import { Trash2, Heart, Minus, Plus, Check } from "lucide-react";
import type { Product } from "../data/products";

export interface CartItemType extends Product {
  quantity: number;
  selected: boolean;
}

interface CartItemProps {
  item: CartItemType;
  toggleSelectItem: (id: number) => void;
  updateQuantity: (id: number, delta: number) => void;
  removeItem: (id: number) => void;
  formatPrice: (price: number) => string;
}

export const CartItem = ({
  item,
  toggleSelectItem,
  updateQuantity,
  removeItem,
  formatPrice,
}: CartItemProps) => {
  return (
    <div className="bg-tertiary-dark rounded-xl p-4 flex gap-4 shadow-sm">
      {/* Checkbox */}
      <div className="flex items-center">
        <button
          onClick={() => toggleSelectItem(item.id)}
          className={`w-6 h-6 rounded flex items-center justify-center transition-colors ${
            item.selected ? "bg-[#7FA73F]" : "bg-white border border-gray-300"
          }`}
        >
          {item.selected && <Check size={16} className="text-white" />}
        </button>
      </div>

      {/* Image */}
      <div className="w-24 h-24 flex-shrink-0 bg-white rounded-lg overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-black">{item.name}</h3>
          <p className="text-lg font-bold text-black">
            {formatPrice(item.price)}
          </p>
        </div>

        <div className="flex justify-between items-end">
          {/* Quantity Control */}
          <div className="flex items-center gap-3">
            <div className="flex items-center border border-gray-400 rounded-full px-2 py-1">
              <button
                onClick={() => updateQuantity(item.id, -1)}
                className="p-1 hover:text-primary transition-colors"
                disabled={item.quantity <= 1}
              >
                <Minus
                  size={16}
                  className={
                    item.quantity <= 1 ? "text-gray-400" : "text-black"
                  }
                />
              </button>
              <span className="w-8 text-center font-medium text-black">
                {item.quantity}
              </span>
              <button
                onClick={() => updateQuantity(item.id, 1)}
                className="p-1 hover:text-primary transition-colors"
                disabled={item.quantity >= item.stock}
              >
                <Plus
                  size={16}
                  className={
                    item.quantity >= item.stock ? "text-gray-400" : "text-black"
                  }
                />
              </button>
            </div>

            <button
              onClick={() => removeItem(item.id)}
              className="p-2 text-gray-600 hover:text-red-500 transition-colors"
            >
              <Trash2 size={20} />
            </button>

            <button className="p-2 text-gray-600 hover:text-red-500 transition-colors">
              <Heart
                size={20}
                className={item.likes ? "fill-red-500 text-red-500" : ""}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
