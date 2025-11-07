# Transações Imobiliárias - Frontend

Frontend em React para consulta de transações imobiliárias de São Paulo.

## Tecnologias

- **React 18**: Biblioteca JavaScript para interfaces
- **Axios**: Cliente HTTP para requisições à API
- **Recharts**: Biblioteca de gráficos para React
- **CSS3**: Estilização moderna e responsiva

## Estrutura do Projeto

```
transacoes-frontend/
├── public/
│   └── index.html           # HTML principal
├── src/
│   ├── components/
│   │   ├── Filtros.js       # Componente de filtros
│   │   ├── TabelaTransacoes.js  # Tabela de resultados
│   │   └── GraficoTransacoes.js # Gráfico de barras
│   ├── services/
│   │   └── api.js           # Serviço de comunicação com API
│   ├── styles/
│   │   ├── App.css          # Estilos principais
│   │   ├── Filtros.css      # Estilos dos filtros
│   │   ├── TabelaTransacoes.css  # Estilos da tabela
│   │   ├── GraficoTransacoes.css # Estilos do gráfico
│   │   └── index.css        # Estilos globais
│   ├── App.js               # Componente principal
│   └── index.js             # Ponto de entrada
├── package.json             # Dependências e scripts
├── .env.example             # Exemplo de variáveis de ambiente
├── .gitignore               # Arquivos ignorados pelo Git
└── README.md                # Este arquivo
```

## Instalação Local

1. Clone o repositório:
```bash
git clone <seu-repositorio>
cd transacoes-frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
# Edite o arquivo .env com a URL da sua API
```

4. Execute o servidor de desenvolvimento:
```bash
npm start
```

5. Acesse: http://localhost:3000

## Build para Produção

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `build/`.

## Funcionalidades

### Filtros de Busca

- **Cadastro SQL**: Busca parcial por número de cadastro
- **Número do Imóvel**: Busca exata por número
- **Área Mínima/Máxima**: Filtro por faixa de área construída
- **Limite de Resultados**: Controle de quantos registros retornar

### Visualizações

1. **Estatísticas Gerais**
   - Total de transações no banco
   - Período coberto
   - Valor médio das transações
   - Área média dos imóveis

2. **Tabela de Resultados**
   - Todas as colunas do banco de dados
   - Ordenação por data (mais recente primeiro)
   - Formatação de valores e datas
   - Responsiva para mobile

3. **Gráfico de Barras**
   - Valor médio das transações por mês
   - Ordenação cronológica (mais antigo à esquerda)
   - Tooltip interativo com detalhes
   - Quantidade de transações por período

## Deploy no Vercel

### Opção 1: Via Interface Web (Recomendado)

1. Acesse https://vercel.com
2. Faça login com sua conta do GitHub
3. Clique em **Add New** > **Project**
4. Selecione o repositório `transacoes-frontend`
5. Configure:
   - **Framework Preset**: Create React App
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`
6. Adicione a variável de ambiente:
   - **Name**: `REACT_APP_API_URL`
   - **Value**: URL da sua API no Render (ex: `https://transacoes-api-xxxx.onrender.com`)
7. Clique em **Deploy**
8. Aguarde o deploy (1-3 minutos)
9. Acesse a URL gerada (ex: `https://seu-app.vercel.app`)

### Opção 2: Via CLI

```bash
# Instalar Vercel CLI
npm install -g vercel

# Fazer login
vercel login

# Deploy
vercel

# Deploy para produção
vercel --prod
```

## Variáveis de Ambiente

- `REACT_APP_API_URL`: URL completa da API backend (ex: `https://transacoes-api-xxxx.onrender.com`)

**Importante**: No Vercel, adicione esta variável nas configurações do projeto em **Settings** > **Environment Variables**.

## Configuração da API

Edite o arquivo `src/services/api.js` se necessário ajustar:
- Timeout das requisições
- Headers customizados
- Interceptors

## Desenvolvimento

### Adicionar Novo Filtro

1. Adicione o campo no componente `Filtros.js`
2. Atualize o estado `filtros`
3. Envie o novo parâmetro para a API em `services/api.js`

### Adicionar Nova Coluna na Tabela

1. Edite `components/TabelaTransacoes.js`
2. Adicione o `<th>` no `<thead>`
3. Adicione o `<td>` correspondente no `<tbody>`
4. Ajuste os estilos em `styles/TabelaTransacoes.css`

### Customizar Gráfico

1. Edite `components/GraficoTransacoes.js`
2. Modifique as props do componente `<BarChart>` do Recharts
3. Consulte a documentação: https://recharts.org/

## Troubleshooting

### Erro de CORS

Se aparecer erro de CORS:
1. Verifique se o backend está configurado para aceitar requisições do domínio do frontend
2. No backend (FastAPI), ajuste `allow_origins` em `app/main.py`

### API não responde

1. Verifique se a URL da API está correta no `.env`
2. Teste a API diretamente: `https://sua-api.onrender.com/health`
3. Verifique os logs do Render

### Build falha no Vercel

1. Verifique se todas as dependências estão no `package.json`
2. Confirme que não há erros de lint
3. Verifique os logs de build no Vercel

## Próximos Passos

Após o deploy:

1. Teste todas as funcionalidades
2. Ajuste os filtros conforme necessário
3. Customize o design/cores
4. Adicione novas visualizações se desejar

## Licença

MIT

