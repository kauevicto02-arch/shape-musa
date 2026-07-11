# Shape de Musa — Quiz Funnel

Funil de quiz interativo (24 telas) para o produto digital **Shape de Musa**,
com a especialista **Aline Pamplona** como identidade da marca. Conteúdo em
espanhol argentino. Mobile-first, pensado para se sentir como um app.

## Arquitetura

```
shape-de-musa/
├── index.html          → shell da aplicação (1 única página)
├── css/
│   └── style.css        → design tokens + todos os componentes visuais
├── js/
│   ├── content.js        → ⭐ ÚNICO ARQUIVO COM TODO O CONTEÚDO EDITÁVEL
│   ├── engine.js         → motor: renderiza as 24 telas a partir de content.js
│   └── main.js           → inicialização
└── assets/
    ├── images/            → coloque aqui suas fotos/imagens reais
    └── videos/             → coloque aqui seus vídeos reais
```

É um projeto **100% estático** (HTML/CSS/JS puro, sem build, sem
dependências de npm) — basta abrir `index.html` no navegador ou publicar
a pasta em qualquer hospedagem estática (Vercel, Netlify, Hostinger, etc).

### Por que essa arquitetura?

- **Sem framework/build step**: você pode editar e publicar sem precisar
  rodar `npm install`. Ideal para pixel do Meta e checkout externo, que
  geralmente pedem só um `<script>` colado no `<head>` ou `<body>`.
- **Conteúdo centralizado em `content.js`**: todo texto, pergunta, opção,
  depoimento, preço e pergunta de FAQ vive nesse único arquivo. Você nunca
  precisa tocar em `engine.js` para trocar textos.
- **Motor guiado por dados**: `engine.js` lê `SCREEN_ORDER` e desenha cada
  tela dinamicamente. As 9 perguntas (telas de pergunta) são geradas
  automaticamente a partir do array `CONTENT.questions` — adicionar/remover
  uma opção de resposta é só editar o array, o layout se adapta sozinho.

## Como editar o conteúdo

Abra `js/content.js`. Cada bloco é comentado com o número da tela do brief
original (Tela 1, Tela 2...). Exemplos:

- Trocar o texto do Hero → `CONTENT.hero`
- Trocar uma pergunta ou suas opções → `CONTENT.questions`
- Trocar preço da oferta → `CONTENT.offer.oldPrice` / `newPrice`
- Trocar perguntas do FAQ → `CONTENT.faq`

## Como colocar suas imagens e vídeos

Cada imagem no funil está preparada como *placeholder* elegante (moldura
tracejada com ícone). Quando você tiver o arquivo real:

1. Coloque o arquivo em `assets/images/` (ex: `hero.jpg`) ou `assets/videos/`.
2. No `content.js`, preencha o campo `img` correspondente, por exemplo:
   ```js
   hero: {
     img: "assets/images/hero.jpg", // antes estava ""
     ...
   }
   ```
3. O placeholder é substituído automaticamente pela imagem real.

Para os vídeos (Tela 20), os blocos `.ph-video` estão prontos para você
trocar o placeholder por uma tag `<video>` ou embed (YouTube/Vimeo) —
procure `RENDERERS.videos` em `engine.js`.

## Como integrar Pixel do Meta e Checkout

- **Pixel do Meta**: cole o script padrão do Meta Pixel dentro do `<head>`
  de `index.html`, antes do fechamento de `</head>`. Dispare eventos
  customizados (ex: `fbq('track', 'Lead')`) dentro de `engine.js`, na
  função `selectAnswer()` (quiz iniciado) e no botão `finalCtaBtn`
  (CTA final / checkout).
- **Checkout**: o botão final está em `RENDERERS.cta_final` (`id="finalCtaBtn"`).
  No `engine.js`, dentro de `bindScreenEvents`, troque o `alert(...)` de
  exemplo pelo redirecionamento real:
  ```js
  finalCtaBtn.addEventListener("click", () => {
    window.location.href = "https://seu-checkout.com/shape-de-musa";
  });
  ```
  O mesmo vale para o botão de oferta (`RENDERERS.oferta`, `id="nextBtn"`
  daquela tela) se quiser levar direto ao checkout a partir da oferta.

## Personalização do resultado

A Tela 14 (resultado) muda automaticamente de acordo com a resposta da
pergunta "objetivo principal" (Tela 3). Os 4 perfis possíveis estão em
`CONTENT.results.profiles`. Para adicionar lógica mais sofisticada de
pontuação (cruzando várias respostas), edite a função `RENDERERS.resultado`
em `engine.js`.

## Estrutura das 24 telas

1. Hero · 2. Idade · 3. Objetivo · 4. Corpo atual · 5. Corpo desejado ·
6. Tela educativa · 7. Carrossel antes/depois · 8. Rotina · 9. Dificuldade ·
10. Tempo disponível · 11. Alimentação · 12. Autoestima · 13. Processamento ·
14. Resultado · 15. Explicação · 16. Método Shape de Musa · 17. Benefícios ·
18. O que está incluso · 19. Prova social · 20. Vídeos · 21. Oferta ·
22. Garantia · 23. FAQ · 24. CTA final.

## Testar localmente

Basta abrir `index.html` diretamente no navegador, ou rodar um servidor
simples (opcional, evita problemas de cache):

```bash
npx serve .
# ou
python3 -m http.server 8080
```

## Melhorias aplicadas nesta versão

- Barra de progresso fixa no topo, sem sair para a lateral no desktop.
- Carrossel com arraste por dedo no celular e mouse no desktop.
- Hero com copy mais forte e mais clara.
- Resultado com copy mais personalizada e menos genérica.
- Oferta reforçada com título, subtítulo, bônus, garantia e CTA de checkout.
- Link único de checkout em `js/content.js` → `checkoutUrl`.
- Botões de compra prontos para redirecionar ao checkout.
- Ganchos prontos para Meta Pixel: `Lead`, `ViewContent` e `InitiateCheckout` disparam se o `fbq` existir na página.
- Campos `img` preparados nas opções com imagem (`corpo atual` e `corpo desejado`).

## Onde colocar o link do checkout

Abra `js/content.js` e troque:

```js
checkoutUrl: "COLOCAR_LINK_DO_CHECKOUT_AQUI",
```

pelo seu link real.

## Ajuste de diagnóstico personalizado
Foi acrescentada uma lógica de diagnóstico na tela de resultado usando as respostas de objetivo, rotina, dificuldade, tempo e alimentação. A ordem das telas, imagens, seções, VSL, oferta, garantia, FAQ e demais elementos originais foram mantidos.
