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
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
      className="m-auto max-h-screen max-w-none bg-transparent p-0 open:flex"
    >
      {photo && (
        <div className="relative flex h-screen w-screen items-center justify-center p-4 md:p-10">
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

          <div className="relative h-full w-full">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="100vw"
              className="object-contain"
              quality={90}
            />
          </div>
        </div>
      )}
    </dialog>
  );
}
