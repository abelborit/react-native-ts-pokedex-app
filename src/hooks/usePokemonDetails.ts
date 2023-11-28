import {useEffect, useState} from 'react';
import {pokemonAPI} from '../apis/pokemonAPI';
import {PokemonAPIDetailResponseInterface} from '../interfaces/pokemonInterfaces';

export const usePokemonDetails = (pokemonId: string) => {
  const [pokemonDetails, setPokemonDetails] =
    useState<PokemonAPIDetailResponseInterface>(
      /* usando ({} as PokemonAPIDetailResponseInterface) es inicializarlo como objeto vacío y si no hay la propiedad me retornará un undefined. Si no se coloca y no existe la propiedad entonces me retornará un error. Se puede trabajar de cualquier forma según lo que se necesite */
      {} as PokemonAPIDetailResponseInterface,
    );
  const [isLoading, setIsLoading] = useState(true);

  const getFetchPokemons = async () => {
    setIsLoading(true);

    try {
      const response = await pokemonAPI.get<PokemonAPIDetailResponseInterface>(
        `https://pokeapi.co/api/v2/pokemon/${pokemonId}`,
      );

      setPokemonDetails(response.data);
    } catch (error) {
      return {
        errorFetch:
          error instanceof Error // es como un throw new Error("")
            ? error.message
            : '❌ An unknown error occurred in the request',
        // errorFetch: error,
      };
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    /* mantener la comprobación de que si el componente está montado para evitar actualizaciones de estado innecesarias después de que el componente se desmonte */
    /* Evitar la "condición de carrera" al actualizar el estado después de que el componente se desmontó https://react.dev/learn/you-might-not-need-an-effect */

    getFetchPokemons();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isLoading,
    pokemonDetails,
  };
};
