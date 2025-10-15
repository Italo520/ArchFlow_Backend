# Painel de Controle e Tarefas dos Agentes de IA

Este documento centraliza o backlog de desenvolvimento do projeto ArchFlow e descreve o fluxo de trabalho para a equipe de agentes de IA. O PM-Agent é o principal responsável por manter este arquivo atualizado.

## Fluxo de Trabalho (Workflow)

Todas as tarefas devem seguir o ciclo de vida abaixo para garantir qualidade, consistência e documentação adequada.

1.  **Criação da Tarefa:** O PM-Agent cria uma nova tarefa na seção "Backlog" com uma descrição clara, critérios de aceitação e um ID único (ex: TASK-001).
2.  **Atribuição:** O PM-Agent move a tarefa para "Em Andamento" e a atribui ao(s) agente(s) principal(is) (Backend-Agent, Frontend-Agent).
3.  **Desenvolvimento:** O agente de desenvolvimento executa a tarefa.
    *   Escreve o código da funcionalidade.
    *   Cria/atualiza os testes unitários relevantes.
4.  **Revisão e Testes:** Após o desenvolvimento, a tarefa é passada para o QA-Agent.
    *   O QA-Agent executa a suíte de testes completa (unitários, integração, etc.).
    *   Se um bug for encontrado, a tarefa retorna ao desenvolvedor com um relatório detalhado.
    *   Se os testes passarem, a tarefa é aprovada.
5.  **Implantação (Deploy):** A tarefa é passada para o DevOps-Agent.
    *   O DevOps-Agent integra o novo código à branch principal e realiza o deploy no ambiente de produção/homologação.
6.  **Documentação:** Em paralelo, a tarefa é sinalizada para o Documentation-Agent.
    *   O Docs-Agent atualiza os manuais (MANUAL\_DO\_USUARIO.md, MANUAL\_DE\_INSTALACAO.md, etc.) conforme a nova funcionalidade.
7.  **Conclusão:** Após o deploy bem-sucedido e a atualização da documentação, o PM-Agent move a tarefa para "Concluído" e arquiva os detalhes.

---

## Backlog da Tarefas:

### Tarefas Prioritárias (A Fazer)

#### Sprint 1: Autenticação e Criação de Projetos

*   **ID:** FE-AUTH-006
*   **Título:** [Frontend] Construir Página de Cadastro
*   **Descrição:** Desenvolver a interface da página de cadastro (/cadastro) em React, incluindo o formulário com validação e a integração com o endpoint POST /auth/register.
*   **Agentes Envolvidos:** Frontend-Agent.

*   **ID:** BE-AUTH-007
*   **Título:** [Backend] Implementar Login e Geração de Token JWT
*   **Descrição:** Desenvolver o endpoint POST /auth/login utilizando Spring Security para validar as credenciais e, em caso de sucesso, gerar e retornar um token JWT válido.
*   **Agentes Envolvidos:** Backend-Agent.

*   **ID:** FE-AUTH-008
*   **Título:** [Frontend] Construir Página de Login e Gerenciamento de Sessão
*   **Descrição:** Desenvolver a interface da página de login (/login), implementar o armazenamento seguro do token JWT no navegador após o login e configurar o axios para enviar o token em requisições futuras.
*   **Agentes Envolvidos:** Frontend-Agent.

*   **ID:** BE-PROJ-009
*   **Título:** [Backend] Criar Endpoint para Criação de Projetos
*   **Descrição:** Desenvolver o endpoint POST /projects para que um usuário autenticado possa criar um novo projeto. O endpoint deve ser protegido e associar o projeto criado ao usuário logado.
*   **Agentes Envolvidos:** Backend-Agent.

*   **ID:** FE-PROJ-010
*   **Título:** [Frontend] Implementar Funcionalidade de Criar e Listar Projetos
*   **Descrição:** Desenvolver a Tela Principal (/projetos) que busca e exibe os projetos do usuário. Implementar um botão "+ Novo Projeto" que abre um formulário para cadastrar um novo projeto via API.
*   **Agentes Envolvidos:** Frontend-Agent.

#### Sprint 2: Visualização de Dados

