# IL Odontologia e Estética — Site institucional

Nova experiência digital da IL Odontologia e Estética, desenvolvida em React + Vite com foco em conversão, mobile first, acessibilidade, SEO local e performance.

## Rodar localmente

```bash
npm install
npm run dev
```

Build de produção:

```bash
npm run build
npm run preview
```

## Deploy no Cloudflare Pages

Configuração recomendada para este repositório:

- Production branch: `main`
- Framework preset: React (Vite)
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: `/`

Depois que o projeto do Cloudflare Pages estiver conectado ao repositório, cada push na `main` gera um novo deploy de produção automaticamente.

Também existe um comando para deploy direto via Wrangler, após autenticar uma conta Cloudflare:

```bash
npm run deploy:cloudflare
```

O arquivo `public/_headers` adiciona headers de segurança e cache para o deploy no Pages.

## Estrutura

- `src/App.jsx`: composição da HOME e componentes de interface.
- `src/data/siteData.js`: conteúdo factual da clínica e assets atuais.
- `src/styles.css`: design system, layouts responsivos e microinterações.
- `index.html`: metadados SEO, Open Graph e schema.org/Dentist.
- `public/_headers`: headers de segurança e cache para Cloudflare Pages.

## Conteúdo pendente de validação antes da publicação

- Horário de quinta-feira: a fonte atual contém uma inconsistência (`13:00 às 12000`), portanto o site não publica esse horário como fato.
- MetLife: aparece como `Em breve` no site atual e é tratado como `Em validação`.
- Redes sociais: links ainda não foram confirmados.
- Política de privacidade: conteúdo ainda não fornecido.

## Fonte factual

O site anterior foi usado apenas para informações da clínica (telefone, endereço, serviços, profissionais, depoimentos, convênios e imagens), sem reaproveitar sua estrutura visual.
