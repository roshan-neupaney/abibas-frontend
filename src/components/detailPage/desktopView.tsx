import { Button, ButtonWithShadow } from "@/subcomponents/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import RightArrowIcon from "../../../public/icon/right-arrow-white.svg";
import FavIcon from "../../../public/icon/favorite.svg";
import FavIconFilled from "../../../public/icon/favorite-filled.svg";
import ReviewDropdownDesktop from "./reviewDropdownDP";
import { IMAGE_URL } from "../../../config/constants";
import DescriptionDropdown from "./descriptionDropdown";
import DetailDropdown from "./detailDropdown";
import { updateState } from "@/utilities/helper";
import { AddToCartValidation } from "@/utilities/validation";
import { JsonPost } from "@/utilities/apiCalls";
import { CRUD_ADD_TO_CART, CRUD_FAVORITE } from "../../../config/endpoints";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import clearCachesByServerAction from "../../../hooks/revalidate";
import useStore from "../../../zustand/store";
import DetailImage from "./DetailImage";

interface DesktopViewProps {
  images: Array<Record<string, any>>;
  totalSizes: string[];
  shoeDetails: Record<string, any>;
  token: string;
}

const defaultError = {
  size: "",
};

const DesktopView = ({
  images,
  totalSizes,
  shoeDetails,
  token,
}: DesktopViewProps) => {
  const [colorVariation, setColorVariation] = useState<Record<string, any>>({
    id: images[1]?.id,
    colorVariationImages: images[1].colorVariationImages,
  });
  const [colorSizesAvailable, setColorSizesAvailable] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    size: "",
    color_variation: images[1],
  });
  const [formError, setFormError] = useState(defaultError);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toggleLoginModalTrue } = useStore();

  useEffect(() => {
    const temp: string[] = [];
    images[1]?.sizes?.forEach((size: Record<string, any>) => {
      if (!(size?.stock === "0")) {
        temp.push(size.size);
        setColorSizesAvailable(temp);
      }
    });
  }, [images]);

  useEffect(() => {
    if (!colorSizesAvailable.includes(formData.size)) {
      updateState("size", "", setFormData);
    }
  }, [formData.color_variation, colorSizesAvailable, formData.size]);

  const handleColorClick = (colorDetail: Record<string, any>) => {
    setColorVariation(colorDetail);
    updateState("color_variation", colorDetail, setFormData);
    const temp: string[] = [];
    colorDetail.sizes.forEach((size: Record<string, any>) => {
      if (!(size?.stock === "0")) {
        temp.push(size?.size);
        setColorSizesAvailable(temp);
      }
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
        const { status, statusCode }: any = res;
        if (status) {
          toast.success("Added to cart successfully");
          clearCachesByServerAction("/cart");
          setFormError(defaultError);
          setLoading(false);
          router.push("/cart");
        } else if (statusCode === 401) {
          toggleLoginModalTrue();
          setLoading(false);
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
    <div className="media-960:flex hidden">
      <div className="flex flex-1 flex-col">
        <div className="grid grid-cols-2 gap-1">
          {colorVariation?.colorVariationImages?.map(
            (img: Record<string, string>) => {
              return (
                <React.Fragment key={img.image_url}>
                  <DetailImage image_url={img?.image_url} />
                </React.Fragment>
              );
            }
          )}
        </div>
        <div className="media-960:px-5 xl:px-8 media-1440:px-10 2xl:px-16 max-w-[970px] w-full m-auto mt-20">
          <div className="first:border-t-2 border-b-2">
            <ReviewDropdownDesktop
              token={token}
              id={shoeDetails?.id}
              review={shoeDetails?.rating}
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
      <div
        className={`w-80 py-8 media-960:px-5 xl:px-8 xl:w-[430px] media-1440:px-10 media-1440:w-[450px] 2xl:px-14 2xl:w-[490px] min-h-screen sticky top-0`}
      >
        <div className="">
          <div className="flex flex-wrap justify-between">
            <div className="flex gap-0.5">{shoeDetails?.category?.title}</div>
            <div className="review-bar"></div>
          </div>
          <div
            className="mt-2.5 text-3xl font-bold leading-8 tracking-[1.5px] uppercase"
            style={{ fontFamily: "var(--font-adineue" }}
          >
            {shoeDetails?.title}
          </div>
          <div className="mt-2.5 font-bold">Rs.{shoeDetails?.price}</div>
        </div>
        <div className="mt-10">
          <div>
            <span className="font-bold ">Colors</span>
          </div>
          <div className="mt-2.5 grid grid-cols-5 gap-[5px]">
            {images
              .slice(1, images.length - 1)
              .map((img: any, index: number) => {
                return (
                  <div className="col-span-1 relative" key={index}>
                    <span className="" onClick={() => handleColorClick(img)}>
                      <Image
                        src={IMAGE_URL + img?.image_url}
                        width={300}
                        height={300}
                        alt="image"
                        className="shoe-image-list cursor-pointer"
                        style={{
                          borderBottom:
                            img?.id === colorVariation?.id
                              ? "3px solid black"
                              : "3px solid transparent",
                          transition: "all 0.4s ease",
                        }}
                        unoptimized
                      />
                    </span>
                  </div>
                );
              })}
          </div>
          <div className="mt-2.5">
            {formData.color_variation?.color.join(" / ")}
          </div>
        </div>
        <div className="mt-10">
          <span
            className="font-bold"
            style={{ color: formError.size ? "red" : "black" }}
          >
            Sizes
          </span>{" "}
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
                    color: formData.size === items ? "white" : "black",
                    fontWeight: formData.size === items ? "bold" : "normal",
                    transition: "all 0.4s ease",
                  }}
                >
                  {items}
                  {!colorSizesAvailable.includes(items) && (
                    <div className="absolute w-11/12 border-b-4 border-black/30  flex -rotate-[30deg]"></div>
                  )}
                </button>
              );
            })}
          </div>
          {formError.size && (
            <span className="text-red-500 text-xs">{formError.size}</span>
          )}
        </div>
        <div className="mt-10 flex gap-3 flex-row">
          <ButtonWithShadow
            title="add to bag"
            sideIcon={RightArrowIcon}
            iconHeight={40}
            iconWidth={30}
            onClick={handleCartSubmit}
            disabled={loading}
            className="my-button bg-black flex-1 h-12 items-center px-4 text-white uppercase translate-x-[-3px] translate-y-[-3px] "
          />

          <Button
            sideIcon={shoeDetails.isFav ? FavIconFilled : FavIcon}
            onClick={handleFavoriteSubmit}
            className="px-[14px] h-12 justify-center items-center"
          />
        </div>
      </div>
    </div>
  );
};

export default DesktopView;
