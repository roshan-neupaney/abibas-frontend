"use client";

import Image, { StaticImageData } from "next/image";
import { CSSProperties } from "react";

interface CustomInputProps {
  title?: string;
  value: string | number;
  onChange?: (value: string) => void;
  placeholder?: string;
  style?: CSSProperties;
  type?: string;
  disabled?: boolean;
  search?: boolean;
  rightIcon?: string | StaticImageData;
  multiline?: boolean;
  iconClick?: () => void;
  rows?: number;
  error?: string;
  required?: boolean;
  autoComplete?: 'on' | 'off';
  width?: string;
}
const CustomInput = ({
  title,
  value,
  onChange,
  type,
  placeholder,
  disabled = false,
  rightIcon,
  iconClick,
  multiline = false,
  rows,
  style = {},
  error = "",
  required = false,
  autoComplete = "on",
  width = "",
}: CustomInputProps) => {
  return (
    <div
      className="flex flex-1 flex-col items-start gap-0.5 self-stretch"
      style={{ width: width }}
    >
      <div className="flex flex-col self-stretch relative gap-2">
        {title && (
          <span className="label" style={{ color: error ? "red" : "#1a1c1e" }}>
            {title}
            {required ? "*" : ""}
          </span>
        )}
        {!multiline ? (
          <input
            className="form-input"
            value={value}
            type={type}
            onChange={(e) => {
              if (type === "number") {
                if (/[0-9]/.test(e.target.value) || e.target.value === "") {
                  onChange?.(e.target.value);
                }
              } else {
                onChange?.(e.target.value);
              }
            }}
            placeholder={placeholder}
            disabled={disabled}
            style={{
              ...style,
              border: error ? "1px solid red" : "1px solid #767677",
            }}
            required={required}
            autoComplete={autoComplete}
          />
        ) : (
          <textarea
            className="form-input"
            value={value}
            rows={rows}
            onChange={(e) => {
              onChange?.(e.target.value);
            }}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            style={{
              ...style,
              border: error ? "1px solid red" : "1px solid #92959a",
            }}
          />
        )}
        {rightIcon && (
          <span className="password-visibility" onClick={iconClick}>
            <Image src={rightIcon} width={20} height={20} alt="" />
          </span>
        )}
      </div>
      <div className="text-red-500 text-xs">{error}</div>
    </div>
  );
};

export default CustomInput;
