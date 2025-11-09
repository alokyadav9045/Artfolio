"use client";

import { useEffect, useRef } from 'react';

interface AnimatedGridProps {
  className?: string;
}

export function AnimatedGrid({ className = "" }: AnimatedGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Grid properties
    const gridSize = 30;
    const lineWidth = 1;
    const colors = ['#374151', '#4B5563', '#6B7280'];

    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Draw vertical lines
      for (let x = 0; x <= canvas.offsetWidth; x += gridSize) {
        const alpha = 0.1 + Math.sin(time + x * 0.01) * 0.05;
        ctx.strokeStyle = `rgba(107, 114, 128, ${alpha})`;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.offsetHeight);
        ctx.stroke();
      }

      // Draw horizontal lines
      for (let y = 0; y <= canvas.offsetHeight; y += gridSize) {
        const alpha = 0.1 + Math.sin(time + y * 0.01) * 0.05;
        ctx.strokeStyle = `rgba(107, 114, 128, ${alpha})`;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.offsetWidth, y);
        ctx.stroke();
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ background: 'transparent' }}
    />
  );
}