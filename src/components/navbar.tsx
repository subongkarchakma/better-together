"use client";

import { CalendarCheck, HeartHandshake, LogIn, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  function toggleTheme() {
    document.documentElement.classList.toggle("dark");
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand */}
        <a href="#" className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-xl bg-emerald-600 text-white shadow-sm shadow-emerald-600/30">
            <HeartHandshake className="size-5" />
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-bold text-emerald-700 dark:text-emerald-400">
              BetterTogether
            </span>
            <span className="block text-[10px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
              Neighbors Helping Neighbors
            </span>
          </span>
        </a>

        {/* Center link */}
        <a
          href="#drives"
          className="hidden items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:flex"
        >
          <CalendarCheck className="size-4" />
          Upcoming Drives
        </a>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            aria-label="Toggle dark mode"
            className="rounded-full"
            onClick={toggleTheme}
          >
            <Sun className="hidden dark:block" />
            <Moon className="dark:hidden" />
          </Button>
          <Button className="rounded-full" variant="outline">
            <LogIn data-icon="inline-start" />
            Log in
          </Button>
        </div>
      </nav>
    </header>
  );
}
