import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {PokemonScreen} from '../screens/PokemonScreen';
import {SimplePokemonInterface} from '../interfaces/pokemonInterfaces';
import {SearchScreen} from '../screens/SearchScreen';

export type RootStackParams = {
  /* colocar las rutas que vamos a tener */
  SearchScreen: undefined; // undefined significa que la ruta no tiene parámetros
  PokemonScreen: {simplePokemon: SimplePokemonInterface; color: string};
};

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigatorSearch = () => {
  return (
    /* screenOptions={{}} para personalizar varias cosas */
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        // headerStyle: {
        //   elevation: 0, // quitar la linea abajo del header en Android
        //   shadowColor: 'transparent', // quitar la linea abajo del header en iOS
        //   backgroundColor: '#ddd',
        // },
        cardStyle: {
          backgroundColor: '#fff',
        },
      }}>
      <Stack.Screen
        name="SearchScreen"
        options={{title: 'Search'}}
        component={SearchScreen}
      />
      <Stack.Screen
        name="PokemonScreen"
        options={{title: 'Pokemon'}}
        component={PokemonScreen}
      />
    </Stack.Navigator>
  );
};
