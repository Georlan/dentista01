import { useEffect, useState } from 'react';
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
  ['Início', '#inicio'],
  ['A Clínica', '#clinica'],
  ['Tratamentos', '#tratamentos'],
  ['Especialistas', '#especialistas'],
  ['Convênios', '#convenios'],
  ['Contato', '#contato'],
];

function ArrowIcon({ direction = 'right' }) {
  const rotate = direction === 'left' ? 'rotate(180 12 12)' : undefined;
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <g transform={rotate}>
        <path d="M5 12h13M14 7l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M4 8h16M4 16h16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.4L3.5 20.5l1.4-4.2a8.5 8.5 0 1 1 15.6-4.6Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8.5 8.2c.2-.5.5-.5.8-.5h.5c.2 0 .4.1.5.4l.8 1.8c.1.3 0 .5-.2.7l-.6.8c-.2.2-.1.4 0 .6.6 1.1 1.5 2 2.6 2.6.2.1.4.2.6 0l.9-1c.2-.2.4-.3.7-.2l1.8.9c.3.1.4.3.4.5 0 .4-.2 1.3-.8 1.8-.5.5-1.2.8-2 .8-1.1 0-2.8-.6-4.7-2.2-2.2-1.8-3.5-4.5-3.5-5.8 0-.6.2-1.1.4-1.5.2-.3.5-.6.8-.7Z" fill="currentColor" />
    </svg>
  );
}

function QuoteIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <path d="M12 26c0-8 4-13 11-16l1.5 3c-4 2-6 5-6.5 9h6v14H12V26Zm20 0c0-8 4-13 11-16l1.5 3c-4 2-6 5-6.5 9h6v14H32V26Z" fill="currentColor" />
    </svg>
  );
}

function Brand({ inverse = false }) {
  return (
    <a className={`brand ${inverse ? 'brand--inverse' : ''}`} href="#inicio" aria-label="IL Odontologia e Estética - início">
      <img src={assets.logo} alt="IL Odontologia e Estética" />
    </a>
  );
}

