"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

export const Experience = () => {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.from(".exp-header", {
            y: 30, opacity: 0, duration: 0.8,
            scrollTrigger: { trigger: ".exp-header", start: "top 85%", once: true }
        });

        gsap.from(".timeline-block", {
            x: -20, opacity: 0, duration: 0.6, stagger: 0.2,
            scrollTrigger: { trigger: ".timeline-container", start: "top 80%", once: true }
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} id="experience" className="py-24 relative bg-background">
            
            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
                
                {/* Header Side */}
                <div className="exp-header sticky top-32 h-fit">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-card/40 border border-card-border text-xs font-mono mb-6 text-foreground-dim">
                         <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
                         CAREER_LOGS
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                        System Runtime <br/> <span className="text-foreground-dim">History</span>
                    </h2>
                    <p className="text-foreground-dim text-lg max-w-md leading-relaxed">
                        A chronological trace of valid execution contexts and organizational deployments.
                    </p>
                </div>

                {/* Timeline Side */}
                <div className="timeline-container relative pt-8">
                    {/* Vertical Line */}
                    <div className="absolute left-[19px] top-0 bottom-0 w-[1px] bg-card-border" />

                    <div className="space-y-12">
                        {portfolioData.experience.map((exp, i) => (
                            <div key={i} className="timeline-block relative pl-12 group">
                                {/* Dot */}
                                <div className="absolute left-[14px] top-1.5 w-[11px] h-[11px] rounded-full bg-background border-2 border-foreground-dim group-hover:border-primary group-hover:bg-primary transition-colors z-10 shadow-[0_0_0_4px_var(--color-background)]" />
                                
                                <span className="text-xs font-mono text-primary mb-2 block">{exp.year}</span>
                                <h3 className="text-2xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{exp.role}</h3>
                                
                                <div className="flex items-center gap-2 text-sm text-foreground-dim font-mono mb-4">
                                     <Briefcase size={14} /> {exp.company}
                                </div>
                                
                                <p className="text-foreground-dim leading-relaxed text-sm bg-card/40 p-4 border-l-2 border-card-border group-hover:border-primary transition-colors rounded-r-md">
                                    {exp.desc || exp.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};
