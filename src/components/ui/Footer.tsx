"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUp } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

export const Footer = () => {
    const footerRef = useRef<HTMLElement>(null);
    const { contextSafe } = useGSAP({ scope: footerRef });

    const handleScrollTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer ref={footerRef} className="relative w-full bg-background border-t border-card-border pt-20 pb-10">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,var(--color-primary)_0%,transparent_10%)] pointer-events-none opacity-20" />
            
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid md:grid-cols-4 gap-12 mb-16">
                    
                    {/* Col 1: Brand */}
                    <div className="col-span-1 md:col-span-2 space-y-4">
                        <div className="w-12 h-12 bg-foreground text-background flex items-center justify-center font-bold font-mono text-xl rounded-sm">
                            D.
                        </div>
                        <p className="text-foreground-dim text-sm max-w-xs leading-relaxed">
                            Crafting advanced digital experiences. Focused on performance, accessibility, and future-proof architecture.
                        </p>
                    </div>

                    {/* Col 2: Navigation */}
                    <div className="space-y-4">
                        <h4 className="text-xs font-mono text-foreground tracking-widest mb-6 border-b border-card-border pb-2 w-fit">NAVIGATION</h4>
                        <ul className="space-y-2">
                            {["About", "Skills", "Projects", "Experience", "Contact"].map(item => (
                                <li key={item}>
                                    <a href={`#${item.toLowerCase()}`} className="text-foreground-dim hover:text-primary transition-colors text-sm font-mono hover:pl-2 duration-300 block uppercase">
                                        // {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Col 3: Socials */}
                    <div className="space-y-4">
                        <h4 className="text-xs font-mono text-foreground tracking-widest mb-6 border-b border-card-border pb-2 w-fit">NETWORK</h4>
                        <ul className="space-y-2">
                             {portfolioData.socials.map((social, i) => (
                                <li key={i}>
                                    <a href={social.href} className="group flex items-center gap-3 text-foreground-dim hover:text-foreground transition-colors text-sm">
                                        <social.icon size={16} className="group-hover:text-primary transition-colors" />
                                        <span className="font-mono group-hover:tracking-widest transition-all duration-300">{social.label}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-card-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[10px] text-foreground-dim font-mono tracking-wider">
                        © 2025 {portfolioData.personal.name}. ALL RIGHTS RESERVED.
                    </p>
                    
                    <button 
                        onClick={handleScrollTop}
                        className="group flex items-center gap-2 text-[10px] font-mono text-foreground-dim hover:text-primary transition-colors uppercase tracking-widest"
                    >
                        Return to Top <ArrowUp size={12} className="group-hover:-translate-y-1 transition-transform" />
                    </button>
                </div>
            </div>
        </footer>
    );
};
