# PRD — Cardápio Digital · Micro SaaS

> **Versão:** 1.0  
> **Data:** Março 2026  
> **Status:** Rascunho  
> **Autor:** Gerado com pesquisa de mercado

---

## 1. Visão Geral do Produto

### 1.1 Problema

Restaurantes, bares, lanchonetes e deliveries de pequeno e médio porte dependem de cardápios físicos caros de imprimir, difíceis de atualizar e invisíveis fora do estabelecimento. Os marketplaces como iFood cobram taxas de até 30% por pedido, corroendo a margem. A alternativa — contratar sistemas completos como Saipos ou Goomer — pode custar entre R$150 e R$300/mês, com complexidade que afasta o dono de negócio sem equipe de TI.

### 1.2 Solução

Um **micro SaaS de cardápio digital** focado em simplicidade radical: o dono cadastra seus produtos em minutos, recebe um link público e um QR Code, e começa a receber pedidos sem taxas por transação. Pode ser acessado do celular sem instalar nenhum aplicativo.

### 1.3 Proposta de Valor

> *"Cardápio online em 5 minutos. Sem taxas por pedido. Sem app para instalar."*

- **Para o dono:** autonomia total para atualizar preços, estoque e promoções em tempo real, de qualquer lugar.  
- **Para o cliente:** experiência fluida via link ou QR Code, sem fricção de login.  
- **Diferencial vs. iFood/marketplace:** 0% de taxa sobre pedidos.  
- **Diferencial vs. Goomer/Anota AI:** setup em minutos, preço acessível, foco em negócios menores.

---

## 2. Público-Alvo

| Segmento | Perfil | Dor principal |
|---|---|---|
| **Primário** | Restaurante / lanchonete pequena, 1–5 funcionários | Cardápio físico caro e desatualizado |
| **Primário** | Delivery próprio sem equipe de TI | Taxa alta nos marketplaces |
| **Secundário** | Bar / café / food truck | Ausência de presença digital |
| **Secundário** | Dark kitchen | Precisam de canal próprio de pedidos |

**Geografia inicial:** Brasil — foco em cidades do interior e capitais de regiões Nordeste e Sul, onde a penetração de soluções sofisticadas ainda é baixa.

---

## 3. Análise de Concorrentes

### 3.1 Mapa Competitivo

| Produto | Posicionamento | Pontos fortes | Pontos fracos | Preço estimado |
|---|---|---|---|---|
| **Goomer** | Cardápio digital para delivery, mesa e balcão | Integração com 70+ PDVs/ERPs; QR Code 2.0; plano gratuito para delivery | Plano com automação custa R$140/mês+; limite de pedidos no free; complexidade crescente | Grátis → R$140–R$300/mês |
| **Anota AI** | Plataforma foodtech com chatbot IA via WhatsApp | IA generativa, NLP; atende 40.000+ estabelecimentos; chatbot no WhatsApp, Instagram e Facebook | Foco em automação completa = mais caro; pode ser excessivo para negócios pequenos | R$80–R$250/mês (com descontos) |
| **Saipos** | Sistema de gestão completo | Solução all-in-one; 15.000+ clientes | Cardápio gratuito apenas para clientes do sistema completo; onboarding longo | R$200–R$1.000/mês |
| **InstaDelivery** | Delivery + PDV integrado | Crescimento de 109% em 2023; plano base gratuito | Menos foco em presença digital standalone | Freemium |
| **CardápioWeb** | Cardápio digital simples | Fácil de configurar | Funcionalidades básicas; menos integrações | R$50–R$150/mês |

### 3.2 Gaps de Mercado Identificados

1. **Onboarding em menos de 5 minutos** — nenhum concorrente prioriza isso.
2. **Preço acessível com recursos essenciais** — o mercado pula de "grátis com limitações" para "R$140+ com tudo".
3. **Cardápio público sem login para o cliente final** — fluxo sem fricção.
4. **Multi-negócio** — um único login para quem tem mais de um ponto de venda.
5. **IA para sugestão de upsell** — poucos no tier básico oferecem isso.

---

## 4. Funcionalidades

