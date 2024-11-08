import React from "react";

const CartPage = () => {
  return (
    <div className="px-4 media-960:flex-row flex flex-col">
      {/* list of items */}
      <div className="flex flex-1 flex-col">
        <div className="px-8 py-8 mt-10 mb-5 bg-[#ECEFF1] greeting-card relative">
          <span
            className="text-lg uppercase "
            style={{ fontFamily: "var(--font-adineue)" }}
          >
            Hello Roshan
          </span>
        </div>
        <div className="mt-4">
            <span className="uppercase text-3xl" style={{ fontFamily: "var(--font-adineue)" }}>your bag</span>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default CartPage;
