'use client';

import type { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const streamRows = Array.from({ length: 8 }, (_, index) => ({
  key: index,
  top: `${16 + index * 8}%`,
  duration: 14 + (index % 3) * 2,
  delay: index * 0.75,
  width: 220 + (index % 4) * 58,
}));

const verticalBeams = Array.from({ length: 6 }, (_, index) => ({
  key: index,
  left: `${14 + index * 13}%`,
  duration: 8 + (index % 3) * 2,
  delay: index * 0.55,
  height: 140 + index * 24,
}));

const HeroBackground = () => {
  const frameRef = useRef<number | null>(null);
  const nextPositionRef = useRef({ x: 48, y: 22 });
  const [mousePosition, setMousePosition] = useState({ x: 48, y: 22 });

  useEffect(() => {
    const commitFrame = () => {
      setMousePosition(nextPositionRef.current);
      frameRef.current = null;
    };

    const handleMouseMove = (event: MouseEvent) => {
      nextPositionRef.current = {
        x: (event.clientX / window.innerWidth) * 100,
        y: (event.clientY / window.innerHeight) * 100,
      };

      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(commitFrame);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const pointerStyle = {
    '--pointer-x': `${mousePosition.x}%`,
    '--pointer-y': `${mousePosition.y}%`,
  } as CSSProperties;

  return (
    <div className="absolute inset-0 overflow-hidden" style={pointerStyle}>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,250,252,0.28)_0%,rgba(248,250,252,0.88)_100%)]" />

      <div className="absolute inset-0 opacity-65 [mask-image:linear-gradient(180deg,rgba(0,0,0,0.88),transparent_92%)]">
        <div className="fintech-grid absolute inset-x-[-10%] top-[-8%] h-[72%] [transform:perspective(1200px)_rotateX(72deg)]" />
      </div>

      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background:
            'radial-gradient(circle at var(--pointer-x) var(--pointer-y), rgba(14, 165, 233, 0.12), transparent 24%)',
        }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(14,165,233,0.12),transparent_20%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_22%,rgba(16,185,129,0.1),transparent_18%)]" />

      {streamRows.map((stream) => (
        <motion.div
          key={stream.key}
          className="absolute left-[-18%] h-px bg-gradient-to-r from-transparent via-sky-400/45 to-transparent"
          style={{ top: stream.top, width: stream.width }}
          animate={{ x: ['0%', '130%'], opacity: [0, 0.7, 0] }}
          transition={{
            duration: stream.duration,
            delay: stream.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      {verticalBeams.map((beam) => (
        <motion.div
          key={beam.key}
          className="absolute top-[14%] w-px bg-gradient-to-b from-sky-400/0 via-sky-400/25 to-sky-400/0"
          style={{ left: beam.left, height: beam.height }}
          animate={{ opacity: [0.08, 0.24, 0.08], y: [0, 16, 0] }}
          transition={{
            duration: beam.duration,
            delay: beam.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      <motion.div
        className="absolute left-1/2 top-[34%] h-[520px] w-[520px] -translate-x-1/2 rounded-full border border-sky-200/60"
        animate={{ scale: [1, 1.03, 1], opacity: [0.25, 0.38, 0.25] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute left-1/2 top-[34%] h-[720px] w-[720px] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(14, 165, 233, 0.12) 0%, rgba(14, 165, 233, 0) 68%)',
        }}
        animate={{ opacity: [0.26, 0.42, 0.26] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
};

export default HeroBackground;
