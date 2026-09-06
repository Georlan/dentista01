export const clinic = {
  name: 'IL Odontologia e Estética',
  phoneDisplay: '(88) 99984-5437',
  phoneRaw: '5588999845437',
  whatsapp: 'https://wa.me/5588999845437?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20consulta%20na%20IL%20Odontologia%20e%20Est%C3%A9tica.',
  address: 'Rua Cândido Olímpio, 1920, Centro, Limoeiro do Norte - CE',
  landmark: 'Próximo ao Instituto dos Olhos',
  routeUrl: 'https://www.google.com/maps/search/?api=1&query=Rua%20C%C3%A2ndido%20Ol%C3%ADmpio%2C%201920%2C%20Centro%2C%20Limoeiro%20do%20Norte%20-%20CE',
  mapEmbed: 'https://www.google.com/maps?q=Rua%20C%C3%A2ndido%20Ol%C3%ADmpio%2C%201920%2C%20Centro%2C%20Limoeiro%20do%20Norte%20-%20CE&output=embed',
  patients: '1.000+',
  scheduleNote: 'Horários em validação antes da publicação. A fonte atual apresenta uma inconsistência no horário de quinta-feira.',
};

export const assets = {
  logo: 'https://res.cloudinary.com/codental/image/upload/f_auto,c_limit,w_900,q_auto/v1746218889/rp9pl5i46th9u9wrn18n.png',
  hero: 'https://res.cloudinary.com/codental/image/upload/f_auto,c_limit,w_2400,q_auto/v1746219123/lqikburaj8ucryc8sy00.jpg',
  about: 'https://res.cloudinary.com/codental/image/upload/f_auto,c_limit,w_1800,q_auto/v1746279228/qplzt0br4z541dyw7t2u.jpg',
  team: [
    'https://res.cloudinary.com/codental/image/upload/f_auto,c_fill,g_faces,w_900,h_1100,q_auto/eqllay8hqttraosehvpa',
    'https://res.cloudinary.com/codental/image/upload/f_auto,c_fill,g_faces,w_900,h_1100,q_auto/hhekpnll6ohvcer3wnqu',
    'https://res.cloudinary.com/codental/image/upload/f_auto,c_fill,g_faces,w_900,h_1100,q_auto/nvp6rvehetoo3sgeixqm',
  ],
  gallery: [
    'https://res.cloudinary.com/codental/image/upload/f_auto,c_limit,w_1800,q_auto/v1746280788/xefqks6xuwtnhwhcspln.jpg',
    'https://res.cloudinary.com/codental/image/upload/f_auto,c_limit,w_1800,q_auto/v1746280810/themq4qigywglyptomhg.png',
    'https://res.cloudinary.com/codental/image/upload/f_auto,c_limit,w_1800,q_auto/v1746280833/iqnxvou5fwdbjtq2m9hu.png',
    'https://res.cloudinary.com/codental/image/upload/f_auto,c_limit,w_1800,q_auto/v1746280852/bennez79zg81hvsnbnp2.png',
  ],
};

export const treatments = [
  {
    name: 'Extração dentária',
    description: 'Conduta cuidadosa e planejamento individual para resolver casos em que a remoção do dente é necessária.',
  },
  {
    name: 'Limpeza dental',
    description: 'Prevenção e manutenção da saúde bucal com acompanhamento profissional e atenção aos detalhes.',
  },
  {
    name: 'Implante dentário',
    description: 'Reabilitação para recuperar função, conforto e segurança ao sorrir.',
  },
  {
    name: 'Odontologia estética',
    description: 'Planejamento estético personalizado, respeitando proporções, naturalidade e saúde bucal.',
  },
  {
    name: 'Tratamento de canal',
    description: 'Tratamento para preservar o dente, controlar desconfortos e evitar complicações futuras.',
  },
  {
    name: 'Odontopediatria',
    description: 'Cuidado odontológico para crianças com abordagem acolhedora e foco em prevenção desde cedo.',
  },
];

export const specialists = [
  {
    name: 'Dra. Layla Beatriz',
    specialty: 'Cirurgiã-dentista clínica geral, pós-graduada em estética dental.',
    image: assets.team[0],
  },
  {
    name: 'Dr. Hugo Mota',
    specialty: 'Especialista em implantes e prótese dentária.',
    image: assets.team[1],
  },
  {
    name: 'Dra. Hanna Isa',
    specialty: 'Especialista em ortodontia.',
    image: assets.team[2],
  },
];

export const testimonials = [
  {
    name: 'Sirley Lima',
    quote: 'Minha experiência foi ótima desde o atendimento on-line até a consulta. Confesso que tinha um pouquinho de medo de ir ao dentista, mas a Dr Layla é super atenciosa, e tem muita empatia.',
  },
  {
    name: 'Cosme Silva',
    quote: 'Me senti em casa, fiquei à vontade! Atendimento de ótima qualidade, profissionais altamente capacitados, um ambiente muito aconchegante. Me senti muito bem desde a hora da espera. Recomendo!',
  },
];

export const agreements = [
  { name: 'Bradesco Dental', status: 'Atendido' },
  { name: 'Brasil Dental', status: 'Atendido' },
  { name: 'Odontoprev', status: 'Atendido' },
  { name: 'MetLife', status: 'Em validação' },
];

export const trustItems = [
  'Atendimento personalizado',
  'Profissionais especializados',
  'Tecnologia e conforto',
  'Odontologia e estética em um só lugar',
];
