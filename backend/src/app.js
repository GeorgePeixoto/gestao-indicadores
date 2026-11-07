const express = require('express');

// Monta o app sem chamar listen(), para os testes (Supertest) usarem direto.
// As rotas de cada módulo são registradas aqui como /api/<modulo>.
const app = express();

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

module.exports = app;
