# Gestão e Indicadores

Sistema de gestão e indicadores para uma ONG. Ele registra visitas, refeições, projetos, atendimentos,
frequência, voluntariado, patrimônio e uso de espaços, e mostra esses dados em dashboards
filtráveis por período e unidade.

Projeto Integrador do curso de Análise e Desenvolvimento de Sistemas / Sistemas de Informação
do **UniFAP — Centro Universitário Paraíso** (Juazeiro do Norte - CE, 2026).

- Requisitos (RF01–RF57, RNF01–RNF20): [docs/REQUISITOS DO SISTEMA 2.pdf](docs/REQUISITOS%20DO%20SISTEMA%202.pdf)
- Plano de back-end e divisão de tarefas: [docs/Plano_Backend_Gestao_e_Indicadores.pdf](docs/Plano_Backend_Gestao_e_Indicadores.pdf)
- Modelo do banco: [docs/banco_drawdb_v3.sql](docs/banco_drawdb_v3.sql)
- Como contribuir: [CONTRIBUTING.md](CONTRIBUTING.md)

## Estrutura

```
backend/              API (Node.js + Express + PostgreSQL)
  src/
    config/           leitura do .env e conexão com o banco
    routes/           rotas /api/<modulo>, sem regra de negócio
    controllers/      recebem a requisição e devolvem a resposta
    services/         regras de negócio e validações
    repositories/     SQL parametrizado (o único lugar com SQL)
    middlewares/      autenticação, permissão por perfil, tratamento de erros
    utils/            funções auxiliares (ex.: máscara de CPF)
    app.js            monta o app Express (usado pelos testes)
    server.js         sobe o servidor
  migrations/         mudanças no banco, numeradas (001 = banco v3)
  tests/
    unit/             testes de services e funções
    integration/      testes das rotas com Supertest + banco de teste
frontend/             interface (stack a definir pela equipe do front)
docs/                 requisitos, plano e modelo do banco
```

Cada requisição passa pelas camadas nesta ordem: **rota → controller → service → repository**.
Não escreva SQL dentro da rota nem do controller.

## Stack

| Parte | Escolha |
|---|---|
| Linguagem | JavaScript (Node.js 20 ou mais recente) |
| Servidor | Express |
| Banco | PostgreSQL, acessado com `pg` (node-postgres) e SQL parametrizado |
| Testes | Jest + Supertest, num banco de teste separado |
| Front-end | a definir (veja [frontend/README.md](frontend/README.md)) |

## Como rodar o back-end

Pré-requisitos: [Node.js 20+](https://nodejs.org) e [PostgreSQL 15+](https://www.postgresql.org/download/).

```bash
# 1. Instale as dependências
cd backend
npm install

# 2. Crie o seu .env a partir do exemplo e preencha com os dados do SEU Postgres
cp .env.example .env

# 3. Crie os bancos de desenvolvimento e de teste
createdb gestao_indicadores
createdb gestao_indicadores_test

# 4. Aplique as migrations em ordem (por enquanto, manualmente)
psql -d gestao_indicadores -f migrations/001_esquema_inicial.sql

# 5. Suba a API em modo de desenvolvimento (reinicia ao salvar)
npm run dev
# Teste: http://localhost:3000/api/health  →  {"status":"ok"}
```

Outros comandos:

```bash
npm test                # roda todos os testes
npm run test:coverage   # testes com relatório de cobertura
npm start               # sobe a API sem reinício automático
```

## Divisão de módulos

| Membro | Módulos (CRUD e regras) | Dashboards |
|---|---|---|
| **Saulo** | Base do projeto (conexão, padrões), Unidades, Voluntários, Espaços (cadastro e reservas), Importação de CSV | Início, Institucional, Unidades, Voluntários, Espaços |
| **Isaac** | Login, sessão e permissões, Usuários (lista, cadastro, recuperação de senha), Visitas, Refeições | Visitas, Refeições |
| **George** | Beneficiários, Projetos e atividades, Atendimentos, Frequência, Patrimônio (com movimentações) | Beneficiários, Atendimentos, Frequência, Patrimônio |

O login do Isaac bloqueia os outros módulos. Até ele ficar pronto, use um usuário fixo de teste.

### Etapas

| Etapa | O que entra |
|---|---|
| 0 — Preparação | repositório, banco local, perfis iniciais, `.env` e README |
| 1 — Fundação | conexão, erros, login/sessão/permissões, Unidades, Beneficiários, Projetos e Atividades |
| 2 — Cadastros principais | Voluntários, Usuários, Atendimentos, Frequência |
| 3 — Demais módulos | Espaços, Importação de CSV, Visitas, Refeições, Patrimônio |
| 4 — Dashboards | um por módulo; Início e Institucional por último |
| 5 — Integração e testes | ligar as telas, testar perfis, sessão, filtros e o caso sem dados |

## Padrões da API

- Rotas: `/api/<modulo>` com `GET` (lista), `GET /:id`, `POST`, `PUT /:id` e `PATCH /:id/status`.
- Dashboards: `GET /api/dashboard/<modulo>?periodo=...`, que devolvem `{ kpis, graficos, tabela }`.
  Contagens e somas são feitas no banco (`COUNT`, `SUM`, `GROUP BY`).
- Sem dados: devolver listas vazias, **nunca valores inventados**.
- Perfis: Admin, Supervisor, Operador e Visualizador. CPF aparece mascarado para quem não é Admin.
- Registros com vínculos são inativados (mudança de status), não apagados.
- Operações que gravam em mais de uma tabela rodam em uma única transação.
- Os valores de status permitidos estão no [CONTRIBUTING.md](CONTRIBUTING.md#status-padronizados).
