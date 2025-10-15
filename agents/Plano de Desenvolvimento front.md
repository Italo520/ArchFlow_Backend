# Plano Estratégico de Desenvolvimento Frontend para o MVP

## 1. Análise Estratégica e Definição da Stack (Fundação do Projeto)
Antes de codificar a primeira tela, é crucial definir a fundação técnica e visual. Minhas recomendações são baseadas em produtividade, performance e escalabilidade para 2025.

### 1.1. Stack Tecnológico Frontend
*   **Linguagem:** `TypeScript`. Para um projeto com múltiplos endpoints e modelos de dados (Usuário, Projeto, Tarefa), o TypeScript é inegociável. Ele garantirá a segurança de tipos, reduzirá bugs e melhorará a colaboração.
*   **Framework:** `React` (via `Vite`). React oferece o maior ecossistema, facilitando a contratação e a busca por soluções. Usaremos Vite como build tool pela sua velocidade de desenvolvimento superior e HMR (Hot Module Replacement) instantâneo.
*   **Meta-Framework:** Não necessário para este MVP. Um SPA (Single Page Application) puro com Vite é suficiente e mais leve. Se SEO ou performance de carregamento inicial se tornarem críticos no futuro, poderemos migrar para o Next.js.

### 1.2. Arquitetura Frontend
*   **Abordagem:** SPA (Single Page Application). Ideal para uma aplicação tipo dashboard, onde o usuário permanece logado e interage com dados dinâmicos.
*   **Gerenciamento de Estado (State Management):**
    *   **Estado Global:** `Zustand`. É extremamente leve (2.9kb), com uma API simples e poderosa, perfeita para gerenciar o estado de autenticação (token JWT, dados do usuário) sem a complexidade do Redux.
    *   **Estado do Servidor (API Data):** `TanStack Query` (React Query). Essencial para gerenciar o ciclo de vida dos dados da API (fetching, caching, revalidação). Ele simplificará os estados de carregamento, erro e dados vazios, além de otimizar as chamadas de rede.
*   **Roteamento:** `TanStack Router` ou `React Router`. Ambos são excelentes. TanStack Router tem integração nativa com Vite e oferece features modernas como rotas type-safe.

### 1.3. UI/UX, Design System e Component Library
*   **Component Library:** `Mantine UI`. É uma excelente escolha para MVPs. Possui um conjunto vasto de componentes prontos e acessíveis (Modals, Inputs, Buttons, Selects), é altamente customizável e tem um ótimo suporte a hooks para funcionalidades complexas. Isso acelera o desenvolvimento drasticamente.
*   **Styling:** `CSS Modules` ou `Tailwind CSS`. Mantine já oferece um sistema de theming robusto. Podemos estendê-lo com CSS Modules para estilos específicos ou integrar o Tailwind CSS para prototipação rápida, se a equipe tiver familiaridade. Para este projeto, o sistema de theming do Mantine será suficiente.

### 1.4. Paleta de Cores & Identidade Visual (SaaS/Dashboard)
A aplicação tem um caráter profissional e de produtividade. Proponho uma paleta que inspira confiança e clareza.
*   **Estrutura da Paleta:**
    *   **Primária (Ações principais, links):** Azul - Confiança e profissionalismo.
        *   `--primary-600`: `#2563eb` (Botões principais, links ativos)
        *   `--primary-500`: `#3b82f6` (Base)
    *   **Neutra (Texto, fundos, bordas):** Cinza Frio - Clareza e foco.
        *   `--neutral-900`: `#111827` (Texto principal)
        *   `--neutral-500`: `#6b7280` (Texto secundário, placeholders)
        *   `--neutral-100`: `#f3f4f6` (Fundo da página)
        *   `--neutral-0`: `#ffffff` (Fundo dos cards/modais)
    *   **Semântica (Feedback ao usuário):**
        *   **Sucesso:** Verde - `#16a34a`
        *   **Erro:** Vermelho - `#dc2626`
        *   **Aviso:** Amarelo - `#facc15`

### 1.5. Estratégia de Testes
Desde o MVP, a qualidade é fundamental.
*   **Unitários/Integração (70%):** `Vitest` + `React Testing Library`. Para testar componentes isoladamente e pequenas interações.
*   **End-to-End (E2E) (10%):** `Playwright`. Para testar os fluxos críticos de usuário: 1. Cadastro -> Login -> Logout. 2. Criação de Projeto. 3. Drag-and-drop de tarefa.

