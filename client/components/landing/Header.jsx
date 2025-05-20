"use client";
import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex justify-between items-center shadow-md px-20 py-10 h-15">
      <img src="/assets/joblix.svg" alt="Joblix Logo" className="w-20 h-20" />

      <nav className="space-x-6 hidden md:block">
        <a href="#features" className="hover:text-primary">
          Features
        </a>
        <a href="#categories" className="hover:text-primary">
          Jobs
        </a>
        <a href="#testimonials" className="hover:text-primary">
          Success Stories
        </a>
        <a href="#footer" className="hover:text-primary">
          Contact
        </a>
      </nav>

      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="p-2 rounded-full hover:bg-popover dark:hover:bg-muted transition-all duration-300 ease-in-out cursor-pointer"
        >
          {theme === "dark" ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-gray-800" />
          )}
        </button>
      </div>
    </header>
  );
}
