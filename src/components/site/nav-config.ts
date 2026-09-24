export interface NavItem {
  label: string;
  to: string;
  hash?: string;
  description?: string;
}

export interface NavGroup {
  label: string;
  to?: string;
  items?: NavItem[];
}

export const NAV: NavGroup[] = [
  {
    label: "Ecosistema",
    items: [
      { label: "Directorio", to: "/directorio", description: "Busca y filtra todos los actores" },
      { label: "Startups", to: "/startups", description: "Empresas de base tecnológica" },
      { label: "Empresas", to: "/empresas", description: "Tejido empresarial e innovación" },
      { label: "Talento", to: "/talento", description: "Profesionales tech de la región" },
      { label: "Universidades", to: "/universidades", description: "Academia y centros de investigación" },
      { label: "Inversionistas", to: "/inversion", description: "Capital para crecer" },
      { label: "Instituciones", to: "/instituciones", description: "Sector público y gremios" },
      { label: "Aliados", to: "/aliados", description: "Red de capacidades conectadas" },
    ],
  },
  {
    label: "Oportunidades",
    items: [
      { label: "Convocatorias", to: "/convocatorias", description: "Abiertas y próximas" },
      { label: "Eventos", to: "/eventos", description: "Agenda del ecosistema" },
      { label: "Empleo", to: "/empleo", description: "Vacantes tech regionales" },
      { label: "Inversión", to: "/inversion", description: "Fondos e instrumentos" },
      { label: "Programas", to: "/programas", description: "Rutas de acompañamiento" },
    ],
  },
  {
    label: "Innovación",
    items: [
      { label: "Retos regionales", to: "/retos", description: "Problemas que buscan solución" },
      { label: "Innovación abierta", to: "/innovacion", hash: "innovacion-abierta", description: "Empresa + ecosistema" },
      { label: "Proyectos", to: "/innovacion", hash: "proyectos", description: "Iniciativas en curso" },
      { label: "Ciencia y tecnología", to: "/innovacion", hash: "ciencia-tecnologia", description: "Investigación aplicada" },
      { label: "Tecnologías emergentes", to: "/innovacion", hash: "tecnologias-emergentes", description: "AI, Data, IoT y más" },
    ],
  },
  {
    label: "Contenido",
    items: [
      { label: "Voces del NorTech", to: "/podcast", description: "El podcast del ecosistema" },
      { label: "Videos", to: "/videos", description: "Contenido audiovisual" },
      { label: "Historias", to: "/historias", description: "Casos que inspiran" },
      { label: "Noticias", to: "/noticias", description: "Actualidad regional" },
    ],
  },
  { label: "Datos", to: "/datos" },
  { label: "Mapa", to: "/mapa" },
  { label: "Nosotros", to: "/nosotros" },
];

export const FOOTER_COLUMNS = [
  {
    title: "Distrito Nortech",
    links: [
      { label: "Nosotros", to: "/nosotros" },
      { label: "Ecosistema", to: "/ecosistema" },
      { label: "Aliados", to: "/aliados" },
      { label: "Contacto", to: "/contacto" },
    ],
  },
  {
    title: "Ecosistema",
    links: [
      { label: "Startups", to: "/startups" },
      { label: "Empresas", to: "/empresas" },
      { label: "Talento", to: "/talento" },
      { label: "Academia", to: "/universidades" },
      { label: "Inversionistas", to: "/inversion" },
    ],
  },
  {
    title: "Oportunidades",
    links: [
      { label: "Convocatorias", to: "/convocatorias" },
      { label: "Eventos", to: "/eventos" },
      { label: "Empleo", to: "/empleo" },
      { label: "Inversión", to: "/inversion" },
    ],
  },
  {
    title: "Contenido",
    links: [
      { label: "Voces del NorTech", to: "/podcast" },
      { label: "Videos", to: "/videos" },
      { label: "Historias", to: "/historias" },
      { label: "Noticias", to: "/noticias" },
    ],
  },
];

export const SOCIALS = [
  { label: "Instagram", url: "#" },
  { label: "YouTube", url: "#" },
  { label: "Spotify", url: "#" },
  { label: "LinkedIn", url: "#" },
  { label: "Facebook", url: "#" },
  { label: "TikTok", url: "#" },
];
