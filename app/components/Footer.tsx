import Link from "next/link";

const footerSections = [
  {
    title: "Shop",
    links: [
      { label: "All Collections", href: "/collections" },
      { label: "New Arrivals", href: "/collections?sort=new" },
      { label: "Best Sellers", href: "/collections?sort=best" },
      { label: "Gift Boxes", href: "/gift-boxes" },
      { label: "Bouquets", href: "/bouquets" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Glimora", href: "/about" },
      { label: "Our Story", href: "/about#story" },
      { label: "Sustainability", href: "/about#sustainability" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Shipping & Returns", href: "/shipping" },
      { label: "Size Guide", href: "/size-guide" },
      { label: "FAQs", href: "/faqs" },
    ],
  },
];

export default function Footer() {
  return (
    <footer id="footer" className="relative mt-auto border-t border-border bg-charcoal text-ivory/80">
      {/* ── Gold separator line ── */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* ── Brand Column ── */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <span
                className="text-2xl tracking-[0.3em] uppercase"
                style={{ fontFamily: "var(--font-heading, 'Playfair Display', serif)" }}
              >
                <span className="text-gradient-gold font-bold">Glimora</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ivory/50">
              Curating moments of luxury through exquisite jewellery, bespoke gift boxes,
              and jewel bouquets — crafted for those who celebrate life&apos;s finest details.
            </p>

            {/* ── Social Links ── */}
            <div className="mt-6 flex gap-4">
              {["Instagram", "Pinterest", "Facebook"].map((social) => (
                <a
                  key={social}
                  href="#"
                  aria-label={social}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/10 text-ivory/40 transition-all hover:border-gold/50 hover:text-gold hover:shadow-[0_0_15px_rgba(198,165,92,0.15)]"
                >
                  <span className="text-xs uppercase tracking-widest">
                    {social.charAt(0)}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* ── Link Columns ── */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-gold/80">
                {section.title}
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-ivory/50 transition-colors hover:text-gold"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom Bar ── */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-ivory/10 pt-8 md:flex-row">
          <p className="text-xs text-ivory/30">
            &copy; {new Date().getFullYear()} Glimora Designs. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
              (item) => (
                <Link
                  key={item}
                  href="#"
                  className="text-xs text-ivory/30 transition-colors hover:text-gold/60"
                >
                  {item}
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
