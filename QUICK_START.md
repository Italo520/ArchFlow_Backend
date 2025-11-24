# Guia de Início Rápido - ArchFlow

Este guia irá te ajudar a rodar o projeto completo em menos de 5 minutos.

## 🚀 Opção 1: Docker Compose (Recomendado)

Se você tem Docker instalado, esta é a forma mais rápida:

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/archflow.git
cd archflow

# Suba todos os serviços
docker-compose up --build
```

Acesse:
*   **Frontend:** `http://localhost:5173`
*   **Backend:** `http://localhost:8080`

## 🛠️ Opção 2: Setup Local (Desenvolvimento)

### Pré-requisitos
*   **Java 17+** e **Maven 3.8+**
*   **Node.js 18+** e **npm**
*   **PostgreSQL 15** (ou Docker para o banco)

### Passo 1: Banco de Dados

```bash
# Com Docker
docker run --name archflow-db \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=archflow \
  -p 5432:5432 \
  -d postgres:15
```

### Passo 2: Backend

```bash
cd projeto-arquitetura-backend

# Configure as variáveis de ambiente (crie um arquivo .env)
# DB_URL=jdbc:postgresql://localhost:5432/archflow
# DB_USERNAME=postgres
# DB_PASSWORD=postgres
# JWT_SECRET=sua_chave_secreta_com_pelo_menos_256_bits

# Compile e rode
./mvnw spring-boot:run
```

O backend estará em `http://localhost:8080`.

### Passo 3: Frontend

```bash
cd projeto-arquitetura-frontend

# Instale as dependências
npm install

# Rode o servidor de desenvolvimento
npm run dev
```

O frontend estará em `http://localhost:5173`.

## 🎯 Primeiro Acesso

1.  Acesse `http://localhost:5173`
2.  Clique em "Criar Conta"
3.  Cadastre-se com qualquer email e senha
4.  Faça login
5.  Crie seu primeiro projeto!

## 📖 Próximos Passos

*   📚 Leia a [Documentação Completa](docs/README.md)
*   🤝 Veja como [Contribuir](CONTRIBUTING.md)
*   🏗️ Entenda a [Arquitetura do Sistema](docs/01-architecture/system-overview.md)

## ❓ Problemas Comuns

### Backend não conecta ao banco
*   Verifique se o PostgreSQL está rodando: `docker ps`
*   Confirme as credenciais no arquivo `.env`

### Frontend não consegue chamar a API
*   Verifique se o backend está rodando em `http://localhost:8080`
*   Abra o console do navegador (F12) e veja os erros de rede

### Porta já em uso
*   Backend: Mude a porta no `application.properties` (Spring Boot)
*   Frontend: O Vite automaticamente tenta outra porta
