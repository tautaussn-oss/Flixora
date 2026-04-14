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
    const savedTheme = localStorage.getItem("flixora-theme");

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }

    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const nextThemeIsDark = !isDark;

    if (nextThemeIsDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("flixora-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("flixora-theme", "light");
    }

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

          {mounted && (
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
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
