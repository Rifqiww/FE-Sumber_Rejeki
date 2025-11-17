import { useNavigate, useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowLeft, Heart } from 'lucide-react';
import { Products } from '../../data/products';

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  stock: number;
};

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const productId = Array.isArray(id) ? id[0] : id;
        const numericId = parseInt(productId as string, 10);
        
        if (isNaN(numericId)) {
          throw new Error('Invalid product ID');
        }
        
        const foundProduct = Products.find(p => p.id === numericId);
        
        if (!foundProduct) {
          throw new Error('Product not found');
        }
        
        setProduct(foundProduct);
      } catch (error) {
        console.error('Error loading product:', error);
        navigate('/404');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProduct();
  }, [id, navigate]);

  const handleIncrement = () => {
    if (product && quantity < product.stock) {
      setQuantity(prev => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log(`Added ${quantity} ${product?.name} to cart`);
  };

  const handleBuyNow = () => {
    // Buy now logic here
    console.log(`Buying ${quantity} ${product?.name}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Produk Tidak Ditemukan</h2>
        <p className="text-gray-600 mb-4">Maaf, produk yang Anda cari tidak tersedia.</p>
        <Link 
          to="/menu"
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          Kembali ke Menu
        </Link>
      </div>
    );
  }

  const subtotal = product.price * quantity;

  return (
    <div className="min-h-screen bg-[#F5F5DC] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Link to="/menu" className="flex items-center text-primary hover:text-primary-dark mb-8">
          <ArrowLeft size={20} className="mr-2" />
          <span>Kembali</span>
        </Link>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="md:flex">
            {/* Left Side - Product Image */}
            <div className="md:w-1/2 p-6">
              <div className="relative h-80 md:h-96 w-full bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="mt-6">
                <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                <p className="text-gray-600 mt-2">Stok: {product.stock}</p>
                <p className="text-2xl font-bold text-primary mt-2">
                  {new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    minimumFractionDigits: 0,
                  }).format(product.price)}
                </p>
                
                <div className="mt-6">
                  <h2 className="text-lg font-semibold text-gray-900">Deskripsi Produk</h2>
                  <p className="mt-2 text-gray-600">{product.description}</p>
                </div>

                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className="mt-6 p-2 rounded-full hover:bg-gray-100"
                  aria-label={isLiked ? 'Hapus dari favorit' : 'Tambahkan ke favorit'}
                >
                  <Heart
                    size={68}
                    className={isLiked ? 'fill-red-500 text-red-500' : 'text-red-500'}
                    strokeWidth={isLiked ? 2 : 1.5}
                  />
                </button>
              </div>
            </div>

            {/* Right Side - Purchase Options */}
            <div className="md:w-1/2 bg-[#F9F5F0] p-6 md:p-8">
              <div className="h-full flex flex-col">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Atur jumlah pembelian</h2>
                
                <div className="bg-white rounded-xl p-6 shadow-sm flex-1">
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-gray-700">Jumlah</span>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={handleDecrement}
                        disabled={quantity <= 1}
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          quantity <= 1 ? 'bg-gray-200 text-gray-400' : 'bg-primary text-white hover:bg-primary-dark'
                        }`}
                        aria-label="Kurangi jumlah"
                      >
                        -
                      </button>
                      <span className="w-10 text-center text-lg font-medium">{quantity}</span>
                      <button
                        onClick={handleIncrement}
                        disabled={quantity >= product.stock}
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          quantity >= product.stock ? 'bg-gray-200 text-gray-400' : 'bg-primary text-white hover:bg-primary-dark'
                        }`}
                        aria-label="Tambah jumlah"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-gray-700">Subtotal</span>
                      <span className="text-2xl font-bold text-primary">
                        {new Intl.NumberFormat('id-ID', {
                          style: 'currency',
                          currency: 'IDR',
                          minimumFractionDigits: 0,
                        }).format(subtotal)}
                      </span>
                    </div>

                    <div className="space-y-4">
                      <button
                        onClick={handleAddToCart}
                        className="w-full bg-primary hover:bg-primary-dark text-white py-3 px-6 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                      >
                        <span>+ Keranjang</span>
                      </button>
                      <button
                        onClick={handleBuyNow}
                        className="w-full bg-amber-50 hover:bg-amber-100 text-primary border border-amber-200 py-3 px-6 rounded-lg font-medium transition-colors"
                      >
                        Beli Langsung
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
