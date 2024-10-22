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
  return (
    <React.Fragment>
      {Arrow(pokemon)}
      <div className="flex flex-col items-center ">
        <Link to={`/pokemon/${pokemon.pokemon.id}`}>
          {pokemon.pokemon.sprites.other["official-artwork"].front_default ? (
            <img
              className="w-20 h-20"
              src={
                pokemon.pokemon.sprites.other["official-artwork"].front_default
              }
              alt={pokemon.pokemon.name}
            />
          ) : (
            <img
              src={pokemon.pokemon.sprites.front_default}
              alt={pokemon.pokemon.name}
              className="w-full h-auto"
            />
          )}
        </Link>
        <div className="text-sm text-white">{pokemon.pokemon.name}</div>
      </div>
    </React.Fragment>
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
