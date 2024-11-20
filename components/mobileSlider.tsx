"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import ProductSlider from "./productSlider";
import { IMAGE_URL } from "../config/constants";

interface MobileSliderProps {
  images: Array<Record<string, string>>;
  handleColorClick: any;
  formData: Record<string, any>
}

const MobileSlider = ({ images, handleColorClick, formData }: MobileSliderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [translate, setTranslate] = useState<any>(1);
  const [previousMousePosition, setPreviousMousePosition] = useState<any>(0);
  const [previousPosition, setPreviousPosition] = useState<any>(1);
  const [transition, setTransition] = useState("all 0.4s ease");
  const [imageIndex, setImageIndex] = useState(1);
  useEffect(() => {
    const containerWidth =
      containerRef?.current?.getBoundingClientRect().width || 1;
    setPreviousPosition(containerWidth);
    setTranslate(containerWidth);
    let index = 1;
    const handleResize = () => {
      index = translate / containerWidth;
      setTranslate(window.innerWidth * index);
      setPreviousPosition(window.innerWidth * index);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current.getBoundingClientRect();
      setImageIndex(previousPosition / container.width);
      if (translate > (images.length - 2) * container.width) {
        setTimeout(() => {
          setTranslate(container.width);
          setPreviousPosition(container.width);
          setTransition("none");
        }, 400);
      } else if (translate < container.width && previousPosition === 0) {
        setTimeout(() => {
          setTranslate((images.length - 2) * container.width);
          setPreviousPosition((images.length - 2) * container.width);
          setTransition("none");
        }, 400);
      }
    }
  }, [previousPosition]);
  const handleMove = (e: any) => {
    if (containerRef.current) {
      setPreviousMousePosition(e.touches[0].clientX);
    }
  };

  const handleDrag = (e: any) => {
    setTransition("none");
    if (containerRef.current) {
      setPreviousMousePosition(e.touches[0].clientX);
      setTranslate(
        (prev: any) => prev - (e.touches[0].clientX - previousMousePosition)
      );
    }
  };

  const handleEnd = () => {
    setTransition("all 0.4s ease");
    if (containerRef.current) {
      const container = containerRef.current.getBoundingClientRect();
      if (previousPosition === translate) {
        return;
      } else if (previousPosition < translate) {
        setTranslate(previousPosition + container.width);
        setPreviousPosition(previousPosition + container.width);
      } else if (previousPosition > translate) {
        setTranslate(previousPosition - container.width);
        setPreviousPosition(previousPosition - container.width);
      }
    }
  };

  const handleClick = (index: number) => {
    if (containerRef.current) {
      setImageIndex(index);
      const container = containerRef.current.getBoundingClientRect();
      setTransition("all 0.4s ease");
      setTranslate(index * container.width);
      setPreviousPosition(index * container.width);
    }
  };
  // let colors = JSON.parse(formData.color || '[]');
  // console.log(colors)
  return (
    <div className="">
      <div className="w-full overflow-hidden ">
        <div
          className={`flex`}
          onTouchStart={handleMove}
          onTouchMove={handleDrag}
          onTouchEnd={handleEnd}
          ref={containerRef}
          style={{
            transform: `translate(-${translate}px)`,
            transition: `${transition}`,
          }}
        >
          {images?.map((img, index) => {
            return (
              <div className="relative min-w-full aspect-square" key={index}>
                <Image src={IMAGE_URL + img?.image_url} fill alt="" />
              </div>
            );
          })}
        </div>
      </div>
      <div className="font-bold mt-4">
        <div className="px-5">Colors</div>
        <ProductSlider className="pl-5 gap-[5px]">
          {images?.slice(1, images.length - 1)?.map((img, index) => {
            return (
              <div
                className="relative min-w-[120px] aspect-square"
                onClick={() => {handleClick(index + 1); handleColorClick(img)}}
                style={{
                  border:
                    imageIndex - 1 === index
                      ? "2px solid black"
                      : "2px solid transparent",
                  transition: "all 0.4s ease",
                }}
                key={index}
              >
                <Image src={IMAGE_URL + img?.image_url} fill alt="slider-image" />
              </div>
            );
          })}
        </ProductSlider>
      </div>
      <div className="px-5 pt-3 text-sm uppercase">
      {formData.color_variation?.color.join(" / ")}
      </div>
    </div>
  );
};

export default MobileSlider;
