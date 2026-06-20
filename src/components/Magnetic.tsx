import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  /** How far the element travels relative to cursor offset (0–1). */
  strength?: number;
  /** Scale applied while the cursor is inside the element. */
  scaleOnHover?: number;
}

const isMagneticDisabled = () =>
  typeof window !== 'undefined' &&
  (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches);

export function Magnetic({ children, className = '', strength = 0.35, scaleOnHover = 1.1 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);

  // Snappy but settled spring, tuned so the pull feels magnetic rather than rubbery.
  const springX = useSpring(x, { stiffness: 200, damping: 18, mass: 0.15 });
  const springY = useSpring(y, { stiffness: 200, damping: 18, mass: 0.15 });
  const springScale = useSpring(scale, { stiffness: 260, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMagneticDisabled() || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  };

  const handleMouseEnter = () => {
    if (isMagneticDisabled()) return;
    scale.set(scaleOnHover);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    scale.set(1);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY, scale: springScale, display: 'inline-block' }}
    >
      {children}
    </motion.div>
  );
}

export default Magnetic;