### 4.1 MVP (Fase 1 — lançamento)

#### 🍽️ Gestão do Cardápio
- Cadastro de categorias (ex.: Entradas, Pratos, Bebidas, Sobremesas)
- Cadastro de itens com: nome, descrição, preço, foto, badge de destaque
- Marcação de disponibilidade (ativo/inativo) em tempo real
- Suporte a variações/adicionais (ex.: ponto da carne, tamanho da pizza, ingredientes extras)
- Preço por variação

#### 🔗 Canal de Vendas Próprio
- URL pública amigável: `meucardapio.app/nome-do-restaurante`
- QR Code gerado automaticamente para download e impressão
- Cardápio responsivo para mobile (sem app instalado)
- Compartilhamento via link (WhatsApp, Instagram, etc.)

#### 🛒 Pedidos (modo básico)
- Carrinho de compras para o cliente
- Envio do pedido via WhatsApp do restaurante (formato formatado)
- Pedido sem login para o cliente
- Campo de observações por item

#### ⚙️ Painel do Dono
- Dashboard com contagem de pedidos do dia
- Gerenciamento completo de cardápio via web e mobile
- Horário de funcionamento configurável
- Logo e banner de capa personalizáveis
- Status "aberto/fechado" acionável manualmente

#### 💳 Pagamento e Auth
- Autenticação do dono via e-mail/senha + Google OAuth
- Pagamento da assinatura via Stripe (cartão) ou Pix/boleto (Stripe + gateway BR)

---

### 4.2 Fase 2 — Crescimento (3–6 meses pós-lançamento)

#### 💬 Automação
- Chatbot básico para WhatsApp: envio automático do link do cardápio quando cliente enviar "cardápio" ou "oi"
- Notificação automática ao cliente com status do pedido (em preparo / saiu para entrega)

#### 📊 Analytics
- Itens mais pedidos
- Horários de pico
- Ticket médio
- Histórico de pedidos

#### 🎯 Marketing e Fidelização
- Cupons de desconto com código ou link
- Programa de fidelidade simples (pontos por pedido)
- Banners promocionais no topo do cardápio
- Agendamento de promoções por horário (ex.: happy hour)

#### 🔁 Multi-Cardápio
- Cardápios diferentes por horário (ex.: almoço vs. jantar)
- Cardápio para eventos (ex.: cardápio de festa junina)

---

### 4.3 Fase 3 — Escala (6–12 meses)

#### 🤖 IA
- Sugestão inteligente de upsell no checkout (cross-selling automático)
- Geração automática de descrições de pratos com IA
- Otimização de preços com base em demanda

#### 🏢 Multi-Unidade
- Painel único para redes com múltiplos pontos
- Cardápio base compartilhado com variações por unidade

#### 🔌 Integrações
- Integração com sistemas PDV populares no Brasil (Linx, TOTVS, Bling)
- Pixel do Facebook e Google Analytics
- iFood como canal adicional (sem perder o canal próprio)
- Nota fiscal eletrônica básica

#### 💰 Pagamento Online
- Pagamento dentro do próprio cardápio (Pix, cartão de crédito)
- Split automático: valor vai direto para conta do restaurante

---

## 5. Modelo de Monetização

### 5.1 Estrutura de Planos

| Plano | Público | Preço | Funcionalidades-chave |
|---|---|---|---|
| **Free** | Validação / negócios novos | R$0/mês | Cardápio digital, QR Code, até 30 pedidos/mês via WhatsApp |
| **Starter** | Negócios em crescimento | R$49/mês ou R$39/mês anual | Pedidos ilimitados, analytics básico, cupons, personalização de marca |
| **Pro** | Negócios estabelecidos | R$99/mês ou R$79/mês anual | Tudo do Starter + fidelização, multi-cardápio, chatbot WhatsApp, banners |
| **Business** | Redes e franquias | R$249/mês | Tudo do Pro + multi-unidade, integração PDV, suporte prioritário |

> **Observação de mercado:** O mercado atual vai de grátis-limitado a R$140+ sem meio-termo. Há espaço claro na faixa de R$49–R$99 com proposta de valor superior ao grátis mas sem a complexidade das soluções maiores.

