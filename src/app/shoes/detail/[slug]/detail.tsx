"use client";
import React, { useEffect } from "react";
import MobileView from "../../../../../components/detailPage/mobileView";
import DesktopView from "../../../../../components/detailPage/desktopView";
import { CRUD_INTERACTION } from "../../../../../config/endpoints";
import { JsonPost } from "@/utilities/apiCalls";

interface DetailProps {
  shoeDetails: Record<string, any>;
  token: string | undefined;
  slug: string;
}

const Detail = ({ shoeDetails={}, token='', slug }: DetailProps) => {
const logView = async() => {
  await JsonPost(CRUD_INTERACTION, {
    shoe_id: shoeDetails?.id,
    action_type: 'view',
    interaction_score: 2
  }, token || '')
}

  useEffect(() => {
    const viewedKey = slug;
    if (!sessionStorage.getItem(viewedKey)) {
      sessionStorage.setItem(viewedKey, 'true');
      logView();
    }
  }, [shoeDetails?.id])


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
