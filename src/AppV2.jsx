import { useEffect, useMemo, useState } from 'react';
import { agreements, assets, clinic, specialists, testimonials, treatments, trustItems } from './data/siteData';

const navItems = [
  ['A clínica', '#clinica'],
  ['Tratamentos', '#tratamentos'],
  ['Especialistas', '#especialistas'],
  ['Experiência', '#experiencia'],
  ['Contato', '#contato'],
];

const treatmentOrder = [
  'Odontologia estética',
  'Implante dentário',
  'Limpeza dental',
  'Tratamento de canal',
  'Odontopediatria',
  'Extração dentária',
];

const orderedTreatments = treatmentOrder
  .map((name) => treatments.find((item) => item.name === name))
  .filter(Boolean);

const confirmedAgreements = agreements.filter((item) => item.status === 'Atendido');

const faqs = [
  {
    question: 'Como faço para agendar uma consulta?',
    answer: 'Você pode iniciar o agendamento diretamente pelo WhatsApp da IL Odontologia e Estética e combinar a disponibilidade com a equipe.',
  },
  {
    question: 'Quais tratamentos a clínica apresenta?',
    answer: orderedTreatments.map((item) => item.name).join(', ') + '.',
  },
  {
    question: 'Quais convênios estão confirmados?',
    answer: confirmedAgreements.map((item) => item.name).join(', ') + '.',
  },
  {
    question: 'Onde fica a IL Odontologia e Estética?',
    answer: `${clinic.address}. ${clinic.landmark}.`,
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
    <svg viewBox="0 0 24 24" aria-hidden="true" className="v2-icon"><path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="v2-icon"><path d="M4 8h16M4 16h16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
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
      <span>{children}</span><Arrow />
    </a>
  );
}

