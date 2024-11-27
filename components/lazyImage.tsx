"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
// import noImage from "../public/icons/noImage.svg";
import noImage from "../public/images/placeHolder.png";

const LazyImage = (props: any) => {
  const { src, className, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  const handleError = () => {
    setImgSrc(noImage);
  };

  return (
    <Image
      src={imgSrc}
      {...rest}
      loading="lazy"
      onError={handleError}
      alt=""
      className={className}
      quality={100}
    />
  );
};

export default LazyImage;
