"use client";
import { Button } from "@/subcomponents/button";
import React from "react";
import RightIcon from "../../public/icon/right-arrow-black.svg";
import { searchParamsProps } from "@/app/[slug]/page";
import { useRouter } from "next/navigation";

interface PaginationProps {
  totalData: number;
  searchParams: searchParamsProps;
  slug: string;
  pageSize: number;
}


const Pagination = ({ searchParams, slug, totalData, pageSize }: PaginationProps) => {
  const router = useRouter();
  const { page = 1, ...rest } = searchParams;
  const queryParams = new URLSearchParams(rest).toString();
  const pageCount = Math.ceil(totalData / pageSize);

  const handlePagination = (nextPage: string) => {
    router.push(`${slug}?page=${nextPage}&${queryParams}`);
  };
  return (
    <div className="flex flex-1 mt-10">
      <div className="rotate-180">
        <Button
          sideIcon={RightIcon}
          iconHeight={30}
          iconWidth={30}
          className="p-2"
          disabledButton={Number(page) <= 1}
          onClick={() => handlePagination((Number(page) - 1).toString())}
        />
      </div>
      <Button title={page.toString()} className="py-2 px-5" />
      <div className="">
        <Button
          sideIcon={RightIcon}
          iconHeight={30}
          iconWidth={30}
          className="p-2"
          disabledButton={Number(page) >= pageCount}
          onClick={() => handlePagination((Number(page) + 1).toString())}
        />
      </div>
    </div>
  );
};

export default Pagination;
