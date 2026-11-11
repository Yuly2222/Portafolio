import { Mail, Phone } from "lucide-react";
import { siteConfig } from "@/data/site";
import InstagramIcon from "@/components/icons/InstagramIcon";

export default function Bio() {
  return (
    <section className="grid gap-10 px-6 py-20 md:grid-cols-2 md:px-10 md:py-28">
      <div className="reveal">
        <p className="text-sm uppercase tracking-[0.3em] text-muted">
          {siteConfig.role}
        </p>
        <p className="mt-4 max-w-prose text-xl leading-relaxed sm:text-2xl">
          {siteConfig.bio}
        </p>
      </div>

      <div id="contacto" className="reveal flex flex-col justify-end gap-6">
        <p className="max-w-prose text-muted">{siteConfig.availability}</p>

        <div className="flex flex-col gap-3 text-sm">
          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 hover:text-muted"
          >
            <InstagramIcon size={18} />
            {siteConfig.instagramUrl.replace(/^https?:\/\/(www\.)?/, "")}
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="flex items-center gap-3 hover:text-muted"
          >
            <Mail size={18} />
            {siteConfig.email}
          </a>
          {siteConfig.whatsappNumber && (
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber.replace(/\D/g, "")}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 hover:text-muted"
            >
              <Phone size={18} />
              {siteConfig.whatsappNumber}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
