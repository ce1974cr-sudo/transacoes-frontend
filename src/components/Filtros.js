import React, { useState } from 'react';
import '../styles/Filtros.css';

function Filtros({ onBuscar, carregando }) {
  const [filtros, setFiltros] = useState({
    // Filtros originais (transações)
    cadastro_sql: '',
    numero: '',
    area_minima: '',
    area_maxima: '',
    
    // 🔥 NOVOS FILTROS IPTU
    tipo_busca_iptu: 'cep', // 'cep', 'cep-parcial', 'endereco'
    cep: '',
    endereco: '',
  });

  const [resultadosIPTU, setResultadosIPTU] = useState([]);
  const [carregandoIPTU, setCarregandoIPTU] = useState(false);
  const [erroIPTU, setErroIPTU] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFiltros({
      ...filtros,
      [name]: value
    });
  };

  const handleBuscarTransacoes = (e) => {
    e.preventDefault();
    onBuscar(filtros);
  };

  const handleBuscarIPTU = async (e) => {
    e.preventDefault();
    setCarregandoIPTU(true);
    setErroIPTU(null);
    setResultadosIPTU([]);

    try {
      const apiBaseUrl = process.env.REACT_APP_API_URL;
      let url = '';

      if (filtros.tipo_busca_iptu === 'cep' && filtros.cep) {
        url = `${apiBaseUrl}/api/iptu/cep/${filtros.cep}`;
      } else if (filtros.tipo_busca_iptu === 'cep-parcial' && filtros.cep) {
        url = `${apiBaseUrl}/api/iptu/cep-parcial/${filtros.cep}`;
      } else if (filtros.tipo_busca_iptu === 'endereco' && filtros.endereco) {
        url = `${apiBaseUrl}/api/iptu/endereco/${encodeURIComponent(filtros.endereco)}`;
      } else {
        setErroIPTU('Por favor, preencha o campo de busca');
        setCarregandoIPTU(false);
        return;
      }

      const response = await fetch(url);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Erro ao buscar IPTU');
      }

      const data = await response.json();
      setResultadosIPTU(Array.isArray(data) ? data : [data]);
    } catch (error) {
      setErroIPTU(error.message);
      console.error('Erro ao buscar IPTU:', error);
    } finally {
      setCarregandoIPTU(false);
    }
  };

  return (
    <div className="filtros-container">
      {/* ========== FILTROS DE TRANSAÇÕES (ORIGINAL) ========== */}
      <div className="filtros-section">
        <h3>🔍 Buscar Transações Imobiliárias</h3>
        <form onSubmit={handleBuscarTransacoes}>
          <div className="filtros-grid">
            <div className="filtro-group">
              <label htmlFor="cadastro_sql">Cadastro SQL:</label>
              <input
                type="text"
                id="cadastro_sql"
                name="cadastro_sql"
                placeholder="Ex: 1015540275"
                value={filtros.cadastro_sql}
                onChange={handleInputChange}
              />
            </div>

            <div className="filtro-group">
              <label htmlFor="numero">Número do Imóvel:</label>
              <input
                type="number"
                id="numero"
                name="numero"
                placeholder="Ex: 600"
                value={filtros.numero}
                onChange={handleInputChange}
              />
            </div>

            <div className="filtro-group">
              <label htmlFor="area_minima">Área Mínima (m²):</label>
              <input
                type="number"
                id="area_minima"
                name="area_minima"
                placeholder="Ex: 50"
                value={filtros.area_minima}
                onChange={handleInputChange}
              />
            </div>

            <div className="filtro-group">
              <label htmlFor="area_maxima">Área Máxima (m²):</label>
              <input
                type="number"
                id="area_maxima"
                name="area_maxima"
                placeholder="Ex: 500"
                value={filtros.area_maxima}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <button type="submit" disabled={carregando} className="btn-buscar">
            {carregando ? '⏳ Buscando...' : '🔍 Buscar Transações'}
          </button>
        </form>
      </div>

      {/* ========== NOVOS FILTROS IPTU ========== */}
      <div className="filtros-section iptu-section">
        <h3>🏢 Buscar Imóvel (IPTU)</h3>
        <form onSubmit={handleBuscarIPTU}>
          <div className="filtro-group">
            <label htmlFor="tipo_busca_iptu">Tipo de Busca:</label>
            <select
              id="tipo_busca_iptu"
              name="tipo_busca_iptu"
              value={filtros.tipo_busca_iptu}
              onChange={handleInputChange}
            >
              <option value="cep">CEP Exato</option>
              <option value="cep-parcial">CEP Parcial</option>
              <option value="endereco">Endereço (Rua)</option>
            </select>
          </div>

          {(filtros.tipo_busca_iptu === 'cep' || filtros.tipo_busca_iptu === 'cep-parcial') && (
            <div className="filtro-group">
              <label htmlFor="cep">
                {filtros.tipo_busca_iptu === 'cep' ? 'CEP (Exato):' : 'CEP (Parcial):'}
              </label>
              <input
                type="text"
                id="cep"
                name="cep"
                placeholder={filtros.tipo_busca_iptu === 'cep' ? 'Ex: 05516000' : 'Ex: 05516'}
                value={filtros.cep}
                onChange={handleInputChange}
              />
              <small>
                {filtros.tipo_busca_iptu === 'cep' 
                  ? 'Digite o CEP completo (8 dígitos)'
                  : 'Digite parte do CEP para buscar todos os CEPs que começam com isso'}
              </small>
            </div>
          )}

          {filtros.tipo_busca_iptu === 'endereco' && (
            <div className="filtro-group">
              <label htmlFor="endereco">Endereço (Nome da Rua):</label>
              <input
                type="text"
                id="endereco"
                name="endereco"
                placeholder="Ex: Paulista, Brigadeiro, etc."
                value={filtros.endereco}
                onChange={handleInputChange}
              />
              <small>Não precisa digitar o nome completo da rua</small>
            </div>
          )}

          <button type="submit" disabled={carregandoIPTU} className="btn-buscar iptu-btn">
            {carregandoIPTU ? '⏳ Buscando...' : '🔍 Buscar IPTU'}
          </button>
        </form>

        {/* Resultados IPTU */}
        {erroIPTU && (
          <div className="erro-iptu">
            <p>❌ {erroIPTU}</p>
          </div>
        )}

        {resultadosIPTU.length > 0 && (
          <div className="resultados-iptu">
            <h4>📋 Resultados ({resultadosIPTU.length}):</h4>
            <div className="iptu-lista">
              {resultadosIPTU.map((iptu, index) => (
                <div key={index} className="iptu-card">
                  <div className="iptu-header">
                    <strong>{iptu.nome_logradouro}, {iptu.numero_imovel}</strong>
                    <span className="iptu-cep">{iptu.cep_imovel}</span>
                  </div>
                  <div className="iptu-details">
                    <p><strong>Bairro:</strong> {iptu.bairro_imovel}</p>
                    <p><strong>Tipo:</strong> {iptu.tipo_uso_imovel}</p>
                    <p><strong>Área:</strong> {iptu.area_construida ? `${iptu.area_construida.toLocaleString('pt-BR')} m²` : 'N/A'}</p>
                    <p><strong>Valor m² Terreno:</strong> R$ {iptu.valor_m2_terreno ? iptu.valor_m2_terreno.toLocaleString('pt-BR', {minimumFractionDigits: 2}) : 'N/A'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Filtros;
