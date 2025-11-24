
# Sprint 3: Implementação do Kanban Interativo

Este é um sprint de alto impacto, onde a visualização estática de dados se transforma em uma ferramenta de gestão dinâmica e interativa, representando um marco fundamental no desenvolvimento ágil do produto.

**Meta do Sprint 3:** Transformar o dashboard em uma ferramenta Kanban funcional, permitindo a visualização e a manipulação de tarefas em tempo real.

Abaixo, o backlog detalhado para este sprint:

## 1. História de Usuário: Visualização do Board Kanban

*   **Como um Arquiteto, eu quero** ver todas as tarefas do projeto como cartões organizados em colunas de etapas, **para que** eu tenha uma visão clara e completa do fluxo de trabalho.
*   **Critérios de Aceite:**
    *   **Frontend:** A página de detalhes do projeto consome os dados do endpoint `GET /projects/:id`.
    *   **Frontend:** O dashboard renderiza uma coluna para cada etapa do projeto.
    *   **Frontend:** As tarefas são exibidas como cartões dentro das colunas correspondentes.
    *   **Frontend:** Cada cartão exibe, no mínimo, a descrição da tarefa e o responsável.

## 2. História de Usuário: Atualização de Status via Drag-and-Drop

*   **Como um Arquiteto, eu quero** poder arrastar um cartão de tarefa de uma coluna para outra, **para que** eu possa atualizar seu status de forma rápida e visual.
*   **Critérios de Aceite:**
    *   **Backend:** Criar um endpoint `PATCH /tasks/:id/stage` que atualiza a etapa de uma tarefa específica.
    *   **Frontend:** Implementar a funcionalidade de arrastar e soltar (drag-and-drop) no board.
    *   **Frontend:** Ao soltar um cartão em uma nova coluna, a API é chamada para persistir a mudança.
    *   **Frontend:** A interface é atualizada instantaneamente para refletir a nova posição do cartão.

## 3. História de Usuário: Adição Rápida de Tarefas

*   **Como um Gerente de Projetos, eu quero** poder adicionar uma nova tarefa diretamente em uma coluna do Kanban, **para que** eu possa planejar o trabalho de forma ágil sem sair da tela de fluxo.
*   **Critérios de Aceite:**
    *   **Frontend:** Cada coluna do Kanban possui um botão "+ Adicionar Tarefa".
    *   **Frontend:** Ao clicar, um formulário inline ou modal permite inserir a descrição e o responsável pela nova tarefa.
    *   **Frontend:** Ao salvar, a tarefa é enviada para a API e o novo cartão aparece na coluna correta.

Ao final deste sprint, a principal ferramenta visual do sistema estará funcional, representando a maior entrega de valor do MVP até o momento.

# Tarefas Detalhadas do Sprint 3

## FUNCIONALIDADE 1: Visualização do Board Kanban

### Tarefa 1.1: [Frontend] Renderizar o Board com Dados Reais

*   **Descrição:** Conectar o componente do dashboard ao endpoint da API para exibir as etapas como colunas e as tarefas como cartões.
*   **Critérios de Aceite:**
    *   A página de detalhes do projeto (`/projetos/:id`) busca os dados do endpoint `GET /projects/:id`.
    *   O dashboard renderiza dinamicamente uma coluna para cada etapa retornada pela API.
    *   As tarefas são renderizadas como "cartões" dentro de suas respectivas colunas de etapa.
    *   Cada cartão exibe, no mínimo, a descrição da tarefa e o nome do responsável.

## FUNCIONALIDADE 2: Atualização de Status via Drag-and-Drop

### Tarefa 2.1: [Backend] Criar Endpoint para Atualização de Etapa da Tarefa

*   **Descrição:** Desenvolver o endpoint da API que permite ao frontend alterar a etapa de uma tarefa, que será acionado pela ação de "arrastar e soltar".
*   **Critérios de Aceite:**
    *   O endpoint `PATCH /tasks/{taskId}/stage` foi criado no `TaskController`.
    *   O endpoint é protegido e recebe o ID da nova etapa no corpo da requisição.
    *   A lógica de serviço atualiza a tarefa no banco de dados, movendo-a para a nova etapa.

### Tarefa 2.2: [Frontend] Implementar Interatividade de Arrastar e Soltar

*   **Descrição:** Adicionar a capacidade de arrastar os cartões de tarefas entre as colunas do Kanban.
*   **Critérios de Aceite:**
    *   Uma biblioteca de drag-and-drop (ex: `react-beautiful-dnd`) foi implementada no board.
    *   Ao soltar um cartão em uma nova coluna, uma chamada `PATCH` é feita para o endpoint `/tasks/{taskId}/stage`.
    *   A interface do board é atualizada visualmente para refletir a mudança.

## FUNCIONALIDADE 3: Adição Rápida de Tarefas

### Tarefa 3.1: [Backend] Criar Endpoint para Criação Rápida de Tarefas

*   **Descrição:** Desenvolver o endpoint da API para permitir a criação de novas tarefas.
*   **Critérios de Aceite:**
    *   O endpoint `POST /tasks` foi criado no `TaskController`.
    *   O endpoint é protegido e recebe os dados da nova tarefa (descrição, responsável, `projectId`, `stageId`, etc.).
    *   A nova tarefa é salva com sucesso no banco de dados.

### Tarefa 3.2: [Frontend] Implementar Adição de Tarefas no Board

*   **Descrição:** Permitir que o usuário crie novas tarefas diretamente pela interface do Kanban.
*   **Critérios de Aceite:**
    *   Cada coluna do Kanban possui um botão "+ Adicionar Tarefa".
    *   Clicar no botão abre um formulário para inserir os dados da nova tarefa.
    *   Ao salvar, a tarefa é enviada para a API `POST /tasks` e o novo cartão aparece na coluna correta sem precisar recarregar a página.

Ao final deste sprint, teremos o coração do nosso produto funcional: um dashboard que não apenas mostra o trabalho, mas permite que a equipe o gerencie de forma visual e dinâmica.
