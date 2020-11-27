import React, { ReactElement } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Header({ title }: HeaderProps): ReactElement {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{title}</Text>
      <View style={styles.linha} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0067ba',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
  },
  titulo: {
    fontSize: 30,
    color: '#FFF',
  },
  linha: {
    backgroundColor: '#e8e000',
    height: 5,
    width: '100%',
  },
});

Header.defaultProps = {
  title: '',
};

type HeaderProps = {
  title?: string;
};
