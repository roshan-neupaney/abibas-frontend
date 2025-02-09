'use client'
import CustomSearchInput from "@/subcomponents/searchInput";
import React, { useState } from "react";
import SearchIcon from "../../public/icon/search.svg";
import { useRouter } from "next/navigation";

const Search = () => {
    const [search, setSearch] = useState('')
    const router = useRouter();
    const keyPress = (e:any) => {
        if(e.key === 'Enter' && search)
            router.push(`/search?search=${search}`)
    }
  return (
    <div>
      <CustomSearchInput
        value= {search}
        onChange={(val: string) => {
          setSearch(val)
        }}
        onKeyPress={keyPress}
        placeholder="Search"
        rightIcon={SearchIcon}
      />
    </div>
  );
};

export default Search;
