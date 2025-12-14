"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

export const Skills = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Header
    gsap.from(".skills-header", {
        y: 30, opacity: 0, duration: 0.8,
        scrollTrigger: { trigger: ".skills-header", start: "top 85%", once: true }
    });

    // Stagger Gauges
    gsap.from(".skill-gauge", {
        scale: 0.5, opacity: 0, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)",
        scrollTrigger: { trigger: ".skills-grid", start: "top 80%", once: true }
    });

    // Animate Circles
    gsap.utils.toArray<SVGCircleElement>(".gauge-circle").forEach((circle) => {
         const targetPct = parseInt(circle.getAttribute("data-pct") || "0");
         const radius = 34; // r=34 => C ~= 213.6
         const circumference = 2 * Math.PI * radius;
         const dashOffset = circumference - (targetPct / 100) * circumference;

         gsap.fromTo(circle, 
            { strokeDashoffset: circumference },
            { 
                strokeDashoffset: dashOffset, 
                duration: 2, 
                ease: "power2.out",
                scrollTrigger: {
                    trigger: circle,
                    start: "top 95%",
                    once: true
                }
            }
         );
    });
  }, { scope: containerRef });

  const { contextSafe } = useGSAP({ scope: containerRef });

  const handleMouseEnter = contextSafe((e: React.MouseEvent<HTMLDivElement>) => {
      const circle = e.currentTarget.querySelector(".gauge-circle");
      const icon = e.currentTarget.querySelector(".skill-icon");
      
      if (circle) gsap.to(circle, { stroke: "var(--color-cyan)", duration: 0.3 });
      if (icon) gsap.to(icon, { scale: 1.2, rotate: 360, duration: 0.5, ease: "back.out(1.7)" });
      
      gsap.to(e.currentTarget, { y: -5, boxShadow: "0 10px 30px -10px var(--color-cyan-glow)", duration: 0.3 });
  });

  const handleMouseLeave = contextSafe((e: React.MouseEvent<HTMLDivElement>) => {
      const circle = e.currentTarget.querySelector(".gauge-circle");
      const icon = e.currentTarget.querySelector(".skill-icon");

      if (circle) gsap.to(circle, { stroke: "var(--color-primary)", duration: 0.3 });
      if (icon) gsap.to(icon, { scale: 1, rotate: 0, duration: 0.3 });

      gsap.to(e.currentTarget, { y: 0, boxShadow: "none", duration: 0.3 });
  });


  return (
    <section ref={containerRef} id="skills" className="py-24 relative overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="skills-header mb-16 flex items-end gap-4 border-b border-white/10 pb-4">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                <span className="text-violet font-mono text-sm block mb-2">02.0 // CAPABILITIES</span>
                TECH ARSENAL
            </h2>
             <div className="hidden md:block flex-1 h-[1px] bg-white/10 mb-2 relative">
                <div className="absolute right-0 bottom-0 w-20 h-[3px] bg-violet" />
            </div>
        </div>

        <div className="skills-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {portfolioData.skills.map((skill, index) => {
                const radius = 34;
                const circumference = 2 * Math.PI * radius;
                
                return (
                    <div
                        key={skill.name}
                        className="skill-gauge bg-surface-highlight border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center gap-6 group relative cursor-pointer"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        {/* Decorative Corner */}
                        <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-white/10 group-hover:border-cyan transition-colors" />

                        <div className="relative w-24 h-24 flex items-center justify-center">
                            {/* Background Track */}
                            <svg className="w-full h-full rotate-[-90deg]">
                                <circle 
                                    cx="48" cy="48" r={radius} 
                                    fill="none" 
                                    stroke="rgba(255,255,255,0.05)" 
                                    strokeWidth="4" 
                                />
                                {/* Progress Arc */}
                                <circle 
                                    className="gauge-circle transition-colors duration-300"
                                    cx="48" cy="48" r={radius} 
                                    fill="none" 
                                    stroke="var(--color-primary)" 
                                    strokeWidth="4" 
                                    strokeDasharray={circumference}
                                    strokeDashoffset={circumference} // Initial, animated by GSAP
                                    data-pct={skill.level}
                                    strokeLinecap="round"
                                />
                            </svg>
                            
                            {/* Icon Center */}
                            <div className="absolute inset-0 flex items-center justify-center text-white/50 group-hover:text-cyan transition-colors">
                                <span className="skill-icon inline-block">
                                    <skill.icon size={28} />
                                </span>
                            </div>
                        </div>

                        <div className="text-center">
                            <h3 className="font-mono font-bold text-sm text-foreground group-hover:text-white transition-colors">{skill.name}</h3>
                            <p className="text-xs text-foreground-dim mt-1 font-mono">{skill.level}% EFFICIENCY</p>
                        </div>
                    </div>
                )
            })}
        </div>
      </div>
    </section>
  );
};
