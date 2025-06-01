import React from "react";

const LoadingHome = () => {
  return (
    <div className="p-4 m-auto media-960:max-w-[1280px] h-screen">
      {/* title header */}
      <div className="flex justify-between mb-4 media-600:mb-5 media-960:mb-8 mt-1">
        <div>
          <span
            className="font-bold uppercase text-2xl media-600:text-3xl xl:text-[40px] tracking-[2px]"
            style={{ fontFamily: "var(--font-adineue)" }}
          >
            Shoes
          </span>{" "}
          <span className="text-xs text-[#767677]">
            (0)
          </span>
        </div>
        
      </div>
      {/* shoeList */}
      
      <div className="flex justify-center items-center h-4/5">
        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-black animate-progress"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingHome;
