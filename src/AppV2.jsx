import { useEffect, useMemo, useState } from 'react';
import {
  agreements,
  assets,
  beforeAfterCases,
  clinic,
  specialists,
  testimonials,
  treatments,
  trustItems,
} from './data/siteData';

const navItems = [
  ['A clínica', '#clinica'],
  ['Tratamentos', '#tratamentos'],
  ['Especialistas', '#especialistas'],
  ['Antes & Depois', '#resultados'],
  ['Experiência', '#experiencia'],
  ['Contato', '#contato'],
];

const treatmentOrder = [
  'Odontologia estética',
  'Implante dentário',
  'Ortodontia & Alinhadores',
  'Limpeza dental',
  'Tratamento de canal',
  'Odontopediatria',
  'Extração dentária',
];

const orderedTreatments = treatmentOrder
  .map((name) => treatments.find((item) => item.name === name))
  .filter(Boolean);

const faqs = [
  {
    question: 'Como faço para agendar uma consulta?',
    answer: 'Você pode iniciar o agendamento diretamente pelo WhatsApp da IL Odontologia e Estética e combinar o melhor horário com a nossa recepção.',
  },
  {
    question: 'Quais tratamentos a clínica oferece?',
    answer: orderedTreatments.map((item) => item.name).join(', ') + '.',
  },
  {
    question: 'Quais convênios são aceitos?',
    answer: 'Atendemos Bradesco Dental, Brasil Dental e Odontoprev. Para MetLife e outros planos, emitimos documentação completa para reembolso.',
  },
  {
    question: 'Onde fica a clínica e tem estacionamento?',
    answer: `${clinic.address} (${clinic.landmark}). Há vagas e facilidade de estacionamento em frente ao consultório.`,
  },
];

function whatsappFor(message) {
  return `https://wa.me/${clinic.phoneRaw}?text=${encodeURIComponent(message)}`;
}

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="v2-icon">
      <path d="M5 12h13M14 7l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MenuIcon({ open = false }) {
  return open ? (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="v2-icon">
      <path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="v2-icon">
      <path d="M4 8h16M4 16h16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function Brand({ light = false }) {
  return (
    <a href="#inicio" className={`v2-brand ${light ? 'is-light' : ''}`} aria-label="IL Odontologia e Estética — início">
      <img src={assets.logo} alt="IL Odontologia e Estética" />
    </a>
  );
}

function Button({ href, children, light = false, external = false, className = '' }) {
  return (
    <a className={`v2-button ${light ? 'is-light' : ''} ${className}`} href={href} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
      <span>{children}</span>
      <Arrow />
    </a>
  );
}

