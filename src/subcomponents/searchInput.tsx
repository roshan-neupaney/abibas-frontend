// "use client";

import Image from "next/image";

interface CustomSearchInputProps {
  title?: string;
  value: any;
  onChange?: any;
  placeholder?: string;
  style?: any;
  type?: string;
  disabled?: boolean;
  search?: boolean;
  rightIcon?: any;
  iconClick?: any;
  required?: boolean;
  autoComplete?: string;
  width?: string;
  onKeyPress?: any;
}
const CustomSearchInput = ({
  title,
  value,
  onChange,
  type,
  placeholder,
  disabled = false,
  rightIcon = null,
  iconClick = null,
  style = {},
  required = false,
  autoComplete = "on",
  width = "",
  onKeyPress
}: CustomSearchInputProps) => {
  return (
    <div
      className="flex flex-col items-start gap-0.5"
      style={{ width: width }}
    >
      <div className="flex flex-col relative gap-2">
        {title && (
          <span className="label" style={{ color: "#1a1c1e" }}>
            {title}
            {required ? "*" : ""}
          </span>
        )}
        <input
          className="p-3 bg-[#ECEFF1] text-sm font-black focus:border-0"
          value={value}
          type={type}
          onChange={(e) => {
            if (type === "number") {
              if (/[0-9]/.test(e.target.value) || e.target.value === "") {
                onChange(e.target.value);
              }
            } else {
              onChange(e.target.value);
            }
          }}
          placeholder={placeholder}
          disabled={disabled}
          style={{
            ...style,
            height: "35px"
          }}
          required={required}
          autoComplete={autoComplete}
          onKeyDown={onKeyPress}
        />
        {rightIcon && (
          <span className="absolute right-2 top-1/4" onClick={iconClick}>
            <Image src={rightIcon} width={20} height={20} alt="" />
          </span>
        )}
      </div>
      
    </div>
  );
};

export default CustomSearchInput;
