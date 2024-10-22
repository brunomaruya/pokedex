import { ArrowRightIcon } from "@heroicons/react/16/solid";
import React from "react";
import { Link } from "react-router-dom";

function Arrow(pokemon) {
  const evolutionDetails =
    pokemon.evolutionDetails[pokemon.evolutionDetails.length - 1];
  return (
    <>
      {pokemon.evolutionDetails.length > 0 && (
        <span className="mx-2 text-2xl flex flex-col items-center">
          <ArrowRightIcon className="h-6 w-6 text-white" />
          <div className="text-white text-sm">
            {evolutionDetails.min_level && "Lvl " + evolutionDetails.min_level}
            {evolutionDetails.item && evolutionDetails.item.name}
            {evolutionDetails.trigger.name == "trade" && "Trade"}
          </div>
        </span>
      )}
    </>
  );
}

function EvolutionDetails(pokemon) {
  const pokemonData = pokemon.pokemon;
  const pokemonSprites = pokemonData.sprites;
  const officialArtwork = pokemonSprites.other["official-artwork"];
  return (
    <>
      {Arrow(pokemon)}
      <Link
        className="flex flex-col items-center "
        to={`/pokemon/${pokemonData.id}`}
      >
        <img
          src={
            officialArtwork.front_default
              ? officialArtwork.front_default
              : pokemonSprites.front_default
          }
          alt={pokemonData.name}
          className="w-20 h-20"
        />
        <div className="text-sm text-white">{pokemonData.name}</div>
      </Link>
    </>
  );
}

export default function EvolutionStage({ pokemon }) {
  return (
    <>
      {pokemon.length > 1 ? (
        <div className="mx-2 text-2xl grid grid-cols-2  items-center">
          {pokemon.map((pokemon) => {
            return EvolutionDetails(pokemon);
          })}
        </div>
      ) : (
        EvolutionDetails(pokemon)
      )}
    </>
  );
}
