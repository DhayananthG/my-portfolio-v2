"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, Terminal, ShieldCheck, Mail, AlertTriangle } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

export const Contact = () => {
    const containerRef = useRef<HTMLElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

    useGSAP(() => {
        gsap.from(".contact-header", {
            y: 30, opacity: 0, duration: 0.8,
            scrollTrigger: { trigger: ".contact-header", start: "top 85%", once: true }
        });

        gsap.from(".contact-panel", {
            scale: 0.95, opacity: 0, duration: 0.8, delay: 0.2,
            scrollTrigger: { trigger: ".contact-panel", start: "top 80%", once: true }
        });
    }, { scope: containerRef });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");
        
        // Simulate Transmission
        gsap.to(formRef.current, { opacity: 0.5, pointerEvents: "none", duration: 0.3 });
        
        setTimeout(() => {
            setStatus("sent");
            gsap.fromTo(".success-message", 
                { scale: 0.8, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
            );
        }, 2000);
    };

    return (
        <section ref={containerRef} id="contact" className="py-24 relative overflow-hidden bg-background">
             {/* Background Grid */}
             <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

             <div className="max-w-4xl mx-auto px-6 relative z-10">
                
                {/* Header */}
                <div className="contact-header text-center mb-16">
                     <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-accent/5 border border-accent/20 text-accent text-xs font-mono mb-4">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                        </span>
                        AVAILABLE FOR HIRE
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
                        GET IN TOUCH
                    </h2>
                    <p className="text-foreground-dim font-mono text-sm max-w-lg mx-auto">
                        Send transmission to Sector 7. Encryption enabled.
                    </p>
                </div>

                {/* Main Console */}
                <div className="contact-panel bg-card border border-card-border p-1 relative group rounded-sm shadow-xl">
                    {/* Decorative Top Bar */}
                    <div className="bg-surface h-8 flex items-center px-4 border-b border-card-border justify-between rounded-t-[calc(var(--radius)-1px)]">
                         <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/20" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                            <div className="w-3 h-3 rounded-full bg-green-500/20" />
                         </div>
                         <span className="text-[10px] font-mono text-foreground-dim">CONTACT FORM</span>
                    </div>

                    <div className="p-8 md:p-12 relative overflow-hidden">
                        
                        {status === "sent" ? (
                            <div className="success-message flex flex-col items-center justify-center text-center py-10 space-y-4">
                                <div className="w-20 h-20 bg-lime/10 rounded-full flex items-center justify-center text-lime border border-lime/20 animate-pulse">
                                    <ShieldCheck size={40} />
                                </div>
                                <h3 className="text-2xl font-bold text-foreground">TRANSMISSION RECEIVED</h3>
                                <p className="text-foreground-dim font-mono text-sm">Our systems are processing your data. Expect a response shortly.</p>
                                <button 
                                    onClick={() => { setStatus("idle"); gsap.to(formRef.current, { opacity: 1, pointerEvents: "auto" }); }}
                                    className="mt-6 text-xs text-lime hover:underline font-mono"
                                >
                                    SEND_NEW_PACKET
                                </button>
                            </div>
                        ) : (
                            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-mono text-cyan">YOUR NAME</label>
                                        <input 
                                            required 
                                            type="text" 
                                            className="w-full bg-background/5 border border-card-border rounded-sm p-3 text-foreground focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan/50 transition-all font-mono text-sm placeholder:text-foreground-dim/30" 
                                            placeholder="ENTER NAME"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-mono text-cyan">YOUR EMAIL</label>
                                        <input 
                                            required 
                                            type="email" 
                                            className="w-full bg-background/5 border border-card-border rounded-sm p-3 text-foreground focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan/50 transition-all font-mono text-sm placeholder:text-foreground-dim/30" 
                                            placeholder="ENTER EMAIL"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-mono text-cyan">YOUR MESSAGE</label>
                                    <textarea 
                                        required 
                                        rows={5}
                                        className="w-full bg-background/5 border border-card-border rounded-sm p-3 text-foreground focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan/50 transition-all font-mono text-sm placeholder:text-foreground-dim/30" 
                                        placeholder="ENTER MESSAGE CONTENT..."
                                    />
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={status === "sending"}
                                    className="w-full py-4 bg-cyan/10 border border-cyan/30 text-cyan hover:bg-cyan hover:text-black font-bold tracking-widest transition-all flex items-center justify-center gap-2 group relative overflow-hidden"
                                >
                                    {status === "sending" ? (
                                        <span className="animate-pulse">SENDING...</span>
                                    ) : (
                                        <>
                                            <span className="relative z-10 flex items-center gap-2">SEND MESSAGE <Send size={16} /></span>
                                            <div className="absolute inset-0 bg-cyan/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                        </>
                                    )}
                                </button>
                                
                                <div className="flex justify-between items-center text-[10px] font-mono text-gray-600 pt-4">
                                    <span className="flex items-center gap-1"><AlertTriangle size={10} /> ENCRYPTED: AES-256</span>
                                    <span>LATENCY: 12ms</span>
                                </div>
                            </form>
                        )}
                        
                        {/* Decorative Corner Lines */}
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan/30" />
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan/30" />

                    </div>
                </div>

             </div>
        </section>
    );
};
