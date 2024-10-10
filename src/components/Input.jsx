import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import React, { useContext, useEffect } from "react";
import { SearchContext } from "../context/SearchContext";

export default function Input({ data }) {
  const { searchTerm, setSearchTerm, setFilteredData } =
    useContext(SearchContext);
  const handleInputChange = (event) => {
    // event.preventDefault();
    console.log(event.target.value);
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    if (data) {
      const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filteredData); // Atualiza os dados filtrados no contexto
    }
  }, [searchTerm, data]);

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
