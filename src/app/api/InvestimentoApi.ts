import { Investimento } from "../types/Investimento";

async function obterInvestimentos(): Promise<Investimento[]> {
  try {
    const response = await fetch('http://www.mocky.io/v2/5e76797e2f0000f057986099');
    const { response: { status, data } } = await response.json();

    if (status != 200) {
      return [];
    }

    return data.listaInvestimentos;
  } catch (e) {
    return [];
  }
}


export default function useInvestimentoApi() {
  return {
    obterInvestimentos
  }
}
