import { Button } from "@/subcomponents/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import RightArrowIcon from "../../public/icon/right-arrow-white.svg";

import FavIcon from "../../public/icon/favorite.svg";
import Dropdown from "../dropdown";
import StarReview from "../starReview";
import ReviewDropdownDesktop from "./reviewDropdownDP";
import Link from "next/link";
import { IMAGE_URL } from "../../config/constants";
import DescriptionDropdown from "./descriptionDropdown";
import DetailDropdown from "./detailDropdown";
import { updateState } from "@/utilities/helper";

interface DesktopViewProps {
  images: Array<Record<string, any>>;
  totalSizes: string[];
  shoeDetails: Record<string, any>;
}

const DesktopView = ({ images, totalSizes, shoeDetails }: DesktopViewProps) => {
  const [imageUrl, setImageUrl] = useState(images[1].image_url);
  const [colorSizesAvailable, setColorSizesAvailable] = useState<string[]>([]);
  const [formData, setFormData] = useState({ size: "", color: JSON.stringify(images[1].color) });

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
    setImageUrl(colorDetail?.image_url);
    updateState("color", JSON.stringify(colorDetail.color), setFormData);
    let temp = [];
    colorDetail.sizes.forEach((size: Record<string, any>) => {
      temp.push(size.size);
      setColorSizesAvailable(temp);
    });
  };

 

  // useEffect(() => {
  //   const handleScroll = (event: any) => {
  //     console.log(sidebarMargin, "first", window.scrollY);
  //     if (window.scrollY < 125) {
  //       setSidebarMargin(window.scrollY);
  //     } else {
  //       setSidebarMargin(window.scrollY - 125);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);
  // console.log(sidebarMargin);
  return (
    <div className="media-960:flex hidden">
      <div className="flex flex-1 flex-col">
        <div className="flex justify-center">
          <span className="relative w-3/4 aspect-square">
            <Image src={IMAGE_URL + imageUrl} fill alt="image" />
          </span>
        </div>
        <div className="media-960:px-5 xl:px-8 media-1440:px-10 2xl:px-16 max-w-[970px] w-full m-auto mt-20">
          <div className="first:border-t-2 border-b-2">
            <ReviewDropdownDesktop />
          </div>
          <div className="border-b-2">
            <DescriptionDropdown data={shoeDetails?.description} />
          </div>
          <div className="border-b-2">
            <DetailDropdown data={shoeDetails?.details} />
          </div>
        </div>
      </div>
      <div
        className={`w-80 py-8 media-960:px-5 xl:px-8 xl:w-[430px] media-1440:px-10 media-1440:w-[450px] 2xl:px-14 2xl:w-[490px] min-h-screen`}
      >
        <div className="">
          <div className="flex flex-wrap justify-between">
            <div className="flex gap-0.5">Women's</div>
            <div className="review-bar"></div>
          </div>
          <div
            className="mt-2.5 text-3xl font-bold leading-8 tracking-[1.5px] uppercase"
            style={{ fontFamily: "var(--font-adineue" }}
          >
           {shoeDetails?.title}
          </div>
          <div className="mt-2.5 font-bold">${shoeDetails?.price}</div>
        </div>
        <div className="mt-10">
          <div>
            <span className="font-bold ">Colors</span> <span></span>
          </div>
          <div className="mt-2.5 grid grid-cols-5 gap-[5px]">
            {images
              .slice(1, images.length - 1)
              .map((img: any, index: number) => {
                return (
                  <div className="col-span-1 relative" key={index}>
                    <span className="" onClick={() => handleColorClick(img)}>
                      <Image
                        src={IMAGE_URL + img?.image_url}
                        width={300}
                        height={300}
                        alt="image"
                        className="shoe-image-list cursor-pointer"
                        style={{
                          borderBottom:
                            img?.image_url === imageUrl
                              ? "3px solid black"
                              : "3px solid transparent",
                          transition: "all 0.4s ease",
                        }}
                      />
                    </span>
                  </div>
                );
              })}
          </div>
              <div className="mt-2.5">{JSON.parse(formData.color).join(' / ')}</div>
        </div>
        <div className="mt-10">
          <span className="font-bold">Sizes</span>
          <div className="mt-3 grid  grid-cols-[repeat(auto-fill,_minmax(69px,_1fr))] gap-[5px] tracking-[-0.2px]">
            {totalSizes.map((items: string, index) => {
              return (
                <button
                  className=" text-sm h-10 bg-[#eceff1] flex justify-center items-center relative disabled:cursor-not-allowed"
                  disabled={!colorSizesAvailable.includes(items)}
                  key={`${items}_${index}`}
                  onClick={() => updateState("size", items, setFormData)}
                  style={{
                    backgroundColor:
                      formData.size === items ? "black" : "white",
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
        <div className="mt-10 flex gap-3 flex-row">
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
      </div>
    </div>
  );
};

export default DesktopView;
