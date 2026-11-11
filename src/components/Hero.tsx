import Image from "next/image";
import { siteConfig, categories } from "@/data/site";
import { getHeroPhoto } from "@/lib/photos";

export default function Hero() {
  const hero = getHeroPhoto();

  return (
    <section
      id="top"
      className="relative flex flex-col justify-end overflow-hidden pt-20 md:h-[92vh] md:min-h-[520px] md:pt-0"
    >
      {/* Móvil: la foto va en su propia franja 2:1 (la del hero actual) para que
          se vea completa; desde md ocupa toda la sección como fondo. */}
      <div className="relative aspect-[2/1] w-full md:absolute md:inset-0 md:aspect-auto">
        {hero ? (
          <Image
            src={hero.src}
            alt={hero.alt || siteConfig.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at 30% 20%, ${categories[0]?.accent ?? "#c6ff3d"}22, transparent 55%), radial-gradient(circle at 80% 70%, ${categories[1]?.accent ?? "#ff2f92"}22, transparent 55%), #08090d`,
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-background/60" />
      </div>

      <div className="relative z-10 px-6 pb-12 pt-6 md:px-10 md:pb-24 md:pt-0">
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-muted">
          {siteConfig.name}
        </p>
        <h1 className="font-display uppercase leading-[0.9] tracking-tight text-[13vw] sm:text-7xl md:text-8xl lg:text-9xl">
          {siteConfig.heroTitle}
        </h1>
        <h2 className="font-display uppercase leading-[0.9] tracking-tight text-[8vw] sm:text-5xl md:text-6xl lg:text-7xl text-muted">
          {siteConfig.heroSubtitle}
        </h2>
      </div>
    </section>
  );
}
