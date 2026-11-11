import { timeline } from "@/data/site";
import Particles from "@/components/Particles";

export default function TimelineSection() {
  const sorted = [...timeline].sort((a, b) => a.year - b.year);
  const years = [...new Set(sorted.map((entry) => entry.year))];

  return (
    <section id="recorrido" className="relative py-14 md:py-20">
      {/* Más tenue que en el hero para no estorbar la lectura. El resto del
          contenido es `relative` para pintarse por encima del canvas. */}
      <Particles className="opacity-50" />

      <div className="reveal relative px-6 pb-10 md:px-10 md:pb-14">
        <h2 className="font-display uppercase leading-none text-4xl sm:text-5xl md:text-6xl">
          Recorrido
        </h2>
      </div>

      <table className="relative w-full border-collapse px-6 md:px-10">
        <tbody>
          {years.map((year) => (
            <tr key={year} className="reveal border-t border-white/15 align-top">
              <td className="w-20 py-5 pr-4 pl-6 font-display text-2xl text-muted sm:w-28 sm:text-3xl md:pl-10">
                {year}
              </td>
              <td className="py-5 pr-6 md:pr-10">
                <div className="flex flex-col gap-3">
                  {sorted
                    .filter((entry) => entry.year === year)
                    .map((entry, index) => (
                      <p key={index}>
                        <span className="font-medium">{entry.title}</span>
                        <span className="text-muted"> — {entry.description}</span>
                      </p>
                    ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
