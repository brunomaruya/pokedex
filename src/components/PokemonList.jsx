import React, { useEffect } from "react";
import PokemonCard from "./PokemonCard";

export default function PokemonList(pokemons) {
  if (!pokemons.data) return <div>No results</div>;

  console.log(pokemons);
  return (
    <section className="mt-10 flex flex-col gap-3 w-full sm:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {pokemons &&
        pokemons.data.map((pokemon) => (
          <PokemonCard key={pokemon.name} pokemons={pokemon.name} />
        ))}
    </section>
  );
}
