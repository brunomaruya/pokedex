import axios from "axios";
import React, { useEffect, useState } from "react";

export default function PokemonCard(data) {
  const { name, url } = data.data;
  const [pokemonData, setPokemonData] = useState(null);
  const [speciesData, setSpeciesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const idFormatter = (id) => {
    return "#" + id.toString().padStart(3, "0");
  };

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
    <div className="flex justify-between w-full p-5 rounded-lg bg-white ">
      <div>
        <h1 className="font-bold text-2xl">
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </h1>
        <div>
          {speciesData?.flavor_text_entries
            .find((entry) => entry.language.name === "en")
            .flavor_text.replace(/\f/g, "")}
        </div>
      </div>

      <div className="">
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
