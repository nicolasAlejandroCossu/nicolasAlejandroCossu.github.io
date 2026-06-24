import FadeIn from "@/components/ui/FadeIn";
import RevealText from "@/components/ui/RevealText";
import Atmosphere from "@/components/ui/Atmosphere";
import { experience } from "@/content/experience";

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative min-h-[100svh] overflow-hidden bg-noir px-6 pb-16 pt-24 text-cotton md:px-10 md:pb-20 md:pt-32"
    >
      <Atmosphere
        glows={[
          "-top-[15%] -right-[10%] h-[65vh] w-[65vh] bg-cherry/20 blur-[140px]",
          "-bottom-[20%] -left-[12%] h-[55vh] w-[55vh] bg-maroon/20 blur-[150px]",
        ]}
      />
      <div className="relative mx-auto max-w-[1400px]">
        <div className="text-center lg:text-left">
          <FadeIn>
            <span className="label text-cherry">Experience</span>
          </FadeIn>
          <RevealText
            as="h2"
            className="mx-auto mt-6 max-w-3xl text-center font-display text-3xl leading-[1.08] tracking-[-0.01em] md:text-5xl lg:mx-0 lg:text-left"
          >
            I build systems thousands of people rely on.
          </RevealText>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-12 md:mt-16 lg:grid-cols-2 lg:gap-14">
          {experience.map((track) => (
            <FadeIn key={track.key}>
              <div className="mx-auto w-full max-w-md border-t border-cotton/15 pt-8 lg:max-w-none">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="label text-cherry">{track.label}</span>
                  <span className="label text-cotton/35">{track.period}</span>
                </div>
                <h3 className="mt-4 font-display text-3xl md:text-4xl">
                  {track.org}
                </h3>
                <p className="mt-1 text-cotton/60">{track.role}</p>
                <p className="mt-1 text-sm italic text-cotton/40">
                  {track.summary}
                </p>

                <ul className="mt-7 space-y-3.5 text-left">
                  {track.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-cotton/75">
                      <span className="shrink-0 text-cherry" aria-hidden>
                        —
                      </span>
                      <span className="leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
