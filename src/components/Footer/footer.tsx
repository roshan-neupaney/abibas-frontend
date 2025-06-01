import Image from "next/image";
import React from "react";
import NepalFlag from "../../../public/icon/flag-nepal.svg";
import abibasLogo from "../../../public/icon/adidas.png";
import facebookLogo from "../../../public/icon/facebook.svg";
import InstagramLogo from "../../../public/icon/instagram.svg";
import twitterLogo from "../../../public/icon/twitter.svg";
import pinterestLogo from "../../../public/icon/pinterest.svg";
import youtubeLogo from "../../../public/icon/youtube.svg";
import tiktokLogo from "../../../public/icon/tiktok.svg";

const Footer = () => {
  return (
    <div className="footer">
      <div className="mt-20 bg-black ">
        <section className="flex py-20 media-1920:w-[1600px] m-auto ">
          <div className="flex flex-col mx-4 media-390:mx-8 md:mx-16 media-1366:w-1/2 media-1366:ml-[25%] text-white">
            <h1 className="text-3xl font-bold leading-8 tracking-[3px] text-center text-white uppercase mb-4">
              A leader in athletic performance since 1949
            </h1>
            <p className="text-justify leading-[22px]">
              We&apos;re inspired by athletes. From the very first track spikes Adi
              Dassler made in his workshop, creating the best gear for the
              athlete is what drives us to pursue technological breakthroughs
              and design innovations. Our sneakers and apparel are worn by
              world-record holders and medal winners, but it&apos;s just as important
              that road runners, weekend hikers, recreational soccer players,
              and fitness enthusiasts. From adidas Boost, the game-changing
              cushioning technology, to the world-beating design of Adizero
              Adios Pro running shoes to Terrex outdoor gear to soccer cleats
              with unbeatable touch, we&apos;re always iterating, innovating and
              improving with athletes in mind.
              <br />
              <br />
              The 3-Stripes have appeared on medal stands all around the world,
              but they&apos;ve also had an influence that extends far beyond the
              field of play. adidas sneakers have been worn by hip-hop
              performers, skaters, artists and all the other change-makers who
              move the culture forward with their vision and uncompromising
              style. We&apos;ve made our mark with legendary lifestyle shoes like the
              adidas Superstar, the Stan Smith and the Samba, shoes that began
              as athletic footwear before hitting the streets and leaving an
              indelible impression on the culture.
              <br />
              <br />
              adidas Originals apparel is a stylish complement to our lifestyle
              shoes. Our streetwear collections pull from the archives to put a
              modern spin on classics like the Firebird tracksuit and the Tiro
              pant. Luxe materials, sophisticated silhouettes and unexpected
              details elevate our streetwear and transcend sport while at the
              same time never losing sight of our heritage. Because our mantra
              is, and has always been, that through sport we have the power to
              change lives.
            </p>
            <div className="flex justify-center mt-10">
              <span className="rotate-180 invert">
                <Image
                  src={abibasLogo}
                  width={40}
                  height={20}
                  alt="abibas logo"
                />
              </span>
            </div>
          </div>
        </section>
      </div>
      <div className="media-960:flex hidden media-960:max-w-[1010px] pt-5 m-auto">
        <div className="pt-5 px-4 pb-8">
          <h5 className="font-bold text-lg uppercase tracking-[1px] leading-6 mb-[10px]">
            Products
          </h5>
          <ul className="text-sm">
            <li>Shoe</li>
            <li>Clothing</li>
            <li>Accessories</li>
            <li>Gift Cards</li>
            <li></li>
            <li>New Arrivals</li>
            <li>Best Seller</li>
            <li>Release Dates</li>
            <li>Sale</li>
          </ul>
        </div>
        <div className="pt-5 px-4 pb-8">
          <h5 className="font-bold text-lg uppercase tracking-[1px] leading-6 mb-[10px]">
            Sports
          </h5>
          <ul className="text-sm">
            <li>Soccer</li>
            <li>Running</li>
            <li>Basketball</li>
            <li>Football</li>
            <li>Outdoor</li>
            <li>Golf</li>
            <li>Baseball</li>
            <li>Tennis</li>
            <li>Skateboarding</li>
            <li>Traning</li>
          </ul>
        </div>
        <div className="pt-5 px-4 pb-8">
          <h5 className="font-bold text-lg uppercase tracking-[1px] leading-6 mb-[10px]">
            Collections
          </h5>
          <ul className="text-sm">
            <li>Adicolor</li>
            <li>Ultraboost</li>
            <li>NMD</li>
            <li>Forum</li>
            <li>Superstart</li>
            <li>Running Shoes</li>
            <li>Adilette</li>
            <li>Stan Smith</li>
            <li>adizero</li>
            <li>Trio</li>
            <li>Cloudfoam Pure</li>
            <li>Black Friday Deals</li>
          </ul>
        </div>
        <div className="pt-5 px-4 pb-8">
          <h5 className="font-bold text-lg uppercase tracking-[1px] leading-6 mb-[10px]">
            Support
          </h5>
          <ul className="text-sm">
            <li>Help</li>
            <li>Return & Exchanges</li>
            <li>Shipping</li>
            <li>Order Tracker</li>
            <li>Store Locator</li>
            <li>Size Charts</li>
            <li>Gift Card Balance</li>
            <li>Sale</li>
          </ul>
        </div>
        <div className="pt-5 px-4 pb-8">
          <h5 className="font-bold text-lg uppercase tracking-[1px] leading-6 mb-[10px]">
            Company Info
          </h5>
          <ul className="text-sm">
            <li>About Us</li>
            <li>Student Discount</li>
            <li>Military and Healthcare Discount</li>
            <li>abibas Stories</li>
            <li>abibas Apps</li>
            <li>Impact</li>
            <li>People</li>
            <li>Planet</li>
            <li>abiClub</li>
            <li>Affiliates</li>
            <li>Press</li>
            <li>Careers</li>
            <li>California Transparency in Supply Chains Act</li>
            <li>Responsible Disclosure</li>
            <li>Transparency in Coverage</li>
          </ul>
        </div>
        <div className="pt-5 px-4 pb-8">
          <h5 className="font-bold text-lg uppercase tracking-[1px] leading-6 mb-[10px]">
            Follow Us
          </h5>
          <ul className="text-sm flex flex-col gap-4">
            <li className="leading-6">
              <span>
                <Image
                  src={facebookLogo}
                  width={30}
                  height={30}
                  alt="facebook"
                />
              </span>
            </li>
            <li className="leading-6">
              <span>
                <Image
                  src={InstagramLogo}
                  width={25}
                  height={25}
                  alt="Instagram"
                />
              </span>
            </li>
            <li className="leading-6">
              <span>
                <Image
                  src={twitterLogo}
                  width={25}
                  height={25}
                  alt="twitter"
                />
              </span>
            </li>
            <li className="leading-6">
              <span>
                <Image
                  src={pinterestLogo}
                  width={25}
                  height={25}
                  alt="pinterest"
                />
              </span>
            </li>
            <li className="leading-6">
              <span>
                <Image
                  src={tiktokLogo}
                  width={25}
                  height={25}
                  alt="tiktok"
                />
              </span>
            </li>
            <li className="leading-6">
              <span>
                <Image
                  src={youtubeLogo}
                  width={25}
                  height={25}
                  alt="youtube"
                />
              </span>
            </li>
          </ul>
        </div>
      </div>
      <ul className="w-full bg-black py-4 text-white md:hidden grid grid-cols-2 text-center border-t border-[#767677]">
        <li className="col-span-1 py-[10px] px-[15px] text-xs">Help</li>
        <li className="col-span-1 py-[10px] px-[15px] text-xs">adiClub</li>
        <li className="col-span-1 py-[10px] px-[15px] text-xs">
          Returns & Exchange
        </li>
        <li className="col-span-1 py-[10px] px-[15px] text-xs">Store Finder</li>
        <li className="col-span-1 py-[10px] px-[15px] text-xs">
          Order Tracker
        </li>
        <li className="col-span-1 py-[10px] px-[15px] text-xs">Gift Cards</li>
        <li className="col-span-1 py-[10px] px-[15px] text-xs">Shipping</li>
        <li className="col-span-1 py-[10px] px-[15px] text-xs">abibas Apps</li>
        <li className="col-span-1 py-[10px] px-[15px] text-xs">Promotions</li>
        <li className="col-span-1 py-[10px] px-[15px] text-xs">Size Charts</li>
        <li className="col-span-1 py-[10px] px-[15px] text-xs">Sitemap</li>
        <li className="col-span-1 py-[10px] px-[15px] text-xs">
          Black Friday Deals
        </li>
      </ul>
      <div className="w-full border-t border-[#767677] bg-[#282c31] ">
        <ul className=" grid grid-cols-2 media-960:grid-cols-3 text-center text-[#d3d7da] text-xs media-960:w-[440px] m-auto">
          <li className="col-span-2 my-4 flex gap-2.5 justify-center media-960:hidden">
            <span>
              <Image src={NepalFlag} width={15} height={0} alt="flag" />
            </span>
            <span className=" text-xs ">Nepal</span>
          </li>
          <li className="col-span-1 my-4">Your Privacy Choices</li>
          <li className="col-span-1 media-960:col-span-1 my-4 media-960:border-x">
            Privacy Policy
          </li>
          <li className="col-span-2 media-960:col-span-1 my-4">
            Terms and Condition
          </li>
          <li className="col-span-2 media-960:col-span-3 my-4">
            &copy; 2024 abibas Nepal, Inc.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
