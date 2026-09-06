import { useEffect, useMemo, useState } from 'react';
import {
  agreements,
  assets,
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
  ['Experiência', '#experiencia'],
  ['Contato', '#contato'],
];

const experienceItems = [
  ['01', 'Escuta antes de qualquer decisão', 'O atendimento começa entendendo sua necessidade, sua rotina e o que você espera do tratamento.'],
  ['02', 'Planejamento individual', 'Cada caso é avaliado de forma própria para que saúde, função e estética caminhem juntas.'],
  ['03', 'Ambiente acolhedor', 'Uma experiência organizada e confortável para que a ida ao dentista seja mais leve.'],
  ['04', 'Acompanhamento profissional', 'Orientações claras ao longo do processo para você saber o que está sendo feito e por quê.'],
];

const faqs = [
  {
    question: 'Como faço para agendar uma consulta?',
    answer: 'O agendamento pode ser iniciado diretamente pelo WhatsApp da IL Odontologia e Estética. Você fala com a clínica e combina o melhor horário disponível.',
  },
  {
    question: 'Quais tratamentos estão disponíveis?',
    answer: `A clínica apresenta atualmente ${treatments.map((item) => item.name.toLowerCase()).join(', ')}.`,
  },
  {
    question: 'A clínica atende convênios?',
    answer: 'Bradesco Dental, Brasil Dental e Odontoprev constam como atendidos. MetLife permanece em validação antes de publicação definitiva.',
  },
  {
    question: 'Onde fica a IL Odontologia e Estética?',
    answer: `${clinic.address}. ${clinic.landmark}.`,
  },
];

function whatsappFor(message) {
  return `https://wa.me/${clinic.phoneRaw}?text=${encodeURIComponent(message)}`;
}

function Arrow({ direction = 'right' }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`icon icon--${direction}`}>
      <path d="M5 12h13M14 7l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="icon">
      <path d="M4 8h16M4 16h16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="icon">
      <path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="icon">
      <path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.4L3.5 20.5l1.4-4.2a8.5 8.5 0 1 1 15.6-4.6Z" fill="none" stroke="currentColor" strokeWidth="1.45" />
      <path d="M8.7 8.1c.2-.4.5-.5.8-.5h.4c.3 0 .4.1.5.4l.8 1.8c.1.3 0 .5-.2.7l-.6.8c-.2.2-.1.4 0 .6.6 1.1 1.5 2 2.6 2.6.2.1.4.2.6 0l.9-1c.2-.2.4-.3.7-.2l1.8.9c.3.1.4.3.4.5 0 .4-.2 1.3-.8 1.8-.5.5-1.2.8-2 .8-1.1 0-2.8-.6-4.7-2.2-2.2-1.8-3.5-4.5-3.5-5.8 0-.6.1-1 .3-1.4.3-.4.6-.7 1-.8Z" fill="currentColor" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="icon">
      <path d="M7.4 4.5 9.5 9l-2 1.7c1.1 2.5 3.3 4.7 5.8 5.8l1.7-2 4.5 2.1-.8 3c-.2.8-1 1.4-1.9 1.4C9.2 20.8 3.2 14.8 3 7.2c0-.9.6-1.7 1.4-1.9l3-.8Z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="icon">
      <path d="M12 21s6-5.1 6-11a6 6 0 1 0-12 0c0 5.9 6 11 6 11Z" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="10" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function Brand({ light = false }) {
  return (
    <a className={`brand ${light ? 'brand--light' : ''}`} href="#inicio" aria-label="IL Odontologia e Estética — início">
      <img src={assets.logo} alt="IL Odontologia e Estética" />
    </a>
  );
}

function Button({ href, children, light = false, external = false, className = '' }) {
  return (
    <a
      className={`button ${light ? 'button--light' : ''} ${className}`}
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
    >
      <span>{children}</span>
      <span className="button__icon"><Arrow /></span>
    </a>
  );
}

