"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Photo } from "@/lib/photos";

export default function Lightbox({
  photos,
  index,
  onClose,
  onIndexChange,
}: {
  photos: Photo[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const open = index !== null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        onIndexChange(((index as number) + 1) % photos.length);
      } else if (event.key === "ArrowLeft") {
        onIndexChange(((index as number) - 1 + photos.length) % photos.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, index, photos.length, onIndexChange]);

  const photo = index !== null ? photos[index] : null;

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="m-auto max-h-dvh max-w-none bg-transparent p-0 open:flex open:motion-safe:animate-fade-in"
    >
      {photo && (
        <div
          // Cualquier toque fuera de la foto y de los botones cierra.
          onClick={(event) => {
            if (!(event.target as HTMLElement).closest("img, button")) onClose();
          }}
          className="relative flex h-dvh w-screen items-center justify-center p-4 md:p-10"
        >
          <button
            type="button"
            aria-label="Cerrar"
            onClick={onClose}
            className="absolute right-4 top-4 text-white/80 hover:text-white"
          >
            <X size={28} />
          </button>

          {photos.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Anterior"
                onClick={() =>
                  onIndexChange(((index as number) - 1 + photos.length) % photos.length)
                }
                className="absolute left-2 top-1/2 -translate-y-1/2 text-white/80 hover:text-white md:left-6"
              >
                <ChevronLeft size={32} />
              </button>
              <button
                type="button"
                aria-label="Siguiente"
                onClick={() => onIndexChange(((index as number) + 1) % photos.length)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white/80 hover:text-white md:right-6"
              >
                <ChevronRight size={32} />
              </button>
            </>
          )}

          {/* Sin `fill`: la caja del <img> mide lo mismo que la foto visible,
              así el área vacía alrededor sí cuenta como "fuera". */}
          <Image
            src={photo.src}
            alt={photo.alt}
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto max-h-full w-auto max-w-full object-contain"
            quality={90}
          />
        </div>
      )}
    </dialog>
  );
}
