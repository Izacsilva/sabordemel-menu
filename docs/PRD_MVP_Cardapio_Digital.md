# PRD — MVP · Cardápio Digital

> **Versão:** 0.1  
> **Data:** Março 2026  
> **Status:** Em desenvolvimento  
> **Escopo:** MVP funcional — 1 lanchonete, 1 cardápio, pedido via WhatsApp

---

## 1. Objetivo do MVP

Entregar um cardápio digital funcional para **uma única lanchonete**, onde o cliente consegue:

1. Visualizar a lista de produtos (sanduíches)
2. Selecionar itens e montar um carrinho
3. Enviar o pedido via WhatsApp da lanchonete usando `wa.me`

Sem cadastro, sem pagamento online, sem backend. Simples e funcional.

---

## 2. Escopo — O que está DENTRO do MVP

### 2.1 Página do Cardápio
- Exibir nome e logo da lanchonete
- Listar produtos com: nome, descrição curta, preço e foto
- Produtos organizados em categorias (ex.: Sanduíches, Bebidas, Extras)
- Layout responsivo — funciona bem no celular

### 2.2 Carrinho
- Botão "Adicionar" em cada produto
- Contador de itens no carrinho (visível na tela)
- Tela/modal do carrinho com: itens selecionados, quantidade, subtotal por item e total geral
- Aumentar ou diminuir quantidade de cada item
- Remover item do carrinho

### 2.3 Envio do Pedido via WhatsApp
- Botão "Fazer Pedido" no carrinho
- Ao clicar, abre `wa.me/<número>?text=<pedido formatado>`
- Mensagem gerada automaticamente com a lista de itens, quantidades e total
- Número do WhatsApp da lanchonete fixo no código (configurável via variável)

---

## 3. Escopo — O que está FORA do MVP

> Estas funcionalidades estão documentadas no **PRD Futuro (v1.0)** e serão desenvolvidas em fases posteriores.

- ❌ Cadastro ou login de qualquer tipo
- ❌ Painel administrativo para o dono
- ❌ Pagamento online
- ❌ Banco de dados
- ❌ Backend / API
- ❌ Múltiplos estabelecimentos
- ❌ QR Code gerado dinamicamente
- ❌ Analytics ou relatórios
- ❌ Cupons ou fidelização

---

## 4. Fluxo do Usuário

```
[Abre o link do cardápio]
        │
        ▼
[Vê a lista de produtos da lanchonete]
        │
        ▼
[Clica em "Adicionar" nos produtos desejados]
        │
        ▼
[Abre o carrinho]
        │
        ├── Ajusta quantidades
        ├── Vê o total
        │
        ▼
[Clica em "Fazer Pedido"]
        │
        ▼
[Abre WhatsApp com mensagem pronta]
        │
        ▼
[Cliente envia a mensagem para a lanchonete]
```

---

## 5. Exemplo de Mensagem Gerada (WhatsApp)

```
Olá! Gostaria de fazer o seguinte pedido:

🍔 X-Burguer - 2x - R$ 30,00
🍔 X-Bacon - 1x - R$ 18,00
🥤 Coca-Cola 350ml - 2x - R$ 12,00

💰 Total: R$ 60,00

Aguardo confirmação!
```

---

## 6. Stack Técnica

| Camada | Tecnologia | Justificativa |
|---|---|---|
| Framework | **Next.js (App Router)** | Padrão do projeto; base para crescer |
| Linguagem | **TypeScript** | Segurança de tipos desde o início |
| Estilo | **Tailwind CSS** | Velocidade e responsividade |
| Componentes | **Shadcn/UI** | Componentes prontos e acessíveis |
| Estado do carrinho | **Zustand** ou **React Context** | Simples, sem backend necessário |
| Dados dos produtos | **Arquivo local (JSON ou `data.ts`)** | Sem banco de dados no MVP |
| Deploy | **Vercel** | Deploy gratuito, zero config para Next.js |

---

## 7. Estrutura de Dados (local)

Os produtos ficam em um arquivo estático `src/data/products.ts`:

```ts
export type Product = {
  id: string
  name: string
  description: string
  price: number        // em centavos (ex: 1890 = R$18,90)
  image: string        // URL da imagem ou caminho local
  category: string
  available: boolean
}

export const products: Product[] = [
  {
    id: "x-burguer",
    name: "X-Burguer",
    description: "Pão, hambúrguer 150g, queijo, alface e tomate",
    price: 1500,
    image: "/images/x-burguer.jpg",
    category: "Sanduíches",
    available: true,
  },
  // ...
]
```

---

## 8. Estrutura de Pastas Sugerida

```
/
├── src/
│   ├── app/
│   │   └── page.tsx          ← Página principal do cardápio
│   ├── components/
│   │   ├── ProductCard.tsx    ← Card de cada produto
│   │   ├── Cart.tsx           ← Modal/drawer do carrinho
│   │   ├── CartItem.tsx       ← Item dentro do carrinho
│   │   └── Header.tsx         ← Nome e logo da lanchonete
│   ├── data/
│   │   └── products.ts        ← Lista de produtos (dados estáticos)
│   ├── store/
│   │   └── cart.ts            ← Estado global do carrinho (Zustand)
│   └── lib/
│       └── whatsapp.ts        ← Função que gera o link wa.me
├── public/
│   └── images/                ← Fotos dos produtos
└── .env.local
    └── WHATSAPP_NUMBER=5511999999999
```

---

## 9. Critérios de Aceite

O MVP estará concluído quando:

- [ ] A página exibe todos os produtos cadastrados em `products.ts`
- [ ] É possível adicionar qualquer produto ao carrinho
- [ ] O carrinho mostra itens, quantidades e total corretamente
- [ ] É possível aumentar, diminuir e remover itens do carrinho
- [ ] O botão "Fazer Pedido" abre o WhatsApp com a mensagem formatada corretamente
- [ ] O layout funciona bem em telas mobile (375px+)
- [ ] O projeto está publicado na Vercel com URL acessível

---

## 10. Referência Futura

Este MVP é a **Fase 0** do produto completo. A visão de longo prazo — com painel administrativo, múltiplos estabelecimentos, analytics, IA e modelo de assinatura — está documentada em:

📄 **`PRD_Cardapio_Digital_MicroSaaS.md`** — PRD Completo v1.0

---

*PRD MVP gerado para guiar o desenvolvimento inicial do Cardápio Digital — Março 2026.*
