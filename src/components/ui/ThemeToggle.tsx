"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? <Sun size={18} className="text-white" /> : <Moon size={18} className="text-slate-900" />}
    </button>
  );
}
