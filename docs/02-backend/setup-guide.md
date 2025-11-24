# Guia de Configuração do Backend

Este guia explica como configurar o ambiente de desenvolvimento para o backend Java/Spring Boot.

## Pré-requisitos

*   **Java JDK 17** ou superior.
*   **Maven 3.8+**.
*   **Docker** (opcional, para rodar o banco de dados).
*   **IDE:** IntelliJ IDEA (recomendado) ou VS Code com Extension Pack for Java.

## Passo a Passo

### 1. Clonar o Repositório
```bash
git clone https://github.com/seu-repo/archflow.git
cd archflow/projeto-arquitetura-backend
```

### 2. Configurar Variáveis de Ambiente
Crie um arquivo `.env` na raiz do backend ou configure as variáveis no seu sistema/IDE:

```properties
DB_URL=jdbc:postgresql://localhost:5432/archflow
DB_USERNAME=postgres
DB_PASSWORD=postgres
JWT_SECRET=sua_chave_secreta_super_segura_com_pelo_menos_256_bits
```

### 3. Subir o Banco de Dados (Docker)
Se não tiver um Postgres local rodando:
```bash
docker run --name archflow-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=archflow -p 5432:5432 -d postgres:15
```

### 4. Compilar e Rodar
Via terminal:
```bash
mvn clean install
mvn spring-boot:run
```

O servidor iniciará em `http://localhost:8080`.

## Estrutura de Pacotes

*   `com.archflow.config`: Configurações de Segurança (SecurityConfig), CORS, etc.
*   `com.archflow.controller`: Endpoints REST (@RestController).
*   `com.archflow.service`: Regras de negócio (@Service).
*   `com.archflow.repository`: Acesso a dados (JPA/Hibernate).
*   `com.archflow.model`: Entidades do banco de dados (@Entity).
*   `com.archflow.dto`: Objetos de Transferência de Dados (Records ou Classes).
