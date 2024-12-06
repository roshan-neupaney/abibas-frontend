import Image from "next/image";
import React from "react";
import FilterBox from "../../../components/shoeList/filterBox";

interface params {
  slug: string;
}

interface ShoePageProps {
  params: params;
  searchParams: Record<string, string>;
}

const ShoePage = ({ params, searchParams }: ShoePageProps) => {
  console.log("params", params, "searchParams", searchParams);
  const {slug} = params;
  return (
    <div className="p-4">
      {/* title header */}
      <div className="flex justify-between mb-4 mt-1">
        <span className="font-bold uppercase text-2xl tracking-[2px]" style={{ fontFamily: "var(--font-adineue)"}}>
        {slug} Shoes
        </span>
        <FilterBox />
      </div>
    </div>
  );
};

export default ShoePage;
