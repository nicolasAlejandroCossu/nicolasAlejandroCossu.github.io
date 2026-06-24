/**
 * Renders a JSON-LD <script> into the static HTML at build time.
 * Server component (no "use client"), so the structured data ships in the
 * crawled markup — exactly what search engines and AI answer engines read.
 */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Structured data is build-time constant and self-authored — safe to inline.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
