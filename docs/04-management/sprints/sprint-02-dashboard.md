# Sprint 2: Gestão de Tarefas e Estrutura do Dashboard

**Duração:** 1 semana  
**Status:** ✅ Concluído

## Meta do Sprint

Implementar a visualização de projetos, criação de tarefas e a estrutura básica do dashboard.

## Histórias de Usuário

### 1. Visualizar Meus Projetos
**Como** um usuário logado,  
**Eu quero** ver a lista dos meus projetos criados,  
**Para que** eu possa navegar entre eles.

**Critérios de Aceite:**
- [x] Backend: Endpoint `GET /projects` retorna lista de projetos do usuário.
- [x] Frontend: Dashboard exibe cards com nome do projeto e cliente.
- [x] Frontend: Clique no card navega para detalhes do projeto.

### 2. Adicionar Tarefas a um Projeto
**Como** um usuário logado,  
**Eu quero** adicionar tarefas a um projeto específico,  
**Para que** eu possa organizar as atividades desse projeto.

**Critérios de Aceite:**
- [x] Backend: Tabela `Tasks` criada com relacionamento ao projeto.
- [x] Backend: Endpoint `POST /tasks` para criar tarefas.
- [x] Frontend: Botão "Adicionar Tarefa" na página de detalhes do projeto.
- [x] Frontend: Modal simples para inserir descrição da tarefa.

### 3. Visualizar Estrutura do Projeto
**Como** um usuário logado,  
**Eu quero** ver os detalhes de um projeto e suas tarefas,  
**Para que** eu tenha visibilidade completa do status do trabalho.

**Critérios de Aceite:**
- [x] Backend: End point `GET /projects/{id}` retorna projeto com tarefas.
- [x] Frontend: Página de detalhes exibe informações do projeto e lista de tarefas.

---

## Resultado

Com este sprint, o usuário pode agora visualizar seus projetos e começar a gerenciar tarefas, estabelecendo a base para o Kanban interativo do próximo sprint.
