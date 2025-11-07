"use client";

import { MoonStar, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className="rounded-full border border-border p-2 text-muted-foreground"
      >
        <Sun className="h-4 w-4" />
      </button>
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "rounded-full border border-border p-2 transition-colors hover:bg-muted",
        isDark ? "text-foreground" : "text-muted-foreground",
      )}
    >
      {isDark ? <MoonStar className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </button>
  );
}
