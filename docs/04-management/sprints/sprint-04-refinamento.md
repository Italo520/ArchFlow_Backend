# Sprint 4: Filtros, Refinamento e Preparação para Lançamento

**Duração:** 1 semana  
**Status:** ✅ Concluído

## Meta do Sprint

Refinar a experiência do usuário, implementar filtros, melhorar a responsividade e preparar o produto para o lançamento da versão MVP.

## Histórias de Usuário

### 1. Filtrar Tarefas por Responsável
**Como** um gestor de projeto,  
**Eu quero** filtrar as tarefas por responsável,  
**Para que** eu possa ver apenas as atividades de um membro específico da equipe.

**Critérios de Aceite:**
- [x] Backend: Suporte a query param `?assigneeId=...` no endpoint de detalhes do projeto.
- [x] Frontend: Dropdown ou filtro visual para selecionar um responsável.

### 2. Gerenciar Status (Stages) Dinamicamente
**Como** um usuário logado,  
**Eu quero** poder adicionar, editar e remover colunas do Kanban,  
**Para que** eu possa personalizar o fluxo de trabalho do meu projeto.

**Critérios de Aceite:**
- [x] Backend: Endpoints para CRUD de Stages.
- [x] Frontend: Modal para criar novo status.
- [x] Frontend: Edição inline do nome do status.
- [x] Frontend: Botão de exclusão com confirmação.

### 3. Reordenar Colunas por Drag and Drop
**Como** um usuário logado,  
**Eu quero** arrastar colunas inteiras para reordená-las,  
**Para que** eu possa organizar o Kanban da forma que fizer mais sentido para mim.

**Critérios de Aceite:**
- [x] Frontend: Drag and Drop horizontal de colunas.
- [x] Backend: Endpoint para salvar nova ordem das colunas.

---

## Tarefas Técnicas

### [Backend] Implementar Filtros
- [x] Query parameter `assigneeId` no endpoint `GET /projects/{id}`.

### [Backend] CRUD de Stages
- [x] Métodos no `ProjectService` para `addStage`, `updateStage`, `deleteStage`, `reorderStages`.

### [Frontend] Gerenciamento de Status
- [x] Modal de criação de status.
- [x] Edição inline (clicar no nome para editar).
- [x] Ícone de exclusão com confirmação.
- [x] Drag and Drop de colunas usando `SortableContext`.

### [Geral] Testes e Refinamentos
- [x] Testes manuais em diferentes navegadores.
- [x] Ajustes de responsividade para tablets.
- [x] Correções de bugs e null safety no backend.

---

## Resultado

O MVP está completo com funcionalidades essenciais, personalização de workflows e uma experiência de usuário polida. O produto está pronto para testes alpha com usuários reais.
