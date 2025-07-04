"use client";
import Image from "next/image";
import React from "react";
import BurgerIcon from "../../../public/icon/burger-menu.svg";
import FavoriteIcon from "../../../public/icon/favorite.svg";
import AdidasIcon from "../../../public/icon/adidas.png";
import ProfileIcon from "../../../public/icon/profile.svg";
import SearchIcon from "../../../public/icon/search.svg";
import ShoppingBag from "../../../public/icon/shopping-bag.svg";
import FlagNepal from "../../../public/icon/flag-nepal.svg";
import LoginModal from "../modal/loginModal";
import Link from "next/link";
import useStore from "../../../zustand/store";
import Search from "./search";
import { authorizationClient } from "../../../hoc/auth";
import { useRouter } from "next/navigation";

interface NavbarProps {
  setCookies: (val: string) => void;
  token?: string;
}

const Navbar = ({ setCookies, token }: NavbarProps) => {
  const { status, toggleLoginModalTrue, toggleLoginModalFalse } = useStore();
  const router = useRouter();

  const checkAuthorization = () => {
    const isAuthorized = authorizationClient(token);
    if (isAuthorized) {
      router.push("/profile");
    } else {
      toggleLoginModalTrue();
    }
  };
  return (
    <div className="navbar-wrapper bg-white sticky top-0 w-full z-10">
      <div className="notification-banner flex p-2 justify-center bg-[#000000] font-adihaus text-[11px] items-center h-11 font-bold">
        <span className="uppercase text-secondary">
          adiclub days: 9/25 - 10/2
        </span>
      </div>
      {/* mobileView */}
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
          <Link href={"/"} aria-label="link to homepage or landing page">
            <span>
              <Image
                className="rotate-180"
                src={AdidasIcon}
                width={50}
                height={50}
                alt=""
              />
            </span>
          </Link>
        </div>
        <div className="col-span-2 flex gap-5 p-2 justify-end items-center">
          <span className="cursor-pointer" onClick={checkAuthorization}>
            <Image src={ProfileIcon} width={20} height={20} alt="" />
          </span>
          <span className="cursor-pointer">
            <Image src={SearchIcon} width={20} height={20} alt="" />
          </span>
          <span className="cursor-pointer">
            <Image src={ShoppingBag} width={20} height={20} alt="" />
          </span>
        </div>
      </div>
      
      {/* desktopView */}
      <div className="navbar-banner">
        <div className="hidden media-960:flex gap-5 justify-end font-adihaus font-normal px-4 text-xs leading-6">
          <span>help</span>
          <span
            className="cursor-pointer"
            onClick={() => router.push("/order")}
          >
            orders and returns
          </span>
          <span>join adiClub</span>
          <span>
            <Image src={FlagNepal} width={20} height={20} alt="" />
          </span>
        </div>
        <div className="media-960:grid grid-cols-9 hidden px-4 pb-3 xl:px-10">
          <div className="flex col-span-2 justify-start">
            <Link href={"/"} aria-label="link to homepage or landing page">
              <span className="">
                <Image
                  className="rotate-180 object-contain"
                  src={AdidasIcon}
                  height={48}
                  width={70}
                  alt=""
                />
              </span>
            </Link>
          </div>
          <div className="flex col-span-4 gap-5 items-end uppercase lg:text-xs xl:text-sm xl:justify-center">
            <div className="font-adihaus flex font-bold gap-5">
              <Link href={"/Men's"} aria-label="link to shoe listing page of men's category">
                <span>Men</span>
              </Link>
              <Link href={"/Women's"} aria-label="link to shoe listing page of women's category">
                <span>Women</span>
              </Link>
              <Link href={"/Kid's"} aria-label="link to shoe listing page of kid's category">
                <span>Kids</span>
              </Link>
            </div>
            <div className="flex gap-5">
              <Link href={"search?sortBy=top_sellers"} aria-label="link to shoe listing page with top seller filter">
                <span>Sale</span>
              </Link>
              <Link href={"search?sortBy=newest"} aria-label="link to shoe listing page with newset filter">
                <span>New & Trending</span>
              </Link>
            </div>
          </div>

          <div className="flex col-span-3 gap-3 lg:gap-5 justify-end items-end">
            <Search />
            <span
              className="min-w-5 cursor-pointer"
              onClick={checkAuthorization}
            >
              <Image src={ProfileIcon} width={20} height={20} alt="" />
            </span>
            <span className="min-w-5 cursor-pointer">
              <Image src={FavoriteIcon} width={20} height={20} alt="" />
            </span>
            <Link href={"/cart"} aria-label="link to user cart">
              <span className="min-w-5 cursor-pointer">
                <Image src={ShoppingBag} width={23} height={20} alt="" />
              </span>
            </Link>
          </div>
        </div>
      </div>
      <LoginModal
        setCookies={setCookies}
        open={status}
        handleClose={() => toggleLoginModalFalse()}
      />
    </div>
  );
};

export default Navbar;
