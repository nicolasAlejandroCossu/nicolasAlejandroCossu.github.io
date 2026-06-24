import { site } from "@/content/site";

/**
 * Portrait slot. Renders a refined placeholder frame until a photo exists —
 * drop the file in /public and set `photo` in content/site.ts.
 *
 * The dark photo is tied to the Cotton section with a warm halo that bleeds onto
 * the page (echoing the portrait's own light), a deep soft shadow to ground it,
 * and a hairline frame — so it reads as part of the scene, not pasted on top.
 */
export default function Portrait({ className }: { className?: string }) {
  return (
    <div className={`relative ${className ?? ""}`}>
      {/* Warm halo bleeding into the cotton — connects the dark photo to the
          section's palette instead of leaving a hard rectangle. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-7 rounded-[2.5rem] bg-cherry/15 blur-2xl"
      />

      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-noir/[0.03] shadow-[0_30px_60px_-24px_rgba(27,23,22,0.55)] ring-1 ring-noir/10">
        {site.photo ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={site.photo}
              alt={`${site.name} — ${site.role}`}
              className="h-full w-full object-cover"
            />
            {/* Inner edge softening so the frame doesn't read as a hard cut. */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ring-cotton/10"
            />
          </>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-center text-noir/30">
            <span className="label text-[0.6rem]">Portrait</span>
            <span className="font-display text-xl text-noir/45">{site.name}</span>
            <span className="label text-[0.5rem] text-noir/25">
              drop /public/profile.webp
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
