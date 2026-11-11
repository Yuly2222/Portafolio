/**
 * Contenido del sitio. Edita los textos aquí; las fotos se agregan
 * directamente en las carpetas de /public/images (ver README.md).
 */

export const siteConfig = {
  name: "Yuly Dayana Rodríguez Salcedo",
  role: "Fotógrafa",
  heroTitle: "Portafolio",
  heroSubtitle: "Fotográfico y Artístico",
  bio: "Gestora cultural apasionada por la fotografía y las artes plásticas. Mi dominio de diversas técnicas y mi sensibilidad creativa acompañan una trayectoria fotográfica reciente, construida con disciplina, mirada artística y dedicación.",  availability:
    "Actualmente disponible para colaborar en sesiones, proyectos editoriales y encargos personalizados.",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "yuly.rodriguez@corporacioncotambora.onmicrosoft.com",
  instagramUrl:
    process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://instagram.com/cotambora",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

export type Category = {
  slug: string;
  label: string;
  /** Color de acento en hex, usado en el título de la sección. */
  accent: string;
};

/**
 * Categorías del portafolio. Para agregar una nueva:
 * 1. Añade un objeto aquí con un slug único (sin espacios ni acentos).
 * 2. Crea la carpeta public/images/<slug>/ y coloca ahí las fotos.
 * La sección y el menú de navegación se generan solos.
 */
export const categories: Category[] = [
  { slug: "retratos", label: "Retratos", accent: "#ffb5f3" },
  { slug: "festivales", label: "Festivales", accent: "#ff2f92" },
  { slug: "urbano", label: "Urbano", accent: "#ffb5f3" },
  
];

export type TimelineEntry = {
  year: number;
  title: string;
  description: string;
};

/**
 * Recorrido / trayectoria artística, mostrado después de las fotos.
 * Para agregar un logro nuevo, añade un objeto al arreglo (en
 * cualquier posición): la lista se ordena sola por año.
 */
export const timeline: TimelineEntry[] = [
  {
    year: 2020,
    title: "Cota se cuenta en copla",
    description: "Premio 1er lugar y diseño de portada del libro",
  },
  {
    year: 2021,
    title: "Antología poética",
    description: "Mención de honor",
  },
  {
    year: 2021,
    title: "Día artístico Secretaría de Cultura",
    description: "Diploma de participación",
  },
  {
    year: 2021,
    title: "Noche del arte y cultura",
    description: "Mejor estudiante de artes plásticas",
  },
  {
    year: 2021,
    title: "Cuerpos y palabras",
    description: "Mención de honor y dos apariciones en el libro",
  },
  {
    year: 2022,
    title: "Antología Narrativa",
    description: "Premio tercer puesto",
  },
  {
    year: 2022,
    title: "XI Festival Matices de Cota",
    description: "Mención de honor y aparición en libro",
  },
  {
    year: 2022,
    title: "XI Festival Matices de Cota",
    description: "Mención de honor y aparición en libro",
  },
  {
    year: 2023,
    title: "Participación muralismo Cota",
    description: "Mural actualmente en exhibición detrás de la iglesia",
  },
  {
    year: 2023,
    title: "Ensamble de jazz",
    description: "Participación por ser estudiante distinguida en piano",
  },
  {
    year: 2024,
    title: "Tuna Hispana",
    description: "Participación en varios encuentros de tunas",
  },
  {
    year: 2025,
    title: "Festival de la Hortaliza",
    description: "Participación en comparsas",
  },
  {
    year: 2025,
    title: "1er Festival de Comparsas Girardot",
    description: "Participación en comparsas",
  },
  {
    year: 2025,
    title: "XXVIII Bandas Musicales Anapoima",
    description: "Participación en comparsas",
  },
  {
    year: 2025,
    title: "XXVII Festival de Teatro Tenjo",
    description: "Participación en comparsas",
  },
  {
    year: 2026,
    title: "II Festival de la Hortaliza — Orquesta Tropical",
    description: "Participación como fotógrafa",
  },
  {
    year: 2026,
    title: "II Festival de la Hortaliza — Boration Rock",
    description: "Participación como fotógrafa",
  },
  {
    year: 2026,
    title: "II Festival de la Hortaliza — Cotaverso Teatro",
    description: "Participación como logística y fotógrafa",
  },
  {
    year: 2026,
    title: "Festival Luna Roja Colegio Jose Joaquin Casas — Cotaverso Teatro",
    description: "Participación como logística y fotógrafa",
  },
];
