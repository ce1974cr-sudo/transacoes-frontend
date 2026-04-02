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

  // Preparar dados reais (sem média)
  const dadosGrafico = [...dados]
    .reverse() // garante ordem cronológica
    .map(item => ({
      data: new Date(item.data).toLocaleDateString('pt-BR'),
      valor: item.valor ? Math.round(item.valor) : 0
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
          <p className="label">{payload[0].payload.data}</p>
          <p className="valor">
            Valor: <strong>{formatarValor(payload[0].value)}</strong>
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
        Valores reais das transações (últimos registros conforme limite)
      </p>
      
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={dadosGrafico}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis 
            dataKey="data"
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
            formatter={() => 'Valor'}
          />

          <Bar 
            dataKey="valor"
            fill="#2563eb"
            name="Valor"
          />
        </BarChart>
      </ResponsiveContainer>

      <div className="grafico-info">
        <p>
          Total de registros: <strong>{dadosGrafico.length}</strong>
        </p>
      </div>
    </div>
  );
}

export default GraficoTransacoes;
