import axios from "axios";
import axiosInstance from "./axiosInstance";

export const getAllPokemons = async (setPokemons, setLoading, setError) => {
  try {
    const limit = 100;
    let allPokemons = [];
    let offset = 0;
    let fetching = true;
    while (fetching) {
      const response = await axiosInstance.get(
        `pokemon?limit=${limit}&offset=${offset}`
      );
      const results = response.data.results;
      allPokemons = allPokemons.concat(results);
      offset += limit;
      if (results.length < limit) fetching = false;
    }
    setPokemons(allPokemons);
  } catch (error) {
    console.error("Error fetching all pokemons:", error);
    setError(error);
    throw error;
  } finally {
    setLoading(false);
  }
};

export const getPokemonsByPage = async (
  allPokemons,
  currentPage,
  setPokemonsByPage,
  setTotalPages
) => {
  if (!allPokemons) return;

  try {
    const itemsPerPage = 48;
    const indexOfLastItem = currentPage * itemsPerPage; //ex: 1 * 48 = 48; ex: 2 * 48 = 96
    const indexOfFirstItem = indexOfLastItem - itemsPerPage; //ex: 48 - 48 = 0; ex: 96 - 48 = 48
    const currentItems = allPokemons.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(allPokemons.length / itemsPerPage);
    setTotalPages(totalPages);
    setPokemonsByPage(currentItems);
  } catch (error) {
    console.log("Error fetching pokemons by page: " + error.message);
  }
};

export const getPokemonsBySearchTerm = async (
  allPokemons,
  searchTerm,
  setPokemonsBySearchTerm
) => {
  if (!allPokemons) return;

  try {
    const filteredPokemons = allPokemons.filter((pokemon) =>
      pokemon.name.includes(searchTerm)
    );
    setPokemonsBySearchTerm(filteredPokemons);
  } catch (error) {
    console.error("Error fetching pokemons by search term:", error);
  }
};

export const getPokemon = async (id) => {
  try {
    const response = await axiosInstance.get(`pokemon/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getPokemonSpecies = async (url) => {
  try {
    if (!url) return;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar espécies:", error);
    throw error;
  }
};

const extractEvolutionDatas = (chain) => {
  if (!chain) return;
  chain = [chain];

  const evolutionData = [];
  const nextEvolution = [];
  while (chain.length > 0) {
    if (chain.length > 1) {
      for (let i = 0; i < chain.length; i++) {
        nextEvolution.push([
          {
            name: chain[i].species.name,
            pokemonSpeciesUrl: chain[i].species.url,
            evolutionDetails: chain[i].evolution_details,
          },
        ]);
      }
      evolutionData.push(nextEvolution);
      break;
    }

    evolutionData.push([
      {
        name: chain[0].species.name,
        pokemonSpeciesUrl: chain[0].species.url,
        evolutionDetails: chain[0].evolution_details,
      },
    ]);
    chain = chain[0].evolves_to;
  }

  return evolutionData;
};

export const getPokemonEvolutionChain = async (url, name) => {
  try {
    if (!url) return;
    const response = await axios.get(url);
    const evolutionChainUrl = response.data?.evolution_chain?.url;
    if (!evolutionChainUrl) return;
    const evolutionChainResponse = await axios.get(evolutionChainUrl);
    const datas = extractEvolutionDatas(evolutionChainResponse.data.chain);

    const fetchPokemonData = async (data) => {
      if (data.length > 1) {
        let nextEvolution = [];
        for (let i = 0; i < data.length; i++) {
          const url = data[i][0]?.pokemonSpeciesUrl;

          try {
            const response = await axios.get(url);
            const pokemonName = response.data?.name;
            const pokemonResponse = await axiosInstance.get(
              `pokemon/${pokemonName}`
            );

            nextEvolution.push({
              pokemon: pokemonResponse.data,
              evolutionDetails: data[i][0]?.evolutionDetails,
            });
          } catch (err) {
            console.error(
              `Erro ao buscar dados do Pokémon da URL: ${url}`,
              err
            );
            throw err;
          }
        }

        return nextEvolution;
      }

      const url = data[0]?.pokemonSpeciesUrl;
      try {
        const response = await axios.get(url);
        const pokemonId = response.data?.id;
        if (!pokemonId) throw new Error("Nome do Pokémon não encontrado.");

        const pokemonResponse = await axiosInstance.get(`pokemon/${pokemonId}`);
        return {
          pokemon: pokemonResponse.data,
          evolutionDetails: data[0]?.evolutionDetails,
        };
      } catch (err) {
        console.error(`Erro ao buscar dados do Pokémon da URL: ${url}`, err);
        throw err;
      }
    };

    const evolutionDatas = await Promise.all(datas.map(fetchPokemonData));

    return evolutionDatas;
  } catch (error) {
    console.error("Erro ao buscar a cadeia de evolução:", error);

    try {
      const pokemonResponse = await axiosInstance.get(`pokemon/${name}`);
      return [pokemonResponse.data];
    } catch (fallbackError) {
      console.error("Erro ao buscar Pokémon original:", fallbackError);
      throw fallbackError;
    }
  }
};
