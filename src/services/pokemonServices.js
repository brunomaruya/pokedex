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

// const extractEvolutionUrls = (chain) => {
//   console.log(chain);
//   if (!chain) return;
//   const evolutionUrls = [];
//   while (chain) {
//     evolutionUrls.push(chain.species.url);
//     chain = chain.evolves_to[0];
//   }
//   return evolutionUrls;
// };

const extractEvolutionDatas = (chain) => {
  if (!chain) return;
  const evolutionData = []; // [[{},{}],[{},{}]]
  const secondEvolution = [];
  while (chain) {
    if (chain.length > 1) {
      for (let i = 0; i < chain.length; i++) {
        secondEvolution.push([
          {
            name: chain[i].species.name,
            url: chain[i].species.url,
            evolutionDetails: chain[i].evolution_details,
          },
        ]);
      }

      evolutionData.push(secondEvolution);
      chain = chain.evolves_to;
    } else {
      evolutionData.push([
        {
          name: chain.species.name,
          url: chain.species.url,
          evolutionDetails: chain.evolution_details,
        },
      ]);

      chain = chain.evolves_to[0];
    }
  }

  return evolutionData;
};

export const getPokemonEvolutionChain = async (url, name) => {
  try {
    if (!url) throw new Error("URL de evolução não fornecida.");

    // Faz a requisição para a URL de evolução
    const response = await axios.get(url);
    const evolutionChainUrl = response.data?.evolution_chain?.url;

    if (!evolutionChainUrl)
      throw new Error("URL da cadeia de evolução não encontrada.");

    // Requisição da cadeia de evolução
    const evolutionChainResponse = await axios.get(evolutionChainUrl);

    // Extrai URLs dos Pokémon da cadeia de evolução
    const datas = extractEvolutionDatas(evolutionChainResponse.data.chain);
    console.log(datas);
    // Função para obter dados de um Pokémon com verificação de erros
    const fetchPokemonData = async (data) => {
      const url = data[1]?.url;
      try {
        const response = await axios.get(url);
        const pokemonName = response.data?.name;
        if (!pokemonName) throw new Error("Nome do Pokémon não encontrado.");

        const pokemonResponse = await axiosInstance.get(
          `pokemon/${pokemonName}`
        );
        return pokemonResponse.data;
      } catch (err) {
        console.error(`Erro ao buscar dados do Pokémon da URL: ${url}`, err);
        throw err;
      }
    };

    // Faz as requisições para todas as evoluções em paralelo
    const evolutionDatas = await Promise.all(datas.map(fetchPokemonData));

    return evolutionDatas; // Retorna os dados das evoluções
  } catch (error) {
    console.error("Erro ao buscar a cadeia de evolução:", error);

    // Caso ocorra erro, tenta buscar o Pokémon original
    try {
      const pokemonResponse = await axiosInstance.get(`pokemon/${name}`);
      return [pokemonResponse.data]; // Retorna dados do Pokémon original como fallback
    } catch (fallbackError) {
      console.error("Erro ao buscar Pokémon original:", fallbackError);
      throw fallbackError; // Repassa o erro
    }
  }
};
