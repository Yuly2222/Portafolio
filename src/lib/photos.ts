import fs from "node:fs";
import path from "node:path";

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

export type Photo = {
  src: string;
  alt: string;
};

function readImageDir(relativeDir: string): Photo[] {
  const fullPath = path.join(process.cwd(), "public", "images", relativeDir);
  if (!fs.existsSync(fullPath)) return [];

  return fs
    .readdirSync(fullPath)
    .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, "es"))
    .map((file) => ({
      src: `/images/${relativeDir}/${file}`,
      alt: filenameToAlt(file),
    }));
}

function filenameToAlt(file: string): string {
  return path
    .parse(file)
    .name.replace(/^\d+[\s_-]*/, "")
    .replace(/[-_]+/g, " ")
    .trim();
}

/** Lee todas las fotos de public/images/<slug>/, ordenadas por nombre de archivo. */
export function getCategoryPhotos(slug: string): Photo[] {
  return readImageDir(slug);
}

/** Primera imagen encontrada en public/images/hero/, o null si aún no hay ninguna. */
export function getHeroPhoto(): Photo | null {
  return readImageDir("hero")[0] ?? null;
}
