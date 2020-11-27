import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Investimento } from '../types/Investimento';
import { Consumer, RunnableImpl } from '../utils/types';

export default function InvestimentoItem({
  item,
  onClick = RunnableImpl,
}: InvestimentoItemProps) {
  const hasIndicadorCarencia = item?.indicadorCarencia === 'S';

  return (
    <View style={styles.container} onTouchEnd={_e => onClick(item)}>
      <View style={styles.header}>
        <Text
          style={
            hasIndicadorCarencia ? styles.tituloDesabilitado : styles.titulo
          }
        >
          {item?.nome}
        </Text>

        <Text
          style={hasIndicadorCarencia ? styles.valorDesabilitado : styles.valor}
        >
          {item?.saldoTotalDisponivel?.formatBrlMoneyWithoutPrefix()}
        </Text>
      </View>

      <View>
        <Text style={styles.descricao}>{item?.objetivo}</Text>
      </View>
    </View>
  );
}

type InvestimentoItemProps = {
  item: Investimento;
  onClick?: Consumer<Investimento>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    padding: 15,
    marginTop: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titulo: {
    fontSize: 20,
  },
  tituloDesabilitado: {
    fontSize: 20,
    color: '#AAA',
  },
  valor: {
    fontSize: 20,
  },
  valorDesabilitado: {
    fontSize: 20,
    color: '#AAA',
  },
  descricao: {
    color: '#AAA',
    fontSize: 15,
  },
});
