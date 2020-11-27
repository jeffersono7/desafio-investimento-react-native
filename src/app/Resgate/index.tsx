import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  ToastAndroid,
  Modal,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Investimento } from '../types/Investimento';
import { BiConsumer, Runnable } from '../utils/types';
import ResgateEfetuado from './ResgateEfetuado';
import useResgateHelper from './ResgateHelper';
import ValorResgate from './ValorResgate';

function Item({ label, value = '' }: { label: string; value?: string }) {
  return (
    <View style={styles.bloco}>
      <View style={styles.item}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
}

export default function Resgate({ navigation, route }: ResgateProps) {
  const { investimento } = route?.params;

  const [
    resgateSucessoModalOpen,
    setResgateSucessoModalOpen,
  ] = useState<boolean>(false);

  const {
    resgates,
    changeValor,
    valorTotalResgate,
    isValid,
  } = useResgateHelper(investimento!);

  function obterSaldoPorPercentualFormatado(percentual: number): string {
    const resultado =
      (percentual * (investimento?.saldoTotalDisponivel || 0)) / 100;

    return resultado.formatBrlMoney();
  }

  function abrirConfirmacaoResgate() {
    if (valorTotalResgate === 0) {
      ToastAndroid.show('Valor para resgate deve ser acima de R$ 0,00', 2000);
      return;
    }

    if (isValid) {
      setResgateSucessoModalOpen(true);
    }
  }

  function handleCloseModalResgate(): void {
    setResgateSucessoModalOpen(false);

    navigation.goBack();
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>DADOS DO INVESTIMENTO</Text>

      <View style={styles.bloco}>
        <View style={styles.item}>
          <Text style={styles.label}>Nome</Text>
          <Text style={styles.value}>{investimento?.nome}</Text>
        </View>

        <View style={styles.bloco}>
          <View style={styles.item}>
            <Text style={styles.label}>Saldo total disponível</Text>
            <Text style={styles.value}>
              {investimento?.saldoTotalDisponivel}
            </Text>
          </View>
        </View>
      </View>

      <Text style={styles.titulo}>RESGATE DO SEU JEITO</Text>

      {resgates.map(({ acao, valor, errors }) => (
        <View key={acao?.id}>
          <Item label='Ação' value={acao?.nome} />
          <Item
            label='Saldo acumulado'
            value={obterSaldoPorPercentualFormatado(acao!.percentual!)}
          />
          <ValorResgate
            valor={valor}
            onChange={changeValor}
            errors={errors}
            acao={acao}
          />
          <View style={styles.espaco} />
        </View>
      ))}

      <Item
        label='Valor total a resgatar'
        value={valorTotalResgate.formatBrlMoney()}
      />

      <View style={styles.espaco} />

      <Button
        title='CONFIRMAR RESGATE'
        color='#e8e000'
        onPress={abrirConfirmacaoResgate}
      />

      <View style={styles.espaco} />
      <View style={styles.espaco} />

      <Modal
        visible={resgateSucessoModalOpen}
        animationType='slide'
        transparent
      >
        <View style={styles.modal}>
          <ResgateEfetuado close={handleCloseModalResgate} />
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  bloco: {
    paddingTop: 1,
    paddingBottom: 1,
  },
  titulo: {
    fontSize: 15,
    color: '#AAA',
    marginTop: 10,
    marginBottom: 10,
  },
  item: {
    backgroundColor: '#FFF',
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 20,
  },
  value: {
    fontSize: 20,
    color: '#AAA',
  },
  espaco: {
    padding: 10,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
});

type ResgateProps = {
  navigation: {
    navigate: BiConsumer<string, Record<string, any>>;
    goBack: Runnable;
  };
  route: {
    params: {
      investimento?: Investimento;
    };
  };
};
