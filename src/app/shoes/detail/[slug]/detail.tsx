"use client";
import React from "react";
import MobileView from "../../../../../components/detailPage/mobileView";
import DesktopView from "../../../../../components/detailPage/desktopView";
import Dropdown from "../../../../../components/dropdown";

interface DetailProps {
  shoeDetails: Record<string, any>;
  token: string | undefined;
}

const Detail = ({ shoeDetails={}, token='' }: DetailProps) => {
  console.log("shoeDetails", shoeDetails);

  //listing all images of colorVariation
  const images =
    shoeDetails?.colorVariation?.map((items: any) => {
      return items;
    }) || [];

  //adding first two images at last position of images array
  const finalImages = [...images, ...shoeDetails?.colorVariation?.slice(0, 2)];

  let allSizes: string[] = [];
  shoeDetails?.colorVariation?.forEach((colorV: any) => {
    colorV?.sizes?.forEach((s: any) => {
      allSizes.push(s.size);
    });
  });
  let totalSizes = allSizes?.reduce((result: string[], currentValue) => {
    if (!result?.includes(currentValue)) {
      result?.push(currentValue);
    }
    return result;
  }, []);
  return (
    <div>
      <MobileView images={finalImages} totalSizes={totalSizes} shoeDetails={shoeDetails} token={token} />
      <DesktopView images={finalImages} totalSizes={totalSizes} shoeDetails={shoeDetails} token={token} />
    </div>
  );
};

export default Detail;