## 2. Plano de Desenvolvimento por Tela
A seguir, o detalhamento técnico e visual para cada tela.

### 2.1. Tela de Cadastro (Register)
*   **Análise de UX/UI:** O foco é a simplicidade e a redução de atrito. A validação deve ocorrer em tempo real (on blur) para fornecer feedback imediato. O layout centralizado (Fitts's Law) mantém o foco do usuário na tarefa principal.
*   **Wireframe (ASCII Art):**
    ```
      ┌──────────────────────────────────┐
      │          [LOGO DA EMPRESA]       │
      ├──────────────────────────────────┤
      │         Crie sua Conta           │
      │                                  │
      │  ┌────────────────────────────┐  │
      │  │ Nome Completo              │  │
      │  └────────────────────────────┘  │
      │  ┌────────────────────────────┐  │
      │  │ E-mail                     │  │
      │  └────────────────────────────┘  │
      │  ┌────────────────────────────┐  │
      │  │ Senha (mín. 8 caracteres)  │  │
      │  └────────────────────────────┘  │
      │                                  │
      │  [       CADASTRAR (disabled)   ]  │
      │                                  │
      │   Já tem uma conta? Faça o login   │
      └──────────────────────────────────┘
    ```
*   **Componentes (Atomic Design):**
    *   **Atoms:** `Input`, `Button`, `Link`, `Title`.
    *   **Molecule:** `FormField` (combina `Label`, `Input` e `ErrorMessage`).
    *   **Organism:** `RegisterForm`.
*   **Stack Técnica Específica:**
    *   **Formulários:** `React Hook Form` para gerenciamento de estado e performance.
    *   **Validação:** `Zod` para criar um schema de validação robusto e type-safe.
    *   **Requisição API:** `useMutation` do `TanStack Query` para lidar com a chamada `POST /auth/register`, gerenciando os estados de `isLoading`, `isError`.
*   **Fluxo de Dados e Estado:**
    *   O estado do formulário é totalmente local, gerenciado pelo `React Hook Form`.
    *   Ao submeter, `useMutation` é chamado. O estado `isLoading` da mutação é usado para exibir um spinner no botão.
    *   Em caso de sucesso (`onSuccess`), redireciona para `/login` e exibe uma notificação de sucesso.
    *   Em caso de erro (`onError`), a mensagem da API é exibida abaixo do formulário.
*   **Testes Essenciais:**
    *   **Unit/Integration:** Validar que o botão fica habilitado apenas quando o formulário é válido. Testar as mensagens de erro para cada campo.
    *   **E2E:** Simular um fluxo de cadastro completo (preencher, submeter, verificar redirecionamento).

### 2.2. Tela de Login
*   **Análise de UX/UI:** Similar ao cadastro, o processo deve ser rápido e eficiente. O feedback de erro deve ser claro e direto (ex: "E-mail ou senha inválidos"), sem especificar qual campo está errado por segurança.
*   **Componentes (Atomic Design):** Reutilização máxima dos componentes da tela de cadastro.
    *   **Organism:** `LoginForm`.
*   **Stack Técnica Específica:** Mesma stack da tela de cadastro (`React Hook Form`, `Zod`, `TanStack Query`).
*   **Fluxo de Dados e Estado:**
    *   O estado do formulário é local.
    *   `useMutation` é usado para a chamada `POST /auth/login`.
    *   Em caso de sucesso (`onSuccess`):
        *   A resposta (contendo o token JWT) é recebida.
        *   O token é salvo (em `localStorage` ou `cookie`).
        *   O estado global do `Zustand` é atualizado com os dados do usuário.
        *   A instância do `axios` é configurada para incluir o `Authorization: Bearer <token>` em todos os cabeçalhos de requisições futuras.
        *   O usuário é redirecionado para `/projetos` (Tela Principal).
*   **Testes Essenciais:**
    *   **Unit/Integration:** Testar o fluxo de submissão e o tratamento de erro.
    *   **E2E:** Validar o login bem-sucedido, o armazenamento do token e o redirecionamento para a página de projetos.

### 2.3. Tela Principal (Lista de Projetos)
*   **Análise de UX/UI:** A hierarquia visual é chave. O botão `+ Novo Projeto` deve ser o principal Call-to-Action. Os estados de carregamento e vazio são cruciais para uma boa experiência, evitando uma tela em branco (Miller's Rule: gerenciar a carga cognitiva).
*   **Wireframe (ASCII Art):**
    ```
      ┌──────────────────────────────────────────────────┐
      │ [LOGO]                            [Avatar] [Sair]│ Header
      ├──────────────────────────────────────────────────┤
      │ Meus Projetos                  [+ Novo Projeto]  │ Page Header
      ├──────────────────────────────────────────────────┤
      │                                                  │
      │ [Card Projeto 1]     [Card Projeto 2]            │
      │  - Nome do Projeto    - Nome do Projeto          │
      │  - Cliente            - Cliente                  │
      │  - Status             - Status                   │
      │                                                  │
      │ [Card Projeto 3]     [Card Projeto 4]            │
      │                                                  │
      │                                                  │
      └──────────────────────────────────────────────────┘
      // Empty State:
      // ┌──────────────────┐
      // │   Você ainda não tem projetos.                 │
      // │   [ Crie seu primeiro projeto ]                │
      // └──────────────────┘
    ```
*   **Componentes (Atomic Design):**
    *   **Molecules:** `ProjectCard`, `UserMenu`.
    *   **Organisms:** `Header`, `ProjectGrid`, `CreateProjectModal`.
*   **Stack Técnica Específica:**
    *   **Requisição API:** `useQuery` do `TanStack Query` para `GET /projects`. Ele fornecerá os estados `isLoading`, `isError`, e `data` nativamente.
    *   **Layout:** `CSS Grid` para a lista de cards, garantindo responsividade.
*   **Fluxo de Dados e Estado:**
    *   A rota `/projetos` é protegida. Um HOC (High-Order Component) ou um componente de layout verificará o estado de autenticação no `Zustand`; se não houver token, redireciona para `/login`.
    *   `useQuery('projects', fetchProjectsFn)` busca os dados.
    *   Enquanto `isLoading`, um componente `Skeleton` (disponível no Mantine) é exibido.
    *   Se `data` estiver vazio, o componente de "Estado Vazio" é renderizado.
    *   Se `data` existir, ele é mapeado para renderizar os componentes `ProjectCard`.
    *   O botão `+ Novo Projeto` controla um estado local (`useState`) que abre/fecha o `CreateProjectModal`.
*   **Testes Essenciais:**
    *   **Unit/Integration:** Testar os 3 estados da lista: carregamento, vazio e com dados.
    *   **E2E:** Simular o logout através do menu de usuário.

### 2.4. Tela de Detalhes do Projeto (Dashboard Kanban)
*   **Análise de UX/UI:** A interação principal é o drag-and-drop. A resposta visual deve ser instantânea (Jakob's Law: familiaridade com outros boards Kanban). A área de "drop" deve ser claramente indicada. O filtro deve ser de fácil acesso e aplicar as mudanças sem recarregar a página.
*   **Componentes (Atomic Design):**
    *   **Molecules:** `TaskCard`, `FilterDropdown`.
    *   **Organisms:** `KanbanColumn`, `KanbanBoard`.
*   **Stack Técnica Específica:**
    *   **Drag-and-Drop:** `dnd-kit`. É uma biblioteca moderna, performática e com total suporte a acessibilidade, superior a outras alternativas mais antigas.
    *   **Requisição API:** `useQuery` para buscar os dados do projeto (`GET /projects/:id`) e `useMutation` para atualizar a tarefa (`PATCH /tasks/:id/stage`).
*   **Fluxo de Dados e Estado:**
    *   `useQuery(['project', projectId], fetchProjectFn)` busca os dados do projeto, incluindo etapas e tarefas.
    *   Os dados são passados para o `KanbanBoard`, que renderiza as colunas e tarefas.
    *   A lógica de drag-and-drop do `dnd-kit` gerencia o estado visual durante o arrasto.
    *   No evento `onDragEnd`:
        *   A `useMutation` é chamada com o `taskId` e o novo `stageId`.
        *   Para uma UX otimista, a UI pode ser atualizada localmente de forma imediata.
        *   Em `onSuccess` da mutação, invalidamos o cache do `useQuery` (`queryClient.invalidateQueries(['project', projectId])`) para garantir que os dados sejam sincronizados com o servidor.
    *   A seleção no `FilterDropdown` atualiza um estado local que é passado como parâmetro para o `useQuery`, fazendo-o refazer a busca com o filtro aplicado.
*   **Testes Essenciais:**
    *   **Unit/Integration:** Testar o filtro de responsável.
    *   **E2E:** Criar um teste robusto para o fluxo de arrastar uma tarefa de uma coluna para outra e verificar se a mudança persiste após um refresh (confirmando a chamada de API).
