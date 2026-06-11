import React, { useEffect, useRef } from 'react';

export interface MathCurveLoaderProps {
  type: 'rose' | 'lissajous';
  size: 'sm' | 'md' | 'lg';
  colorClass?: string;
}

export const MathCurveLoader: React.FC<MathCurveLoaderProps> = ({ type, size, colorClass = 'fill-brand-lime' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = 0;
    let height = 0;

    // Setup ResizeObserver to dynamically scale canvas with Retina display (DPR) support
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: entryWidth, height: entryHeight } = entry.contentRect;
        width = entryWidth || 100;
        height = entryHeight || 100;

        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
      }
    });

    const parent = canvas.parentElement;
    if (parent) {
      resizeObserver.observe(parent);
    } else {
      resizeObserver.observe(canvas);
    }

    // Resolves Tailwind colors to actual hex/rgba strings
    const getThemeColor = (classStr: string) => {
      const isDarkMode = document.documentElement.classList.contains('dark') || document.body.classList.contains('dark');
      let targetClass: string;
      
      if (isDarkMode) {
        const darkClass = classStr.split(' ').find(c => c.startsWith('dark:'));
        if (darkClass) {
          targetClass = darkClass.replace('dark:', '');
        } else {
          targetClass = classStr.split(' ').find(c => !c.startsWith('dark:')) || '';
        }
      } else {
        targetClass = classStr.split(' ').find(c => !c.startsWith('dark:')) || '';
      }

      const colorName = targetClass.replace('fill-', '');
      if (colorName === 'brand-orange') return '#F94E0A';
      if (colorName === 'brand-lime') return '#C4FF3D';
      if (colorName === 'brand-blue') return '#3B5BFC';
      if (colorName === 'brand-peach') return '#F9D4C4';
      if (colorName === 'brand-violet') return '#5B1FF0';
      if (colorName === 'brand-teal') return '#206A6E';
      if (colorName === 'brand-limeBg') return '#9BBE3D';
      return '#C4FF3D';
    };

    const render = (time: number) => {
      if (width === 0 || height === 0) {
        animationId = requestAnimationFrame(render);
        return;
      }

      const dpr = window.devicePixelRatio || 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      // Apply retina scaling
      ctx.scale(dpr, dpr);

      // 1. Breathing multiplier
      const pulseDuration = type === 'rose' ? 4200 : 5400;
      const detailScale = 0.5 + 0.5 * Math.sin((time / pulseDuration) * Math.PI * 2);

      // 2. Self-rotation
      ctx.translate(width / 2, height / 2);
      if (type === 'rose') {
        const rotationDuration = 28000;
        const rotation = ((time % rotationDuration) / rotationDuration) * Math.PI * 2;
        ctx.rotate(rotation);
      }
      ctx.translate(-width / 2, -height / 2);

      // 3. Formula point generator
      const getPoint = (progress: number) => {
        const t = progress * Math.PI * 2;
        if (type === 'rose') {
          const baseRadius = 7;
          const detailAmplitude = 3;
          const petals = 7;
          const scale = 3.9;
          const x = baseRadius * Math.cos(t) - detailAmplitude * detailScale * Math.cos(petals * t);
          const y = baseRadius * Math.sin(t) - detailAmplitude * detailScale * Math.sin(petals * t);
          return {
            x: (50 + x * scale) * (width / 100),
            y: (50 + y * scale) * (height / 100)
          };
        } else {
          // Lissajous Curve
          const amp = 24 + 6 * detailScale;
          const x = Math.sin(3 * t + 1.57) * amp * 1.3;
          const y = Math.sin(4 * t) * 0.92 * amp * 1.3;
          return {
            x: (50 + x) * (width / 100),
            y: (50 + y) * (height / 100)
          };
        }
      };

      const particleCount = size === 'sm' ? 35 : size === 'md' ? 55 : 80;
      const trailSpan = type === 'rose' ? 0.38 : 0.34;
      const loopDuration = type === 'rose' ? 4600 : 6000;

      const activeColor = getThemeColor(colorClass);

      // Draw each particle with direct canvas operations (hardware accelerated, bypass DOM)
      for (let i = 0; i < particleCount; i++) {
        const baseProgress = (time / loopDuration) % 1;
        const progress = (baseProgress + (i / particleCount) * trailSpan) % 1;
        const pos = getPoint(progress);
        const opacity = i / particleCount;

        let baseRadius: number;
        if (size === 'sm') {
          baseRadius = 0.6 + (i / particleCount) * 0.8;
        } else if (size === 'md') {
          baseRadius = 0.8 + (i / particleCount) * 1.2;
        } else {
          baseRadius = 1.0 + (i / particleCount) * 1.6;
        }

        const scaleFactor = Math.min(width, height) / 100;
        const radius = baseRadius * scaleFactor;

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = activeColor;
        ctx.globalAlpha = opacity;
        ctx.fill();
      }

      ctx.restore();

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
    };
  }, [type, size, colorClass]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full select-none block"
    />
  );
};

export default MathCurveLoader;