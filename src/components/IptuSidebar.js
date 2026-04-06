import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import '../styles/IptuSidebar.css';

/**
 * Componente IptuSidebar
 * Painel lateral para exibir dados do IPTU
 * 
 * Props:
 * - isOpen: boolean - Se o painel está aberto
 * - onClose: function - Callback para fechar o painel
 * - numeroContribuinte: string - Número do contribuinte a buscar
 * - apiBaseUrl: string - URL base da API
 */
const IptuSidebar = ({ isOpen, onClose, numeroContribuinte, apiBaseUrl }) => {
  const [iptuData, setIptuData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Buscar dados do IPTU quando o painel abre
  const fetchIptuData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(
        `${apiBaseUrl}/api/iptu/contribuinte/${numeroContribuinte}`
      );
      
      setIptuData(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Erro ao buscar IPTU');
      console.error('Erro ao buscar IPTU:', err);
    } finally {
      setLoading(false);
    }
  }, [apiBaseUrl, numeroContribuinte]);

  useEffect(() => {
    if (isOpen && numeroContribuinte) {
      fetchIptuData();
    }
  }, [isOpen, numeroContribuinte, fetchIptuData]);

  // Formatar valores monetários
  const formatCurrency = (value) => {
    if (!value) return 'N/A';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  // Formatar números com separador de milhares
  const formatNumber = (value) => {
    if (!value) return 'N/A';
    return new Intl.NumberFormat('pt-BR').format(value);
  };

  // Formatar CEP
  const formatCep = (cep) => {
    if (!cep) return 'N/A';
    return cep.replace(/(\d{5})(\d{3})/, '$1-$2');
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="iptu-overlay" onClick={onClose} />
      )}

      {/* Sidebar */}
      <div className={`iptu-sidebar ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="iptu-sidebar-header">
          <h2>📋 Dados do IPTU</h2>
          <button className="iptu-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Conteúdo */}
        <div className="iptu-sidebar-content">
          {loading && (
            <div className="iptu-loading">
              <div className="spinner"></div>
              <p>Carregando dados do IPTU...</p>
            </div>
          )}

          {error && (
            <div className="iptu-error">
              <p>❌ {error}</p>
              <button onClick={fetchIptuData} className="iptu-retry-btn">
                Tentar Novamente
              </button>
            </div>
          )}

          {iptuData && !loading && (
            <div className="iptu-data">
              {/* Seção: Identificação */}
              <div className="iptu-section">
                <h3>🏢 Identificação</h3>
                <div className="iptu-field">
                  <label>Número do Contribuinte:</label>
                  <span className="iptu-value">{iptuData.numero_contribuinte}</span>
                </div>
                <div className="iptu-field">
                  <label>Tipo de Uso:</label>
                  <span className="iptu-value">{iptuData.tipo_uso_imovel || 'N/A'}</span>
                </div>
              </div>

              {/* Seção: Localização */}
              <div className="iptu-section">
                <h3>📍 Localização</h3>
                <div className="iptu-field">
                  <label>Logradouro:</label>
                  <span className="iptu-value">{iptuData.nome_logradouro || 'N/A'}</span>
                </div>
                <div className="iptu-field">
                  <label>Número:</label>
                  <span className="iptu-value">{iptuData.numero_imovel || 'N/A'}</span>
                </div>
                <div className="iptu-field">
                  <label>CEP:</label>
                  <span className="iptu-value">{formatCep(iptuData.cep_imovel)}</span>
                </div>
                <div className="iptu-field">
                  <label>Bairro:</label>
                  <span className="iptu-value">{iptuData.bairro_imovel || 'N/A'}</span>
                </div>
              </div>

              {/* Seção: Características Físicas */}
              <div className="iptu-section">
                <h3>📐 Características Físicas</h3>
                <div className="iptu-field">
                  <label>Área Construída:</label>
                  <span className="iptu-value">
                    {iptuData.area_construida ? `${formatNumber(iptuData.area_construida)} m²` : 'N/A'}
                  </span>
                </div>
                <div className="iptu-field">
                  <label>Ano de Construção:</label>
                  <span className="iptu-value">{iptuData.ano_construcao || 'N/A'}</span>
                </div>
              </div>

              {/* Seção: Valores */}
              <div className="iptu-section">
                <h3>💰 Valores (m²)</h3>
                <div className="iptu-field">
                  <label>Valor m² Terreno:</label>
                  <span className="iptu-value">
                    {formatCurrency(iptuData.valor_m2_terreno)}
                  </span>
                </div>
                <div className="iptu-field">
                  <label>Valor m² Construção:</label>
                  <span className="iptu-value">
                    {formatCurrency(iptuData.valor_m2_construcao)}
                  </span>
                </div>
              </div>

              {/* Botão de Ação */}
              <div className="iptu-actions">
                <button 
                  className="iptu-copy-btn"
                  onClick={() => {
                    const text = JSON.stringify(iptuData, null, 2);
                    navigator.clipboard.writeText(text);
                    alert('Dados copiados para a área de transferência!');
                  }}
                >
                  📋 Copiar Dados
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default IptuSidebar;
