import { useEffect, useMemo, useRef, useState } from 'react';
import { assets, clinic, specialists, testimonials } from './data/siteData';
import transformacao02 from './assets/cases/transformacao02.jpg';
import transformacao03 from './assets/cases/transformacao03.jpg';
import { initV4Motion } from './v4-motion';

const primaryCare = [
  {
    name: 'Odontologia estética',
    short: 'Harmonização & Lentes',
    description: 'Avaliação e planejamento para cuidar da estética do sorriso com facetas, lentes e clareamento.',
    image: assets.gallery[0],
  },
  {
    name: 'Implante dentário',
    short: 'Função & Estabilidade',
    description: 'Avaliação de possibilidades de reabilitação com implantes e próteses, considerando a saúde e as necessidades de cada paciente.',
    image: assets.hero,
  },
  {
    name: 'Ortodontia & Alinhadores',
    short: 'Alinhamento & Oclusão',
    description: 'Avaliação do alinhamento dos dentes e da mordida, com planejamento de aparelhos e alinhadores conforme cada caso.',
    image: assets.gallery[2],
  },
];

const secondaryCare = [
  {
    name: 'Limpeza dental',
    description: 'Limpeza profissional e acompanhamento preventivo para cuidar dos dentes e da gengiva.',
  },
  {
    name: 'Tratamento de canal',
    description: 'Tratamento biológico e preciso para preservar o dente natural, controlar desconfortos e evitar complicações futuras.',
  },
  {
    name: 'Odontopediatria',
    description: 'Cuidado preventivo e afetuoso desde a infância, criando uma relação positiva, tranquila e sem medo com o consultório.',
  },
  {
    name: 'Extração dentária',
    description: 'Avaliação e planejamento individualizado quando a remoção de um dente é necessária.',
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
  { id: 'caso-01', title: 'Transformação 01', image: transformacao02 },
  { id: 'caso-02', title: 'Transformação 02', image: assets.gallery[0] },
  { id: 'caso-03', title: 'Transformação 03', image: transformacao03 },
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

      <div className={`v4-menu ${open ? 'is-open' : ''}`} inert={!open} onKeyDown={event => { if (event.key === 'Escape') setOpen(false); }}>
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
  const heroSlides = useMemo(() => specialists.map(person => ({
    ...person, tag: person.roleTag, isPlaceholder: false,
  })), []);

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [manualPause, setManualPause] = useState(false);
  const person = heroSlides[active];

  useEffect(() => {
    heroSlides.forEach((slide) => {
      if (!slide.isPlaceholder) {
        const img = new Image();
        img.src = slide.image;
      }
    });

    if (paused || manualPause || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = window.setInterval(() => {
      setActive((index) => (index + 1) % heroSlides.length);
    }, 5500);
    return () => window.clearInterval(timer);
  }, [heroSlides, paused, manualPause]);

  return (
    <section
      className="v4-hero"
      id="inicio"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }}
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
            Quatro profissionais, um cuidado integrado. Atendimento acolhedor e planejamento individualizado em cada detalhe.
          </p>
          <div className="v4-actions">
            <Button href={clinic.whatsapp} external>Agendar pelo WhatsApp</Button>
            <a className="v4-text-link" href="#tratamentos">Conhecer tratamentos <Arrow /></a>
          </div>
        </div>
      </div>

      <div className="v4-hero__selector" aria-label="Profissional em destaque">
        <div className="v4-shell v4-hero__selector-shell">
          <span className="v4-hero__selector-label">Nossa equipe</span>
          <button className="v5-rotation-toggle" type="button" onClick={() => setManualPause(value => !value)} aria-label={manualPause ? 'Retomar apresentação da equipe' : 'Pausar apresentação da equipe'}>{manualPause ? 'Reproduzir' : 'Pausar'}</button>
          <div className="v4-hero__selector-tabs">
            {heroSlides.map((slide, index) => (
              <button
                type="button"
                key={slide.id}
                className={active === index ? 'is-active' : ''}
                onClick={() => { setActive(index); setManualPause(true); }}
                aria-pressed={active === index}
                aria-label={`Mostrar ${slide.name}`}
              >
                <div className="v4-hero__tab-bar" aria-hidden="true">
                  <div className={`v4-hero__tab-fill ${active === index && !paused && !manualPause ? 'is-animating' : ''}`} />
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
                <p>Atenção à higiene e aos cuidados com o ambiente de atendimento.</p>
              </div>
            </div>
            <div className="v4-about__pillar">
              <span className="v4-pillar-num">02</span>
              <div>
                <strong>Conforto e Acolhimento</strong>
                <p>Um espaço acolhedor para conversar sobre suas necessidades e receios.</p>
              </div>
            </div>
            <div className="v4-about__pillar">
              <span className="v4-pillar-num">03</span>
              <div>
                <strong>Diagnóstico Transparente</strong>
                <p>Converse com a equipe sobre as opções de cuidado antes de iniciar o tratamento.</p>
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
  return (
    <section className="v4-section v4-care" id="tratamentos">
      <div className="v4-shell">
        <div className="v4-section-head" data-reveal>
          <p className="v4-kicker">Tratamentos</p>
          <h2>Seu sorriso, cuidado em cada detalhe.</h2>
          <p>Conheça as áreas de atendimento e converse com a equipe sobre o seu caso.</p>
        </div>
        <div className="v5-care-grid">
          {primaryCare.map((item, index) => (
            <article className="v5-care-card" key={item.name} data-reveal>
              <div className="v5-care-media"><img src={item.image} alt="" loading="lazy" /></div>
              <div className="v5-care-body">
                <span className="v5-index">0{index + 1} / {item.short}</span>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <a href={wa(`Olá! Gostaria de saber mais sobre ${item.name}.`)} target="_blank" rel="noreferrer">Agendar avaliação <Arrow /></a>
              </div>
            </article>
          ))}
        </div>
        <div className="v5-other-care">
          <div data-reveal><p className="v4-kicker">Outros atendimentos</p><h3>Do cuidado de rotina<br />à atenção que você precisa.</h3><p>Saúde bucal em todas as fases da vida.</p></div>
          <div className="v5-care-list">
            {secondaryCare.map((item, index) => (
              <details key={item.name} data-reveal>
                <summary><span className="v5-index">0{index + 4}</span><h4>{item.name}</h4><span className="v5-plus" aria-hidden="true">+</span></summary>
                <div className="v5-care-answer"><p>{item.description}</p><a href={wa(`Olá! Gostaria de saber mais sobre ${item.name}.`)} target="_blank" rel="noreferrer">Conversar com a equipe <Arrow /></a></div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BeforeAfter() {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const touch = useRef(null);
  const dialog = useRef(null);
  const item = beforeAfter[active];
  const move = (direction) => setActive(index => (index + direction + beforeAfter.length) % beforeAfter.length);
  useEffect(() => {
    if (expanded) dialog.current?.showModal();
    else dialog.current?.close();
  }, [expanded]);
  return (
    <section className="v4-section v4-results" id="resultados">
      <div className="v4-shell">
        <div className="v4-results__head" data-reveal>
          <div><p className="v4-kicker v4-kicker--dark">Antes & Depois</p><h2>Pequenos detalhes.<br />Novas formas de sorrir.</h2></div>
          <p>Explore os registros de antes e depois. Cada sorriso tem uma história e precisa de uma avaliação individual.</p>
        </div>
        <div className="v5-case-stage" data-reveal>
          <div className="v5-case-media" onTouchStart={event => { const point = event.touches[0]; touch.current = { x: point.clientX, y: point.clientY }; }} onTouchEnd={event => {
            const point = event.changedTouches[0]; const start = touch.current;
            if (start && Math.abs(point.clientX - start.x) > 60 && Math.abs(point.clientX - start.x) > Math.abs(point.clientY - start.y)) move(point.clientX < start.x ? 1 : -1);
            touch.current = null;
          }}>
            <button type="button" className="v5-case-zoom" onClick={() => setExpanded(true)} aria-label={`Ampliar ${item.title}`}>
              <img key={item.id} src={item.image} alt={`${item.title}: registro de antes e depois`} />
              <span>Ampliar imagem ↗</span>
            </button>
          </div>
          <div className="v5-case-copy">
            <p className="v4-kicker v4-kicker--dark">Um olhar para a transformação</p>
            <div aria-live="polite" aria-atomic="true"><span className="v5-case-number">0{active + 1}<small> / 0{beforeAfter.length}</small></span><h3>{item.title}</h3><p>Veja os detalhes do registro original e converse com a equipe sobre as possibilidades para o seu sorriso.</p></div>
            <p className="v5-case-note">Os resultados são individuais. As imagens não representam uma promessa de resultado.</p>
            <Button href={wa(`Olá! Vi a ${item.title} no site e gostaria de agendar uma avaliação.`)} external>Avaliar meu caso</Button>
            <div className="v5-case-controls"><button type="button" onClick={() => move(-1)} aria-label="Transformação anterior">←</button><span>Explore os casos</span><button type="button" onClick={() => move(1)} aria-label="Próxima transformação">→</button></div>
          </div>
        </div>
        <div className="v5-case-nav" aria-label="Selecionar transformação">
          {beforeAfter.map((entry, index) => <button key={entry.id} type="button" className={index === active ? 'is-active' : ''} aria-pressed={index === active} onClick={() => setActive(index)}><img src={entry.image} alt="" loading="lazy" /><span><small>0{index + 1}</small>{entry.title}</span><Arrow /></button>)}
        </div>
        <dialog className="v5-case-dialog" ref={dialog} onCancel={() => setExpanded(false)} onClose={() => setExpanded(false)} onClick={event => { if (event.target === event.currentTarget) setExpanded(false); }} aria-label={`${item.title} ampliada`}>
          <button type="button" autoFocus onClick={() => setExpanded(false)} aria-label="Fechar imagem ampliada">Fechar ×</button><img src={item.image} alt={`${item.title}: registro original de antes e depois`} />
        </dialog>
      </div>
    </section>
  );
}

function Specialists() {
  const track = useRef(null);
  const [active, setActive] = useState(0);
  function select(index) {
    const element = track.current?.children[index];
    if (!element) return;
    track.current.scrollTo({left: element.offsetLeft - track.current.firstElementChild.offsetLeft, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
  }
  return (
    <section className="v4-section v4-specialists" id="especialistas">
      <div className="v4-shell">
        <div className="v4-section-head v4-section-head--dark" data-reveal><p className="v4-kicker">Corpo clínico</p><h2>Quatro profissionais.<br />O mesmo compromisso com você.</h2><p>Conheça quem cuida do seu sorriso.</p></div>
        <div className="v5-team-grid" ref={track} onScroll={() => {
          const items = [...track.current.children]; const left = track.current.scrollLeft;
          setActive(items.reduce((best, el, index) => Math.abs(el.offsetLeft - items[0].offsetLeft - left) < Math.abs(items[best].offsetLeft - items[0].offsetLeft - left) ? index : best, 0));
        }}>
          {specialists.map((person, index) => (
            <article className="v5-person" key={person.id}>
              <div className="v5-person-media"><img src={person.image} alt={person.name} loading="lazy" /><span>0{index + 1}</span></div>
              <div className="v5-person-body"><p className="v5-index">{person.roleTag}</p><h3>{person.name}</h3><p className="v5-person-spec">{person.specialty}</p><p>{person.differential}</p><a className="v5-person-cta" href={wa(`Olá! Gostaria de agendar uma consulta com ${person.name}.`)} target="_blank" rel="noreferrer">Agendar consulta <Arrow /></a><div className="v5-person-social">{person.instagram && <a href={person.instagram} target="_blank" rel="noreferrer">Perfil profissional ↗</a>}</div></div>
            </article>
          ))}
        </div>
        <div className="v5-team-nav" aria-label="Navegar pela equipe">{specialists.map((person, index) => <button type="button" key={person.id} onClick={() => select(index)} aria-label={`Ver ${person.name}`} aria-pressed={active === index}>0{index + 1}</button>)}<span>Deslize para conhecer →</span></div>
      </div>
    </section>
  );
}

function Experience() {
  const items = [
    ['01 · Escuta Atenta', 'Compreendemos suas expectativas, histórico de saúde e eventuais receios antes de qualquer intervenção.'],
    ['02 · Planejamento Claro', 'Explicamos cada etapa, opções de materiais e prazos de forma transparente, didática e sem termos complicados.'],
    ['03 · Conforto e Biossegurança', 'Cuidado com o ambiente e atenção ao seu conforto durante o atendimento.'],
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

        <blockquote data-reveal>
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
  useEffect(() => initV4Motion(), []);

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
