import React, {useEffect, useState} from 'react';
import {StyleProp, StyleSheet, TextInput, View, ViewStyle} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {themeColors} from '../theme/appTheme';
import {useDebouncedValue} from '../hooks/useDebouncedValue';

interface SearchInputProps {
  styleProps?: StyleProp<ViewStyle>;
  handleDebounce: (value: string) => void;
}

export const SearchInput = ({styleProps, handleDebounce}: SearchInputProps) => {
  const [textToSearch, setTextToSearch] = useState('');
  const {debouncedValue} = useDebouncedValue(textToSearch, 400);

  useEffect(() => {
    handleDebounce(debouncedValue);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  return (
    <View style={[styles.container, styleProps]}>
      <View style={styles.inputContainer}>
        <TextInput
          style={{
            ...styles.inputStyle,
            color: themeColors.gray444,
          }}
          placeholderTextColor={themeColors.gray999}
          // onChangeText={setTextToSearch} // función por referencia
          onChangeText={inputValue => setTextToSearch(inputValue)} // función completa con parámetros
          value={textToSearch}
          placeholder="Search Pokemon by name or id..."
          autoCorrect={false} // para evitar que me corrija las palabras que voy escribiendo
          autoCapitalize="words"
          keyboardAppearance="default" // cambiar el color del teclado según también el theme de la configuración del celular. Por ahora funciona solo en iOS
        />

        <Icon name={'search-outline'} size={28} color={themeColors.gray999} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  inputContainer: {
    backgroundColor: '#F3F3F3',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
  },
  inputStyle: {
    flex: 1,
    marginRight: 10,
    fontSize: 16,
  },
});