function SectionLabel({ index, children, light = false }) {
  return (
    <div className={`section-label ${light ? 'section-label--light' : ''}`}>
      <span>{index}</span>
      <p>{children}</p>
    </div>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 56);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('nav-open', open);
    return () => document.body.classList.remove('nav-open');
  }, [open]);

  return (
    <header className={`site-header ${scrolled || open ? 'site-header--solid' : ''}`}>
      <div className="site-header__inner shell">
        <Brand light={!scrolled && !open} />
        <nav className="desktop-nav" aria-label="Navegação principal">
          {navItems.map(([label, href]) => <a href={href} key={href}>{label}</a>)}
        </nav>
        <a className="header-action" href={clinic.whatsapp} target="_blank" rel="noreferrer">
          Agendar consulta <Arrow />
        </a>
        <button
          type="button"
          className="menu-button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>
      <div className={`mobile-menu ${open ? 'mobile-menu--open' : ''}`} id="mobile-menu">
        <div className="mobile-menu__inner shell">
          <p className="micro-label">IL · Limoeiro do Norte</p>
          <nav aria-label="Navegação mobile">
            {navItems.map(([label, href], index) => (
              <a href={href} key={href} onClick={() => setOpen(false)}>
                <span>0{index + 1}</span>{label}
              </a>
            ))}
          </nav>
          <Button href={clinic.whatsapp} light external>Agendar pelo WhatsApp</Button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero__watermark" aria-hidden="true">IL</div>
      <div className="hero__orb" aria-hidden="true" />
      <div className="shell hero__grid">
        <div className="hero__copy">
          <p className="micro-label micro-label--light">Odontologia & estética · Limoeiro do Norte</p>
          <h1>
            Saúde, estética
            <span>e cuidado em equilíbrio.</span>
          </h1>
          <p className="hero__lead">Uma experiência odontológica próxima, precisa e humana — do primeiro contato ao acompanhamento do seu tratamento.</p>
          <div className="hero__actions">
            <Button href={clinic.whatsapp} light external>Agendar consulta</Button>
            <a className="ghost-link" href="#tratamentos">Conhecer tratamentos <Arrow /></a>
          </div>
        </div>

        <div className="hero__visual" aria-label="Ambiente da IL Odontologia e Estética">
          <div className="hero__orbit hero__orbit--one" aria-hidden="true" />
          <div className="hero__orbit hero__orbit--two" aria-hidden="true" />
          <div className="hero__photo-wrap">
            <img src={assets.hero} alt="Ambiente e atendimento da IL Odontologia e Estética" fetchPriority="high" />
          </div>
          <div className="hero__location">
            <span>CE</span>
            <p>Limoeiro<br />do Norte</p>
          </div>
        </div>
      </div>

      <div className="shell hero__facts">
        <div><strong>{clinic.patients}</strong><span>pacientes atendidos</span></div>
        <div><strong>0{specialists.length}</strong><span>especialistas apresentados</span></div>
        <div className="hero__address"><span>Onde estamos</span><strong>Centro · Limoeiro do Norte</strong></div>
      </div>
    </section>
  );
}

