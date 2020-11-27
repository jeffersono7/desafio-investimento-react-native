import { Acao } from './../types/Investimento';
import { useState } from 'react';
import { Investimento } from '../types/Investimento';

export default function useResgateHelper(investimento: Investimento) {
  const { saldoTotalDisponivel, acoes } = investimento;

  const initialState = acoes?.map(acao => ({
    valor: 0,
    valid: true,
    errors: [] as string[],
    acao,
  })) || [];

  const [resgates, setResgates] = useState(initialState);

  const valorTotalResgate = resgates.reduce((prev, curr) => prev += curr?.valor || 0, 0);

  const isValid: boolean = resgates.every(r => r.valid);

  function changeValor(acao: Acao, valor: number): void {
    atualizarResgate(acao, valor);

    validarValor(acao, valor);
  }

  function atualizarResgate(acao: Acao, valor: number): void {
    setResgates(resgates => {
      const resgate = resgates.find(r => r.acao.id === acao.id);

      if (resgate) {
        resgate.valor = valor;
        return [...resgates];
      }
      return resgates;
    });
  }

  function limparErrors(): void {
    setResgates(resgates => resgates.map(r => ({ ...r, errors: [] })));
  }

  function adicionarError(acao: Acao, mensagem: string): void {
    setResgates(resgates => {
      const resgate = resgates.find(r => r.acao.id === acao.id);

      if (resgate) {
        resgate.errors = [...resgate.errors, mensagem];

        return resgates;
      }
      return resgates;
    });
  }

  // TODO atualizar msg de erros
  function validarValor(acao: Acao, valor: number): void {
    limparErrors();

    if ((valorTotalResgate) > (saldoTotalDisponivel || 0)) {
      adicionarError(acao, `Valor não pode ser maior que ${valorTotalResgate.formatBrlMoney()}`);
      return;
    }
    if (valor > obterValorDisponivelAcao(acao)) {
      adicionarError(acao, `Valor não pode ser maior que ${obterValorDisponivelAcao(acao).formatBrlMoney()}`)
      return;
    }
  }

  function obterValorDisponivelAcao(acao: Acao): number {
    const result = (saldoTotalDisponivel || 0) * (acao?.percentual || 0);

    return result / 100;
  }

  return {
    resgates,
    changeValor,
    valorTotalResgate,
    isValid
  }
}
