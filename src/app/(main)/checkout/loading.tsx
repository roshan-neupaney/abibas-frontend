import React from "react";

const LoadingHome = () => {
  return (
    <div className="p-4 m-auto media-960:max-w-[1280px] h-4/5">
      {/* title header */}
      <div
        className="m-auto max-w-[1175px] uppercase text-lg font-bold tracking-[1px] p-4"
        style={{ fontFamily: "var(--font-adineue)" }}
      >
        Hi!
      </div>
      <div className="m-auto max-w-[1175px] px-4 ">
        <div className="my-10 ">
          <div
            className="flex items-center justify-center uppercase text-3xl"
            style={{ fontFamily: "var(--font-adineue)" }}
          >
            Checkout
          </div>
        </div>
      </div>
      {/* shoeList */}

      <div className="flex justify-center items-center h-1/2">
        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-black animate-progress"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingHome;
