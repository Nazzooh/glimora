import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* ═══════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════ */}
      <section
        id="hero"
        className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-charcoal"
      >
        {/* ── Ambient glow ── */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/5 blur-[120px]" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center fade-in-up">
          <p className="mb-6 text-xs tracking-[0.4em] uppercase text-gold/70">
            ✦ Luxury Jewellery & Bespoke Gifts ✦
          </p>

          <h1
            className="text-5xl leading-tight sm:text-6xl md:text-7xl lg:text-8xl text-ivory"
            style={{ fontFamily: "var(--font-heading, 'Playfair Display', serif)" }}
          >
            Crafted for Life&apos;s{" "}
            <span className="text-gradient-gold italic">Finest</span>{" "}
            Moments
          </h1>

          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-ivory/50 sm:text-lg">
            Discover exquisite jewellery, bespoke gift boxes, and jewel bouquets —
            each piece tells a story of elegance and artistry.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/collections"
              id="hero-cta-primary"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gold px-8 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase text-obsidian transition-all hover:bg-gold-light hover:shadow-[0_0_40px_rgba(198,165,92,0.3)]"
            >
              Explore Collections
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                <path d="M5 12h14"/>
                <path d="m12 5 7 7-7 7"/>
              </svg>
            </Link>
            <Link
              href="/gift-boxes"
              id="hero-cta-secondary"
              className="inline-flex items-center gap-2 rounded-full border border-ivory/20 px-8 py-3.5 text-xs tracking-[0.2em] uppercase text-ivory/70 transition-all hover:border-gold/50 hover:text-gold"
            >
              Gift Boxes
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SIGNATURE EXPERIENCES
          ═══════════════════════════════════════ */}
      <section id="experiences" className="bg-ivory py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs tracking-[0.3em] uppercase text-gold">
              Signature Experiences
            </p>
            <h2
              className="mt-3 text-3xl sm:text-4xl md:text-5xl text-charcoal"
              style={{ fontFamily: "var(--font-heading, 'Playfair Display', serif)" }}
            >
              Beyond Jewellery
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm text-muted">
              From bespoke gift boxes to jewel-studded bouquets, we create
              extraordinary experiences for extraordinary people.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                id: "exp-jewellery",
                title: "Fine Jewellery",
                desc: "Timeless pieces crafted with precision, from everyday elegance to statement designs.",
                icon: "💎",
              },
              {
                id: "exp-giftbox",
                title: "Gift Box Builder",
                desc: "Curate the perfect gift — choose jewellery, accessories, cards, and wrapping.",
                icon: "🎁",
              },
              {
                id: "exp-bouquet",
                title: "Jewel Bouquets",
                desc: "Where flowers meet gemstones — unique bouquets for milestone celebrations.",
                icon: "💐",
              },
            ].map((item) => (
              <div
                key={item.id}
                id={item.id}
                className="group relative overflow-hidden rounded-2xl border border-border bg-cream-warm/30 p-8 transition-all duration-500 hover:border-gold/30 hover:shadow-[0_8px_40px_rgba(198,165,92,0.08)]"
              >
                <div className="text-4xl">{item.icon}</div>
                <h3
                  className="mt-5 text-xl text-charcoal"
                  style={{ fontFamily: "var(--font-heading, 'Playfair Display', serif)" }}
                >
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.desc}
                </p>
                <div className="mt-6">
                  <span className="gold-underline cursor-pointer text-xs tracking-[0.15em] uppercase text-gold">
                    Discover More
                  </span>
                </div>
                {/* ── Shimmer overlay ── */}
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 shimmer" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          NEWSLETTER
          ═══════════════════════════════════════ */}
      <section id="newsletter" className="relative overflow-hidden bg-charcoal py-24">
        {/* ── Ambient glow ── */}
        <div className="pointer-events-none absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-gold/5 blur-[100px]" />

        <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-gold/70">
            Stay Inspired
          </p>
          <h2
            className="mt-3 text-3xl sm:text-4xl text-ivory"
            style={{ fontFamily: "var(--font-heading, 'Playfair Display', serif)" }}
          >
            Join the Glimora World
          </h2>
          <p className="mt-4 text-sm text-ivory/50">
            Be the first to discover new collections, exclusive offers, and
            stories from our atelier.
          </p>

          <form
            id="newsletter-form"
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row"
            action="/api/newsletter"
          >
            <input
              type="email"
              id="newsletter-email"
              placeholder="Your email address"
              className="w-full flex-1 rounded-full border border-ivory/10 bg-ivory/5 px-6 py-3.5 text-sm text-ivory placeholder:text-ivory/30 outline-none transition-all focus:border-gold/50 focus:ring-1 focus:ring-gold/20"
              required
            />
            <button
              type="submit"
              id="newsletter-submit"
              className="w-full rounded-full bg-gold px-8 py-3.5 text-xs font-semibold tracking-[0.15em] uppercase text-obsidian transition-all hover:bg-gold-light hover:shadow-[0_0_30px_rgba(198,165,92,0.25)] sm:w-auto"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
