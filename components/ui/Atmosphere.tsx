/**
 * Cinematic section backdrop — soft colored light blooms + paper grain.
 *
 * Renders as direct, non-positioned-stacking children (z-index auto) so the
 * grain blends (multiply) against the real section background, exactly like the
 * Hero/Contact treatment. Place it as the FIRST child of a section that is
 * `relative overflow-hidden`, and give the section's content wrapper `relative`
 * so it paints above these layers.
 *
 * `glows` is an array of Tailwind class strings positioning each bloom
 * (offset · size · color · blur). Keep cotton sections faint (/8–/12) and noir
 * sections brighter (/15–/22) so the light reads without staining the page.
 */
export default function Atmosphere({
  glows = [],
  grain = true,
  grainOpacity,
}: {
  glows?: string[];
  grain?: boolean;
  /**
   * Override the grain strength. Light (`cotton`) sections need a higher value
   * (~0.4–0.55) since `multiply` barely registers on a pale background; dark
   * sections read fine at the 0.22 default.
   */
  grainOpacity?: number;
}) {
  return (
    <>
      {glows.map((g, i) => (
        <span
          key={i}
          aria-hidden
          className={`pointer-events-none absolute rounded-full ${g}`}
        />
      ))}
      {grain && (
        <span
          aria-hidden
          className="grain pointer-events-none absolute inset-0 block"
          style={
            grainOpacity != null
              ? ({ "--grain-opacity": grainOpacity } as React.CSSProperties)
              : undefined
          }
        />
      )}
    </>
  );
}
