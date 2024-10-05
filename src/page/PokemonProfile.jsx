import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { idFormatter } from "../utils/idFormatter";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";
import { ArrowRightIcon, SpeakerWaveIcon } from "@heroicons/react/16/solid";
import InfoCard from "../components/InfoCard";
import {
  getPokemon,
  getPokemonEvolutionChain,
  getPokemonSpecies,
} from "../services/pokemonServices";

export default function PokemonProfile() {
  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const extractEvolutionDatas = (chain) => {
    if (!chain) return;
    const evolutionDatas = [];
    while (chain) {
      evolutionDatas.push(chain.species.name);
      chain = chain.evolves_to[0];
    }
    return evolutionDatas;
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const pokemonData = await getPokemon(id);
        const speciesData = await getPokemonSpecies(id);
        const evolutionDatas = await getPokemonEvolutionChain(id);
        setPokemon(pokemonData);
        setSpecies(speciesData);
        setEvolutionChain(evolutionDatas);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error</div>;

  return (
    <main className="mb-20">
      <section className="container flex flex-col p-5 bg-white rounded-lg shadow-custom-xl">
        {/* IMAGE */}
        <img
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt={pokemon.name}
        />
        {/* HEADER */}
        <div className="flex justify-between w-full ">
          <div>{idFormatter(pokemon.id)}</div>
          <div>
            <SpeakerWaveIcon className="w-6 h-6" />
          </div>
        </div>
        <h1 className="text-3xl font-bold">
          {capitalizeFirstLetter(pokemon.name)}
        </h1>
        {/* TYPES  */}
        <div className="float-start flex gap-1">
          {pokemon.types.map((type) => {
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
          {species?.flavor_text_entries
            .find((entry) => entry.language.name === "en")
            .flavor_text.replace(/\f/g, "")}
        </div>
        <div className="flex gap-2">
          <InfoCard label="Height" value={pokemon.height / 10 + "m"} />
          <InfoCard label="Weight" value={pokemon.weight / 10 + "kg"} />
        </div>
        {/* STATS  */}
        <h2 className="text-2xl font-bold">Stats</h2>
        <div className="grid grid-cols-2 gap-2">
          {pokemon.stats.map((stat) => (
            <InfoCard
              label={capitalizeFirstLetter(stat.stat.name)}
              value={stat.base_stat}
            />
          ))}
        </div>
        {/* ABILITIES  */}
        <h2 className="text-2xl font-bold">Abilities</h2>
        <div className="grid grid-cols-2 gap-2">
          {pokemon.abilities.map((ability) => (
            <InfoCard label={capitalizeFirstLetter(ability.ability.name)} />
          ))}
        </div>
      </section>
      {/* EVOLUTION CHAIN  */}
      <section>
        <h2 className="text-2xl font-bold text-white">Evolution </h2>

        <div className="flex justify-between items-center">
          {evolutionChain.map((pokemon, index) => (
            <React.Fragment key={pokemon.id}>
              <div className="flex flex-col items-center">
                <img
                  className="w-20 h-20"
                  src={pokemon.sprites.other["official-artwork"].front_default}
                  alt={pokemon.name}
                />
                <span className="text-sm text-white">{pokemon.name}</span>
              </div>
              {/* Renderize a seta apenas se não for o último Pokémon */}
              {index < evolutionChain.length - 1 && (
                <span className="mx-2 text-2xl">
                  <ArrowRightIcon className="h-6 w-6 text-white" />
                </span> // Aumenta o tamanho da seta
              )}
            </React.Fragment>
          ))}
        </div>
      </section>
    </main>
  );
}
