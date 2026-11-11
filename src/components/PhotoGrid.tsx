"use client";

import { useState } from "react";
import Image from "next/image";
import type { Photo } from "@/lib/photos";
import Lightbox from "@/components/Lightbox";

export default function PhotoGrid({
  photos,
  emptyHint,
}: {
  photos: Photo[];
  emptyHint: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (photos.length === 0) {
    return (
      <div className="mx-6 rounded border border-dashed border-white/15 px-6 py-16 text-center text-sm text-muted md:mx-10">
        {emptyHint}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-1 px-1 sm:grid-cols-3 lg:grid-cols-4">
        {photos.map((photo, index) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setOpenIndex(index)}
            className="reveal group relative aspect-[4/5] overflow-hidden bg-white/5"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      <Lightbox
        photos={photos}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onIndexChange={setOpenIndex}
      />
    </>
  );
}
