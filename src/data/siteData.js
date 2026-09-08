export const clinic = {
  name: 'IL Odontologia e Estética',
  phoneDisplay: '(88) 99984-5437',
  phoneRaw: '5588999845437',
  whatsapp: 'https://wa.me/5588999845437?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20consulta%20na%20IL%20Odontologia%20e%20Est%C3%A9tica.',
  email: 'ilodontoestetica@gmail.com',
  address: 'Rua Cândido Olímpio, 1920, Centro, Limoeiro do Norte - CE',
  landmark: 'Castelo, próximo ao Instituto dos Olhos',
  routeUrl: 'https://www.google.com/maps/search/?api=1&query=Rua%20C%C3%A2ndido%20Ol%C3%ADmpio%2C%201920%2C%20Centro%2C%20Limoeiro%20do%20Norte%20-%20CE',
  wazeUrl: 'https://waze.com/ul?q=Rua%20C%C3%A2ndido%20Ol%C3%ADmpio%201920%20Limoeiro%20do%20Norte',
  mapEmbed: 'https://www.google.com/maps?q=Rua%20C%C3%A2ndido%20Ol%C3%ADmpio%2C%201920%2C%20Centro%2C%20Limoeiro%20do%20Norte%20-%20CE&output=embed',
  patients: '1.000+',
  rating: '5.0',
  reviewsCount: 'Google Avaliações',
  hours: [
    { days: 'Segunda a Quarta', time: '08:00 às 12:00 · 13:00 às 20:00' },
    { days: 'Quinta-feira', time: '08:00 às 12:00 · 13:00 às 20:00' },
    { days: 'Sexta-feira', time: '08:00 às 12:00 · 13:00 às 18:00' },
    { days: 'Sábado', time: '08:00 às 12:00' },
  ],
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
    name: 'Odontologia estética',
    description: 'Planejamento estético personalizado, respeitando proporções, naturalidade e saúde bucal com facetas, lentes e clareamento.',
  },
  {
    name: 'Implante dentário',
    description: 'Reabilitação para recuperar função mastigatória, estabilidade e segurança completa ao sorrir.',
  },
  {
    name: 'Ortodontia & Alinhadores',
    description: 'Alinhamento funcional e correção da oclusão com abordagens modernas, discretas e confortáveis.',
  },
  {
    name: 'Limpeza dental',
    description: 'Prevenção e manutenção da saúde bucal com acompanhamento profissional minucioso e profilaxia avançada.',
  },
  {
    name: 'Tratamento de canal',
    description: 'Tratamento endodôntico para preservar a estrutura natural do dente, controlar desconfortos e evitar complicações.',
  },
  {
    name: 'Odontopediatria',
    description: 'Cuidado odontológico para crianças com acolhimento afetivo e foco em saúde preventiva desde cedo.',
  },
  {
    name: 'Extração dentária',
    description: 'Conduta cuidadosa e planejamento individualizado para casos em que a remoção do dente é estritamente necessária.',
  },
];

const ismaelPlaceholder = "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20800%201000'%3E%3Crect%20width='800'%20height='1000'%20fill='%23191A1D'/%3E%3Ccircle%20cx='400'%20cy='420'%20r='150'%20fill='none'%20stroke='%23C5A880'%20stroke-width='2'/%3E%3Ctext%20x='400'%20y='458'%20text-anchor='middle'%20fill='%23C5A880'%20font-family='Georgia'%20font-size='118'%3EIS%3C/text%3E%3Ctext%20x='400'%20y='650'%20text-anchor='middle'%20fill='%23FFFFFF'%20font-family='Arial'%20font-size='26'%20letter-spacing='4'%3ERETRATO%20EM%20ATUALIZA%C3%87%C3%83O%3C/text%3E%3C/svg%3E";

export const specialists = [
  {
    name: 'Dra. Layla Beatriz',
    specialty: 'Cirurgiã-dentista clínica geral, pós-graduada em estética dental.',
    cro: 'CRO-CE',
    image: assets.team[0],
  },
  {
    name: 'Dr. Hugo Mota',
    specialty: 'Especialista em implantes e prótese dentária.',
    cro: 'CRO-CE',
    image: assets.team[1],
  },
  {
    name: 'Dra. Hanna Isa',
    specialty: 'Especialista em ortodontia (aparelhos dentários).',
    cro: 'CRO-CE',
    image: assets.team[2],
  },
  {
    name: 'Dr. Ismael Lima',
    specialty: 'Cirurgião-dentista com atuação em clínica geral, prevenção e atendimento humanizado. Mestrando em Saúde.',
    cro: 'CRO-CE',
    image: ismaelPlaceholder,
    photoPending: true,
  },
];

