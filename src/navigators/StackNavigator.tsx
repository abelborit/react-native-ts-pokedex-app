import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/HomeScreen';
import {PokemonScreen} from '../screens/PokemonScreen';

export type RootStackParams = {
  /* colocar las rutas que vamos a tener */
  HomeScreen: undefined; // undefined significa que la ruta no tiene parámetros
  PokemonScreen: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  return (
    /* screenOptions={{}} para personalizar varias cosas */
    <Stack.Navigator
      screenOptions={{
        // headerShown: false,
        headerStyle: {
          elevation: 0, // quitar la linea abajo del header en Android
          shadowColor: 'transparent', // quitar la linea abajo del header en iOS
          backgroundColor: '#ddd',
        },
        cardStyle: {
          backgroundColor: '#fff',
        },
      }}>
      <Stack.Screen
        name="HomeScreen"
        options={{title: 'Home'}}
        component={HomeScreen}
      />
      <Stack.Screen
        name="PokemonScreen"
        options={{title: 'Pokemon'}}
        component={PokemonScreen}
      />
    </Stack.Navigator>
  );
};
