
# Sprint 4: Refinamento, Testes e Preparação para Lançamento

Este é o último sprint focado no desenvolvimento do MVP. O objetivo é garantir a qualidade, polir a experiência do usuário e preparar tudo para o lançamento interno. A qualidade é um pilar da metodologia Scrum, e este sprint é dedicado a ela.

**Meta do Sprint 4:** Finalizar as funcionalidades do MVP, garantir a qualidade através de testes completos e automatizar o processo de deploy para o lançamento.

Abaixo, o backlog detalhado para este sprint:

## 1. História de Usuário: Filtro Avançado no Dashboard

*   **Como um Gerente de Projetos, eu quero** filtrar o dashboard Kanban por responsável, **para que** eu possa focar na carga de trabalho de membros específicos da equipe.
*   **Critérios de Aceite:**
    *   **Frontend:** Um controle de filtro por "Responsável" é adicionado à tela do dashboard.
    *   **Frontend:** Ao selecionar um usuário, o board exibe apenas as tarefas atribuídas a ele.
    *   **Frontend:** É possível limpar o filtro para voltar à visualização completa.

## 2. Tarefa de Qualidade (QA): Teste de Ponta a Ponta (End-to-End)

*   **Descrição:** Validar o fluxo de usuário principal, desde o cadastro até a manipulação de tarefas no Kanban, para assegurar que todas as partes do sistema funcionem de forma integrada e sem bugs críticos.
*   **Critérios de Aceite:**
    *   O fluxo: Cadastro -> Login -> Criar Projeto -> Criar Tarefa -> Mover Tarefa é executado com sucesso.
    *   A persistência dos dados é confirmada em cada etapa.
    *   As regras de acesso para usuários não autenticados são validadas.

## 3. Tarefa Técnica: Polimento da Interface (UI/UX)

*   **Descrição:** Revisar todas as telas do sistema para aplicar refinamentos visuais, garantindo consistência, responsividade e uma experiência de uso agradável, utilizando o Tailwind CSS.
*   **Critérios de Aceite:**
    *   A identidade visual está consistente entre todas as páginas.
    *   A aplicação se adapta corretamente a diferentes tamanhos de tela (desktop, tablet).
    *   As interações (hovers, cliques) fornecem feedback visual claro.

## 4. Tarefa de DevOps: Finalização do Pipeline de Deploy

*   **Descrição:** Concluir e testar o pipeline de CI/CD no GitHub Actions para automatizar o deploy do frontend na Vercel e do backend na AWS.
*   **Critérios de Aceite:**
    *   O deploy na branch `main` é acionado automaticamente e executado com sucesso.
    *   As variáveis de ambiente de produção são carregadas de forma segura.
    *   Um deploy completo é validado em um ambiente de testes (staging).

Ao final deste sprint, teremos uma versão robusta e testada do produto, pronta para a Sprint Review, onde apresentaremos o MVP completo.

# Tarefas Detalhadas do Sprint 4

## FUNCIONALIDADE 1: Filtro de Tarefas no Dashboard

### Tarefa 1.1: [Backend] Adequar API para Suportar Filtros

*   **Descrição:** Modificar o endpoint de detalhes do projeto para que ele aceite, opcionalmente, um parâmetro de filtro por responsável.
*   **Critérios de Aceite:**
    *   O endpoint `GET /projects/:id` aceita um parâmetro opcional `responsibleId`.
    *   Se o parâmetro for fornecido, a resposta JSON retorna apenas as tarefas do usuário especificado.
    *   Se o parâmetro não for fornecido, o comportamento padrão (retornar todas as tarefas) é mantido.

### Tarefa 1.2: [Frontend] Implementar Componente de Filtro

*   **Descrição:** Construir a interface do filtro no dashboard, permitindo ao usuário selecionar um responsável e atualizar a visualização do board.
*   **Critérios de Aceite:**
    *   Um controle de filtro (dropdown) que lista os membros do projeto é adicionado ao dashboard.
    *   Ao selecionar um membro, a API é chamada com o filtro correspondente e o board é re-renderizado.
    *   Uma opção para "Limpar Filtro" e voltar a exibir todas as tarefas está funcional.

## FUNCIONALIDADE 2: Qualidade e Refinamento

### Tarefa 2.1: [QA/Time] Executar Testes de Ponta a Ponta

*   **Descrição:** Validar o fluxo de usuário principal de forma integrada para garantir a qualidade e a ausência de bugs críticos.
*   **Critérios de Aceite:**
    *   O fluxo: Cadastro -> Login -> Criar Projeto -> Criar Tarefa -> Mover Tarefa no Board -> Filtrar Tarefas é executado sem erros.
    *   Bugs críticos encontrados são corrigidos antes do final do sprint.

### Tarefa 2.2: [Frontend] Realizar Polimento Geral da Interface (UI/UX)

*   **Descrição:** Fazer uma revisão completa de todas as telas e componentes para garantir consistência visual e uma experiência de usuário fluida.
*   **Critérios de Aceite:**
    *   A identidade visual (cores, fontes, espaçamentos) está consistente em todas as páginas.
    *   Indicadores de carregamento (loading) e mensagens de feedback (sucesso/erro) estão implementados em todas as interações assíncronas.

## FUNCIONALIDADE 3: Preparação para Lançamento (Local)

### Tarefa 3.1: [DevOps/Backend] Finalizar Documentação de Execução

*   **Descrição:** Como o deploy em nuvem foi postergado, o foco é garantir que a execução do ambiente completo localmente seja simples e bem documentada.
*   **Critérios de Aceite:**
    *   O `README.md` do backend contém instruções claras sobre como subir a aplicação e o banco de dados com um único comando (`docker compose up`).
    *   O pipeline de CI no GitHub Actions está estável, executando o build do projeto Java a cada push.

### Tarefa 3.2: [DevOps/Frontend] Finalizar Documentação de Execução

*   **Descrição:** Garantir que o frontend possa ser executado em modo de produção localmente de forma simples.
*   **Critérios de Aceite:**
    *   O `README.md` do frontend contém instruções claras sobre como executar o build de produção e servir os arquivos estáticos.
    *   O pipeline de CI no GitHub Actions executa o build de produção do React com sucesso.

Ao final deste sprint, teremos uma versão Alfa do produto, estável, testada e pronta para ser demonstrada e utilizada internamente.
