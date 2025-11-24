# Backend - ArchFlow API

API REST em Java com Spring Boot para o sistema de gestão de projetos de arquitetura.

## 🚀 Tecnologias

*   **Java 17**
*   **Spring Boot 3**
*   **Spring Security** (JWT)
*   **Spring Data JPA** (Hibernate)
*   **PostgreSQL 15**
*   **Maven**

## 📋 Pré-requisitos

*   JDK 17+ instalado
*   Maven 3.8+ instalado
*   PostgreSQL rodando (ou Docker)

## ⚙️ Configuração

1.  Clone o repositório e entre na pasta do backend:
    ```bash
    cd projeto-arquitetura-backend
    ```

2.  Configure as variáveis de ambiente (crie um arquivo `.env` ou configure no seu sistema):
    ```properties
    DB_URL=jdbc:postgresql://localhost:5432/archflow
    DB_USERNAME=postgres
    DB_PASSWORD=postgres
    JWT_SECRET=chave_secreta_com_pelo_menos_256_bits
    ```

3.  Se estiver usando Docker para o banco:
    ```bash
    docker run --name archflow-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=archflow -p 5432:5432 -d postgres:15
    ```

4.  Compile e rode a aplicação:
    ```bash
    ./mvnw clean install
    ./mvnw spring-boot:run
    ```

A API estará disponível em `http://localhost:8080`.

## 📚 Documentação

*   **Swagger UI:** `http://localhost:8080/swagger-ui.html` (em desenvolvimento)
*   **Endpoints Principais:** Ver [`docs/02-backend/api-reference.md`](../../docs/02-backend/api-reference.md)

## 🏗️ Estrutura do Projeto

```plaintext
src/main/java/com/archflow/
├── config/          # Configurações (Security, CORS)
├── controller/      # Endpoints REST
├── service/         # Lógica de negócio
├── repository/      # Acesso a dados (JPA)
├── model/           # Entidades do banco
└── dto/             # Data Transfer Objects
```

## 🧪 Testes

```bash
./mvnw test
```

## 📖 Guias Adicionais

*   [Setup Completo](../../docs/02-backend/setup-guide.md)
*   [Fluxo de Autenticação](../../docs/02-backend/authentication-flow.md)
