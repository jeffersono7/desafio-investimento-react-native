import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Runnable } from '../utils/types';

export default function ResgateEfetuado({ close }: ResgateEfetuadoProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>RESGATE EFETUADO!</Text>
      <Text style={styles.texto}>
        O valor solicitado estará em sua conta em até 5 dias úteis!
      </Text>
      <Button title='NOVO RESGATE' color="#e8e000" onPress={close} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    padding: 30,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.85,
    elevation: 100,
  },
  titulo: {
    fontSize: 30,
    color: '#004',
  },
  texto: {
    fontSize: 15,
    color: '#004',
    paddingTop: 20,
    paddingBottom: 20,
  },
});

type ResgateEfetuadoProps = {
  close: Runnable;
};
