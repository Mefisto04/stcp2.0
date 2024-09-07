"use client";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "./theme-provider";
import { useEffect } from "react";
import { Burger } from "./Burger";
import { Link } from "./Link";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () =>
    theme === "light" ? setTheme("dark") : setTheme("light");

  useEffect(() => {
    const toggle = (e: KeyboardEvent) => {
      if (e.altKey && e.code === "KeyD") {
        e.preventDefault();
        toggleTheme();
      }
    };
    document.addEventListener("keydown", toggle);
    return () => document.removeEventListener("keydown", toggle);
  }, [toggleTheme]);

  return (
    <nav className="sticky top-0 z-20 flex w-[100vw] select-none items-center justify-between gap-16 overflow-visible border-b-2 bg-gray-800 p-4 lg:px-10 drop-shadow max-md:gap-0">
      <div className="flex items-center gap-4">
        <Burger />
        <img src="/logo.png" className="App-logo h-8" alt="logo" />
        <h3 className="text-3xl font-medium uppercase tracking-wide text-secondary max-md:hidden">
          STCP - 2.0
        </h3>
        <h3 className="hidden text-xl font-medium uppercase tracking-wide text-secondary max-md:block">
          STCP - 2.0
        </h3>
      </div>
      <div className="flex items-center gap-11 text-xl uppercase max-md:hidden">
        <Link
          href="/"
          text="Home"
          newTab
        />
        <Link href="#leaderboard" text="Leaderboard" />
        <Link href="#footer" text="About" />
      </div>
    </nav>
  );
}
