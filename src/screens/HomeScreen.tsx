import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {PokemonCard} from '../components/PokemonCard';
import {usePokemonPaginated} from '../hooks/usePokemonPaginated';

export const HomeScreen = React.memo(() => {
  const insets = useSafeAreaInsets();
  const {simplePokemonList, nextPageUrlRef, getFetchPokemons} =
    usePokemonPaginated();
  const dimensions = useWindowDimensions();

  return (
    <View
      style={{
        ...styles.container,
        marginTop: insets.top + 15,
        // marginBottom: insets.bottom + 15,
        // marginLeft: insets.left + 15,
        // marginRight: insets.right + 15,
      }}>
      <Image
        source={require('../assets/pokeball.png')}
        style={styles.pokeballBGTop}
      />

      <Image
        source={require('../assets/pokeball.png')}
        style={styles.pokeballBGBottom}
      />

      <View style={styles.flatListContainer}>
        {/* ¿Cómo optimizar la carga de pokemones a medida que se hace Scroll? Se puede usar un VirtualizedList cuando hay mucha información. La virtualización mejora enormemente el consumo de memoria y el rendimiento de listas grandes al mantener una ventana de renderizado finita de elementos activos y reemplazando todos los elementos fuera de la ventana de renderizado con espacios en blanco del tamaño adecuado. La ventana se adapta al comportamiento de desplazamiento y los elementos se representan de forma incremental con bajo precio (después de cualquier interacción en ejecución) si están lejos del área visible, o con alto precio en caso contrario para minimizar la posibilidad de ver espacios en blanco. */}
        <FlatList
          data={simplePokemonList}
          key={dimensions.height > dimensions.width ? '_' : '#'} // para evitar errores con el numColumns
          keyExtractor={item =>
            dimensions.height > dimensions.width ? '_' + item.id : '#' + item.id
          } // para evitar errores con el numColumns
          ListHeaderComponent={<Text style={styles.titleScreen}>Pokedex</Text>}
          renderItem={({item}) => <PokemonCard pokemon={item} />} // se desestructura así porque item es de tipo SimplePokemonInterface y ahí viene de forma directa no como un objeto con sus llaves:valor
          showsVerticalScrollIndicator={false}
          numColumns={dimensions.height > dimensions.width ? 2 : 3}
          onEndReached={() => getFetchPokemons()} // función que se dispara cuando llega al fondo de la pantalla. Se está pasando por referencia o la referencia de la función handleLoadMoreData ya que de la forma tradicional sería ()=> handleLoadMoreData()
          onEndReachedThreshold={0.4} // nos indica qué tan lejos debemos de estar del fondo de la pantalla (en este caso 0.4 que sería como un 40% de la pantalla de la parte de abajo) para que que se lance onEndReached={}
          ListFooterComponent={
            <View
              style={{
                marginVertical: 15,
                marginBottom: 80,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {!nextPageUrlRef ? (
                <Text>Final de la página...</Text>
              ) : (
                <ActivityIndicator size={35} color={'#d00'} />
              )}
            </View>
          }
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatListContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  pokeballBGTop: {
    width: 300,
    height: 300,
    position: 'absolute',
    top: -80,
    right: -80,
    opacity: 0.2,
  },
  pokeballBGBottom: {
    width: 250,
    height: 250,
    position: 'absolute',
    bottom: -80,
    left: -80,
    opacity: 0.2,
  },
  titleScreen: {
    textAlign: 'center',
    fontSize: 40,
    letterSpacing: 1,
    fontWeight: 'bold',
    color: '#333',
  },
});
