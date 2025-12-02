import { useState, useEffect } from "react";
import { Search, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { ProductCard } from "../components/ProductCard";
import { Products } from "../data/products";

const Menu: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set(["all"])
  );
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  const categories = [...new Set(Products.map((product) => product.category))];

  const allCategoriesSelected =
    categories.length > 0 &&
    categories.every((cat) => selectedCategories.has(cat));
  const filteredProducts = Products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategories.has("all") || selectedCategories.has(product.category);
    return matchesSearch && matchesCategory;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const totalProducts = filteredProducts.length;

  const getCategoryDisplayText = () => {
    if (allCategoriesSelected || selectedCategories.has("all")) {
      return "Semua Produk";
    }

    const selected = Array.from(selectedCategories);
    if (selected.length === 0) return "Semua Produk";
    if (selected.length === 1) return selected[0];

    return `${selected.slice(0, -1).join(", ")} dan ${
      selected[selected.length - 1]
    }`;
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prevCategories) => {
      const newCategories = new Set(prevCategories);

      if (category === "all") {
        if (newCategories.has("all")) {
          return new Set();
        } else {
          return new Set(["all", ...categories]);
        }
      } else {
        newCategories.delete("all");

        if (newCategories.has(category)) {
          newCategories.delete(category);
        } else {
          newCategories.add(category);
        }

        if (categories.every((cat) => newCategories.has(cat))) {
          return new Set(["all", ...categories]);
        }

        return new Set(Array.from(newCategories));
      }
    });
    setCurrentPage(1);
  };

  const isAllSelected =
    selectedCategories.has("all") ||
    (categories.length > 0 &&
      categories.every((cat) => selectedCategories.has(cat)));

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategories]);

  return (
    <section className="min-h-screen bg-tertiary mt-10">
      <div className="relative">
        <div className="bg-primary h-40"></div>

        {/* Search bar container */}
        <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-24">
          <div className="bg-primary-light rounded-xl shadow-lg p-5 flex flex-col md:flex-row items-center justify-center">
            <div className="text-center md:text-left">
              <h1 className="font-pacifico text-2xl md:text-3xl text-white w-[290px]">
                Temukan Yang Anda butuhkan disini!
              </h1>
            </div>
            <div className="relative w-full md:w-1/2">
              <input
                type="text"
                placeholder="Ketik yang ingin Anda temukan"
                className="w-full font-lora pl-12 pr-6 py-3 bg-tertiary rounded-full border-0 focus:ring-2 focus:ring-primary focus:outline-none text-primary placeholder-primary/60"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary/70"
                size={20}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="h-10"></div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="pr-2">
              <h2 className="font-lora font-bold text-2xl mb-4 text-primary">
                KATEGORI
              </h2>
              <div className="space-y-3">
                {/* All Products */}
                <div
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                    isAllSelected
                      ? "bg-tertiary-dark"
                      : "bg-white hover:bg-tertiary-dark"
                  }`}
                  onClick={() => toggleCategory("all")}
                >
                  <span className="text-primary font-inter font-medium">
                    Semua Produk
                  </span>
                  <div
                    className={`w-5 h-5 rounded-sm border-2 flex items-center justify-center flex-shrink-0 ${
                      isAllSelected
                        ? "bg-primary border-primary"
                        : "border-primary"
                    }`}
                  >
                    {isAllSelected && <Check className="w-3 h-3 text-white" />}
                  </div>
                </div>

                {/* Categories */}
                {categories.map((category) => (
                  <div
                    key={category}
                    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedCategories.has(category)
                        ? "bg-tertiary-dark"
                        : "bg-white hover:bg-tertiary-dark"
                    }`}
                    onClick={() => toggleCategory(category)}
                  >
                    <span className="text-primary font-inter font-medium">
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </span>
                    <div
                      className={`w-5 h-5 rounded-sm border-2 flex items-center justify-center flex-shrink-0 ${
                        selectedCategories.has(category)
                          ? "bg-primary border-primary"
                          : "border-primary"
                      }`}
                    >
                      {selectedCategories.has(category) && (
                        <Check className="w-3 h-3 text-white" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="flex-1">
            {/* Products Grid */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-[#3A2D1D]">
                  {getCategoryDisplayText()}
                </h2>
                <p className="text-gray-600">{totalProducts} produk</p>
              </div>

              {currentProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 bg-white rounded-lg shadow-sm">
                  <p className="text-gray-600 text-lg">
                    Tidak ada produk yang ditemukan.
                  </p>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-10 gap-1">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          currentPage === pageNum
                            ? "bg-[#8B5A2B] text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
                    aria-label="Next page"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;
