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
        <section ref={containerRef} id="contact" className="py-24 relative overflow-hidden bg-black">
             {/* Background Grid - Darker */}
             <div className="absolute inset-0 bg-[linear-gradient(rgba(20,20,30,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(20,20,30,0.8)_1px,transparent_1px)] bg-[size:30px_30px] opacity-20" />

             <div className="max-w-4xl mx-auto px-6 relative z-10">
                
                {/* Header */}
                <div className="contact-header text-center mb-16">
                     <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-accent/5 border border-accent/20 text-accent text-xs font-mono mb-4">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                        </span>
                        SECURE_CHANNEL_READY
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
                        INITIATE_UPLINK
                    </h2>
                    <p className="text-foreground-dim font-mono text-sm max-w-lg mx-auto">
                        Send transmission to Sector 7. Encryption enabled.
                    </p>
                </div>

                {/* Main Console */}
                <div className="contact-panel bg-surface border border-white/10 p-1 relative group">
                    {/* Decorative Top Bar */}
                    <div className="bg-surface-highlight h-8 flex items-center px-4 border-b border-white/10 justify-between">
                         <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/20" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                            <div className="w-3 h-3 rounded-full bg-green-500/20" />
                         </div>
                         <span className="text-[10px] font-mono text-foreground-dim">TERMINAL_V3.0</span>
                    </div>

                    <div className="p-8 md:p-12 relative overflow-hidden">
                        
                        {status === "sent" ? (
                            <div className="success-message flex flex-col items-center justify-center text-center py-10 space-y-4">
                                <div className="w-20 h-20 bg-lime/10 rounded-full flex items-center justify-center text-lime border border-lime/20 animate-pulse">
                                    <ShieldCheck size={40} />
                                </div>
                                <h3 className="text-2xl font-bold text-white">TRANSMISSION RECEIVED</h3>
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
                                        <label className="text-xs font-mono text-cyan">USER_ID</label>
                                        <input 
                                            required 
                                            type="text" 
                                            className="w-full bg-black/50 border border-white/10 rounded-sm p-3 text-white focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan/50 transition-all font-mono text-sm placeholder:text-gray-700" 
                                            placeholder="ENTER NAME"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-mono text-cyan">RETURN_ADDRESS</label>
                                        <input 
                                            required 
                                            type="email" 
                                            className="w-full bg-black/50 border border-white/10 rounded-sm p-3 text-white focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan/50 transition-all font-mono text-sm placeholder:text-gray-700" 
                                            placeholder="ENTER EMAIL"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-mono text-cyan">DATA_PACKET</label>
                                    <textarea 
                                        required 
                                        rows={5}
                                        className="w-full bg-black/50 border border-white/10 rounded-sm p-3 text-white focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan/50 transition-all font-mono text-sm placeholder:text-gray-700" 
                                        placeholder="ENTER MESSAGE CONTENT..."
                                    />
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={status === "sending"}
                                    className="w-full py-4 bg-cyan/10 border border-cyan/30 text-cyan hover:bg-cyan hover:text-black font-bold tracking-widest transition-all flex items-center justify-center gap-2 group relative overflow-hidden"
                                >
                                    {status === "sending" ? (
                                        <span className="animate-pulse">TRANSMITTING...</span>
                                    ) : (
                                        <>
                                            <span className="relative z-10 flex items-center gap-2">EXECUTE_SEND <Send size={16} /></span>
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
