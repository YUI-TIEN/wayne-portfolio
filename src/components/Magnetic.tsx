import type React from 'react';

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  /** Retained for call-site compatibility; the effect is retired. */
  scaleOnHover?: number;
}

// The magnetic hover was retired with the move to the glass/field-manual
// design language: controls now stay put and respond with color and
// press-scale instead. Kept as a plain inline wrapper so the many case-study
// call sites do not all need editing to drop it.
export function Magnetic({ children, className = '' }: MagneticProps) {
  return (
    <div className={className} style={{ display: 'inline-block' }}>
      {children}
    </div>
  );
}

export default Magnetic;
