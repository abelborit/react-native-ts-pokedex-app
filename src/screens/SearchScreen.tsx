import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SearchInput} from '../components/SearchInput';
import {usePokemonSearch} from '../hooks/usePokemonSearch';
import {PokemonCard} from '../components/PokemonCard';
import {LoaderComponent} from '../components/LoaderComponent';
import {useState, useEffect} from 'react';
import {SimplePokemonInterface} from '../interfaces/pokemonInterfaces';

export const SearchScreen = () => {
  const [valueSearched, setValueSearched] = useState('');
  const [pokemonsFiltered, setPokemonsFiltered] = useState<
    SimplePokemonInterface[]
  >([]);
  const insets = useSafeAreaInsets();
  const dimensions = useWindowDimensions();
  const {simplePokemonList, isFetching} = usePokemonSearch();

  useEffect(() => {
    /* setear la lista a array vacio si no hay nada en el input */
    if (valueSearched.length === 0) {
      return setPokemonsFiltered([]);
    }

    /* validar que el valueSearched al ser transformado a número devuelva NaN (not a number) entonces significa que se está buscando por name y si es un número entonces está buscando por id */
    if (isNaN(Number(valueSearched))) {
      setPokemonsFiltered(
        simplePokemonList.filter(element =>
          element.name
            .toLocaleLowerCase()
            .includes(valueSearched.toLocaleLowerCase()),
        ),
      );
    } else {
      /* se hace de esta forma porque pokemonsFiltered asepta un array de tipo SimplePokemonInterface y lo que retorna simplePokemonList.find(element => element.id === valueSearched); es un solo elemento */
      const pokemonById = simplePokemonList.find(
        element => element.id === valueSearched,
      );
      setPokemonsFiltered(pokemonById ? [pokemonById] : []);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueSearched]);

  if (isFetching) {
    return <LoaderComponent />;
  }

  return (
    <View
      style={{
        ...styles.container,
        top: insets.top,
      }}>
      <SearchInput
        // handleDebounce={setValueSearched} // función por referencia
        handleDebounce={inputValue => setValueSearched(inputValue)} // función completa con parámetros
        styleProps={{
          position: 'absolute',
          top: insets.top + 20,
          zIndex: 999,
          width: dimensions.width - 40,
        }}
      />

      <View style={{...styles.flatListContainer}}>
        {/* ¿Cómo optimizar la carga de pokemones a medida que se hace Scroll? Se puede usar un VirtualizedList cuando hay mucha información. La virtualización mejora enormemente el consumo de memoria y el rendimiento de listas grandes al mantener una ventana de renderizado finita de elementos activos y reemplazando todos los elementos fuera de la ventana de renderizado con espacios en blanco del tamaño adecuado. La ventana se adapta al comportamiento de desplazamiento y los elementos se representan de forma incremental con bajo precio (después de cualquier interacción en ejecución) si están lejos del área visible, o con alto precio en caso contrario para minimizar la posibilidad de ver espacios en blanco. */}
        <FlatList
          keyboardDismissMode="on-drag" // al hacer scroll se oculte el teclado
          data={pokemonsFiltered}
          key={dimensions.height > dimensions.width ? '_' : '#'} // para evitar errores con el numColumns
          keyExtractor={item =>
            dimensions.height > dimensions.width ? '_' + item.id : '#' + item.id
          } // para evitar errores con el numColumns
          ListHeaderComponent={
            <>
              <Text style={{...styles.titleScreen, marginTop: insets.top + 90}}>
                {valueSearched ? valueSearched : 'Nothing searched yet'}
              </Text>

              {valueSearched.length > 1 && pokemonsFiltered.length === 0 ? (
                <View style={styles.noResultsContainer}>
                  <Image
                    source={require('../assets/pokemon-warning_640.png')}
                    style={styles.noResultsImage}
                  />

                  <Text style={{...styles.noResults}}>
                    Ups!...
                    {'\n'}❌ No results for this search ❌
                  </Text>
                </View>
              ) : null}
            </>
          }
          renderItem={({item}) => <PokemonCard pokemon={item} />} // se desestructura así porque item es de tipo SimplePokemonInterface y ahí viene de forma directa no como un objeto con sus llaves:valor
          showsVerticalScrollIndicator={false}
          numColumns={dimensions.height > dimensions.width ? 2 : 3}
          ListFooterComponent={<View style={{height: 80}} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    // marginBottom: 85,
  },
  flatListContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  titleScreen: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 5,
  },
  noResultsContainer: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  noResults: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#d00',
  },
  noResultsImage: {
    width: 240,
    height: 210,
    opacity: 0.7,
  },
});
