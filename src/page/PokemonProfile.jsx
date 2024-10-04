import React from "react";
import { useParams } from "react-router-dom";

export default function PokemonProfile() {
  const { id } = useParams();
  return <div>PokemonProfile: {id}</div>;
}
