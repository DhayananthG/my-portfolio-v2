"use client";

import React, { useRef, MouseEvent, ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

interface Card3DProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}

export const Card3D = ({ children, className, containerClassName }: Card3DProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const xTo = useRef<gsap.QuickToFunc | null>(null);
  const yTo = useRef<gsap.QuickToFunc | null>(null);

  useGSAP(() => {
    // using quickTo for high performance mouse movement
    xTo.current = gsap.quickTo(cardRef.current, "rotateY", { duration: 0.4, ease: "power3" });
    yTo.current = gsap.quickTo(cardRef.current, "rotateX", { duration: 0.4, ease: "power3" });
  }, { scope: containerRef });

  function onMouseMove({ clientX, clientY }: MouseEvent) {
    if (!containerRef.current || !xTo.current || !yTo.current) return;
    
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = clientX - left - width / 2;
    const y = clientY - top - height / 2;

    // Convert position to rotation degrees
    const rotateY = (x / (width / 2)) * 15;
    const rotateX = (y / (height / 2)) * -15; 

    xTo.current(rotateY);
    yTo.current(rotateX);
  }

  function onMouseLeave() {
    if (!xTo.current || !yTo.current) return;
    xTo.current(0);
    yTo.current(0);
  }

  return (
    <div
      ref={containerRef}
      className={cn("perspective-1000 flex items-center justify-center", containerClassName)}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div
        ref={cardRef}
        style={{
            transformStyle: "preserve-3d",
        }}
        className={cn(
          "relative", // transition controlled by gsap
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};
