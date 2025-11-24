# 🏗️ ArchFlow - Sistema de Gestão para Arquitetura

> **Transformando a gestão de projetos de arquitetura com eficiência e clareza.**

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Java Version](https://img.shields.io/badge/java-17-orange)
![Spring Boot](https://img.shields.io/badge/spring--boot-3.0-green)
![React](https://img.shields.io/badge/react-18-blue)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

## 📖 Sobre o Projeto

O **ArchFlow** é uma plataforma SaaS projetada para escritórios de arquitetura gerenciarem seus projetos, etapas e tarefas de forma visual e intuitiva. Utilizando a metodologia **Kanban**, o sistema permite que arquitetos e gestores acompanhem o progresso de cada residência ou obra, desde a concepção até a entrega final, garantindo que prazos sejam cumpridos e a qualidade seja mantida.

## 🚀 Tech Stack

O projeto utiliza uma arquitetura moderna e escalável:

*   **Backend:** Java 17, Spring Boot 3, Spring Security (JWT), Hibernate/JPA.
*   **Frontend:** React.js (Vite), Tailwind CSS, Radix UI, dnd-kit (Drag and Drop).
*   **Banco de Dados:** PostgreSQL.
*   **Infraestrutura:** Docker, Google Cloud Platform (GKE - Kubernetes Engine).
*   **DevOps:** GitHub Actions (CI/CD), Terraform.

## ⚡ Quick Start

Para rodar o projeto completo localmente usando Docker:

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/archflow.git

# Entre na pasta
cd archflow

# Suba os containers (Backend + Frontend + DB)
docker-compose up --build
```

Acesse:
*   **Frontend:** `http://localhost:5173`
*   **Backend API:** `http://localhost:8080`

## 📂 Estrutura do Projeto

```plaintext
archflow-root/
│
├── docs/                    # Documentação completa do projeto
│   ├── 01-architecture/     # Visão geral, banco de dados e infra
│   ├── 02-backend/          # Guias da API e configuração Java
│   ├── 03-frontend/         # Design System e guias React
│   └── 04-management/       # Roadmap e Sprints
│
├── projeto-arquitetura-backend/  # Código fonte da API Java
└── projeto-arquitetura-frontend/ # Código fonte da Aplicação React
```

## 🔗 Links Úteis

*   [Documentação de Arquitetura](docs/01-architecture/system-overview.md)
*   [Guia de Contribuição](CONTRIBUTING.md)
*   [Histórico de Mudanças](CHANGELOG.md)

---
Desenvolvido com 💙 pela equipe ArchFlow.
