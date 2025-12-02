import React, { useMemo } from "react";
import { Products } from "../data/products";
import { ProductCard } from "./ProductCard";

interface RecommendationsProps {
  excludeIds?: number[];
  count?: number;
}

const Recommendations: React.FC<RecommendationsProps> = ({
  excludeIds = [],
  count = 4,
}) => {
  const recommendations = useMemo(() => {
    // Filter out excluded items
    const availableProducts = Products.filter(
      (p) => !excludeIds.includes(p.id)
    );

    // Shuffle and slice
    return availableProducts.sort(() => 0.5 - Math.random()).slice(0, count);
  }, [excludeIds, count]);

  if (recommendations.length === 0) return null;

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6 text-primary uppercase tracking-wide">
        Rekomendasi Lainnya
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recommendations.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
