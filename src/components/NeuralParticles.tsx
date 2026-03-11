'use client';

import { useEffect, useRef } from 'react';

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  seed: number;
};

const PARTICLE_COUNT = 65;
const CONNECTION_DISTANCE = 118;
const POINTER_RADIUS = 150;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const NeuralParticles = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;

    if (!container || !canvas) {
      return;
    }

    const context = canvas.getContext('2d');

    if (!context) {
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pointer = { x: 0, y: 0, active: false };
    const particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let frameId = 0;

    const initializeParticles = () => {
      particles.length = 0;

      for (let index = 0; index < PARTICLE_COUNT; index += 1) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.52,
          vy: (Math.random() - 0.5) * 0.52,
          seed: 0.8 + Math.random() * 0.6,
        });
      }
    };

    const resizeCanvas = () => {
      const bounds = container.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;

      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      initializeParticles();
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);

      const ambient = context.createRadialGradient(
        width * 0.52,
        height * 0.48,
        width * 0.06,
        width * 0.5,
        height * 0.5,
        width * 0.62,
      );
      ambient.addColorStop(0, 'rgba(14, 165, 233, 0.12)');
      ambient.addColorStop(1, 'rgba(14, 165, 233, 0)');
      context.fillStyle = ambient;
      context.fillRect(0, 0, width, height);

      for (const particle of particles) {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > width) {
          particle.vx *= -1;
          particle.x = clamp(particle.x, 0, width);
        }

        if (particle.y < 0 || particle.y > height) {
          particle.vy *= -1;
          particle.y = clamp(particle.y, 0, height);
        }

        if (pointer.active) {
          const dx = pointer.x - particle.x;
          const dy = pointer.y - particle.y;
          const distance = Math.hypot(dx, dy);

          if (distance < POINTER_RADIUS && distance > 0) {
            const force = ((POINTER_RADIUS - distance) / POINTER_RADIUS) * 0.018;
            particle.vx += (dx / distance) * force;
            particle.vy += (dy / distance) * force;
          }
        }

        particle.vx = clamp(particle.vx * 0.992, -0.95, 0.95);
        particle.vy = clamp(particle.vy * 0.992, -0.95, 0.95);
      }

      for (let outer = 0; outer < particles.length; outer += 1) {
        const source = particles[outer];

        for (let inner = outer + 1; inner < particles.length; inner += 1) {
          const target = particles[inner];
          const dx = source.x - target.x;
          const dy = source.y - target.y;
          const distance = Math.hypot(dx, dy);

          if (distance <= CONNECTION_DISTANCE) {
            const alpha = (1 - distance / CONNECTION_DISTANCE) * 0.32;
            context.strokeStyle = `rgba(14, 165, 233, ${alpha})`;
            context.lineWidth = 0.9;
            context.beginPath();
            context.moveTo(source.x, source.y);
            context.lineTo(target.x, target.y);
            context.stroke();
          }
        }
      }

      for (const particle of particles) {
        context.beginPath();
        context.fillStyle = 'rgba(14, 165, 233, 0.88)';
        context.arc(particle.x, particle.y, particle.seed * 1.6, 0, Math.PI * 2);
        context.fill();

        context.beginPath();
        context.fillStyle = 'rgba(16, 185, 129, 0.12)';
        context.arc(particle.x, particle.y, particle.seed * 4.4, 0, Math.PI * 2);
        context.fill();
      }

      frameId = window.requestAnimationFrame(draw);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
      pointer.active = true;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(container);
    resizeCanvas();

    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerleave', handlePointerLeave);

    frameId = window.requestAnimationFrame(draw);

    return () => {
      resizeObserver.disconnect();
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerleave', handlePointerLeave);
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative mx-auto aspect-square w-full max-w-[620px] overflow-hidden rounded-full border border-sky-200/70 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.76),rgba(240,249,255,0.92)_52%,rgba(248,250,252,1)_100%)]"
    >
      <div className="absolute inset-[10%] rounded-full border border-sky-200/70" />
      <div className="absolute inset-[18%] rounded-full border border-emerald-100" />
      <canvas ref={canvasRef} className="relative z-10 size-full" />
    </div>
  );
};

export default NeuralParticles;
