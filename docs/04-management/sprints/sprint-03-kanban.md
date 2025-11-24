# Sprint 3: Implementação do Kanban Interativo

**Duração:** 1 semana  
**Status:** ✅ Concluído

## Meta do Sprint

Transformar a visualização básica de tarefas em um quadro Kanban totalmente funcional com Drag and Drop.

## Histórias de Usuário

### 1. Visualizar Tarefas em Colunas (Kanban)
**Como** um usuário logado,  
**Eu quero** ver as tarefas organizadas em colunas (A Fazer, Em Andamento, Concluído),  
**Para que** eu tenha uma visão clara do status de cada atividade.

**Critérios de Aceite:**
- [x] Backend: Tabela `Stages` criada para representar colunas.
- [x] Backend: Tarefas associadas a uma Stage (etapa).
- [x] Backend: Endpoint retorna projeto com stages e tasks agrupadas.
- [x] Frontend: Layout Kanban com colunas horizontais.

### 2. Arrastar Tarefas Entre Colunas
**Como** um usuário logado,  
**Eu quero** arrastar uma tarefa de uma coluna para outra,  
**Para que** eu possa atualizar seu status visualmente.

**Critérios de Aceite:**
- [x] Frontend: Integração com biblioteca `@dnd-kit` para Drag and Drop.
- [x] Backend: Endpoint `PATCH /tasks/{id}/stage` para atualizar o stage da tarefa.
- [x] Frontend: Atualização otimista da UI (visual imediato antes da confirmação da API).

---

## Tarefas Técnicas

### [Backend] Modelar Etapas (Stages)
- [x] Entidade `Stage` criada (id, name, order, projectId).
- [x] Relacionamento `Stage` -> `Tasks` (One-to-Many).

### [Frontend] Implementar componente Kanban
- [x] Layout responsivo com colunas (flex-box com scroll horizontal).
- [x] Cards de tarefa com visual limpo.
- [x] Implementação do DndContext e Draggable/Droppable.

---

## Resultado

O Kanban interativo foi implementado com sucesso. Usuários podem agora arrastar tarefas, obtendo feedback visual imediato, tornando a gestão de projetos muito mais intuitiva.
