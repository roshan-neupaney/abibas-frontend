import React, { useState } from "react";
import Dropdown from "../dropdown";
import StarReview from "../starReview";
import { Button, ButtonWithShadow } from "@/subcomponents/button";
import DownArrowIcon from "../../../public/icon/arrow-down.svg";
import RightArrowBlackIcon from "../../../public/icon/right-arrow-black.svg";
import StarInput from "@/subcomponents/starInput";
import { FormatDate, updateState } from "@/utilities/helper";
import CustomInput from "@/subcomponents/input";
import RightArrowWhiteIcon from "../../../public/icon/right-arrow-white.svg";
import { JsonPost } from "@/utilities/apiCalls";
import { CRUD_RATING } from "../../../config/endpoints";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ReviewValidation } from "@/utilities/validation";
import useStore from "../../../zustand/store";

interface ReviewDropdownMBProps {
  token: string;
  id: string;
  review: Array<Record<string, any>>;
}

const defaultForm = {
  review: "",
  rate: 0,
  short_review: "",
  shoe_id: "",
};

const defaultError = {
  rate: "",
  short_review: "",
};

const ReviewDropdownMB = ({ token, id, review }: ReviewDropdownMBProps) => {
  const [showReview, setShowReview] = useState<number>(2);
  const [openWriteReview, setOpenWriteReview] = useState(false);
  const [reviewForm, setReviewForm] = useState(defaultForm);
  const [formError, setFormError] = useState(defaultError);
  const router = useRouter();
  const { toggleLoginModalTrue } = useStore();

  const handleSubmit = async () => {
    try {
      const { isValid, error } = ReviewValidation(reviewForm);
      if (isValid) {
        const res = await JsonPost(
          CRUD_RATING,
          { ...reviewForm, shoe_id: id },
          token
        );
        const { status, statusCode }: any = res;
        if (status) {
          toast.success("Review submitted successfully");
          setFormError(defaultError);
          setReviewForm(defaultForm);
          router.refresh();
        } else if(statusCode === 401) {
          toggleLoginModalTrue()
        } else {
          toast.error("Error while Submiting review");
        }
      } else {
        toast.error("Validation Error");
        setFormError(error);
      }
    } catch (e) {
      console.error(e);
    }
  };
  
  const averageRating = Number(
    (
      review?.reduce((result, value) => result + value.rate, 0) / review?.length
    ).toFixed(1)
  );

  return (
    <>
      <Dropdown title={`Review (${review?.length || 0})`}>
        <div className="flex flex-col">
          <div className="flex gap-2.5">
            <div
              className="font-bold text-[40px] tracking-[2px]"
              style={{ fontFamily: "var(--font-adineue)" }}
            >
              {averageRating}
            </div>
            <StarReview rating={averageRating} />
          </div>
          <Button
            title="Write a review"
            sideIcon={RightArrowBlackIcon}
            className="px-4 py-2 uppercase mt-4"
            iconWidth={30}
            onClick={() => setOpenWriteReview(!openWriteReview)}
          />
          {openWriteReview && (
            <div className="border-b py-4">
              <div
                className="uppercase font-bold text-xl mb-5"
                style={{ fontFamily: "var(--font-adineue)" }}
              >
                Write Your Review
              </div>
              <div>
                <div>
                  <StarInput
                    title="Your overall rating"
                    value={reviewForm?.rate}
                    onChange={(val: number) =>
                      updateState("rate", val, setReviewForm)
                    }
                    starHeight={20}
                    starWidth={20}
                    error={formError.rate}
                    required
                  />
                </div>
                <div className="mt-6 gap-4 flex flex-col">
                  <div className="media-600:w-[30rem] flex flex-col gap-4">
                    <CustomInput
                      title="What’s your opinion in one sentence? Example: Best purchase ever."
                      value={reviewForm?.short_review}
                      onChange={(val: string) =>
                        updateState("short_review", val, setReviewForm)
                      }
                      required
                      placeholder="Review in Short"
                      error={formError.short_review}
                    />
                    <CustomInput
                      title="Share your experience"
                      value={reviewForm?.review}
                      onChange={(val: string) =>
                        updateState("review", val, setReviewForm)
                      }
                      placeholder="Your Review"
                      multiline
                      rows={4}
                    />
                  </div>
                  <ButtonWithShadow
                    title="Submit Review"
                    className="h-fit px-4 py-2 bg-black text-white uppercase"
                    sideIcon={RightArrowWhiteIcon}
                    onClick={handleSubmit}
                  />
                </div>
              </div>
            </div>
          )}
          {review?.slice(0, showReview)?.map((items, i) => {
            const createdAt = FormatDate(items.createdAt);
            return (
              <div key={i} className="border-b py-5">
                <div className="flex justify-between">
                  <StarReview
                    rating={items.rate}
                    starHeight={12}
                    starWidth={12}
                  />
                  <span className="text-sm text-[#767677]">{createdAt}</span>
                </div>
                <div className="mt-2.5 font-bold">{items?.short_review}</div>
                <div className="mt-2.5">{items?.review}</div>
                <div className="mt-4 font-bold text-sm">
                  {items?.user?.firstName + " " + items?.user?.lastName}
                </div>
              </div>
            );
          })}
          {review?.length > showReview && (
            <div className="flex justify-center mt-8">
              <div>
                <Button
                  title="Read More Reviews"
                  sideIcon={DownArrowIcon}
                  className="px-4 py-2"
                  iconWidth={30}
                  onClick={() => setShowReview((prev) => prev + 2)}
                />
              </div>
            </div>
          )}
        </div>
      </Dropdown>
    </>
  );
};

export default ReviewDropdownMB;
