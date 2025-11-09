"use client";

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useSpring, animated } from '@react-spring/web';

interface ScrollAnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
}

export function ScrollAnimatedSection({
  children,
  className = "",
  delay = 0,
  direction = 'up'
}: ScrollAnimatedSectionProps) {
  const [ref, isVisible] = useScrollAnimation(0.1);

  const getInitialTransform = () => {
    switch (direction) {
      case 'up':
        return 'translateY(50px)';
      case 'down':
        return 'translateY(-50px)';
      case 'left':
        return 'translateX(50px)';
      case 'right':
        return 'translateX(-50px)';
      case 'fade':
        return 'translateY(0px)';
      default:
        return 'translateY(50px)';
    }
  };

  const springProps = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0px)' : getInitialTransform(),
    config: { tension: 300, friction: 30 },
    delay: isVisible ? delay : 0,
  });

  return (
    <animated.section
      ref={ref}
      className={className}
      style={springProps}
    >
      {children}
    </animated.section>
  );
}