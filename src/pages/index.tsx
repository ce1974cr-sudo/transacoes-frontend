import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>
          ITBI São Paulo | Consulta de valores reais de transações imobiliárias
        </title>
        <meta
          name="description"
          content="Consulta estruturada de valores reais de transações imobiliárias em São Paulo com base no ITBI recolhido. Dados públicos organizados para corretores e avaliadores."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://transacoes.guru/" />
      </Head>

      <main>
        <h1>
          Consulta de valores reais de transações imobiliárias em São Paulo
        </h1>

        <p>
          Esta plataforma organiza e estrutura os dados públicos de
          transações imobiliárias do Município de São Paulo, com base
          no ITBI (Imposto de Transmissão de Bens Imóveis) efetivamente
          recolhido nas operações de compra e venda.
        </p>

        <p>
          Diferentemente de preços anunciados, os dados de ITBI refletem
          valores reais de mercado, sendo referência técnica para
          corretores de imóveis, avaliadores, peritos e profissionais
          do setor imobiliário.
        </p>

        <h2>O que é o ITBI e por que ele é relevante</h2>
        <p>
          O ITBI é um tributo municipal incidente sobre a transmissão
          onerosa de bens imóveis. Em São Paulo, seu recolhimento é
          baseado no valor declarado da transação, tornando esses
          registros uma fonte confiável para análise de mercado.
        </p>

        <h2>Limitações da consulta oficial da Prefeitura</h2>
        <p>
          Embora os dados sejam públicos, a Prefeitura disponibiliza as
          informações em planilhas extensas e pouco práticas, exigindo
          tratamento técnico para análise, cruzamento e interpretação
          adequada dos valores.
        </p>

        <h2>Como esta plataforma organiza os dados</h2>
        <p>
          Os registros de ITBI são estruturados para permitir consultas
          mais eficientes, análises comparativas e suporte técnico à
          avaliação imobiliária, respeitando a origem pública das
          informações.
        </p>

        <h2>Páginas principais</h2>
        <ul>
          <li>
            <Link href="/itbi-sao-paulo">
              ITBI em São Paulo: dados e metodologia
            </Link>
          </li>
          <li>
            <Link href="/transacoes-imobiliarias-sao-paulo">
              Transações imobiliárias em São Paulo
            </Link>
          </li>
          <li>
            <Link href="/valores-transacoes-imobiliarias">
              Valores reais de transações imobiliárias
            </Link>
          </li>
        </ul>

        <p>
          A ferramenta de consulta está em constante evolução e tem
          como objetivo tornar o acesso aos dados públicos mais
          eficiente e tecnicamente útil para o mercado imobiliário.
        </p>
      </main>
    </>
  );
}
