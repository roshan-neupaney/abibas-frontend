import React, { useState } from "react";
import MobileSlider from "../mobileSlider";
import Link from "next/link";
import { Button } from "@/subcomponents/button";
import RightArrowIcon from "../../public/icon/right-arrow-white.svg";
import DownArrowIcon from "../../public/icon/arrow-down.svg";
import RightArrowBlackIcon from "../../public/icon/right-arrow-black.svg";
import FavIcon from "../../public/icon/favorite.svg";
import Dropdown from "../dropdown";
import StarReview from "../starReview";
import ReviewDropdownMB from "./reviewDropdownMB";

const MobileView = ({ images }: any) => {
  const [showReview, setShowReview] = useState<number>(2);
  const review = [
    {
      name: "Hinton",
      title: "Absolutely impressive",
      message:
        "Absolutely impressive color, size and comfort. Love the quality and design.",
      createdAt: "November 4, 2024",
      rating: 5,
    },
    {
      name: "Btookkynella",
      title: "I feel like an elf with wings when I wear them.",
      message:
        "They are light, comfortable and for me through a loop in Central Park, first time running in a long time. Adidas is cooler than ever! I already have three pairs, will buy more.",
      createdAt: "November 4, 2024",
      rating: 5,
    },
    {
      name: "luispepe",
      title: "perfect",
      message: "I love this tennis shoes because they're very cocomfortable",
      createdAt: "November 3, 2024",
      rating: 5,
    },
    {
      name: "Sade",
      title: "I tried these on in Dicks and I had to order them.",
      message:
        "It is comfortable. Quite better than the name brands. It add support and cushion for your feet. The material in the front is breathable so you can count on the fact that your feet will be comfortable",
      createdAt: "November 3, 2024",
      rating: 5,
    },
  ];
  return (
    <div className="media-960:hidden">
      <div className="px-5 py-3">
        <div className="flex flex-wrap justify-between">
          <div className="flex gap-0.5">
            <Link href={"/"}>
              <span className="underline">Home</span>
            </Link>{" "}
            /{" "}
            <Link href={"/shoes"}>
              <span className="underline">Shoes</span>
            </Link>
            /{" "}
            <Link href={"/shoes?category=Men's"}>
              <span className="underline">Men's</span>
            </Link>
          </div>
          <div className="review-bar"></div>
        </div>
        <div
          className="mt-5 text-2xl font-bold leading-7 tracking-[2px] uppercase"
          style={{ fontFamily: "var(--font-adineue" }}
        >
          Ultraboost 5X Shoes
        </div>
        <div className="mt-3 font-bold">$180</div>
      </div>
      <MobileSlider images={images} />
      <div className="mt-10 px-5">
        <div className="font-bold">Sizes</div>
        <div className="mt-3 grid  grid-cols-[repeat(auto-fill,_minmax(69px,_1fr))] gap-[5px] tracking-[-0.2px]">
          <div className=" text-sm h-10 bg-[#eceff1] flex justify-center items-center">
            5
          </div>
          <div className=" text-sm h-10 bg-[#eceff1] flex justify-center items-center">
            5
          </div>
          <div className=" text-sm h-10 bg-[#eceff1] flex justify-center items-center">
            5
          </div>
          <div className=" text-sm h-10 bg-[#eceff1] flex justify-center items-center">
            5
          </div>
          <div className=" text-sm h-10 bg-[#eceff1] flex justify-center items-center">
            5
          </div>
          <div className=" text-sm h-10 bg-[#eceff1] flex justify-center items-center">
            5
          </div>
          <div className=" text-sm h-10 bg-[#eceff1] flex justify-center items-center">
            5
          </div>
          <div className=" text-sm h-10 bg-[#eceff1] flex justify-center items-center">
            5
          </div>
        </div>
      </div>
      <div className="mt-10 px-5 flex gap-3 flex-row">
        <Link href={"/cart"} className="flex flex-1">
          <Button
            title="add to bag"
            sideIcon={RightArrowIcon}
            iconHeight={40}
            iconWidth={30}
            className="my-button bg-black flex-1 h-12 items-center px-4 text-white uppercase translate-x-[-3px] translate-y-[-3px] "
          />
        </Link>
        <Button
          sideIcon={FavIcon}
          className="px-[14px] h-12 justify-center items-center"
        />
      </div>
      <div className="mt-16">
        <ReviewDropdownMB />
      </div>
    </div>
  );
};

export default MobileView;