export const beforeAfterCases = [
  {
    id: 'lentes-facetas',
    title: 'Harmonização Estética & Lentes',
    category: 'Odontologia Estética',
    badge: 'Caso Clínico Real',
    description: 'Planejamento digital com refinamento de proporções, iluminação de cor e acabamento em harmonia com os traços faciais.',
    details: 'Devolução de simetria e alinhamento do sorriso com preservação da estrutura dental.',
    image: assets.gallery[0],
    whatsappMsg: 'Olá! Vi o caso de Harmonização e Lentes no site da IL e gostaria de saber mais sobre essa avaliação.',
  },
  {
    id: 'reabilitacao-diastema',
    title: 'Fechamento de Espaços & Diastema',
    category: 'Reabilitação do Sorriso',
    badge: 'Precisão Anatômica',
    description: 'Fechamento de diastema anterior e restabelecimento da morfologia dental natural com cerâmica de alta durabilidade.',
    details: 'Recuperação do ponto de contato e da curvatura estética do sorriso.',
    image: assets.gallery[3],
    whatsappMsg: 'Olá! Vi a transformação de fechamento de diastema no site e gostaria de agendar uma consulta.',
  },
  {
    id: 'clareamento-microestetica',
    title: 'Clareamento & Microestética',
    category: 'Estética & Saúde',
    badge: 'Naturalidade',
    description: 'Protocolo de clareamento guiado aliado a ajustes anatômicos finos para vitalidade e luminosidade natural.',
    details: 'Brilho uniforme e dentes naturalmente destacados sem sensibilidade.',
    image: assets.gallery[1],
    whatsappMsg: 'Olá! Gostaria de agendar uma consulta para avaliação de clareamento na IL Odontologia.',
  },
  {
    id: 'simetria-gengival',
    title: 'Contorno & Simetria Dental',
    category: 'Estética & Prótese',
    badge: 'Harmonia Completa',
    description: 'Alinhamento tridimensional da linha do sorriso e correção de desníveis funcionais e estéticos.',
    details: 'Equilíbrio funcional entre estética dos dentes e arco do sorriso.',
    image: assets.gallery[2],
    whatsappMsg: 'Olá! Gostaria de saber mais sobre o tratamento de alinhamento e simetria do sorriso.',
  },
];

export const testimonials = [
  {
    name: 'Taianne Coelho',
    quote: 'São profissionais extremamente comprometidos com o cliente. Não poderia deixar de falar sobre a dedicação, qualidade dos materiais, organização e conhecimento em cada procedimento. Amei ser atendida!',
    rating: 5,
    tag: 'Paciente Verificada',
  },
  {
    name: 'Sirley Lima',
    quote: 'Minha experiência foi ótima desde o atendimento on-line até a consulta. Confesso que tinha um pouquinho de medo de ir ao dentista, mas a Dra. Layla é super atenciosa e tem muita empatia.',
    rating: 5,
    tag: 'Paciente Verificada',
  },
  {
    name: 'Cosme Silva',
    quote: 'Me senti em casa, fiquei à vontade! Atendimento de ótima qualidade, profissionais altamente capacitados, um ambiente muito aconchegante. Me senti muito bem desde a hora da espera. Recomendo!',
    rating: 5,
    tag: 'Paciente Verificado',
  },
];

export const agreements = [
  { name: 'Bradesco Dental', status: 'Atendido' },
  { name: 'Brasil Dental', status: 'Atendido' },
  { name: 'Odontoprev', status: 'Atendido' },
  { name: 'MetLife', status: 'Em breve' },
];

export const trustItems = [
  'Atendimento personalizado e acolhedor',
  'Corpo clínico com especialistas dedicados',
  'Ambiente confortável e tecnologia precisa',
  'Saúde e estética integradas em um só lugar',
];