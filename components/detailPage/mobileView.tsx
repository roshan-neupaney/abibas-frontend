import React from "react";
import MobileSlider from "../mobileSlider";
import Link from "next/link";
import { Button } from "@/subcomponents/button";
import RightArrowIcon from "../../public/icon/right-arrow-white.svg";
import FavIcon from "../../public/icon/favorite.svg";

const MobileView = ({ images }: any) => {
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
        <Button
          title="add to bag"
          sideIcon={RightArrowIcon}
          iconHeight={40}
          iconWidth={30}
          className="my-button bg-black flex-1 h-12 items-center px-4 text-white uppercase translate-x-[-3px] translate-y-[-3px] "
        />
        <Button
          sideIcon={FavIcon}
          className="px-[14px] h-12 justify-center items-center"
        />
      </div>
    </div>
  );
};

export default MobileView;
