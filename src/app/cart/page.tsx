import React from "react";
import CartProductCard from "../../../components/cartProductCard";
import { ButtonWithShadow } from "@/subcomponents/button";
import RightArrowIcon from "../../../public/icon/right-arrow-white.svg";
import Link from "next/link";
import { ServerSideGet } from "@/utilities/apiCalls";
import { CRUD_ADD_TO_CART } from "../../../config/endpoints";
import { cookies } from "next/headers";

async function getData(token: string) {
  try {
    const response = [await ServerSideGet(token, CRUD_ADD_TO_CART)];
    const [cartItems] = response;
    return { cartItems };
  } catch (error) {
    console.error(error);
  }
}

const CartPage = async () => {
  const token = cookies().get("access_token")?.value || "";
  const { cartItems }: any = await getData(token);

  const itemsPrice = cartItems.data
    .reduce(
      (result: number, items: Record<string, any>) =>
        result + items?.shoe?.price * items?.count,
      0
    )
    .toFixed(2);

  const deliveryCharge = (0).toFixed(2);

  const tax = (itemsPrice * 0.1).toFixed(2);
  const totalPrice = (
    Number(itemsPrice) +
    Number(tax) +
    Number(deliveryCharge)
  ).toFixed(2);

  const totalItems = cartItems?.data?.reduce(
    (result: number, items: Record<string, any>) => result + items.count,
    0
  );

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
            your bag {!totalItems && "is empty"}
          </span>
        </div>
        {!(cartItems.data.length > 0) ? (
          <div>
            <div className="my-8">
              Once you add something to your bag, it will appear here. Ready to
              get started?
            </div>
            <Link href={"/"}>
              <ButtonWithShadow
                title="Get Started"
                sideIcon={RightArrowIcon}
                iconHeight={40}
                iconWidth={40}
              />
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-4">
              <span className="uppercase"> Total: </span>
              <span>{`(${totalItems} items)`}</span>{" "}
              <span className="font-bold">${itemsPrice}</span>
            </div>
            <div className="mt-2.5">
              Items in your bag are not reserved — check out now to make them
              yours.
            </div>
            <div className="flex flex-col gap-10 mt-10">
              {cartItems?.data?.map((items: Record<string, any>, i: number) => {
                return (
                  <div key={i}>
                    <CartProductCard productData={items} token={token} />
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
      {cartItems.data.length > 0 && (
        <div className="mt-10 flex-col flex media-960:flex-col-reverse media-960:justify-end media-960:w-[37.5%] gap-10">
          <div>
            <div
              className="mb-8 text-lg uppercase"
              style={{ fontFamily: "var(--font-adineue)" }}
            >
              Order Summary
            </div>
            <div className="flex justify-between">
              <span>{totalItems} items</span>
              <span>${itemsPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Sales Tax</span>
              <span>${tax}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span>
                {Number(deliveryCharge) ? "$" + deliveryCharge : "Free"}
              </span>
            </div>
            <div className="flex justify-between mt-5 font-bold">
              <span>Total</span>
              <span>${totalPrice}</span>
            </div>
          </div>
          <div>
            <Link href="/checkout" className="flex flex-1 mt-10">
              <ButtonWithShadow
                title="checkout"
                sideIcon={RightArrowIcon}
                iconHeight={40}
                iconWidth={30}
                className="my-button bg-black flex-1 h-12 items-center px-4 text-white uppercase translate-x-[-3px] translate-y-[-3px] "
              />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
