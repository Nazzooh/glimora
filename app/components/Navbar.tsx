"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const navLinks = [
  { label: "Collections", href: "/collections" },
  { label: "Gift Boxes", href: "/gift-boxes" },
  { label: "Bouquets", href: "/bouquets" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass py-3 shadow-md"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* ── Logo ── */}
        <Link
          href="/"
          id="logo"
          className="group flex items-center gap-2"
        >
          <span
            className="text-2xl tracking-[0.3em] uppercase"
            style={{ fontFamily: "var(--font-heading, 'Playfair Display', serif)" }}
          >
            <span className="text-gradient-gold font-bold">Glimora</span>
          </span>
        </Link>

        {/* ── Desktop Nav Links ── */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="gold-underline text-sm tracking-[0.15em] uppercase text-foreground/80 transition-colors hover:text-gold"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* ── Desktop Actions ── */}
        <div className="hidden md:flex items-center gap-5">
          <Link
            href="/wishlist"
            id="nav-wishlist"
            className="text-foreground/70 transition-colors hover:text-gold"
            aria-label="Wishlist"
          >
            {/* Heart Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
            </svg>
          </Link>
          <Link
            href="/cart"
            id="nav-cart"
            className="text-foreground/70 transition-colors hover:text-gold"
            aria-label="Cart"
          >
            {/* Bag Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
              <path d="M3 6h18"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
          </Link>
          <Link
            href="/account"
            id="nav-account"
            className="ml-1 inline-flex items-center gap-2 rounded-full border border-gold/30 px-5 py-2 text-xs tracking-[0.15em] uppercase text-foreground/80 transition-all hover:border-gold hover:text-gold hover:shadow-[0_0_20px_rgba(198,165,92,0.15)]"
          >
            Sign In
          </Link>
        </div>

        {/* ── Mobile Menu Button ── */}
        <button
          id="mobile-menu-toggle"
          className="md:hidden text-foreground/80 transition-colors hover:text-gold"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            {mobileOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="4" y1="8" x2="20" y2="8" />
                <line x1="4" y1="16" x2="20" y2="16" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* ── Mobile Menu Drawer ── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          mobileOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="glass mx-4 mt-3 rounded-2xl p-6">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-sm tracking-[0.15em] uppercase text-foreground/80 transition-colors hover:text-gold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mt-2 border-t border-border pt-4">
              <Link
                href="/account"
                onClick={() => setMobileOpen(false)}
                className="inline-flex w-full items-center justify-center rounded-full border border-gold/30 px-5 py-2.5 text-xs tracking-[0.15em] uppercase text-foreground/80 transition-all hover:border-gold hover:text-gold"
              >
                Sign In
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
