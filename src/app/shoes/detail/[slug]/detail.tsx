"use client";
import React from "react";
import MobileView from "../../../../../components/detailPage/mobileView";
import DesktopView from "../../../../../components/detailPage/desktopView";
import Dropdown from "../../../../../components/dropdown";

interface DetailProps {
  shoeDetails: Record<string, any>;
}

const Detail = ({ shoeDetails }: DetailProps) => {
  console.log("shoeDetails", shoeDetails);

  const lastImages = [
    { image: shoeDetails.colorVariation.at(0).image_url },
    { image: shoeDetails.colorVariation.at(1).image_url },
  ];
  const images =
    shoeDetails?.colorVariation?.map((items: any) => {
      return { image: items?.image_url || "" };
    }) || [];
  const totalImages = [...images, ...lastImages];
  return (
    <div>
      <MobileView images={totalImages} />
      <DesktopView images={totalImages} />
    </div>
  );
};

export default Detail;
