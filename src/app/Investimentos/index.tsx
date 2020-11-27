import React, { ReactElement, useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import useInvestimentoApi from '../api/InvestimentoApi';
import { Investimento } from '../types/Investimento';
import { BiConsumer } from '../utils/types';
import InvestimentoHeader from './InvestimentoHeader';
import InvestimentoItem from './InvestimentoItem';

export default function Investimentos({
  navigation,
}: InvestimentoProps): ReactElement {
  const { obterInvestimentos } = useInvestimentoApi();
  const [investimentos, setInvestimentos] = useState<Investimento[]>([]);

  function onClickItem(item: Investimento): void {
    if (item?.indicadorCarencia === 'N') {
      navigation.navigate('Resgate', { investimento: item });
    }
  }

  useEffect(() => {
    obterInvestimentos().then(setInvestimentos);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <InvestimentoHeader />

      <FlatList
        style={styles.lista}
        data={investimentos}
        renderItem={({ item }) => (
          <InvestimentoItem item={item} onClick={onClickItem} />
        )}
        keyExtractor={(_item, index) => index.toString()}
      />
    </SafeAreaView>
  );
}

type InvestimentoProps = {
  navigation: {
    navigate: BiConsumer<string, Record<string, any>>;
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'flex-start',
  },
  lista: {
    width: '100%',
  },
});
