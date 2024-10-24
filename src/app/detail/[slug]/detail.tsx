"use client";
import React from "react";
import MobileSlider from "../../../../components/mobileSlider";

const Detail = () => {
  const images = [
    {
      image: "/images/5.avif",
    },
    {
      image: "/images/1.avif",
    },
    {
      image: "/images/2.avif",
    },
    {
      image: "/images/3.avif",
    },
    {
      image: "/images/4.avif",
    },
    {
      image: "/images/5.avif",
    },
    {
      image: "/images/1.avif",
    },
  ];

  return (
    <div>
      <div className=""></div>
      <MobileSlider images={images} />
    </div>
  );
};

export default Detail;
