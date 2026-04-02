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

  // 🔹 Funções robustas para capturar campos corretos
  const getData = (item) => {
    return item.data || item.data_transacao || item.mes || null;
  };

  const getValor = (item) => {
    return item.valor || item.valor_transacao || item.valor_medio || 0;
  };

  // 🔹 Preparação dos dados (robusta)
  const dadosGrafico = [...dados]
    .reverse()
    .map(item => {
      const dataBruta = getData(item);
      const valorBruto = getValor(item);

      return {
        data: dataBruta
          ? new Date(dataBruta).toLocaleDateString('pt-BR')
          : 'Sem data',
        valor: valorBruto ? Math.round(valorBruto) : 0
      };
    });

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
        Valores reais das transações (conforme limite aplicado)
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
