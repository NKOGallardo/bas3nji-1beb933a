import { cn } from "@/lib/utils";

/**
 * BAS3NJI wordmark. The J is tilted ~10° to the right — the signature move.
 * Renders as inline text using `Archivo Black` (Google font loaded at root).
 */
export function Logo({
  className,
  size = "md",
  showWorld = false,
}: {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "hero";
  showWorld?: boolean;
}) {
  const sizeMap = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-3xl",
    xl: "text-6xl",
    hero: "text-[clamp(3.5rem,14vw,12rem)]",
  } as const;

  return (
    <span className={cn("font-display inline-flex items-baseline leading-none tracking-brand", sizeMap[size], className)}>
      <span>BAS3N</span>
      <span
        aria-hidden
        className="inline-block origin-bottom-left"
        style={{ transform: "rotate(10deg) translateY(-0.02em)" }}
      >
        J
      </span>
      <span>I</span>
      {showWorld && (
        <span className="ml-3 text-[0.35em] font-normal tracking-luxe text-white/60 uppercase">World</span>
      )}
      <span className="sr-only">BASENJI</span>
    </span>
  );
}

/** Just the tilted J — for favicon-style marks and small badges. */
export function TiltedJ({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("font-display inline-block leading-none", className)}
      style={{ transform: "rotate(10deg)" }}
    >
      J
    </span>
  );
}
