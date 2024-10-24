import React, { useRef, useState } from "react";
import ProductCard from "./productCard";
import { Button } from "@/subcomponents/button";
import NextIconBlack from "../public/icon/right-arrow-black.svg";

interface ProductSliderProps {
  children: any;
  className?: string;
}

const ProductSlider = ({ children, className = "" }: ProductSliderProps) => {
  const [showButton, toggleButton] = useState<Record<string, any>>({
    nextBtn: false,
    prevBtn: false,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(0);

  // const handleNext = () => {
  //   if (containerRef.current && itemRef.current) {
  //     const containerBox = containerRef.current?.getBoundingClientRect();
  //     const itemBox = itemRef.current?.getBoundingClientRect();
  //     const containerBoxRight = containerBox?.right || 0;
  //     const itemBoxWidth = itemBox?.width || 0;
  //     const outsidePart = (itemBox?.right ?? 0) - containerBoxRight;
  //     console.log(itemBox, "containerBox", containerRef.current?.scrollLeft);
  //     console.log('outsidePart', outsidePart)
  //     if (outsidePart < 288) {
  //       setPosition((prev) => {
  //         return prev - outsidePart;
  //       });
  //     } else if (containerBoxRight >= (itemBox?.right ?? 0)) {
  //       setPosition((prev) => {
  //         return prev;
  //       });
  //     } else {
  //       setPosition((prev) => {
  //         return prev - 288;
  //       });
  //     }
  //   }
  // };

  // const handleScroll = () => {
  //   if(containerRef.current && itemRef.current){
  //     const containerBox = containerRef.current?.getBoundingClientRect();
  //     const itemBox = itemRef.current?.getBoundingClientRect();
  //     console.log(itemBox.width, "containerBox", containerRef.current?.scrollLeft );
  //   }
  // }

  // const handlePrev = () => {
  //   if (containerRef && itemRef) {
  //     const containerBox = containerRef.current?.getBoundingClientRect();
  //     const itemBox = itemRef.current?.getBoundingClientRect();
  //     const containerBoxRight = containerBox?.right || 0;
  //     const itemBoxWidth = itemBox?.width || 0;
  //     const outsidePart = (itemBox?.right ?? 0) - containerBoxRight;
  //     console.log(itemBox, "containerBox", containerBox);
  //     console.log('outsidePart', outsidePart)
  //     // if (outsidePart < itemBoxWidth) {
  //     //   setPosition((prev) => {
  //     //     return prev + outsidePart;
  //     //   });
  //     // } else if (containerBoxRight >= (itemBox?.right ?? 0)) {
  //     //   setPosition((prev) => {
  //     //     return prev;
  //     //   });
  //     // } else {
  //     //   setPosition((prev) => {
  //     //     return prev + itemBoxWidth;
  //     //   });
  //     // }
  //   }
  // };

  return (
    <div
      className={`flex w-full slider-container overflow-x-auto ${className}`}
    >
      {children}
    </div>
  );
};

export default ProductSlider;
