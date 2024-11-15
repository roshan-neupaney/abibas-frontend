import React from "react";
import Image from "next/image";

interface ButtonProps {
  title?: string;
  style?: any;
  sideIcon?: any;
  className?: string;
  iconWidth?: number;
  iconHeight?: number;
  onClick?: any;
}

export const Button = ({
  title = "",
  style = {},
  sideIcon,
  className,
  iconWidth = 20,
  iconHeight = 20,
  onClick,
}: ButtonProps) => {
  return (
    <div
      className={`flex border border-black w-fit cursor-pointer ${className}`}
      style={{ ...style }}
      onClick={onClick}
    >
      <div className="flex flex-1 justify-between items-center h-8 gap-2">
        {title && <span className="font-bold leading-6">{title}</span>}
        {sideIcon && (
          <span>
            <Image
              src={sideIcon}
              width={iconWidth}
              height={iconHeight}
              alt=""
            />
          </span>
        )}
      </div>
    </div>
  );
};

export const ButtonWithShadow = ({
  title = "",
  style = {},
  sideIcon,
  className,
  iconWidth = 20,
  iconHeight = 20,
  onClick,
}: ButtonProps) => {
  return (
    <div
      className={`my-button flex border border-black w-fit cursor-pointer bg-black flex-1 h-12 items-center px-4 text-white uppercase translate-x-[-3px] translate-y-[-3px] ${className}`}
      style={{ ...style }}
      onClick={onClick}
    >
      <div className="flex flex-1 justify-between items-center h-8 gap-2">
        {title && <span className="font-bold leading-6">{title}</span>}
        {sideIcon && (
          <span>
            <Image
              src={sideIcon}
              width={iconWidth}
              height={iconHeight}
              alt=""
            />
          </span>
        )}
      </div>
    </div>
  );
};
