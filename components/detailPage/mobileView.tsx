import React, { useEffect, useState } from "react";
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
import { updateState } from "@/utilities/helper";
import DescriptionDropdown from "./descriptionDropdown";
import DetailDropdown from "./detailDropdown";

interface MobileViewProps {
  images: Array<Record<string, any>>;
  totalSizes: string[];
  shoeDetails: Record<string, any>;
}

const MobileView = ({ images, totalSizes, shoeDetails }: MobileViewProps) => {
  const [showReview, setShowReview] = useState<number>(2);
  const [colorSizesAvailable, setColorSizesAvailable] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    size: "",
    color: JSON.stringify(images[1].color),
  });

  useEffect(() => {
    let temp = [];
    images[1].sizes.forEach((size: Record<string, any>) => {
      temp.push(size.size);
      setColorSizesAvailable(temp);
    });
  }, []);

  useEffect(() => {
    if (!colorSizesAvailable.includes(formData.size)) {
      updateState("size", "", setFormData);
    }
  }, [formData.color]);

  const handleColorClick = (colorDetail: Record<string, any>) => {
    updateState("color", JSON.stringify(colorDetail.color), setFormData);
    let temp = [];
    colorDetail.sizes.forEach((size: Record<string, any>) => {
      temp.push(size.size);
      setColorSizesAvailable(temp);
    });
  };
  console.log("formData", formData);
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
          {shoeDetails?.title}
        </div>
        <div className="mt-3 font-bold">${shoeDetails?.price}</div>
      </div>
      <MobileSlider
        images={images}
        handleColorClick={handleColorClick}
        formData={formData}
      />
      <div className="mt-10 px-5">
        <div className="font-bold">Sizes</div>
        <div className="mt-3 grid  grid-cols-[repeat(auto-fill,_minmax(69px,_1fr))] gap-[5px] tracking-[-0.2px]">
          {totalSizes.map((items: string, index) => {
            return (
              <button
                className=" text-sm h-10 bg-[#eceff1] flex justify-center items-center relative disabled:cursor-not-allowed"
                disabled={!colorSizesAvailable.includes(items)}
                key={`${items}_${index}`}
                onClick={() => updateState("size", items, setFormData)}
                style={{
                  backgroundColor: formData.size === items ? "black" : "white",
                  color: formData.size === items ? "white" : "black",
                  fontWeight: formData.size === items ? "bold" : "normal",
                  transition: "all 0.4s ease",
                }}
              >
                {items}
                {!colorSizesAvailable.includes(items) && (
                  <div className="absolute w-11/12 border-b-4 border-black/50  flex -rotate-[30deg]"></div>
                )}
              </button>
            );
          })}
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
        <div className="first:border-t-2 border-b-2">
          <ReviewDropdownMB />
        </div>
        <div className="border-b-2">
            <DescriptionDropdown data={shoeDetails?.description} />
          </div>
          <div className="border-b-2">
            <DetailDropdown data={shoeDetails?.details} />
          </div>
      </div>
    </div>
  );
};

export default MobileView;
