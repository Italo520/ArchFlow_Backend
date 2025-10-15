# Documento de Arquitetura Backend - Projeto ArchFlow API

- **Versão:** 1.1
- **Autor:** Arquiteto de Soluções AI - Senior Cloud Architect

## 1. Visão Geral e Decisão Arquitetural

Este documento descreve a arquitetura de backend para a aplicação de gerenciamento de projetos no estilo Kanban, com implantação no Google Cloud Platform.

### 1.1. Padrão Arquitetural: Monólito Modular

Mantemos a decisão estratégica de adotar o padrão **Monólito Modular**. Esta abordagem continua sendo a mais adequada para a fase atual do projeto, priorizando:

* [cite_start]**Velocidade e Simplicidade:** A simplicidade de um único processo de implantação acelera o desenvolvimento e reduz o overhead operacional, crucial para equipes focadas em entregar valor rapidamente[cite: 245].
* **Consistência Transacional:** Garante a integridade dos dados através de transações ACID nativas, o que é fundamental para as operações principais do sistema.
* **Evolução Sustentável:** A estrutura modular (ex: `auth`, `projects`, `tasks`) cria limites claros que facilitam a manutenção e a futura transição para microsserviços, se necessário.

### 1.2. Provedor de Cloud: Google Cloud Platform (GCP)

A implantação será realizada no **Google Cloud Platform (GCP)**. Esta escolha é justificada por:

* [cite_start]**Liderança em Kubernetes:** O Google Kubernetes Engine (GKE) é amplamente reconhecido por sua maturidade, automação e excelente experiência de desenvolvedor, simplificando a orquestração de contêineres[cite: 345].
* [cite_start]**Preços Competitivos e Foco em Startups:** O GCP frequentemente oferece preços competitivos e um conjunto de serviços mais simples, o que o torna uma recomendação forte para startups e empresas em fase de crescimento[cite: 265, 266].
* [cite_start]**Ecossistema de Dados e IA/ML:** A plataforma possui serviços de ponta como BigQuery e Vertex AI, oferecendo um caminho claro para futuras evoluções da aplicação que envolvam análise de dados avançada[cite: 264, 265].

## 2. Stack Tecnológico Detalhado

A seleção de tecnologias permanece consistente, focada em performance, produtividade e ecossistema.

| Categoria | Tecnologia | Justificativa |
| :--- | :--- | :--- |
| **Linguagem** | **Java** | [cite_start]Performance robusta (⭐⭐⭐⭐) [cite: 306][cite_start], ecossistema maduro (⭐⭐⭐⭐⭐) [cite: 306] [cite_start]e vasta disponibilidade de desenvolvedores (⭐⭐⭐⭐⭐) [cite: 306][cite_start], ideal para aplicações corporativas[cite: 307]. |
| **Framework** | **Spring Boot** | [cite_start]Altamente maduro (⭐⭐⭐⭐⭐) [cite: 313] [cite_start]e com um ecossistema completo (⭐⭐⭐⭐⭐)[cite: 313], oferece alta produtividade para a criação de APIs REST. [cite_start]Sua performance é excelente para a maioria dos casos de uso[cite: 313]. |
| **Banco de Dados** | **PostgreSQL** | [cite_start]Excelente performance (⭐⭐⭐⭐) [cite: 325] [cite_start]e um dos conjuntos de features mais ricos (⭐⭐⭐⭐⭐) [cite: 325] entre os bancos de dados relacionais open source. [cite_start]A escolha ideal para aplicações OLTP[cite: 381]. |
| **Build Tool** | **Maven** | Padrão de mercado no ecossistema Java, com gerenciamento de dependências robusto e integração total com ferramentas de CI/CD. |
| **Containerização** | **Docker** | Padrão para empacotamento de aplicações, garantindo consistência entre ambientes. [cite_start]A migração de VM para contêiner apresenta baixo risco e baixo esforço[cite: 387]. |
| **Orquestração** | **Kubernetes (Google GKE)** | [cite_start]O GKE é uma plataforma gerenciada de Kubernetes que se destaca pela sua simplicidade e conjunto de funcionalidades (⭐⭐⭐⭐⭐)[cite: 345], automatizando o gerenciamento do cluster e a escalabilidade. |

## 3. Design do Banco de Dados (PostgreSQL)

O esquema de dados permanece o mesmo, sendo agnóstico ao provedor de cloud. A implementação será feita no **Cloud SQL for PostgreSQL**.

