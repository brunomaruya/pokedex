import React, { createContext, useState } from "react";

// Criação do contexto
export const SearchContext = createContext();

// Criação do provider que vai fornecer o contexto
export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
};
