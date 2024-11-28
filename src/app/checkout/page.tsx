import React from "react";
import {
  CRUD_ADD_TO_CART,
  GET_ALL_LOCATIONS,
  GET_MY_DETAIL,
} from "../../../config/endpoints";
import { ServerSideGet } from "@/utilities/apiCalls";
import { cookies } from "next/headers";
import DeliveryAddressForm from "../../../components/checkout/deliveryAddressForm";
import Link from "next/link";
import CheckoutProductCard from "../../../components/checkout/checkoutProductCard";

async function getData(token: string) {
  try {
    const response = [
      await ServerSideGet(token, CRUD_ADD_TO_CART),
      await ServerSideGet(token, GET_MY_DETAIL),
      await ServerSideGet(token, GET_ALL_LOCATIONS),
    ];
    const [cartItems, userDetail, locations] = response;
    return { cartItems, userDetail, locations };
  } catch (error) {
    console.error(error);
  }
}

const Page = async () => {
  const token = cookies().get("access_token")?.value || "";
  const { cartItems, userDetail, locations }: any = await getData(token);

  const itemsPrice = cartItems.data
    .reduce(
      (result: number, items: Record<string, any>) =>
        result + items?.shoe?.price * items?.count,
      0
    )
    .toFixed(2);
  const totalItems = cartItems?.data?.reduce(
    (result: number, items: Record<string, any>) => result + items.count,
    0
  );
  const deliveryCharge = (0).toFixed(2);

  const tax = (itemsPrice * 0.1).toFixed(2);

  const totalPrice = (
    Number(itemsPrice) +
    Number(tax) +
    Number(deliveryCharge)
  ).toFixed(2);

  return (
    <div>
      <div className="py-4 border-y">
        <div
          className="m-auto max-w-[1175px] uppercase text-lg font-bold tracking-[1px] p-4"
          style={{ fontFamily: "var(--font-adineue)" }}
        >
          Hi, {userDetail?.data?.firstName || ""}!
        </div>
        <div className="m-auto max-w-[1175px] px-4 ">
          <div className="my-10 ">
            <div
              className="flex items-center justify-center uppercase text-3xl"
              style={{ fontFamily: "var(--font-adineue)" }}
            >
              Checkout
            </div>
            <div className="flex items-center justify-center text-[#767677] font-bold">
              <span className="mr-2.5">({totalItems} items)</span>
              <span>${itemsPrice}</span>
            </div>
          </div>
          <div className="flex">
            <div className="flex flex-1 flex-col">
              <div className="w-full">
                <div
                  className="font-bold uppercase text-lg tracking-[1px]"
                  style={{ fontFamily: "var(--font-adineue)" }}
                >
                  Contact
                </div>
                <div className="mt-8">{userDetail?.data?.email}</div>
              </div>
              <div className="border-t mt-8">
                <div
                  className="font-bold text-lg mt-10 tracking-[1px]"
                  style={{ fontFamily: "var(--font-adineue)" }}
                >
                  Address
                </div>
                <DeliveryAddressForm
                  Locations={locations?.data}
                  cartItems={cartItems?.data}
                  {...{ tax, totalPrice, token, deliveryCharge, itemsPrice }}
                />
              </div>
            </div>
            <aside className="w-1/3 items ml-20 hidden media-960:block">
              <div className="mb-8 flex justify-between tracking-[1px]">
                <span
                  className="text-lg uppercase"
                  style={{ fontFamily: "var(--font-adineue)" }}
                >
                  Your Order
                </span>
                <Link href={"/cart"}>
                  <span className="underline font-bold uppercase">Edit</span>
                </Link>
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
              <div className="flex justify-between mt-5 font-bold pb-8 border-b">
                <span>Total</span>
                <span>${totalPrice}</span>
              </div>
              <div className="mt-8">
                {cartItems?.data?.map(
                  (items: Record<string, any>, i: number) => {
                    return (
                      <div key={i}>
                        <CheckoutProductCard cardDetail={items} />
                      </div>
                    );
                  }
                )}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
