# Guia de Contribuição - ArchFlow

Obrigado pelo interesse em contribuir com o ArchFlow! Este documento define o processo para contribuir com o código, garantindo qualidade e consistência.

## 🔄 Git Flow

Utilizamos uma variação simplificada do Git Flow:

1.  **main**: Código em produção (estável).
2.  **develop**: Código em desenvolvimento (staging).
3.  **feature/nome-da-feature**: Branches para novas funcionalidades.
4.  **fix/nome-do-bug**: Branches para correção de erros.

### Como criar uma nova feature

1.  Crie uma branch a partir da `develop`:
    ```bash
    git checkout develop
    git checkout -b feature/minha-nova-funcionalidade
    ```
2.  Desenvolva e faça commits seguindo o padrão abaixo.
3.  Abra um Pull Request (PR) para a `develop`.

## 📝 Padrão de Commits (Conventional Commits)

Nós seguimos a convenção do [Conventional Commits](https://www.conventionalcommits.org/).

Estrutura: `<tipo>(<escopo opcional>): <descrição>`

Tipos permitidos:
*   **feat**: Nova funcionalidade.
*   **fix**: Correção de bug.
*   **docs**: Alterações apenas na documentação.
*   **style**: Formatação, falta de ponto e vírgula, etc (sem alteração de código de produção).
*   **refactor**: Refatoração de código (sem nova feature ou correção de bug).
*   **test**: Adição ou correção de testes.
*   **chore**: Atualização de tarefas de build, configurações de pacote, etc.

Exemplos:
*   `feat(auth): adiciona login com google`
*   `fix(kanban): corrige erro ao arrastar card vazio`
*   `docs: atualiza readme com instruções de setup`

## ✅ Checklist do Pull Request

Antes de abrir um PR, verifique:
- [ ] O código compila sem erros.
- [ ] Novos testes foram adicionados (se aplicável).
- [ ] A documentação foi atualizada.
- [ ] O código segue o estilo do projeto (Prettier/ESLint para JS, Google Style para Java).

## 🐛 Reportando Bugs

Use a aba "Issues" do GitHub. Descreva:
1.  Passos para reproduzir.
2.  Comportamento esperado.
3.  Comportamento real.
4.  Screenshots ou logs.
