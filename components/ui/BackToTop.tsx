"use client";

export default function BackToTop({ className }: { className?: string }) {
  return (
    <button
      onClick={() =>
        document
          .querySelector("#top")
          ?.scrollIntoView({ behavior: "smooth", block: "start" })
      }
      className={className}
    >
      Back to top ↑
    </button>
  );
}
