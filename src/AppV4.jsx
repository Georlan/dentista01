import { useEffect, useMemo, useRef, useState } from 'react';
import { assets, clinic, specialists, testimonials } from './data/siteData';
import transformacao02 from './assets/cases/transformacao02.jpg';
import transformacao03 from './assets/cases/transformacao03.jpg';

const primaryCare = [
  {
    name: 'Odontologia estética',
    short: 'Harmonização & Lentes',
    description: 'Planejamento digital individualizado para valorizar a luminosidade e as proporções do sorriso com lentes cerâmicas, facetas anatômicas e clareamento guiado.',
    image: assets.gallery[0],
  },
  {
    name: 'Implante dentário',
    short: 'Função & Estabilidade',
    description: 'Reabilitação cirúrgica e protética minuciosa para restabelecer a capacidade mastigatória plena, harmonia facial e a segurança definitiva ao sorrir.',
    image: assets.hero,
  },
  {
    name: 'Ortodontia & Alinhadores',
    short: 'Alinhamento & Oclusão',
    description: 'Correção de mordida e alinhamento tridimensional com aparelhos autoligados, estéticos e alinhadores transparentes modernos e confortáveis.',
    image: assets.gallery[2],
  },
];

const secondaryCare = [
  {
    name: 'Limpeza & Profilaxia Avançada',
    description: 'Acompanhamento preventivo com remoção ultrassônica de tártaro e placa para proteção gengival e saúde bucal a longo prazo.',
  },
  {
    name: 'Tratamento de Canal (Endodontia)',
    description: 'Tratamento biológico e preciso para preservar o dente natural, controlar desconfortos e evitar complicações futuras.',
  },
  {
    name: 'Odontopediatria Acolhedora',
    description: 'Cuidado preventivo e afetuoso desde a infância, criando uma relação positiva, tranquila e sem medo com o consultório.',
  },
  {
    name: 'Cirurgia & Extração Cuidadosa',
    description: 'Procedimentos minimamente invasivos com rigor cirúrgico, anestesia precisa e foco em cicatrização confortável.',
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
    a: 'Você pode iniciar o agendamento pelo WhatsApp no número (88) 99984-5437 e escolher o melhor dia e horário diretamente com nossa recepção.',
  },
  {
    q: 'Quais áreas a equipe da IL Odontologia atende?',
    a: 'Nossa equipe conta com especialistas em Odontologia Estética, Implantes e Prótese, Ortodontia e Alinhadores, além de Clínica Geral e Prevenção voltada também para pacientes com medo de dentista.',
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
    id: 'diastema',
    title: 'Transformação 01',
    category: 'Fechamento de Diastema & Reanatomização',
    image: transformacao02,
    badge: 'Caso Clínico Real',
    diagnosis: 'Espaçamento anterior (diastema) e desproporção anatômica.',
    approach: 'Planejamento de fechamento com cerâmica de alta durabilidade e respeito aos tecidos gengivais.',
    caption: 'Registro clínico real de fechamento de diastema anterior e reabilitação anatômica do sorriso com naturalidade.',
  },
  {
    id: 'lentes',
    title: 'Transformação 02',
    category: 'Harmonização do Sorriso & Lentes',
    image: assets.gallery[0],
    badge: 'Caso Clínico Real',
    diagnosis: 'Desgaste estético superficial e assimetria na linha do sorriso.',
    approach: 'Facetas cerâmicas ultrafinas com iluminação de cor personalizada e alinhamento do arco.',
    caption: 'Planejamento digital com refinamento de proporções, iluminação de cor e acabamento em harmonia com os traços faciais.',
  },
  {
    id: 'reabilitacao',
    title: 'Transformação 03',
    category: 'Reabilitação Estética & Funcional',
    image: transformacao03,
    badge: 'Caso Clínico Real',
    diagnosis: 'Perda de suporte dental anterior e alteração da curva estética.',
    approach: 'Reabilitação integrada restabelecendo ponto de contato, função mastigatória e harmonia do sorriso.',
    caption: 'Registro clínico de reabilitação estético-funcional anterior com restabelecimento da oclusão e naturalidade.',
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

function Button({ href, children, outline = false, external = false, className = '' }) {
  return (
    <a
      href={href}
      className={`v4-button ${outline ? 'is-outline' : ''} ${className}`}
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
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const nav = [
    ['A clínica', '#clinica'],
    ['Tratamentos', '#tratamentos'],
    ['Antes & Depois', '#resultados'],
    ['Corpo Clínico', '#especialistas'],
    ['Contato', '#contato'],
  ];

  useEffect(() => {
    document.body.classList.toggle('v4-menu-open', open);
    return () => document.body.classList.remove('v4-menu-open');
  }, [open]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`v4-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="v4-shell v4-header__inner">
        <a href="#inicio" className="v4-brand" aria-label="IL Odontologia e Estética — início">
          <img src={assets.logo} alt="IL Odontologia e Estética" />
        </a>

        <nav className="v4-nav" aria-label="Navegação principal">
          {nav.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </nav>

        <a className="v4-header__cta" href={clinic.whatsapp} target="_blank" rel="noreferrer">
          <span>Agendar consulta</span>
          <Arrow />
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
      id: 'layla',
      tag: 'DIRETORA CLÍNICA · ESTÉTICA DENTAL',
      name: 'Dra. Layla Beatriz',
      specialty: 'Cirurgiã-dentista clínica geral, pós-graduada em estética dental.',
      quote: 'Planejamento estético individualizado para valorizar a harmonia natural de cada sorriso.',
      image: assets.about,
      isPlaceholder: false,
    },
    {
      id: 'hugo',
      tag: 'REABILITAÇÃO ORAL & IMPLANTES',
      name: 'Dr. Hugo Mota',
      specialty: 'Especialista em implantes e prótese dentária.',
      quote: 'Precisão cirúrgica e rigor técnico para restabelecer conforto mastigatório e estabilidade duradoura.',
      image: specialists[1].image,
      isPlaceholder: false,
    },
    {
      id: 'hanna',
      tag: 'ORTODONTIA CONTEMPORÂNEA',
      name: 'Dra. Hanna Isa',
      specialty: 'Especialista em ortodontia (aparelhos dentários e alinhadores).',
      quote: 'Alinhamento oclusal e funcional com técnicas modernas, discretas e confortáveis.',
      image: specialists[2].image,
      isPlaceholder: false,
    },
    {
      id: 'ismael',
      tag: 'SAÚDE BUCAL & ATENDIMENTO HUMANIZADO',
      name: 'Dr. Ismael Lima',
      specialty: 'Cirurgião-dentista com atuação em clínica geral, prevenção e atendimento humanizado. Mestrando em Saúde.',
      quote: 'Odontologia preventiva e acolhedora com comunicação voltada especialmente para quem sente receio ou ansiedade.',
      image: specialists[3].image,
      isPlaceholder: true,
    },
  ], []);

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const person = heroSlides[active];

  useEffect(() => {
    heroSlides.forEach((slide) => {
      if (!slide.isPlaceholder) {
        const img = new Image();
        img.src = slide.image;
      }
    });

    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = window.setInterval(() => {
      setActive((index) => (index + 1) % heroSlides.length);
    }, 5500);
    return () => window.clearInterval(timer);
  }, [heroSlides, paused]);

  return (
    <section
      className="v4-hero"
      id="inicio"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <div className="v4-hero__media-wrapper">
        <div key={person.id} className="v4-hero__slide is-active">
          <img
            src={person.image}
            alt={`Foto de ${person.name}`}
            className={`v4-hero__photo ${person.isPlaceholder ? 'is-placeholder-graphic' : ''}`}
          />
          <div className="v4-hero__media-shade" aria-hidden="true" />
          <div className="v4-hero__person">
            <span className="v4-hero__person-tag">{person.tag}</span>
            <strong>{person.name}</strong>
            <p>{person.specialty}</p>
          </div>
        </div>
      </div>

      <div className="v4-shell v4-hero__grid">
        <div className="v4-hero__copy" data-reveal>
          <div className="v4-hero__badge">
            <span className="v4-badge-dot" />
            Limoeiro do Norte · CE · Castelo
          </div>
          <h1>Saúde e estética, em harmonia absoluta.</h1>
          <p className="v4-hero__lead">
            Odontologia multidisciplinar com corpo clínico de 4 frentes, atendimento acolhedor e planejamento individualizado em cada detalhe.
          </p>
          <div className="v4-actions">
            <Button href={clinic.whatsapp} external>Agendar pelo WhatsApp</Button>
            <a className="v4-text-link" href="#tratamentos">Conhecer tratamentos <Arrow /></a>
          </div>
        </div>
      </div>

      <div className="v4-hero__selector" aria-label="Profissional em destaque">
        <div className="v4-shell v4-hero__selector-shell">
          <span className="v4-hero__selector-label">Corpo Clínico:</span>
          <div className="v4-hero__selector-tabs">
            {heroSlides.map((slide, index) => (
              <button
                type="button"
                key={slide.id}
                className={active === index ? 'is-active' : ''}
                onClick={() => setActive(index)}
                aria-label={`Mostrar ${slide.name}`}
              >
                <div className="v4-hero__tab-bar" aria-hidden="true">
                  <div className={`v4-hero__tab-fill ${active === index && !paused ? 'is-animating' : ''}`} />
                </div>
                <span className="v4-hero__tab-num">{String(index + 1).padStart(2, '0')}</span>
                <span className="v4-hero__tab-name">{slide.name.replace('Dra. ', '').replace('Dr. ', '')}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  const items = [
    'Atendimento humanizado e sem pressa',
    'Corpo clínico com 4 áreas integradas',
    'Ambiente moderno e biossegurança',
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
          <h2>Ambiente contemporâneo, biossegurança e atenção individual.</h2>
          <p className="v4-lead">
            A IL Odontologia e Estética foi projetada para desmistificar a experiência odontológica, transformando cada consulta em um momento de clareza, respeito e tranquilidade.
          </p>
          <div className="v4-about__pillars">
            <div className="v4-about__pillar">
              <span className="v4-pillar-num">01</span>
              <div>
                <strong>Biossegurança e Rigor</strong>
                <p>Esterilização hospitalar com rastreabilidade instrumental completa e protocolos estritos.</p>
              </div>
            </div>
            <div className="v4-about__pillar">
              <span className="v4-pillar-num">02</span>
              <div>
                <strong>Conforto e Acolhimento</strong>
                <p>Consultórios climatizados, acústica suave e iluminação pensada para acalmar a ansiedade.</p>
              </div>
            </div>
            <div className="v4-about__pillar">
              <span className="v4-pillar-num">03</span>
              <div>
                <strong>Diagnóstico Transparente</strong>
                <p>Planejamento digital claro: você compreende cada etapa e decisão antes de iniciar o tratamento.</p>
              </div>
            </div>
          </div>
          <div className="v4-about__cta-wrap">
            <Button href={clinic.whatsapp} external>Conhecer nosso espaço</Button>
          </div>
        </div>

        <figure className="v4-about__media" data-reveal>
          <img
            src={assets.hero}
            alt="Consultório moderno da IL Odontologia e Estética em Limoeiro do Norte"
            loading="lazy"
          />
          <figcaption>
            <span>IL Odontologia e Estética · Castelo</span>
            <strong>Consultórios planejados para aliar precisão técnica e acolhimento humano.</strong>
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
          <h2>Três frentes de excelência, um mesmo rigor no cuidado.</h2>
          <p>Conheça as principais especialidades da IL Odontologia com planejamento individualizado.</p>
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
              <div className="v4-care-card__top">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p className="v4-care-card__tag">{item.short}</p>
              </div>
              <h3>{item.name}</h3>
              <div className="v4-care-card__reveal">
                <p>{item.description}</p>
                <a
                  href={wa(`Olá! Gostaria de saber mais sobre ${item.name} na IL Odontologia e Estética.`)}
                  target="_blank"
                  rel="noreferrer"
                  className="v4-care-card__link"
                >
                  Agendar avaliação <Arrow />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="v4-shell v4-secondary-care" data-reveal>
        <div className="v4-secondary-care__header">
          <span className="v4-secondary-care__kicker">Outros atendimentos</span>
          <h4>Cuidado integral para a sua saúde bucal</h4>
        </div>
        <div className="v4-secondary-care__grid">
          {secondaryCare.map((item) => (
            <article key={item.name} className="v4-secondary-care__card">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <a href={wa(`Olá! Gostaria de saber mais sobre ${item.name} na IL Odontologia e Estética.`)} target="_blank" rel="noreferrer">
                Saber mais <Arrow />
              </a>
            </article>
          ))}
        </div>
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
            <h2>Transformações reais com harmonia, saúde e precisão.</h2>
          </div>
          <p>
            Registros clínicos reais conduzidos na IL Odontologia e Estética. Cada planejamento respeita a biologia e a anatomia facial, buscando harmonia natural e durabilidade.
          </p>
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
              <span className="v4-results__badge">{item.badge}</span>
            </div>
            <p className="v4-results__cat">{item.category}</p>
            <h3>{item.title}</h3>
            
            <div className="v4-results__sheet">
              <div className="v4-sheet-item">
                <span className="v4-sheet-label">Diagnóstico Clínico</span>
                <p>{item.diagnosis}</p>
              </div>
              <div className="v4-sheet-item">
                <span className="v4-sheet-label">Abordagem & Conduta</span>
                <p>{item.approach}</p>
              </div>
            </div>

            <p className="v4-results__caption">{item.caption}</p>
            <small className="v4-results__disclaimer">
              *Resultados variam conforme a avaliação clínica individual, estrutura óssea e saúde periodontal de cada paciente.
            </small>

            <div className="v4-results__action">
              <Button href={wa(`Olá! Vi o caso de ${item.title} (${item.category}) no site da IL e gostaria de agendar uma avaliação.`)} external>
                Avaliar meu caso
              </Button>
            </div>
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
              <div className="v4-results__nav-text">
                <span className="v4-results__nav-title">{caseItem.title}</span>
                <span className="v4-results__nav-cat">{caseItem.category}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Specialists() {
  const leadSpecialist = specialists[0];
  const otherSpecialists = specialists.slice(1);

  return (
    <section className="v4-section v4-specialists" id="especialistas">
      <div className="v4-shell">
        <div className="v4-section-head v4-section-head--dark" data-reveal>
          <p className="v4-kicker">Corpo Clínico Integrado</p>
          <h2>Quatro olhares especializados, uma mesma filosofia de cuidado.</h2>
          <p>Conheça a equipe multidisciplinar que conduz cada etapa do seu tratamento com rigor e proximidade.</p>
        </div>

        {/* Editorial Magazine Layout */}
        <div className="v4-specialists__editorial" data-reveal>
          {/* Dra. Layla Beatriz - Lead Specialist Feature */}
          <article className="v4-lead-specialist">
            <div className="v4-lead-specialist__media">
              <img src={leadSpecialist.image} alt={`Foto de ${leadSpecialist.name}`} loading="lazy" />
              <div className="v4-lead-specialist__media-badge">
                <span>{leadSpecialist.roleTag}</span>
              </div>
            </div>
            <div className="v4-lead-specialist__body">
              <span className="v4-specialist-num">01 · DIREÇÃO CLÍNICA</span>
              <h3>{leadSpecialist.name}</h3>
              <p className="v4-specialist-sub">{leadSpecialist.specialty}</p>
              
              <blockquote className="v4-specialist-quote">
                “Acreditamos em uma odontologia que valoriza a singularidade e a beleza natural de cada pessoa, unindo precisão estética e saúde funcional duradoura.”
              </blockquote>

              <div className="v4-specialist-highlights">
                <span>Facetas cerâmicas e lentes de contato</span>
                <span>Planejamento estético digital</span>
                <span>Clareamento dental guiado</span>
              </div>

              <div className="v4-lead-specialist__cta">
                <Button href={wa(`Olá! Gostaria de agendar uma consulta com a ${leadSpecialist.name}.`)} external>
                  Agendar com Dra. Layla
                </Button>
              </div>
            </div>
          </article>

          {/* Trio Grid: Dr. Hugo, Dra. Hanna, Dr. Ismael */}
          <div className="v4-trio-specialists">
            {otherSpecialists.map((person, idx) => (
              <article
                key={person.id}
                className={`v4-specialist-card ${person.photoPending ? 'is-photo-pending' : ''}`}
              >
                <div className="v4-specialist-card__media">
                  <img
                    src={person.image}
                    alt={`Foto de ${person.name}`}
                    loading="lazy"
                    className={person.photoPending ? 'is-placeholder-graphic' : ''}
                  />
                  <div className="v4-specialist-card__badge">
                    <span>{person.roleTag}</span>
                  </div>
                </div>

                <div className="v4-specialist-card__body">
                  <div className="v4-specialist-card__top">
                    <span className="v4-specialist-num">0{idx + 2}</span>
                    <h3>{person.name}</h3>
                  </div>

                  <p className="v4-specialist-card__spec">{person.specialty}</p>
                  <p className="v4-specialist-card__diff">{person.differential}</p>

                  <div className="v4-specialist-card__footer">
                    <a
                      href={wa(`Olá! Gostaria de agendar uma consulta e saber mais sobre o atendimento do ${person.name}.`)}
                      target="_blank"
                      rel="noreferrer"
                      className="v4-specialist-card__link"
                    >
                      <span>Agendar consulta</span>
                      <Arrow />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Mobile Horizontal Carousel */}
        <div className="v4-specialists__mobile-track" data-reveal>
          {specialists.map((person, index) => (
            <article className="v4-mobile-person" key={person.id}>
              <div className="v4-mobile-person__media">
                <img
                  src={person.image}
                  alt={`Foto de ${person.name}`}
                  loading="lazy"
                  className={person.photoPending ? 'is-placeholder-graphic' : ''}
                />
                <span className="v4-mobile-person__tag">{person.roleTag}</span>
              </div>
              <div className="v4-mobile-person__body">
                <span className="v4-specialist-num">0{index + 1}</span>
                <h3>{person.name}</h3>
                <p className="v4-mobile-person__spec">{person.specialty}</p>
                <p className="v4-mobile-person__diff">{person.differential}</p>
                <a
                  href={wa(`Olá! Gostaria de agendar uma consulta com ${person.name}.`)}
                  target="_blank"
                  rel="noreferrer"
                  className="v4-mobile-person__cta"
                >
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
    ['01 · Escuta Atenta', 'Compreendemos suas expectativas, histórico de saúde e eventuais receios antes de qualquer intervenção.'],
    ['02 · Planejamento Claro', 'Explicamos cada etapa, opções de materiais e prazos de forma transparente, didática e sem termos complicados.'],
    ['03 · Conforto e Biossegurança', 'Atendimento com isolamento acústico, anestesia precisa e rigor hospitalar de esterilização.'],
    ['04 · Acompanhamento Contínuo', 'Suporte pós-procedimento próximo e monitoramento preventivo para preservar seu sorriso saudável a longo prazo.'],
  ];

  return (
    <section className="v4-section v4-experience" id="experiencia">
      <div className="v4-shell v4-experience__grid">
        <div className="v4-experience__copy" data-reveal>
          <p className="v4-kicker">Experiência do paciente</p>
          <h2>Sentir-se bem cuidado faz parte de todo o processo.</h2>
          <p className="v4-lead">
            Nossa clínica foi planejada para que a sua visita seja leve, segura e acolhedora — da recepção ao acompanhamento contínuo.
          </p>
        </div>

        <figure className="v4-experience__media" data-reveal>
          <img src={assets.hero} alt="Consultório da IL Odontologia e Estética" loading="lazy" />
        </figure>

        <div className="v4-experience__items" data-reveal>
          {items.map(([title, copy]) => (
            <div key={title} className="v4-experience__item">
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
          <h2>A experiência contada por quem viveu nosso atendimento.</h2>
        </div>

        <blockquote data-reveal key={item.name}>
          <span className="v4-quote">“</span>
          <p>{item.quote}</p>
          <footer>
            <div>
              <strong>{item.name}</strong>
              <span className="v4-testimonial-tag">{item.tag}</span>
            </div>
            <div className="v4-testimonial-arrows">
              <button type="button" onClick={prev} aria-label="Depoimento anterior">←</button>
              <button type="button" onClick={next} aria-label="Próximo depoimento">→</button>
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
          <h2>Atendimento particular e planos credenciados.</h2>
          <div className="v4-agreements">
            {agreements.map((item) => (
              <div key={item.name}>
                <strong>{item.name}</strong>
                <span className={item.status === 'Atendimento confirmado' ? 'is-confirmed' : ''}>{item.status}</span>
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
          <h2>Pronto para cuidar do seu sorriso com nossa equipe?</h2>
          <p className="v4-lead">Fale com a recepção da IL Odontologia e Estética e reserve seu horário.</p>
          
          <div className="v4-actions">
            <Button href={clinic.whatsapp} external>Agendar pelo WhatsApp</Button>
            <Button href={clinic.routeUrl} outline external>Abrir rota no Maps</Button>
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
              <span>Ponto de Referência</span>
              <p>{clinic.landmark}</p>
            </div>
            <div className="v4-contact__hours-col">
              <span>Horário de Funcionamento</span>
              <p>
                Segunda a Quinta: 08h às 12h · 13h às 20h<br />
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
          <img src={assets.logo} alt="IL Odontologia e Estética" className="v4-footer__logo" />
          <p>Seu sorriso em harmonia. Odontologia multidisciplinar, estética refinada e atendimento acolhedor em Limoeiro do Norte - CE.</p>
        </div>
        <div>
          <span>Navegação</span>
          <a href="#inicio">Início</a>
          <a href="#clinica">A clínica</a>
          <a href="#tratamentos">Tratamentos</a>
          <a href="#resultados">Antes & Depois</a>
          <a href="#especialistas">Corpo Clínico</a>
          <a href="#contato">Contato</a>
        </div>
        <div>
          <span>Atendimento</span>
          <a href={clinic.whatsapp} target="_blank" rel="noreferrer">WhatsApp: {clinic.phoneDisplay}</a>
          <a href={`tel:+${clinic.phoneRaw}`}>Telefone: {clinic.phoneDisplay}</a>
          <a href={`mailto:${clinic.email}`}>{clinic.email}</a>
          <a href={clinic.routeUrl} target="_blank" rel="noreferrer">Como chegar (Google Maps)</a>
        </div>
      </div>
      <div className="v4-shell v4-footer__bottom">
        <span>© {new Date().getFullYear()} IL Odontologia e Estética · Todos os direitos reservados</span>
        <span>Limoeiro do Norte · Ceará</span>
      </div>
    </footer>
  );
}

function MobileDock() {
  return (
    <div className="v4-mobile-dock">
      <a href={clinic.whatsapp} target="_blank" rel="noreferrer" className="v4-dock-btn is-primary">
        <span>Agendar consulta</span>
      </a>
      <a href={clinic.routeUrl} target="_blank" rel="noreferrer" className="v4-dock-btn is-secondary">
        <span>Como chegar</span>
      </a>
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
