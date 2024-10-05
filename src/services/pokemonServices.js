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
