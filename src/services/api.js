import axios from 'axios';

// URL da API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Busca transações com filtros
 */
export const buscarTransacoes = async (filtros) => {
  try {
    const params = {};

    if (filtros.cadastroSql) {
      params.cadastro_sql = filtros.cadastroSql;
    }

    if (filtros.numero) {
      params.numero = parseInt(filtros.numero);
    }

    if (filtros.areaMinima) {
      params.area_minima = parseFloat(filtros.areaMinima);
    }

    if (filtros.areaMaxima) {
      params.area_maxima = parseFloat(filtros.areaMaxima);
    }

    // 🔥 CORREÇÃO PRINCIPAL (VALORES)
    if (filtros.valorMin !== '' && filtros.valorMin !== null) {
      params.valor_min = parseFloat(filtros.valorMin);
    }

    if (filtros.valorMax !== '' && filtros.valorMax !== null) {
      params.valor_max = parseFloat(filtros.valorMax);
    }

    // 🔹 limite
    params.limit = filtros.limit || 10;

    // 🔍 DEBUG (ver no console do navegador)
    console.log("PARAMS:", params);

    const response = await api.get('/transacoes', { params });

    return response.data;

  } catch (error) {
    console.error('Erro ao buscar transações:', error);
    throw error;
  }
};

/**
 * Busca estatísticas gerais
 */
export const buscarEstatisticas = async () => {
  try {
    const response = await api.get('/stats');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    throw error;
  }
};

/**
 * Health check da API
 */
export const verificarSaude = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    console.error('Erro ao verificar saúde da API:', error);
    throw error;
  }
};

export default api;
