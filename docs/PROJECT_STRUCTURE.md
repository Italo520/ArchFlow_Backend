# Estrutura Final do Projeto ArchFlow

```plaintextarchflow-root/
│
├── .github/
│   └── pull_request_template.md       # Template para Pull Requests
│
├── docs/                                # 📚 Documentação Completa
│   ├── README.md                        # Índice da documentação
│   │
│   ├── 01-architecture/
│   │   ├── system-overview.md           # Visão geral da arquitetura
│   │   ├── database-schema.md           # Diagrama ER do banco
│   │   └── infrastructure-gcp.md        # Detalhes da infra GCP
│   │
│   ├── 02-backend/
│   │   ├── setup-guide.md               # Como configurar o backend
│   │   ├── api-reference.md             # Documentação dos endpoints
│   │   └── authentication-flow.md       # Fluxo de autenticação JWT
│   │
│   ├── 03-frontend/
│   │   ├── design-system.md             # Paleta de cores e tipografia
│   │   ├── component-guide.md           # Estrutura dos componentes
│   │   └── state-management.md          # Gerenciamento de estado
│   │
│   └── 04-management/
│       ├── roadmap.md                   # Roadmap do produto
│       └── sprints/
│           ├── sprint-00-fundacao.md
│           ├── sprint-01-auth-crud.md
│           ├── sprint-02-dashboard.md
│           ├── sprint-03-kanban.md
│           └── sprint-04-refinamento.md
│
├── projeto-arquitetura-backend/         # 🔧 Backend (Java Spring Boot)
│   ├── README.md                         # Instruções específicas do backend
│   ├── pom.xml                           # Dependências Maven
│   ├── docker-compose.yml                # Banco de dados local (PostgreSQL)
│   └── src/main/java/com/archflow/
│       ├── config/                       # Configurações (Security, CORS)
│       ├── controller/                   # Endpoints REST
│       ├── service/                      # Lógica de negócio
│       ├── repository/                   # Acesso a dados (JPA)
│       ├── model/                        # Entidades do banco
│       └── dto/                          # Data Transfer Objects
│
├── projeto-arquitetura-frontend/        # 💻 Frontend (React)
│   ├── README.md                         # Instruções específicas do frontend
│   ├── package.json                      # Dependências npm
│   ├── tailwind.config.js                # Configuração do Tailwind CSS
│   └── src/
│       ├── components/                   # Componentes reutilizáveis
│       ├── pages/                        # Páginas (Rotas)
│       │   ├── auth/                     # Login e Registro
│       │   ├── dashboard/                # Dashboard Principal
│       │   └── project/                  # Detalhes e Criação de Projeto
│       ├── services/                     # Integração com API
│       └── App.jsx                       # Configuração de Rotas
│
├── README.md                             # 🏠 Cartão de visitas do projeto
├── CONTRIBUTING.md                       # 🤝 Guia de contribuição
└── CHANGELOG.md                          # 📝 Histórico de mudanças
```

---

## 📂 Organização por Domínio

A documentação foi estruturada por domínio para facilitar a navegação:

### 🏗️ Arquitetura
Decisões de alto nível, diagramas de sistema, modelagem de dados e infraestrutura.

### 🔧 Backend
Detalhes técnicos da API, setup local, autenticação e endpoints.

### 💻 Frontend
Design System, estrutura de componentes, gerenciamento de estado.

### 📊 Gestão
Roadmap do produto, sprints concluídos e planejamento.

---

## ✨ Destaques

*   ✅ **README Principal** com Quick Start via Docker
*   ✅ **READMEs específicos** para Backend e Frontend
*   ✅ **Documentação completa** organizada por domínio
*   ✅ **Histórico de Sprints** documentando a evolução do projeto
*   ✅ **Guia de Contribuição** com Conventional Commits
*   ✅ **Template de Pull Request** para garantir qualidade
*   ✅ **Diagramas Mermaid** renderizados nativamente no GitHub
