import { Heart, ArrowLeft, ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";
import ProfileNav from "../components/profileNav";
import { Products } from "../data/products";
import { ProductCard } from "../components/ProductCard";

const Likes = () => {
  const likedProducts = useMemo(
    () => Products.filter((product) => product.likes),
    []
  );

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(
    1,
    Math.ceil(likedProducts.length / itemsPerPage)
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = likedProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section className="flex min-h-screen mt-32">
      <div className="w-1/5">
        <ProfileNav />
      </div>

      <div className="flex-1 flex-row justify-center items-start px-8 pb-12">
        <div className="flex items-center mb-8">
          <div className="bg-red-500/40 p-2 rounded-md mr-4">
            <Heart size={40} color="" className="fill-red-500" />
          </div>
          <h1 className="text-white font-lora text-4xl">SUKA</h1>
        </div>
        <div className="bg-[#F5F5DC] rounded-r-3xl max-w-5xl p-8 shadow-lg">
          {paginatedProducts.length === 0 ? (
            <p className="text-center text-gray-700">
              Belum ada produk yang disukai.
            </p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              <div className="mt-8 flex items-center justify-between text-sm text-black">
                <button
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                  className="flex items-center gap-2 px-3 py-2 rounded-full border border-transparent hover:border-black/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowLeft size={18} />
                  <span>Sebelumnya</span>
                </button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, index) => {
                    const page = index + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageClick(page)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                          page === currentPage
                            ? "bg-black text-[#F5F5DC]"
                            : "bg-transparent hover:bg-black/5"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-2 px-3 py-2 rounded-full border border-transparent hover:border-black/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Selanjutnya</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Likes;
