"use client";
import React, { useState } from "react";
import ProductCard from "../productCard";
import { Button } from "@/subcomponents/button";
import ProductSlider from "../productSlider";
import NextIconWhite from "../../public/icon/right-arrow-white.svg";
import Link from "next/link";

const BestSeller = ({ token, shoeTopSellers, shoeLatest }: any) => {
  const [activeTab, setActiveTab] = useState("latest");
  const shoes =
    activeTab === "top_seller" ? shoeTopSellers?.data : shoeLatest?.data;
  return (
    <div className="flex px-4 media-390:px-8 md:pr-0 md:pl-14 xl:pl-28 xl:pr-0 mt-20 2xl:px-1">
      <section className="flex flex-col gap-5 w-full">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button
              title="New Arrivals"
              className="w-fit text-white flex items-center px-3 h-11"
              onClick={() => setActiveTab("latest")}
              style={{
                backgroundColor: activeTab === "latest" ? "black" : "white",
                color: activeTab === "latest" ? "white" : "black",
              }}
            />
            <Button
              title="Best Sellers"
              className="w-fit flex items-center px-3 h-11"
              onClick={() => setActiveTab("top_seller")}
              style={{
                backgroundColor: activeTab === "top_seller" ? "black" : "white",
                color: activeTab === "top_seller" ? "white" : "black",
              }}
            />
          </div>
          <Link
            href={`${
              activeTab === "top_seller"
                ? "search?sortBy=top_sellers"
                : "search?sortBy=newest"
            }`}
          >
            <div className="media-600:flex uppercase underline hidden font-bold text-sm tracking-[2px] sm:mt-4 md:mt-0 media-390:mr-8 md:mr-16 2xl:mr-28 cursor-pointer">
              View All
            </div>
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-[10px] media-600:hidden overflow-x-scroll slider-container">
          {shoes
            ?.slice(0, 6)
            ?.map((items: Record<string, any>, index: number) => {
              return (
                <div className="col-span-1" key={index}>
                  <ProductCard
                    image={items?.colorVariation[0]?.image_url}
                    price={items.price}
                    showFav={false}
                    className="w-full"
                    token={token}
                    id={items?.id}
                    slug_url={items.slug_url}
                    routing_url={"/shoes/detail/"}
                  />
                </div>
              );
            })}
          <div className="col-span-2">
            <Link
              href={`${
                activeTab === "top_seller"
                  ? "?sortBy=top_sellers"
                  : "?sortBy=newest"
              }`}
            >
              <Button
                title="View All"
                className="px-4 text-white bg-black uppercase w-full h-12 items-center tracking-[2px] cursor-pointer"
                sideIcon={NextIconWhite}
                iconWidth={30}
              />
            </Link>
          </div>
        </div>
        <ProductSlider className="hidden media-600:flex gap-[10px] recommendedSlider">
          {shoes?.map((items: Record<string, any>, index: number) => {
            return (
              <div key={index}>
                <ProductCard
                  title={items?.title}
                  showFav={false}
                  category={items?.category?.title}
                  image={items?.colorVariation[0]?.image_url}
                  price={items.price}
                  className="w-full mb-8 media-600:w-40 md:w-80 lg:w-52 media-1366:w-72"
                  id={items?.id}
                  slug_url={items.slug_url}
                  routing_url={"/shoes/detail/"}
                  token={token}
                />
              </div>
            );
          })}
        </ProductSlider>
      </section>
    </div>
  );
};

export default BestSeller;
