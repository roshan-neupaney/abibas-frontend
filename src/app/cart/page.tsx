import React from "react";
import CartProductCard from "../../../components/cartProductCard";
import { Button } from "@/subcomponents/button";
import RightArrowIcon from '../../../public/icon/right-arrow-white.svg'
import Link from "next/link";

const CartPage = () => {
  const products = [
    {
      title: "product 1",
      price: 12.0,
      size: "5.5",
      image: "/images/2.avif",
      color: "orange/white",
    },
    {
      title: "product 2",
      price: 13.0,
      size: "5.5",
      image: "/images/1.avif",
      color: "black/white",
    },
    {
      title: "product 3",
      price: 14.5,
      size: "5.5",
      image: "/images/4.avif",
      color: "orange/white",
    },
  ];
  const totalPrice = products.reduce(
    (result, items) => result + items.price,
    0
  );
  console.log("totalPrice", totalPrice);
  return (
    <div className="px-4 media-960:flex-row flex flex-col gap-10 max-w-[1280px] m-auto">
      {/* list of items */}
      <div className="flex flex-1 flex-col">
        <div className="px-8 py-8 mt-10 mb-5 bg-[#ECEFF1] greeting-card relative">
          <span
            className="text-lg uppercase "
            style={{ fontFamily: "var(--font-adineue)" }}
          >
            Hello Roshan
          </span>
        </div>
        <div className="mt-4">
          <span
            className="uppercase text-3xl"
            style={{ fontFamily: "var(--font-adineue)" }}
          >
            your bag
          </span>
        </div>
        <div className="mt-4">
          <span className="uppercase"> Total: </span>
          <span>{`(${products.length} items)`}</span>{" "}
          <span className="font-bold">${totalPrice}</span>
        </div>
        <div className="mt-2.5">
          Items in your bag are not reserved — check out now to make them yours.
        </div>
        <div className="flex flex-col gap-10 mt-10">
          {products?.map((items, i) => {
            return (
              <div key={i}>
                <CartProductCard productData={items} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-10 flex-col flex media-960:flex-col-reverse media-960:justify-end media-960:w-[37.5%] gap-10">
        <div>
          <div
            className="mb-8 text-lg uppercase"
            style={{ fontFamily: "var(--font-adineue)" }}
          >
            Order Summary
          </div>
          <div className="flex justify-between">
            <span>{products.length} items</span>
            <span>${totalPrice}</span>
          </div>
          <div className="flex justify-between">
            <span>Sales Tax</span>
            <span>${totalPrice * 0.13}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between mt-5 font-bold">
            <span>Total</span>
            <span>${totalPrice + totalPrice * 0.13}</span>
          </div>
        </div>
        <div>
        <Link href="/cart" className="flex flex-1 mt-10">
          <Button
            title="checkout"
            sideIcon={RightArrowIcon}
            iconHeight={40}
            iconWidth={30}
            className="my-button bg-black flex-1 h-12 items-center px-4 text-white uppercase translate-x-[-3px] translate-y-[-3px] "
          />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
