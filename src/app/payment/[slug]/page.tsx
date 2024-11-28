import { ServerSideGetWithId } from "@/utilities/apiCalls";
import React from "react";
import { CRUD_ORDER } from "../../../../config/endpoints";
import { cookies } from "next/headers";
import Esewa from "../../../../components/paymentMethod/esewa";
import { ButtonWithShadow } from "@/subcomponents/button";
import RightArrowIcon from "../../../../public/icon/right-arrow-white.svg";
import Link from "next/link";

async function getData(token: string, id: string) {
  try {
    const response = [await ServerSideGetWithId(token, CRUD_ORDER, id)];
    const [orderDetail] = response;
    return { orderDetail };
  } catch (error) {
    console.error(error);
  }
}

const Page = async ({ params }: any) => {
  const { slug } = params;
  const token = cookies().get("access_token")?.value || "";
  const { orderDetail }: any = await getData(token, slug);
  return (
    <div>
      <div className="max-w-[500px] m-auto">
        <div className="mt-8">
          <div className="mb-8 flex justify-center tracking-[1px]">
            <span
              className="text-lg uppercase"
              style={{ fontFamily: "var(--font-adineue)" }}
            >
              Your Order
            </span>
          </div>
          <div className="flex justify-between py-5 font-bold border-b">
            <span>Order Status</span>
            <span>{orderDetail?.data?.status}</span>
          </div>
          <div className="flex justify-between py-5 font-bold border-b">
            <span>Shipping Status</span>
            <span>{orderDetail?.data?.shipping_status}</span>
          </div>
          <div className="flex justify-between">
            <span>{orderDetail?.data?.orderItems?.length} items</span>
            <span>${orderDetail?.data?.items_total_price}</span>
          </div>
          <div className="flex justify-between">
            <span>Sales Tax</span>
            <span>${orderDetail?.data?.tax_amount}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery</span>
            <span>
              {Number(orderDetail?.data?.delivery_charge)
                ? "$" + orderDetail?.data?.delivery_charge
                : "Free"}
            </span>
          </div>
          <div className="flex justify-between mt-5 font-bold pb-8 border-b">
            <span>Total</span>
            <span>${orderDetail?.data?.total_amount}</span>
          </div>
        </div>
        {orderDetail?.data?.status === "COMPLETED" ? (
          <div>
            <div className="mb-4 mt-8 font-bold text-xl">
              Your order is ready for processing.
            </div>
            <Link href={"/"}>
              <ButtonWithShadow
                title="continue shopping"
                sideIcon={RightArrowIcon}
                iconWidth={40}
                iconHeight={40}
              />
            </Link>
          </div>
        ) : (
          <div className="my-8 flex-col flex items-center">
            <div
              className="text-lg uppercase flex justify-center"
              style={{ fontFamily: "var(--font-adineue)" }}
            >
              Select a Payment Method
            </div>
            <Esewa
              total_amount={Number(orderDetail?.data.total_amount)}
              tax_amount={Number(orderDetail?.data.tax_amount)}
              delivery_amount={Number(orderDetail?.data.delivery_charge)}
              items_total_price={Number(orderDetail?.data.items_total_price)}
              id={slug}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
