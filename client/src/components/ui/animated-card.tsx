"use client";

import { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { Card, CardContent } from '@/components/ui/card';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
}

export function AnimatedCard({
  children,
  className = "",
  hover = true,
  delay = 0
}: AnimatedCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const springProps = useSpring({
    transform: isHovered && hover ? 'translateY(-8px) scale(1.02)' : 'translateY(0px) scale(1)',
    boxShadow: isHovered && hover
      ? '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.1)'
      : '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    config: { tension: 300, friction: 20 },
  });

  const fadeInProps = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    delay,
    config: { tension: 200, friction: 20 },
  });

  return (
    <animated.div
      style={{ ...fadeInProps, ...springProps }}
      className={`cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="h-full bg-zinc-900/50 border-zinc-800 hover:bg-zinc-800/50 transition-colors overflow-hidden">
        {children}
      </Card>
    </animated.div>
  );
}