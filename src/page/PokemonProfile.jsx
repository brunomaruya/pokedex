import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { idFormatter } from "../utils/idFormatter";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";
import { SpeakerWaveIcon } from "@heroicons/react/16/solid";
import InfoCard from "../components/InfoCard";

export default function PokemonProfile() {
  const [data, setData] = useState(null);
  const [speciesData, setSpeciesData] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const extractEvolutionNames = (chain) => {
    if (!chain) return;
    const evolutionNames = [];
    while (chain) {
      evolutionNames.push(chain.species.name);
      chain = chain.evolves_to[0];
    }
    return evolutionNames;
  };

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => {
        // console.log(response.data);
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    if (!data) return;
    axios
      .get(data.species.url)
      .then((response) => {
        // console.log(response.data);
        setSpeciesData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
      });
  }, [data]);

  useEffect(() => {
    if (!speciesData) return;
    axios
      .get(speciesData.evolution_chain.url)
      .then((response) => {
        // console.log(speciesData.evolution_chain.url);
        console.log(response.data.chain);
        setEvolutionChain(response.data.chain);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
      });
  }, [speciesData]);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error</div>;

  return (
    <main className="mb-20">
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
        {/* DESCRIPTION  */}
        <div>
          {speciesData?.flavor_text_entries
            .find((entry) => entry.language.name === "en")
            .flavor_text.replace(/\f/g, "")}
        </div>
        <div className="flex gap-2">
          <InfoCard label="Height" value={data.height / 10 + "m"} />
          <InfoCard label="Weight" value={data.weight / 10 + "kg"} />
        </div>
        {/* STATS  */}
        <h2 className="text-2xl font-bold">Stats</h2>
        <div className="grid grid-cols-2 gap-2">
          {data.stats.map((stat) => (
            <InfoCard
              label={capitalizeFirstLetter(stat.stat.name)}
              value={stat.base_stat}
            />
          ))}
        </div>
        {/* ABILITIES  */}
        <h2 className="text-2xl font-bold">Abilities</h2>
        <div className="grid grid-cols-2 gap-2">
          {data.abilities.map((ability) => (
            <InfoCard label={capitalizeFirstLetter(ability.ability.name)} />
          ))}
        </div>
      </section>
      {/* EVOLUTION CHAIN  */}
      <section>
        <h2 className="text-2xl font-bold text-white">Evolution </h2>
        <div>{extractEvolutionNames(evolutionChain).join(" -> ")}</div>
      </section>
    </main>
  );
}
