import { useNavigate, useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, Heart, Minus, Plus } from "lucide-react";
import { Products, type Product } from "../../data/products";
import { useCart } from "../../context/CartContext";
import { userReview } from "../../data/userReview";
import UserReviews from "../../components/UserReviews";
import Recommendations from "../../components/Recommendations";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();

  const goBack = () => navigate(-1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        const productId = Array.isArray(id) ? id[0] : id;
        const numericId = parseInt(productId as string, 10);

        if (isNaN(numericId)) {
          throw new Error("Invalid product ID");
        }

        const foundProduct = Products.find((p) => p.id === numericId);

        if (!foundProduct) {
          throw new Error("Product not found");
        }

        setProduct(foundProduct);
        setIsLiked(foundProduct.likes); // Initialize like status
      } catch (error) {
        console.error("Error loading product:", error);
        navigate("/404");
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [id, navigate]);

  const handleIncrement = () => {
    if (product && quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart(product, quantity);
      navigate("/cart");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9F5F0]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 bg-[#F9F5F0]">
        <h2 className="text-2xl font-bold text-primary mb-2">
          Produk Tidak Ditemukan
        </h2>
        <Link
          to="/menu"
          className="px-6 py-2 bg-secondary text-primary rounded-lg hover:bg-secondary-dark transition-colors"
        >
          Kembali ke Menu
        </Link>
      </div>
    );
  }

  const subtotal = product.price * quantity;
  const productReviews = userReview.filter(
    (review) => review.product_id === product.id
  );

  return (
    <section className="min-h-screen bg-tertiary py-8 px-4 sm:px-6 lg:px-8 mt-28 font-sans">
      <div className="max-w-7xl mx-auto">
        <button
          className="flex items-center text-primary hover:opacity-70 transition-opacity mb-8 font-medium"
          onClick={goBack}
        >
          <ArrowLeft size={20} className="mr-2" />
          <span>Kembali</span>
        </button>
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          {/* Left Section: Image & Details */}
          <div className="flex flex-col lg:flex-row gap-3 lg:w-[70%]">
            <div className="lg:w-[40%] flex-shrink-0">
              <div className="aspect-square w-full overflow-hidden shadow-md">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            {/* Product Info */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-primary mb-1 font-inter">
                {product.name}
              </h1>
              <p className="text-[#8B5A2B] mb-2 font-inter">
                Stock : {product.stock}
              </p>
              <p className="text-4xl font-bold text-primary mb-8 font-lora">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(product.price)}
              </p>

              <div className="mb-8">
                <h2 className="text-lg font-bold text-primary mb-2">
                  Deskripsi Produk
                </h2>
                <p className="text-primary leading-relaxed">
                  {product.description}
                </p>
              </div>

              <button
                onClick={() => setIsLiked(!isLiked)}
                className="hover:scale-110 transition-transform"
              >
                <Heart
                  size={40}
                  className={
                    isLiked ? "fill-[#E85D04] text-[#E85D04]" : "text-[#E85D04]"
                  }
                  strokeWidth={1.5}
                />
              </button>
            </div>
          </div>

          {/* Right Section: Action Card */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-tertiary border-2 border-primary rounded-2xl p-6 shadow-sm sticky top-24">
              <h3 className="text-lg font-montserrat font-bold text-primary mb-4">
                Atur jumlah pembelian
              </h3>

              <div className="bg-[#A68A64] rounded-lg p-2 flex items-center justify-between mb-6 text-white w-32 mx-auto">
                <button
                  onClick={handleDecrement}
                  disabled={quantity <= 1}
                  className="p-1 hover:bg-white/20 rounded disabled:opacity-50"
                >
                  <Minus size={16} />
                </button>
                <span className="font-medium text-lg">{quantity}</span>
                <button
                  onClick={handleIncrement}
                  disabled={quantity >= product.stock}
                  className="p-1 hover:bg-white/20 rounded disabled:opacity-50"
                >
                  <Plus size={16} />
                </button>
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="text-[#8B5A2B]">Subtotal</span>
                <span className="text-2xl font-bold text-primary font-lora">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(subtotal)}
                </span>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-medium transition-colors"
                >
                  +Keranjang
                </button>
                <button
                  onClick={handleBuyNow}
                  className="w-full bg-tertiary hover:bg-[#F9F5F0] text-primary border border-primary py-3 rounded-lg font-medium transition-colors"
                >
                  Beli Langsung
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* User Reviews Section */}
        <UserReviews reviews={productReviews} />
        {/* Recommendations Section */}
        <Recommendations excludeIds={product ? [product.id] : []} />
      </div>
    </section>
  );
};

export default ProductDetail;
