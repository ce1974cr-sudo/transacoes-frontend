import React, { useState } from 'react';
import '../styles/Filtros.css';

function Filtros({ onBuscar, carregando }) {
  const [filtros, setFiltros] = useState({
    cadastroSql: '',
    numero: '',
    areaMinima: '',
    areaMaxima: '',
    valorMin: '',
    valorMax: '',
    limit: 10
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFiltros(prev => ({
      ...prev,
      [name]: name === 'limit'
        ? (parseInt(value) || 10)
        : value
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
      valorMin: '',
      valorMax: '',
      limit: 10
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

          {/* 🔥 NOVO BLOCO */}
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
