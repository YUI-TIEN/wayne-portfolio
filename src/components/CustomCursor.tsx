import React, { useEffect, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only apply custom cursor logic on devices that support hover (non-touch),
    // and skip entirely when the user prefers reduced motion.
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Track actual mouse positions vs current smoothed (lerped) cursor positions
    const mouse = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };
    const scale = { current: 1, target: 1 };

    // Linear interpolation speeds
    const lerpFactor = 0.25;
    const scaleLerpFactor = 0.2;

    let isPointer = false;
    let animationId = 0;

    // Single choke point for the rAF lifecycle: no-ops if already running, so
    // every restart trigger (mousemove) can call it unconditionally.
    const startLoop = () => {
      if (animationId !== 0) return;
      animationId = requestAnimationFrame(updateCursor);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Check if hovering over a clickable or custom pointer element
      const clickable =
        target.closest('.cursor-pointer') ||
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button');

      isPointer = !!clickable;
      scale.target = isPointer ? 2.5 : 1;

      // The mouse just moved, which is the only thing that can un-settle the
      // lerp below — wake the loop back up if it had idle-stopped.
      startLoop();
    };

    window.addEventListener('mousemove', handleMouseMove);

    const updateCursor = () => {
      // Avoid starting animation slide-in from (0,0) or (-100,-100) on first move
      if (pos.x === -100 && mouse.x !== -100) {
        pos.x = mouse.x;
        pos.y = mouse.y;
      } else {
        // GPU accelerated translate3d position calculation via Lerp
        pos.x += (mouse.x - pos.x) * lerpFactor;
        pos.y += (mouse.y - pos.y) * lerpFactor;
      }

      // Smoothly lerp cursor scale expansion
      scale.current += (scale.target - scale.current) * scaleLerpFactor;

      // Idle-stop: once position and scale have both converged to within a
      // hair of their targets, snap to the exact values (so there's no
      // permanent residual drift) and stop scheduling frames. handleMouseMove
      // restarts the loop the next time the mouse actually moves.
      const settled =
        Math.abs(mouse.x - pos.x) < 0.1 &&
        Math.abs(mouse.y - pos.y) < 0.1 &&
        Math.abs(scale.target - scale.current) < 0.001;
      if (settled) {
        pos.x = mouse.x;
        pos.y = mouse.y;
        scale.current = scale.target;
      }

      // Apply transform directly to DOM ref (bypasses React state and render cycle completely)
      if (cursor) {
        cursor.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) scale(${scale.current})`;
      }

      if (settled) {
        animationId = 0;
        return;
      }
      animationId = requestAnimationFrame(updateCursor);
    };

    startLoop();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Hide completely on touch devices or when the user prefers reduced motion
  if (
    typeof window !== 'undefined' &&
    (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  ) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className="fixed left-0 top-0 pointer-events-none z-[9999] rounded-full mix-blend-difference bg-white"
      style={{
        width: '16px',
        height: '16px',
        transform: 'translate3d(-100px, -100px, 0) scale(1)',
        transformOrigin: '50% 50%',
        margin: '-8px 0 0 -8px',
      }}
    />
  );
};

export default CustomCursor;
