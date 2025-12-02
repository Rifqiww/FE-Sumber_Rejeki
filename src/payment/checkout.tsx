import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { Pencil} from "lucide-react";
import { toast } from "sonner";

const Checkout = () => {
  const { cartItems, totalPrice, selectedItemsCount } = useCart();
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  const selectedItems = cartItems.filter((item) => item.selected);

  const validateAddress = (value: string) => {
    // Check if address contains at least a 5-digit number sequence
    const postalCodeRegex = /\b\d{5}\b/;
    if (!postalCodeRegex.test(value)) {
      setError("Alamat tidak memiliki kode pos");
      return false;
    }
    setError("");
    return true;
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setAddress(value);
    if (error) validateAddress(value);
  };

  const handlePayment = () => {
    if (!address) {
      setError("Alamat tidak boleh kosong");
      return;
    }

    if (!validateAddress(address)) {
      return;
    }

    toast.success("Pembayaran berhasil diproses!");
    // Implement actual payment logic here
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (selectedItems.length === 0) {
    return (
      <div className="min-h-screen bg-tertiary flex flex-col items-center justify-center p-4 font-sans">
        <h2 className="text-4xl font-bold text-[primary] mb-4">
          Tidak ada item yang dipilih
        </h2>
        <button
          onClick={() => navigate("/cart")}
          className="px-6 py-2 bg-secondary text-primary rounded-lg transition-colors font-inter text-xl"
        >
          Kembali ke Keranjang
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-tertiary p-4 md:p-8 font-sans mt-28">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-black mb-8">Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-6">
            <div className="bg-[#EADBC8] rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-[primary] mb-4 uppercase">
                Alamat Pengiriman
              </h2>
              <div className="relative">
                <textarea
                  value={address}
                  onChange={handleAddressChange}
                  placeholder="Ketik alamat anda beserta kode pos disini"
                  className={`w-full bg-[#8B6E4E] font-inter font-bold text-white placeholder-white/70 rounded-lg p-4 pr-10 min-h-[100px] resize-none focus:outline-none focus:ring-2 ${
                    error
                      ? "focus:ring-red-500 border-2 border-red-500"
                      : "focus:ring-[primary]"
                  }`}
                />
                <Pencil
                  size={18}
                  className="absolute top-4 right-4 text-white pointer-events-none"
                />
              </div>
              {error && (
                <p className="text-red-600 mt-2 text-sm font-medium">{error}</p>
              )}
            </div>

            <div className="bg-[#EADBC8] rounded-xl p-6 shadow-sm space-y-6">
              {selectedItems.map((item) => (
                <div key={item.id} className="flex gap-4 items-center">
                  <div className="w-24 h-24 rounded-lg overflow-hidden bg-white flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-[primary] font-lora">
                      {item.name}
                    </h3>
                    <div className="text-right">
                      <p className="text-xl font-bold text-[primary]">
                        {item.quantity} x {formatPrice(item.price)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-[400px]">
            <div className="bg-[#EADBC8] rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-[primary] mb-8 leading-tight">
                Pesanan akan diproses setelah pembayaran berhasil
              </h2>

              <div className="flex justify-between items-center mb-8">
                <span className="text-[#8B5A2B] text-xl">Total</span>
                <span className="text-3xl font-bold text-[primary]">
                  {formatPrice(totalPrice)}
                </span>
              </div>

              <button
                onClick={handlePayment}
                className="w-full bg-[#7FA73F] hover:bg-[#6d9135] text-white font-bold py-4 px-6 rounded-xl transition-colors text-xl shadow-sm"
              >
                Bayar Sekarang ({selectedItemsCount})
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
