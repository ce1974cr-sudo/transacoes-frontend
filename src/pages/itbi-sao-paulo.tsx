import Head from "next/head";

export default function ItbiSaoPaulo() {
  return (
    <>
      <Head>
        <title>ITBI em São Paulo: valores reais de transações imobiliárias</title>
        <meta
          name="description"
          content="Consulta de valores reais de transações imobiliárias em São Paulo com base no ITBI recolhido. Dados públicos organizados para corretores e avaliadores."
        />
      </Head>

      <main>
        <h1>ITBI em São Paulo: valores reais de transações imobiliárias</h1>

        <p>
          O ITBI (Imposto de Transmissão de Bens Imóveis) em São Paulo
          é calculado sobre o valor efetivo das transações imobiliárias,
          conforme dados oficiais do município.
        </p>

        <h2>Origem dos dados</h2>
        <p>
          Os dados são publicados pela Prefeitura de São Paulo em formato
          de planilhas abertas, porém sem mecanismo de consulta estruturada.
        </p>

        <h2>Uso na avaliação imobiliária</h2>
        <p>
          Valores reais de transações são referência técnica para corretores,
          avaliadores e peritos judiciais.
        </p>

        <a href="/transacoes-imobiliarias-sao-paulo">
          Ver transações imobiliárias em São Paulo
        </a>
      </main>
    </>
  );
}
