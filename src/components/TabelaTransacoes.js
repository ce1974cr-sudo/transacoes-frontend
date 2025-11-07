import React from 'react';
import '../styles/TabelaTransacoes.css';

function TabelaTransacoes({ transacoes, total, limiteAplicado }) {
  const formatarValor = (valor) => {
    if (!valor) return 'N/A';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  const formatarData = (data) => {
    if (!data) return 'N/A';
    return new Date(data).toLocaleDateString('pt-BR');
  };

  const formatarArea = (area) => {
    if (!area) return 'N/A';
    return `${area.toFixed(2)} m²`;
  };

  const formatarCEP = (cep) => {
    if (!cep || cep.length !== 8) return cep || 'N/A';
    return `${cep.substr(0, 5)}-${cep.substr(5)}`;
  };

  if (!transacoes || transacoes.length === 0) {
    return (
      <div className="tabela-container">
        <div className="tabela-vazia">
          <p>Nenhuma transação encontrada com os filtros aplicados.</p>
          <p>Tente ajustar os filtros e buscar novamente.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="tabela-container">
      <div className="tabela-header">
        <h2>Resultados da Busca</h2>
        <div className="tabela-info">
          <span>Exibindo <strong>{transacoes.length}</strong> de <strong>{total.toLocaleString('pt-BR')}</strong> transações</span>
          {total > limiteAplicado && (
            <span className="aviso">
              ⚠️ Mostrando apenas os primeiros {limiteAplicado.toLocaleString('pt-BR')} resultados
            </span>
          )}
        </div>
      </div>

      <div className="tabela-wrapper">
        <table className="tabela-transacoes">
          <thead>
            <tr>
              <th>Data</th>
              <th>Cadastro SQL</th>
              <th>Logradouro</th>
              <th>Número</th>
              <th>Complemento</th>
              <th>CEP</th>
              <th>Valor</th>
              <th>Área (m²)</th>
            </tr>
          </thead>
          <tbody>
            {transacoes.map((transacao, index) => (
              <tr key={transacao.id || index}>
                <td className="data">{formatarData(transacao.data_transacao)}</td>
                <td className="cadastro">{transacao.cadastro_sql || 'N/A'}</td>
                <td className="logradouro">{transacao.nome_logradouro || 'N/A'}</td>
                <td className="numero">{transacao.numero || 'N/A'}</td>
                <td className="complemento">{transacao.complemento || '-'}</td>
                <td className="cep">{formatarCEP(transacao.cep)}</td>
                <td className="valor">{formatarValor(transacao.valor_transacao)}</td>
                <td className="area">{formatarArea(transacao.area_construida)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TabelaTransacoes;

