/**
 * Estructura de datos del ecosistema Distrito Nortech.
 * Estas interfaces son el contrato para el futuro CMS/API y el panel /admin.
 * Todo el contenido en /src/data es PLACEHOLDER de estructura, no información real.
 */

export type OrganizationType =
  | "Startup"
  | "Empresa"
  | "Universidad"
  | "Institución"
  | "Inversionista"
  | "Organización"
  | "Talento"
  | "Centro de investigación"
  | "Coworking"
  | "Comunidad"
  | "Otro";

export type StartupStage =
  | "Idea"
  | "Pre-seed"
  | "Seed"
  | "Early stage"
  | "Growth"
  | "Scaleup";

export interface Organization {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  cover?: string;
  type: OrganizationType;
  description: string;
  longDescription?: string;
  sectors: string[];
  services: string[];
  technologies: string[];
  city: string;
  address?: string;
  website?: string;
  email?: string;
  phone?: string;
  socialLinks?: { label: string; url: string }[];
  latitude?: number;
  longitude?: number;
  stage?: StartupStage;
  verified: boolean;
  featured: boolean;
  placeholder: true;
  connections?: string[];
}

export interface TalentProfile {
  id: string;
  slug: string;
  role: string;
  specialty: string;
  city: string;
  skills: string[];
  seniority: string;
  placeholder: true;
}

export interface EcosystemEvent {
  id: string;
  slug: string;
  title: string;
  date: string;
  time: string;
  city: string;
  venue: string;
  organizer: string;
  category: string;
  description: string;
  speakers: string[];
  registrationUrl?: string;
  placeholder: true;
}

export interface Opportunity {
  id: string;
  slug: string;
  title: string;
  organization: string;
  category: "Convocatorias" | "Empleo" | "Eventos" | "Inversión" | "Formación" | "Programas";
  audience: string[];
  deadline: string;
  location: string;
  status: "Abierta" | "Próximamente" | "Cerrada";
  description: string;
  placeholder: true;
}

export interface Challenge {
  id: string;
  slug: string;
  title: string;
  area: string;
  problem: string;
  context: string;
  data: string;
  objective: string;
  owner: string;
  deadline: string;
  status: "Abierto" | "En evaluación" | "Cerrado";
  solutionsReceived: number;
  placeholder: true;
}

export interface PodcastEpisode {
  id: string;
  slug: string;
  number: number;
  title: string;
  guest: string;
  role: string;
  date: string;
  duration: string;
  description: string;
  tags: string[];
  youtubeUrl?: string;
  spotifyUrl?: string;
  chapters?: { time: string; label: string }[];
  placeholder: true;
}

export interface VideoItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  source: "YouTube" | "Instagram" | "Facebook" | "TikTok" | "Spotify";
  duration: string;
  date: string;
  placeholder: true;
}

export interface Story {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  author: string;
  date: string;
  readingTime: string;
  placeholder: true;
}

export interface Partner {
  id: string;
  name: string;
  category: string;
  scope: "Regional" | "Nacional" | "Internacional";
  logo?: string;
  placeholder?: boolean;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  area: string;
  status: string;
  organizations: string[];
  description: string;
  placeholder: true;
}

export interface Metric {
  key: string;
  label: string;
  value: number | null;
  suffix?: string;
  note: string;
}
