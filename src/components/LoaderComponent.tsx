import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

export const LoaderComponent = () => {
  return (
    <View style={styles.indicatorContainer}>
      <ActivityIndicator size={60} color={'rgba(0, 0, 0, 0.5)'} />

      <Text>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  indicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});
