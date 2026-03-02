"use client";

import { useReveal } from "@/hooks/useReveal";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: 0 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 1000 | 1500 | 2000 | 2500 | 3000;
}

export function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const ref = useReveal();

  return (
    <div
      ref={ref}
      className={`reveal reveal-delay-${delay} ${className}`}
    >
      {children}
    </div>
  );
}