import { useEffect, useMemo, useRef, useState } from 'react';
import { assets, clinic, specialists, testimonials } from './data/siteData';
import transformacao02 from './assets/cases/transformacao02.jpg';

const primaryCare = [
  {
    name: 'Odontologia estética',
    short: 'Estética com naturalidade',
    description: 'Planejamento individualizado para harmonizar sorriso, saúde bucal e proporções faciais com facetas, lentes e clareamento.',
    image: assets.gallery[1],
  },
  {
    name: 'Implante dentário',
    short: 'Função e estabilidade',
    description: 'Reabilitação cirúrgica e protética planejada para recuperar função mastigatória, segurança e estabilidade.',
    image: assets.hero,
  },
  {
    name: 'Ortodontia',
    short: 'Alinhamento e oclusão',
    description: 'Correção de mordida, alinhamento funcional e harmonia do arco dental com abordagens modernas, discretas e confortáveis.',
    image: assets.gallery[2],
  },
];

const secondaryCare = [
  {
    name: 'Limpeza dental',
    description: 'Profilaxia e prevenção contínua para manutenção da saúde periodontal e bem-estar bucal.',
  },
  {
    name: 'Tratamento de canal',
    description: 'Tratamento endodôntico para preservar a estrutura dental e evitar dores e complicações futuras.',
  },
  {
    name: 'Odontopediatria',
    description: 'Acolhimento afetivo e cuidado preventivo desde a infância para uma experiência positiva e tranquila.',
  },
  {
    name: 'Extração dentária',
    description: 'Conduta segura e planejamento individualizado quando a remoção do dente é clinicamente indicada.',
  },
];

const agreements = [
  { name: 'Bradesco Dental', status: 'Atendimento confirmado' },
  { name: 'Brasil Dental', status: 'Atendimento confirmado' },
  { name: 'Odontoprev', status: 'Atendimento confirmado' },
  { name: 'MetLife', status: 'Em breve' },
];

const faq = [
  {
    q: 'Como faço para agendar uma consulta?',
    a: 'Você pode iniciar o agendamento pelo WhatsApp no número (88) 99984-5437 e combinar o melhor dia e horário diretamente com a recepção.',
  },
  {
    q: 'Quais tratamentos a clínica oferece?',
    a: 'A clínica oferece odontologia estética, implantes dentários, ortodontia (aparelhos), limpeza dental, tratamento de canal, odontopediatria e extração dentária.',
  },
  {
    q: 'Quais convênios são atendidos?',
    a: 'Atendemos Bradesco Dental, Brasil Dental e Odontoprev. O credenciamento da MetLife está em andamento (em breve).',
  },
  {
    q: 'Qual o horário de atendimento da clínica?',
    a: 'Segunda a quinta: 08h às 12h e 13h às 20h. Sexta-feira: 08h às 12h e 13h às 18h. Sábado: 08h às 12h. Domingo: Fechado.',
  },
  {
    q: 'Onde fica a IL Odontologia e Estética?',
    a: 'Rua Cândido Olímpio, 1920, Centro, Limoeiro do Norte - CE (no Castelo, próximo ao Instituto dos Olhos).',
  },
];

const beforeAfter = [
  {
    title: 'Transformação 01',
    category: 'Harmonização do Sorriso & Lentes',
    image: assets.gallery[1],
    caption: 'Registro clínico de harmonização estética e proporção do sorriso realizado na IL Odontologia e Estética.',
  },
  {
    title: 'Transformação 02',
    category: 'Fechamento de Diastema & Reanatomização',
    image: transformacao02,
    caption: 'Registro clínico real de fechamento de diastema anterior e reabilitação anatômica do sorriso com naturalidade.',
  },
];

function wa(message) {
  return `https://wa.me/${clinic.phoneRaw}?text=${encodeURIComponent(message)}`;
}

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="v4-icon">
      <path d="M5 12h13M14 7l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MenuIcon({ open }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="v4-icon">
      {open ? (
        <path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      ) : (
        <path d="M4 8h16M4 16h16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      )}
    </svg>
  );
}

