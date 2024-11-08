"use client";
import React from "react";
import MobileView from "../../../../../components/detailPage/mobileView";
import DesktopView from "../../../../../components/detailPage/desktopView";
import Dropdown from "../../../../../components/dropdown";

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
      <MobileView images={images} />
      <DesktopView images={images} />
    </div>
  );
};

export default Detail;
