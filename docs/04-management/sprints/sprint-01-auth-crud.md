# Sprint 1: Autenticação de Usuários e CRUD de Projetos

**Duração:** 1 semana  
**Status:** ✅ Concluído

## Meta do Sprint

Permitir que um usuário se cadastre, faça login e crie um projeto. Este é o primeiro sprint que entrega valor de negócio tangível.

## Histórias de Usuário

### 1. Cadastro na Plataforma
**Como** um novo usuário,  
**Eu quero** poder me cadastrar no sistema com nome, e-mail e senha,  
**Para que** eu possa criar uma conta e ter acesso à plataforma.

**Critérios de Aceite:**
- [x] Backend: Endpoint `POST /auth/register` criado.
- [x] Backend: Senha criptografada com BCrypt.
- [x] Backend: Erro 409 Conflict se o e-mail já existir.
- [x] Frontend: Página `/cadastro` com formulário.
- [x] Frontend: Redirecionamento para login após sucesso.

### 2. Acesso ao Sistema
**Como** um usuário cadastrado,  
**Eu quero** poder fazer login com meu e-mail e senha,  
**Para que** o sistema me autentique e libere o acesso às minhas informações.

**Critérios de Aceite:**
- [x] Backend: Endpoint `POST /auth/login` criado.
- [x] Backend: Retorna token JWT em caso de sucesso.
- [x] Frontend: Página `/login` com formulário.
- [x] Frontend: Token armazenado de forma segura (localStorage).
- [x] Frontend: Redirecionamento para dashboard após login.

### 3. Criação do Primeiro Projeto
**Como** um usuário logado,  
**Eu quero** poder cadastrar um novo projeto com as informações essenciais,  
**Para que** eu possa começar a organizar meu primeiro trabalho na plataforma.

**Critérios de Aceite:**
- [x] Backend: Tabela `Projects` no banco de dados.
- [x] Backend: Endpoint `POST /projects` protegido por autenticação.
- [x] Backend: Projeto associado ao usuário autenticado.
- [x] Frontend: Formulário para inserir dados do projeto.
- [x] Frontend: Novo projeto exibido na lista após criação.

---

## Tarefas Técnicas

### [Backend] Criar Endpoint de Cadastro
- [x] Entidade JPA `User` criada (ID, nome, email, senha).
- [x] Senha criptografada com BCrypt antes de salvar.
- [x] Validação de e-mail duplicado.

### [Backend] Implementar Login e Geração de Token JWT
- [x] Spring Security configurado para validar credenciais.
- [x] Token JWT válido gerado e retornado.

### [Backend] Criar Endpoint de Criação de Projetos
- [x] Entidade JPA `Project` criada.
- [x] Endpoint `POST /projects` protegido por JWT.

### [Frontend] Construir Páginas de Cadastro e Login
- [x] Rotas `/cadastro` e `/login` criadas.
- [x] Token JWT armazenado e enviado automaticamente em requisições (Axios interceptor).

### [Frontend] Implementar Funcionalidade de Criar Projeto
- [x] Botão "Novo Projeto" na página principal.
- [x] FormulárioModal para criar projeto.

---

## Resultado

Ao final deste sprint, o sistema tornou-se funcional: um usuário pode se autenticar e realizar a primeira ação de valor. Isso validou a arquitetura de ponta a ponta.
