# Como contribuir

Regras combinadas no plano de back-end. Valem para o back-end e o front-end.

## Branches

- A `main` só recebe código por **pull request**. Ninguém faz push direto na `main`.
- Use **uma branch por módulo**, criada a partir da `main` atualizada:

  ```bash
  git switch main
  git pull
  git switch -c feature/beneficiarios
  ```

- Nomes de branch:
  - `feature/<modulo>` para um módulo novo (ex.: `feature/beneficiarios`, `feature/login`)
  - `fix/<descricao>` para corrigir um erro (ex.: `fix/mascara-cpf`)
  - `docs/<descricao>` para mudar só documentação

## Pull requests

1. Antes de abrir o PR, atualize a branch com a `main` e rode `npm test` sem falhas.
2. Abra o PR para a `main` e descreva o que mudou e como testar.
3. **Outro membro do grupo revisa e aprova antes do merge.** Ninguém aprova o próprio PR.
4. Depois do merge, apague a branch.

## Commits

Mensagens curtas no imperativo, dizendo o que o commit faz:

```
Adiciona CRUD de beneficiários
Corrige máscara de CPF para perfil Operador
```

## Checklist para considerar um módulo pronto

- [ ] Rotas de listar, ver, criar, editar e inativar funcionando e testadas.
- [ ] Campos obrigatórios e datas validados no servidor (ex.: a data final não pode ser antes da inicial).
- [ ] Status gravados apenas com os valores da tabela abaixo.
- [ ] Permissão por perfil aplicada em cada rota.
- [ ] Rotas documentadas (método, caminho, exemplo de entrada e de saída).
- [ ] Pull request aprovado por outro membro.

## Status padronizados

Todos usam exatamente estes textos, em minúsculas e sem acento:

| Entidade | Valores permitidos |
|---|---|
| Usuário | `ativo`, `inativo`, `pendente` |
| Projeto, atendimento | `pendente`, `em_andamento`, `concluido`, `cancelado` |
| Voluntário | `ativo`, `inativo`, `em_validacao` |
| Unidade | `ativa`, `em_manutencao`, `inativa` |
| Visita | `agendada`, `realizada`, `cancelada` |
| Espaço (reserva) | `confirmada`, `realizada` |
| Patrimônio | `em_uso`, `em_manutencao`, `inativo` |
| Frequência | `presente`, `falta`, `falta_justificada` |

## Código

- Camadas: **rota → controller → service → repository**. SQL só no repository.
- Consultas **sempre parametrizadas** (`$1`, `$2`...). Nunca concatene texto do usuário no SQL.
- Senhas só como hash. Nunca registre senha, token ou CPF completo em log.
- Mudanças no banco só por uma migration nova em `backend/migrations/`, combinada com o grupo antes.

## Segredos

- **Nunca faça commit do `.env`**, de senhas, tokens ou chaves. Ele já está no `.gitignore`.
- Variável nova: adicione ao `.env.example` com um valor de exemplo, não com o valor real.
- Se um segredo for parar no repositório por engano, avise o grupo e troque o segredo na hora.
  Apagar o commit não basta.
