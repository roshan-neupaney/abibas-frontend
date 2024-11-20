import React, { useState } from "react";
import StarFilled from "../../public/icon/star-favorite-filled.svg";
import StarEmpty from "../../public/icon/star-favorite-empty.svg";
import StarHalfEmpty from "../../public/icon/star-favorite-half-filled.svg";
import Image from "next/image";

interface StarInputProps {
  totalStars?: number;
  value: number;
  onChange: any;
  title?: string;
  starWidth?: number;
  starHeight?: number;
  required?: boolean;
  error?:string;
}


const StarInput = ({
  value = 0,
  onChange,
  title = "",
  totalStars = 5,
  starWidth = 16,
  starHeight = 16,
  required = false,
  error=''
}: StarInputProps) => {
  // const [rating, setRating] = useState(0);
  return (
    <div>
      {title && <div className="font-bold mb-2.5">{title}{required && <span>*</span>}</div>}
      <div className="flex gap-1">
        {[...Array(totalStars)].map((_, index) => (
          <Image
            key={index}
            src={
              index + 1 <= value
                ? StarFilled
                : index < value
                ? StarHalfEmpty
                : StarEmpty
            }
            alt="star"
            width={starWidth}
            height={starHeight}
              onClick={() => onChange(index + 1)}
            style={{ cursor: "pointer" }}
          />
        ))}
      </div>
      <div className="text-red-500 text-xs pt-1">{error}</div>
    </div>
  );
};

export default StarInput;
