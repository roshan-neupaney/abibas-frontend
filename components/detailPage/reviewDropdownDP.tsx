import React, { useState } from "react";
import Dropdown from "../dropdown";
import StarReview from "../starReview";
import { Button, ButtonWithShadow } from "@/subcomponents/button";
import RightArrowBlackIcon from "../../public/icon/right-arrow-black.svg";
import DownArrowIcon from "../../public/icon/arrow-down.svg";
import StarInput from "@/subcomponents/starInput";
import { FormatDate, updateState } from "@/utilities/helper";
import CustomInput from "@/subcomponents/input";
import RightArrowWhiteIcon from "../../public/icon/right-arrow-white.svg";
import { CRUD_RATING } from "../../config/endpoints";
import { JsonPost } from "@/utilities/apiCalls";
import toast from "react-hot-toast";
import { ReviewValidation } from "@/utilities/validation";
import { useRouter } from "next/navigation";

interface ReviewDropdownDesktopProps {
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

const ReviewDropdownDesktop = ({
  token,
  id,
  review,
}: ReviewDropdownDesktopProps) => {
  const [showReview, setShowReview] = useState<number>(2);
  const [openWriteReview, setOpenWriteReview] = useState(false);
  const [reviewForm, setReviewForm] = useState(defaultForm);
  const [formError, setFormError] = useState(defaultError);
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const { isValid, error } = ReviewValidation(reviewForm);
      if (isValid) {
        const res = await JsonPost(
          CRUD_RATING,
          { ...reviewForm, shoe_id: id },
          token
        );
        const { status }: any = res;
        if (status) {
          toast.success("Review submitted successfully");
          setFormError(defaultError);
          setReviewForm(defaultForm);
          router.refresh();
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
      review.reduce((result, value) => result + value.rate, 0) / review.length
    ).toFixed(1)
  );
  return (
    <>
      <Dropdown title={`Review (${review.length})`}>
        <div className="flex justify-between">
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
            className="px-4 py-2 uppercase items-center"
            iconWidth={30}
            onClick={() => setOpenWriteReview(!openWriteReview)}
          />
        </div>
        {openWriteReview && (
          <div className=" p-5 mt-4">
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
                    updateState("rate", val, setReviewForm, setFormError)
                  }
                  starHeight={20}
                  starWidth={20}
                  required
                  error={formError.rate}
                />
              </div>
              <div className="mt-6 gap-6 flex flex-col">
                <CustomInput
                  title="What’s your opinion in one sentence? Example: Best purchase ever."
                  value={reviewForm?.short_review}
                  onChange={(val: string) =>
                    updateState(
                      "short_review",
                      val,
                      setReviewForm,
                      setFormError
                    )
                  }
                  placeholder="Review in Short"
                  width="35rem"
                  required
                  error={formError.short_review}
                />
                <CustomInput
                  title="Share your experience"
                  value={reviewForm?.review}
                  onChange={(val: string) =>
                    updateState("review", val, setReviewForm)
                  }
                  width="35rem"
                  placeholder="Your Review"
                  multiline
                  rows={4}
                />
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
        {review.slice(0, showReview).map((items, i) => {
          const createdAt = FormatDate(items?.createdAt);
          return (
            <div
              key={i}
              className="first:border-t border-b py-8 last:border-b-0"
            >
              <div className="flex justify-between gap-8">
                <div className="w-52">
                  <StarReview
                    rating={items.rate}
                    starHeight={12}
                    starWidth={12}
                  />
                  <div className="mt-4 font-bold text-sm">
                    {items?.user?.firstName + " " + items?.user?.lastName}
                  </div>
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between">
                    <div className="mt-2.5 font-bold">
                      {items?.short_review}
                    </div>
                    <span className="text-sm text-[#767677]">{createdAt}</span>
                  </div>
                  <div className="mt-2.5">{items?.review}</div>
                </div>
              </div>
            </div>
          );
        })}
        {review.length > showReview && (
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
      </Dropdown>
    </>
  );
};

export default ReviewDropdownDesktop;
