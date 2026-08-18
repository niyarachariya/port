"use client";

import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#education", label: "Education" },
  { href: "#academic", label: "Academic" },
  { href: "#sop", label: "SOP" },
  { href: "#activities", label: "Activities" },
  { href: "#projects", label: "Projects" },
  { href: "#design", label: "Design Works" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <header className={`site-nav ${isScrolled ? "site-nav-scrolled" : ""}`}>
      <div className="site-nav-inner">
        <a href="#home" className="site-nav-brand" onClick={() => setIsOpen(false)}>
          NIYA<span className="site-nav-brand-dot">.</span>
        </a>

        <nav className="site-nav-links" aria-label="Section navigation">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="site-nav-toggle"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-nav-menu"
          onClick={() => setIsOpen((v) => !v)}
        >
          <span className={`site-nav-toggle-bar ${isOpen ? "open" : ""}`} />
          <span className={`site-nav-toggle-bar ${isOpen ? "open" : ""}`} />
          <span className={`site-nav-toggle-bar ${isOpen ? "open" : ""}`} />
        </button>
      </div>

      <nav
        id="mobile-nav-menu"
        className={`site-nav-mobile ${isOpen ? "open" : ""}`}
        aria-label="Mobile section navigation"
        aria-hidden={!isOpen}
      >
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setIsOpen(false)}>
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
