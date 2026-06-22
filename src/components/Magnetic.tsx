import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { setCursorTarget, clearCursorTarget } from './CustomCursor';

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  /** Scale applied while the cursor is inside the element. */
  scaleOnHover?: number;
}

const isMagneticDisabled = () =>
  typeof window !== 'undefined' &&
  (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches);

// Snaps the custom cursor to this element's center on hover (instead of
// moving the element toward the cursor), with a small scale bump on the
// element itself to keep some tactile feedback.
export function Magnetic({ children, className = '', scaleOnHover = 1.1 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const scale = useMotionValue(1);
  const springScale = useSpring(scale, { stiffness: 260, damping: 20 });

  const handleMouseEnter = () => {
    if (isMagneticDisabled() || !ref.current) return;
    scale.set(scaleOnHover);
    setCursorTarget(ref.current);
  };

  const handleMouseLeave = () => {
    scale.set(1);
    clearCursorTarget();
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ scale: springScale, display: 'inline-block' }}
    >
      {children}
    </motion.div>
  );
}

export default Magnetic;
