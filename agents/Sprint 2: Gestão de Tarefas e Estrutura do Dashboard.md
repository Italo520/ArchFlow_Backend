
# Sprint 2: Gestão de Tarefas e Estrutura do Dashboard

O foco agora é construir as fundações para a visualização Kanban, finalizando a lógica de negócios no backend e criando as telas necessárias no frontend para exibir os dados.

**Meta do Sprint 2:** Permitir que o usuário navegue da lista de projetos para uma página de detalhes e preparar o backend com toda a lógica de tarefas e etapas.

Abaixo, o backlog detalhado para este sprint:

## 1. História de Usuário: Visualização da Lista de Projetos

*   **Como um usuário logado, eu quero** ver uma lista de todos os meus projetos na página principal, **para que** eu possa ter uma visão geral do meu trabalho e acessar um projeto específico.
*   **Critérios de Aceite:**
    *   **Backend:** O endpoint `GET /projects` retorna a lista de projetos do usuário autenticado.
    *   **Frontend:** A página principal busca e exibe os projetos em formato de lista ou cards.
    *   **Frontend:** Cada item da lista é um link que leva à página de detalhes do projeto (ex: `/projetos/123`).

## 2. Tarefa Técnica: Modelagem de Dados de Tarefas e Etapas

*   **Descrição:** No backend, criar os modelos de dados (schemas) para "Tarefas" e "Etapas" e estabelecer as relações corretas: um projeto tem muitas etapas, uma etapa tem muitas tarefas, e uma tarefa tem um responsável.
*   **Critérios de Aceite:**
    *   **Backend:** As relações (Project -> Stages -> Tasks -> User) são definidas.
    *   **Backend:** A migração do banco de dados é executada com sucesso.

## 3. História de Usuário: Acesso aos Detalhes de um Projeto

*   **Como um usuário logado, eu quero** clicar em um projeto e acessar sua página de detalhes, **para que** eu possa ver as informações e o futuro dashboard daquele projeto.
*   **Critérios de Aceite:**
    *   **Backend:** O endpoint `GET /projects/:id` retorna os dados de um projeto específico, incluindo suas etapas e tarefas associadas.
    *   **Frontend:** Uma página de detalhes do projeto (`/projetos/[id]`) é criada.
    *   **Frontend:** A página busca e exibe o título do projeto e a estrutura vazia do dashboard, pronta para receber os componentes do Kanban.

Ao final deste sprint, o usuário poderá navegar da lista de projetos para uma página de detalhes específica. Mais importante, o backend estará totalmente preparado para suportar a interatividade do Kanban que construiremos no Sprint 3.

# Tarefas Detalhadas do Sprint 2

## FUNCIONALIDADE 1: Visualização da Lista de Projetos

### Tarefa 1.1: [Backend] Criar Endpoint de Listagem de Projetos

*   **Descrição:** Desenvolver o endpoint da API que retorna a lista de projetos pertencentes ao usuário autenticado.
*   **Critérios de Aceite:**
    *   O endpoint `GET /projects` foi criado no `ProjectController`.
    *   O endpoint é protegido e retorna apenas os projetos do usuário logado.
    *   O endpoint retorna uma lista contendo, no mínimo, o ID, Nome do Projeto e Nome do Cliente de cada projeto.

### Tarefa 1.2: [Frontend] Desenvolver Página com a Lista de Projetos

*   **Descrição:** Construir a interface da página principal que busca e exibe a lista de projetos do usuário.
*   **Critérios de Aceite:**
    *   A página principal (`/projetos`) faz uma chamada `GET` para o endpoint `/projects` após o login.
    *   Os projetos são exibidos como uma lista de cards ou itens clicáveis.
    *   Cada item na lista é um link que navega para a página de detalhes daquele projeto (ex: `/projetos/123`).

## FUNCIONALIDADE 2: Estrutura de Tarefas e Etapas

### Tarefa 2.1: [Backend] Modelar Entidades de Tarefas e Etapas

*   **Descrição:** Criar as entidades JPA `Task` e `Stage` e mapear seus relacionamentos com `Project` e `User`.
*   **Critérios de Aceite:**
    *   A entidade `@Entity Stage` foi criada e relacionada a `Project` (`@ManyToOne`).
    *   A entidade `@Entity Task` foi criada com todos os campos necessários e relacionada a `Stage` e `User` (responsável).
    *   As alterações no schema do banco de dados foram aplicadas com sucesso.

## FUNCIONALIDADE 3: Acesso aos Detalhes do Projeto

### Tarefa 3.1: [Backend] Criar Endpoint de Detalhes do Projeto

*   **Descrição:** Desenvolver o endpoint que retorna os dados completos de um projeto, incluindo suas etapas e todas as tarefas associadas.
*   **Critérios de Aceite:**
    *   O endpoint `GET /projects/:id` foi criado.
    *   O endpoint valida se o usuário autenticado tem permissão para acessar o projeto solicitado.
    *   O JSON de resposta contém o projeto e listas aninhadas de suas etapas e tarefas.

### Tarefa 3.2: [Frontend] Desenvolver Página de Detalhes do Projeto

*   **Descrição:** Construir a página que exibirá as informações de um projeto específico e servirá como base para o dashboard Kanban.
*   **Critérios de Aceite:**
    *   A rota dinâmica `/projetos/:id` foi criada com React Router.
    *   A página busca os dados do endpoint `GET /projects/:id`.
    *   O nome do projeto é exibido como título principal.
    *   Um layout de colunas (placeholder) é renderizado, pronto para se tornar o Kanban no próximo sprint.

Ao final deste sprint, a estrutura de navegação da aplicação estará completa e o backend estará pronto para suportar todas as funcionalidades do MVP.
