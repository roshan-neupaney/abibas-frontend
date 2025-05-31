"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import FilterIcon from "../../public/icon/filter-icon.svg";
import CrossIcon from "../../public/icon/cross.svg";
import Arrow from "../../public/icon/arrow-down.svg";
import { updateState } from "@/utilities/helper";
import { CustomToggleSwitch } from "@/subcomponents/checkbox";
import { useRouter } from "next/navigation";
import { searchParamsProps } from "@/app/[slug]/page";
import checkIcon from "../../public/icon/check.svg";

interface FilterBoxProps {
  color: Array<Record<string, any>>;
  category: Array<Record<string, any>>;
  brand: Array<Record<string, any>>;
  slug: string;
  searchParams: searchParamsProps;
}

const FilterBox = ({
  color,
  category,
  brand,
  slug,
  searchParams,
}: FilterBoxProps) => {
  const router = useRouter();

  const [openBox, toggleBox] = useState({
    mainContainer: false,
    sortBy: true,
    category: false,
    color: false,
    brand: false,
  });
  const [filters, setFilters] = useState<Record<string, string[]>>({
    categories: slug === "search" ? [] : slug.split("%7C"),
    colors: searchParams["colors"]?.split(",") || [],
    brands: searchParams["brands"]?.split(",") || [],
    sortBy: searchParams["sortBy"]?.split(",") || [],
  });

  useEffect(() => {
    router.push(
      `${
        filters["categories"].length > 0
          ? filters["categories"].join("|")
          : "search"
      }?${
        filters["colors"].length > 0
          ? "colors=" + filters["colors"].join(",")
          : ""
      }${
        filters["brands"].length > 0
          ? "&brands=" + filters["brands"].join(",")
          : ""
      }${
        filters["sortBy"].length > 0
          ? "&sortBy=" + filters["sortBy"].join(",")
          : ""
      }
      `
    );
  }, [filters]);

  const updateData = (field: string, item: string, val: boolean) => {
    if (!val) {
      const filteredCategory = filters[field].filter((e) => e !== item);
      setFilters((prev) => {
        return { ...prev, [field]: filteredCategory };
      });
    } else {
      const newCategory = [...filters[field], item];
      setFilters((prev) => {
        return { ...prev, [field]: newCategory };
      });
      filters[field]?.push(item);
    }
  };

  const updateSortBy = (field: string, item: string) => {
    setFilters((prev) => {
      return { ...prev, [field]: [item] };
    });
  };

  const allFilters = [
    ...filters["categories"],
    ...filters["colors"],
    ...filters["brands"],
  ];

  const removeFilters = (item: string) => {
    const keys = Object.keys(filters);
    if (item === "all") {
      setFilters((prev) => {
        return { ...prev, ["categories"]: [], ["colors"]: [], ["brands"]: [] };
      });
    } else {
      keys.forEach((key) => {
        if (filters[key].includes(item)) {
          const remainingFilters = filters[key].filter((e) => e !== item);
          setFilters((prev) => {
            return { ...prev, [key]: remainingFilters };
          });
        }
      });
    }
  };

  return (
    <div className="">
      <span
        onClick={() =>
          updateState("mainContainer", !openBox.mainContainer, toggleBox)
        }
        className="flex items-center gap-4 media-960:border border-black min-h-10 px-4 w-fit cursor-pointer"
      >
        <span className="hidden media-960:flex uppercase text-sm font-bold tracking-[2px]">
          Filter & Sort
        </span>
        <Image src={FilterIcon} width={25} height={25} alt="filter" />
      </span>
      {openBox.mainContainer && (
        <div className="bg-black/15 w-screen fixed left-0 top-0 h-full z-10 filterBox">
          <div className="fixed top-0 right-0 bg-white w-screen h-full overflow-auto media-960:w-[30%]">
            {/* firstbox */}
            <div className="p-5 border-b flex justify-between items-center">
              <div className="text-lg font-bold ">Filter & Sort</div>
              <div className="flex items-center gap-2">
                <span
                  className="underline cursor-pointer"
                  style={{ color: "#767677" }}
                  onClick={() => removeFilters("all")}
                >
                  Clear All
                </span>
                <span
                className="cursor-pointer"
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
              <div className="flex flex-wrap">
                {allFilters.map((items, index) => {
                  return (
                    <div
                      key={index}
                      className="flex m-1.5 px-2.5 gap-1.5 bg-[#ECEFF1] w-fit h-9 items-center"
                      onClick={() => removeFilters(items)}
                    >
                      <span className="cursor-pointer">
                        <Image src={CrossIcon} width={20} height={20} alt="" />
                      </span>
                      <span>{items}</span>
                    </div>
                  );
                })}
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
                <div
                  className="uppercase max-h-[70px] min-h-[50px] content-center border-b p-4 cursor-pointer"
                  style={{
                    borderLeft: filters["sortBy"].includes("price_low_to_high")
                      ? "4px solid black"
                      : "4px solid transparent",
                  }}
                  onClick={() => updateSortBy("sortBy", "price_low_to_high")}
                >
                  price (Low - High)
                </div>
                <div
                  className="uppercase max-h-[70px] min-h-[50px] content-center border-b p-4 cursor-pointer"
                  style={{
                    borderLeft: filters["sortBy"].includes("newest")
                      ? "4px solid black"
                      : "4px solid transparent",
                  }}
                  onClick={() => updateSortBy("sortBy", "newest")}
                >
                  Newest
                </div>
                <div
                  className="uppercase max-h-[70px] min-h-[50px] content-center border-b p-4 cursor-pointer"
                  style={{
                    borderLeft: filters["sortBy"].includes("top_sellers")
                      ? "4px solid black"
                      : "4px solid transparent",
                  }}
                  onClick={() => updateSortBy("sortBy", "top_sellers")}
                >
                  top sellers
                </div>
                <div
                  className="uppercase max-h-[70px] min-h-[50px] content-center p-4 cursor-pointer"
                  style={{
                    borderLeft: filters["sortBy"].includes("price_high_to_low")
                      ? "4px solid black"
                      : "4px solid transparent",
                  }}
                  onClick={() => updateSortBy("sortBy", "price_high_to_low")}
                >
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
              <span
                className={`${openBox.category ? "rotate-180" : "rotate-0"}`}
              >
                <Image src={Arrow} width={25} height={25} alt="" />
              </span>
            </div>
            {openBox.category && (
              <div>
                {category?.map((items: Record<string, any>, index) => {
                  return (
                    <div key={index}>
                      <div className="uppercase max-h-[70px] min-h-[50px] content-center border-b p-4 flex gap-2 cursor-pointer">
                        <CustomToggleSwitch
                          value={filters["categories"].includes(items?.title)}
                          onChange={(val: boolean) =>
                            updateData("categories", items?.title, val)
                          }
                        />
                        <span>{items?.title}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            {/* fourthBox */}
            <div
              className="font-bold text-sm uppercase p-4 flex justify-between items-center border-b"
              onClick={() => updateState("color", !openBox.color, toggleBox)}
            >
              <span>Color</span>
              <span className={`${openBox.color ? "rotate-180" : "rotate-0"}`}>
                <Image src={Arrow} width={25} height={25} alt="" />
              </span>
            </div>
            {openBox.color && (
              <div className="grid grid-cols-[repeat(auto-fill,_minmax(32px,_1fr))] gap-8 p-3">
                {color?.map((items: any, index: number) => {
                  return (
                    <div
                      key={index}
                      style={{ backgroundColor: `${items.color_code}` }}
                      className="h-8 border flex justify-center items-center cursor-pointer"
                      onClick={() =>
                        updateData(
                          "colors",
                          items.title,
                          !filters["colors"].includes(items.title)
                        )
                      }
                    >
                      {filters["colors"].includes(items.title) && (
                        <span className="flex justify-center items-center">
                          <Image
                            src={checkIcon}
                            width={20}
                            height={20}
                            alt=""
                          />
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
            {/* fifthBox */}
            <div
              className="font-bold text-sm uppercase p-4 flex justify-between items-center border-b"
              onClick={() => updateState("brand", !openBox.brand, toggleBox)}
            >
              <span>Brand</span>
              <span className={`${openBox.brand ? "rotate-180" : "rotate-0"}`}>
                <Image src={Arrow} width={25} height={25} alt="" />
              </span>
            </div>
            {openBox.brand && (
              <div className="p-4 flex flex-col gap-4">
                {brand?.map((items: any, index: number) => {
                  return (
                    <div key={index} className="">
                      <CustomToggleSwitch
                        title={items.title}
                        value={filters["brands"].includes(items?.title)}
                        onChange={(val: boolean) =>
                          updateData("brands", items.title, val)
                        }
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBox;
