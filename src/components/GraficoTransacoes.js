import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import '../styles/GraficoTransacoes.css';

function GraficoTransacoes({ dados }) {
  if (!dados || dados.length === 0) {
    return (
      <div className="grafico-container">
        <div className="grafico-vazio">
          <p>Nenhum dado disponível para o gráfico.</p>
        </div>
      </div>
    );
  }

  // Preparar dados para o gráfico
  const dadosGrafico = dados.map(item => ({
    mes: new Date(item.mes).toLocaleDateString('pt-BR', { 
      month: 'short', 
      year: 'numeric' 
    }),
    valor_medio: item.valor_medio ? Math.round(item.valor_medio) : 0,
    quantidade: item.quantidade || 0
  }));

  const formatarValor = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(valor);
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{payload[0].payload.mes}</p>
          <p className="valor">
            Valor Médio: <strong>{formatarValor(payload[0].value)}</strong>
          </p>
          <p className="quantidade">
            Quantidade: <strong>{payload[0].payload.quantidade}</strong> transações
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grafico-container">
      <h2>Histórico de Valores</h2>
      <p className="grafico-descricao">
        Valor médio das transações ao longo do tempo (ordenado cronologicamente)
      </p>
      
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={dadosGrafico}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="mes" 
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis 
            tickFormatter={(value) => formatarValor(value)}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
            formatter={() => 'Valor Médio'}
          />
          <Bar 
            dataKey="valor_medio" 
            fill="#2563eb" 
            name="Valor Médio"
          />
        </BarChart>
      </ResponsiveContainer>

      <div className="grafico-info">
        <p>
          Total de períodos: <strong>{dadosGrafico.length}</strong>
        </p>
        <p>
          Total de transações: <strong>
            {dadosGrafico.reduce((acc, item) => acc + item.quantidade, 0).toLocaleString('pt-BR')}
          </strong>
        </p>
      </div>
    </div>
  );
}

export default GraficoTransacoes;

