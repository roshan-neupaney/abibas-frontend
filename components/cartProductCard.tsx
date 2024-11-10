"use client";
import Image from "next/image";
import React from "react";
import crossIcon from "../public/icon/cross.svg";
import favoriteIcon from "../public/icon/favorite.svg";

interface CartProductCardProps {
  productData: Record<string, any>;
}

const CartProductCard = ({ productData }: CartProductCardProps) => {
  return (
    <div className="flex w-full border border-[#767677] max-h-[500px]">
      <div className="">
        <Image
          src={productData.image}
          width={240}
          height={240}
          alt="product-image"
        />
      </div>
      <div className="flex flex-1">
        <div className="py-5 pl-4 flex flex-1 flex-col uppercase h-fit">
          <div className="flex justify-between">
            <div>{productData.title}</div>
            <div>${productData.price}</div>
          </div>
          <div>{productData.color}</div>
          <div className="mt-2.5">Size: {productData.size}</div>
        </div>
        <div className="">
          <div className="p-4">
            <Image src={crossIcon} width={25} height={25} alt="cross" />
          </div>
          <div className="px-4">
            <Image src={favoriteIcon} width={25} height={25} alt="cross" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProductCard;
