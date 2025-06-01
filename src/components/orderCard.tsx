"use client";
import React from "react";
import ProductSlider from "./productSlider";
import ProductCard from "./productCard";
import { Button } from "@/subcomponents/button";
import Link from "next/link";

interface OrderCardProps {
  productData: Record<string, any>;
  token: string;
}

const OrderCard = ({ productData, token }: OrderCardProps) => {
  return (
    <div className="flex flex-col px-8 py-5 w-full border border-[#767677] max-h-[500px]">
      <ProductSlider className="gap-4">
        {productData?.orderItems?.map(
          (items: Record<string, any>, index: number) => {
            return (
              <div key={index}>
                <ProductCard
                  // title={items?.shoe?.title}
                  price={items?.shoe.price}
                  category={items?.shoe?.category?.title}
                  image={items?.colorVariation?.image_url}
                  className="md:w-[316px] xl:w-[380px] max-w-[100px]"
                  id={items?.shoe?.id}
                  slug_url={items?.shoe?.slug_url}
                  routing_url={"/shoes/detail/"}
                  token={token}
                  showFav={false}
                />
              </div>
            );
          }
        )}
      </ProductSlider>
      <div className="flex flex-1 flex-col justify-between mt-4">
        <div className="flex w-full">
          <div className="flex flex-1 flex-col uppercase h-fit">
            <div className="flex justify-between">
              <div>
                <div>
                  Payment Status:{" "}
                  <span className="font-bold">{productData?.status}</span>
                </div>
                <div>
                  Shipping Status:{" "}
                  <span className="font-bold">
                    {productData?.shipping_status}
                  </span>
                </div>
              </div>

              <div>
                Total amount:{" "}
                <span className="font-bold">
                  Rs. {Number(productData?.total_amount)}
                </span>
              </div>
            </div>
            {/* <div>{productData.colorVariation.color.join(" / ")}</div> */}
          </div>
        </div>
      </div>
      {!(productData?.status === 'COMPLETED') && (
        <div className="flex justify-end">
          <Link href={`/payment/${productData?.id}`} aria-label="link to payment page">
            <Button title="Proceed Payment" className="my-4 px-4 py-2" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrderCard;
