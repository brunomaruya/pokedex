import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import logo2 from "../images/logo2.png";

import PokemonList from "../components/PokemonList";
import Input from "../components/Input";
import { getPokemons } from "../services/pokemonServices";

export default function Home() {
  const [pokemons, setPokemons] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPokemons(setPokemons, setLoading, setError);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  return (
    <div>
      <section className="flex justify-center ">
        <div className=" container flex flex-col items-center ">
          <img src={logo2} alt={logo2} className="mb-7" />
          <Input />
          <PokemonList data={pokemons} />
        </div>
      </section>
    </div>
  );
}
