import React, { useEffect, useState } from "react";
import Dropdown from "../dropdown";

interface DescriptionDropdownProps {
  data: string;
}

const DescriptionDropdown = ({ data }: DescriptionDropdownProps) => {
  const [content, setContent] = useState({ title: "", paragraphs: [""] });
  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, "text/html");
    const title = doc.querySelector("h3 strong")?.textContent || "";
    const paragraphs = Array.from(doc.querySelectorAll("p"))
      .map((p) => p.textContent?.trim() || "")
      .filter((text) => text.length > 0);

    setContent({ title, paragraphs });
  }, [data]); // Filter out empty paragraphs
  return (
    <Dropdown title="Description">
      <div
        className="font-bold text-3xl uppercase"
        style={{ fontFamily: "var(--font-adineue)" }}
      >
        {content.title}
      </div>
      <br />
      <div>{content.paragraphs}</div>
    </Dropdown>
  );
};

export default DescriptionDropdown;
