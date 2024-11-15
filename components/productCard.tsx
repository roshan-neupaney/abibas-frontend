'use client'
import Image from "next/image";
import React, { useState } from "react";
import HollowFavIcon from "../public/icon/favorite.svg";
import FilledFavIcon from "../public/icon/favorite-filled.svg";
import Link from "next/link";
import { IMAGE_URL } from "../config/constants";

interface ProductCardProps {
  title?: string;
  image: string;
  category?: string;
  className?: string;
  id?: string;
  routing_url?: string;

}

const ProductCard = ({
  title = "",
  image,
  category = "",
  className = "",
  id = "",
  routing_url=''
}: ProductCardProps) => {
  const [liked, toggleLiked] = useState(false);
  return (
    <Link href={`${routing_url}${id}`}>
    <div
      className={`flex flex-col gap-3 w-72 bg-white ${className} border-black hover:lg:border`}
    >
      <span className="relative">
        <span
          className="absolute top-4 right-4"
          onClick={() => toggleLiked(!liked)}
        >
          <Image
            src={liked ? FilledFavIcon : HollowFavIcon}
            width={20}
            height={20}
            alt=""
          />
        </span>
        <Image src={IMAGE_URL + image} width={600} height={0} alt="" />
        <span className="absolute bg-white text-sm text-black bottom-0 left-2 p-1">
          $120
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
  );
};

export default ProductCard;
