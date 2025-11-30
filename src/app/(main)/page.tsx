import React from "react";
import Image from "next/image";
import { Button } from "@/subcomponents/button";
import NextIconBlack from "../../../public/icon/right-arrow-black.svg";
import ProductCard from "../../components/productCard";
import ProductSlider from "../../components/productSlider";
import VideoImageCard from "../../components/videoImageCard";
import { cookies } from "next/headers";
import { ServerSideGet, ServerSideGetWithParams } from "@/utilities/apiCalls";
import { COLLABORATIVE_RECOMMENDATION, CRUD_SHOE } from "../../../config/endpoints";
import Link from "next/link";
import { authorization } from "../../../hoc/auth";
import BestSeller from "../../components/homepage/bestSeller";

async function getData(token: string | undefined) {
  // authorization(token);
  try {
    const response = [
      await ServerSideGet(undefined, CRUD_SHOE),
      await ServerSideGetWithParams(
        undefined,
        CRUD_SHOE,
        `sortBy=newest&pageSize=15`
      ),
      await ServerSideGetWithParams(
        undefined,
        CRUD_SHOE,
        `sortBy=top_sellers&pageSize=15`
      ),
      // await ServerSideGet(
      //   token,
      //   COLLABORATIVE_RECOMMENDATION,
      // ),
    ];
    const [shoes, shoe_latest, shoe_top_sellers, collab_recommends] = response;
    return { shoes, shoe_latest, shoe_top_sellers, collab_recommends };
  } catch (e) {
    console.error(e);
    return {
      shoes: { data: [] },
      shoe_latest: { data: [] },
      shoe_top_sellers: { data: [] },
      collab_recommends: { data: [] },
    };
  }
}

