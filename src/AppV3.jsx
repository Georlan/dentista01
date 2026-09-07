import { useEffect, useMemo, useState } from 'react';
import { assets, clinic, specialists, testimonials } from './data/siteData';

const safeTreatments = [
  {
    name: 'Odontologia estética',
    description: 'Planejamento estético individualizado, sempre em equilíbrio com a saúde bucal e a naturalidade do sorriso.',
  },
  {
    name: 'Implante dentário',
    description: 'Reabilitação planejada para recuperar função, estabilidade e segurança ao sorrir e mastigar.',
  },
  {
    name: 'Limpeza dental',
    description: 'Prevenção e manutenção da saúde bucal com acompanhamento profissional cuidadoso e individualizado.',
  },
  {
    name: 'Tratamento de canal',
    description: 'Tratamento para preservar a estrutura dental, controlar desconfortos e evitar complicações futuras.',
  },
  {
    name: 'Odontopediatria',
    description: 'Cuidado odontológico para crianças com acolhimento, linguagem adequada e foco em prevenção desde cedo.',
  },
  {
    name: 'Extração dentária',
    description: 'Conduta cuidadosa e planejamento individualizado para situações em que a remoção do dente é necessária.',
  },
];

const agreements = ['Bradesco Dental', 'Brasil Dental', 'Odontoprev'];

const trust = [
  'Atendimento personalizado',
  'Profissionais especializados',
  'Ambiente confortável',
  'Saúde e estética integradas',
];

const faq = [
  {
    q: 'Como faço para agendar uma consulta?',
    a: 'Você pode iniciar o agendamento pelo WhatsApp e combinar o melhor horário diretamente com a recepção da clínica.',
  },
  {
    q: 'Quais tratamentos a clínica oferece?',
    a: safeTreatments.map((item) => item.name).join(', ') + '.',
  },
  {
    q: 'Quais convênios são atendidos?',
    a: 'A clínica atende Bradesco Dental, Brasil Dental e Odontoprev.',
  },
  {
    q: 'Onde fica a IL Odontologia e Estética?',
    a: 'Rua Cândido Olímpio, 1920, Centro, Limoeiro do Norte - CE, próximo ao Instituto dos Olhos.',
  },
];

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="v3-icon">
      <path d="M5 12h13M14 7l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MenuIcon({ open }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="v3-icon">
      {open ? (
        <path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      ) : (
        <path d="M4 8h16M4 16h16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      )}
    </svg>
  );
}

function wa(message) {
  return `https://wa.me/${clinic.phoneRaw}?text=${encodeURIComponent(message)}`;
}

