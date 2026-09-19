# Portafolio Fotográfico

Sitio de portafolio para fotografía construido con [Next.js](https://nextjs.org) (App Router) + TypeScript + Tailwind CSS. Diseño inspirado en [este portafolio de Behance](https://www.behance.net/gallery/252798533/Portafolio-fotografico): fondo oscuro, tipografía grande en mayúsculas y grids de foto a pantalla completa.

Pensado para que agregar fotos, textos y categorías nuevas sea tan simple como copiar archivos — sin panel de administración ni base de datos.

## Cómo funciona el contenido

### Agregar fotos

Las fotos **no se registran en ningún archivo de código**: el sitio lee automáticamente todo lo que encuentre dentro de cada carpeta de categoría.

```
public/images/
├── hero/        ← 1 foto de portada (la primera que encuentre, opcional)
├── retratos/
├── estudio/
├── urbano/
└── editorial/
```

Para agregar una foto: copia el archivo (`.jpg`, `.jpeg`, `.png`, `.webp` o `.avif`) dentro de la carpeta de la categoría correspondiente. Nada más. Al recargar la página (o al hacer el próximo deploy) ya aparece en el grid.

- **Orden**: las fotos se ordenan alfabéticamente por nombre de archivo. Usa prefijos como `01-`, `02-`, `03-` si quieres controlar el orden.
- **Texto alternativo (accesibilidad/SEO)**: se genera del nombre de archivo (quita el prefijo numérico y cambia `-`/`_` por espacios). `03-retrato-ventana.jpg` → "retrato ventana". Nombra tus archivos pensando en esto.
- **Portada (hero)**: si `public/images/hero/` está vacía, se muestra un fondo con degradado usando los colores de acento de tus categorías — el sitio nunca se ve "roto" sin fotos.
- **Calidad y velocidad**: todas las imágenes pasan por [`next/image`](https://nextjs.org/docs/app/api-reference/components/image), que genera automáticamente versiones en WebP/AVIF, las redimensiona por dispositivo y las carga de forma diferida (excepto la foto de portada, que carga con prioridad). No necesitas comprimir ni redimensionar manualmente, aunque subir originales muy pesados (>5 MB) sigue sin ser buena idea.

### Agregar o editar texto

Todo el texto del sitio (nombre, bio, disponibilidad, categorías) vive en un solo archivo:

📄 [`src/data/site.ts`](src/data/site.ts)

Edítalo con tu información. Está comentado y es el único lugar que necesitas tocar para cambiar textos.

### Agregar una categoría nueva

1. Agrega un objeto al arreglo `categories` en [`src/data/site.ts`](src/data/site.ts):
   ```ts
   { slug: "bodas", label: "Bodas", accent: "#ff5a3d" }
   ```
2. Crea la carpeta `public/images/bodas/` y coloca ahí tus fotos.

La sección, el menú de navegación y el grid se generan solos a partir de esa lista.

## Desarrollo local

Requiere Node.js 20+.

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Variables de entorno

Copia `.env.example` a `.env.local` (este archivo no se sube a git):

```bash
cp .env.example .env.local
```

| Variable | Uso | Obligatoria |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL pública del sitio, usada para metadatos SEO/Open Graph | No (default `http://localhost:3000`) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Email que se muestra en la sección de contacto | No |
| `NEXT_PUBLIC_INSTAGRAM_URL` | Link a tu Instagram | No |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número de WhatsApp (solo dígitos, con código de país). Vacío = no se muestra | No |

Si no defines ninguna, el sitio funciona igual con los valores de ejemplo definidos en `src/data/site.ts`.

## Despliegue en Vercel

1. Sube este repositorio a GitHub.
2. En [vercel.com](https://vercel.com), importa el repositorio (Next.js se detecta automáticamente, no requiere configuración adicional).
3. En **Project Settings → Environment Variables**, agrega las mismas variables de `.env.example` con tus datos reales.
4. Deploy. En cada push a la rama principal, Vercel vuelve a construir el sitio y toma las fotos que estén en `public/images/`.

## Stack y decisiones técnicas

- **Next.js App Router + TypeScript** — despliegue sin configuración en Vercel, React Server Components para no enviar JS innecesario al cliente.
- **Tailwind CSS v4** — estilos utilitarios, tema oscuro definido en [`src/app/globals.css`](src/app/globals.css).
- **`next/image`** — optimización, formatos modernos y carga diferida de imágenes sin librerías externas.
- **`fs` (Node stdlib)** en [`src/lib/photos.ts`](src/lib/photos.ts) — lee las carpetas de `public/images` en build time; es lo que permite agregar fotos sin tocar código.
- **`<dialog>` nativo** en [`src/components/Lightbox.tsx`](src/components/Lightbox.tsx) — visor de foto a pantalla completa usando el elemento nativo del navegador (manejo de foco y tecla Escape incluidos), sin librería de modales.
- **`lucide-react`** — íconos (el logo de Instagram se implementó a mano porque las librerías de íconos ya no incluyen logos de marcas).

## Estructura del proyecto

```
src/
├── app/                  # Layout, página principal y estilos globales
├── components/           # Header, Hero, Bio, CategorySection, PhotoGrid, Lightbox, Footer
├── data/site.ts          # Todo el texto + lista de categorías (edítalo aquí)
└── lib/photos.ts         # Lectura automática de public/images/
public/images/            # Tus fotos, organizadas por categoría
```
