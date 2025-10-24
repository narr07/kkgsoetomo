'use client';

import { ReactNode } from 'react';

interface AnimatedDivProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  animation?: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scaleIn' | 'bounce';
}

export default function AnimatedDiv({
  children,
  className,
  delay = 0,
  duration = 0.5,
  animation = 'fadeIn',
}: AnimatedDivProps) {
  // Render without animations - just a regular div
  return (
    <div className={className}>
      {children}
    </div>
  );
}
