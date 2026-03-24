# Sabor de Mel — Cardápio Digital

## 📋 Visão Geral

Aplicativo de cardápio digital single-page para a lanchonete "Sabor de Mel", focado em pastelaria, sanduíches, açaí e bebidas. Funcionalidade principal: permitir que clientes escolham produtos, personalizem pedidos e enviem via WhatsApp.

## 🏗️ Arquitectura

### Estrutura do Projecto

```
sabordemel/
├── index.html            # Aplicação principal (SPA única — 1161 linhas)
├── design-system.html    # Documentação visual do design system
├── CLAUDE.md             # Guia de desenvolvimento (este arquivo)
├── package.json          # Scripts: dev/start (npx serve .)
├── vercel.json           # Deploy estático na Vercel
├── .gitignore
└── docs/
    ├── PRD_MVP_Cardapio_Digital.md
    ├── PRD_Cardapio_Digital_MicroSaaS.md
    ├── objetivos-futuros-prd.md
    └── lista-de-molhorias.md
```

### Arquitectura Técnica

- **Single File Application**: Toda a lógica está em `index.html` (HTML + CSS + JavaScript vanilla)
- **Framework CSS**: Tailwind CSS via CDN (com plugins `forms`, `container-queries`)
- **Ícones**: Material Symbols Outlined (Google Fonts)
- **Fontes**: Barlow Condensed (display) + Lato (body)
- **Storage**: localStorage para carrinho, histórico e tema
- **Integração**: WhatsApp Web API (`wa.me`) para envio de pedidos
- **Deploy**: Vercel (static hosting, zero build step)

## 🎨 Design System

### Cores (Tokens)

| Token | Light Mode | Dark Mode | Uso |
|-------|------------|-----------|-----|
| `--background` | `#f8f8f6` | `#131313` | Fundo principal |
| `--surface` | `#ffffff` | `#1e1e1e` | Cards, header, drawer |
| `--surface-alt` | `#f1f1f1` | `#2a2a2a` | Elementos secundários |
| `--text-primary` | `#1a1a1b` | `#f1f5f9` | Texto principal |
| `--text-secondary` | `#64748b` | `#94a3b8` | Texto secundário |
| `--border` | `#e2e8f0` | `#2a2a2a` | Bordas |
| **Primary** | `#edcd2c` | `#edcd2c` | CTA, chips ativos, destaques |
| **Accent** | `#f26522` | `#f26522` | Preços, badge, totais |

### Tipografia

- **Barlow Condensed**: Títulos, nomes de produto, preços, botões (Bold/SemiBold)
- **Lato**: Corpo de texto, descrições, labels (Regular/Bold)

### Componentes

| Componente | Border Radius | Tamanho |
|------------|---------------|---------|
| Chips/Filtros | `50%` (pill) | `h-10` (40px) |
| Cards produto | `16px` | Variável |
| Search Input | `12px` | `h-[48px]` |
| Modal/Drawer | `24px` | Full screen/dvh |
| Botões add | `50%` | `w-10 h-10` |
| Thumbnails | `12px` | `72x72px` |
| Inputs | `10px` | `padding: 10px 12px` |

### Dark Mode

- Toggle manual no header (ícone sol/lua)
- Persistido em `localStorage` como `'sabordemel_theme'`
- Detecta preferência do sistema como fallback
- Classe `dark` no `<html>` + CSSVariables

## 📦 Entidades de Dados

### Produto (PRODUCTS)

```javascript
{
  id: string,              // Identificador único
  category: string,        // Categoria (pasteis, acai-sorvetes, sanduiches, etc.)
  name: string,            // Nome do produto
  price?: number,          // Preço fixo (opcional)
  prices?: { [size]: number },  // Preços variáveis por tamanho
  description: string,     // Descrição/ingredientes
  icon: string,            // Material Symbol icon name
  hasCustomization?: boolean,  // Se precisa de modal de complementos
  limits?: { [size]: { [type]: number } },  // Limites de personalização por tamanho
  flavors?: string[]       // Sabores disponíveis
}
```

### Item do Carrinho

```javascript
{
  key: string,         // Hash: id + size + extras (para agrupamento)
  id: string,          // Produto ID original
  name: string,        // Nome display (com variantes)
  icon: string,        // Material Symbol
  unitPrice: number,   // Preço unitário final
  qty: number,         // Quantidade
  extras: Array<{      // Personalizações
    nome: string,
    categoria: string,
    preco: number
  }>,
  size?: string,       // Tamanho selecionado
  flavor?: string      // Sabor selecionado
}
```

### Pedido (Histórico)

```javascript
{
  date: string,        // ISO timestamp
  items: CartItem[],   // Deep clone dos itens
  total: number        // Valor total
}
```

## 🔧 Funcionalidades Principais

### 1. Navegação e Filtros
- Search bar global (filtra por nome e descrição/ingredientes)
- 6 chips de categoria: Todos, Pastéis, Açaí & Sorvetes, Sanduíches, Salgados & Outros, Bebidas
- Filtragem em tempo real (AND: categoria + busca)

### 2. Catálogo (~70 produtos)

| Categoria | Qtd | Tipo |
|-----------|-----|------|
| Pastéis | 11 | Preço fixo |
| Açaí & Sorvetes | 7 | Variável (tamanhos/sabores/complementos) |
| Sanduíches | 33 | Preço fixo |
| Salgados & Outros | 5 | Misto |
| Bebidas | 8 | Misto |

