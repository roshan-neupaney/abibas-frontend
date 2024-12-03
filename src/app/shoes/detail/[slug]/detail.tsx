"use client";
import React from "react";
import MobileView from "../../../../../components/detailPage/mobileView";
import DesktopView from "../../../../../components/detailPage/desktopView";

interface DetailProps {
  shoeDetails: Record<string, any>;
  token: string | undefined;
}

const Detail = ({ shoeDetails={}, token='' }: DetailProps) => {

  //listing all images of colorVariation
  const images =
    shoeDetails?.colorVariation?.map((items: any) => {
      return items;
    }) || [];

  //adding first two images at last position of images array
  const finalImages = [...images, ...shoeDetails?.colorVariation?.slice(0, 2) || []];

  const allSizes: string[] = [];
  shoeDetails?.colorVariation?.forEach((colorV: any) => {
    colorV?.sizes?.forEach((s: any) => {
      allSizes.push(s.size);
    });
  });
  const totalSizes = allSizes?.reduce((result: string[], currentValue) => {
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
