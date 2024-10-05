import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { idFormatter } from "../utils/idFormatter";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";

export default function PokemonCard(data) {
  const { name, url } = data.data;
  const [pokemonData, setPokemonData] = useState(null);
  const [speciesData, setSpeciesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setPokemonData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  useEffect(() => {
    if (!pokemonData) return;
    axios
      .get(pokemonData.species.url)
      .then((response) => {
        setSpeciesData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
      });
  }, [pokemonData]);

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
        <h1 className="font-bold text-2xl">{capitalizeFirstLetter(name)}</h1>
        <div className="text-sm leading-4 mb-3">
          {speciesData?.flavor_text_entries
            .find((entry) => entry.language.name === "en")
            .flavor_text.replace(/\f/g, "")}
        </div>
        <Link to={`/pokemon/${pokemonData.id} `} className="mt-auto">
          <button className=" hover:brightness-75 bg-buttonRed text-white p-2 rounded-lg mt-auto">
            Know more
          </button>
        </Link>
      </div>

      <div>
        <span className="float-end">{idFormatter(pokemonData.id)}</span>
        <img
          src={pokemonData.sprites.other["official-artwork"].front_default}
          alt={name}
          className=""
        />
      </div>
    </div>
  );
}
