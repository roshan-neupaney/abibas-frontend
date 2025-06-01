"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
// import noImage from "../public/icons/noImage.svg";
import noImage from "../../public/images/placeHolder.png";

const LazyImage = (props: any) => {
  const { src, className, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  const handleError = () => {
    setImgSrc(noImage);
  };

  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className="relative"
    >
      {!isLoaded && (
        <div className="absolute top-0 animate-pulse bg-gray-200 rounded-lg w-72 h-72"></div>
      )}
      <Image
        src={imgSrc}
        {...rest}
        loading="lazy"
        onError={handleError}
        alt=""
        className={`${className} max-h-72`}
        quality={100}
        unoptimized={true}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
};

export default LazyImage;
