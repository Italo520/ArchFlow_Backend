# Guia de Componentes

Estrutura e responsabilidade dos principais componentes React do projeto.

## Estrutura de Pastas (`src/`)

```plaintext
src/
├── components/      # Componentes reutilizáveis (Button, Input, Card)
├── pages/           # Componentes de Página (Rotas)
│   ├── auth/        # Login e Registro
│   ├── dashboard/   # Tela principal
│   └── project/     # Detalhes e Criação de Projeto
├── services/        # Integração com API (Axios)
└── App.jsx          # Configuração de Rotas
```

## Componentes Principais

### `Dashboard.jsx`
*   **Rota:** `/dashboard`
*   **Função:** Exibe a lista de projetos do usuário.
*   **Estado:** Carrega a lista de projetos via `ProjectService`.
*   **Interação:** Clique no card leva aos detalhes; Botão "Novo Projeto".

### `ProjectDetails.jsx`
*   **Rota:** `/projects/:id`
*   **Função:** O coração do sistema. Exibe o quadro Kanban.
*   **Features:**
    *   Drag and Drop de Tarefas (entre colunas).
    *   Drag and Drop de Colunas (reordenação).
    *   Criação/Edição/Exclusão de Tarefas e Status.
*   **Dependências:** `@dnd-kit/core`, `@dnd-kit/sortable`.

### `NewProject.jsx`
*   **Rota:** `/projects/new`
*   **Função:** Formulário simples para criar um novo projeto.

## Serviços (`src/services/`)

A camada de serviço isola a lógica de comunicação com o backend.

*   `api.js`: Instância do Axios com interceptors para injetar o Token JWT automaticamente.
*   `auth.service.js`: Login, Register, Logout.
*   `project.service.js`: CRUD de projetos e gestão de stages.
*   `task.service.js`: Criação e movimentação de tarefas.
