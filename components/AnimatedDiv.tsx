'use client';

import { motion, TargetAndTransition } from 'motion/react';
import { ReactNode } from 'react';

interface AnimatedDivProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  animation?: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scaleIn' | 'bounce';
}

interface Variant {
  initial: TargetAndTransition;
  animate: TargetAndTransition;
}

const animationVariants: Record<string, Variant> = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  },
  slideDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
  },
  slideLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
  },
  slideRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
  },
  bounce: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  },
};

export default function AnimatedDiv({
  children,
  className,
  delay = 0,
  duration = 0.5,
  animation = 'fadeIn',
}: AnimatedDivProps) {
  const variant = animationVariants[animation];

  return (
    <motion.div
      className={className}
      initial={variant.initial}
      whileInView={variant.animate}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay, duration, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