function SectionEyebrow({ index, children, light = false }) {
  return (
    <p className={`v2-eyebrow ${light ? 'is-light' : ''}`}>
      <span>{index}</span>
      {children}
    </p>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('v2-nav-open', open);
    return () => document.body.classList.remove('v2-nav-open');
  }, [open]);

  const solid = scrolled || open;

  return (
    <header className={`v2-header ${solid ? 'is-solid' : ''}`}>
      <div className="v2-shell v2-header__inner">
        <Brand light={!solid} />
        <nav className="v2-desktop-nav" aria-label="Navegação principal">
          {navItems.map(([label, href]) => (
            <a href={href} key={href}>{label}</a>
          ))}
        </nav>
        <a className="v2-header-cta" href={clinic.whatsapp} target="_blank" rel="noreferrer">
          Agendar consulta <Arrow />
        </a>
        <button
          type="button"
          className="v2-menu-button"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <MenuIcon open={open} />
        </button>
      </div>
      <div className={`v2-mobile-menu ${open ? 'is-open' : ''}`}>
        <div className="v2-shell">
          <nav aria-label="Navegação mobile">
            {navItems.map(([label, href], index) => (
              <a href={href} key={href} onClick={() => setOpen(false)}>
                <span>0{index + 1}</span>
                {label}
              </a>
            ))}
          </nav>
          <div className="v2-mobile-menu__footer">
            <a href={`tel:+${clinic.phoneRaw}`}>{clinic.phoneDisplay}</a>
            <Button href={clinic.whatsapp} light external>Agendar pelo WhatsApp</Button>
          </div>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const [activeSpecialist, setActiveSpecialist] = useState(0);
  const [rotationPaused, setRotationPaused] = useState(false);
  const person = specialists[activeSpecialist];

  useEffect(() => {
    specialists.slice(1).forEach((specialist) => {
      const image = new Image();
      image.src = specialist.image;
    });
  }, []);

  useEffect(() => {
    if (rotationPaused || specialists.length < 2) return undefined;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return undefined;

    const timer = window.setInterval(() => {
      setActiveSpecialist((current) => (current + 1) % specialists.length);
    }, 5600);

    return () => window.clearInterval(timer);
  }, [rotationPaused]);

  const selectSpecialist = (index) => {
    setActiveSpecialist(index);
    setRotationPaused(true);
  };

  return (
    <section className="v2-hero" id="inicio">
      <div className="v2-shell v2-hero__grid">
        <div className="v2-hero__copy">
          <p className="v2-kicker">Limoeiro do Norte — CE · Odontologia & Estética</p>
          <h1>Cuidado que valoriza o seu sorriso.</h1>
          <p className="v2-hero__lead">
            Saúde, estética e atendimento humanizado em uma experiência pensada para oferecer clareza, conforto e naturalidade em cada etapa.
          </p>
          <div className="v2-hero__actions">
            <Button href={clinic.whatsapp} light external>Agendar consulta</Button>
            <a className="v2-text-link v2-text-link--light" href="#tratamentos">
              Conhecer tratamentos <Arrow />
            </a>
          </div>
          <div className="v2-hero__meta">
            <div>
              <span>Atendimento</span>
              <strong>Personalizado & Seguro</strong>
            </div>
            <div>
              <span>Localização</span>
              <strong>Centro · Limoeiro do Norte</strong>
            </div>
          </div>
        </div>
        <div className="v2-hero__portrait" aria-label="Profissionais da IL Odontologia e Estética">
          <img
            key={person.image}
            className="v2-hero__portrait-image"
            src={person.image}
            alt={`Foto de ${person.name}`}
            fetchPriority={activeSpecialist === 0 ? 'high' : 'auto'}
          />

          <div className="v2-hero__portrait-controls" aria-label="Escolher profissional em destaque">
            <div className="v2-hero__portrait-selector">
              {specialists.map((specialist, index) => (
                <button
                  type="button"
                  key={specialist.name}
                  className={activeSpecialist === index ? 'is-active' : ''}
                  onClick={() => selectSpecialist(index)}
                  aria-label={`Mostrar ${specialist.name}`}
                  aria-pressed={activeSpecialist === index}
                >
                  {String(index + 1).padStart(2, '0')}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="v2-hero__portrait-pause"
              onClick={() => setRotationPaused((value) => !value)}
              aria-label={rotationPaused ? 'Continuar rotação automática da equipe' : 'Pausar rotação automática da equipe'}
              title={rotationPaused ? 'Continuar' : 'Pausar'}
            >
              {rotationPaused ? '▶' : 'Ⅱ'}
            </button>
          </div>

          <div className="v2-hero__portrait-caption" key={`${person.name}-caption`}>
            <span>Corpo clínico · {String(activeSpecialist + 1).padStart(2, '0')} / {String(specialists.length).padStart(2, '0')}</span>
            <strong>{person.name}</strong>
            <p>{person.specialty}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustBand() {
  return (
    <section className="v2-trust" aria-label="Diferenciais da clínica">
      <div className="v2-shell v2-trust__grid">
        {trustItems.map((item, index) => (
          <div key={item}>
            <span>0{index + 1}</span>
            <p>{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="v2-section v2-about" id="clinica">
      <div className="v2-shell">
        <SectionEyebrow index="01">A clínica</SectionEyebrow>
        <div className="v2-about__grid">
          <div className="v2-about__title">
            <h2>Atendimento próximo, decisões claras e cuidado em cada detalhe.</h2>
          </div>
          <div className="v2-about__body">
            <p className="v2-lead">
              A IL Odontologia e Estética combina saúde bucal, estética e atendimento humanizado com honestidade, respeito e atenção individual.
            </p>
            <p>
              Cada paciente é único. Por isso, começamos ouvindo suas expectativas para estruturar um plano de tratamento transparente, explicando passo a passo cada etapa clínica com serenidade e precisão técnica.
            </p>
            <a className="v2-text-link" href="#tratamentos">
              Explorar nossos tratamentos <Arrow />
            </a>
          </div>
        </div>
        <div className="v2-about__media v2-about__media--portrait">
          <img
            src={assets.about}
            alt="Dra. Layla Beatriz — Diretora Clínica da IL Odontologia e Estética"
            loading="lazy"
          />
          <div className="v2-about__note">
            <span>Dra. Layla Beatriz</span>
            <p>Cirurgiã-Dentista · Cuidado humano e excelência estética em cada detalhe.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Treatments() {
  const [active, setActive] = useState(0);
  const item = orderedTreatments[active];
  const message = `Olá! Gostaria de saber mais sobre ${item.name} na IL Odontologia e Estética.`;

  return (
    <section className="v2-section v2-treatments" id="tratamentos">
      <div className="v2-shell">
        <SectionEyebrow index="02">Tratamentos</SectionEyebrow>
        <div className="v2-section-head">
          <h2>O cuidado certo começa com informação clara.</h2>
          <p>Explore os tratamentos oferecidos pela clínica e fale diretamente com a equipe já com a sua dúvida identificada.</p>
        </div>
        <div className="v2-treatment-explorer">
          <div className="v2-treatment-list" role="tablist" aria-label="Tratamentos">
            {orderedTreatments.map((treatment, index) => (
              <button
                type="button"
                role="tab"
                aria-selected={active === index}
                className={active === index ? 'is-active' : ''}
                onClick={() => setActive(index)}
                key={treatment.name}
              >
                <span>0{index + 1}</span>
                <strong>{treatment.name}</strong>
                <Arrow />
              </button>
            ))}
          </div>
          <div className="v2-treatment-detail" role="tabpanel">
            <span className="v2-treatment-detail__index">0{active + 1}</span>
            <p className="v2-kicker v2-kicker--dark">Tratamento selecionado</p>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <Button href={whatsappFor(message)} external>Quero saber mais</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Specialists() {
  return (
    <section className="v2-section v2-specialists" id="especialistas">
      <div className="v2-shell">
        <SectionEyebrow index="03">Corpo Clínico</SectionEyebrow>
        <div className="v2-section-head v2-section-head--wide">
          <h2>Especialistas dedicados ao seu bem-estar.</h2>
          <p>Profissionais com formação sólida e foco em atendimento humanizado para cada área da odontologia.</p>
        </div>
        <div className="v2-specialists__grid">
          {specialists.map((person, index) => (
            <article className="v2-person" key={person.name}>
              <div className="v2-person__image">
                <img src={person.image} alt={`Foto de ${person.name}`} loading="lazy" />
                <span>0{index + 1}</span>
              </div>
              <div className="v2-person__body">
                <h3>{person.name}</h3>
                <p>{person.specialty}</p>
                <a
                  className="v2-text-link"
                  href={whatsappFor(`Olá! Gostaria de falar com a clínica sobre atendimento com ${person.name}.`)}
                  target="_blank"
                  rel="noreferrer"
                >
                  Agendar com este especialista <Arrow />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BeforeAfterCases() {
  const [activeCase, setActiveCase] = useState(0);
  const currentCase = beforeAfterCases[activeCase];

  return (
    <section className="v2-section v2-cases" id="resultados">
      <div className="v2-shell">
        <SectionEyebrow index="04">Resultados & Casos Clínicos</SectionEyebrow>
        <div className="v2-section-head v2-section-head--wide">
          <h2>Transformações reais com precisão e harmonia.</h2>
          <p>
            Exemplos de casos clínicos reais planejados e executados com respeito à anatomia facial e máxima naturalidade.
          </p>
        </div>

        <div className="v2-cases__container">
          <div className="v2-cases__tabs" role="tablist" aria-label="Casos de Antes e Depois">
            {beforeAfterCases.map((item, index) => (
              <button
                type="button"
                role="tab"
                key={item.id}
                className={`v2-cases__tab ${activeCase === index ? 'is-active' : ''}`}
                onClick={() => setActiveCase(index)}
                aria-selected={activeCase === index}
              >
                <span className="v2-cases__tab-idx">0{index + 1}</span>
                <span className="v2-cases__tab-title">{item.title}</span>
              </button>
            ))}
          </div>

          <div className="v2-cases__card">
            <div className="v2-cases__media">
              <div className="v2-cases__image-wrapper">
                <img
                  src={currentCase.image}
                  alt={`Caso clínico: ${currentCase.title}`}
                  className="v2-cases__image"
                  loading="lazy"
                />
                <span className="v2-cases__badge">{currentCase.badge}</span>
              </div>
            </div>

            <div className="v2-cases__info">
              <span className="v2-cases__category">{currentCase.category}</span>
              <h3>{currentCase.title}</h3>
              <p className="v2-cases__desc">{currentCase.description}</p>
              <div className="v2-cases__detail-box">
                <strong>Foco do Planejamento:</strong>
                <p>{currentCase.details}</p>
              </div>
              <p className="v2-cases__disclaimer">
                * Casos clínicos reais atendidos pela clínica. Cada plano de tratamento é estritamente individualizado conforme avaliação clínica prévia.
              </p>
              <div className="v2-cases__cta">
                <Button href={whatsappFor(currentCase.whatsappMsg)} external>
                  Avaliar caso semelhante no WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const items = [
    ['Escuta Atenta', 'Compreensão aprofundada da sua rotina e objetivos antes de qualquer conduta clínica.'],
    ['Planejamento 3D', 'Avaliação tridimensional com foco na longevidade biológica e harmonia do sorriso.'],
    ['Ambiente Acolhedor', 'Consultório projetado para tornar sua consulta leve, tranquila e sem estresse.'],
    ['Acompanhamento Contínuo', 'Orientações claras em todas as etapas, da primeira consulta à manutenção.'],
  ];

  return (
    <section className="v2-section v2-experience" id="experiencia">
      <div className="v2-shell">
        <SectionEyebrow index="05" light>Experiência do paciente</SectionEyebrow>
        <div className="v2-experience__grid">
          <div className="v2-experience__copy">
            <h2>Cuidar bem também é fazer você se sentir seguro e acolhido.</h2>
            <p>
              A excelência começa no primeiro contato pelo WhatsApp, passa pela pontualidade e atenção da recepção e se consolida no cuidado clínico humanizado.
            </p>
          </div>
          <div className="v2-experience__media">
            <img src={assets.hero} alt="Ambiente de consultório da IL Odontologia e Estética" loading="lazy" />
          </div>
        </div>
        <div className="v2-experience__items">
          {items.map(([title, text], index) => (
            <div key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const [active, setActive] = useState(0);
  const testimonial = testimonials[active];

  return (
    <section className="v2-section v2-testimonials">
      <div className="v2-shell">
        <SectionEyebrow index="06">Experiências reais</SectionEyebrow>
        <div className="v2-testimonials__rating">
          <div className="v2-stars" aria-label="5 estrelas">★★★★★</div>
          <span className="v2-rating-badge">Nota 5.0 no Google Avaliações · 100% de Pacientes Satisfeitos</span>
        </div>
        <div className="v2-testimonials__grid">
          <div>
            <h2>Confiança conquistada em cada consulta.</h2>
          </div>
          <blockquote>
            <p>“{testimonial.quote}”</p>
            <footer>
              <strong>{testimonial.name}</strong>
              <span className="v2-patient-tag">{testimonial.tag}</span>
            </footer>
          </blockquote>
        </div>
        {testimonials.length > 1 && (
          <div className="v2-testimonials__nav">
            {testimonials.map((item, index) => (
              <button
                type="button"
                className={active === index ? 'is-active' : ''}
                onClick={() => setActive(index)}
                aria-label={`Ver depoimento de ${item.name}`}
                key={item.name}
              >
                {String(index + 1).padStart(2, '0')}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function AgreementsAndFaq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="v2-section v2-info">
      <div className="v2-shell v2-info__grid">
        <div>
          <SectionEyebrow index="07">Convênios</SectionEyebrow>
          <h2>Planos Odontológicos</h2>
          <div className="v2-agreements">
            {agreements.map((item) => (
              <div key={item.name} className="v2-agreement-pill">
                <span>{item.name}</span>
                <small className={item.status === 'Atendido' ? 'is-confirmed' : 'is-soon'}>
                  {item.status}
                </small>
              </div>
            ))}
          </div>
          <p className="v2-small-copy">
            Para outros planos de saúde, emitimos relatórios e notas detalhadas para você solicitar reembolso com facilidade.
          </p>
        </div>
        <div>
          <SectionEyebrow index="08">Perguntas frequentes</SectionEyebrow>
          <div className="v2-faq">
            {faqs.map((item, index) => (
              <article className={open === index ? 'is-open' : ''} key={item.question}>
                <button
                  type="button"
                  onClick={() => setOpen(open === index ? -1 : index)}
                  aria-expanded={open === index}
                >
                  <span>{item.question}</span>
                  <strong>{open === index ? '−' : '+'}</strong>
                </button>
                <div className="v2-faq__answer">
                  <p>{item.answer}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="v2-contact" id="contato">
      <div className="v2-shell v2-contact__grid">
        <div className="v2-contact__copy">
          <p className="v2-kicker">Contato & localização</p>
          <h2>Pronto para cuidar do seu sorriso?</h2>
          <p>
            Fale com a equipe da IL Odontologia e Estética para tirar dúvidas e escolher o melhor dia e horário para a sua visita.
          </p>
          <div className="v2-contact__actions">
            <Button href={clinic.whatsapp} light external>
              Agendar pelo WhatsApp
            </Button>
            <a className="v2-route-btn" href={clinic.routeUrl} target="_blank" rel="noreferrer">
              Abrir no Google Maps <Arrow />
            </a>
            <a className="v2-route-btn v2-route-btn--ghost" href={clinic.wazeUrl} target="_blank" rel="noreferrer">
              Abrir no Waze <Arrow />
            </a>
          </div>

          <div className="v2-contact__details">
            <a href={`tel:+${clinic.phoneRaw}`}>
              <span>Telefone & WhatsApp</span>
              <strong>{clinic.phoneDisplay}</strong>
            </a>
            <a href={`mailto:${clinic.email}`}>
              <span>E-mail</span>
              <strong>{clinic.email}</strong>
            </a>
            <a href={clinic.routeUrl} target="_blank" rel="noreferrer">
              <span>Endereço</span>
              <strong>{clinic.address}</strong>
              <small>{clinic.landmark}</small>
            </a>
            <div className="v2-contact__hours">
              <span>Horário de Atendimento</span>
              <div className="v2-hours-list">
                {clinic.hours.map((h) => (
                  <div key={h.days} className="v2-hour-row">
                    <span className="v2-hour-day">{h.days}:</span>
                    <strong className="v2-hour-time">{h.time}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="v2-contact__map-wrapper">
          <div className="v2-contact__map-header">
            <div>
              <strong>Localização da Clínica</strong>
              <p>Rua Cândido Olímpio, 1920 · Limoeiro do Norte - CE</p>
            </div>
            <a
              href={clinic.routeUrl}
              target="_blank"
              rel="noreferrer"
              className="v2-map-direct-link"
            >
              Ver no Maps <Arrow />
            </a>
          </div>
          <div className="v2-contact__map">
            <iframe
              title="Localização da IL Odontologia e Estética no Google Maps"
              src={clinic.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="v2-footer">
      <div className="v2-shell v2-footer__grid">
        <div>
          <Brand light />
          <p>Odontologia e estética com atendimento humano, precisão técnica e conforto em Limoeiro do Norte — CE.</p>
        </div>
        <nav aria-label="Navegação do rodapé">
          {navItems.map(([label, href]) => (
            <a href={href} key={href}>{label}</a>
          ))}
        </nav>
        <div className="v2-footer__contact">
          <a href={clinic.whatsapp} target="_blank" rel="noreferrer">WhatsApp: {clinic.phoneDisplay}</a>
          <a href={`mailto:${clinic.email}`}>{clinic.email}</a>
          <span>{clinic.address}</span>
          <small>{clinic.landmark}</small>
        </div>
      </div>
      <div className="v2-shell v2-footer__bottom">
        <span>© {new Date().getFullYear()} IL Odontologia e Estética. Todos os direitos reservados.</span>
        <span>Limoeiro do Norte — CE</span>
      </div>
    </footer>
  );
}

function MobileDock() {
  return (
    <div className="v2-mobile-dock" aria-label="Ações rápidas">
      <a href={clinic.whatsapp} target="_blank" rel="noreferrer" className="v2-mobile-dock__primary">
        <strong>WhatsApp</strong>
        <span>Agendar Consulta</span>
      </a>
      <a href={clinic.routeUrl} target="_blank" rel="noreferrer">
        <strong>Como Chegar</strong>
        <span>Ver Rota</span>
      </a>
    </div>
  );
}

export default function AppV2() {
  const schema = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    name: clinic.name,
    telephone: `+${clinic.phoneRaw}`,
    email: clinic.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rua Cândido Olímpio, 1920',
      addressLocality: 'Limoeiro do Norte',
      addressRegion: 'CE',
      addressCountry: 'BR',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '08:00',
        closes: '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Friday'],
        opens: '08:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '08:00',
        closes: '12:00',
      },
    ],
  }), []);

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
      <a className="v2-skip" href="#conteudo">Pular para o conteúdo</a>
      <Header />
      <main id="conteudo">
        <Hero />
        <TrustBand />
        <About />
        <Treatments />
        <Specialists />
        <BeforeAfterCases />
        <Experience />
        <Testimonials />
        <AgreementsAndFaq />
        <Contact />
      </main>
      <Footer />
      <MobileDock />
    </>
  );
}
