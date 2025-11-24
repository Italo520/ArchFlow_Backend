# Referência da API

Esta documentação descreve os principais endpoints da API REST do ArchFlow.

> **Nota:** Para uma documentação interativa e completa, acesse o Swagger UI em `/swagger-ui.html` quando a aplicação estiver rodando.

## Autenticação (`/auth`)

### Login
*   **POST** `/auth/login`
*   **Body:** `{ "email": "user@example.com", "password": "123" }`
*   **Response:** `{ "token": "eyJhbGciOi..." }`

### Registro
*   **POST** `/auth/register`
*   **Body:** `{ "name": "Nome", "email": "email", "password": "senha" }`

## Projetos (`/projects`)

### Listar Projetos
*   **GET** `/projects`
*   **Headers:** `Authorization: Bearer <token>`
*   **Response:** `[ { "id": "...", "name": "Projeto A", "status": "TO_DO" } ]`

### Criar Projeto
*   **POST** `/projects`
*   **Body:** `{ "name": "Novo Projeto", "clientName": "Cliente X" }`

### Detalhes do Projeto
*   **GET** `/projects/{id}`
*   **Response:** Retorna o projeto completo com suas etapas (`stages`) e tarefas (`tasks`).

## Tarefas (`/tasks`)

### Criar Tarefa
*   **POST** `/tasks`
*   **Body:** `{ "description": "Fazer planta", "projectId": "...", "stageId": "..." }`

### Mover Tarefa (Drag and Drop)
*   **PATCH** `/tasks/{id}/stage`
*   **Body:** `{ "stageId": "novo-stage-id" }`