### 5.2 Premissas Financeiras (estimativas conservadoras)

| Métrica | Mês 6 | Mês 12 |
|---|---|---|
| Clientes pagantes | 200 | 800 |
| Ticket médio | R$65 | R$70 |
| MRR estimado | R$13.000 | R$56.000 |
| Churn alvo | < 5%/mês | < 3%/mês |

### 5.3 Estratégia de Aquisição

- **Canal orgânico:** SEO local ("cardápio digital para restaurante + cidade"), Google Meu Negócio
- **Canal viral:** cada cardápio gerado exibe "Criado com [Produto]" no rodapé (com opção de remover no plano pago)
- **Canal pago:** Meta Ads e Google Ads segmentados por donos de restaurantes
- **Parcerias:** integradores de PDV, distribuidores de insumos, associações gastronômicas

---

## 6. Stack Técnica Sugerida

### 6.1 Frontend

| Tecnologia | Justificativa |
|---|---|
| **Next.js 15** | SSR/SSG para SEO, performance, Server Components, ecosistema maduro para SaaS |
| **React 19** | Base do Next.js, componentes reutilizáveis |
| **TypeScript** | Segurança de tipos, manutenção a longo prazo |
| **Tailwind CSS v4** | Velocidade de desenvolvimento, design responsivo |
| **Shadcn/UI** | Componentes prontos e acessíveis, altamente customizáveis |

### 6.2 Backend / BaaS

| Tecnologia | Justificativa |
|---|---|
| **Supabase** | PostgreSQL gerenciado, autenticação pronta, Storage para imagens, Realtime, RLS (segurança por linha) — ideal para micro SaaS |
| **Supabase Auth** | Login e-mail/senha, Google OAuth, magic link, sem custo adicional |
| **Supabase Storage** | Upload de fotos de pratos e banners |
| **Supabase Realtime** | Notificações de pedidos em tempo real para o painel do dono |

### 6.3 Pagamentos

| Tecnologia | Justificativa |
|---|---|
| **Stripe** | Padrão ouro para assinaturas SaaS; Customer Portal, webhooks, checkout embutido |
| **Stripe + Pix** | Para pagamentos em BRL — Stripe suporta Pix nativo no Brasil |

### 6.4 Infraestrutura

| Tecnologia | Justificativa |
|---|---|
| **Vercel** | Deploy zero-config para Next.js, CDN global, preview por PR |
| **Cloudflare Images** *(opcional)* | Otimização de imagens de pratos; alternativa: Supabase Storage com transformações |
| **Resend** | E-mail transacional (confirmações, boas-vindas, recuperação de senha) |

### 6.5 Integrações de Comunicação

| Tecnologia | Justificativa |
|---|---|
| **WhatsApp Business API (via Z-API ou Evolution API)** | Envio de pedidos formatados, notificações; solução BR sem custo da Meta direta |
| **Twilio** *(alternativa)* | SMS e WhatsApp via API internacional |

### 6.6 Ferramentas de Desenvolvimento

| Categoria | Ferramenta |
|---|---|
| ORM | **Drizzle ORM** (leve, type-safe, integra com Supabase/Postgres) |
| Validação | **Zod** |
| State Management | **Zustand** ou React Context (simples para o escopo) |
| Testes | **Playwright** (E2E), **Vitest** (unitário) |
| Analytics produto | **PostHog** (open-source, self-hosted opcional) |
| Monitoramento | **Sentry** |

### 6.7 Diagrama de Arquitetura (alto nível)

