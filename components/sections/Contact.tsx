import RevealText from "@/components/ui/RevealText";
import FadeIn from "@/components/ui/FadeIn";
import BackToTop from "@/components/ui/BackToTop";
import LocalTime from "@/components/ui/LocalTime";
import { site } from "@/content/site";

const links = [
  {
    label: "LinkedIn",
    note: "Career & network",
    href: site.links.linkedin,
    ext: true,
  },
  {
    label: "GitHub",
    note: "Code & projects",
    href: site.links.github,
    ext: true,
  },
  {
    label: `${site.agency.name}, studio`,
    note: `${site.agency.role} — independent agency`,
    href: site.links.agency,
    ext: true,
  },
  {
    label: "Download CV",
    note: "PDF résumé",
    href: site.cv,
    ext: false,
    download: true,
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative min-h-[100svh] overflow-hidden bg-noir px-6 pb-12 pt-28 text-cotton md:px-10 md:pb-16 md:pt-40"
    >
      {/* Warm radial glow + paper grain — depth behind the headline */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-1/3 left-1/2 h-[70vh] w-[70vh] -translate-x-1/2 rounded-full bg-cherry/25 blur-[130px]"
      />
      <div aria-hidden className="grain absolute inset-0" />

      <div className="relative mx-auto max-w-[1400px]">
        {/* Top rail: section marker + live availability status */}
        <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
          <FadeIn>
            <span className="label text-cherry">Get in touch</span>
          </FadeIn>
          <FadeIn delay={0.05}>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-cotton/15 px-4 py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cherry opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cherry" />
              </span>
              <span className="label text-cotton/70">Available for work</span>
            </span>
          </FadeIn>
        </div>

        {/* Headline */}
        <div className="mt-16 text-center md:mt-24 lg:text-left">
          <RevealText
            as="h2"
            type="words"
            className="mx-auto max-w-4xl font-display text-[2.6rem] leading-[1.02] tracking-[-0.02em] sm:text-6xl md:text-7xl lg:mx-0"
          >
            Let&apos;s build something that matters.
          </RevealText>

          <FadeIn delay={0.05}>
            <p className="mx-auto mt-6 max-w-xl text-cotton/60 md:text-lg lg:mx-0">
              {site.availabilityNote}
            </p>
          </FadeIn>
        </div>

        {/* Primary CTA — full-width email band */}
        <FadeIn className="mt-14 md:mt-20">
          <a
            href={site.links.email}
            className="group block border-y border-cotton/15 py-8 transition-colors duration-300 hover:border-cherry md:py-10"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <span className="label text-cotton/40">Drop me a line</span>
                <span className="mt-3 block font-display leading-none tracking-[-0.02em] text-[clamp(1.4rem,6vw,3.5rem)] transition-colors duration-300 group-hover:text-cherry">
                  {site.email}
                </span>
              </div>
              <span
                aria-hidden
                className="shrink-0 font-display text-3xl text-cotton/40 transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-cherry md:text-5xl"
              >
                ↗
              </span>
            </div>
          </a>
        </FadeIn>

        {/* Secondary links — contextual cards */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {links.map((l, i) => (
            <FadeIn key={l.label} delay={0.04 * i}>
              <a
                href={l.href}
                {...(l.ext ? { target: "_blank", rel: "noreferrer" } : {})}
                {...(l.download ? { download: true } : {})}
                className="group flex h-full items-center justify-between gap-4 rounded-xl border border-cotton/15 px-6 py-5 transition-colors duration-300 hover:border-cherry hover:bg-cherry/[0.06]"
              >
                <div>
                  <span className="block font-display text-xl transition-colors duration-300 group-hover:text-cherry md:text-2xl">
                    {l.label}
                  </span>
                  <span className="label mt-2 block text-cotton/35">
                    {l.note}
                  </span>
                </div>
                <span
                  aria-hidden
                  className="text-lg text-cotton/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-cherry"
                >
                  {l.ext ? "↗" : "↓"}
                </span>
              </a>
            </FadeIn>
          ))}
        </div>

        {/* Footer rail — identity, location, live clock, back to top */}
        <div className="mt-16 flex flex-col items-center gap-6 border-t border-cotton/12 pt-8 md:mt-24 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col items-center gap-1.5 md:items-start">
            <span className="font-display text-2xl">{site.name}</span>
            <span className="label text-cotton/40">{site.role}</span>
          </div>

          <div className="label flex items-center gap-3.5 text-cotton/40">
            <span>{site.location}</span>
            <span className="h-1 w-1 rounded-full bg-cotton/30" />
            <LocalTime />
          </div>

          <BackToTop className="label text-cotton/50 transition-colors hover:text-cherry" />
        </div>
      </div>
    </section>
  );
}
