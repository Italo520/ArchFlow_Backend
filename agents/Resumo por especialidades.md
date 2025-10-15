
# Resumo do Planejamento de Sprints (Versão Corrigida)

## Roadmap do Desenvolvedor Backend (Java)

**Missão:** Construir uma API robusta e segura com Spring Boot, garantindo a infraestrutura necessária para suportar a aplicação.

### Sprint 0: Fundação e Ambiente
* Configurar a infraestrutura na AWS (RDS para PostgreSQL, etc.) com Terraform.
* Estruturar o pipeline de CI/CD no GitHub Actions para um projeto Maven/Gradle.
* Inicializar o projeto com Spring Boot e as dependências (Spring Web, Security, Data JPA).
* Configurar a conexão com o banco de dados via JPA/Hibernate.

### Sprint 1: Autenticação e Projetos
* Implementar a autenticação com Spring Security e JWT (endpoints de registro e login).
* Criar as entidades JPA (@Entity) para Users e Projects.
* Desenvolver o ProjectController com o endpoint POST /projects (protegido).

### Sprint 2: Tarefas e Relações de Dados
* Criar as entidades JPA para Tasks e Stages e mapear os relacionamentos (@OneToMany, etc.).
* Desenvolver o ProjectController com os endpoints GET /projects e GET /projects/:id.
* Implementar a lógica no TaskService para criação de tarefas associadas.

### Sprint 3: Interatividade do Kanban
* Desenvolver o endpoint PATCH /tasks/:id/stage no TaskController para a atualização de status via drag-and-drop.

### Sprint 4: Qualidade e Deploy
* Dar suporte aos testes de ponta a ponta e otimizar as queries se necessário.
* Finalizar o pipeline de deploy para empacotar a aplicação (JAR/WAR) e publicá-la na AWS.

## Roadmap do Desenvolvedor Frontend (React)

**Missão:** Criar uma interface de usuário reativa e funcional com React, proporcionando uma experiência de gestão visualmente clara.

### Sprint 0: Fundação e Ambiente
* Inicializar o projeto React (utilizando Vite ou Create React App) com JavaScript.
* Integrar o framework de CSS (ex: Tailwind CSS) e definir a estrutura de pastas.

### Sprint 1: Fluxo de Autenticação e Criação de Projetos
* Desenvolver os componentes para as telas de Cadastro e Login.
* Implementar a lógica de autenticação (chamadas à API, gerenciamento de token).
* Construir o formulário de criação de projetos e conectá-lo à API Java.

### Sprint 2: Visualização de Dados
* Desenvolver o componente para listar os projetos na página principal.
* Implementar o roteamento (com React Router) para a página de detalhes do projeto.

### Sprint 3: O Dashboard Kanban Interativo
* Desenvolver o componente Kanban, renderizando colunas e cartões com os dados da API.
* Implementar a funcionalidade de arrastar e soltar (drag-and-drop).
* Implementar a criação de tarefas diretamente pelo dashboard.

### Sprint 4: Refinamento e Finalização
* Implementar o filtro por responsável no Kanban.
* Realizar o polimento geral da UI/UX.
* Participar dos testes e validar o deploy do frontend (em Netlify, Vercel, etc.).
