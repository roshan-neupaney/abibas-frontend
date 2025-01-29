import React, { useState } from "react";
import { IMAGE_URL } from "../../config/constants";
import Image from "next/image";

interface DetailImageProps {
  image_url: string;
}

const DetailImage = ({ image_url }: DetailImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <span className="relative col-span-1 aspect-square">
      {!isLoaded && (
        <div className="absolute top-0 animate-pulse bg-gray-200 rounded-lg w-full h-full"></div>
      )}
      <Image
        src={IMAGE_URL + image_url}
        fill
        alt="image"
        quality={100}
        unoptimized
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
      />
    </span>
  );
};

export default DetailImage;
