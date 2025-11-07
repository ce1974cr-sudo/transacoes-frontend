import axios from 'axios';

// URL da API - altere para a URL do seu backend no Render
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 segundos
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
    
    params.limit = filtros.limit || 1000;
    
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

