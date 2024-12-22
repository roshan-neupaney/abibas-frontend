import React from "react";
import FilterBox from "../../../components/shoeList/filterBox";
import { ServerSideGet, ServerSideGetWithParams } from "@/utilities/apiCalls";
import { cookies } from "next/headers";
import {
  CRUD_BRAND,
  CRUD_CATEGORY,
  CRUD_COLOR,
  CRUD_SHOE,
} from "../../../config/endpoints";
import ProductCard from "../../../components/productCard";
import { FormatDate } from "@/utilities/helper";

async function getData(
  token: string | undefined,
  slug: string,
  searchParams: searchParamsProps
) {
  const { colors, brands, sortBy } = searchParams;
  const categories = slug === "search" ? "" : slug;
  console.log(categories);
  try {
    const res = [
      await ServerSideGet(token, CRUD_CATEGORY),
      await ServerSideGet(token, CRUD_COLOR),
      await ServerSideGet(token, CRUD_BRAND),
      await ServerSideGetWithParams(
        token,
        CRUD_SHOE,
        `categories=${categories}&colors=${colors ?? ""}&brands=${brands ?? ""}&sortBy=${sortBy ?? ""}`
      ),
    ];
    const [category, color, brand, shoe_list] = res;
    return { category, color, brand, shoe_list };
  } catch (e) {
    console.error(e);
  }
}

interface paramsProps {
  slug: string;
}

export interface searchParamsProps {
  colors?: string;
  brands?: string;
  sortBy?: string;
}

interface ShoePageProps {
  params: paramsProps;
  searchParams: searchParamsProps;
}

const ShoePage = async ({ params, searchParams }: ShoePageProps) => {
  const token = cookies().get("access_token")?.value;
  const { slug } = params;
  const { category, color, brand, shoe_list }: any = await getData(
    token,
    slug,
    searchParams
  );
  console.log(shoe_list);
  return (
    <div className="p-4 m-auto media-960:max-w-[1280px]">
      {/* title header */}
      <div className="flex justify-between mb-4 media-600:mb-5 media-960:mb-8 mt-1">
        <div>
          <span
            className="font-bold uppercase text-2xl media-600:text-3xl xl:text-[40px] tracking-[2px]"
            style={{ fontFamily: "var(--font-adineue)" }}
          >
            {slug === "search" ? "All" : slug} Shoes
          </span>{" "}
          <span className="text-xs text-[#767677]">(asdf)</span>
        </div>
        <FilterBox
          color={color?.data}
          category={category.data}
          brand={brand?.data}
          slug={slug}
          searchParams={searchParams}
        />
      </div>
      {/* shoeList */}
      <div className="grid grid-cols-2 media-600:grid-cols-3 media-960:grid-cols-4 gap-1 media-600:gap-2">
        {shoe_list?.data?.map((items: Record<string, any>, index: number) => {
          return (
            <React.Fragment key={index}>
              <ProductCard
                title={items.title}
                image={items?.colorVariation[0]?.image_url}
                category={items?.category?.title}
                price={items?.price}
                slug_url={items?.slug_url}
                id={items.id}
                routing_url="/shoes/detail/"
                token={token}
              />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default ShoePage;