function SectionHeading({ eyebrow, title, text, align = 'left', light = false }) {
  return (
    <div className={`section-heading section-heading--${align} ${light ? 'section-heading--light' : ''}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {text && <p className="section-copy">{text}</p>}
    </div>
  );
}

function PrimaryLink({ href, children, external = false, className = '' }) {
  return (
    <a
      className={`button button--primary ${className}`}
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
    >
      <span>{children}</span>
      <ArrowIcon />
    </a>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`site-header ${scrolled || menuOpen ? 'site-header--solid' : ''}`}>
      <div className="header-inner shell">
        <Brand inverse={!scrolled && !menuOpen} />
        <nav className="desktop-nav" aria-label="Navegação principal">
          {navItems.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a className="header-cta" href={clinic.whatsapp} target="_blank" rel="noreferrer">
          Agendar consulta
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>
      <div id="mobile-navigation" className={`mobile-panel ${menuOpen ? 'mobile-panel--open' : ''}`}>
        <nav aria-label="Navegação mobile">
          {navItems.map(([label, href], index) => (
            <a key={href} href={href} onClick={closeMenu}>
              <span>0{index + 1}</span>
              {label}
            </a>
          ))}
        </nav>
        <div className="mobile-panel__footer">
          <PrimaryLink href={clinic.whatsapp} external>Agendar pelo WhatsApp</PrimaryLink>
          <p>{clinic.address}</p>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <img className="hero__image" src={assets.hero} alt="Ambiente e atendimento da IL Odontologia e Estética" fetchPriority="high" />
      <div className="hero__overlay" />
      <div className="hero__grain" aria-hidden="true" />
      <div className="shell hero__content">
        <p className="hero__eyebrow">Odontologia & estética · Limoeiro do Norte</p>
        <h1 id="hero-title">Cuidado, saúde e estética para transformar o seu sorriso.</h1>
        <p className="hero__copy">Atendimento personalizado, profissionais especializados e uma experiência pensada para você se sentir seguro em cada etapa.</p>
        <div className="hero__actions">
          <PrimaryLink href={clinic.whatsapp} external>Agendar consulta</PrimaryLink>
          <a className="text-link text-link--light" href="#tratamentos">
            Conhecer tratamentos <ArrowIcon />
          </a>
        </div>
        <div className="hero__proof" aria-label="Indicador de confiança">
          <strong>{clinic.patients}</strong>
          <span>pacientes atendidos</span>
        </div>
      </div>
      <a className="hero__scroll" href="#confiança" aria-label="Rolar para conhecer a clínica">
        <span>Descobrir</span>
        <span className="hero__scroll-line" />
      </a>
    </section>
  );
}

function TrustBand() {
  return (
    <section className="trust-band" id="confiança" aria-label="Diferenciais da clínica">
      <div className="shell trust-band__grid">
        {trustItems.map((item, index) => (
          <div className="trust-item" key={item}>
            <span className="trust-item__number">0{index + 1}</span>
            <p>{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section section--about" id="clinica">
      <div className="shell about-grid">
        <div className="about-visual reveal">
          <div className="about-visual__frame">
            <img src={assets.about} alt="Clínica IL Odontologia e Estética" loading="lazy" />
          </div>
          <div className="about-visual__badge">
            <span>IL</span>
            <p>Saúde e estética com cuidado humano.</p>
          </div>
        </div>
        <div className="about-content reveal">
          <SectionHeading
            eyebrow="A clínica"
            title="Técnica, escuta e cuidado em cada detalhe."
            text="Na IL Odontologia e Estética, cada atendimento parte de uma conversa. Entender suas necessidades é o primeiro passo para construir um plano de tratamento coerente, seguro e personalizado."
          />
          <div className="about-editorial">
            <p>O cuidado combina saúde bucal e estética sem perder o que mais importa: honestidade, respeito e atenção à experiência de cada paciente.</p>
            <p>Da prevenção aos tratamentos mais complexos, a proposta é oferecer um ambiente acolhedor, profissionais preparados e decisões clínicas explicadas com clareza.</p>
          </div>
          <a className="text-link" href="#especialistas">Conheça nossos especialistas <ArrowIcon /></a>
        </div>
      </div>
    </section>
  );
}

function Treatments() {
  return (
    <section className="section section--treatments" id="tratamentos">
      <div className="shell treatments-intro">
        <SectionHeading
          eyebrow="Tratamentos"
          title="Um cuidado completo, pensado para cada fase do seu sorriso."
          text="Prevenção, reabilitação, estética e acompanhamento em uma jornada que respeita suas necessidades individuais."
        />
        <p className="section-index">02 / 06</p>
      </div>
      <div className="shell treatments-layout">
        <div className="treatments-visual">
          <img src={assets.gallery[0]} alt="Detalhe da estrutura da IL Odontologia e Estética" loading="lazy" />
          <div className="treatments-visual__caption">
            <span>Planejamento individual</span>
            <p>Saúde e estética caminhando juntas.</p>
          </div>
        </div>
        <div className="treatment-list">
          {treatments.map((treatment, index) => (
            <article className="treatment-row" key={treatment.name}>
              <div className="treatment-row__index">0{index + 1}</div>
              <div className="treatment-row__content">
                <h3>{treatment.name}</h3>
                <p>{treatment.description}</p>
              </div>
              <a href="#contato" aria-label={`Saiba mais sobre ${treatment.name}`}>
                <ArrowIcon />
              </a>
            </article>
          ))}
        </div>
      </div>
      <div className="shell treatments-footnote">
        <p>Arquitetura preparada para novas especialidades como ortodontia, próteses e clareamento após validação do portfólio.</p>
      </div>
    </section>
  );
}

function SmileStatement() {
  return (
    <section className="smile-statement" aria-labelledby="smile-title">
      <img src={assets.gallery[1]} alt="Detalhe do ambiente da clínica" loading="lazy" />
      <div className="smile-statement__overlay" />
      <div className="shell smile-statement__content">
        <p className="eyebrow eyebrow--light">Estética com propósito</p>
        <h2 id="smile-title">Seu sorriso faz parte de quem você é.</h2>
        <p>Estética e saúde devem caminhar juntas. Por isso, cada tratamento é planejado de forma individual, respeitando suas características e buscando resultados naturais.</p>
        <PrimaryLink href={clinic.whatsapp} external>Agendar uma avaliação</PrimaryLink>
      </div>
    </section>
  );
}

function Specialists() {
  return (
    <section className="section section--specialists" id="especialistas">
      <div className="shell specialists-heading">
        <SectionHeading
          eyebrow="Especialistas"
          title="Profissionais que unem conhecimento e proximidade."
          text="Uma equipe preparada para cuidar de diferentes necessidades, com atenção individual e diálogo claro durante todo o tratamento."
        />
      </div>
      <div className="shell specialist-grid">
        {specialists.map((person, index) => (
          <article className="specialist-card" key={person.name}>
            <div className="specialist-card__image">
              <img src={person.image} alt={`Foto de ${person.name}`} loading="lazy" />
              <div className="specialist-card__veil" />
              <span className="specialist-card__index">0{index + 1}</span>
            </div>
            <div className="specialist-card__body">
              <h3>{person.name}</h3>
              <p>{person.specialty}</p>
              <a href="#contato" className="text-link">Falar com a clínica <ArrowIcon /></a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  const points = [
    ['Acolhimento', 'Atendimento com escuta e atenção desde o primeiro contato.'],
    ['Conforto', 'Ambiente pensado para tornar sua visita mais tranquila.'],
    ['Planejamento', 'Cada caso é avaliado individualmente antes de qualquer decisão.'],
    ['Acompanhamento', 'Orientação profissional ao longo de todo o processo de cuidado.'],
  ];

  return (
    <section className="section section--experience">
      <div className="shell experience-grid">
        <div className="experience-copy">
          <SectionHeading
            eyebrow="Experiência do paciente"
            title="Cuidar bem também é fazer você se sentir bem."
            text="A experiência vai além do procedimento. Ela começa na recepção, passa pela clareza nas orientações e continua no acompanhamento profissional."
          />
          <div className="experience-points">
            {points.map(([title, copy], index) => (
              <div className="experience-point" key={title}>
                <span>0{index + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="experience-images" aria-label="Imagens da clínica">
          <img src={assets.gallery[2]} alt="Ambiente da IL Odontologia e Estética" loading="lazy" />
          <img src={assets.gallery[3]} alt="Detalhes da estrutura da clínica" loading="lazy" />
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const [active, setActive] = useState(0);
  const testimonial = testimonials[active];

  const move = (delta) => {
    setActive((current) => (current + delta + testimonials.length) % testimonials.length);
  };

  return (
    <section className="section section--testimonials" aria-labelledby="testimonials-title">
      <div className="shell testimonial-shell">
        <div className="testimonial-intro">
          <p className="eyebrow">Depoimentos reais</p>
          <h2 id="testimonials-title">Confiança construída na experiência.</h2>
          <div className="testimonial-controls" aria-label="Navegação de depoimentos">
            <button type="button" onClick={() => move(-1)} aria-label="Depoimento anterior"><ArrowIcon direction="left" /></button>
            <span>{String(active + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}</span>
            <button type="button" onClick={() => move(1)} aria-label="Próximo depoimento"><ArrowIcon /></button>
          </div>
        </div>
        <figure className="testimonial-card" aria-live="polite">
          <QuoteIcon />
          <blockquote>“{testimonial.quote}”</blockquote>
          <figcaption>{testimonial.name}</figcaption>
        </figure>
      </div>
    </section>
  );
}

function Gallery() {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (selected === null) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setSelected(null);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [selected]);

  return (
    <section className="section section--gallery" aria-labelledby="gallery-title">
      <div className="shell gallery-heading">
        <SectionHeading
          eyebrow="Galeria"
          title="Um espaço pensado para receber você."
          text="Conheça alguns detalhes da clínica, dos consultórios e do ambiente onde cada atendimento acontece."
        />
      </div>
      <div className="shell gallery-grid">
        {assets.gallery.map((image, index) => (
          <button
            className={`gallery-item gallery-item--${index + 1}`}
            type="button"
            key={image}
            onClick={() => setSelected(index)}
            aria-label={`Ampliar foto ${index + 1} da clínica`}
          >
            <img src={image} alt={`Foto ${index + 1} da IL Odontologia e Estética`} loading="lazy" />
            <span>0{index + 1}</span>
          </button>
        ))}
      </div>
      {selected !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Visualização ampliada da galeria" onClick={() => setSelected(null)}>
          <button className="lightbox__close" type="button" aria-label="Fechar imagem" onClick={() => setSelected(null)}><CloseIcon /></button>
          <img src={assets.gallery[selected]} alt={`Foto ${selected + 1} ampliada da clínica`} onClick={(event) => event.stopPropagation()} />
        </div>
      )}
    </section>
  );
}

function Agreements() {
  return (
    <section className="section section--agreements" id="convenios">
      <div className="shell agreements-grid">
        <div>
          <SectionHeading
            eyebrow="Convênios"
            title="Mais caminhos para cuidar do seu sorriso."
            text="Consulte a disponibilidade do seu convênio no momento do agendamento."
          />
          <p className="agreements-note">A disponibilidade pode variar conforme o tratamento. Confirme diretamente com a clínica.</p>
        </div>
        <div className="agreement-list">
          {agreements.map((agreement) => (
            <div className="agreement-row" key={agreement.name}>
              <span className="agreement-row__mark" aria-hidden="true" />
              <strong>{agreement.name}</strong>
              <span className={agreement.status === 'Em validação' ? 'status status--pending' : 'status'}>{agreement.status}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="final-cta" aria-labelledby="final-cta-title">
      <div className="final-cta__line" aria-hidden="true" />
      <div className="shell final-cta__inner">
        <p className="eyebrow eyebrow--light">Seu próximo passo</p>
        <h2 id="final-cta-title">Pronto para cuidar do seu sorriso?</h2>
        <p>Fale com a nossa equipe e encontre o melhor momento para sua avaliação.</p>
        <PrimaryLink href={clinic.whatsapp} external>Agendar consulta pelo WhatsApp</PrimaryLink>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="section section--contact" id="contato">
      <div className="shell contact-heading">
        <SectionHeading
          eyebrow="Contato & localização"
          title="Estamos em Limoeiro do Norte, perto de você."
          text="Entre em contato para tirar dúvidas, consultar convênios e agendar sua avaliação."
        />
      </div>
      <div className="shell contact-layout">
        <div className="contact-details">
          <div className="contact-detail">
            <span>Telefone & WhatsApp</span>
            <a href={`tel:+${clinic.phoneRaw}`}>{clinic.phoneDisplay}</a>
          </div>
          <div className="contact-detail">
            <span>Endereço</span>
            <p>{clinic.address}<br />{clinic.landmark}</p>
          </div>
          <div className="contact-detail contact-detail--validation">
            <span>Horário de atendimento</span>
            <p>{clinic.scheduleNote}</p>
          </div>
          <div className="contact-actions">
            <PrimaryLink href={clinic.whatsapp} external>Falar no WhatsApp</PrimaryLink>
            <a className="text-link" href={clinic.routeUrl} target="_blank" rel="noreferrer">Abrir rota <ArrowIcon /></a>
          </div>
        </div>
        <div className="contact-map">
          <iframe
            title="Mapa da IL Odontologia e Estética"
            src={clinic.mapEmbed}
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
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Brand inverse />
          <p>Cuidado odontológico com técnica, proximidade e respeito à sua história.</p>
        </div>
        <div className="footer-column">
          <h3>Navegação</h3>
          {navItems.slice(1).map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </div>
        <div className="footer-column">
          <h3>Tratamentos</h3>
          {treatments.slice(0, 5).map((treatment) => <a key={treatment.name} href="#tratamentos">{treatment.name}</a>)}
        </div>
        <div className="footer-column footer-column--contact">
          <h3>Contato</h3>
          <a href={`tel:+${clinic.phoneRaw}`}>{clinic.phoneDisplay}</a>
          <a href={clinic.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
          <p>{clinic.address}</p>
          <p className="footer-pending">Redes sociais: links pendentes de validação.</p>
        </div>
      </div>
      <div className="shell footer-bottom">
        <p>© {new Date().getFullYear()} IL Odontologia e Estética. Todos os direitos reservados.</p>
        <p>Política de privacidade · conteúdo a publicar</p>
      </div>
    </footer>
  );
}

function FloatingWhatsApp() {
  return (
    <a className="floating-whatsapp" href={clinic.whatsapp} target="_blank" rel="noreferrer" aria-label="Agendar consulta pelo WhatsApp">
      <WhatsAppIcon />
      <span>Agendar</span>
    </a>
  );
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#conteudo">Ir para o conteúdo</a>
      <Header />
      <main id="conteudo">
        <Hero />
        <TrustBand />
        <About />
        <Treatments />
        <SmileStatement />
        <Specialists />
        <Experience />
        <Testimonials />
        <Gallery />
        <Agreements />
        <FinalCta />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
