import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {PokemonAPIDetailResponseInterface} from '../interfaces/pokemonInterfaces';
import {FadeInImage} from './FadeInImage';

interface PokemonDetailsProps {
  pokemonDetails: PokemonAPIDetailResponseInterface;
}

export const PokemonDetails = ({pokemonDetails}: PokemonDetailsProps) => {
  return (
    <ScrollView
      style={{...styles.container /* , ...StyleSheet.absoluteFillObject */}}>
      <View style={styles.infoContainer}>
        {/* TYPES */}
        <View>
          <Text style={{...styles.title, marginBottom: 2}}>Types</Text>
          {pokemonDetails.types.map(element => (
            <Text
              style={{...styles.infoContent, textTransform: 'capitalize'}}
              key={element.type.name}>
              - {element.type.name}
            </Text>
          ))}
        </View>

        {/* WEIGHT */}
        <View>
          <Text style={{...styles.title, marginBottom: 2}}>Weight</Text>
          <Text style={{...styles.infoContent, textTransform: 'capitalize'}}>
            {pokemonDetails.weight / 10} Kg
          </Text>
        </View>

        {/* SPRITES */}
        <View>
          <Text style={{...styles.title, marginBottom: 2}}>Sprites</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <FadeInImage
              uriProp={pokemonDetails.sprites.front_default}
              animatedImageStyle={styles.basicSprites}
            />
            <FadeInImage
              uriProp={pokemonDetails.sprites.back_default}
              animatedImageStyle={styles.basicSprites}
            />
            <FadeInImage
              uriProp={pokemonDetails.sprites.front_shiny}
              animatedImageStyle={styles.basicSprites}
            />
            <FadeInImage
              uriProp={pokemonDetails.sprites.back_shiny}
              animatedImageStyle={styles.basicSprites}
            />
          </View>
        </View>

        {/* BASE ABILITIES */}
        <View>
          <Text style={{...styles.title, marginBottom: 2}}>Base Abilities</Text>
          {pokemonDetails.abilities.map(element => (
            <Text
              style={{...styles.infoContent, textTransform: 'capitalize'}}
              key={element.ability.name}>
              - {element.ability.name}
            </Text>
          ))}
        </View>

        {/* MOVES */}
        <View>
          <Text style={{...styles.title, marginBottom: 2}}>Moves</Text>
          <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 10}}>
            {pokemonDetails.moves.map(element => (
              <Text
                style={{...styles.infoContent, textTransform: 'capitalize'}}
                key={element.move.name}>
                *{element.move.name}
              </Text>
            ))}
          </View>
        </View>

        {/* STATS */}
        <View>
          <Text style={{...styles.title, marginBottom: 2}}>Initial Stats</Text>
          <View>
            {pokemonDetails.stats.map((element, index) => (
              <View
                key={element.stat.name + index}
                style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    ...styles.infoContent,
                    textTransform: 'capitalize',
                    width: 135,
                  }}>
                  {element.stat.name}
                </Text>

                <Text
                  style={{
                    ...styles.infoContent,
                    textTransform: 'capitalize',
                    fontWeight: 'bold',
                  }}>
                  : {element.base_stat}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* POKEBALLS */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 20,
          }}>
          <Image
            source={require('../assets/pokeball.png')}
            style={styles.pokeballCard}
          />
          <FadeInImage
            uriProp={pokemonDetails.sprites.front_default}
            animatedImageStyle={styles.basicFinalSprites}
          />
          <Image
            source={require('../assets/pokeball.png')}
            style={styles.pokeballCard}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  infoContainer: {
    marginVertical: 20,
    marginHorizontal: 30,
    gap: 20,
  },
  title: {
    fontSize: 28,
    color: '#444',
    fontWeight: 'bold',
  },
  infoContent: {
    fontSize: 18,
    color: '#444',
  },
  basicSprites: {
    width: 100,
    height: 100,
  },
  basicFinalSprites: {
    width: 100,
    height: 100,
    marginVertical: -20,
    marginHorizontal: 5,
  },
  pokeballCard: {
    width: 35,
    height: 35,
  },
});
