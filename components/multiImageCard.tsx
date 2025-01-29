import Image from "next/image";
import React, { useEffect, useState } from "react";

interface MultiImageCardProps {
  cardData?: Record<string, any>;
  className?: string;
  id?: string;
}

const MultiImageCard = ({
  cardData = {},
  className = "",
  id = "",
}: MultiImageCardProps) => {
  const [image, setImage] = useState(cardData.image[0] || "");
  useEffect(() => {
    if (!cardData.image) return;
    let index = 0;
    const Interval = setInterval(() => {
      index = index < cardData.image.length - 1 ? index + 1 : 0;
      setImage(cardData.image[index]);
    }, 1000);

    return () => {
      clearInterval(Interval);
    };
  }, [cardData.image]);
  return (
    <div
      className={`flex flex-col gap-3 min-w-[calc((100%-10px)/1.187)] bg-white ${className} border-black hover:lg:border`}
      id={id}
    >
      <span className="relative">
        <Image src={image} width={600} height={0} alt="card image" unoptimized />
      </span>
      {(cardData.title || cardData.category) && (
        <div className="flex flex-col px-2 gap-1">
          {cardData.title && (
            <span className="text-sm leading-4">{cardData.title}</span>
          )}
          {cardData.category && (
            <span className="text-sm text-[#767677]">{cardData.category}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default MultiImageCard;