function TrustTicker() {
  const items = [...trustItems, ...trustItems];
  return (
    <section className="ticker" aria-label="Diferenciais">
      <div className="ticker__track">
        {items.map((item, index) => (
          <span key={`${item}-${index}`}><i>✦</i>{item}</span>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section section--about" id="clinica">
      <div className="shell">
        <SectionLabel index="01">A clínica</SectionLabel>
        <div className="about-layout">
          <div className="about-statement">
            <h2>Cuidado que você <em>sente</em> antes mesmo do tratamento.</h2>
          </div>
          <div className="about-body">
            <p className="about-body__lead">A IL combina saúde bucal, estética e atendimento humanizado em uma experiência construída com honestidade, respeito e atenção individual.</p>
            <div className="about-body__columns">
              <p>Cada atendimento parte de uma conversa. Entender o que você precisa é o primeiro passo para construir um plano de tratamento coerente e personalizado.</p>
              <p>Da prevenção aos tratamentos mais complexos, a proposta é tornar cada decisão clara e cada etapa mais confortável.</p>
            </div>
            <a className="line-link" href="#especialistas">Conheça quem vai cuidar de você <Arrow /></a>
          </div>
        </div>
        <div className="about-media">
          <img src={assets.about} alt="Estrutura da IL Odontologia e Estética" loading="lazy" />
          <div className="about-media__note">
            <span>IL</span>
            <p>Saúde e estética<br />com cuidado humano.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Treatments() {
  const [active, setActive] = useState(0);
  const activeTreatment = treatments[active];
  const message = `Olá, gostaria de saber mais sobre ${activeTreatment.name} na IL Odontologia e Estética.`;

  return (
    <section className="section section--treatments" id="tratamentos">
      <div className="shell">
        <SectionLabel index="02">Como podemos ajudar</SectionLabel>
        <div className="treatments-head">
          <h2>Escolha o cuidado.<br /><span>Nós explicamos o caminho.</span></h2>
          <p>Explore os tratamentos apresentados pela clínica e fale com a equipe já com o assunto da sua dúvida identificado.</p>
        </div>

        <div className="treatment-explorer">
          <div className="treatment-tabs" role="tablist" aria-label="Tratamentos">
            {treatments.map((treatment, index) => (
              <button
                type="button"
                key={treatment.name}
                className={active === index ? 'is-active' : ''}
                onClick={() => setActive(index)}
                role="tab"
                aria-selected={active === index}
              >
                <span>0{index + 1}</span>
                <strong>{treatment.name}</strong>
                <Arrow />
              </button>
            ))}
          </div>

          <div className="treatment-stage" role="tabpanel">
            <div className="treatment-stage__media">
              <img src={assets.gallery[active % assets.gallery.length]} alt={`Ambiente da clínica — ${activeTreatment.name}`} loading="lazy" />
              <div className="treatment-stage__number">0{active + 1}</div>
            </div>
            <div className="treatment-stage__copy">
              <p className="micro-label">Tratamento selecionado</p>
              <h3>{activeTreatment.name}</h3>
              <p>{activeTreatment.description}</p>
              <Button href={whatsappFor(message)} external>Quero saber mais</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SmileFeature() {
  return (
    <section className="smile-feature">
      <div className="smile-feature__media">
        <img src={assets.gallery[1]} alt="Detalhe do ambiente da IL Odontologia e Estética" loading="lazy" />
      </div>
      <div className="smile-feature__panel">
        <p className="micro-label micro-label--light">Estética com propósito</p>
        <h2>Seu sorriso faz parte de quem você é.</h2>
        <p>Estética e saúde devem caminhar juntas. Cada tratamento é planejado individualmente, respeitando suas características e buscando naturalidade.</p>
        <Button href={whatsappFor('Olá, gostaria de agendar uma avaliação na IL Odontologia e Estética.')} light external>Agendar avaliação</Button>
      </div>
    </section>
  );
}

function Specialists() {
  return (
    <section className="section section--specialists" id="especialistas">
      <div className="shell">
        <SectionLabel index="03">Especialistas</SectionLabel>
        <div className="specialists-head">
          <h2>Conhecimento técnico.<br /><em>Presença humana.</em></h2>
          <p>Profissionais apresentados pela clínica para diferentes necessidades de cuidado odontológico.</p>
        </div>
        <div className="specialist-grid">
          {specialists.map((person, index) => (
            <article className="specialist" key={person.name}>
              <div className="specialist__media">
                <img src={person.image} alt={`Foto de ${person.name}`} loading="lazy" />
                <span className="specialist__index">0{index + 1}</span>
              </div>
              <div className="specialist__info">
                <h3>{person.name}</h3>
                <p>{person.specialty}</p>
                <a href={whatsappFor(`Olá, gostaria de falar com a clínica sobre atendimento com ${person.name}.`)} target="_blank" rel="noreferrer">
                  Falar com a clínica <Arrow />
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
  return (
    <section className="section section--experience" id="experiencia">
      <div className="shell">
        <SectionLabel index="04" light>Experiência do paciente</SectionLabel>
        <div className="experience-head">
          <h2>Uma boa experiência<br />não começa na cadeira.</h2>
          <p>Ela começa no contato, na clareza das informações e na sensação de estar sendo cuidado de verdade.</p>
        </div>
        <div className="experience-grid">
          {experienceItems.map(([index, title, text]) => (
            <article key={index}>
              <span>{index}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <div className="experience-image">
          <img src={assets.gallery[2]} alt="Ambiente da clínica IL Odontologia e Estética" loading="lazy" />
          <div className="experience-image__tag">IL · cuidado em cada detalhe</div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const [active, setActive] = useState(0);
  const current = testimonials[active];

  return (
    <section className="section section--testimonials">
      <div className="shell">
        <SectionLabel index="05">Experiências reais</SectionLabel>
        <div className="testimonial-layout">
          <div className="testimonial-mark" aria-hidden="true">“</div>
          <div className="testimonial-content">
            <blockquote>{current.quote}</blockquote>
            <div className="testimonial-meta">
              <div><strong>{current.name}</strong><span>Paciente · depoimento publicado pela clínica</span></div>
              <div className="testimonial-controls">
                <button type="button" aria-label="Depoimento anterior" onClick={() => setActive((value) => (value - 1 + testimonials.length) % testimonials.length)}><Arrow direction="left" /></button>
                <span>0{active + 1} / 0{testimonials.length}</span>
                <button type="button" aria-label="Próximo depoimento" onClick={() => setActive((value) => (value + 1) % testimonials.length)}><Arrow /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const close = (event) => {
      if (event.key === 'Escape') setSelected(null);
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  return (
    <section className="gallery-section" aria-label="Galeria da clínica">
      <div className="gallery-grid">
        {assets.gallery.map((image, index) => (
          <button type="button" className={`gallery-item gallery-item--${index + 1}`} key={image} onClick={() => setSelected(index)} aria-label={`Ampliar imagem ${index + 1} da clínica`}>
            <img src={image} alt={`IL Odontologia e Estética — ambiente ${index + 1}`} loading="lazy" />
            <span>0{index + 1}</span>
          </button>
        ))}
      </div>
      {selected !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Imagem ampliada" onClick={() => setSelected(null)}>
          <button type="button" aria-label="Fechar imagem" onClick={() => setSelected(null)}><CloseIcon /></button>
          <img src={assets.gallery[selected]} alt={`Ambiente ampliado ${selected + 1} da IL Odontologia e Estética`} onClick={(event) => event.stopPropagation()} />
        </div>
      )}
    </section>
  );
}

function Agreements() {
  return (
    <section className="section section--agreements" id="convenios">
      <div className="shell">
        <SectionLabel index="06">Convênios</SectionLabel>
        <div className="agreements-layout">
          <div>
            <h2>Seu convênio<br />pode estar aqui.</h2>
            <p>Consulte a disponibilidade com a clínica antes de iniciar o atendimento.</p>
          </div>
          <div className="agreement-list">
            {agreements.map((agreement) => (
              <div key={agreement.name} className={agreement.status !== 'Atendido' ? 'is-pending' : ''}>
                <strong>{agreement.name}</strong>
                <span>{agreement.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section className="section section--faq">
      <div className="shell faq-layout">
        <div className="faq-title">
          <SectionLabel index="07">Informação sem complicação</SectionLabel>
          <h2>Antes de falar com a clínica.</h2>
          <p>As respostas abaixo usam apenas informações já confirmadas ou explicitamente sinalizadas para validação.</p>
        </div>
        <div className="faq-list">
          {faqs.map((item, index) => (
            <details key={item.question} open={index === 0}>
              <summary><span>0{index + 1}</span><strong>{item.question}</strong><i>+</i></summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="section section--contact" id="contato">
      <div className="shell">
        <SectionLabel index="08" light>Contato & localização</SectionLabel>
        <div className="contact-layout">
          <div className="contact-copy">
            <p className="micro-label micro-label--light">Pronto para começar?</p>
            <h2>Seu próximo cuidado pode começar com uma conversa.</h2>
            <p>Fale com a IL Odontologia e Estética para tirar dúvidas e solicitar um horário.</p>
            <Button href={clinic.whatsapp} light external>Agendar pelo WhatsApp</Button>
          </div>
          <div className="contact-info">
            <a href={`tel:+${clinic.phoneRaw}`}>
              <span>Telefone</span>
              <strong>{clinic.phoneDisplay}</strong>
              <Arrow />
            </a>
            <a href={clinic.routeUrl} target="_blank" rel="noreferrer">
              <span>Endereço</span>
              <strong>{clinic.address}</strong>
              <small>{clinic.landmark}</small>
              <Arrow />
            </a>
            <div className="contact-info__note">
              <span>Horários</span>
              <p>{clinic.scheduleNote}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="contact-map">
        <iframe src={clinic.mapEmbed} title="Mapa da IL Odontologia e Estética" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        <a href={clinic.routeUrl} target="_blank" rel="noreferrer">Abrir rota <Arrow /></a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer__top">
        <Brand light />
        <div className="footer__nav">
          <p className="micro-label micro-label--light">Navegação</p>
          {navItems.map(([label, href]) => <a href={href} key={href}>{label}</a>)}
        </div>
        <div className="footer__nav">
          <p className="micro-label micro-label--light">Contato</p>
          <a href={clinic.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
          <a href={`tel:+${clinic.phoneRaw}`}>{clinic.phoneDisplay}</a>
          <a href={clinic.routeUrl} target="_blank" rel="noreferrer">Como chegar</a>
        </div>
      </div>
      <div className="shell footer__bottom">
        <p>© {new Date().getFullYear()} IL Odontologia e Estética.</p>
        <p>Site institucional · Limoeiro do Norte — CE</p>
      </div>
    </footer>
  );
}

function MobileActions() {
  const actions = useMemo(() => [
    { label: 'WhatsApp', href: clinic.whatsapp, icon: <WhatsAppIcon />, external: true },
    { label: 'Ligar', href: `tel:+${clinic.phoneRaw}`, icon: <PhoneIcon /> },
    { label: 'Rota', href: clinic.routeUrl, icon: <PinIcon />, external: true },
  ], []);

  return (
    <nav className="mobile-actions" aria-label="Ações rápidas">
      {actions.map((action) => (
        <a href={action.href} key={action.label} {...(action.external ? { target: '_blank', rel: 'noreferrer' } : {})}>
          {action.icon}<span>{action.label}</span>
        </a>
      ))}
    </nav>
  );
}

export default function App() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      });
    }, { threshold: 0.08 });

    document.querySelectorAll('.section, .smile-feature, .gallery-section').forEach((node) => {
      node.classList.add('reveal');
      observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <a className="skip-link" href="#conteudo">Ir para o conteúdo</a>
      <Header />
      <main id="conteudo">
        <Hero />
        <TrustTicker />
        <About />
        <Treatments />
        <SmileFeature />
        <Specialists />
        <Experience />
        <Testimonials />
        <Gallery />
        <Agreements />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <MobileActions />
    </>
  );
}
