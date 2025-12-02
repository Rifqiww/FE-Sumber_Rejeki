import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartItem } from "../components/CartItem";
import { Check } from "lucide-react";
import { useCart } from "../context/CartContext";
import Recommendations from "../components/Recommendations";

const Cart = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    toggleSelectAll,
    toggleSelectItem,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalPrice,
    selectedItemsCount,
    isAllSelected,
  } = useCart();

  const [showDeletePopup, setShowDeletePopup] = useState(false);

  // Helper to format price

  // Helper to format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleDeleteAll = () => {
    clearCart();
    setShowDeletePopup(false);
  };

  return (
    <div className="min-h-screen bg-tertiary p-8 font-sans mt-28 relative">
      {showDeletePopup && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-tertiary-dark rounded-xl p-6 max-w-sm w-full shadow-xl transform transition-all scale-100">
            <h3 className="text-lg font-bold text-center mb-4 text-primary">
              Apakah anda yakin untuk menghapus semua item dikeranjang?
            </h3>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setShowDeletePopup(false)}
                className="px-6 py-2 rounded-lg hover:bg-tertiary text-black font-medium transition-colors"
              >
                Tidak
              </button>
              <button
                onClick={handleDeleteAll}
                className="px-6 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition-colors"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-black">Keranjang</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-4">
            {cartItems.length > 0 ? (
              <div className="bg-tertiary-dark rounded-xl p-4 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                  <button
                    onClick={toggleSelectAll}
                    className={`w-6 h-6 rounded flex items-center justify-center transition-colors ${
                      isAllSelected
                        ? "bg-[#7FA73F]"
                        : "bg-white border border-gray-300"
                    }`}
                  >
                    {isAllSelected && (
                      <Check size={16} className="text-white" />
                    )}
                  </button>
                  <span className="font-medium text-lg text-black">
                    Pilih Semua{" "}
                    <span className="text-gray-500">({cartItems.length})</span>
                  </span>
                </div>
                <button
                  onClick={() => setShowDeletePopup(true)}
                  className="text-black font-medium hover:text-red-600 transition-colors"
                >
                  Hapus
                </button>
              </div>
            ) : null}

            <div className="space-y-4">
              {cartItems.length === 0 ? (
                <div className="bg-tertiary-dark rounded-xl p-12 text-center shadow-sm">
                  <p className="text-xl text-gray-600 font-medium">
                    belum ada barang di keranjang
                  </p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    toggleSelectItem={toggleSelectItem}
                    updateQuantity={updateQuantity}
                    removeItem={removeFromCart}
                    formatPrice={formatPrice}
                  />
                ))
              )}
            </div>
          </div>

          {cartItems.length > 0 && (
            <div className="lg:w-96">
              <div className="bg-tertiary-dark rounded-xl p-6 shadow-sm  top-8">
                <h2 className="text-xl font-bold mb-6 text-black">
                  Ringkasan Belanja
                </h2>

                <div className="flex justify-between items-center mb-8">
                  <span className="text-gray-600 text-lg">Total</span>
                  <span className="text-2xl font-bold text-black">
                    {formatPrice(totalPrice)}
                  </span>
                </div>

                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full bg-[#7FA73F] hover:bg-[#6d9135] text-white font-bold py-3 px-6 rounded-xl transition-colors text-lg"
                >
                  Beli Sekarang ({selectedItemsCount})
                </button>
              </div>
            </div>
          )}
        </div>

        <Recommendations excludeIds={cartItems.map((item) => item.id)} />
      </div>
    </div>
  );
};

export default Cart;
