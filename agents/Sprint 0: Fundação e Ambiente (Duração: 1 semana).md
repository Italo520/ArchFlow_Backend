
# Sprint 0: Fundação e Ambiente (Duração: 1 semana)

**Meta do Sprint:** Configurar toda a infraestrutura e os ambientes de desenvolvimento para que a equipe possa começar a construir as funcionalidades.

**Principais Entregas:**
* Configuração dos repositórios no GitHub e do pipeline de CI/CD com GitHub Actions.
* Setup dos projetos base: Frontend (JavaScript e react) e Backend (Java com Springboot).

**Meta do Sprint 0:** Configurar toda a infraestrutura e os ambientes de desenvolvimento para que a equipe possa começar a construir as funcionalidades de negócio no Sprint 1.

Abaixo estão as tarefas detalhadas para este sprint:

## 1. Tarefa: [Infra] Configurar Infraestrutura Base na AWS com Terraform

* **Descrição:** Provisionar a infraestrutura em nuvem (VPC, Subnets, Instância de Banco de Dados) utilizando Terraform, garantindo que nosso ambiente seja automatizado, versionado e seguro desde o início.
* **Critérios de Aceite:**
    * Scripts Terraform para a rede (VPC) e banco de dados (RDS com PostgreSQL) estão criados.
    * As credenciais e o endpoint do banco de dados estão seguramente armazenados e disponíveis para a equipe de backend.

## 2. Tarefa: [DevOps] Estruturar Pipeline Básico de CI/CD

* **Descrição:** Criar o fluxo de trabalho inicial no GitHub Actions para automatizar a verificação (linting, build) do código do frontend e backend a cada novo envio de código (push), garantindo a saúde do projeto.
* **Critérios de Aceite:**
    * O pipeline do GitHub Actions é acionado automaticamente em pushes para as branches `main` e `develop`.
    * Uma notificação de falha é enviada se o build quebrar.

## 3. Tarefa: [Backend] Inicializar Projeto e Conectar ao Banco de Dados

* **Descrição:** Configurar a estrutura do projeto backend com Vite e estabelecer a conexão com o banco de dados PostgreSQL.
* **Critérios de Aceite:**
    * O projeto Vite está criado e rodando localmente.
    * Um endpoint de verificação (`/health`) foi criado e retorna status 200 OK.

## 4. Tarefa: [Frontend] Inicializar Projeto e Sistema de Design

* **Descrição:** Configurar a estrutura do projeto frontend com Next.js e integrar o Tailwind CSS para servir como base para todos os componentes visuais futuros.
* **Critérios de Aceite:**
    * O projeto vite está criado com javaScript e rodando localmente.
    * O Tailwind CSS está instalado e sua configuração base foi aplicada.
    * A estrutura de pastas para `pages`, `components`, e `services` está definida.

# Tarefas Detalhadas do Sprint 0 (Foco Local)

## 1. Tarefa: Configuração do Controle de Versão

* **Título:** [Git] Criar e Estruturar Repositórios no GitHub
* **Descrição:** Criar os repositórios dedicados para o backend e frontend, estabelecendo a estrutura de branches padrão que será usada durante o projeto.
* **Critérios de Aceite:**
    * Repositório `projeto-arquitetura-backend` foi criado no GitHub.
    * Repositório `projeto-arquitetura-frontend` foi criado no GitHub.
    * Cada repositório contém um arquivo `README.md` inicial e um `.gitignore` apropriado para Java e React, respectivamente.
    * As branches `main` e `develop` foram criadas em ambos os repositórios, com a `main` configurada como protegida.

## 2. Tarefa: Ambiente de Desenvolvimento Backend

* **Título:** [Backend] Configurar Ambiente Local com Spring Boot e PostgreSQL (Docker)
* **Descrição:** Preparar o ambiente de desenvolvimento backend, inicializando o projeto Spring Boot e configurando um banco de dados PostgreSQL local usando Docker para facilitar a replicação do ambiente.
* **Critérios de Aceite:**
    * Um arquivo `docker-compose.yml` na raiz do projeto backend sobe uma instância do PostgreSQL com sucesso.
    * O projeto Spring Boot foi inicializado (via start.spring.io) com as dependências essenciais (Spring Web, Security, Data JPA, Driver PostgreSQL).
    * O arquivo `application.properties` está configurado para conectar ao banco de dados Docker local.
    * A aplicação backend sobe localmente sem erros.

## 3. Tarefa: Ambiente de Desenvolvimento Frontend

* **Título:** [Frontend] Configurar Ambiente Local com React
* **Descrição:** Preparar o ambiente de desenvolvimento frontend, inicializando o projeto React e adicionando as dependências iniciais para navegação e comunicação com a API.
* **Critérios de Aceite:**
    * O projeto React foi inicializado (usando Vite ou Create React App).
    * As dependências `react-router-dom` (para roteamento) e `axios` (para chamadas HTTP) foram adicionadas.
    * A estrutura de pastas base (`src/components`, `src/pages`, `src/services`) foi criada.
    * A aplicação frontend sobe localmente (`npm run dev`) sem erros.

## 4. Tarefa: Automação de Qualidade (CI)

* **Título:** [DevOps] Configurar Validação Automática com GitHub Actions
* **Descrição:** Criar um fluxo de trabalho de Integração Contínua (CI) que rodará automaticamente a cada push para a branch `develop`, garantindo que o código novo não quebre o projeto.
* **Critérios de Aceite:**
    * Um arquivo de workflow do GitHub Actions foi adicionado a ambos os repositórios.
    * Para o backend, o workflow executa o comando de build do Maven/Gradle (`./mvnw clean package`).
    * Para o frontend, o workflow executa `yarn install` e `yarn run build`.
    * O status do build (sucesso/falha) é reportado no GitHub.

Ao concluir estas quatro tarefas, você terá um ambiente de desenvolvimento local completo e robusto para ambos os desenvolvedores, pronto para iniciar a construção das funcionalidades no Sprint 1.
