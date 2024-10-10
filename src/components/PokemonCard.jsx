import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { idFormatter } from "../utils/idFormatter";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";
import { getPokemon, getPokemonSpecies } from "../services/pokemonServices";

export default function PokemonCard(data) {
  const pokemonName = data.pokemons;
  const [pokemonData, setPokemonData] = useState(null);
  const [speciesData, setSpeciesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const pokemonData = await getPokemon(pokemonName);
        const speciesData = await getPokemonSpecies(pokemonData.species.url);
        setPokemonData(pokemonData);
        setSpeciesData(speciesData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <div className="flex justify-between w-full p-5 rounded-lg bg-white shadow-custom-xl">
      <div className="flex flex-col gap-1">
        <span className="float-start flex gap-1">
          {pokemonData.types.map((type) => {
            return (
              <div
                key={type.type.name}
                className="py-1 px-3 text-xs text-white bg-buttonRed  rounded-full"
              >
                {type.type.name}
              </div>
            );
          })}
        </span>
        <h1 className="font-bold text-2xl">
          {capitalizeFirstLetter(pokemonName)}
        </h1>
        <div className="text-sm leading-4 mb-3">
          {speciesData?.flavor_text_entries
            .find((entry) => entry.language.name === "en")
            .flavor_text.replace(/\f/g, "")}
        </div>
        <Link to={`/pokemon/${pokemonData.name} `} className="mt-auto">
          <button className=" hover:brightness-75 bg-buttonRed text-white p-2 rounded-lg mt-auto">
            Know more
          </button>
        </Link>
      </div>

      <div>
        <span className="float-end">{idFormatter(pokemonData.id)}</span>
        <img
          src={pokemonData.sprites.other["official-artwork"].front_default}
          alt={pokemonName}
          className=""
        />
      </div>
    </div>
  );
}