*   **ID:** BE-PROJ-011
*   **Título:** [Backend] Desenvolver Endpoint de Detalhes do Projeto
*   **Descrição:** Implementar o endpoint GET /projects/:id que retorna todos os dados de um projeto específico, incluindo suas etapas (colunas) e tarefas associadas.
*   **Agentes Envolvidos:** Backend-Agent.

*   **ID:** FE-ROUTE-012
*   **Título:** [Frontend] Implementar Roteamento para Detalhes do Projeto
*   **Descrição:** Configurar o React Router para que, ao clicar em um card de projeto na tela principal, o usuário seja navegado para a página de detalhes do projeto (ex: /projetos/123).
*   **Agentes Envolvidos:** Frontend-Agent.

#### Sprint 3: Interatividade do Kanban

*   **ID:** BE-KANBAN-013
*   **Título:** [Backend] Criar Endpoint para Atualização de Etapa da Tarefa
*   **Descrição:** Desenvolver o endpoint PATCH /tasks/:id/stage para permitir a atualização da etapa (coluna) de uma tarefa, atendendo à funcionalidade de arrastar e soltar do frontend.
*   **Agentes Envolvidos:** Backend-Agent.

*   **ID:** FE-KANBAN-014
*   **Título:** [Frontend] Implementar o Dashboard Kanban Interativo
*   **Descrição:** Desenvolver o componente do board Kanban que renderiza colunas e tarefas a partir da API. Implementar a funcionalidade de arrastar e soltar (drag-and-drop) e conectar a ação ao endpoint PATCH /tasks/:id/stage para persistir as mudanças.
*   **Agentes Envolvidos:** Frontend-Agent.

#### Sprint 4: Refinamento

*   **ID:** FE-KANBAN-015
*   **Título:** [Frontend] Implementar Filtro por Responsável no Kanban
*   **Descrição:** Adicionar um componente de filtro (dropdown) na tela do Kanban que, ao ser alterado, refaz a chamada à API para exibir apenas as tarefas do responsável selecionado.
*   **Agentes Envolvidos:** Frontend-Agent.

---

### Tarefas em Andamento
(Nenhuma tarefa em andamento no momento)

### Tarefas Concluídas
*   **ID:** DEVOPS-SETUP-001
*   **Título:** [Git] Criar e Estruturar Repositórios no GitHub
*   **Descrição:** Criar os repositórios projeto-arquitetura-backend e projeto-arquitetura-frontend, estabelecendo as branches main (protegida) e develop, além dos arquivos .gitignore e README.md iniciais.
*   **Agentes Envolvidos:** DevOps-Agent.

*   **ID:** BE-ENV-002
*   **Título:** [Backend] Configurar Ambiente Local com Spring Boot e PostgreSQL
*   **Descrição:** Inicializar o projeto Spring Boot com as dependências essenciais (Web, Security, Data JPA) e configurar um banco de dados PostgreSQL local via Docker, garantindo que a aplicação conecte-se ao banco ao subir.
*   **Agentes Envolvidos:** Backend-Agent.

*   **ID:** FE-ENV-003
*   **Título:** [Frontend] Configurar Ambiente Local com React (Vite)
*   **Descrição:** Inicializar o projeto React utilizando Vite e JavaScript. Adicionar as dependências react-router-dom para roteamento, axios para chamadas HTTP e configurar a estrutura de pastas base (components, pages, services).
*   **Agentes Envolvidos:** Frontend-Agent.

*   **ID:** DEVOPS-CI-004
*   **Título:** [DevOps] Configurar Validação Automática com GitHub Actions
*   **Descrição:** Criar um workflow de Integração Contínua (CI) em ambos os repositórios que executa o build (./mvnw clean package para o backend, npm run build para o frontend) a cada push na branch develop para garantir a integridade do código.
*   **Agentes Envolvidos:** DevOps-Agent.

*   **ID:** BE-AUTH-005
*   **Título:** [Backend] Criar Endpoint de Cadastro de Usuário
*   **Descrição:** Desenvolver o endpoint POST /auth/register que cria um novo usuário no banco de dados. A senha deve ser criptografada com BCrypt e o sistema deve validar se o e-mail já está em uso.
*   **Agentes Envolvidos:** Backend-Agent.
