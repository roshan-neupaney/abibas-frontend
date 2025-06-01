import React from "react";
import { ButtonWithShadow } from "@/subcomponents/button";
import RightArrowIcon from "../../../../public/icon/right-arrow-white.svg";
import Link from "next/link";
import { ServerSideGet } from "@/utilities/apiCalls";
import { CRUD_ORDER, GET_MY_DETAIL } from "../../../../config/endpoints";
import { cookies } from "next/headers";
import { authorization } from "../../../../hoc/auth";
import OrderCard from "../../../components/orderCard";

async function getData(token: string) {
  authorization(token);
  try {
    const response = [
      await ServerSideGet(token, CRUD_ORDER),
      await ServerSideGet(token, GET_MY_DETAIL),
    ];
    const [orders, userDetail] = response;
    return { orders, userDetail };
  } catch (error) {
    console.error(error);
  }
}

const CartPage = async () => {
  const token = cookies().get("access_token")?.value || "";
  const { orders, userDetail }: any = await getData(token);

  return (
    <div className="px-4 media-960:flex-row flex flex-col gap-10 max-w-[1280px] m-auto media-960:min-h-[80vh]">
      {/* list of items */}
      <div className="flex flex-1 flex-col mb-5">
        <div className="px-8 py-8 mt-10 mb-5 bg-[#ECEFF1] greeting-card relative">
          <span
            className="text-lg uppercase "
            style={{ fontFamily: "var(--font-adineue)" }}
          >
            Hello {userDetail?.data?.firstName || ""}
          </span>
        </div>
        <div className="mt-4">
          <span
            className="uppercase text-3xl"
            style={{ fontFamily: "var(--font-adineue)" }}
          >
            {!orders?.data?.length ? "no" : 'your'} orders
          </span>
        </div>
        {!(orders.data.length > 0) ? (
          <div>
            <div className="my-8">
              Once you add something to your bag, it will appear here. Ready to
              get started?
            </div>
            <Link href={"/"} aria-label="link to homepage">
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
              <span>{`(${orders?.data?.length} items)`}</span>{" "}
              
            </div>
            
            <div className="flex flex-col gap-10 mt-10">
              {orders?.data?.map((items: Record<string, any>, i: number) => {
                return (
                  <div key={i}>
                    <OrderCard productData={items} token={token} />
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
      
    </div>
  );
};

export default CartPage;
