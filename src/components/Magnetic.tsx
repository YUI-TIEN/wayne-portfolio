import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  /** Scale applied while the cursor is inside the element. */
  scaleOnHover?: number;
}

const isMagneticDisabled = () =>
  typeof window !== 'undefined' &&
  (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches);

type QuickTo = ReturnType<typeof gsap.quickTo>;

// Pulls the element itself toward the cursor while hovered (classic
// "magnetic button" effect), with a small scale bump for extra feedback.
// Uses gsap.quickTo (the same engine the rest of the site animates with) so
// the project no longer ships framer-motion just for this one component.
export function Magnetic({ children, className = '', scaleOnHover = 1.1 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const xTo = useRef<QuickTo | null>(null);
  const yTo = useRef<QuickTo | null>(null);
  const scaleTo = useRef<QuickTo | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    // quickTo returns a fast setter that retargets a live tween each call —
    // the smooth "catch up" toward the latest value is the magnetic feel.
    xTo.current = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3.out' });
    yTo.current = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3.out' });
    scaleTo.current = gsap.quickTo(el, 'scale', { duration: 0.3, ease: 'power3.out' });
    return () => {
      gsap.killTweensOf(el);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMagneticDisabled() || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - (rect.left + rect.width / 2);
    const offsetY = e.clientY - (rect.top + rect.height / 2);
    xTo.current?.(offsetX * 0.35);
    yTo.current?.(offsetY * 0.35);
  };

  const handleMouseEnter = () => {
    if (isMagneticDisabled()) return;
    scaleTo.current?.(scaleOnHover);
  };

  const handleMouseLeave = () => {
    xTo.current?.(0);
    yTo.current?.(0);
    scaleTo.current?.(1);
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ display: 'inline-block' }}
    >
      {children}
    </div>
  );
}

export default Magnetic;
