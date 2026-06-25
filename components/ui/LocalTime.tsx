"use client";

import { useEffect, useState } from "react";

/**
 * Live local clock for the contact footer. Renders nothing until mounted to
 * avoid an SSR/client hydration mismatch, then ticks every 30s.
 */
export default function LocalTime({
  timeZone = "America/Argentina/Buenos_Aires",
  className,
}: {
  timeZone?: string;
  className?: string;
}) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, [timeZone]);

  if (!time) return null;
  return <span className={className}>{time} local time</span>;
}