```sql
-- Tabela de Usuários
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Projetos
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    client_name VARCHAR(255),
    status VARCHAR(50) NOT NULL,
    owner_id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT fk_owner FOREIGN KEY(owner_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Tabela de Etapas (Colunas do Kanban)
CREATE TABLE stages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    project_id UUID NOT NULL,
    "order" INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT fk_project FOREIGN KEY(project_id) REFERENCES projects(id) ON DELETE CASCADE,
    UNIQUE(project_id, name)
);

-- Tabela de Tarefas
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    description TEXT NOT NULL,
    project_id UUID NOT NULL,
    stage_id UUID NOT NULL,
    assignee_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT fk_project_task FOREIGN KEY(project_id) REFERENCES projects(id) ON DELETE CASCADE,
    CONSTRAINT fk_stage FOREIGN KEY(stage_id) REFERENCES stages(id) ON DELETE SET NULL,
    CONSTRAINT fk_assignee FOREIGN KEY(assignee_id) REFERENCES users(id) ON DELETE SET NULL
);
## 4. Definição da API (Contrato com o Frontend)
O contrato da API REST permanece inalterado, pois é independente da infraestrutura subjacente.

### Módulo: Authentication (`/auth`)
- `POST /auth/register`
- `POST /auth/login`

### Módulo: Projects (`/projects`)
- `GET /projects`
- `POST /projects`
- `GET /projects/{id}`

### Módulo: Tasks (`/tasks`)
- `PATCH /tasks/{id}/stage`

## 5. Padrões e Cross-Cutting Concerns
### 5.1. Segurança
* **Autenticação e Autorização:** Spring Security com Tokens JWT.
* **Gerenciamento de Senhas:** Armazenamento com BCrypt.
* **Segurança em Camadas:** A infraestrutura no GCP seguirá as melhores práticas, como redes VPC com sub-redes privadas e regras de firewall restritivas. O acesso ao Cloud SQL será protegido usando o Cloud SQL Auth Proxy para conexões seguras.

### 5.2. Observabilidade (Monitoring, Logging, Tracing)
* **Logging:** SLF4J com Logback. Os logs estruturados em JSON serão automaticamente coletados e centralizados pelo Google Cloud Logging.
* **Monitoring:** Spring Boot Actuator para exposição de métricas. As métricas serão coletadas e visualizadas no Google Cloud Monitoring, que oferece dashboards e alertas.
* **Tracing:** Integração com Google Cloud Trace via OpenTelemetry para análise de latência e performance das requisições.

### 5.3. Configuração
As configurações sensíveis (chaves de API, senhas de banco de dados) serão armazenadas de forma segura no Google Secret Manager e injetadas na aplicação em tempo de execução.

### 5.4. Tratamento de Exceções
Implementação de um `@ControllerAdvice` global para padronizar as respostas de erro da API.

## 6. Estratégia de CI/CD e Deployment
A automação será realizada utilizando as ferramentas nativas do GCP para DevOps.

* **Versionamento:** Código-fonte mantido em um repositório Git (ex: GitHub, Cloud Source Repositories).
* **CI (Continuous Integration):** Um gatilho no Google Cloud Build será configurado para ser acionado a cada push. O pipeline irá:
    * Compilar o código com Maven.
    * Executar os testes unitários e de integração.
    * Construir a imagem Docker da aplicação.
    * Enviar a imagem para o Google Artifact Registry.
* **CD (Continuous Deployment):** O Cloud Build, após o sucesso da etapa de CI, irá acionar a atualização do deployment no cluster Google Kubernetes Engine (GKE), aplicando o novo manifesto Kubernetes e utilizando a estratégia `RollingUpdate` para garantir zero downtime.

## 7. Diagrama da Arquitetura de Implantação (GCP)
O diagrama abaixo ilustra a arquitetura de implantação proposta no Google Cloud Platform.

```mermaid
graph TD
    subgraph "Usuário Final"
        U(Browser/Client)
    end

    subgraph "Google Cloud Platform"
        DNS(Cloud DNS) --> LB(Global External Load Balancer)

        subgraph "VPC Network"
            subgraph "Public Subnets"
                LB
            end

            subgraph "Private Subnets"
                subgraph "Google Kubernetes Engine (GKE) Cluster"
                    NodePool[Node Pool]
                    
                    GKE_Service[K8s Service] --> Pod1(Pod: App Instance 1)
                    GKE_Service --> Pod2(Pod: App Instance 2)
                    GKE_Service --> Pod3(Pod: App Instance 3)
                end

                subgraph "Cloud SQL"
                    DB[(PostgreSQL)]
                end
                
                AuthProxy(Cloud SQL Auth Proxy)
            end
        end

        subgraph "GCP DevOps & Management"
            ArtifactRegistry(Artifact Registry)
            CloudBuild(Cloud Build)
            GCPOps(Cloud's operations suite)
        end
    end

    U -- HTTPS --> DNS
    LB -- Roteamento --> GKE_Service
    
    Pod1 --> AuthProxy
    Pod2 --> AuthProxy
    Pod3 --> AuthProxy
    AuthProxy -- mTLS --> DB

    CloudBuild -- Deploy --> GKE
    GKE -- Puxa Imagem --> ArtifactRegistry
    GKE -- Envia Logs/Métricas --> GCPOps
## 8. Roadmap de Implementação Backend
O roadmap de desenvolvimento da aplicação permanece o mesmo, com as fases focadas na entrega de valor funcional.

* **Fase 1 (Fundação):** Setup do projeto, esquema de DB e módulo de autenticação.
* **Fase 2 (Core Features):** Implementação do CRUD de Projetos e listagem de tarefas.
* **Fase 3 (Funcionalidades Avançadas):** Implementação da lógica de drag-and-drop e filtros.
* **Fase 4 (Prontidão para Produção):** Construção do pipeline de CI/CD no Cloud Build, provisionamento da infraestrutura no GCP (GKE, Cloud SQL) e configuração de observabilidade.
