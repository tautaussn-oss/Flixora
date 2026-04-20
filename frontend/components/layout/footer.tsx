"use client";

import { ChevronUp, Plus, X } from "lucide-react";
import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";
import { useMemo, useState } from "react";

type FooterSection = {
  title: string;
  links: string[];
};

const footerSections: FooterSection[] = [
  {
    title: "TRAILERS",
    links: ["Trending trailers", "New releases", "Top picks", "Coming soon"],
  },
  {
    title: "DISCOVER",
    links: ["Movies", "Shows", "Genres", "Search"],
  },
  {
    title: "FEATURES",
    links: ["Watch trailers", "Dark mode", "Favorites", "Recommendations"],
  },
  {
    title: "COMPANY",
    links: ["About Flixora", "Careers", "Contact", "Press"],
  },
  {
    title: "RESOURCES",
    links: ["Help Center", "Privacy Policy", "Terms of Use", "FAQ"],
  },
];

export default function Footer() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const year = useMemo(() => new Date().getFullYear(), []);

  const toggleSection = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      className="border-t transition-colors duration-300"
      style={{
        backgroundColor: "var(--footer)",
        borderColor: "var(--border)",
        color: "var(--footer-text)",
      }}
    >
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-10">
        <div className="flex flex-col items-center">
          <h2
            className="text-2xl font-extrabold uppercase tracking-[0.25em]"
            style={{ color: "var(--accent)" }}
          >
            Flixora
          </h2>

          <p
            className="mt-3 max-w-xl text-center text-sm"
            style={{ color: "var(--footer-muted)" }}
          >
            Discover the latest movie trailers, explore upcoming releases and
            find what to watch next.
          </p>

          <div
            className="mt-6 flex items-center gap-6 text-lg"
            style={{ color: "var(--footer-muted)" }}
          >
            <a
              href="#"
              className="transition hover:opacity-70"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="transition hover:opacity-70"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a href="#" className="transition hover:opacity-70" aria-label="X">
              <FaXTwitter />
            </a>
            <a
              href="#"
              className="transition hover:opacity-70"
              aria-label="YouTube"
            >
              <FaYoutube />
            </a>
          </div>
        </div>

        <div className="mt-12">
          {footerSections.map((section, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={section.title}
                className="py-5"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <button
                  type="button"
                  onClick={() => toggleSection(index)}
                  className="flex w-full items-center justify-between text-left"
                >
                  <span className="text-lg font-semibold tracking-wide">
                    {section.title}
                  </span>

                  <span style={{ color: "var(--footer-muted)" }}>
                    {isOpen ? <X size={18} /> : <Plus size={18} />}
                  </span>
                </button>

                <div
                  className={`grid overflow-hidden transition-all duration-300 ${
                    isOpen ? "mt-4 grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p
                      className="mb-4 text-sm font-medium"
                      style={{ color: "var(--accent)" }}
                    >
                      Coming soon
                    </p>

                    <div
                      className="grid gap-3 pb-1 text-sm md:grid-cols-2"
                      style={{ color: "var(--footer-muted)" }}
                    >
                      {section.links.map((link) => (
                        <a
                          key={link}
                          href="#"
                          className="transition hover:opacity-70"
                        >
                          {link}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div
          className="mt-10 flex flex-col items-center justify-between gap-6 pt-8 text-sm md:flex-row"
          style={{
            borderTop: "1px solid var(--border)",
            color: "var(--footer-muted)",
          }}
        >
          <p className="text-center md:text-left">
            © {year} Flixora. All rights reserved. Flixora is a movie trailer
            discovery platform.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-5">
            <a href="#" className="transition hover:opacity-70">
              About Us
            </a>
            <a href="#" className="transition hover:opacity-70">
              Privacy Policy
            </a>
            <a href="#" className="transition hover:opacity-70">
              Help
            </a>
            <a href="#" className="transition hover:opacity-70">
              Terms of Use
            </a>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={handleBackToTop}
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5"
            style={{ backgroundColor: "var(--accent)" }}
          >
            Back to top
            <ChevronUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
