import 'react-native-gesture-handler';
import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {DefaultTheme} from './src/theme/appTheme';
import {BottomTabsNavigator} from './src/navigators/BottomTabsNavigator';

const theme = {
  ...DefaultTheme,
};

export const App = () => {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <BottomTabsNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
};
