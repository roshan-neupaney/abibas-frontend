import React, { useEffect, useState } from "react";
import MobileSlider from "../mobileSlider";
import Link from "next/link";
import { Button, ButtonWithShadow } from "@/subcomponents/button";
import RightArrowIcon from "../../public/icon/right-arrow-white.svg";
import FavIcon from "../../public/icon/favorite.svg";
import FavIconFilled from "../../public/icon/favorite-filled.svg";
import ReviewDropdownMB from "./reviewDropdownMB";
import { updateState } from "@/utilities/helper";
import DescriptionDropdown from "./descriptionDropdown";
import DetailDropdown from "./detailDropdown";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { JsonPost } from "@/utilities/apiCalls";
import { CRUD_ADD_TO_CART, CRUD_FAVORITE } from "../../config/endpoints";
import { AddToCartValidation } from "@/utilities/validation";

interface MobileViewProps {
  images: Array<Record<string, any>>;
  totalSizes: string[];
  shoeDetails: Record<string, any>;
  token: string;
}

const defaultError = {
  size: "",
};

const MobileView = ({
  images,
  totalSizes,
  shoeDetails,
  token,
}: MobileViewProps) => {
  const [colorSizesAvailable, setColorSizesAvailable] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    size: "",
    color_variation: images[1],
  });
  const [formError, setFormError] = useState(defaultError);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const temp: string[] = [];
    images[1].sizes.forEach((size: Record<string, any>) => {
      temp.push(size.size);
      setColorSizesAvailable(temp);
    });
  }, [images]);

  useEffect(() => {
    if (!colorSizesAvailable.includes(formData.size)) {
      updateState("size", "", setFormData);
    }
  }, [formData.color_variation, colorSizesAvailable, formData.size]);

  const handleColorClick = (colorDetail: Record<string, any>) => {
    updateState("color_variation", colorDetail, setFormData);
    const temp: string[] = [];
    colorDetail.sizes.forEach((size: Record<string, any>) => {
      temp.push(size.size);
      setColorSizesAvailable(temp);
    });
  };

  const beautifyPayload = (data: Record<string, any>) => {
    const payload = {
      size: "",
      color_variation_id: "",
      shoe_id: "",
    };
    payload.size = data.size;
    payload.color_variation_id = data.color_variation.id;
    payload.shoe_id = shoeDetails.id;
    return payload;
  };

  const handleCartSubmit = async () => {
    setLoading(true);
    try {
      const beautifiedPayload = beautifyPayload(formData);
      const { isValid, error } = AddToCartValidation(beautifiedPayload);
      if (isValid) {
        const res = await JsonPost(CRUD_ADD_TO_CART, beautifiedPayload, token);
        const { status }: any = res;
        if (status) {
          toast.success("Added to cart successfully");
          setFormError(defaultError);
          setLoading(false);
          router.push("/cart");
        } else {
          setLoading(false);
          toast.error("Error while adding to cart");
        }
      } else {
        setLoading(false);
        toast.error("Validation Error");
        setFormError(error);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleFavoriteSubmit = async () => {
    try {
      const res = await JsonPost(
        CRUD_FAVORITE + "/" + shoeDetails?.id,
        {},
        token
      );
      const { status }: any = res;
      if (status) {
        toast.success(
          `${
            !shoeDetails.isFav
              ? "Added to favorites successfully"
              : "Removed from favorites successfully"
          }`
        );
        setFormError(defaultError);
        router.refresh();
      } else {
        toast.error("Error while adding to favorites");
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="media-960:hidden">
      <div className="px-5 py-3">
        <div className="flex flex-wrap justify-between">
          <div className="flex gap-0.5">
            <Link href={"/"}>
              <span className="underline">Home</span>
            </Link>{" "}
            /{" "}
            <Link href={"/shoes"}>
              <span className="underline">Shoes</span>
            </Link>
            /{" "}
            <Link href={"/shoes?category=Men's"}>
              <span className="underline">{shoeDetails?.category?.title}</span>
            </Link>
          </div>
          <div className="review-bar"></div>
        </div>
        <div
          className="mt-5 text-2xl font-bold leading-7 tracking-[2px] uppercase"
          style={{ fontFamily: "var(--font-adineue" }}
        >
          {shoeDetails?.title}
        </div>
        <div className="mt-3 font-bold">${shoeDetails?.price}</div>
      </div>
      <MobileSlider
        images={images}
        handleColorClick={handleColorClick}
        formData={formData}
      />
      <div className="mt-10 px-5">
        <div
          className="font-bold"
          style={{ color: formError.size ? "red" : "black" }}
        >
          Sizes
        </div>
        <div className="mt-3 grid  grid-cols-[repeat(auto-fill,_minmax(69px,_1fr))] gap-[5px] tracking-[-0.2px]">
          {totalSizes.map((items: string, index) => {
            return (
              <button
                className=" text-sm h-10 bg-[#eceff1] flex justify-center items-center relative disabled:cursor-not-allowed"
                disabled={!colorSizesAvailable.includes(items)}
                key={`${items}_${index}`}
                onClick={() =>
                  updateState("size", items, setFormData, setFormError)
                }
                style={{
                  backgroundColor:
                    formData.size === items ? "black" : "#eceff1",
                  color: formData.size === items ? "#eceff1" : "black",
                  fontWeight: formData.size === items ? "bold" : "normal",
                  transition: "all 0.4s ease",
                }}
              >
                {items}
                {!colorSizesAvailable.includes(items) && (
                  <div className="absolute w-11/12 border-b-4 border-black/50  flex -rotate-[30deg]"></div>
                )}
              </button>
            );
          })}
        </div>
        {formError.size && (
          <span className="text-red-500 text-xs">{formError.size}</span>
        )}
      </div>
      <div className="mt-10 px-5 flex gap-3 flex-row">
        <ButtonWithShadow
          title="add to bag"
          sideIcon={RightArrowIcon}
          iconHeight={40}
          iconWidth={30}
          disabled={loading}
          onClick={handleCartSubmit}
          className="my-button bg-black flex-1 h-12 items-center px-4 text-white uppercase translate-x-[-3px] translate-y-[-3px] "
        />
        <Button
          sideIcon={shoeDetails.isFav ? FavIconFilled : FavIcon}
          onClick={handleFavoriteSubmit}
          className="px-[14px] h-12 justify-center items-center"
        />
      </div>
      <div className="mt-16">
        <div className="first:border-t-2 border-b-2">
          <ReviewDropdownMB
            token={token}
            id={shoeDetails?.id}
            review={shoeDetails.rating}
          />
        </div>
        <div className="border-b-2">
          <DescriptionDropdown data={shoeDetails?.description} />
        </div>
        <div className="border-b-2">
          <DetailDropdown data={shoeDetails?.details} />
        </div>
      </div>
    </div>
  );
};

export default MobileView;
