"use client";
import Image from "next/image";
import React, { useState } from "react";
import FilterIcon from "../../public/icon/filter-icon.svg";
import CrossIcon from "../../public/icon/cross.svg";
import Arrow from "../../public/icon/arrow-down.svg";
import { updateState } from "@/utilities/helper";
import { CustomToggleSwitch } from "@/subcomponents/checkbox";
import { useRouter } from "next/navigation";

const FilterBox = () => {
  const [openBox, toggleBox] = useState({
    mainContainer: true,
    sortBy: true,
    category: false,
  });

  const router = useRouter()
  return (
    <div className="">
      <span
        onClick={() =>
          updateState("mainContainer", !openBox.mainContainer, toggleBox)
        }
      >
        <Image src={FilterIcon} width={25} height={25} alt="filter" />
      </span>
      {openBox.mainContainer && (
        <div className="fixed top-0 left-0 bg-white w-screen h-full overflow-auto">
          {/* firstbox */}
          <div className="p-5 border-b flex justify-between items-center">
            <div className="text-lg font-bold ">Filter & Sort</div>
            <div className="flex items-center gap-2">
              <span className="underline" style={{ color: "#767677" }}>
                Clear All
              </span>
              <span
                onClick={() =>
                  updateState(
                    "mainContainer",
                    !openBox.mainContainer,
                    toggleBox
                  )
                }
              >
                <Image src={CrossIcon} width={35} height={35} alt="" />
              </span>
            </div>
          </div>
          {/* secondbox */}
          <div className="p-5 border-b">
            <div className="text-sm font-bold uppercase mb-5">
              Applied Filters
            </div>
            <div>
              <div className="flex m-1.5 px-2.5 gap-1.5 bg-[#ECEFF1] w-fit h-9 items-center">
                <span>
                  <Image src={CrossIcon} width={20} height={20} alt="" />
                </span>
                <span>Men</span>
              </div>
            </div>
          </div>
          {/* secondbox */}
          <div
            className="font-bold text-sm uppercase p-4 flex justify-between items-center"
            onClick={() => updateState("sortBy", !openBox.sortBy, toggleBox)}
          >
            <span>Sort by</span>
            <span className={`${openBox.sortBy ? "rotate-180" : "rotate-0"}`}>
              <Image src={Arrow} width={25} height={25} alt="" />
            </span>
          </div>
          {openBox.sortBy && (
            <>
              <div className="uppercase max-h-[70px] min-h-[50px] content-center border-b p-4">
                price (Low - High)
              </div>
              <div className="uppercase max-h-[70px] min-h-[50px] content-center border-b p-4">
                Newest
              </div>
              <div className="uppercase max-h-[70px] min-h-[50px] content-center border-b p-4">
                top sellers
              </div>
              <div className="uppercase max-h-[70px] min-h-[50px] content-center p-4">
                price (high - low)
              </div>
            </>
          )}
          {/* thirdbox */}
          <div
            className="font-bold text-sm uppercase p-4 flex justify-between items-center border-y"
            onClick={() =>
              updateState("category", !openBox.category, toggleBox)
            }
          >
            <span>Category</span>
            <span className={`${openBox.category ? "rotate-180" : "rotate-0"}`}>
              <Image src={Arrow} width={25} height={25} alt="" />
            </span>
          </div>
          {openBox.category && (
            <div>
              <div className="uppercase max-h-[70px] min-h-[50px] content-center border-b p-4 flex gap-2">
                <CustomToggleSwitch value={false} onChange={() => router.replace('?')} />
                <span>Men&apos;s</span>
              </div>
              <div className="uppercase max-h-[70px] min-h-[50px] content-center border-b p-4 flex gap-2">
                <CustomToggleSwitch value={false} onChange={() => {}} />
                <span>Women&apos;s</span>
              </div>
              <div className="uppercase max-h-[70px] min-h-[50px] content-center border-b p-4 flex gap-2">
                <CustomToggleSwitch value={false} onChange={() => {}} />
                <span>Kid&apos;s</span>
              </div>
              <div className="uppercase max-h-[70px] min-h-[50px] content-center border-b p-4 flex gap-2">
                <CustomToggleSwitch value={false} onChange={() => {}} />
                <span>Unisex</span>
              </div>
            </div>
          )}
          
        </div>
      )}
    </div>
  );
};

export default FilterBox;
