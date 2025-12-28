"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "@/data/portfolio";
import { ShieldCheck, Cpu, Network, Zap, Code2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        // Text animation
        gsap.from(".about-text", {
            x: -30,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".about-content",
                start: "top 80%",
                once: true
            }
        });

        // Cards staggered animation
        gsap.from(".feature-card", {
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "back.out(1.4)",
            scrollTrigger: {
                trigger: ".features-grid",
                start: "top 85%",
                once: true
            }
        });

        // Decorative background elements
        gsap.to(".about-bg-circle", {
            scale: 1.2,
            opacity: 0.15,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} id="about" className="py-24 relative bg-background overflow-hidden border-b border-card-border">
            {/* Design - Decorative Background Sphere */}
            <div className="about-bg-circle absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute top-1/2 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-[80px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-12 gap-16 items-center about-content">
                    
                    {/* Left Side - Typography & Narrative */}
                    <div className="lg:col-span-5 space-y-8 about-text">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-card-border rounded-full text-xs font-mono text-primary shadow-sm uppercase tracking-tighter">
                            <ShieldCheck size={14} className="animate-pulse" /> Established Architect
                        </div>
                        
                        <h2 className="text-5xl font-bold text-foreground leading-tight tracking-tight">
                            Crafting robust <br /> 
                            <span className="text-primary italic">digital ecosystems.</span>
                        </h2>
                        
                        <div className="space-y-6">
                            <p className="text-lg text-foreground-dim leading-relaxed border-l-4 border-primary/20 pl-6">
                                {portfolioData.personal.description}
                            </p>
                            
                            <div className="grid grid-cols-2 gap-6 pt-4">
                                <div>
                                    <h4 className="text-3xl font-bold text-foreground">30+</h4>
                                    <p className="text-xs font-mono text-foreground-dim uppercase mt-1 tracking-widest">Technologies Used</p>
                                </div>
                                <div>
                                    <h4 className="text-3xl font-bold text-foreground">100%</h4>
                                    <p className="text-xs font-mono text-foreground-dim uppercase mt-1 tracking-widest">Delivery Rate</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Intelligence Grid */}
                    <div className="lg:col-span-7">
                        <div className="features-grid grid md:grid-cols-2 gap-6">
                            {portfolioData.aboutFeatures.map((f, i) => (
                                <div 
                                    key={i} 
                                    className="feature-card group p-8 bg-card border border-card-border hover:border-primary/50 transition-all rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 relative overflow-hidden"
                                >
                                    {/* Icon with background accent */}
                                    <div className="relative z-10 mb-6 p-4 bg-primary/5 w-fit rounded-xl text-primary group-hover:bg-primary group-hover:text-background transition-all duration-300">
                                        <f.icon size={28} />
                                    </div>

                                    {/* Content */}
                                    <div className="relative z-10">
                                        <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                                            {f.title}
                                        </h3>
                                        <p className="text-sm text-foreground-dim leading-relaxed group-hover:text-foreground/80 transition-colors">
                                            {f.desc}
                                        </p>
                                    </div>

                                    {/* Decorative subtle texture/gradient for cards */}
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};
