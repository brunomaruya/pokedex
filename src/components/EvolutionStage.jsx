import { ArrowRightIcon } from "@heroicons/react/16/solid";
import React from "react";
import { Link } from "react-router-dom";

function Arrow(index, pokemon, evolutionChain) {
  return (
    <>
      {pokemon.evolutionDetails.length > 0 && (
        <span className="mx-2 text-2xl">
          <ArrowRightIcon className="h-6 w-6 text-white" />
          <div className="text-white">
            {pokemon.evolutionDetails.length > 0 && (
              <div>
                {
                  pokemon.evolutionDetails[pokemon.evolutionDetails.length - 1]
                    .min_level
                }
              </div>
            )}
          </div>
        </span> // Aumenta o tamanho da seta
      )}
    </>
  );
}

function EvolutionDetails(pokemon) {
  return (
    <React.Fragment>
      {Arrow(pokemon.index, pokemon, pokemon.evolutionChain)}
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
