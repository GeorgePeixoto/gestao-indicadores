# Front-end

Esta é a pasta do pessoal do front-end do projeto **Gestão e Indicadores**.

Ela ainda está vazia de propósito: a stack do front (framework, bibliotecas, ferramenta de build)
é decidida pela equipe do front e deve ser registrada aqui quando for escolhida.

## O que o front consome

- A API fica em `backend/` e responde em `http://localhost:3000/api` durante o desenvolvimento.
- Rotas de cada módulo: `/api/<modulo>` (`GET` lista, `GET /:id`, `POST`, `PUT /:id`, `PATCH /:id/status`).
- Dashboards: `GET /api/dashboard/<modulo>?periodo=...`, que devolvem `{ kpis, graficos, tabela }`.
- Quando não há dados, a API devolve listas vazias. O front deve mostrar "sem dados para o período",
  nunca números inventados (RNF16).

## Ao começar

Atualize este README com: como instalar, como rodar, a stack escolhida e a estrutura de pastas.
Siga as mesmas regras de branch e pull request do [CONTRIBUTING.md](../CONTRIBUTING.md).
