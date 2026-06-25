import FadeIn from "@/components/ui/FadeIn";
import Atmosphere from "@/components/ui/Atmosphere";
import { testimonials } from "@/content/testimonials";

/**
 * Hidden until at least one testimonial exists. Add entries in
 * /content/testimonials.ts and the section appears automatically.
 */
export default function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section className="relative min-h-[100svh] overflow-hidden border-t border-cotton/10 bg-noir px-6 py-24 text-cotton md:px-10 md:py-36">
      <Atmosphere
        glows={[
          "top-[8%] left-1/2 h-[60vh] w-[70vh] -translate-x-1/2 bg-cherry/[0.18] blur-[150px]",
        ]}
      />
      <div className="relative mx-auto max-w-[1400px]">
        <FadeIn>
          <span className="label text-cherry">In their words</span>
        </FadeIn>

        <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
          {testimonials.map((t, i) => (
            <FadeIn key={i} delay={(i % 2) * 0.1}>
              <figure>
                <blockquote className="font-display text-2xl leading-snug tracking-[-0.01em] md:text-3xl">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-4">
                  {t.avatar && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  )}
                  <span>
                    <span className="block text-sm text-cotton">{t.name}</span>
                    <span className="label block text-cotton/40">
                      {t.title}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