const MainPage = async () => {
  const token = cookies().get("access_token")?.value;
  const { shoe_latest, shoe_top_sellers, collab_recommends }: any = await getData(token);
  const featuredData = [
    {
      title: "HOLIDAY '24",
      image: "/images/10.avif",
      description: "Classic gifts rooted in sport with style to last.",
    },
    {
      title: "NEW COLORS, NEW ENERGY",
      image: "/images/1.gif",
      description: "Lighter, faster, better. Ultraboost 5X: now in new colors.",
    },
    {
      title: "BASKETBALL CLASSICS",
      image: "/images/1.mp4",
      description:
        "From the hardwood to the city streets, Rivalry and Forum bring the rich history of sport to modern-day culture.",
    },
    {
      title: "COZY FLEECE",
      image: "/images/11.avif",
      description: "Gift all the feels this season with soft and cozy fleece.",
    },
  ];
  const recommendation = collab_recommends?.data?.length > 0 ? collab_recommends?.data : [];
  return (
    <div>
      <div className="flex relative">
        <div className="w-full relative aspect-[375/482] md:aspect-square lg:aspect-[1920/853]">
          <picture>
            <source
              srcSet="/images/banner-min-1024.avif"
              media="(min-width:1024px)"
            />
            <source
              srcSet="/images/banner-min-768.avif"
              media="(min-width:768px)"
            />
            <source
              srcSet="images/banner-max-767.avif"
              media="(max-width:767px)"
            />
            <Image
              src="/images/banner-min-1024.avif"
              className="object-contain"
              alt=""
              fill
              priority
            />
          </picture>
        </div>
        <div className="flex flex-col absolute bottom-4 md:bottom-16 w-full text-primary font-adihaus max-w-[550px] lg:max-w-[750px] gap-4 media-390:px-8 px-4 md:px-16 lg:px-28 ">
          <div className="flex-col flex gap-1">
            <span className="bg-white text-xl uppercase font-bold p-1 w-fit">
              up to 50% off
            </span>
            <p>
              <span className="bg-white font-normal text-sm p-1 leading-5">
                Score special discounts on premium styles through 10/2. Only for
                adiClub members.
              </span>
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href={"/Men's"} aria-label="link to shoe listing page of men's category">
              <Button
                title="Shop men"
                className="px-3 bg-white uppercase"
                style={{ backgroundColor: "#ffffff" }}
                sideIcon={NextIconBlack}
              />
            </Link>
            <Link href={"/Women's"} aria-label="link to shoe listing page of women's category">
              <Button
                title="shop women"
                className="px-3 bg-white uppercase"
                style={{ backgroundColor: "#ffffff" }}
                sideIcon={NextIconBlack}
              />
            </Link>
            <Link href={"/Kid's"} aria-label="link to shoe listing page of kid's category">
              <Button
                title="shop kids"
                className="px-3 bg-white uppercase"
                style={{ backgroundColor: "#ffffff" }}
                sideIcon={NextIconBlack}
              />
            </Link>
          </div>
        </div>
      </div>
      {recommendation?.length > 0 && (
        <div className="flex flex-col mt-10 mx-1 gap-2">
          <span
            className="font-bold text-3xl ml-2"
            style={{ fontFamily: "var(--font-adineue)" }}
          >
            Still Interested?
          </span>
          <ProductSlider className="gap-4">
            {recommendation?.map((items: Record<string, any>, index: number) => {
              return (
                <div key={index}>
                  <ProductCard
                    title={items?.title}
                    price={items.price}
                    showFav={false}
                    category={items?.category.title}
                    image={items?.colorVariation[0].image_url}
                    className="md:w-[316px] xl:w-[380px]"
                    id={items?.id}
                    slug_url={items.slug_url}
                    routing_url={"/shoes/detail/"}
                    token={token}
                  />
                </div>
              );
            }) || []}
          </ProductSlider>
        </div>
      )}
      <BestSeller
        token={token}
        shoeLatest={shoe_latest}
        shoeTopSellers={shoe_top_sellers}
      />
      <div className="flex mt-20 pl-4 media-390:pl-8 md:pl-16 media-960:px-16 media-1440:px-28">
        <ProductSlider className="gap-[10px]">
          {featuredData?.map((items, index) => {
            return (
              <React.Fragment key={index}>
                <VideoImageCard
                  title={items.title}
                  image={items.image}
                  description={items.description}
                  className="min-w-[calc((100%-10px)/1.187)] md:min-w-[calc((100%-20px)/2.43)] media-960:min-w-[calc((100%-40px)/4)]"
                />
              </React.Fragment>
            );
          })}
        </ProductSlider>
      </div>
      <div>
        <section className="px-4 mt-10 media-390:px-8 md:px-16 media-1440:px-28 ">
          <div>
            <span className="flex font-bold leading-9 text-2xl ">
              Popular right now
            </span>
          </div>
          <div
            className="grid grid-cols-1 media-960:grid-cols-3 mt-2 mb-5 media-960:gap-12"
            style={{ fontFamily: "var(--font-adineue)" }}
          >
            <div className="pt-6 pb-1 col-span-1 border-b border-black">
              <span className="text-4xl lowercase tracking-[2px] font-bold">
                ultraboost
              </span>
            </div>
            <div className="pt-6 pb-1 col-span-1 border-b border-black">
              <span className="text-4xl lowercase tracking-[2px] font-bold">
                samba
              </span>
            </div>
            <div className="pt-6 pb-1 col-span-1 border-b border-black">
              <span className="text-4xl lowercase tracking-[2px] font-bold">
                gazelle
              </span>
            </div>
            <div className="pt-6 pb-1 col-span-1 border-b border-black">
              <span className="text-4xl lowercase tracking-[2px] font-bold">
                campus
              </span>
            </div>
            <div className="pt-6 pb-1 col-span-1 border-b border-black">
              <span className="text-4xl lowercase tracking-[2px] font-bold">
                spezial
              </span>
            </div>
            <div className="pt-6 pb-1 col-span-1 border-b border-black">
              <span className="text-4xl lowercase tracking-[2px] font-bold">
                hello kitty
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MainPage;