function Button({ href, children, outline = false, external = false }) {
  return (
    <a
      href={href}
      className={`v4-button ${outline ? 'is-outline' : ''}`}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
    >
      <span>{children}</span>
      <Arrow />
    </a>
  );
}

function useReveal() {
  useEffect(() => {
    const targets = [...document.querySelectorAll('[data-reveal]')];
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      targets.forEach((target) => target.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);
}

function Header() {
  const [open, setOpen] = useState(false);
  const nav = [
    ['A clínica', '#clinica'],
    ['Tratamentos', '#tratamentos'],
    ['Antes & Depois', '#resultados'],
    ['Especialistas', '#especialistas'],
    ['Contato', '#contato'],
  ];

  useEffect(() => {
    document.body.classList.toggle('v4-menu-open', open);
    return () => document.body.classList.remove('v4-menu-open');
  }, [open]);

  return (
    <header className="v4-header">
      <div className="v4-shell v4-header__inner">
        <a href="#inicio" className="v4-brand" aria-label="IL Odontologia e Estética — início">
          <img src={assets.logo} alt="IL Odontologia e Estética" />
        </a>

        <nav className="v4-nav" aria-label="Navegação principal">
          {nav.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </nav>

        <a className="v4-header__cta" href={clinic.whatsapp} target="_blank" rel="noreferrer">
          Agendar consulta <Arrow />
        </a>

        <button
          type="button"
          className="v4-menu-button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
        >
          <MenuIcon open={open} />
        </button>
      </div>

      <div className={`v4-menu ${open ? 'is-open' : ''}`}>
        <div className="v4-shell">
          <nav aria-label="Navegação mobile">
            {nav.map(([label, href]) => (
              <a href={href} key={href} onClick={() => setOpen(false)}>{label}</a>
            ))}
          </nav>
          <Button href={clinic.whatsapp} external>Agendar pelo WhatsApp</Button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const heroSlides = useMemo(() => [
    {
      name: 'Dra. Layla Beatriz',
      specialty: 'Cirurgiã-dentista clínica geral, pós-graduada em estética dental.',
      image: assets.about,
    },
    specialists[1],
    specialists[2],
  ], []);

  const [active, setActive] = useState(0);
  const person = heroSlides[active];

  useEffect(() => {
    heroSlides.forEach((slide) => {
      const image = new Image();
      image.src = slide.image;
    });

    if (heroSlides.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = window.setInterval(() => {
      setActive((index) => (index + 1) % heroSlides.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [heroSlides]);

  return (
    <section className="v4-hero" id="inicio">
      <div className="v4-hero__media">
        <img key={person.image} src={person.image} alt={`Foto de ${person.name}`} className="v4-hero__photo" />
        <div className="v4-hero__media-shade" aria-hidden="true" />
        <div className="v4-hero__person">
          <span>Corpo clínico</span>
          <strong>{person.name}</strong>
          <p>{person.specialty}</p>
        </div>
      </div>

      <div className="v4-shell v4-hero__grid">
        <div className="v4-hero__copy" data-reveal>
          <p className="v4-kicker">Limoeiro do Norte · CE</p>
          <h1>Saúde e estética, em equilíbrio.</h1>
          <p className="v4-hero__lead">Odontologia com atendimento próximo, planejamento individual e cuidado em cada detalhe.</p>
          <div className="v4-actions">
            <Button href={clinic.whatsapp} external>Agendar consulta</Button>
            <a className="v4-text-link" href="#tratamentos">Conhecer tratamentos <Arrow /></a>
          </div>
        </div>
      </div>

      <div className="v4-hero__selector" aria-label="Profissional em destaque">
        <div className="v4-shell">
          {heroSlides.map((slide, index) => (
            <button
              type="button"
              key={slide.name}
              className={active === index ? 'is-active' : ''}
              onClick={() => setActive(index)}
              aria-label={`Mostrar ${slide.name}`}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              {slide.name.replace('Dra. ', '').replace('Dr. ', '')}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  const items = [
    'Atendimento humanizado e próximo',
    '1.000+ pacientes atendidos',
    'Corpo clínico especializado',
    'Castelo · Limoeiro do Norte - CE',
  ];
  return (
    <section className="v4-trust" aria-label="Diferenciais da clínica">
      <div className="v4-shell v4-trust__grid">
        {items.map((item) => <span key={item}>{item}</span>)}
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="v4-section v4-about" id="clinica">
      <div className="v4-shell v4-about__grid">
        <div className="v4-about__copy" data-reveal>
          <p className="v4-kicker v4-kicker--dark">A clínica</p>
          <h2>Cuidado humano, decisões claras e atenção individual.</h2>
          <p className="v4-lead">A IL Odontologia e Estética combina saúde bucal, estética e atendimento humanizado com honestidade, respeito e atenção individual.</p>
          <p>Cada paciente é recebido em consultórios preparados para acolher com conforto, biossegurança e tranquilidade. A proposta é ouvir, orientar e construir um plano de tratamento claro e personalizado.</p>
          <a className="v4-text-link v4-text-link--dark" href="#experiencia">Conhecer a experiência <Arrow /></a>
        </div>

        <figure className="v4-about__media" data-reveal>
          <img src={assets.hero} alt="Ambiente físico da IL Odontologia e Estética em Limoeiro do Norte" loading="lazy" />
          <figcaption>
            <span>IL Odontologia e Estética</span>
            <strong>Um espaço pensado para acolher com conforto, organização e cuidado.</strong>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function TreatmentPanels() {
  const [active, setActive] = useState(0);

  return (
    <section className="v4-section v4-care" id="tratamentos">
      <div className="v4-shell">
        <div className="v4-section-head" data-reveal>
          <p className="v4-kicker">Tratamentos</p>
          <h2>Três caminhos, uma mesma forma de cuidar.</h2>
          <p>Uma apresentação mais visual das principais frentes de atendimento, com acesso direto ao WhatsApp.</p>
        </div>
      </div>

      <div className="v4-care__panels" data-reveal>
        {primaryCare.map((item, index) => (
          <article
            className={`v4-care-card ${active === index ? 'is-active' : ''}`}
            key={item.name}
            onMouseEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
          >
            <img src={item.image} alt="" loading="lazy" aria-hidden="true" />
            <div className="v4-care-card__shade" aria-hidden="true" />
            <div className="v4-care-card__content">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{item.short}</p>
              <h3>{item.name}</h3>
              <div className="v4-care-card__reveal">
                <p>{item.description}</p>
                <a href={wa(`Olá! Gostaria de saber mais sobre ${item.name} na IL Odontologia e Estética.`)} target="_blank" rel="noreferrer">
                  Agendar avaliação <Arrow />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="v4-shell v4-secondary-care" data-reveal>
        {secondaryCare.map((item) => (
          <article key={item.name}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <a href={wa(`Olá! Gostaria de saber mais sobre ${item.name} na IL Odontologia e Estética.`)} target="_blank" rel="noreferrer">
              Saber mais <Arrow />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

function BeforeAfter() {
  const [active, setActive] = useState(0);
  const item = beforeAfter[active];

  return (
    <section className="v4-section v4-results" id="resultados">
      <div className="v4-shell">
        <div className="v4-results__head" data-reveal>
          <div>
            <p className="v4-kicker v4-kicker--dark">Antes & Depois</p>
            <h2>Transformações reais merecem espaço para serem vistas.</h2>
          </div>
          <p>Registros clínicos reais acompanhados na IL Odontologia e Estética. Cada planejamento respeita a anatomia e busca harmonia, naturalidade e saúde funcional.</p>
        </div>

        <div className="v4-results__stage" data-reveal>
          <figure key={item.title}>
            <img
              src={item.image}
              alt={`${item.title} — ${item.category} na IL Odontologia e Estética`}
              loading="eager"
            />
          </figure>
          <div className="v4-results__copy">
            <div className="v4-results__meta">
              <span className="v4-results__counter">{String(active + 1).padStart(2, '0')} / {String(beforeAfter.length).padStart(2, '0')}</span>
              <span className="v4-results__badge">{item.category}</span>
            </div>
            <h3>{item.title}</h3>
            <p>{item.caption}</p>
            <small>Resultados variam conforme a avaliação clínica individual e condições de cada paciente.</small>
            <Button href={wa(`Olá! Vi o caso de ${item.title} (${item.category}) no site da IL e gostaria de agendar uma avaliação.`)} external>
              Avaliar meu caso
            </Button>
          </div>
        </div>

        <div className="v4-results__nav" data-reveal>
          {beforeAfter.map((caseItem, index) => (
            <button
              type="button"
              key={caseItem.title}
              className={active === index ? 'is-active' : ''}
              onClick={() => setActive(index)}
              aria-label={`Visualizar ${caseItem.title}`}
            >
              <span className="v4-results__nav-idx">{String(index + 1).padStart(2, '0')}</span>
              <span className="v4-results__nav-title">{caseItem.title}</span>
              <span className="v4-results__nav-cat">· {caseItem.category}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Specialists() {
  return (
    <section className="v4-section v4-specialists" id="especialistas">
      <div className="v4-shell">
        <div className="v4-section-head v4-section-head--dark" data-reveal>
          <p className="v4-kicker">Corpo clínico</p>
          <h2>Profissionais que unem técnica e proximidade.</h2>
          <p>Conheça quem estará ao seu lado durante cada etapa do tratamento.</p>
        </div>

        <div className="v4-specialists__track" data-reveal>
          {specialists.map((person) => (
            <article className="v4-person" key={person.name}>
              <div className="v4-person__media">
                <img src={person.image} alt={`Foto de ${person.name}`} loading="lazy" />
              </div>
              <div className="v4-person__body">
                <h3>{person.name}</h3>
                <p>{person.specialty}</p>
                <a href={wa(`Olá! Gostaria de agendar uma consulta e saber mais sobre o atendimento de ${person.name}.`)} target="_blank" rel="noreferrer">
                  Agendar consulta <Arrow />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const items = [
    ['Escuta', 'Entender suas expectativas antes de indicar qualquer caminho.'],
    ['Planejamento', 'Explicar cada etapa com clareza e construir uma jornada individual.'],
    ['Conforto', 'Criar um ambiente acolhedor para tornar a experiência mais tranquila.'],
    ['Acompanhamento', 'Manter proximidade e orientação ao longo do tratamento.'],
  ];

  return (
    <section className="v4-section v4-experience" id="experiencia">
      <div className="v4-shell v4-experience__grid">
        <div className="v4-experience__copy" data-reveal>
          <p className="v4-kicker">Experiência do paciente</p>
          <h2>Sentir-se bem cuidado também faz parte do tratamento.</h2>
          <p>A experiência dentro da clínica foi pensada para ser simples, próxima e organizada — da conversa inicial ao acompanhamento profissional.</p>
        </div>

        <figure className="v4-experience__media" data-reveal>
          <img src={assets.hero} alt="Ambiente da IL Odontologia e Estética" loading="lazy" />
        </figure>

        <div className="v4-experience__items" data-reveal>
          {items.map(([title, copy]) => (
            <div key={title}>
              <strong>{title}</strong>
              <p>{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const [active, setActive] = useState(0);
  const item = testimonials[active] || testimonials[0];
  const next = () => setActive((index) => (index + 1) % testimonials.length);
  const prev = () => setActive((index) => (index - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="v4-section v4-testimonials">
      <div className="v4-shell v4-testimonials__grid">
        <div data-reveal>
          <p className="v4-kicker v4-kicker--dark">Depoimentos</p>
          <h2>Confiança construída no atendimento.</h2>
        </div>

        <blockquote data-reveal key={item.name}>
          <span className="v4-quote">“</span>
          <p>{item.quote}</p>
          <footer>
            <strong>{item.name}</strong>
            <div>
              <button type="button" onClick={prev}>← Anterior</button>
              <button type="button" onClick={next}>Próximo →</button>
            </div>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}

function Info() {
  const [open, setOpen] = useState(0);

  return (
    <section className="v4-section v4-info">
      <div className="v4-shell v4-info__grid">
        <div data-reveal>
          <p className="v4-kicker v4-kicker--dark">Convênios</p>
          <h2>Atendimento também por convênio.</h2>
          <div className="v4-agreements">
            {agreements.map((item) => (
              <div key={item.name}>
                <strong>{item.name}</strong>
                <span>{item.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div data-reveal>
          <p className="v4-kicker v4-kicker--dark">Perguntas frequentes</p>
          <div className="v4-faq">
            {faq.map((item, index) => {
              const opened = open === index;
              return (
                <article key={item.q} className={opened ? 'is-open' : ''}>
                  <button type="button" onClick={() => setOpen(opened ? -1 : index)} aria-expanded={opened}>
                    <strong>{item.q}</strong>
                    <span>{opened ? '−' : '+'}</span>
                  </button>
                  <div className="v4-faq__answer"><p>{item.a}</p></div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="v4-contact" id="contato">
      <div className="v4-shell v4-contact__grid">
        <div className="v4-contact__copy" data-reveal>
          <p className="v4-kicker">Contato & Localização</p>
          <h2>Pronto para cuidar do seu sorriso?</h2>
          <p>Fale com a equipe da IL Odontologia e Estética e agende sua consulta.</p>
          <div className="v4-actions">
            <Button href={clinic.whatsapp} external>Agendar pelo WhatsApp</Button>
            <Button href={clinic.routeUrl} outline external>Abrir rota</Button>
          </div>
          <div className="v4-contact__facts">
            <div>
              <span>Telefone / WhatsApp</span>
              <a href={`tel:+${clinic.phoneRaw}`}>{clinic.phoneDisplay}</a>
            </div>
            <div>
              <span>E-mail</span>
              <a href={`mailto:${clinic.email}`}>{clinic.email}</a>
            </div>
            <div>
              <span>Endereço</span>
              <p>Rua Cândido Olímpio, 1920<br />Centro · Limoeiro do Norte - CE</p>
            </div>
            <div>
              <span>Referência</span>
              <p>{clinic.landmark}</p>
            </div>
            <div>
              <span>Horário</span>
              <p>
                Seg a Qui: 08h às 12h · 13h às 20h<br />
                Sexta-feira: 08h às 12h · 13h às 18h<br />
                Sábado: 08h às 12h
              </p>
            </div>
          </div>
        </div>

        <div className="v4-map" data-reveal>
          <iframe
            src={clinic.mapEmbed}
            title="Mapa da IL Odontologia e Estética"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="v4-footer">
      <div className="v4-shell v4-footer__grid">
        <div>
          <img src={assets.logo} alt="IL Odontologia e Estética" />
          <p>Seu sorriso é nossa missão. Odontologia, estética e cuidado humano em Limoeiro do Norte - CE.</p>
        </div>
        <div>
          <span>Navegação</span>
          <a href="#clinica">A clínica</a>
          <a href="#tratamentos">Tratamentos</a>
          <a href="#resultados">Antes & Depois</a>
          <a href="#especialistas">Especialistas</a>
          <a href="#contato">Contato</a>
        </div>
        <div>
          <span>Contato</span>
          <a href={clinic.whatsapp} target="_blank" rel="noreferrer">WhatsApp: {clinic.phoneDisplay}</a>
          <a href={`tel:+${clinic.phoneRaw}`}>Telefone: {clinic.phoneDisplay}</a>
          <a href={`mailto:${clinic.email}`}>{clinic.email}</a>
          <a href={clinic.routeUrl} target="_blank" rel="noreferrer">Como chegar</a>
        </div>
      </div>
      <div className="v4-shell v4-footer__bottom">
        <span>© {new Date().getFullYear()} IL Odontologia e Estética · Todos os direitos reservados</span>
        <span>Limoeiro do Norte · CE</span>
      </div>
    </footer>
  );
}

function MobileDock() {
  return (
    <div className="v4-mobile-dock">
      <a href={clinic.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
      <a href={clinic.routeUrl} target="_blank" rel="noreferrer">Como chegar</a>
    </div>
  );
}

export default function AppV4() {
  useReveal();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <About />
        <TreatmentPanels />
        <BeforeAfter />
        <Specialists />
        <Experience />
        <Testimonials />
        <Info />
        <Contact />
      </main>
      <Footer />
      <MobileDock />
    </>
  );
}
