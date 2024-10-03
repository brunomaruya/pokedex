import React from "react";

export default function PokemonCard(data) {
  const { name, url } = data.data;
  return <div>{name}</div>;
}
