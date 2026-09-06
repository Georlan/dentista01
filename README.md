# IL Odontologia e Estética — Site institucional

Protótipo da nova experiência digital da IL Odontologia e Estética, desenvolvido em React + Vite com foco em conversão, mobile first, acessibilidade, SEO local e performance.

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

## Estrutura

- `src/App.jsx`: composição da HOME e componentes de interface.
- `src/data/siteData.js`: conteúdo factual da clínica e assets atuais.
- `src/styles.css`: design system, layouts responsivos e microinterações.
- `index.html`: metadados SEO, Open Graph e schema.org/Dentist.

## Conteúdo pendente de validação antes da publicação

- Horário de quinta-feira: a fonte atual contém uma inconsistência (`13:00 às 12000`), portanto o protótipo não publica esse horário como fato.
- MetLife: aparece como `Em breve` no site atual e é tratado no protótipo como `Em validação`.
- Redes sociais: links ainda não foram confirmados.
- Política de privacidade: conteúdo ainda não fornecido.

## Fonte factual

O site anterior foi usado apenas para informações da clínica (telefone, endereço, serviços, profissionais, depoimentos, convênios e imagens), sem reaproveitar sua estrutura visual.
