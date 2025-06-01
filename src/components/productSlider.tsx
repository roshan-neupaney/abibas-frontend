import React from "react";

interface ProductSliderProps {
  children: any;
  className?: string;
}

const ProductSlider = ({ children, className = "" }: ProductSliderProps) => {

  return (
    <div
      className={`flex w-full slider-container overflow-x-auto ${className}`}
    >
      {children}
    </div>
  );
};

export default ProductSlider;
