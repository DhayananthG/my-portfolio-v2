"use client";

import { useState, useEffect } from "react";
import { ShieldCheck } from "lucide-react";
import clsx from "clsx";
import { ThemeToggle } from "./ThemeToggle";

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = ["About", "Skills", "Projects", "Experience", "Contact"];

    const handleScrollTo = (id: string, e: React.MouseEvent) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: "smooth" });
    };

    if (!isMounted) return null;

    return (
        <nav 
            className={clsx(
                "fixed top-0 left-0 w-full z-[100] transition-all duration-300 border-b",
                isScrolled 
                    ? "bg-background/80 backdrop-blur-md border-card-border py-2 shadow-sm" 
                    : "bg-transparent border-transparent py-4"
            )}
        >
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                
                {/* Logo Area */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-foreground text-background flex items-center justify-center font-bold text-lg font-mono tracking-tighter rounded-sm">
                        D.
                    </div>
                    <div className="hidden md:block">
                        <span className="block text-xs font-bold tracking-widest leading-none text-foreground">DHAYANANTH</span>
                        <span className="text-[10px] text-foreground-dim font-mono">PORTFOLIO.SYS</span>
                    </div>
                </div>

                {/* Links (Center) */}
                <ul className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
                    {navLinks.map((item) => (
                        <li key={item}>
                            <a 
                                href={`#${item.toLowerCase()}`} 
                                onClick={(e) => handleScrollTo(item.toLowerCase(), e)}
                                className="text-xs font-mono tracking-wider text-foreground-dim hover:text-primary transition-colors uppercase font-bold cursor-pointer"
                            >
                                {item}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Right Side: Status + Theme Toggle */}
                <div className="flex items-center gap-4">
                     {/* Status Indicator (Desktop Only) */}
                    <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-surface-highlight rounded-full border border-card-border">
                        <ShieldCheck size={14} className="text-lime" />
                        <span className="text-[10px] font-mono text-lime tracking-wider">SECURE</span>
                    </div>

                    <ThemeToggle />
                </div>

            </div>
        </nav>
    );
};
