"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "@/data/portfolio";
import { Card3D } from "../ui/Card3D";
import { ExternalLink, Github, FolderGit2, Terminal, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const Projects = () => {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        // Header Reveal
        gsap.from(".projects-header", {
            y: 30, opacity: 0, duration: 0.8,
            scrollTrigger: { trigger: ".projects-header", start: "top 85%", once: true }
        });

        // Loop through projects for parallax entry
        const projects = gsap.utils.toArray<HTMLElement>(".project-entry");
        projects.forEach((proj, i) => {
            gsap.from(proj, {
                y: 100,
                opacity: 0,
                rotateX: -10,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: proj,
                    start: "top 90%",
                    end: "top 60%",
                    scrub: 1
                }
            });
        });
    }, { scope: containerRef });

  return (
    <section ref={containerRef} id="projects" className="py-24 relative bg-surface-highlight overflow-hidden">
      
      {/* Background Tech Lines */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="projects-header mb-16 flex items-end gap-4 border-b border-card-border pb-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
                <span className="text-lime font-mono text-sm block mb-2">EXPLORE MY</span>
                FEATURED PROJECTS
            </h2>
            <div className="hidden md:block flex-1 h-[1px] bg-card-border mb-2 relative">
                <div className="absolute right-0 bottom-0 w-20 h-[3px] bg-lime" />
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
            {portfolioData.projects.map((project, index) => (
                <div key={project.title} className="project-entry perspective-1000">
                    <Card3D className="w-full h-full" containerClassName="h-full">
                        <div className="h-full bg-card border border-card-border rounded-sm p-1 group hover:border-lime/50 transition-colors relative overflow-hidden">
                            
                            {/* Decorative Header Bar */}
                            <div className="h-6 bg-surface flex items-center justify-between px-3 border-b border-card-border">
                                <span className="text-[10px] font-mono text-foreground-dim">LOG_ID: {String(index + 1).padStart(3, '0')}</span>
                                <div className="flex gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-red-500/20" />
                                    <div className="w-2 h-2 rounded-full bg-yellow-500/20" />
                                    <div className="w-2 h-2 rounded-full bg-lime/20 group-hover:bg-lime transition-colors" />
                                </div>
                            </div>

                            {/* Main Content Area */}
                            <div className="p-6 relative z-10">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="bg-lime/10 p-3 rounded-sm text-lime border border-lime/20">
                                        <FolderGit2 size={24} />
                                    </div>
                                    <div className="flex gap-4">
                                        {project.github && (
                                            <a href={project.github} className="text-foreground-dim hover:text-primary transition-colors"><Github size={20} /></a>
                                        )}
                                        {project.link && (
                                            <a href={project.link} className="text-foreground-dim hover:text-cyan transition-colors"><ExternalLink size={20} /></a>
                                        )}
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-lime transition-colors mt-4">
                                    {project.title}
                                </h3>
                                
                                <div className="min-h-[80px] mb-6">
                                    <p className="text-sm font-mono text-foreground-dim leading-relaxed border-l-2 border-card-border pl-3">
                                        <span className="text-lime opacity-50 block text-[10px] mb-1">DESCRIPTION //</span>
                                        {project.description}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-card-border border-dashed">
                                    {project.tech.map(t => (
                                        <span key={t} className="text-[10px] font-mono px-2 py-1 rounded bg-surface text-cyan border border-card-border hover:border-cyan/30 transition-colors">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Hover Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-lime/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                            
                            {/* Scanning Line Effect */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-lime/5 to-transparent h-[20%] w-full -translate-y-full group-hover:animate-scanline pointer-events-none" />

                        </div>
                    </Card3D>
                </div>
            ))}
        </div>

      </div>
    </section>
  );
};
