import React from "react";
import PokemonCard from "./PokemonCard";

export default function PokemonList(data) {
  const {
    data: { results },
  } = data;

  if (!results) return <div>No results</div>;

  return (
    <section className="mt-10 flex flex-col gap-3 w-full">
      {results.map((result) => (
        <PokemonCard key={result.name} data={result} />
      ))}
    </section>
  );
}
