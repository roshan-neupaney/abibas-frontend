"use client";
import React, { useEffect } from "react";
import MobileView from "../../../../../components/detailPage/mobileView";
import DesktopView from "../../../../../components/detailPage/desktopView";
import { CRUD_INTERACTION } from "../../../../../config/endpoints";
import { JsonPost } from "@/utilities/apiCalls";
import ProductSlider from "../../../../../components/productSlider";
import ProductCard from "../../../../../components/productCard";

interface DetailProps {
  shoeDetails: Record<string, any>;
  token: string | undefined;
  slug: string;
  recommends: Array<Record<string, any>>;
}

const Detail = ({ shoeDetails={}, token='', slug, recommends }: DetailProps) => {
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

console.log(recommends)
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
    <div className="flex-col">
      <MobileView images={finalImages} totalSizes={totalSizes} shoeDetails={shoeDetails} token={token} />
      <DesktopView images={finalImages} totalSizes={totalSizes} shoeDetails={shoeDetails} token={token} />
      {recommends?.length > 0 && (
        <div className="flex flex-col mt-10 mx-1 gap-2">
          <span
            className="font-bold text-3xl ml-2 uppercase"
            style={{ fontFamily: "var(--font-adineue)" }}
          >
            You may also like
          </span>
          <ProductSlider className="gap-4">
            {recommends?.map((items: Record<string, any>, index: number) => {
              return (
                <div key={index}>
                  <ProductCard
                    title={items?.title}
                    price={items.price}
                    category={items?.type}
                    image={items?.colorVariation[0].image_url}
                    className="md:w-[316px] xl:w-[380px]"
                    id={items?.id}
                    slug_url={items.slug_url}
                    routing_url={"/shoes/detail/"}
                    token={token}
                  />
                </div>
              );
            })}
          </ProductSlider>
        </div>
      )}
    </div>
  );
};

export default Detail;
