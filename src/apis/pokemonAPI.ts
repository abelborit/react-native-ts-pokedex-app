/* instancia: objetos concretos que tienen su propio estado (los valores de sus atributos) y su propio comportamiento (los métodos que pueden ejecutar) */
/* pokemonAPI es una instancia para centrar todas las peticiones y configuraciones (token, cabeceras, etc.) que utilizará o puede utilizar en un futuro la API de https://pokeapi.co/docs/v2 en este caso se crea una instancia simple */

import axios from 'axios';

export const pokemonAPI = axios.create();
