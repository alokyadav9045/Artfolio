"use client";

import { useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';

interface AnimatedTextProps {
  children?: React.ReactNode;
  className?: string;
  delay?: number;
  type?: 'fadeIn' | 'slideUp' | 'typewriter' | 'gradient';
  text?: string; // Keep for backward compatibility
}

export function AnimatedText({
  children,
  text,
  className = "",
  delay = 0,
  type = 'fadeIn'
}: AnimatedTextProps) {
  const content = children || text || '';
  const [displayText, setDisplayText] = useState(type === 'typewriter' && typeof content === 'string' ? '' : content);

  const springProps = useSpring({
    from: {
      opacity: 0,
      transform: type === 'slideUp' ? 'translateY(30px)' : 'translateY(0px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0px)',
    },
    delay,
    config: { tension: 300, friction: 20 },
  });

  useEffect(() => {
    if (type === 'typewriter' && typeof content === 'string') {
      let i = 0;
      const timer = setInterval(() => {
        if (i < content.length) {
          setDisplayText(content.slice(0, i + 1));
          i++;
        } else {
          clearInterval(timer);
        }
      }, 100);
      return () => clearInterval(timer);
    }
  }, [content, type]);

  if (type === 'gradient' && typeof content === 'string') {
    return (
      <animated.span
        className={`bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent ${className}`}
        style={springProps}
      >
        {content}
      </animated.span>
    );
  }

  return (
    <animated.div className={className} style={springProps}>
      {displayText}
    </animated.div>
  );
}