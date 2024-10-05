import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { idFormatter } from "../utils/idFormatter";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";
import { SpeakerWaveIcon } from "@heroicons/react/16/solid";

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
      <section className="container flex flex-col p-5 bg-white rounded-lg shadow-custom-xl">
        {/* IMAGE */}
        <img
          src={data.sprites.other["official-artwork"].front_default}
          alt={data.name}
        />
        {/* HEADER */}
        <div className="flex justify-between w-full ">
          <div>{idFormatter(data.id)}</div>
          <div>
            <SpeakerWaveIcon className="w-6 h-6" />
          </div>
        </div>
        <h1 className="text-3xl font-bold">
          {capitalizeFirstLetter(data.name)}
        </h1>
        {/* TYPES  */}

        <div className="float-start flex gap-1">
          {data.types.map((type) => {
            return (
              <div
                key={type.type.name}
                className="py-1 px-3 text-xs text-white bg-buttonRed  rounded-full"
              >
                {type.type.name}
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
