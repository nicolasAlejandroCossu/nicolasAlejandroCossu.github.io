import Link from "next/link";
import RevealText from "@/components/ui/RevealText";
import FadeIn from "@/components/ui/FadeIn";
import Portrait from "@/components/ui/Portrait";
import Atmosphere from "@/components/ui/Atmosphere";
import { about } from "@/content/about";

export default function About() {
  return (
    <section id="about" className="relative min-h-[100svh] overflow-hidden bg-cotton px-6 py-24 md:px-10 md:py-32 lg:py-36">
      <Atmosphere
        grainOpacity={0.5}
        glows={[
          "-top-[18%] -left-[10%] h-[60vh] w-[60vh] bg-cherry/10 blur-[130px]",
        ]}
      />
      <div className="relative mx-auto max-w-[1400px]">
        <FadeIn>
          <span className="label block text-center text-cherry lg:text-left">
            About
          </span>
        </FadeIn>

        <div className="mt-12 grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <FadeIn className="flex justify-center lg:col-span-4 lg:block">
            <Portrait className="max-w-[17rem] lg:max-w-[20rem]" />
          </FadeIn>

          <div className="text-center lg:col-span-8 lg:text-left">
            <RevealText
              as="h2"
              className="mx-auto max-w-3xl text-center font-display text-[2rem] leading-[1.1] tracking-[-0.01em] md:text-4xl lg:mx-0 lg:text-left lg:text-5xl"
            >
              {about.headline}
            </RevealText>

            <div className="mx-auto mt-8 max-w-2xl space-y-4 lg:mx-0">
              {about.paragraphs.map((p, i) => (
                <FadeIn key={i} delay={i * 0.06}>
                  <p className="text-base leading-relaxed text-noir/70 md:text-lg">
                    {p}
                  </p>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.1}>
              <Link
                href="/story"
                className="group mt-9 inline-flex items-center gap-3 rounded-full border border-cherry/40 px-6 py-3 text-cherry transition-colors duration-300 hover:bg-cherry hover:text-cotton"
              >
                <span className="label">{about.fullStoryCta}</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
