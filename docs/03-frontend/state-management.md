# Gerenciamento de Estado

O ArchFlow utiliza uma abordagem mista para gerenciamento de estado, priorizando a simplicidade e performance.

## 1. Estado Local (React `useState`)
Para a maioria das interações de UI, o estado local é suficiente.
*   **Exemplo:** Controle de modais (`isDialogOpen`), inputs de formulário, loading states.

## 2. Estado do Servidor (Data Fetching)
Atualmente, utilizamos `useEffect` + `Services` para buscar dados.
*   **Fluxo:** O componente monta -> `useEffect` chama o Service -> Service chama API -> Estado local é atualizado com os dados.

> **Futuro:** Planejamos migrar para **React Query (TanStack Query)** para melhor cache, refetching automático e tratamento de erros.

## 3. Drag and Drop (`@dnd-kit`)

O estado do Kanban é complexo pois envolve interações físicas (arrastar).

### Como funciona:
1.  **Sensores:** Detectam o input (mouse, touch, teclado).
2.  **Contexto (`DndContext`):** Gerencia o ciclo de vida do arraste.
3.  **Colisão:** Algoritmo `closestCorners` detecta onde o item foi solto.
4.  **Atualização Otimista:**
    *   Ao soltar o card, atualizamos o estado visual **imediatamente** (`setProject`).
    *   Em background, enviamos a requisição para a API (`TaskService.updateTaskStage`).
    *   Se a API falhar, revertemos o estado (rollback) ou recarregamos os dados.

```javascript
// Exemplo simplificado do handler
const handleDragEnd = async (event) => {
    // 1. Calcula nova posição
    // 2. Atualiza UI instantaneamente (setProject)
    // 3. Chama API
    await TaskService.updateTaskStage(...);
};
```
