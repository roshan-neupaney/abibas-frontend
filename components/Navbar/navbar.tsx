'use client'
import Image from "next/image";
import React from "react";
import BurgerIcon from "../../public/icon/burger-menu.svg";
import FavoriteIcon from "../../public/icon/favorite.svg";
import AdidasIcon from "../../public/icon/adidas.png";
import ProfileIcon from "../../public/icon/profile.svg";
import SearchIcon from "../../public/icon/search.svg";
import ShoppingBag from "../../public/icon/shopping-bag.svg";
import FlagNepal from "../../public/icon/flag-nepal.svg";
import CustomSearchInput from "@/subcomponents/searchInput";

const Navbar = () => {
  return (
    <div className="navbar-wrapper">
      <div className="notification-banner flex p-2 justify-center bg-[#000000] font-adihaus text-[11px] items-center h-11 font-bold">
        <span className="uppercase text-secondary">
          adiclub days: 9/25 - 10/2
        </span>
      </div>
      <div className="navbar-banner grid grid-cols-5 px-2 py-2 media-960:hidden">
        <div className="flex col-span-2 p-2 gap-5 items-center">
          <span>
            <Image src={BurgerIcon} width={27} height={20} alt="" />
          </span>
          <span>
            <Image src={FavoriteIcon} width={20} height={20} alt="" />
          </span>
        </div>
        <div className="col-span-1 flex justify-center items-center">
          <span>
            <Image
              className="rotate-180"
              src={AdidasIcon}
              width={50}
              height={50}
              alt=""
            />
          </span>
        </div>
        <div className="col-span-2 flex gap-5 p-2 justify-end items-center">
          <span>
            <Image src={ProfileIcon} width={20} height={20} alt="" />
          </span>
          <span>
            <Image src={SearchIcon} width={20} height={20} alt="" />
          </span>
          <span>
            <Image src={ShoppingBag} width={20} height={20} alt="" />
          </span>
        </div>
      </div>

      <div className="navbar-banner">
        <div className="hidden media-960:flex gap-5 justify-end font-adihaus font-normal px-4 text-xs leading-6">
          <span>help</span>
          <span>orders and returns</span>
          <span>join adiClub</span>
          <span>
            <Image src={FlagNepal} width={20} height={20} alt="" />
          </span>
        </div>
        <div className="media-960:grid grid-cols-9 hidden px-4 xl:px-10">
          <div className="flex col-span-2 justify-start">
            <span className="">
              <Image
                className="rotate-180 object-contain"
                src={AdidasIcon}
                height={48}
                width={85}
                alt=""
              />
            </span>
          </div>
          <div className="flex col-span-4 pb-3 gap-5 items-end uppercase lg:text-xs xl:text-sm xl:justify-center">
            <div className="font-adihaus flex font-bold gap-5">
              <span>Men</span>
              <span>Women</span>
              <span>Kids</span>
            </div>
            <div className="flex gap-5">
              <span>Sale</span>
              <span>New & Trending</span>
            </div>
          </div>

          <div className="flex col-span-3 gap-5 pb-2 justify-end items-end">
            <CustomSearchInput
              value=""
              onChange={() => {''}}
              placeholder="Search"
              rightIcon={SearchIcon}
            />
            <span>
              <Image src={ProfileIcon} width={20} height={20} alt="" />
            </span>
            <span>
              <Image src={FavoriteIcon} width={20} height={20} alt="" />
            </span>
            <span>
              <Image src={ShoppingBag} width={23} height={20} alt="" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
