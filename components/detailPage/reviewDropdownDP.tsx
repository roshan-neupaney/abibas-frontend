import React, { useState } from "react";
import Dropdown from "../dropdown";
import StarReview from "../starReview";
import { Button } from "@/subcomponents/button";
import RightArrowBlackIcon from "../../public/icon/right-arrow-black.svg";
import DownArrowIcon from "../../public/icon/arrow-down.svg";

const ReviewDropdownDesktop = () => {
  const [showReview, setShowReview] = useState<number>(2);
  const review = [
    {
      name: "Hinton",
      title: "Absolutely impressive",
      message:
        "Absolutely impressive color, size and comfort. Love the quality and design.",
      createdAt: "November 4, 2024",
      rating: 5,
    },
    {
      name: "Btookkynella",
      title: "I feel like an elf with wings when I wear them.",
      message:
        "They are light, comfortable and for me through a loop in Central Park, first time running in a long time. Adidas is cooler than ever! I already have three pairs, will buy more.",
      createdAt: "November 4, 2024",
      rating: 5,
    },
    {
      name: "luispepe",
      title: "perfect",
      message: "I love this tennis shoes because they're very cocomfortable",
      createdAt: "November 3, 2024",
      rating: 5,
    },
    {
      name: "Sade",
      title: "I tried these on in Dicks and I had to order them.",
      message:
        "It is comfortable. Quite better than the name brands. It add support and cushion for your feet. The material in the front is breathable so you can count on the fact that your feet will be comfortable",
      createdAt: "November 3, 2024",
      rating: 5,
    },
  ];
  return (
    <>
      <Dropdown title="Review">
        <div className="flex justify-between">
          <div className="flex gap-2.5">
            <div
              className="font-bold text-[40px] tracking-[2px]"
              style={{ fontFamily: "var(--font-adineue)" }}
            >
              4.9
            </div>
            <StarReview rating={3.2} />
          </div>
          <Button
            title="Write a review"
            sideIcon={RightArrowBlackIcon}
            className="px-4 py-2 uppercase items-center"
            iconWidth={30}
          />
        </div>
        {review.slice(0, showReview).map((items, i) => {
          return (
            <div key={i} className="first:border-t border-b py-8">
              <div className="flex justify-between gap-8">
                <div className="w-52">
                  <StarReview
                    rating={items.rating}
                    starHeight={12}
                    starWidth={12}
                  />
                  <div className="mt-4 font-bold text-sm">{items.name}</div>
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between">
                    <div className="mt-2.5 font-bold">{items.title}</div>
                    <span className="text-sm text-[#767677]">
                      {items.createdAt}
                    </span>
                  </div>
                  <div className="mt-2.5">{items.message}</div>
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
