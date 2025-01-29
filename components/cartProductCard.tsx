"use client";
import Image from "next/image";
import React from "react";
import crossIcon from "../public/icon/cross.svg";
import FavIcon from "../public/icon/favorite.svg";
import FavIconFilled from "../public/icon/favorite-filled.svg";
import { IMAGE_URL, quantityList } from "../config/constants";
import toast from "react-hot-toast";
import {
  CHANGE_CART_PRODUCT_QUANTITY,
  CRUD_ADD_TO_CART,
  CRUD_FAVORITE,
} from "../config/endpoints";
import { DeleteWithId, JsonPost } from "@/utilities/apiCalls";
import { useRouter } from "next/navigation";
import CustomSelect from "@/subcomponents/select";

interface CartProductCardProps {
  productData: Record<string, any>;
  token: string;
}

const CartProductCard = ({ productData, token }: CartProductCardProps) => {
  const router = useRouter();

  const availableStocks = productData?.stock > 15 ? 15 : productData?.stock;
  const quantity = quantityList.slice(0, availableStocks);

  const handleRemove = async (id: string) => {
    try {
      const response = await DeleteWithId(CRUD_ADD_TO_CART, id, token);
      const { status }: any = response;
      if (status) {
        toast.success("Removed from bag successfully");
        router.refresh();
      } else {
        toast.error("Error while removing from bag");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleFavoriteSubmit = async () => {
    try {
      const res = await JsonPost(
        CRUD_FAVORITE + "/" + productData?.shoe?.id,
        {},
        token
      );
      const { status }: any = res;
      if (status) {
        toast.success(
          `${
            !productData.isFav
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

  const handleQuantityChange = async (value: number, id: string) => {
    try {
      const response = await JsonPost(
        CHANGE_CART_PRODUCT_QUANTITY,
        { id: id, quantity: value },
        token
      );
      const { status }: any = response;
      if (status) {
        router.refresh();
      } else {
        toast.error("Error while changing quantity");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex w-full border border-[#767677] max-h-[500px]">
      <div className="">
        <Image
          src={IMAGE_URL + productData?.colorVariation?.image_url}
          width={240}
          height={240}
          alt="product-image"
          unoptimized
        />
      </div>
      <div className="flex flex-1 flex-col justify-between pl-8">
        <div className="flex w-full">
          <div className="py-5 flex flex-1 flex-col uppercase h-fit">
            <div className="flex justify-between">
              <div>{productData?.shoe?.title}</div>
              <div>${Number(productData?.shoe?.price) * productData.count}</div>
            </div>
            <div>{productData.colorVariation.color.join(" / ")}</div>
            <div className="mt-2.5">Size: {productData.size}</div>
          </div>
          <div className="">
            <div
              className="p-4 cursor-pointer"
              onClick={() => handleRemove(productData.id)}
            >
              <Image src={crossIcon} width={25} height={25} alt="cross" unoptimized />
            </div>
            <div className="px-4 cursor-pointer" onClick={handleFavoriteSubmit}>
              <Image
                src={productData.isFav ? FavIconFilled : FavIcon}
                width={25}
                height={25}
                alt="cross"
                unoptimized
              />
            </div>
          </div>
        </div>
        <div className="mb-5 w-24">
          <CustomSelect
            title=""
            value={productData?.count.toString()}
            data={quantity}
            onChange={(val: string) =>
              handleQuantityChange(Number(val), productData.id)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default CartProductCard;
