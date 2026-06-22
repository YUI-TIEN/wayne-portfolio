import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  /** Scale applied while the cursor is inside the element. */
  scaleOnHover?: number;
}

const isMagneticDisabled = () =>
  typeof window !== 'undefined' &&
  (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches);

// Pulls the element itself toward the cursor while hovered (classic
// "magnetic button" effect), with a small scale bump for extra feedback.
export function Magnetic({ children, className = '', scaleOnHover = 1.1 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });
  const springScale = useSpring(scale, { stiffness: 260, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMagneticDisabled() || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - (rect.left + rect.width / 2);
    const offsetY = e.clientY - (rect.top + rect.height / 2);
    x.set(offsetX * 0.35);
    y.set(offsetY * 0.35);
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
