# Frontend - ArchFlow

Interface de usuário em React para o sistema de gestão de projetos de arquitetura.

## 🚀 Tecnologias

*   **React 18**
*   **Vite** (Build Tool)
*   **Tailwind CSS** (Estilização)
*   **Radix UI** (Componentes acessíveis)
*   **@dnd-kit** (Drag and Drop)
*   **Axios** (HTTP Client)
*   **React Router** (Navegação)

## 📋 Pré-requisitos

*   Node.js 18+ instalado
*   npm ou yarn

## ⚙️ Configuração

1.  Clone o repositório e entre na pasta do frontend:
    ```bash
    cd projeto-arquitetura-frontend
    ```

2.  Instale as dependências:
    ```bash
    npm install
    ```

3.  Configure a URL da API (se necessário, ajuste em `src/services/api.js`):
    ```javascript
    const api = axios.create({
      baseURL: 'http://localhost:8080'
    });
    ```

4.  Rode o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```

A aplicação estará disponível em `http://localhost:5173`.

## 🏗️ Estrutura do Projeto

```plaintext
src/
├── components/      # Componentes reutilizáveis
├── pages/           # Páginas (Rotas)
│   ├── auth/        # Login e Registro
│   ├── dashboard/   # Dashboard Principal
│   └── project/     # Detalhes e Criação de Projeto
├── services/        # Integração com API
└── App.jsx          # Configuração de Rotas
```

## 🎨 Design System

*   **Paleta de Cores:** Veja [`docs/03-frontend/design-system.md`](../../docs/03-frontend/design-system.md)
*   **Componentes:** Documentados em [`docs/03-frontend/component-guide.md`](../../docs/03-frontend/component-guide.md)

## 🧪 Build de Produção

```bash
npm run build
```

Os arquivos otimizados estarão em `dist/`.

## 📖 Guias Adicionais

*   [Guia de Componentes](../../docs/03-frontend/component-guide.md)
*   [Gerenciamento de Estado](../../docs/03-frontend/state-management.md)
