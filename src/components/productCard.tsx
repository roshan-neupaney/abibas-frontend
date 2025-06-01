"use client";
import Image from "next/image";
import React from "react";
import HollowFavIcon from "../../public/icon/favorite.svg";
import FilledFavIcon from "../../public/icon/favorite-filled.svg";
import Link from "next/link";
import { IMAGE_URL } from "../../config/constants";
import LazyImage from "./lazyImage";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { JsonPost } from "@/utilities/apiCalls";
import { CRUD_FAVORITE } from "../../config/endpoints";
import useStore from "../../zustand/store";

interface ProductCardProps {
  title?: string;
  image: string;
  category?: string;
  className?: string;
  id?: string;
  slug_url?: string;
  routing_url?: string;
  price: string;
  token?: string;
  isFav?: boolean;
  showFav?: boolean;
}

const ProductCard = ({
  title = "",
  image,
  category = "",
  className = "",
  id = "",
  slug_url,
  routing_url = "",
  price,
  token,
  isFav = false,
  showFav = true,
}: ProductCardProps) => {
  const router = useRouter();
  const {toggleLoginModalTrue} = useStore();

  const handleFavoriteSubmit = async () => {
    try {
      const res = await JsonPost(CRUD_FAVORITE + "/" + id, {}, token || "");
      const { status, statusCode }: any = res;
      if (statusCode === 401) {
        toggleLoginModalTrue();
      } else if (status) {
        toast.success(
          `${
            !isFav
              ? "Added to favorites successfully"
              : "Removed from favorites successfully"
          }`
        );
        router.refresh();
      } else {
        toast.error("Error while adding to favorites");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="relative w-fit">
      <Link href={`${routing_url}${slug_url}`} className="product-card" aria-label="link to the relative product">
      <div
        className={`flex flex-col gap-3 max-w-72 bg-white ${className} border-black hover:lg:border`}
      >
        <span className="relative">
          <LazyImage src={IMAGE_URL + image} width={600} height={600} alt="" />
          <span className="absolute bg-white text-sm text-black bottom-0 left-2 p-1">
            Rs. {price}
          </span>
        </span>
        {(title || category) && (
          <div className="flex flex-col px-2 gap-1">
            {title && <span className="text-sm leading-4">{title}</span>}
            {category && (
              <span className="text-sm text-[#767677]">{category}</span>
            )}
          </div>
        )}
      </div>
      </Link>
      {showFav &&
      <span
        className="absolute top-4 right-4"
        onClick={handleFavoriteSubmit}
      >
        <Image
          src={isFav ? FilledFavIcon : HollowFavIcon}
          width={20}
          height={20}
          alt=""
        />
      </span>}
    </div>
  );
};

export default ProductCard;
