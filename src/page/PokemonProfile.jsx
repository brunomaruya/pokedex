import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PokemonProfile() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);
  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error</div>;

  return (
    <main>
      <section className="container bg-white">
        <img
          src={data.sprites.other["official-artwork"].front_default}
          alt={data.name}
        />
        <div></div>
      </section>
    </main>
  );
}
