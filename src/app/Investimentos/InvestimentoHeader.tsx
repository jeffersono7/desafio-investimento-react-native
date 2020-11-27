import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function InvestimentoHeader() {
  return (
    <View style={style.container}>
      <Text style={style.texto}>INVESTIMENTOS</Text>
      <Text style={style.texto}>R$</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
  },
  texto: {
    fontSize: 20,
    flexDirection: 'row',
    color: '#AAA'
  },
});
