import Image from "next/image";
import React from "react";

interface VideoImageCardProps {
  title?: string;
  image: string;
  description?: string;
  className?: string;
  id?: string;
}

const VideoImageCard = ({
  title = "",
  image,
  description = "",
  className = "",
  id = "",
}: VideoImageCardProps) => {
  const imageExtensions = [
    "jpeg",
    "jpg",
    "png",
    "gif",
    "bmp",
    "tiff",
    "tif",
    "webp",
    "svg",
    "ico",
    "heic",
    "heif",
    "avif",
  ];
  const img_ext = image.split(".")[1];
  const isImage = imageExtensions.includes(img_ext);
  return (
    <div
      className={`flex flex-col gap-3 w-72 bg-white ${className} cursor-pointer`}
      id={id}
    >
      <span className="relative">
        {isImage ? (
          <Image src={image} width={600} height={0} alt="" unoptimized />
        ) : (
          <video loop autoPlay muted width={"100%"}>
            <source src={image} />
          </video>
        )}
      </span>
      {(title || description) && (
        <div className="flex flex-col px-2 gap-[5px] h-32">
          {title && <span className="font-bold leading-[22px] ">{title}</span>}
          {description && <span className="text-sm">{description}</span>}
          <div className="flex text-sm font-bold tracking-[2px] underline leading-5 h-8 flex-1 items-end">
            SHOP NOW
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoImageCard;
