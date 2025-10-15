
# Sprint 1: Autenticação de Usuários e CRUD de Projetos

Este é o primeiro sprint que entregará valor de negócio tangível. O objetivo é construir o esqueleto funcional da aplicação, permitindo que um usuário acesse o sistema e execute a primeira ação fundamental.

**Meta do Sprint 1:** Permitir que um usuário se cadastre, faça login e crie um projeto.

Abaixo, o backlog detalhado para este sprint, quebrando as funcionalidades em histórias de usuário e tarefas técnicas:

## 1. História de Usuário: Cadastro na Plataforma

*   **Como um novo usuário, eu quero** poder me cadastrar no sistema com nome, e-mail e senha, **para que** eu possa criar uma conta e ter acesso à plataforma.
*   **Critérios de Aceite:**
    *   **Backend:** Criar endpoint `POST /auth/register` que valide os dados e crie um novo usuário no banco de dados com senha criptografada.
    *   **Frontend:** Desenvolver a página de cadastro (`/cadastro`) com o formulário correspondente.
    *   **Frontend:** Após o sucesso, o usuário é redirecionado para a página de login.

## 2. História de Usuário: Acesso ao Sistema

*   **Como um usuário cadastrado, eu quero** poder fazer login com meu e-mail e senha, **para que** o sistema me autentique e libere o acesso às minhas informações.
*   **Critérios de Aceite:**
    *   **Backend:** Criar endpoint `POST /auth/login` que valide as credenciais e retorne um token de acesso (JWT).
    *   **Frontend:** Desenvolver a página de login (`/login`).
    *   **Frontend:** Após o login, o token JWT é armazenado de forma segura e o usuário é redirecionado para a página principal de projetos.

## 3. História de Usuário: Criação do Primeiro Projeto

*   **Como um usuário logado, eu quero** poder cadastrar um novo projeto com as informações essenciais (Nome, Cliente, etc.), **para que** eu possa começar a organizar meu primeiro trabalho na plataforma.
*   **Critérios de Aceite:**
    *   **Backend:** Criar o schema da tabela `Projects` no banco de dados.
    *   **Backend:** Desenvolver o endpoint `POST /projects`, protegido por autenticação, para salvar os dados do novo projeto.
    *   **Frontend:** Na página principal, criar um formulário para inserir os dados do projeto e enviá-los à API.
    *   **Frontend:** Após a criação, o novo projeto deve ser exibido em uma lista na página principal.

Ao final deste sprint, teremos um sistema funcional onde um usuário pode se autenticar e realizar a primeira ação de valor. Isso validará nossa arquitetura de ponta a ponta, preparando o caminho para as próximas funcionalidades.

# Tarefas Detalhadas do Sprint 1

## FUNCIONALIDADE 1: Cadastro de Usuário

### Tarefa 1.1: [Backend] Criar Endpoint de Cadastro

*   **Descrição:** Desenvolver o endpoint da API para registrar novos usuários no sistema, modelando a entidade `User` e garantindo o armazenamento seguro de senhas.
*   **Critérios de Aceite:**
    *   A entidade JPA `@Entity User` foi criada em Java com os campos necessários (ID, nome, e-mail, senha).
    *   O endpoint `POST /auth/register` foi criado no `AuthController`.
    *   A senha do usuário é criptografada com BCrypt (via Spring Security) antes de ser salva.
    *   O sistema retorna um erro (ex: HTTP 409 Conflict) se o e-mail informado já existir no banco de dados.

### Tarefa 1.2: [Frontend] Construir Página de Cadastro

*   **Descrição:** Desenvolver a interface da página de cadastro em React e conectar o formulário ao endpoint da API.
*   **Critérios de Aceite:**
    *   A rota e a página `/cadastro` foram criadas.
    *   O formulário contém campos para nome, e-mail e senha, com validação básica no cliente.
    *   Ao submeter, uma chamada `POST` é enviada para `/auth/register`.
    *   O usuário é redirecionado para a página de login com uma mensagem de sucesso após o cadastro.

## FUNCIONALIDADE 2: Autenticação de Usuário

### Tarefa 2.1: [Backend] Implementar Login e Geração de Token JWT

*   **Descrição:** Desenvolver a lógica de autenticação com Spring Security para validar credenciais e gerar um JSON Web Token (JWT) para sessões seguras.
*   **Critérios de Aceite:**
    *   O endpoint `POST /auth/login` foi criado.
    *   O Spring Security está configurado para validar e-mail e senha.
    *   Em caso de sucesso, um token JWT válido é gerado e retornado no corpo da resposta.

### Tarefa 2.2: [Frontend] Construir Página de Login e Gerenciar Sessão

*   **Descrição:** Desenvolver a interface de login e implementar a lógica para gerenciar a sessão do usuário no navegador.
*   **Critérios de Aceite:**
    *   A rota e a página `/login` foram criadas.
    *   Após o login bem-sucedido, o token JWT é armazenado de forma segura no navegador.
    *   O usuário é redirecionado para a página principal (`/projetos`).
    *   A biblioteca `axios` é configurada para enviar o token JWT no cabeçalho `Authorization` de requisições futuras a endpoints protegidos.

## FUNCIONALIDADE 3: Criação de Projeto

### Tarefa 3.1: [Backend] Criar Endpoint de Criação de Projetos

*   **Descrição:** Desenvolver o endpoint da API para que usuários autenticados possam criar novos projetos.
*   **Critérios de Aceite:**
    *   A entidade JPA `@Entity Project` foi criada com os campos definidos (Nome, Cliente, etc.).
    *   O endpoint `POST /projects` foi criado no `ProjectController`.
    *   O endpoint é protegido e só pode ser acessado com um token JWT válido.
    *   O projeto criado é associado ao usuário que fez a requisição.

### Tarefa 3.2: [Frontend] Implementar Funcionalidade de Criar Projeto

*   **Descrição:** Na página principal, permitir que o usuário abra um formulário para inserir os dados de um novo projeto.
*   **Critérios de Aceite:**
    *   Um botão "Novo Projeto" está visível na página principal para usuários logados.
    *   O clique no botão abre um formulário (modal ou nova página) com os campos necessários.
    *   Ao submeter, uma chamada `POST` para `/projects` é feita, incluindo o token de autenticação.

Ao final deste sprint, teremos o primeiro ciclo de vida completo do produto: um usuário pode se registrar, acessar o sistema e criar seu primeiro dado de valor (um projeto).
