import React, { useContext } from "react";
import { useEffect, useState } from "react";
import logo2 from "../images/logo2.png";

import PokemonList from "../components/PokemonList";
import Input from "../components/Input";
import {
  getAllPokemons,
  getPokemonsByPage,
  getPokemonsBySearchTerm,
} from "../services/pokemonServices";
import Pagination from "../components/Pagination";
import useLocalStorage from "../hooks/useLocalStorage";
import { SearchContext } from "../context/SearchContext";

export default function Home() {
  const [pokemons, setPokemons] = useState(null);
  const [allPokemons, setAllPokemons] = useState(null);
  const [pokemonsByPage, setPokemonsByPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useLocalStorage("page", 1);
  const [totalPages, setTotalPages] = useState(0);
  const { searchTerm, setSearchTerm, setFilteredData, filteredData } =
    useContext(SearchContext);

  useEffect(() => {
    getAllPokemons(setAllPokemons, setLoading, setError);
  }, []);
  useEffect(() => {
    getPokemonsByPage(
      allPokemons,
      currentPage,
      setPokemonsByPage,
      setTotalPages
    );
  }, [allPokemons, currentPage]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  return (
    <div>
      <section className="flex justify-center ">
        <div className=" container flex flex-col items-center ">
          <img src={logo2} alt={logo2} className="mb-7" />
          <Input data={pokemons} />

          <PokemonList data={pokemonsByPage} />
          <Pagination
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </div>
      </section>
    </div>
  );
}
