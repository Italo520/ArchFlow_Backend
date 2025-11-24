# Fluxo de Autenticação (JWT)

O ArchFlow utiliza **JSON Web Tokens (JWT)** para autenticação stateless.

## Diagrama de Sequência

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Database

    User->>Frontend: Digita Email/Senha
    Frontend->>Backend: POST /auth/login
    Backend->>Database: Busca usuário pelo email
    Database-->>Backend: Retorna Usuário (Hash Senha)
    Backend->>Backend: Compara Senha com BCrypt
    
    alt Senha Válida
        Backend->>Backend: Gera JWT (Expira em 24h)
        Backend-->>Frontend: Retorna { token: "..." }
        Frontend->>Frontend: Salva token no localStorage
        Frontend-->>User: Redireciona para Dashboard
    else Senha Inválida
        Backend-->>Frontend: 401 Unauthorized
        Frontend-->>User: Exibe erro
    end

    Note over Frontend, Backend: Requisições subsequentes
    
    Frontend->>Backend: GET /projects (Header: Authorization Bearer ...)
    Backend->>Backend: Valida assinatura do JWT
    Backend->>Backend: Extrai usuário do token (SecurityContext)
    Backend-->>Frontend: Retorna dados protegidos
```

## Detalhes de Implementação

1.  **Filtro de Segurança (`JwtAuthenticationFilter`):**
    *   Intercepta todas as requisições HTTP.
    *   Verifica se existe o header `Authorization`.
    *   Se o token for válido, autentica o usuário no contexto do Spring Security.

2.  **Segurança das Senhas:**
    *   As senhas nunca são salvas em texto plano.
    *   Utilizamos `BCryptPasswordEncoder` para hash.
