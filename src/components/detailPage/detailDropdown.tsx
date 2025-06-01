import React, { useEffect, useState } from "react";
import Dropdown from "../dropdown";

interface DetailDropdownProps {
  data: string;
}

const DetailDropdown = ({ data }: DetailDropdownProps) => {
    const [detailList , setDetailList] = useState<string[]>([]);
    useEffect(() => {
        if (typeof window !== 'undefined') {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, "text/html");
        const list = Array.from(doc.querySelectorAll("li"))
          .map((p) => p.textContent?.trim() || "")
          .filter((text) => text.length > 0);
          setDetailList(list)
        }
    }, [data])

  return (
    <Dropdown title="Details">
      <ul className="detail-dropdown grid grid-cols-1 media-960:grid-cols-2">
        {detailList?.map((items, index) => {
          return <li className="col-span-1 mt-4 pl-3" key={index}>{items}</li>;
        })}
      </ul>
    </Dropdown>
  );
};

export default DetailDropdown;
