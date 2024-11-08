"use client";
import Image from "next/image";
import React, { useState } from "react";
import arrow from "../public/icon/arrow-down.svg";

interface DropdownProps {
  children?: any;
  title: string;
}

const Dropdown = ({ children, title }: DropdownProps) => {
  const [open, toggleOpen] = useState(false);
  return (
    <div>
      <div
        className="flex flex-1 justify-between "
        onClick={() => toggleOpen(!open)}
      >
        <div className="py-8 px-4 flex flex-1">
          <div className="font-bold leading-6">{title}</div>
        </div>
        <span className={`${open ? "rotate-180" : "rotate-0"} flex`}>
          <Image src={arrow} width={30} height={30} alt="arrow" />
        </span>
      </div>
      {open && <div className="p-4">{children}</div>}
    </div>
  );
};

export default Dropdown;
