"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

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
    setPreviousPosition(containerRef?.current?.getBoundingClientRect().width);
    setTranslate(containerRef?.current?.getBoundingClientRect().width);
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
    </div>
  );
};

export default MobileSlider;
