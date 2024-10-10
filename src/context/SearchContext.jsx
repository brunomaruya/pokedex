import React, { createContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

// Criação do contexto
export const SearchContext = createContext();

// Criação do provider que vai fornecer o contexto
export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useLocalStorage("search", "");
  // const [searchTerm, setSearchTerm] = useState("");

  const [filteredData, setFilteredData] = useLocalStorage("filteredData", []);

  return (
    <SearchContext.Provider
      value={{ searchTerm, setSearchTerm, filteredData, setFilteredData }}
    >
      {children}
    </SearchContext.Provider>
  );
};
