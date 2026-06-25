import FadeIn from "@/components/ui/FadeIn";
import Atmosphere from "@/components/ui/Atmosphere";
import { capabilities } from "@/content/capabilities";

export default function Capabilities() {
  return (
    <section
      id="capabilities"
      className="relative min-h-[100svh] overflow-hidden border-t border-cotton/10 bg-noir px-6 py-24 text-cotton md:px-10 md:py-36"
    >
      <Atmosphere
        glows={[
          "-top-[18%] -left-[8%] h-[60vh] w-[60vh] bg-cherry/20 blur-[140px]",
          "-bottom-[22%] -right-[10%] h-[58vh] w-[58vh] bg-maroon/[0.18] blur-[150px]",
        ]}
      />
      <div className="relative mx-auto max-w-[1400px]">
        <div className="text-center lg:text-left">
          <FadeIn>
            <span className="label text-cherry">Capabilities</span>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h2 className="mx-auto mt-6 max-w-3xl font-display text-3xl leading-[1.08] tracking-[-0.01em] md:text-5xl lg:mx-0">
              Deepest in data and infrastructure, fluent across the rest of the
              stack.
            </h2>
          </FadeIn>
        </div>

        <div className="mt-14 md:mt-20">
          {capabilities.map((g) => (
            <FadeIn key={g.index}>
              <div className="grid grid-cols-1 gap-5 border-t border-cotton/12 py-10 text-center lg:grid-cols-12 lg:text-left">
                <div className="lg:col-span-1">
                  <span className="label text-cotton/35">{g.index}</span>
                </div>
                <div className="lg:col-span-4">
                  <h3 className="font-display text-2xl md:text-3xl">
                    {g.title}
                  </h3>
                  <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-cotton/55 lg:mx-0">
                    {g.blurb}
                  </p>
                </div>
                <div className="lg:col-span-7">
                  <div className="flex flex-wrap justify-center gap-2.5 lg:justify-start">
                    {g.items.map((it) => (
                      <span
                        key={it}
                        className="rounded-full border border-cotton/20 px-4 py-2 text-sm text-cotton/80 transition-colors duration-300 hover:border-cherry hover:text-cherry"
                      >
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
          <div className="border-t border-cotton/12" />
        </div>
      </div>
    </section>
  );
}
