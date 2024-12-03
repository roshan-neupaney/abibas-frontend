"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import ArrowIcon from "../../public/icon/arrow-down.svg";
import Image from "next/image";

interface SelectOption {
  id: string;
  label: string;
}

interface CustomSelectProps {
  title: string;
  value: string[] | string;
  data: SelectOption[];
  onChange?: ((value: string[]) => void) | ((value: string) => void);
  placeholder?: string;
  style?: React.CSSProperties;
  required?: boolean;
  error?: string;
  className?: string;
  sx?: React.CSSProperties;
}

const useDropdownPosition = (
  openBox: boolean,
  inputBoxRef: React.RefObject<HTMLDivElement>,
  dropdownOptionRef: React.RefObject<HTMLDivElement>
) => {
  const [dropdownPosition, setDropdownPosition] = useState("bottom");

  useEffect(() => {
    const handleResize = () => {
      if (inputBoxRef.current && dropdownOptionRef.current) {
        const inputBox = inputBoxRef.current.getBoundingClientRect();
        const dropDownHeight =
          dropdownOptionRef.current.scrollHeight > 240
            ? 240
            : dropdownOptionRef.current.scrollHeight;

        const viewportHeight = window.innerHeight;
        const spaceBelow = viewportHeight - inputBox.bottom;
        if (spaceBelow < dropDownHeight) {
          setDropdownPosition("top");
        } else {
          setDropdownPosition("bottom");
        }
      }
    };
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleResize);
    if (openBox) {
      handleResize();
    }
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleResize);
    };
  }, [openBox, inputBoxRef, dropdownOptionRef]);

  return dropdownPosition;
};

const CustomSelect = ({
  title,
  value,
  data = [],
  onChange,
  placeholder = "",
  style = {},
  required = false,
  error = "",
  className = "",
  sx = {},
}: CustomSelectProps) => {
  const [openBox, toggleBox] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);
  const selectRef = useRef<HTMLDivElement | null>(null);
  const dropdownOptionRef = useRef<HTMLDivElement | null>(null);
  const inputBoxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (value) {
      if (typeof value === "string") {
        data?.forEach((element) => {
          if (element?.id === value ) {
            setSelectedValue(element?.label);
          }
        });
      }
    }
  }, [data, value]);
  const dropdownPosition = useDropdownPosition(
    openBox,
    inputBoxRef,
    dropdownOptionRef
  );

  const handleClickOutside = useCallback((event: any) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      toggleBox(false);
    }
  }, []);
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
  }, [handleClickOutside]);

  return (
    <div
      className={`flex flex-1 flex-col items-start gap-0.5 self-stretch ${className}`}
      ref={inputBoxRef}
      style={{ ...sx }}
    >
      <div className="flex flex-col self-stretch relative gap-2">
        <div className="label" style={{ color: error ? "red" : "#1a1c1e" }}>
          {title}
          {required ? "*" : ""}{" "}
        </div>
        <div
          className="form-input select-box cursor-pointer justify-between bg-[#ffffff]"
          ref={selectRef}
          style={{
            ...style,
            border: error ? "1px solid red" : "1px solid #92959a",
          }}
          onClick={() => {
            toggleBox(!openBox);
          }}
        >
          {selectedValue ? (
            <span className="">{selectedValue}</span>
          ) : (
            <span className="" style={{ color: "#9ca3be" }}>
              {placeholder}
            </span>
          )}
          <span
            className="select-arrow"
            style={{
              transform: openBox ? "rotate(-180deg)" : "rotate(0deg)",
              transition: "0.3s",
            }}
          >
            <Image src={ArrowIcon} alt="" width={20} height={20} />
          </span>
        </div>
        <div
          className={`${
            openBox ? "max-h-60 border border-[#92959a]" : "max-h-[0]"
          } ${
            dropdownPosition === "top" ? "bottom-[51px]" : "top-[85px]"
          } option-box `}
          ref={dropdownOptionRef}
        >
          {data?.map((elements: any, index: number) => {
            return (
              <div
                key={index}
                onClick={() => {
                  setSelectedValue(`${elements.label}`);
                  toggleBox(!openBox);
                  onChange?.(elements?.id);
                }}
                className={`p-2 flex  hover:bg-[#dcdce6]`}
                style={{backgroundColor: selectedValue === elements.label ? '#EAEEEF' : '' }}
              >
                {elements.label}
              </div>
            );
          })}
        </div>
      </div>
      <div className="text-red-500 text-xs">{error}</div>
    </div>
  );
};

export default CustomSelect;

export const CustomMultiSelect = ({
  title,
  value,
  data,
  onChange,
  placeholder = "",
  style = {},
  required = false,
  error = "",
}: CustomSelectProps) => {
  const [openBox, toggleBox] = useState(false);
  const selectRef = useRef<HTMLDivElement | null>(null);
  const dropdownOptionRef = useRef<HTMLDivElement | null>(null);
  const inputBoxRef = useRef<HTMLDivElement | null>(null);

  const selectedLabels = useMemo(
    () =>
      data
        .filter((element) => value.includes(element.id))
        .map((element) => element.label),
    [data, value]
  );

  const dropdownPosition = useDropdownPosition(
    openBox,
    inputBoxRef,
    dropdownOptionRef
  );

  const handleClickOutside = useCallback((event: any) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      toggleBox(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [handleClickOutside]);
  const handleValue = (val: string) => {
    if (Array.isArray(value)) {
      const updatedValue = value.includes(val)
        ? value.filter((item) => item !== val)
        : [...value, val];
      (onChange as (value: string[]) => void)?.(updatedValue);
    }
  };

  return (
    <div className="form-box" ref={inputBoxRef}>
      <div className="flex flex-col self-stretch relative gap-2">
        <div className="label" style={{ color: error ? "red" : "#1a1c1e" }}>
          {title}
          {required ? "*" : ""}{" "}
        </div>
        <div
          className="form-input select-box cursor-pointer justify-between"
          ref={selectRef}
          style={{
            ...style,
            border: error ? "1px solid red" : "1px solid #92959a",
          }}
          onClick={() => toggleBox(!openBox)}
        >
          <span className="">
            {selectedLabels.length > 0
              ? selectedLabels.join(", ")
              : placeholder}
          </span>
          <span
            className="select-arrow"
            style={{
              transform: openBox ? "rotate(-90deg)" : "rotate(90deg)",
              transition: "0.3s",
            }}
          >
            <Image src={ArrowIcon} alt="Arrow Icon" width={20} height={20} />
          </span>
        </div>
        <div
          className={`${
            openBox ? "max-h-60 border border-[#92959a]" : "max-h-[0]"
          } ${
            dropdownPosition === "top" ? "bottom-[38px]" : "top-[65px]"
          } option-box`}
          ref={dropdownOptionRef}
        >
          {data.map((element) => (
            <div
              key={element.id}
              onClick={() => handleValue(element.id)}
              className={`select-options  ${
                value.includes(element.id) ? "bg-slate-400" : ""
              }`}
            >
              {element.label}
            </div>
          ))}
        </div>
      </div>
      <div className="error-label h-1">{error}</div>
    </div>
  );
};
