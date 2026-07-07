import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

/**
 * The signature tilted J — rendered massive, floats behind hero content,
 * parallaxes on scroll, tracks cursor for a 3D feel. No Three.js.
 */
export function TiltedJ3D({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, -120]);
  const scale = useTransform(scrollY, [0, 600], [1, 1.08]);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 120, damping: 18 });
  const sry = useSpring(ry, { stiffness: 120, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 18);
    rx.set(-py * 12);
  };
  const onLeave = () => { rx.set(0); ry.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ y, scale, perspective: 1200 }}
      className={`pointer-events-auto absolute inset-0 flex items-center justify-center ${className}`}
    >
      <motion.div
        style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
        className="relative select-none"
      >
        {/* Blood shadow layer */}
        <span
          aria-hidden
          className="font-display absolute inset-0 flex items-center justify-center text-[38vw] leading-none text-blood/25 blur-2xl"
          style={{ transform: "rotate(10deg) translate(0.06em, 0.06em) translateZ(-40px)" }}
        >
          J
        </span>
        {/* Outline layer */}
        <span
          aria-hidden
          className="font-display absolute inset-0 flex items-center justify-center text-[38vw] leading-none"
          style={{
            WebkitTextStroke: "1px rgba(255,255,255,0.08)",
            color: "transparent",
            transform: "rotate(10deg) translate(-0.02em, -0.02em) translateZ(20px)",
          }}
        >
          J
        </span>
        {/* Solid front layer */}
        <span
          className="font-display relative flex items-center justify-center text-[38vw] leading-none text-white/95"
          style={{ transform: "rotate(10deg)", textShadow: "0 40px 80px rgba(0,0,0,0.6)" }}
        >
          J
        </span>
      </motion.div>
    </motion.div>
  );
}
