import React from "react";
import StarFilled from "../public/icon/star-favorite-filled.svg";
import StarEmpty from "../public/icon/star-favorite-empty.svg";
import StarHalfEmpty from "../public/icon/star-favorite-half-filled.svg";
import Image from "next/image";

const StarReview = ({
  totalStars = 5,
  rating = 0,
  starWidth = 16,
  starHeight = 16,
}) => {
  
  return (
    <div className="flex gap-0.5">
      {[...Array(totalStars)].map((_, index) => (
        <Image
          key={index}
          src={
            index + 1 <= rating
              ? StarFilled
              : index < rating
              ? StarHalfEmpty
              : StarEmpty
          }
          alt="star"
          width={starWidth}
          height={starHeight}
          //   onClick={() => setRating(index + 1)}
          style={{ cursor: "pointer" }}
        />
      ))}
    </div>
  );
};

export default StarReview;
