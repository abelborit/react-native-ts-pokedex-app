import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {SimplePokemonInterface} from '../interfaces/pokemonInterfaces';
import {FadeInImage} from './FadeInImage';
import {getColorsHelper} from '../helpers/getColorsHelper';
import {useEffect, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParams} from '../navigators/StackNavigator';

interface PokemonCardProps {
  pokemon: SimplePokemonInterface;
}

export const PokemonCard = ({pokemon}: PokemonCardProps) => {
  const dimensions = useWindowDimensions();
  const [bgColor, setBgColor] = useState('#777');
  const isMountedRef = useRef(true);
  const navigator = useNavigation<StackNavigationProp<RootStackParams>>(); // forma un poco más directa usando el RootStackParams desde StackNavigator.tsx

  useEffect(() => {
    const getCardColors = async () => {
      const {primaryColor = '#777'} = await getColorsHelper(pokemon.picture);
      /* como sabemos el componente FlatList muestra sus elementos aplicando lazyload y en este caso tenemos componentes que cambian el estado basado en el lazyload. El FlatList en un determinado punto destruye los elementos de arriba y en este caso puede ser que aún no tengamos el color para aplicarle al fondo de la card, es decir, si carga la aplicación y hacemos scroll para abajo muy rápido entonces veremos la card de un color gris que colocamos como estado inicial y también puede ser que nos salga un error relacionado al estado de que no se puede cambiar el estado a un componente que no está montado y pueden haber fugas de memoria y tampoco es buena práctica cambiar el estado de un componente desmontado. Entonces tenemos que validar si el componente está montado o destruido para poder hacer recién su cambio de color. Si no está montado entonces no hay que mandar a llamar nada y si está montado entonces recién cambiar su color */
      if (!isMountedRef.current) return;

      setBgColor(primaryColor);
    };

    getCardColors();

    return () => {
      isMountedRef.current = false;
    };
  }, [pokemon.picture]);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() =>
        navigator.navigate('PokemonScreen', {
          simplePokemon: pokemon,
          color: bgColor,
        })
      }>
      <View
        style={{
          ...styles.cardContainer,
          backgroundColor: bgColor || '#777',
          width:
            dimensions.height > dimensions.width
              ? dimensions.width * 0.42
              : dimensions.width * 0.25,
        }}>
        <View style={styles.infoContainer}>
          <Text style={styles.nameStyle}>{pokemon.name}</Text>
          <Text style={styles.idStyle}>#{pokemon.id}</Text>
        </View>

        <View style={styles.imageContainer}>
          <FadeInImage
            uriProp={pokemon.picture}
            animatedImageStyle={styles.imageStyle}
          />
        </View>

        <View style={styles.pokeballContainer}>
          <Image
            source={require('../assets/pokeball-white.png')}
            style={styles.pokeballCard}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 12,
    marginVertical: 12,
    height: 150,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoContainer: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  nameStyle: {
    fontWeight: 'bold',
    textTransform: 'capitalize',
    fontSize: 24,
    color: '#fff',
    paddingTop: 5,
    paddingHorizontal: 10,
  },
  idStyle: {
    fontSize: 22,
    color: '#fff',
    opacity: 0.5,
    paddingHorizontal: 10,
  },
  imageContainer: {
    position: 'absolute',
    top: 32,
    right: -16,
  },
  imageStyle: {
    width: 135,
    height: 135,
    zIndex: 999,
  },
  pokeballContainer: {
    width: 155,
    height: 155,
    position: 'absolute',
    bottom: 0,
    right: 0,
    opacity: 0.35,
    overflow: 'hidden',
  },
  pokeballCard: {
    width: 155,
    height: 155,
    position: 'absolute',
    bottom: -40,
    right: -40,
  },
});
