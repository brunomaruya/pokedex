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
      allPokemons = allPokemons.concat(response.data.results);
      if (response.data.results.length < limit) {
        fetching = false; // Não há mais Pokémon para buscar
      }
      offset += limit; // Aumenta o offset para a próxima página
    }

    setPokemons(allPokemons); // Atualiza o estado com todos os Pokémon
    setLoading(false);
  } catch (error) {
    console.error("Error fetching all pokemons:", error);
    setError(error);
    setLoading(false);
    throw error; // Opcional: você pode lançar o erro para tratá-lo em outro lugar
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
    if (allPokemons) {
      const itemsPerPage = 48;
      const indexOfLastItem = currentPage * itemsPerPage; //ex: 1 * 48 = 48; ex: 2 * 48 = 96
      const indexOfFirstItem = indexOfLastItem - itemsPerPage; //ex: 48 - 48 = 0; ex: 96 - 48 = 48
      const currentItems = allPokemons.slice(indexOfFirstItem, indexOfLastItem);
      const totalPages = Math.ceil(allPokemons.length / itemsPerPage);
      setTotalPages(totalPages);
      setPokemonsByPage(currentItems);
    }
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
    console.log("filtered pokemons", filteredPokemons);
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
export const getPokemonSpecies = async (name) => {
  const newName = name.split("-")[0];
  try {
    const response = await axiosInstance.get(`pokemon-species/${newName}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar espécies:", error);
    throw error;
  }
};

const extractEvolutionNames = (chain) => {
  if (!chain) return;
  const evolutionName = [];
  while (chain) {
    evolutionName.push(chain.species.name);
    chain = chain.evolves_to[0];
  }
  return evolutionName;
};

export const getPokemonEvolutionChain = async (id) => {
  console.log(id);
  try {
    const response = await axiosInstance.get(`pokemon-species/${id}`);
    const evolutionChainUrl = response.data.evolution_chain.url;
    const evolutionChainResponse = await axiosInstance.get(evolutionChainUrl);
    const names = extractEvolutionNames(evolutionChainResponse.data.chain);

    const evolutionDatas = [];
    for (const name of names) {
      const response = await axiosInstance.get(`pokemon/${name}`);
      evolutionDatas.push(response.data);
    }
    return evolutionDatas;
  } catch (error) {
    console.error("Erro ao buscar evoluções:", error);
    throw error;
  }
};
