import React, {useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  ImageErrorEventData,
  ImageStyle,
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  View,
} from 'react-native';
import {useAnimation} from '../hooks/useAnimation';

interface FadeInImageProps {
  uriProp: string;
  animatedImageStyle?: StyleProp<ImageStyle>;
  // animatedImageStyle?: Animated.WithAnimatedObject<ImageStyle>; // de esa forma tengo el predictivo como si se tratara de cualquier otro componente
}

/* si se entra a la ruta de Infinite Scroll en el Menu Options y luego se retrocede rápidamente puede ser que salga un warning de que se quiso cambiar el estado de un componente que no está montado y eso se puede solucionar colocando una referencia a este componente y en un useEffect validar que si el componente está montado entonces hacer su lógica y si no está montado entonces no hacer nada. Esto ayudará a optimizar la aplicación y evitar estos warnings de estado */
export const FadeInImage = ({
  uriProp = require('../assets/no-image.png'),
  animatedImageStyle = {},
}: FadeInImageProps) => {
  /* se utiliza este useState solo para simular que la imagen se está cargando. Este estado siempre es true entonces siempre se mostrará el <ActivityIndicator /> y como tiene su posición absolute entonces ocupa el mismo tamaño de su contenedor padre pero este <ActivityIndicator /> es tapado por la imagen es por eso que no se nota pero si a la imagen se le pone un opacity: 0.3, se notará. También a la imagen se le está colocando un zIndex: 999 para asegurarnos que siempre esté por encima y no se note el <ActivityIndicator /> cuando la imagen carga. Ahora hay que hacer uso de setIsLoading porque sino siempre habría un componente que es el <ActivityIndicator /> que no se usa para nada y puede afectar al rendimiento */
  const [isLoading, setIsLoading] = useState(true);

  const {
    opacityAnimated,
    fadeIn /* , positionAnimated, startMovingPosition */,
  } = useAnimation();

  const handleFinishLoading = () => {
    setIsLoading(false); // cambiar el estado a false para evitar tener un componente sin utilizar como el <ActivityIndicator />
    fadeIn(); // cuando la carga de la imagen ya terminó se utilizará el fadeIn para simular ese efecto
    // startMovingPosition(-200, 1000);
  };

  const handleError = (
    errorImage: NativeSyntheticEvent<ImageErrorEventData>,
  ) => {
    console.log(errorImage);

    setIsLoading(false);
  };

  return (
    <View style={[styles.container, animatedImageStyle]}>
      {isLoading && (
        <ActivityIndicator
          style={{position: 'absolute'}}
          size={70}
          color={'rgba(0, 0, 0, 0.5)'}
        />
      )}

      <Animated.Image
        source={{uri: uriProp}}
        onLoadEnd={handleFinishLoading} // cuando la carga de la imagen termine entonces se puede pasar una función con efectos, lógica, etc...
        onError={handleError}
        style={[
          // styles.imageStyle,
          animatedImageStyle,
          {
            opacity: opacityAnimated,
            // transform: [
            //   {
            //     translateX: positionAnimated,
            //   },
            // ],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  // imageStyle: {
  //   width: '100%',
  //   height: 300,
  //   marginVertical: 8,
  //   borderRadius: 20,
  //   zIndex: 999,
  // },
});
