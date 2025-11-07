import React, { useState, useEffect } from 'react';
import Filtros from './components/Filtros';
import TabelaTransacoes from './components/TabelaTransacoes';
import GraficoTransacoes from './components/GraficoTransacoes';
import { buscarTransacoes, buscarEstatisticas } from './services/api';
import './styles/App.css';

function App() {
  const [transacoes, setTransacoes] = useState([]);
  const [dadosGrafico, setDadosGrafico] = useState([]);
  const [total, setTotal] = useState(0);
  const [limiteAplicado, setLimiteAplicado] = useState(1000);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);
  const [estatisticas, setEstatisticas] = useState(null);

  // Carregar estatísticas ao iniciar
  useEffect(() => {
    carregarEstatisticas();
  }, []);

  const carregarEstatisticas = async () => {
    try {
      const stats = await buscarEstatisticas();
      setEstatisticas(stats);
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    }
  };

  const handleBuscar = async (filtros) => {
    setCarregando(true);
    setErro(null);

    try {
      const resultado = await buscarTransacoes(filtros);
      setTransacoes(resultado.transacoes);
      setDadosGrafico(resultado.grafico);
      setTotal(resultado.total);
      setLimiteAplicado(resultado.limite_aplicado);
    } catch (error) {
      console.error('Erro ao buscar transações:', error);
      setErro('Erro ao buscar transações. Verifique sua conexão e tente novamente.');
      setTransacoes([]);
      setDadosGrafico([]);
      setTotal(0);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <div className="container">
          <h1>🏢 Transações Imobiliárias - São Paulo</h1>
          <p className="subtitulo">
            Consulte o histórico de transações imobiliárias da cidade de São Paulo
          </p>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          {/* Estatísticas gerais */}
          {estatisticas && (
            <div className="estatisticas-card">
              <h3>📊 Estatísticas do Banco de Dados</h3>
              <div className="estatisticas-grid">
                <div className="stat-item">
                  <span className="stat-label">Total de Transações</span>
                  <span className="stat-value">
                    {estatisticas.total_transacoes.toLocaleString('pt-BR')}
                  </span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Período</span>
                  <span className="stat-value">
                    {new Date(estatisticas.periodo.data_minima).getFullYear()} - {new Date(estatisticas.periodo.data_maxima).getFullYear()}
                  </span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Valor Médio</span>
                  <span className="stat-value">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(estatisticas.valores.medio)}
                  </span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Área Média</span>
                  <span className="stat-value">
                    {estatisticas.areas.media.toFixed(2)} m²
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Filtros */}
          <Filtros onBuscar={handleBuscar} carregando={carregando} />

          {/* Mensagem de erro */}
          {erro && (
            <div className="erro-mensagem">
              <p>❌ {erro}</p>
            </div>
          )}

          {/* Resultados */}
          {!carregando && transacoes.length > 0 && (
            <>
              {/* Gráfico */}
              <GraficoTransacoes dados={dadosGrafico} />

              {/* Tabela */}
              <TabelaTransacoes 
                transacoes={transacoes} 
                total={total}
                limiteAplicado={limiteAplicado}
              />
            </>
          )}

          {/* Loading */}
          {carregando && (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Carregando transações...</p>
            </div>
          )}

          {/* Mensagem inicial */}
          {!carregando && transacoes.length === 0 && !erro && (
            <div className="mensagem-inicial">
              <h3>👆 Use os filtros acima para buscar transações</h3>
              <p>
                Você pode filtrar por cadastro SQL, número do imóvel, área mínima e máxima.
                <br />
                Deixe os campos vazios para buscar todas as transações (limitado a {limiteAplicado.toLocaleString('pt-BR')} resultados).
              </p>
            </div>
          )}
        </div>
      </main>

      <footer className="app-footer">
        <div className="container">
          <p>
            Dados fornecidos pela Prefeitura de São Paulo - ITBI (Imposto de Transmissão de Bens Imóveis)
          </p>
          <p className="footer-links">
            <a href="https://prefeitura.sp.gov.br/web/fazenda/w/acesso_a_informacao/31501" target="_blank" rel="noopener noreferrer">
              Fonte dos Dados
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;

