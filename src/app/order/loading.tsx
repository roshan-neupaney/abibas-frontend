import React from "react";

const LoadingHome = () => {
  return (
    <div className="px-4 flex flex-col max-w-[1280px] m-auto gap-5 h-4/5">
      {/* title header */}
      <div className="px-8 py-8 mt-10 bg-[#ECEFF1] greeting-card relative w-2/3 ">
          <span
            className="text-lg uppercase "
            style={{ fontFamily: "var(--font-adineue)" }}
          >
            Hello
          </span>
        </div>
        <div className="mt-4">
          <span
            className="uppercase text-3xl"
            style={{ fontFamily: "var(--font-adineue)" }}
          >
            your orders
          </span>
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
