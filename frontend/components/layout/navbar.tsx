"use client";

import Link from "next/link";
import { Moon, Search, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Shows", href: "/shows" },
  { name: "Movies", href: "/movie" },
  { name: "Latest", href: "/latest" },
  { name: "My List", href: "/my-list" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const savedTheme = localStorage.getItem("flixora-theme");
      const nextDark = savedTheme === "dark";

      document.documentElement.classList.toggle("dark", nextDark);
      setIsDark(nextDark);
      setMounted(true);
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  const toggleTheme = () => {
    const nextThemeIsDark = !isDark;

    document.documentElement.classList.toggle("dark", nextThemeIsDark);
    localStorage.setItem("flixora-theme", nextThemeIsDark ? "dark" : "light");
    setIsDark(nextThemeIsDark);
  };

  return (
    <header
      className="fixed top-0 left-0 z-50 w-full border-b backdrop-blur-xl transition-colors duration-300"
      style={{
        backgroundColor: "var(--navbar)",
        borderColor: "var(--border)",
        color: "var(--text)",
      }}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-10">
        <div className="flex items-center gap-10">
          <Link
            href="/"
            className="text-3xl font-extrabold uppercase tracking-wider"
            style={{ color: "var(--accent)" }}
          >
            Flixora
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium transition-opacity hover:opacity-100"
                  style={{
                    color: isActive ? "var(--text)" : "var(--muted)",
                  }}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full transition hover:scale-105"
            style={{
              backgroundColor: "var(--surface)",
              color: "var(--text)",
              border: "1px solid var(--border)",
            }}
            aria-label="Search"
          >
            <Search size={18} />
          </button>

          <Link
            href="/kids"
            className="hidden text-sm font-medium md:block"
            style={{ color: "var(--muted)" }}
          >
            Kids
          </Link>

          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-full transition hover:scale-105"
            style={{
              backgroundColor: "var(--surface)",
              color: "var(--text)",
              border: "1px solid var(--border)",
            }}
            aria-label="Toggle theme"
          >
            {mounted ? (
              isDark ? (
                <Sun size={18} />
              ) : (
                <Moon size={18} />
              )
            ) : (
              <span className="h-[18px] w-[18px]" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
