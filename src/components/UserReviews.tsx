import React from "react";
import type { UserReview } from "../data/userReview";

interface UserReviewsProps {
  reviews: UserReview[];
}

const UserReviews: React.FC<UserReviewsProps> = ({ reviews }) => {
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-primary mb-6 font-lora">
        ULASAN PEMBELI
      </h2>
      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review.id}
              className="bg-tertiary-dark rounded-xl p-6 flex gap-4 items-start"
            >
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-white border-2 border-white">
                <img
                  src={review.profile_image}
                  alt={review.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary font-lora mb-1">
                  {review.name}
                </h3>
                <p className="text-primary font-inter leading-relaxed">
                  {review.review}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-primary">Belum ada ulasan untuk produk ini.</p>
        )}
      </div>
    </div>
  );
};

export default UserReviews;
