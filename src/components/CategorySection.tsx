import type { Category } from "@/data/site";
import type { Photo } from "@/lib/photos";
import PhotoGrid from "@/components/PhotoGrid";

export default function CategorySection({
  category,
  photos,
}: {
  category: Category;
  photos: Photo[];
}) {
  return (
    <section id={category.slug} className="py-14 md:py-20">
      <div className="flex items-center gap-4 px-6 pb-6 md:px-10 md:pb-8">
        <span
          className="h-3 w-3 shrink-0 rounded-full"
          style={{ backgroundColor: category.accent }}
        />
        <h2 className="font-display uppercase leading-none text-4xl sm:text-5xl md:text-6xl">
          {category.label}
        </h2>
      </div>

      <PhotoGrid
        photos={photos}
        emptyHint={`Aún no hay fotos aquí. Agrégalas en public/images/${category.slug}/`}
      />
    </section>
  );
}
