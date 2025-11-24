# Design System

O ArchFlow utiliza um Design System moderno e minimalista, focado na usabilidade e clareza visual para arquitetos.

## 🎨 Paleta de Cores

Utilizamos o **Tailwind CSS** com cores customizadas configuradas no `tailwind.config.js`.

| Nome | Cor Hex | Uso |
| :--- | :--- | :--- |
| **Primary** | `#1b1818` | Botões principais, textos de destaque (Quase preto) |
| **Background Light** | `#f7f7f7` | Fundo principal da aplicação (Modo Claro) |
| **Background Dark** | `#1a1818` | Fundo principal da aplicação (Modo Escuro) |
| **Status Todo** | `#FFC107` | Indicador de tarefas "A Fazer" (Amarelo) |
| **Status Progress** | `#2196F3` | Indicador de "Em Andamento" (Azul) |
| **Status Done** | `#4CAF50` | Indicador de "Concluído" (Verde) |

## 🔤 Tipografia

A fonte principal é a **Inter** (Google Fonts), escolhida por sua excelente legibilidade em interfaces de usuário.

*   **Headings:** Font-weight 700 (Bold) ou 600 (Semi-bold).
*   **Body:** Font-weight 400 (Regular) ou 500 (Medium).

## 🧩 Componentes Base (UI Lib)

Não reinventamos a roda. Utilizamos componentes primitivos acessíveis do **Radix UI** ou **Shadcn/ui** (quando aplicável) e estilizamos com Tailwind.

*   **Botões:** Variantes `default` (Primary), `outline`, `ghost`.
*   **Inputs:** Estilo clean com bordas sutis e foco na cor primária.
*   **Modais:** Dialogs centralizados com backdrop blur.

## 📐 Layout

*   **Responsividade:** Mobile-first.
*   **Grid:** Sistema de grid flexível para o Dashboard.
*   **Kanban:** Layout horizontal com scroll overflow para as colunas.
