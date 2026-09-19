/**
 * Contenido del sitio. Edita los textos aquí; las fotos se agregan
 * directamente en las carpetas de /public/images (ver README.md).
 */

export const siteConfig = {
  name: "Tu Nombre",
  role: "Fotógrafa",
  heroTitle: "Portafolio",
  heroSubtitle: "Fotográfico",
  bio: "Cuenta aquí quién eres, tu estilo y qué tipo de proyectos buscas. Este texto vive en src/data/site.ts, edítalo con tu propia biografía.",
  availability:
    "Actualmente disponible para colaborar en sesiones, proyectos editoriales y encargos personalizados.",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "tu@email.com",
  instagramUrl:
    process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://instagram.com/tuusuario",
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
  { slug: "retratos", label: "Retratos", accent: "#c6ff3d" },
  { slug: "estudio", label: "Estudio", accent: "#ff2f92" },
  { slug: "urbano", label: "Urbano", accent: "#3d9dff" },
  { slug: "editorial", label: "Editorial", accent: "#ffb23d" },
];
