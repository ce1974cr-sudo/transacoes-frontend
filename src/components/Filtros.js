import React, { useState } from 'react';
import '../styles/Filtros.css';

function Filtros({ onBuscar, carregando }) {
  const [tipoFiltro, setTipoFiltro] = useState('cadastro_numero');
  const [filtros, setFiltros] = useState({
    cadastroSql: '',
    numero: '',
    endereco: '',
    cep: '',
    valorMin: '',
    valorMax: '',
    areaMinima: '',
    areaMaxima: '',
    limit: 50
  });

  const handleTipoFiltroChange = (e) => {
    const novoTipo = e.target.value;
    setTipoFiltro(novoTipo);
    
    // Limpar campos específicos ao mudar o tipo de filtro
    setFiltros(prev => ({
      ...prev,
      cadastroSql: '',
      numero: '',
      endereco: '',
      cep: ''
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFiltros(prev => ({
      ...prev,
      [name]: name === 'limit'
        ? (parseInt(value) || 50)
        : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const filtrosFinal = {
      tipoFiltro,
      valorMin: filtros.valorMin,
      valorMax: filtros.valorMax,
      areaMinima: filtros.areaMinima,
      areaMaxima: filtros.areaMaxima,
      limit: filtros.limit
    };

    if (tipoFiltro === 'cadastro_numero') {
      filtrosFinal.cadastroSql = filtros.cadastroSql;
      filtrosFinal.numero = filtros.numero;
    } else if (tipoFiltro === 'endereco') {
      filtrosFinal.endereco = filtros.endereco;
    } else if (tipoFiltro === 'cep') {
      filtrosFinal.cep = filtros.cep;
    }

    onBuscar(filtrosFinal);
  };

  const handleLimpar = () => {
    setTipoFiltro('cadastro_numero');
    const filtrosLimpos = {
      cadastroSql: '',
      numero: '',
      endereco: '',
      cep: '',
      valorMin: '',
      valorMax: '',
      areaMinima: '',
      areaMaxima: '',
      limit: 50
    };

    setFiltros(filtrosLimpos);
    onBuscar(filtrosLimpos);
  };

  return (
    <div className="filtros-container">
      <div className="filtros-header">
        <span className="filtros-icon">🔍</span>
        <h2>Filtros de Busca</h2>
      </div>

      <form onSubmit={handleSubmit} className="filtros-form">
        {/* Seletor de Tipo de Filtro */}
        <div className="tipo-filtro-container">
          <label htmlFor="tipoFiltro" className="tipo-filtro-label">
            Tipo de Busca
          </label>
          <select
            id="tipoFiltro"
            value={tipoFiltro}
            onChange={handleTipoFiltroChange}
            className="tipo-filtro-select"
            disabled={carregando}
          >
            <option value="cadastro_numero">Cadastro SQL + Número</option>
            <option value="endereco">Endereço</option>
            <option value="cep">CEP</option>
          </select>
        </div>

        <div className="filtros-grid">
          {/* Coluna 1: Cadastro SQL + Número do Imóvel OU Endereço OU CEP */}
          <div className="filtros-coluna">
            {tipoFiltro === 'cadastro_numero' && (
              <>
                <div className="form-group">
                  <label htmlFor="cadastroSql">
                    Cadastro SQL
                    <span className="hint">Digite parte do número</span>
                  </label>
                  <input
                    type="text"
                    id="cadastroSql"
                    name="cadastroSql"
                    value={filtros.cadastroSql}
                    onChange={handleChange}
                    placeholder="101554"
                    disabled={carregando}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="numero">
                    Número do Imóvel
                    <span className="hint">Número exato</span>
                  </label>
                  <input
                    type="number"
                    id="numero"
                    name="numero"
                    value={filtros.numero}
                    onChange={handleChange}
                    placeholder="600"
                    disabled={carregando}
                  />
                </div>
              </>
            )}

            {tipoFiltro === 'endereco' && (
              <div className="form-group">
                <label htmlFor="endereco">
                  Endereço
                  <span className="hint">Não precisa ser completo</span>
                </label>
                <input
                  type="text"
                  id="endereco"
                  name="endereco"
                  value={filtros.endereco}
                  onChange={handleChange}
                  placeholder="Avenida Paulista"
                  disabled={carregando}
                />
              </div>
            )}

            {tipoFiltro === 'cep' && (
              <div className="form-group">
                <label htmlFor="cep">
                  CEP
                  <span className="hint">8 dígitos: 01001901</span>
                </label>
                <input
                  type="text"
                  id="cep"
                  name="cep"
                  value={filtros.cep}
                  onChange={handleChange}
                  placeholder="01001901"
                  maxLength="8"
                  disabled={carregando}
                />
              </div>
            )}
          </div>

          {/* Coluna 2: Valor Mínimo + Valor Máximo */}
          <div className="filtros-coluna">
            <div className="form-group">
              <label htmlFor="valorMin">
                Valor Mínimo (R$)
              </label>
              <input
                type="number"
                id="valorMin"
                name="valorMin"
                value={filtros.valorMin}
                onChange={handleChange}
                disabled={carregando}
              />
            </div>

            <div className="form-group">
              <label htmlFor="valorMax">
                Valor Máximo (R$)
              </label>
              <input
                type="number"
                id="valorMax"
                name="valorMax"
                value={filtros.valorMax}
                onChange={handleChange}
                disabled={carregando}
              />
            </div>
          </div>

          {/* Coluna 3: Área Mínima + Área Máxima */}
          <div className="filtros-coluna">
            <div className="form-group">
              <label htmlFor="areaMinima">
                Área Mínima (m²)
              </label>
              <input
                type="number"
                id="areaMinima"
                name="areaMinima"
                value={filtros.areaMinima}
                onChange={handleChange}
                step="0.01"
                disabled={carregando}
              />
            </div>

            <div className="form-group">
              <label htmlFor="areaMaxima">
                Área Máxima (m²)
              </label>
              <input
                type="number"
                id="areaMaxima"
                name="areaMaxima"
                value={filtros.areaMaxima}
                onChange={handleChange}
                step="0.01"
                disabled={carregando}
              />
            </div>
          </div>

          {/* Coluna 4: Limite de Resultados */}
          <div className="filtros-coluna">
            <div className="form-group">
              <label htmlFor="limit">
                Limite de Resultados
              </label>
              <input
                type="number"
                id="limit"
                name="limit"
                value={filtros.limit}
                onChange={handleChange}
                min="1"
                max="10000"
                disabled={carregando}
              />
            </div>
          </div>

        </div>

        <div className="filtros-acoes">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={carregando}
          >
            {carregando ? 'Buscando...' : 'Buscar'}
          </button>

          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={handleLimpar}
            disabled={carregando}
          >
            Limpar Filtros
          </button>
        </div>
      </form>
    </div>
  );
}

export default Filtros;
