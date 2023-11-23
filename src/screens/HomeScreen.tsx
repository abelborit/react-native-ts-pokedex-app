import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
      <Icon name="star-outline" size={50} color="#900" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
