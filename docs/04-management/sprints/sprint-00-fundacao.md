# Sprint 0: Fundação e Ambiente

**Duração:** 1 semana  
**Status:** ✅ Concluído

## Meta do Sprint

Configurar toda a infraestrutura e os ambientes de desenvolvimento para que a equipe possa começar a construir as funcionalidades de negócio no Sprint 1.

## Principais Entregas

*   Configuração dos repositórios no GitHub e do pipeline de CI/CD com GitHub Actions.
*   Setup dos projetos base: Frontend (React + Vite) e Backend (Java com Spring Boot).
*   Ambiente de desenvolvimento local com Docker.

---

## Tarefas

### 1. [Git] Criar e Estruturar Repositórios no GitHub
*   **Descrição:** Criar os repositórios dedicados para o backend e frontend, estabelecendo a estrutura de branches padrão.
*   **Critérios de Aceite:**
    - [x] Repositório `projeto-arquitetura-backend` criado no GitHub.
    - [x] Repositório `projeto-arquitetura-frontend` criado no GitHub.
    - [x] Cada repositório contém um `README.md` inicial e um `.gitignore`.
    - [x] Branches `main` e `develop` criadas, com a `main` configurada como protegida.

### 2. [Backend] Configurar Ambiente Local com Spring Boot e PostgreSQL
*   **Descrição:** Preparar o ambiente de desenvolvimento backend, inicializando o projeto Spring Boot e configurando um banco de dados PostgreSQL local usando Docker.
*   **Critérios de Aceite:**
    - [x] Arquivo `docker-compose.yml` sobe uma instância do PostgreSQL.
    - [x] Projeto Spring Boot inicializado (via start.spring.io) com dependências essenciais (Web, Security, Data JPA, PostgreSQL Driver).
    - [x] `application.properties` configurado para conectar ao banco Docker local.
    - [x] Aplicação backend sobe localmente sem erros.

### 3. [Frontend] Configurar Ambiente Local com React
*   **Descrição:** Preparar o ambiente de desenvolvimento frontend, inicializando o projeto React e adicionando as dependências iniciais.
*   **Critérios de Aceite:**
    - [x] Projeto React inicializado com Vite.
    - [x] Dependências `react-router-dom` e `axios` adicionadas.
    - [x] Estrutura de pastas base (`src/components`, `src/pages`, `src/services`) criada.
    - [x] Aplicação frontend sobe localmente (`npm run dev`) sem erros.

### 4. [DevOps] Configurar Validação Automática com GitHub Actions
*   **Descrição:** Criar um fluxo de trabalho de Integração Contínua (CI) que rodará automaticamente a cada push para a branch `develop`.
*   **Critérios de Aceite:**
    - [x] Workflow do GitHub Actions adicionado aos repositórios.
    - [x] Para o backend, o workflow executa o build Maven (`./mvnw clean package`).
    - [x] Para o frontend, o workflow executa `npm install` e `npm run build`.
    - [x] O status do build (sucesso/falha) é reportado no GitHub.

---

## Resultado

Ao concluir este sprint, o time estabeleceu um ambiente de desenvolvimento local completo e robusto para ambos os desenvolvedores, pronto para iniciar a construção das funcionalidades no Sprint 1.
