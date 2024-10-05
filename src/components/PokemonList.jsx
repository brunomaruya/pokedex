import React from "react";
import PokemonCard from "./PokemonCard";

export default function PokemonList(data) {
  const {
    data: { results },
  } = data;

  if (!results) return <div>No results</div>;

  return (
    <section className="mt-10 flex flex-col gap-3 w-full sm:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {results.map((result) => (
        <PokemonCard key={result.name} data={result} />
      ))}
    </section>
  );
}
