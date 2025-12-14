"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.from(".feature-card", {
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "out",
            scrollTrigger: {
                trigger: ".features-grid",
                start: "top 85%", // Trigger slightly earlier
                once: true
            }
        });
    }, { scope: containerRef });

  return (
    <section ref={containerRef} id="about" className="py-32 relative bg-background border-b border-card-border">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="mb-20 max-w-2xl">
            <h2 className="text-4xl text-foreground font-bold mb-6">
                <span className="text-secondary">/</span> CORE_DIRECTIVES
            </h2>
            <p className="text-xl text-foreground-dim leading-relaxed">
                {portfolioData.personal.description}
            </p>
        </div>

        <div className="features-grid grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {portfolioData.aboutFeatures.map((f, i) => (
                <div key={i} className="feature-card group p-8 bg-card/40 border border-card-border hover:border-cyan/30 transition-all rounded-sm backdrop-blur-sm">
                    <div className="mb-6 p-4 bg-primary/10 w-fit rounded-sm text-primary group-hover:bg-primary group-hover:text-background transition-colors">
                        <f.icon size={28} />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{f.title}</h3>
                    <p className="text-sm text-foreground-dim leading-relaxed">
                        {f.desc}
                    </p>
                </div>
            ))}
        </div>

      </div>
    </section>
  );
};