### 3. Modal de Personalização
- Seleção de tamanho (para produtos com `prices`)
- Seleção de sabor (obrigatória para milk-shakes/sorvetes)
- Complementos de açaí com limites por tamanho
- Adicionais pagos (ex: Nutella +R$3)
- Preço atualiza em tempo real
- Modo edição: reabre modal com dados pré-populados

### 4. Carrinho (Cart Drawer)
- Slide-in lateral (max 400px ou fullscreen mobile)
- Adicionar/remover quantidade (±)
- Editar itens (reabre modal)
- Agrupamento de itens idênticos por key
- Total dinâmico
- Persistência em localStorage
- Badge animado no ícone do header

### 5. Checkout WhatsApp
- Formulário: nome (obrigatório) + tipo entrega (retirada/delivery)
- Campos condicionais de endereço
- Mensagem formatada com itens agrupados por categoria
- `window.open('wa.me/{numero}?text={msg}')`
- Salva pedido no histórico antes de esvaziar

### 6. Histórico de Pedidos
- Toggle no drawer (Carrinho ↔ Histórico)
- Pedidos com data, itens e total
- Botão "Refazer" clona itens para o carrinho
- Persistência em localStorage (LIFO display)

## 📁 Mapa do index.html

| Linhas | Seção |
|--------|-------|
| 1-12 | Head: meta, CDN imports |
| 13-33 | Tailwind config (cores, fonts) |
| 34-144 | CSS: variables, animações, componentes |
| 146-191 | HTML: header, search, chips, product list, empty state |
| 192-218 | HTML: modal de personalização |
| 220-290 | HTML: overlay + drawer do carrinho |
| 292-322 | JS: Theme Manager |
| 324-439 | JS: Array PRODUCTS (~70 itens) |
| 441-498 | JS: renderProducts() + filtros |
| 500-760 | JS: Modal (openModal, renderModal, ACAI_OPTIONS) |
| 760-862 | JS: Cart (addToCart, editCartItem, changeQty) |
| 864-924 | JS: renderCartItems, drawer open/close |
| 926-1012 | JS: Histórico (toggle, render, reorder) |
| 1014-1100 | JS: Delivery toggle, WhatsApp checkout |
| 1102-1148 | JS: Modal add button + validações |
| 1150-1157 | JS: Init (loadCart, updateBadge, render) |

## 🛠️ Padrões de Código

### Namespacing
- localStorage: prefixo `'sabordemel_'` (cart, history, theme)
- IIFE: `(function(){ 'use strict'; ... })()`
- Sem módulos ES — tudo no escopo da IIFE

### Convenções de Nomes
- `cartState` / `historyState`: arrays de estado
- `currentModal{Product,Size,Extras,Flavor,Selections}`: estado do modal
- `editingCartItemKey`: chave do item em edição
- `ACAI_OPTIONS`: mapa de opções de açaí
- `WHATSAPP_NUMBER`: número da lanchonete

### Validações
- Sabores: hard validation (alert + return)
- Limites de complementos: soft validation (confirm + permite prosseguir)
- Campos do formulário: alert + return early

## 🎯 Diretrizes de Manutenção

### Adicionar Novo Produto
1. Adicionar objeto no array `PRODUCTS` (linhas 324-439)
2. Definir `category` correspondente a um chip existente
3. Definir `price` (fixo) ou `prices` (objeto tamanho→preço)
4. Definir `description` e `icon` (Material Symbol name)
5. Se personalização: `hasCustomization: true` + `limits`
6. Se sabores: adicionar array `flavors`

### Personalizar Design
1. Editar CSS Variables no `<style>` (linhas 35-53)
2. Atualizar Tailwind config (linhas 14-33) se necessário
3. **Documentar no `design-system.html`** (fonte de verdade visual)

### Alterar Número WhatsApp
1. Editar `WHATSAPP_NUMBER` no JavaScript (~linha 294)

## 📚 Documentação Completa

Vault Obsidian: `G:\Meu Drive\Kore\docs-sabordemel-cardapio`

- **MOC**: `Sabor De Mel.md` — mapa de conteúdo principal
- **Módulos**: Arquitetura, Design System, Produtos, Carrinho, Modal, Checkout, Histórico, Tema, Filtros, Componentes UI, Deploy

## 🔐 Segurança

- Validação frontend apenas (sem backend)
- Nenhuma entrada de usuário é executada
- `encodeURIComponent()` no link WhatsApp
- Dados locais apenas (localStorage)

## 📞 WhatsApp

```javascript
var WHATSAPP_NUMBER = '5582999999999'; // ⚠️ Atualizar para número real
```

## 🧪 Dependências (CDN only)

- `tailwindcss` + plugins (forms, container-queries)
- Google Fonts: Barlow Condensed, Lato, Material Symbols Outlined

## 🚀 Scripts

```bash
npm run dev    # npx -y serve .
npm run start  # npx -y serve .
```

## ⚠️ Conhecimento de Domínio

- Pastéis: todos preço fixo (R$9-R$22)
- Açaí: tamanhos (200ml-500ml) + limites de complementos por tamanho
- Milk-shakes/Sorvetes: sabores obrigatórios
- Sanduíches: todos preço fixo, descrições longas (sem truncate em mobile)
- Bebidas: diversos tamanhos, alguns com variantes (c/leite, s/leite)

---

**Última atualização**: 2026-03-24