```
┌──────────────────────────────────────────────────┐
│                  CLIENTE FINAL                   │
│         (acessa via link público / QR Code)      │
└────────────────────┬─────────────────────────────┘
                     │ HTTPS
┌────────────────────▼─────────────────────────────┐
│              NEXT.JS (Vercel)                    │
│  App Router / Server Components / API Routes     │
│  - /[slug]         → Cardápio público            │
│  - /dashboard      → Painel do dono              │
│  - /api/orders     → Recebimento de pedidos      │
└────────┬───────────────────────┬─────────────────┘
         │                       │
┌────────▼───────┐    ┌──────────▼──────────┐
│   SUPABASE     │    │       STRIPE        │
│  - Postgres    │    │  - Assinaturas      │
│  - Auth        │    │  - Webhooks         │
│  - Storage     │    │  - Customer Portal  │
│  - Realtime    │    └─────────────────────┘
└────────────────┘
         │
┌────────▼───────────────────────────────────────┐
│           INTEGRAÇÕES EXTERNAS                  │
│  WhatsApp API  │  Resend (email)  │  PostHog    │
└────────────────────────────────────────────────┘
```

---

## 7. Roadmap

### Fase 1 — MVP (0–8 semanas)

- [ ] Setup do projeto: Next.js + Supabase + Stripe
- [ ] Autenticação: cadastro, login, recuperação de senha
- [ ] CRUD completo de cardápio (categorias + itens + variações)
- [ ] Upload de imagens (Supabase Storage)
- [ ] Página pública de cardápio com URL amigável
- [ ] Geração de QR Code
- [ ] Fluxo de pedido → envio para WhatsApp do restaurante
- [ ] Painel básico: status aberto/fechado, visualização de pedidos do dia
- [ ] Planos e cobrança via Stripe
- [ ] Deploy em produção (Vercel)

### Fase 2 — Crescimento (semanas 9–24)

- [ ] Analytics de pedidos
- [ ] Cupons de desconto
- [ ] Programa de fidelidade
- [ ] Banners promocionais
- [ ] Agendamento de promoções
- [ ] Multi-cardápio por horário
- [ ] Chatbot WhatsApp básico

### Fase 3 — Escala (semanas 25+)

- [ ] IA: upsell inteligente + geração de descrições
- [ ] Pagamento online no cardápio (Pix + cartão)
- [ ] Multi-unidade
- [ ] Integrações com PDV
- [ ] App mobile para o dono (React Native + Expo + Supabase)

---

## 8. Métricas de Sucesso

| Métrica | Meta (Mês 3) | Meta (Mês 12) |
|---|---|---|
| Usuários cadastrados | 500 | 5.000 |
| Clientes pagantes | 80 | 800 |
| MRR | R$4.000 | R$56.000 |
| Churn mensal | < 8% | < 3% |
| NPS | > 40 | > 60 |
| Time-to-value (cadastro → 1º pedido recebido) | < 10 min | < 5 min |
| CAC | < R$80 | < R$50 |
| LTV/CAC | > 3x | > 6x |

---

## 9. Riscos e Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| Mercado competitivo (Goomer, Anota AI) | Alta | Alto | Nichar em negócios muito pequenos e onboarding ultra-rápido |
| Churn alto por baixo engajamento | Média | Alto | Notificações proativas, onboarding guiado, suporte via WhatsApp |
| Dependência do WhatsApp para pedidos | Alta | Médio | Oferecer canal de pedidos nativo no plano Pro |
| Custo de imagens (Storage) | Baixa | Baixo | Compressão automática; limite de MB por plano |
| Regulamentação (LGPD) | Média | Médio | Política de privacidade clara; dados mínimos coletados do cliente final |

---

## 10. Próximos Passos

1. **Validação de demanda (antes de codar):** criar landing page com CTA "Quero ser o primeiro a testar" — meta de 50 leads em 2 semanas.
2. **Entrevistas com 10 donos de restaurante** para validar dores e disposição de pagamento.
3. **Setup do ambiente de desenvolvimento:** Next.js + Supabase + Stripe.
4. **Sprint 1 (2 semanas):** autenticação + CRUD de cardápio + página pública.
5. **Sprint 2 (2 semanas):** fluxo de pedido + QR Code + deploy.
6. **Beta fechado:** convidar 10–20 restaurantes para testar gratuitamente por 30 dias.

---

*PRD gerado com base em pesquisa de mercado de concorrentes (Goomer, Anota AI, Saipos, InstaDelivery, CardápioWeb) e análise do ecossistema de Micro SaaS no Brasil — Março 2026.*
