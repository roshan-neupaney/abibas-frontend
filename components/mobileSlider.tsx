"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import ProductSlider from "./productSlider";

interface MobileSliderProps {
  images: Array<Record<string, string>>;
}

const MobileSlider = ({ images }: MobileSliderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [translate, setTranslate] = useState<any>(1);
  const [previousMousePosition, setPreviousMousePosition] = useState<any>(0);
  const [previousPosition, setPreviousPosition] = useState<any>(1);
  const [transition, setTransition] = useState("all 0.4s ease");
  useEffect(() => {
    const containerWidth = containerRef?.current?.getBoundingClientRect().width || 1;
    setPreviousPosition(containerWidth);
    setTranslate(containerWidth);
    let index = 1;
    const handleResize = () => {
      index = translate/containerWidth;
      setTranslate(window.innerWidth * index);
      setPreviousPosition(window.innerWidth * index);
    };

    window.addEventListener('resize', handleResize);
    
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current.getBoundingClientRect();
      if (translate > 5 * container.width) {
        setTimeout(() => {
          setTranslate(container.width);
          setPreviousPosition(container.width);
          setTransition("none");
        }, 400);
      } else if (translate < container.width && previousPosition === 0) {
        setTimeout(() => {
          setTranslate(5 * container.width);
          setPreviousPosition(5 * container.width);
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
      const container = containerRef.current.getBoundingClientRect();
      setTransition("all 0.4s ease");
      setTranslate(index * container.width);
      setPreviousPosition(index * container.width);
    }
  };

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
          {images.map((img) => {
            return (
              <div className="relative min-w-full aspect-square">
                <Image src={img.image} fill alt="" />
              </div>
            );
          })}
        </div>
      </div>
      <div className="font-bold mt-4">
        <div className="px-5">Colors available in size</div>
        <ProductSlider className="pl-5 gap-[5px]">
          {images.slice(1, images.length - 1).map((img, index) => {
            return (
              <div
                className="relative min-w-[120px] aspect-square"
                onClick={() => handleClick(index + 1)}
              >
                <Image src={img.image} fill alt="slider-image" />
              </div>
            );
          })}
        </ProductSlider>
      </div>
      <div className="px-5 pt-3 text-sm">Pulse Lime / Zero Metalic / Crystal Jade</div>
    </div>
  );
};

export default MobileSlider;
