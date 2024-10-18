import React from "react";
import { Link } from "react-router-dom";

export default function EvolutionStage({ pokemon }) {
  return (
    <>
      {pokemon.length > 1 ? (
        <span className="mx-2 text-2xl">
          {pokemon.map((pokemon) => {
            return (
              <div className="flex flex-col items-center">
                <Link to={`/pokemon/${pokemon.pokemon.id}`}>
                  {pokemon.pokemon.sprites.other["official-artwork"]
                    .front_default ? (
                    <img
                      className="w-20 h-20"
                      src={
                        pokemon.pokemon.sprites.other["official-artwork"]
                          .front_default
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
            );
          })}
        </span>
      ) : (
        <div className="flex flex-col items-center">
          <Link to={`/pokemon/${pokemon.pokemon.id}`}>
            {pokemon.pokemon.sprites.other["official-artwork"].front_default ? (
              <img
                className="w-20 h-20"
                src={
                  pokemon.pokemon.sprites.other["official-artwork"]
                    .front_default
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
      )}
    </>
  );
}
