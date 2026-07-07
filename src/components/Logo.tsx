interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "hero";
  showWorld?: boolean;
}

export function Logo({ className = "", size = "md", showWorld = false }: LogoProps) {
  return (
    <span className={`logo logo--${size} ${className}`}>
      <span>BAS3N</span>
      <span aria-hidden className="logo__j">J</span>
      <span>I</span>
      {showWorld && <span className="logo__world">World</span>}
      <span className="sr-only">BASENJI</span>
    </span>
  );
}
