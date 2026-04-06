import React, { useState } from 'react';
import IptuSidebar from './IptuSidebar';
import '../styles/TabelaTransacoes.css';

const TabelaTransacoes = ({ transacoes = [], apiBaseUrl }) => {
  const [iptuSidebarOpen, setIptuSidebarOpen] = useState(false);
  const [selectedContribuinte, setSelectedContribuinte] = useState(null);

  const handleOpenIptu = (cadastroSql) => {
    setSelectedContribuinte(cadastroSql);
    setIptuSidebarOpen(true);
  };

  const formatarData = (data) => {
    if (!data) return 'N/A';
    const date = new Date(data);
    return date.toLocaleDateString('pt-BR');
  };

  const formatarMoeda = (valor) => {
    if (!valor) return 'R$ 0,00';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);
  };

  const formatarArea = (area) => {
    if (!area) return 'N/A';
    return `${parseFloat(area).toFixed(2)} m²`;
  };

  const formatarCEP = (cep) => {
    if (!cep) return 'N/A';
    return cep.replace(/(\d{5})(\d{3})/, '$1-$2');
  };

  if (!transacoes || transacoes.length === 0) {
    return (
      <div className="tabela-vazia">
        <p>Nenhuma transação encontrada.</p>
      </div>
    );
  }

  return (
    <>
      <div className="tabela-container">
        <div className="tabela-header">
          <h2>📊 Resultados da Busca</h2>
          <p className="tabela-count">
            Exibindo {transacoes.length} transações
          </p>
        </div>

        <div className="tabela-wrapper">
          <table className="tabela-transacoes">
            <thead>
              <tr>
                <th>DATA</th>
                <th className="cadastro-header">
                  CADASTRO SQL
                  <span className="info-icon" title="Clique para ver dados do IPTU">ℹ️</span>
                </th>
                <th>LOGRADOURO</th>
                <th>NÚMERO</th>
                <th>COMPLEMENTO</th>
                <th>CEP</th>
                <th>VALOR</th>
                <th>ÁREA (M²)</th>
              </tr>
            </thead>
            <tbody>
              {transacoes.map((transacao, index) => (
                <tr key={index} className="tabela-row">
                  <td className="data-cell">
                    {formatarData(transacao.data_transacao)}
                  </td>
                  <td className="cadastro-cell">
                    <button
                      className="cadastro-sql-btn"
                      onClick={() => handleOpenIptu(transacao.cadastro_sql)}
                      title="Clique para ver dados do IPTU"
                    >
                      {transacao.cadastro_sql}
                      <span className="iptu-icon">📋</span>
                    </button>
                  </td>
                  <td className="logradouro-cell">
                    {transacao.nome_logradouro}
                  </td>
                  <td className="numero-cell">
                    {transacao.numero}
                  </td>
                  <td className="complemento-cell">
                    {transacao.complemento || '-'}
                  </td>
                  <td className="cep-cell">
                    {formatarCEP(transacao.cep)}
                  </td>
                  <td className="valor-cell">
                    <span className="valor-badge">
                      {formatarMoeda(transacao.valor_transacao)}
                    </span>
                  </td>
                  <td className="area-cell">
                    {formatarArea(transacao.area_construida)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sidebar IPTU */}
      <IptuSidebar
        isOpen={iptuSidebarOpen}
        onClose={() => setIptuSidebarOpen(false)}
        numeroContribuinte={selectedContribuinte}
        apiBaseUrl={apiBaseUrl}
      />
    </>
  );
};

export default TabelaTransacoes;
