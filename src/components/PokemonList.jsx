import React from "react";
import PokemonCard from "./PokemonCard";

export default function PokemonList(data) {
  const {
    data: { results },
  } = data;

  if (!results) return <div>No results</div>;

  return (
    <section>
      {results.map((result) => (
        <PokemonCard key={result.name} data={result} />
      ))}
    </section>
  );
}