function Button({ href, children, secondary = false, external = false }) {
  return (
    <a
      className={`v3-button ${secondary ? 'is-secondary' : ''}`}
      href={href}
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

  useEffect(() => {
    document.body.classList.toggle('v3-menu-open', open);
    return () => document.body.classList.remove('v3-menu-open');
  }, [open]);

  const nav = [
    ['A clínica', '#clinica'],
    ['Tratamentos', '#tratamentos'],
    ['Especialistas', '#especialistas'],
    ['Experiência', '#experiencia'],
    ['Contato', '#contato'],
  ];

  return (
    <header className="v3-header">
      <div className="v3-shell v3-header__inner">
        <a className="v3-brand" href="#inicio" aria-label="IL Odontologia e Estética — início">
          <img src={assets.logo} alt="IL Odontologia e Estética" />
        </a>

        <nav className="v3-nav" aria-label="Navegação principal">
          {nav.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </nav>

        <a className="v3-header__cta" href={clinic.whatsapp} target="_blank" rel="noreferrer">
          Agendar consulta <Arrow />
        </a>

        <button
          className="v3-menu-button"
          type="button"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <MenuIcon open={open} />
        </button>
      </div>

      <div className={`v3-menu ${open ? 'is-open' : ''}`}>
        <div className="v3-shell">
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
  const [active, setActive] = useState(0);
  const person = specialists[active];

  useEffect(() => {
    specialists.forEach((specialist) => {
      const image = new Image();
      image.src = specialist.image;
    });

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || specialists.length < 2) return undefined;

    const timer = window.setInterval(() => {
      setActive((index) => (index + 1) % specialists.length);
    }, 2800);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="v3-hero" id="inicio">
      <div className="v3-hero__media" aria-label="Equipe da IL Odontologia e Estética">
        <img key={person.image} src={person.image} alt={`Foto de ${person.name}`} className="v3-hero__photo" />
        <div className="v3-hero__person">
          <span>Corpo clínico</span>
          <strong>{person.name}</strong>
          <p>{person.specialty}</p>
        </div>
        <div className="v3-hero__selector" aria-label="Profissional em destaque">
          {specialists.map((specialist, index) => (
            <button
              type="button"
              key={specialist.name}
              className={active === index ? 'is-active' : ''}
              onClick={() => setActive(index)}
            >
              <span>0{index + 1}</span>
              {specialist.name.replace('Dra. ', '').replace('Dr. ', '')}
            </button>
          ))}
        </div>
      </div>

      <div className="v3-shell v3-hero__inner">
        <div className="v3-hero__copy">
          <p className="v3-kicker">Limoeiro do Norte — CE · Odontologia & Estética</p>
          <h1>Cuidado que valoriza o seu sorriso.</h1>
          <p className="v3-hero__lead">Saúde, estética e atendimento humano em uma experiência pensada para transmitir clareza, conforto e confiança.</p>
          <div className="v3-actions">
            <Button href={clinic.whatsapp} external>Agendar consulta</Button>
            <a className="v3-link" href="#tratamentos">Conhecer tratamentos <Arrow /></a>
          </div>
        </div>
      </div>

      <div className="v3-trust">
        <div className="v3-shell v3-trust__inner">
          {trust.map((item) => <span key={item}>{item}</span>)}
        </div>
      </div>
    </section>
  );
}

function SectionIntro({ eyebrow, title, copy }) {
  return (
    <div className="v3-section-intro" data-reveal>
      <p className="v3-kicker v3-kicker--dark">{eyebrow}</p>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  );
}

function About() {
  return (
    <section className="v3-section v3-about" id="clinica">
      <div className="v3-shell v3-about__grid">
        <div className="v3-about__copy" data-reveal>
          <p className="v3-kicker v3-kicker--dark">A clínica</p>
          <h2>Uma experiência mais próxima, do primeiro contato ao acompanhamento.</h2>
          <p className="v3-lead">A IL Odontologia e Estética combina saúde bucal, estética e atendimento humanizado com honestidade, respeito e atenção individual.</p>
          <p>Cada paciente é recebido de forma única. A proposta é ouvir, orientar e construir um plano de tratamento claro, personalizado e coerente com cada necessidade.</p>
          <a className="v3-link v3-link--dark" href="#experiencia">Conhecer a experiência <Arrow /></a>
        </div>

        <figure className="v3-about__media" data-reveal>
          <img src={assets.about} alt="Dra. Layla Beatriz, da IL Odontologia e Estética" loading="lazy" />
          <figcaption>
            <span>IL Odontologia e Estética</span>
            <strong>Cuidado humano, saúde e estética em equilíbrio.</strong>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function Treatments() {
  const [active, setActive] = useState(0);

  return (
    <section className="v3-section v3-treatments" id="tratamentos">
      <div className="v3-shell">
        <SectionIntro
          eyebrow="Tratamentos"
          title="Informação clara para escolher o cuidado certo."
          copy="Conheça os principais tratamentos oferecidos pela clínica e fale com a equipe já com o seu interesse identificado."
        />

        <div className="v3-treatments__desktop" data-reveal>
          <div className="v3-treatment-list" role="tablist" aria-label="Tratamentos">
            {safeTreatments.map((item, index) => (
              <button
                type="button"
                role="tab"
                aria-selected={active === index}
                className={active === index ? 'is-active' : ''}
                onClick={() => setActive(index)}
                key={item.name}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{item.name}</strong>
                <Arrow />
              </button>
            ))}
          </div>

          <article className="v3-treatment-detail" role="tabpanel" key={safeTreatments[active].name}>
            <p className="v3-kicker v3-kicker--dark">Tratamento selecionado</p>
            <h3>{safeTreatments[active].name}</h3>
            <p>{safeTreatments[active].description}</p>
            <Button href={wa(`Olá! Gostaria de saber mais sobre ${safeTreatments[active].name} na IL Odontologia e Estética.`)} external>
              Quero saber mais
            </Button>
          </article>
        </div>

        <div className="v3-treatments__mobile" data-reveal>
          {safeTreatments.map((item, index) => {
            const opened = active === index;
            return (
              <article className={`v3-accordion-treatment ${opened ? 'is-open' : ''}`} key={item.name}>
                <button type="button" onClick={() => setActive(index)} aria-expanded={opened}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{item.name}</strong>
                  <b>{opened ? '−' : '+'}</b>
                </button>
                <div className="v3-accordion-treatment__body">
                  <div>
                    <p>{item.description}</p>
                    <Button href={wa(`Olá! Gostaria de saber mais sobre ${item.name} na IL Odontologia e Estética.`)} external>
                      Falar sobre este tratamento
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Specialists() {
  return (
    <section className="v3-section v3-specialists" id="especialistas">
      <div className="v3-shell">
        <SectionIntro
          eyebrow="Corpo clínico"
          title="Profissionais que unem técnica, proximidade e cuidado."
          copy="Conheça quem estará ao seu lado durante cada etapa do tratamento."
        />

        <div className="v3-specialists__track" data-reveal>
          {specialists.map((person) => (
            <article className="v3-person" key={person.name}>
              <div className="v3-person__media">
                <img src={person.image} alt={`Foto de ${person.name}`} loading="lazy" />
              </div>
              <div className="v3-person__body">
                <h3>{person.name}</h3>
                <p>{person.specialty}</p>
                <a className="v3-link v3-link--dark" href={wa(`Olá! Gostaria de agendar uma consulta e saber mais sobre o atendimento de ${person.name}.`)} target="_blank" rel="noreferrer">
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
    <section className="v3-section v3-experience" id="experiencia">
      <div className="v3-shell v3-experience__grid">
        <div className="v3-experience__copy" data-reveal>
          <p className="v3-kicker">Experiência do paciente</p>
          <h2>Sentir-se bem cuidado também faz parte do tratamento.</h2>
          <p>A experiência dentro da clínica foi pensada para ser simples, próxima e organizada — da conversa inicial ao acompanhamento profissional.</p>
        </div>

        <figure className="v3-experience__media" data-reveal>
          <img src={assets.hero} alt="Ambiente da IL Odontologia e Estética" loading="lazy" />
        </figure>

        <div className="v3-experience__items" data-reveal>
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
    <section className="v3-section v3-testimonials">
      <div className="v3-shell v3-testimonials__grid">
        <div data-reveal>
          <p className="v3-kicker v3-kicker--dark">Depoimentos</p>
          <h2>Confiança construída no atendimento.</h2>
        </div>
        <blockquote data-reveal key={item.name}>
          <span className="v3-quote">“</span>
          <p>{item.quote}</p>
          <footer>
            <strong>{item.name}</strong>
            <div className="v3-testimonials__controls">
              <button type="button" onClick={prev} aria-label="Depoimento anterior">← Anterior</button>
              <button type="button" onClick={next} aria-label="Próximo depoimento">Próximo →</button>
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
    <section className="v3-section v3-info">
      <div className="v3-shell v3-info__grid">
        <div data-reveal>
          <p className="v3-kicker v3-kicker--dark">Convênios</p>
          <h2>Atendimento também por convênio.</h2>
          <div className="v3-agreements">
            {agreements.map((name) => (
              <div key={name}>
                <strong>{name}</strong>
                <span>Atendimento confirmado</span>
              </div>
            ))}
          </div>
        </div>

        <div data-reveal>
          <p className="v3-kicker v3-kicker--dark">Perguntas frequentes</p>
          <div className="v3-faq">
            {faq.map((item, index) => {
              const opened = open === index;
              return (
                <article className={opened ? 'is-open' : ''} key={item.q}>
                  <button type="button" onClick={() => setOpen(opened ? -1 : index)} aria-expanded={opened}>
                    <strong>{item.q}</strong>
                    <span>{opened ? '−' : '+'}</span>
                  </button>
                  <div className="v3-faq__answer"><p>{item.a}</p></div>
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
    <section className="v3-contact" id="contato">
      <div className="v3-shell v3-contact__grid">
        <div className="v3-contact__copy" data-reveal>
          <p className="v3-kicker">Contato</p>
          <h2>Pronto para cuidar do seu sorriso?</h2>
          <p>Fale com a equipe da IL Odontologia e Estética e agende sua consulta.</p>
          <div className="v3-actions">
            <Button href={clinic.whatsapp} external>Agendar pelo WhatsApp</Button>
            <Button href={clinic.routeUrl} secondary external>Abrir rota</Button>
          </div>
          <div className="v3-contact__facts">
            <div>
              <span>Telefone</span>
              <a href={`tel:+${clinic.phoneRaw}`}>{clinic.phoneDisplay}</a>
            </div>
            <div>
              <span>Endereço</span>
              <p>Rua Cândido Olímpio, 1920<br />Centro · Limoeiro do Norte - CE</p>
            </div>
            <div>
              <span>Referência</span>
              <p>Próximo ao Instituto dos Olhos</p>
            </div>
          </div>
        </div>

        <div className="v3-map" data-reveal>
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
    <footer className="v3-footer">
      <div className="v3-shell v3-footer__grid">
        <div>
          <img src={assets.logo} alt="IL Odontologia e Estética" />
          <p>Odontologia, estética e cuidado humano em Limoeiro do Norte - CE.</p>
        </div>
        <div>
          <span>Navegação</span>
          <a href="#clinica">A clínica</a>
          <a href="#tratamentos">Tratamentos</a>
          <a href="#especialistas">Especialistas</a>
          <a href="#contato">Contato</a>
        </div>
        <div>
          <span>Contato</span>
          <a href={clinic.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
          <a href={`tel:+${clinic.phoneRaw}`}>{clinic.phoneDisplay}</a>
          <a href={clinic.routeUrl} target="_blank" rel="noreferrer">Como chegar</a>
        </div>
      </div>
      <div className="v3-shell v3-footer__bottom">
        <span>© {new Date().getFullYear()} IL Odontologia e Estética</span>
        <span>Limoeiro do Norte · CE</span>
      </div>
    </footer>
  );
}

function MobileDock() {
  return (
    <div className="v3-mobile-dock">
      <a href={clinic.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
      <a href={clinic.routeUrl} target="_blank" rel="noreferrer">Como chegar</a>
    </div>
  );
}

export default function AppV3() {
  useReveal();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Treatments />
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
