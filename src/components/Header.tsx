"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { categories, siteConfig } from "@/data/site";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-40 flex items-center justify-between px-6 py-4 md:px-10 bg-background/80 backdrop-blur-sm">
      <a href="#top" className="font-display text-sm tracking-widest uppercase">
        {siteConfig.name}
      </a>

      <nav className="hidden md:flex items-center gap-8 text-sm uppercase tracking-wide text-muted">
        {categories.map((category) => (
          <a
            key={category.slug}
            href={`#${category.slug}`}
            className="hover:text-foreground transition-colors"
          >
            {category.label}
          </a>
        ))}
        <a href="#contacto" className="hover:text-foreground transition-colors">
          Contacto
        </a>
      </nav>

      <button
        type="button"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        onClick={() => setOpen((v) => !v)}
        className="md:hidden text-foreground"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {open && (
        <nav className="absolute top-full inset-x-0 flex flex-col gap-1 bg-background px-6 py-4 md:hidden border-t border-white/10">
          {categories.map((category) => (
            <a
              key={category.slug}
              href={`#${category.slug}`}
              onClick={() => setOpen(false)}
              className="py-2 uppercase tracking-wide text-muted hover:text-foreground"
            >
              {category.label}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={() => setOpen(false)}
            className="py-2 uppercase tracking-wide text-muted hover:text-foreground"
          >
            Contacto
          </a>
        </nav>
      )}
    </header>
  );
}
