import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { idFormatter } from "../utils/idFormatter";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";
import { ArrowRightIcon, SpeakerWaveIcon } from "@heroicons/react/16/solid";
import InfoCard from "../components/InfoCard";
import {
  getPokemon,
  getPokemonEvolutionChain,
  getPokemonSpecies,
} from "../services/pokemonServices";
import EvolutionStage from "../components/EvolutionStage";

export default function PokemonProfile() {
  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const pokemonData = await getPokemon(id);
        setPokemon(pokemonData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchPokemonSpecies = async () => {
      if (!pokemon) return;
      const speciesData = await getPokemonSpecies(pokemon.species.url);
      const evolutionDatas = await getPokemonEvolutionChain(
        pokemon.species.url,
        pokemon.name
      );
      setEvolutionChain(evolutionDatas);
      setSpecies(speciesData);
    };
    fetchPokemonSpecies();
  }, [pokemon]);

  const playPokemonSound = (pokemonSound) => {
    const audio = new Audio(pokemonSound);
    audio.play();
  };

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error</div>;

  return (
    <main className="container max-w-[1024px] mx-auto mb-20">
      <section className="container flex flex-col md:flex-row md:justify-around p-5 bg-white rounded-lg shadow-custom-xl">
        {/* IMAGE */}
        {pokemon.sprites.other["official-artwork"].front_default ? (
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
            className="w-full h-auto object-contain "
          />
        ) : (
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="w-full h-auto object-contain"
          />
        )}

        {/* HEADER */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-between w-full ">
            <div>{idFormatter(pokemon.id)}</div>
            <button
              onClick={() => {
                playPokemonSound(pokemon.cries.latest);
              }}
            >
              <SpeakerWaveIcon className="w-6 h-6" />
            </button>
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
            {pokemon.stats.map((stat, index) => (
              <InfoCard
                key={index}
                label={capitalizeFirstLetter(stat.stat.name)}
                value={stat.base_stat}
              />
            ))}
          </div>
          {/* ABILITIES  */}
          <h2 className="text-2xl font-bold">Abilities</h2>
          <div className="grid grid-cols-2 gap-2">
            {pokemon.abilities.map((ability, index) => (
              <InfoCard
                key={index}
                label={capitalizeFirstLetter(ability.ability.name)}
              />
            ))}
          </div>
        </div>
      </section>
      {/* EVOLUTION CHAIN  */}
      <section>
        <h2 className="text-2xl font-bold text-white ml-5">Evolution </h2>

        <div className="flex justify-around items-center">
          {evolutionChain.map((pokemon, index) => (
            <React.Fragment key={index}>
              {/* Renderize a seta apenas se não for o último Pokémon */}

              {index > 0 && index < evolutionChain.length + 1 && (
                <span className="mx-2 text-2xl">
                  <div className="text-white">
                    {pokemon.evolutionDetails.length > 0 && (
                      <div>
                        {
                          pokemon.evolutionDetails[
                            pokemon.evolutionDetails.length - 1
                          ].min_level
                        }
                      </div>
                    )}
                  </div>
                  <ArrowRightIcon className="h-6 w-6 text-white" />
                </span> // Aumenta o tamanho da seta
              )}
              <EvolutionStage pokemon={pokemon} />
            </React.Fragment>
          ))}
        </div>
      </section>
    </main>
  );
}
