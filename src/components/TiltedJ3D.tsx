import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

export function TiltedJ3D() {
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
      style={{ y, scale }}
      className="tj3d"
    >
      <motion.div style={{ rotateX: srx, rotateY: sry }} className="tj3d__stack">
        <span aria-hidden className="tj3d__layer tj3d__shadow">J</span>
        <span aria-hidden className="tj3d__layer tj3d__outline">J</span>
        <span className="tj3d__layer tj3d__front">J</span>
      </motion.div>
    </motion.div>
  );
}
