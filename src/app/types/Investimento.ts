export interface Investimento {
  nome?: string;
  objetivo?: string;
  saldoTotalDisponivel?: number;
  indicadorCarencia?: 'S' | 'N';
  acoes?: Acao[];
}

export interface Acao {
  id?: string;
  nome?: string;
  percentual?: number;
}
