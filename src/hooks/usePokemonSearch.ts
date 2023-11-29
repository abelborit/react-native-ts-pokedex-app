import {useEffect, useState} from 'react';
import {pokemonAPI} from '../apis/pokemonAPI';
import {
  PokemonAPIResponseInterface,
  ResultsPokemonsInterface,
  SimplePokemonInterface,
} from '../interfaces/pokemonInterfaces';

/* aquí se cargarán todos los pokemones, luego se transformará según la interface de SimplePokemonInterface. Todo esto con el fin de tener un arreglo y a partir de ese arreglo hacer búsquedas */
export const usePokemonSearch = () => {
  /* se pone como simplePokemonList ya que será una lista con información básica del pokemon */
  const [simplePokemonList, setSimplePokemonList] = useState<
    SimplePokemonInterface[]
  >([]);
  const [isFetching, setIsFetching] = useState(true);

  const getFetchPokemons = async () => {
    setIsFetching(true);

    try {
      const response = await pokemonAPI.get<PokemonAPIResponseInterface>(
        'https://pokeapi.co/api/v2/pokemon?limit=1292',
      );

      refactorPokemonResponse(response.data.results);
    } catch (error) {
      return {
        errorFetch:
          error instanceof Error // es como un throw new Error("")
            ? error.message
            : '❌ An unknown error occurred in the request',
        // errorFetch: error,
      };
    } finally {
      setIsFetching(false);
    }
  };

  /* función para transformar la información que recibo de la petición de tipo ResultsPokemonsInterface[] a tipo SimplePokemonInterface[] */
  const refactorPokemonResponse = (pokemonList: ResultsPokemonsInterface[]) => {
    const newPokemonList: SimplePokemonInterface[] = pokemonList.map(
      pokemonElement => {
        /* se cortará la url de cada elemento de pokemonList para obtener su id. También se podría obtener su id de otras formas, por ejemplo hacer la petición a cada url y luego recuperar su id pero sería más costoso porque es hacer de nuevo una petición y eso demanda uso de recursos */

        /* pokemonElement.url: https://pokeapi.co/api/v2/pokemon/1/ */
        /* urlParts: ["https:", "", "pokeapi.co", "api", "v2", "pokemon", "1", ""] */
        /* idPokemon: 1 */
        const urlParts = pokemonElement.url.split('/');
        const idPokemon = urlParts[6]; // urlParts[urlParts.length - 2]

        /* esta url se consigue desde la respuesta que retorna al hacer la petición a cada pokemon en sprites -> other -> official-artwork solo que se está cortando todo y obtener los datos de una mejor forma para no hacer petición tras petición y gastar recursos adicionales */
        const picturePokemon = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${idPokemon}.png`;

        return {
          id: idPokemon,
          name: pokemonElement.name,
          picture: picturePokemon,
        };
      },
    );

    setSimplePokemonList(newPokemonList);
  };

  useEffect(() => {
    /* mantener la comprobación de que si el componente está montado para evitar actualizaciones de estado innecesarias después de que el componente se desmonte */
    /* Evitar la "condición de carrera" al actualizar el estado después de que el componente se desmontó https://react.dev/learn/you-might-not-need-an-effect */

    getFetchPokemons();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    simplePokemonList,
    isFetching,
  };
};
