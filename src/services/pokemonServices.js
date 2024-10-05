import axiosInstance from "./axiosInstance";

export const getPokemons = async () => {
  try {
    const response = await axiosInstance.get("pokemon");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
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
