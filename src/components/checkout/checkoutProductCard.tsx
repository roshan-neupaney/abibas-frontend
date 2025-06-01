import React from "react";
import LazyImage from "../lazyImage";
import { IMAGE_URL } from "../../../config/constants";

const CheckoutProductCard = ({ cardDetail }: Record<string, any>) => {
  return (
    <div className="flex gap-2.5 mt-5">
      <div>
        <LazyImage
          src={IMAGE_URL + cardDetail?.colorVariation?.image_url}
          width={160}
          height={300}
          alt="image"
        />
      </div>
      <div>
        <div>{cardDetail?.shoe?.title}</div>
        <div>${cardDetail?.shoe?.price}</div>
        <div className="mt-2.5 text-[#767677]">
          Size: {cardDetail?.size} / Quantity: {cardDetail?.count}
        </div>
        <div className="text-[#767677]">
          Color: {cardDetail?.colorVariation?.color?.join(" / ")}
        </div>
      </div>
    </div>
  );
};

export default CheckoutProductCard;
