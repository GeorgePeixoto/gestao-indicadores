# Migrations

Cada mudança no banco vira um arquivo SQL numerado, aplicado em ordem:

```
001_esquema_inicial.sql   ← cópia de docs/banco_drawdb_v3.sql (25 tabelas)
002_<descricao>.sql       ← próxima mudança
```

Regras:

- **Nunca edite uma migration que já foi para a `main`.** Para corrigir, crie a próxima (`00N_...`).
- Toda migration nova precisa ser combinada com o grupo antes, e o pull request dela precisa de revisão.
- Use nomes curtos em `snake_case`, por exemplo `002_status_usuario_unidade.sql`.

Por enquanto as migrations são aplicadas manualmente com o `psql` (veja o README da raiz).
A escolha de uma ferramenta para aplicá-las automaticamente ainda está em aberto.

## Diferenças conhecidas entre o banco v3 e o plano de back-end

Estes pontos precisam de uma migration combinada com o grupo:

| Tabela | Situação no v3 | O que o plano espera |
|---|---|---|
| `usuario` | `ativo` boolean | status `ativo`, `inativo`, `pendente` |
| `unidade` | `ativa` boolean | status `ativa`, `em_manutencao`, `inativa` |
| `visita` | sem `tipo` nem `status` | tipo + status `agendada`, `realizada`, `cancelada` |
| `refeicao` | só `quantidade_servida` | também beneficiários atendidos e desperdício |
| `utilizacao_espaco` | sem status | `confirmada`, `realizada` |
| `beneficiario` | sem vínculo com projeto | vínculo beneficiário ↔ projeto |
| — | não há tabela de sessão | sessão com expiração por inatividade |
