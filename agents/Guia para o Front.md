# Guia de Desenvolvimento Frontend para o MVP

## 1. Tela de Cadastro
*   **Objetivo:** Permitir que um novo usuário crie uma conta no sistema.
*   **Fluxo de Usuário:** Acessada por usuários não logados. Em caso de sucesso, redireciona para a tela de Login com uma mensagem de confirmação.
*   **Componentes e Layout (Wireframe Textual):**
    *   Layout centralizado na página.
    *   Título Principal: "Crie sua Conta".
    *   Formulário:
        *   Campo de texto: "Nome Completo" (obrigatório).
        *   Campo de texto: "E-mail" (obrigatório, formato de e-mail).
        *   Campo de senha: "Senha" (obrigatório, mínimo 8 caracteres).
    *   Botão Principal: "Cadastrar".
    *   Link Secundário: "Já tem uma conta? Faça o login".
*   **Requisitos Funcionais e Interações:**
    *   O botão "Cadastrar" permanece desabilitado até que todos os campos obrigatórios sejam preenchidos corretamente.
    *   Ao submeter, a aplicação deve exibir um indicador de carregamento e fazer a chamada para o endpoint `POST /auth/register`.
    *   Deve exibir mensagens de erro claras (ex: "E-mail já cadastrado", "Senha muito curta").

## 2. Tela de Login
*   **Objetivo:** Permitir que um usuário existente acesse sua conta.
*   **Fluxo de Usuário:** Acessada por usuários não logados. Em caso de sucesso, armazena o token JWT e redireciona para a Tela Principal (Lista de Projetos).
*   **Componentes e Layout:**
    *   Layout centralizado, similar à tela de cadastro.
    *   Título Principal: "Acesse sua Conta".
    *   Formulário:
        *   Campo de texto: "E-mail".
        *   Campo de senha: "Senha".
    *   Botão Principal: "Entrar".
    *   Link Secundário: "Não tem uma conta? Cadastre-se".
*   **Requisitos Funcionais e Interações:**
    *   Ao submeter, a aplicação deve exibir um indicador de carregamento e chamar o endpoint `POST /auth/login`.
    *   Em caso de erro, exibir uma mensagem clara (ex: "E-mail ou senha inválidos").
    *   Em caso de sucesso, o token JWT recebido deve ser armazenado de forma segura e o axios (ou similar) deve ser configurado para enviá-lo em todas as requisições futuras.

## 3. Tela Principal (Lista de Projetos)
*   **Objetivo:** Apresentar uma visão geral de todos os projetos do usuário e ser o ponto de partida para a criação e acesso aos projetos.
*   **Fluxo de Usuário:** É a primeira tela exibida após o login. Clicar em um projeto leva à Tela de Detalhes.
*   **Componentes e Layout:**
    *   Header da Aplicação: Contém o logo e um menu de usuário com o nome/avatar e a opção "Sair (Logout)".
    *   Título da Página: "Meus Projetos".
    *   Botão de Ação Principal: "+ Novo Projeto", com destaque visual.
    *   Área de Conteúdo:
        *   Estado de Carregamento: Exibir um esqueleto de interface (shimmer/spinner) enquanto os projetos são buscados.
        *   Estado Vazio: Se o usuário não tiver projetos, exibir uma mensagem amigável e um atalho para criar o primeiro projeto.
        *   Lista de Projetos: Uma grade de "Cards de Projeto".
*   **Card de Projeto (Componente Reutilizável):**
    *   Conteúdo: Exibe "Nome do Projeto", "Nome do Cliente" e "Status".
    *   Interação: O card inteiro é uma área clicável que navega para `/projetos/:id`.
*   **Requisitos Funcionais:**
    *   A tela deve ser protegida, redirecionando para o login se o usuário não estiver autenticado.
    *   Ao carregar, faz uma chamada ao endpoint `GET /projects`.
    *   Clicar no botão "+ Novo Projeto" deve abrir o "Modal de Criação de Projeto".

## 4. Tela de Detalhes do Projeto (Dashboard Kanban)
*   **Objetivo:** Visualizar e gerenciar o fluxo de trabalho de um projeto específico.
*   **Fluxo de Usuário:** Acessada ao clicar em um "Card de Projeto" na tela anterior.
*   **Componentes e Layout:**
    *   Header da Aplicação: (Consistente com a tela anterior).
    *   Cabeçalho da Página:
        *   Título: Exibe dinamicamente o "Nome do Projeto" buscado da API.
        *   Filtro: Um componente de dropdown/select com a label "Responsável" para filtrar o board.
    *   Board Kanban:
        *   Colunas: Renderizadas dinamicamente a partir das "Etapas" do projeto. Cada coluna exibe o título da etapa.
        *   Botão de Ação na Coluna: Cada coluna possui um botão "+ Adicionar Tarefa".
        *   Cartões de Tarefa: Renderizados dentro das colunas, exibindo a "Descrição da Tarefa" e o "Responsável".
*   **Requisitos Funcionais e Interações:**
    *   Ao carregar, faz uma chamada ao endpoint `GET /projects/:id` para buscar todos os dados.
    *   Implementar a funcionalidade de arrastar e soltar (drag-and-drop) para os cartões.
    *   Ao soltar um cartão, chamar o endpoint `PATCH /tasks/:id/stage` para persistir a mudança.
    *   O filtro de "Responsável" deve refazer a chamada à API com o parâmetro de filtro e re-renderizar o board.
    *   Clicar em "+ Adicionar Tarefa" abre o "Modal de Criação de Tarefa", já pré-configurado para aquela etapa.
