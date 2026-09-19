import { siteConfig } from "@/data/site";

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-white/10 px-6 py-8 text-sm text-muted md:px-10">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
        <a href={`mailto:${siteConfig.email}`} className="hover:text-foreground">
          {siteConfig.email}
        </a>
      </div>
    </footer>
  );
}
