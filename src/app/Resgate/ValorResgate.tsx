import React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { Acao } from '../types/Investimento';
import { BiConsumer } from '../utils/types';

export default function ValorResgate({
  valor,
  onChange,
  errors,
  acao,
}: ValorResgateProps) {
  function handleChange(value: string): void {
    if (isNaN(Number(value))) {
      onChange(acao, 0);
      return;
    }
    onChange(acao, Number(value));
  }

  return (
    <View style={styles.bloco}>
      <View style={styles.item}>
        <Text style={styles.label}>Valor a resgatar</Text>

        <TextInput value={valor.toString()} onChangeText={handleChange} />

        {errors.map((msg, index) => (
          <Text key={index} style={styles.errorMessage}>
            {msg}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bloco: {
    paddingTop: 1,
    paddingBottom: 1,
  },
  item: {
    backgroundColor: '#FFF',
    padding: 5,
    justifyContent: 'space-between',
  },
  label: {
    color: '#AAA',
  },
  errorMessage: {
    color: '#A00',
  },
});

type ValorResgateProps = {
  valor: number;
  acao: Acao;
  onChange: BiConsumer<Acao, number>;
  errors: string[];
};
