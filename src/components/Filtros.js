import React, { useState } from 'react';
import '../styles/Filtros.css';

function Filtros({ onBuscar, carregando }) {
  const [filtros, setFiltros] = useState({
    cadastroSql: '',
    numero: '',
    areaMinima: '',
    areaMaxima: '',
    limit: 1000
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltros(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onBuscar(filtros);
  };

  const handleLimpar = () => {
    const filtrosLimpos = {
      cadastroSql: '',
      numero: '',
      areaMinima: '',
      areaMaxima: '',
      limit: 1000
    };
    setFiltros(filtrosLimpos);
    onBuscar(filtrosLimpos);
  };

  return (
    <div className="filtros-container">
      <h2>Filtros de Busca</h2>
      <form onSubmit={handleSubmit} className="filtros-form">
        <div className="filtros-grid">
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
              placeholder="Ex: 01234"
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
              placeholder="Ex: 100"
              disabled={carregando}
            />
          </div>

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
              placeholder="Ex: 50"
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
              placeholder="Ex: 200"
              step="0.01"
              disabled={carregando}
            />
          </div>

          <div className="form-group">
            <label htmlFor="limit">
              Limite de Resultados
            </label>
            <select
              id="limit"
              name="limit"
              value={filtros.limit}
              onChange={handleChange}
              disabled={carregando}
            >
              <option value="100">100</option>
              <option value="500">500</option>
              <option value="1000">1.000</option>
              <option value="2000">2.000</option>
              <option value="5000">5.000</option>
            </select>
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

