"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Terminal } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import dynamic from "next/dynamic";

const Globe3D = dynamic(() => import("../ui/Globe3D"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [decodedName, setDecodedName] = useState("");

  // Text Decoding Effect
  useEffect(() => {
    const name = portfolioData.personal.name.toUpperCase();
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_#";
    let iter = 0;
    const interval = setInterval(() => {
      setDecodedName(
        name
          .split("")
          .map((letter, index) => {
            if (index < iter) return name[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      if (iter >= name.length) clearInterval(interval);
      iter += 1 / 3;
    }, 40);
    return () => clearInterval(interval);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Initial Reveal
    tl.from(".hero-border", { scaleX: 0, duration: 1.5, ease: "expo.inOut" })
      .from(".hero-content", { y: 30, opacity: 0, duration: 0.8 }, "-=0.5")
      .from(".hero-stat", { y: 20, opacity: 0, stagger: 0.1 }, "-=0.4");
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      id="home" 
      className="relative w-full min-h-[calc(100vh-4rem)] flex items-center overflow-hidden bg-background pt-16"
    >
      {/* Background Grid - Clean & subtle */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />

      {/* Background Globe Layer - Dynamic & Expansive */}
      <div className="absolute top-0 right-0 w-full h-full lg:w-[70%] z-0 pointer-events-none opacity-60 lg:opacity-100">
           <div className="w-full h-full transform scale-150 translate-x-1/4">
               <Globe3D />
           </div>
           {/* Fade Gradient to ensure text readability on left */}
           <div className="absolute inset-y-0 left-0 w-full lg:w-1/2 bg-gradient-to-r from-background via-background/80 to-transparent" />
           <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center h-full">
        
        {/* Left Column: Typography & Content */}
        <div className="hero-content space-y-8 relative py-12 lg:py-0">
          
          {/* Status Label */}
          <div className="inline-flex items-center gap-3 text-xs font-mono tracking-widest text-primary border border-primary/20 px-3 py-1 rounded-sm bg-primary/5 w-fit">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            SYSTEM_ONLINE // V.4.0
          </div>

          {/* Headline */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[0.9]">
              <span className="block text-2xl md:text-3xl text-foreground-dim font-mono mb-4 text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600">
                ARCHITECTING
              </span>
              <span className="block">THE <span className="text-primary glow-text">{decodedName || portfolioData.personal.name.toUpperCase()}</span></span>
              <span className="block text-4xl md:text-6xl text-foreground-dim mt-2">DIGITAL REALITY</span>
            </h1>
            <p className="text-xl text-foreground-dim max-w-lg leading-relaxed pt-6 border-l-2 border-primary/50 pl-6">
              {portfolioData.personal.title} specializing in high-performance digital systems, AI integration, and immersive web 3D.
            </p>
          </div>

          {/* Action Area */}
          <div className="flex flex-wrap gap-5 pt-4">
             <button className="px-8 py-4 bg-primary text-background font-bold font-mono tracking-wider hover:bg-white transition-all flex items-center gap-2 group shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]">
                INIT_PROJECT <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
             </button>
             <button className="px-8 py-4 border border-card-border text-foreground font-mono hover:bg-card/50 transition-all backdrop-blur-sm">
                VIEW_DOSSIER
             </button>
          </div>

          {/* Specs Row */}
          <div className="pt-12 grid grid-cols-3 gap-8 border-t border-card-border/50">
     
            <div className="hero-stat">
                <span className="block text-3xl font-bold text-foreground">05+</span>
                <span className="text-xs text-foreground-dim font-mono tracking-wider">YEARS_EXP</span>
            </div>
             <div className="hero-stat">
                <span className="block text-3xl font-bold text-foreground">50+</span>
                <span className="text-xs text-foreground-dim font-mono tracking-wider">PROJECTS</span>
            </div>
             <div className="hero-stat">
                <span className="block text-3xl font-bold text-foreground">100%</span>
                <span className="text-xs text-foreground-dim font-mono tracking-wider">UPTIME</span>
            </div>
          </div>
        </div>
        
        {/* Right side is intentionally empty in DOM flow to allow grid alignment, but occupied by Globe visually */}
        <div className="hidden lg:block h-full w-full pointer-events-none" />

      </div>
      
      {/* Footer / Scroll Link */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-card-border hero-border origin-left" />
    </section>
  );
};
