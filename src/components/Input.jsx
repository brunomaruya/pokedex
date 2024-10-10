import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import React, { useContext, useEffect } from "react";
import { SearchContext } from "../context/SearchContext";

export default function Input() {
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const handleInputChange = (event) => {
    console.log(event.target.value);
    setSearchTerm(event.target.value);
  };

  return (
    <div className="flex items-center gap-3 w-full">
      <input
        value={searchTerm}
        onChange={handleInputChange}
        className="p-2 rounded-lg w-full  shadow-custom-xl"
        type="search"
        placeholder="Search eg, ditto or pikachu..."
      />
      <button className="p-2 rounded-lg bg-buttonRed text-white shadow-custom-xl hover:brightness-75 ">
        <MagnifyingGlassIcon className="w-6 h-6" />
      </button>
    </div>
  );
}