function SectionEyebrow({ index, children, light = false }) {
  return <p className={`v2-eyebrow ${light ? 'is-light' : ''}`}><span>{index}</span>{children}</p>;
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
          {navItems.map(([label, href]) => <a href={href} key={href}>{label}</a>)}
        </nav>
        <a className="v2-header-cta" href={clinic.whatsapp} target="_blank" rel="noreferrer">Agendar consulta <Arrow /></a>
        <button type="button" className="v2-menu-button" aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
          <MenuIcon open={open} />
        </button>
      </div>
      <div className={`v2-mobile-menu ${open ? 'is-open' : ''}`}>
        <div className="v2-shell">
          <nav aria-label="Navegação mobile">
            {navItems.map(([label, href], index) => (
              <a href={href} key={href} onClick={() => setOpen(false)}><span>0{index + 1}</span>{label}</a>
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
          <p className="v2-hero__lead">Saúde, estética e atendimento humano em uma experiência pensada para oferecer clareza e segurança em cada etapa.</p>
          <div className="v2-hero__actions">
            <Button href={clinic.whatsapp} light external>Agendar consulta</Button>
            <a className="v2-text-link v2-text-link--light" href="#tratamentos">Conhecer tratamentos <Arrow /></a>
          </div>
          <div className="v2-hero__meta">
            <div><span>Atendimento</span><strong>Personalizado</strong></div>
            <div><span>Localização</span><strong>Centro · Limoeiro do Norte</strong></div>
          </div>
        </div>
        <div className="v2-hero__portrait" aria-label="Profissionais da IL Odontologia e Estética">
          <img key={person.image} className="v2-hero__portrait-image" src={person.image} alt={`Foto de ${person.name}`} fetchPriority={activeSpecialist === 0 ? 'high' : 'auto'} />

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
        {trustItems.map((item, index) => <div key={item}><span>0{index + 1}</span><p>{item}</p></div>)}
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
          <div className="v2-about__title"><h2>Atendimento próximo, decisões claras e cuidado em cada detalhe.</h2></div>
          <div className="v2-about__body">
            <p className="v2-lead">A IL Odontologia e Estética combina saúde bucal, estética e atendimento humanizado com honestidade, respeito e atenção individual.</p>
            <p>Cada atendimento começa entendendo sua necessidade. A partir daí, a equipe constrói um plano coerente e personalizado, explicando cada etapa de forma simples.</p>
            <a className="v2-text-link" href="#especialistas">Conhecer os especialistas <Arrow /></a>
          </div>
        </div>
        <div className="v2-about__media">
          <img src={assets.about} alt="Estrutura da IL Odontologia e Estética" loading="lazy" />
          <div className="v2-about__note"><span>IL</span><p>Saúde e estética com cuidado humano.</p></div>
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
          <p>Explore os tratamentos apresentados pela clínica e fale com a equipe já com o assunto da sua dúvida identificado.</p>
        </div>
        <div className="v2-treatment-explorer">
          <div className="v2-treatment-list" role="tablist" aria-label="Tratamentos">
            {orderedTreatments.map((treatment, index) => (
              <button type="button" role="tab" aria-selected={active === index} className={active === index ? 'is-active' : ''} onClick={() => setActive(index)} key={treatment.name}>
                <span>0{index + 1}</span><strong>{treatment.name}</strong><Arrow />
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
        <SectionEyebrow index="03">Especialistas</SectionEyebrow>
        <div className="v2-section-head v2-section-head--wide">
          <h2>Profissionais que unem conhecimento e proximidade.</h2>
        </div>
        <div className="v2-specialists__grid">
          {specialists.map((person, index) => (
            <article className="v2-person" key={person.name}>
              <div className="v2-person__image"><img src={person.image} alt={`Foto de ${person.name}`} loading="lazy" /><span>0{index + 1}</span></div>
              <div className="v2-person__body"><h3>{person.name}</h3><p>{person.specialty}</p><a className="v2-text-link" href={whatsappFor(`Olá! Gostaria de falar com a clínica sobre um atendimento com ${person.name}.`)} target="_blank" rel="noreferrer">Falar com a clínica <Arrow /></a></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const items = [
    ['Escuta', 'Atendimento com atenção desde o primeiro contato.'],
    ['Planejamento', 'Cada caso é avaliado de forma individual.'],
    ['Conforto', 'Um ambiente pensado para tornar sua visita mais tranquila.'],
    ['Acompanhamento', 'Orientações claras ao longo do processo de cuidado.'],
  ];

  return (
    <section className="v2-section v2-experience" id="experiencia">
      <div className="v2-shell">
        <SectionEyebrow index="04" light>Experiência do paciente</SectionEyebrow>
        <div className="v2-experience__grid">
          <div className="v2-experience__copy"><h2>Cuidar bem também é fazer você se sentir bem.</h2><p>A experiência começa na recepção, passa pela clareza das orientações e continua no acompanhamento profissional.</p></div>
          <div className="v2-experience__media"><img src={assets.hero} alt="Ambiente da IL Odontologia e Estética" loading="lazy" /></div>
        </div>
        <div className="v2-experience__items">
          {items.map(([title, text], index) => <div key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></div>)}
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
        <SectionEyebrow index="05">Experiências reais</SectionEyebrow>
        <div className="v2-testimonials__grid">
          <div><h2>Confiança construída no atendimento.</h2></div>
          <blockquote><p>“{testimonial.quote}”</p><footer>{testimonial.name}</footer></blockquote>
        </div>
        {testimonials.length > 1 && <div className="v2-testimonials__nav">{testimonials.map((item, index) => <button type="button" className={active === index ? 'is-active' : ''} onClick={() => setActive(index)} aria-label={`Ver depoimento de ${item.name}`} key={item.name}>{String(index + 1).padStart(2, '0')}</button>)}</div>}
      </div>
    </section>
  );
}

function VisualStory() {
  return (
    <section className="v2-section v2-visual-story">
      <div className="v2-shell">
        <SectionEyebrow index="06">Ambiente & equipe</SectionEyebrow>
        <div className="v2-visual-story__grid">
          <figure className="v2-visual-story__large"><img src={assets.about} alt="Estrutura da clínica" loading="lazy" /><figcaption>Um espaço pensado para receber com conforto.</figcaption></figure>
          <figure><img src={specialists[1].image} alt={`Foto de ${specialists[1].name}`} loading="lazy" /><figcaption>{specialists[1].name}</figcaption></figure>
          <figure><img src={specialists[2].image} alt={`Foto de ${specialists[2].name}`} loading="lazy" /><figcaption>{specialists[2].name}</figcaption></figure>
        </div>
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
          <h2>Convênios confirmados</h2>
          <div className="v2-agreements">{confirmedAgreements.map((item) => <div key={item.name}>{item.name}</div>)}</div>
          <p className="v2-small-copy">Para outros convênios, consulte a disponibilidade diretamente com a clínica.</p>
        </div>
        <div>
          <SectionEyebrow index="08">Perguntas frequentes</SectionEyebrow>
          <div className="v2-faq">{faqs.map((item, index) => <article className={open === index ? 'is-open' : ''} key={item.question}><button type="button" onClick={() => setOpen(open === index ? -1 : index)} aria-expanded={open === index}><span>{item.question}</span><strong>{open === index ? '−' : '+'}</strong></button><div className="v2-faq__answer"><p>{item.answer}</p></div></article>)}</div>
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
          <p>Fale com a equipe da IL e dê o primeiro passo para uma avaliação.</p>
          <Button href={clinic.whatsapp} light external>Agendar pelo WhatsApp</Button>
          <div className="v2-contact__details">
            <a href={`tel:+${clinic.phoneRaw}`}><span>Telefone</span><strong>{clinic.phoneDisplay}</strong></a>
            <a href={clinic.routeUrl} target="_blank" rel="noreferrer"><span>Endereço</span><strong>{clinic.address}</strong><small>{clinic.landmark}</small></a>
            <div><span>Horários</span><strong>Consulte a disponibilidade pelo WhatsApp</strong></div>
          </div>
        </div>
        <div className="v2-contact__map"><iframe title="Mapa da IL Odontologia e Estética" src={clinic.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="v2-footer">
      <div className="v2-shell v2-footer__grid">
        <div><Brand light /><p>Odontologia e estética com atendimento humano em Limoeiro do Norte — CE.</p></div>
        <nav aria-label="Navegação do rodapé">{navItems.map(([label, href]) => <a href={href} key={href}>{label}</a>)}</nav>
        <div className="v2-footer__contact"><a href={clinic.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a><a href={`tel:+${clinic.phoneRaw}`}>{clinic.phoneDisplay}</a><span>{clinic.address}</span></div>
      </div>
      <div className="v2-shell v2-footer__bottom"><span>© {new Date().getFullYear()} IL Odontologia e Estética.</span><span>Limoeiro do Norte — CE</span></div>
    </footer>
  );
}

function MobileDock() {
  return (
    <div className="v2-mobile-dock" aria-label="Ações rápidas">
      <a href={clinic.whatsapp} target="_blank" rel="noreferrer"><strong>WhatsApp</strong><span>Agendar</span></a>
      <a href={clinic.routeUrl} target="_blank" rel="noreferrer"><strong>Rota</strong><span>Como chegar</span></a>
    </div>
  );
}

export default function AppV2() {
  const schema = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    name: clinic.name,
    telephone: `+${clinic.phoneRaw}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rua Cândido Olímpio, 1920',
      addressLocality: 'Limoeiro do Norte',
      addressRegion: 'CE',
      addressCountry: 'BR',
    },
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
        <Experience />
        <Testimonials />
        <VisualStory />
        <AgreementsAndFaq />
        <Contact />
      </main>
      <Footer />
      <MobileDock />
    </>
  );
}
