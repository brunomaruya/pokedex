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
    console.error("Error fetching Pokémon:", error);
    setError(error);
    setLoading(false);
    throw error; // Opcional: você pode lançar o erro para tratá-lo em outro lugar
  }
};

export const getPokemonsByPage = async (
  setPokemons,
  setLoading,
  setError,
  currentPage,
  setTotalPages
) => {
  const limit = 48;
  setLoading(true);
  try {
    const offset = (currentPage - 1) * limit;
    const response = await axiosInstance.get(
      `pokemon?limit=${limit}&offset=${offset}`
    );
    console.log(response.data.results);
    setPokemons(response.data.results);
    setTotalPages(Math.ceil(response.data.count / limit)); // Define o total de páginas
  } catch (error) {
    setError(error);
  } finally {
    setLoading(false);
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
export const getPokemonSpecies = async (id) => {
  try {
    const response = await axiosInstance.get(`pokemon-species/${id}`);
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
