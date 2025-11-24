# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Funcionalidade de Drag-and-Drop para reordenar colunas (status) no Kanban.
- Modal de criação de novos Status no projeto.
- Botão de exclusão de Status com confirmação.
- Alerta de "Funcionalidade em desenvolvimento" para o botão de Configurações.

### Fixed
- Correção de Null Safety no `TaskService` e `ProjectService` (Java).
- Correção de import não utilizado no `SecurityConfig`.
- Correção na adição de tarefas que não persistiam no mock do frontend.

## [0.1.0] - 2025-11-24

### Added
- Estrutura inicial do projeto (Monorepo).
- Backend Spring Boot com autenticação JWT.
- Frontend React com Vite e Tailwind CSS.
- Dashboard principal com lista de projetos.
- Tela de detalhes do projeto com Kanban básico.
- Tela de criação de novo projeto.
- Configuração do Docker e Docker Compose.
