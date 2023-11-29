import React from 'react';
import {Platform} from 'react-native';
import {themeColors} from '../theme/appTheme';
import Icon from 'react-native-vector-icons/Ionicons';
// import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StackNavigator} from './StackNavigator';
import {StackNavigatorSearch} from './StackNavigatorSearch';

/* este es el componente que se retornará y es quien tendrá el condicional para mostrar un aspecto u otro según el sistema operativo de iOS o Android */
export const BottomTabsNavigator = () => {
  return Platform.OS === 'ios' ? (
    <BottomTabsNavigatorIOS />
  ) : (
    <BottomTabsNavigatorIOS />
    // <BottomTabsNavigatorANDROID />
  );
};

/* IOS */
const BottomTabIOS = createBottomTabNavigator();

const BottomTabsNavigatorIOS = () => {
  return (
    <BottomTabIOS.Navigator
      sceneContainerStyle={{backgroundColor: '#fff'}}
      /* Las propiedades 'route' y 'navigation' siguen estando dentro de 'screenOptions'. */
      screenOptions={propsScreen => ({
        tabBarHideOnKeyboard: true, // cuando el keyboard o teclado esté activo entonces los tabs se oculten
        headerShown: false,
        tabBarActiveTintColor: themeColors.secondary,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'rgba(255, 255, 255, 0.93)',
          // marginVertical: 10,
          // backgroundColor: themeColors.white,
          height: Platform.OS === 'ios' ? 70 : 70,
          borderTopColor: '#eee',
          // borderTopWidth: 1,
          // elevation: 0,
          gap: 10,
        },
        tabBarLabelStyle: {
          fontSize: 14.5,
          fontWeight: 'bold',
        },
        tabBarIcon: propsTabBar => {
          let iconName: string = '';

          switch (propsScreen.route.name) {
            case 'StackNavigator':
              iconName = 'list-outline';
              break;

            case 'StackNavigatorSearch':
              iconName = 'search-outline';
              break;
          }
          return <Icon name={iconName} size={28} color={propsTabBar.color} />;
        },
      })}>
      {/* este es un stack de navegación entonces si sabe que puede o no navegar a otra pantalla */}
      <BottomTabIOS.Screen
        name="StackNavigator"
        options={{title: 'Pokemon List'}}
        component={StackNavigator}
      />
      {/* aquí se está mostrando solo un screen y no un stack de navegación entonces no sabe que puede o no navegar a otra pantalla y solo está infiriendo que puede moverse a otra pantalla entonces para mejorar el sistema de navegación crearemos otro stack para esta parte */}
      <BottomTabIOS.Screen
        name="StackNavigatorSearch"
        options={{title: 'Pokemon Search'}}
        component={StackNavigatorSearch}
      />
    </BottomTabIOS.Navigator>
  );
};

/* ANDROID */
// const BottomTabANDROID = createMaterialBottomTabNavigator();

// const BottomTabsNavigatorANDROID = () => {
//   return (
//     <BottomTabANDROID.Navigator
//       sceneAnimationType="shifting"
//       inactiveColor={themeColors.gray999}
//       activeColor={themeColors.secondary}
//       sceneAnimationEnabled={true}
//       barStyle={{
//         backgroundColor: themeColors.white,
//         borderTopColor: 'transparent',
//         borderTopWidth: 0,
//         elevation: 0,
//       }}
//       screenOptions={propsScreen => ({
//         tabBarIcon: propsTabBar => {
//           let iconName: string = '';

//           switch (propsScreen.route.name) {
//             case 'StackNavigator':
//               iconName = 'list-outline';
//               break;

//             case 'SearchScreen':
//               iconName = 'search-outline';
//               break;
//           }
//           return <Icon name={iconName} size={28} color={propsTabBar.color} />;
//         },
//       })}>
//       <BottomTabANDROID.Screen
//         name="StackNavigator"
//         options={{title: 'Pokemon List'}}
//         component={StackNavigator}
//       />
//       <BottomTabANDROID.Screen
//         name="SearchScreen"
//         options={{title: 'Pokemon Search'}}
//         component={SearchScreen}
//       />
//     </BottomTabANDROID.Navigator>
//   );
// };
