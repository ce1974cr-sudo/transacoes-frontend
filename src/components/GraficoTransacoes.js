import React, { useState, useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Brush
} from 'recharts';
import '../styles/GraficoTransacoes.css';

function GraficoTransacoes({ dados }) {
  const [periodo, setPeriodo] = useState('30d');

  if (!dados || dados.length === 0) {
    return (
      <div className="grafico-container">
        <div className="grafico-vazio">
          <p>Nenhum dado disponível para o gráfico.</p>
        </div>
      </div>
    );
  }

  // 🔹 Normalização robusta
  const normalizados = useMemo(() => {
    return dados
      .map(item => {
        const dataBruta = item.data || item.data_transacao || item.mes;
        const valorBruto = item.valor || item.valor_transacao || item.valor_medio;

        return {
          dataObj: dataBruta ? new Date(dataBruta) : null,
          data: dataBruta
            ? new Date(dataBruta).toLocaleDateString('pt-BR')
            : 'Sem data',
          valor: valorBruto ? Number(valorBruto) : 0
        };
      })
      .filter(d => d.dataObj && !isNaN(d.dataObj))
      .sort((a, b) => a.dataObj - b.dataObj);
  }, [dados]);

  // 🔹 Filtro por período
  const dadosFiltrados = useMemo(() => {
    if (periodo === 'all') return normalizados;

    const diasMap = {
      '7d': 7,
      '30d': 30,
      '90d': 90,
      '1y': 365
    };

    const limite = new Date();
    limite.setDate(limite.getDate() - diasMap[periodo]);

    return normalizados.filter(d => d.dataObj >= limite);
  }, [normalizados, periodo]);

  // 🔹 Formatação eixo Y
  const formatarValor = (valor) => {
    if (valor >= 1_000_000) return `R$ ${(valor / 1_000_000).toFixed(1)}M`;
    if (valor >= 1_000) return `R$ ${(valor / 1_000).toFixed(0)}k`;
    return `R$ ${valor}`;
  };

  const formatarCompleto = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  // 🔹 Tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0];
      return (
        <div className="custom-tooltip">
          <p><strong>{item.payload.data}</strong></p>
          <p>Valor: {formatarCompleto(item.value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grafico-container">
      <h2>Histórico de Valores</h2>

      {/* 🔹 Filtro de período */}
      <div className="grafico-filtros">
        {['7d', '30d', '90d', '1y', 'all'].map(p => (
          <button
            key={p}
            onClick={() => setPeriodo(p)}
            className={periodo === p ? 'ativo' : ''}
          >
            {p}
          </button>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={dadosFiltrados}
          margin={{ top: 20, right: 30, left: 60, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="data"
            angle={-45}
            textAnchor="end"
            height={80}
            interval="preserveStartEnd"
          />

          <YAxis
            width={100}
            tickFormatter={formatarValor}
          />

          <Tooltip content={<CustomTooltip />} />

          <Line
            type="monotone"
            dataKey="valor"
            stroke="#2563eb"
            strokeWidth={2}
            dot={false}
          />

          <Brush
            dataKey="data"
            height={30}
            stroke="#2563eb"
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="grafico-info">
        <p>
          Total de registros: <strong>{dadosFiltrados.length}</strong>
        </p>
      </div>
    </div>
  );
}

export default GraficoTransacoes;
