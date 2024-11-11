import React from "react";
import Image from "next/image";
import { Button } from "@/subcomponents/button";
import NextIconBlack from "../../public/icon/right-arrow-black.svg";
import NextIconWhite from "../../public/icon/right-arrow-white.svg";
import ProductCard from "../../components/productCard";
import ProductSlider from "../../components/productSlider";
import VideoImageCard from "../../components/videoImageCard";
import { cookies } from "next/headers";
import { ServerSideGet } from "@/utilities/apiCalls";
import { CRUD_SHOE } from "../../config/endpoints";

interface shoeTypes {
  status: boolean;
  data: Array<Record<string, any>>;
}

async function getData(token: string) {
  const response = [await ServerSideGet(token, CRUD_SHOE)];
  const [shoes] = response;
  return { shoes };
}

const MainPage = async () => {
  const token = cookies().get("access_token")?.value || "";
  const { shoes }: any = await getData(token);
  console.log("shoes", shoes);
  const data = [
    { title: "Gazelle Bold Shoes", image: "/images/1.avif", category: "Men's" },
    { title: "Gazelle Bold Shoes", image: "/images/2.avif", category: "Men's" },
    { title: "Japan Shoes", image: "/images/3.avif", category: "Men's" },
    {
      title: "Gazelle Indoor Shoes",
      image: "/images/4.avif",
      category: "Men's",
    },
    { title: "Gazelle Bold Shoes", image: "/images/5.avif", category: "Men's" },
    {
      title: "Gazelle Indoor Shoes",
      image: "/images/6.avif",
      category: "Men's",
    },
    { title: "Gazelle Bold Shoes", image: "/images/7.avif", category: "Men's" },
    { title: "Japan Shoes", image: "/images/8.avif", category: "Men's" },
    {
      title: "Anthony Edwards 1 Mid Basketball Shoes",
      image: "/images/9.avif",
      category: "Men's",
    },
    {
      title: "Anthony Edwards 1 Mid Basketball Shoes",
      image: "/images/1.avif",
      category: "Men's",
    },
    {
      title: "Anthony Edwards 1 Mid Basketball Shoes",
      image: "/images/3.avif",
      category: "Men's",
    },
    {
      title: "Anthony Edwards 1 Mid Basketball Shoes",
      image: "/images/6.avif",
      category: "Men's",
    },
    {
      title: "Anthony Edwards 1 Mid Basketball Shoes",
      image: "/images/1.avif",
      category: "Men's",
    },
    {
      title: "Anthony Edwards 1 Mid Basketball Shoes",
      image: "/images/3.avif",
      category: "Men's",
    },
    {
      title: "Anthony Edwards 1 Mid Basketball Shoes",
      image: "/images/6.avif",
      category: "Men's",
    },
  ];
  const recommendedData = [
    { title: "Gazelle Bold Shoes", image: "/images/1.avif", category: "Men's" },
    { title: "Gazelle Bold Shoes", image: "/images/2.avif", category: "Men's" },
    { title: "Japan Shoes", image: "/images/3.avif", category: "Men's" },
    {
      title: "Gazelle Indoor Shoes",
      image: "/images/4.avif",
      category: "Men's",
    },
    { title: "Gazelle Bold Shoes", image: "/images/5.avif", category: "Men's" },
    {
      title: "Gazelle Indoor Shoes",
      image: "/images/6.avif",
      category: "Men's",
    },
    {
      title: "Anthony Edwards 1 Mid Basketball Shoes",
      image: "/images/3.avif",
      category: "Men's",
    },
    {
      title: "Anthony Edwards 1 Mid Basketball Shoes",
      image: "/images/6.avif",
      category: "Men's",
    },
    {
      title: "Anthony Edwards 1 Mid Basketball Shoes",
      image: "/images/1.avif",
      category: "Men's",
    },
    {
      title: "Anthony Edwards 1 Mid Basketball Shoes",
      image: "/images/3.avif",
      category: "Men's",
    },
    {
      title: "Anthony Edwards 1 Mid Basketball Shoes",
      image: "/images/6.avif",
      category: "Men's",
    },
  ];

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

  // console.log('position', position)
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
            <Button
              title="Shop men"
              className="px-3 bg-white uppercase"
              style={{ backgroundColor: "#ffffff" }}
              sideIcon={NextIconBlack}
            />
            <Button
              title="shop women"
              className="px-3 bg-white uppercase"
              style={{ backgroundColor: "#ffffff" }}
              sideIcon={NextIconBlack}
            />
            <Button
              title="shop kids"
              className="px-3 bg-white uppercase"
              style={{ backgroundColor: "#ffffff" }}
              sideIcon={NextIconBlack}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-10 mx-1 gap-2">
        <span
          className="font-bold text-3xl ml-2"
          style={{ fontFamily: "var(--font-adineue)" }}
        >
          Still Interested?
        </span>
        <ProductSlider className="gap-4">
          {shoes?.data?.map((items: any, index: number) => {
            return (
              <div key={index}>
                <ProductCard
                  title={items?.title}
                  category={items?.category.title}
                  image={items?.colorVariation[0].image_url}
                  className="md:w-[316px] xl:w-[380px]"
                  id={`snap_list_${index}`}
                />
              </div>
            );
          })}
        </ProductSlider>
      </div>
      <div className="flex px-4 media-390:px-8 md:pr-0 md:pl-14 xl:pl-28 xl:pr-0 mt-20 2xl:px-1">
        <section className="flex flex-col gap-5 w-full">
          <div className="flex justify-between">
            <div className="flex gap-2">
              <Button
                title="New Arrivals"
                className="w-fit bg-black text-white flex items-center px-3 h-11"
              />
              <Button
                title="Best Sellers"
                className="w-fit flex items-center px-3 h-11"
              />
            </div>
            <div className="media-600:flex uppercase underline hidden font-bold text-sm tracking-[2px] sm:mt-4 md:mt-0 media-390:mr-8 md:mr-16 2xl:mr-28">
              View All
            </div>
          </div>
          <div className="grid grid-cols-2 gap-[10px] media-600:hidden overflow-x-scroll slider-container">
            {recommendedData.slice(0, 6)?.map((items, index) => {
              return (
                <div className="col-span-1" key={index}>
                  <ProductCard image={items.image} className="w-full" />
                </div>
              );
            })}
            <div className="col-span-2">
              <Button
                title="View All"
                className="px-4 text-white bg-black uppercase w-full h-12 items-center tracking-[2px]"
                sideIcon={NextIconWhite}
                iconWidth={30}
              />
            </div>
          </div>
          <ProductSlider className="hidden media-600:flex gap-[10px] recommendedSlider">
            {recommendedData.map((items, index) => {
              return (
                <div key={index}>
                  <ProductCard
                    title={items.title}
                    category={items.category}
                    image={items.image}
                    className="w-full mb-8 media-600:w-40 md:w-80 lg:w-52 media-1366:w-72"
                    id={`snap_list_${index}`}
                  />
                </div>
              );
            })}
          </ProductSlider>
        </section>
      </div>
      <div className="flex mt-20 pl-4 media-390:pl-8 md:pl-16 media-960:px-16 media-1440:px-28">
        <ProductSlider className="gap-[10px]">
          {featuredData.map((items, index) => {
            return (
              <VideoImageCard
                title={items.title}
                image={items.image}
                description={items.description}
                className="min-w-[calc((100%-10px)/1.187)] md:min-w-[calc((100%-20px)/2.43)] media-960:min-w-[calc((100%-40px)/4)]"
              />
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
