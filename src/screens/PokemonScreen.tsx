import React from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../navigators/StackNavigator';
import {FadeInImage} from '../components/FadeInImage';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {usePokemonDetails} from '../hooks/usePokemonDetails';
import {PokemonDetails} from '../components/PokemonDetails';

interface PokemonScreenProps
  extends StackScreenProps<RootStackParams, 'PokemonScreen'> {}

export const PokemonScreen = ({navigation, route}: PokemonScreenProps) => {
  const insets = useSafeAreaInsets();
  const dimensions = useWindowDimensions();
  const params = route.params;
  const {pokemonDetails, isLoading} = usePokemonDetails(
    params.simplePokemon.id,
  );

  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles.headerContainer,
          flexDirection:
            dimensions.height > dimensions.width ? 'column' : 'row',
          height:
            dimensions.height > dimensions.width
              ? dimensions.height * 0.27
              : dimensions.height * 0.32,
          backgroundColor: params.color,
        }}>
        <TouchableOpacity
          style={{
            ...styles.btnBack,
            top: insets.top + 15,
            left: insets.left + 15,
          }}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('HomeScreen')}>
          <Icon name="arrow-back-outline" size={35} color="#fff" />
        </TouchableOpacity>

        <View style={styles.pokeballContainer}>
          <Image
            source={require('../assets/pokeball-white.png')}
            style={styles.pokeballCard}
          />
        </View>

        <View
          style={{
            ...styles.imageContainer,
            bottom: dimensions.height > dimensions.width ? -30 : -25,
          }}>
          <FadeInImage
            uriProp={params.simplePokemon.picture}
            animatedImageStyle={{
              ...styles.imageStyle,
              width: dimensions.height > dimensions.width ? 205 : 140,
              height: dimensions.height > dimensions.width ? 205 : 140,
            }}
          />
        </View>
      </View>

      <View
        style={{
          ...styles.pokemonNameContainer,
          marginTop: dimensions.height > dimensions.width ? 25 : 25,
        }}>
        <Text
          style={{
            ...styles.pokemonName,
            fontSize: dimensions.height > dimensions.width ? 40 : 25,
            paddingVertical: dimensions.height > dimensions.width ? 10 : 6,
          }}>
          {params.simplePokemon.name}
        </Text>

        <Text
          style={{
            ...styles.pokemonId,
            fontSize: dimensions.height > dimensions.width ? 40 : 25,
            paddingVertical: dimensions.height > dimensions.width ? 10 : 6,
          }}>
          #{params.simplePokemon.id}
        </Text>
      </View>

      {isLoading ? (
        <View style={styles.loadingIndicator}>
          <ActivityIndicator size={50} color={'#444'} />
        </View>
      ) : (
        <PokemonDetails pokemonDetails={pokemonDetails} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnBack: {
    position: 'absolute',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
    elevation: 99, // como el z-index pero para Android
  },
  headerContainer: {
    zIndex: 999,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    position: 'absolute',
  },
  imageStyle: {
    zIndex: 999,
  },
  pokemonNameContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pokemonName: {
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    color: '#444',
  },
  pokemonId: {
    position: 'absolute',
    right: 50,
    color: '#444',
    opacity: 0.25,
  },
  pokeballContainer: {
    width: 250,
    height: 250,
    position: 'absolute',
    bottom: 0,
    opacity: 0.25,
    overflow: 'hidden',
  },
  pokeballCard: {
    width: 250,
    height: 250,
    position: 'absolute',
    bottom: -50,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
