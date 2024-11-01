import { Button } from "@/subcomponents/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import RightArrowIcon from "../../public/icon/right-arrow-white.svg";
import FavIcon from "../../public/icon/favorite.svg";
import Dropdown from "../dropdown";

const DesktopView = ({ images }: any) => {
  const [sidebarMargin, setSidebarMargin] = useState(0);
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
        <div className="border flex">
          <span className="relative w-full aspect-square">
            <Image src={"/images/5.avif"} fill alt="image" />
          </span>
        </div>
        <div>
          <Dropdown title="Review" />
        </div>
      </div>
      <div
        className={`relative border w-80 py-8 media-960:px-5 xl:px-8 xl:w-[430px] media-1440:px-10 media-1440:w-[450px] 2xl:px-14 2xl:w-[490px] min-h-screen`}
        style={{
          marginTop: `${sidebarMargin}px`,
          transition: "transform 0.6s ease",
        }}
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
            Ultraboost 5X Shoes
          </div>
          <div className="mt-2.5 font-bold">$180</div>
        </div>
        <div className="mt-10">
          <div>
            <span className="font-bold ">Colors available in size</span>{" "}
            <span>5.5</span>
          </div>
          <div className="mt-2.5 grid grid-cols-5 gap-[5px]">
            {images.slice(1, images.length - 1).map((img: any) => {
              return (
                <div className="col-span-1">
                  <span className="">
                    <Image
                      src={img.image}
                      width={300}
                      height={300}
                      alt="image"
                    />
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-10">
          <div className="font-bold">Sizes</div>
          <div className="mt-3 grid  grid-cols-[repeat(auto-fill,_minmax(69px,_1fr))] gap-[5px] tracking-[-0.2px]">
            <div className=" text-sm h-10 bg-[#eceff1] flex justify-center items-center">
              5
            </div>
            <div className=" text-sm h-10 bg-[#eceff1] flex justify-center items-center">
              5.5
            </div>
            <div className=" text-sm h-10 bg-[#eceff1] flex justify-center items-center">
              6
            </div>
            <div className=" text-sm h-10 bg-[#eceff1] flex justify-center items-center">
              6.5
            </div>
            <div className=" text-sm h-10 bg-[#eceff1] flex justify-center items-center">
              7
            </div>
            <div className=" text-sm h-10 bg-[#eceff1] flex justify-center items-center">
              7.5
            </div>
            <div className=" text-sm h-10 bg-[#eceff1] flex justify-center items-center">
              8
            </div>
            <div className=" text-sm h-10 bg-[#eceff1] flex justify-center items-center">
              8.5
            </div>
          </div>
        </div>
        <div className="mt-10 flex gap-3 flex-row">
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
    </div>
  );
};

export default DesktopView;
