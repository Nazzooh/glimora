import { useState, useEffect, useRef } from "react";

// ============================================================
// DESIGN TOKENS
// ============================================================
const COLORS = {
  gold: "#C9A84C",
  goldLight: "#E8D5A3",
  goldDark: "#A07830",
  cream: "#FAF7F2",
  charcoal: "#1A1A1A",
  text: "#2C2C2C",
  muted: "#7A7A7A",
  border: "#E8E0D0",
  success: "#2D7A4F",
  danger: "#C0392B",
  warning: "#E67E22",
  info: "#2980B9",
  white: "#FFFFFF",
  bgLight: "#F5F0E8",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Inter', sans-serif; background: ${COLORS.cream}; color: ${COLORS.text}; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: ${COLORS.cream}; }
  ::-webkit-scrollbar-thumb { background: ${COLORS.gold}; border-radius: 3px; }
`;

// ============================================================
// SHARED DATA
// ============================================================
const products = [
  { id:1, name:"Celestial Pearl Necklace", sku:"JW-001", category:"Necklaces", price:2499, cost:800, stock:15, status:"Active", rating:4.8, reviews:124, image:"💎", badge:"Best Seller" },
  { id:2, name:"Rose Gold Hoop Earrings", sku:"JW-002", category:"Earrings", price:1299, cost:400, stock:3, status:"Active", rating:4.6, reviews:89, image:"✨", badge:"Low Stock" },
  { id:3, name:"Diamond Tennis Bracelet", sku:"JW-003", category:"Bracelets", price:5999, cost:2000, stock:8, status:"Active", rating:4.9, reviews:56, image:"💍", badge:"New" },
  { id:4, name:"Emerald Ring Set", sku:"JW-004", category:"Rings", price:3299, cost:1100, stock:0, status:"Out of Stock", rating:4.7, reviews:43, image:"💚", badge:"" },
  { id:5, name:"Gold Anklet Chain", sku:"JW-005", category:"Anklets", price:899, cost:250, stock:22, status:"Active", rating:4.5, reviews:201, image:"⚡", badge:"" },
  { id:6, name:"Luxury Pearl Watch", sku:"JW-006", category:"Watches", price:8999, cost:3500, stock:5, status:"Active", rating:4.9, reviews:31, image:"⌚", badge:"Premium" },
  { id:7, name:"Floral Hair Clip Set", sku:"AC-001", category:"Hair Accessories", price:499, cost:120, stock:45, status:"Active", rating:4.3, reviews:178, image:"🌸", badge:"" },
  { id:8, name:"Mini Leather Wallet", sku:"AC-002", category:"Wallets", price:1199, cost:350, stock:18, status:"Active", rating:4.6, reviews:92, image:"👛", badge:"" },
  { id:9, name:"Jewel Bouquet - Gold", sku:"GB-001", category:"Jewel Bouquets", price:3499, cost:1200, stock:12, status:"Active", rating:5.0, reviews:67, image:"💐", badge:"Signature" },
  { id:10, name:"Anniversary Gift Box", sku:"GF-001", category:"Gift Boxes", price:4999, cost:1800, stock:20, status:"Active", rating:4.8, reviews:145, image:"🎁", badge:"Popular" },
];

const orders = [
  { id:"#GL-2401", customer:"Priya Menon", items:3, total:7497, status:"Pending", date:"2024-01-15", payment:"UPI", city:"Kochi" },
  { id:"#GL-2400", customer:"Ananya Sharma", items:1, total:5999, status:"Shipped", date:"2024-01-14", payment:"Card", city:"Mumbai" },
  { id:"#GL-2399", customer:"Deepa Nair", items:2, total:3798, status:"Delivered", date:"2024-01-13", payment:"GPay", city:"Bangalore" },
  { id:"#GL-2398", customer:"Meera Krishnan", items:4, total:12996, status:"Confirmed", date:"2024-01-13", payment:"UPI", city:"Chennai" },
  { id:"#GL-2397", customer:"Shalini Reddy", items:1, total:8999, status:"Packed", date:"2024-01-12", payment:"Card", city:"Hyderabad" },
  { id:"#GL-2396", customer:"Rima Das", items:2, total:2398, status:"Cancelled", date:"2024-01-11", payment:"COD", city:"Kolkata" },
  { id:"#GL-2395", customer:"Kavya Pillai", items:3, total:9697, status:"Delivered", date:"2024-01-10", payment:"GPay", city:"Trivandrum" },
  { id:"#GL-2394", customer:"Sneha Iyer", items:1, total:1299, status:"Refunded", date:"2024-01-09", payment:"Card", city:"Pune" },
];

const customers = [
  { id:1, name:"Priya Menon", email:"priya@email.com", orders:12, spent:45670, city:"Kochi", joined:"Jan 2023", status:"VIP" },
  { id:2, name:"Ananya Sharma", email:"ananya@email.com", orders:5, spent:18990, city:"Mumbai", joined:"Mar 2023", status:"Regular" },
  { id:3, name:"Deepa Nair", email:"deepa@email.com", orders:23, spent:89450, city:"Bangalore", joined:"Nov 2022", status:"VIP" },
  { id:4, name:"Meera Krishnan", email:"meera@email.com", orders:8, spent:31200, city:"Chennai", joined:"Jun 2023", status:"Regular" },
  { id:5, name:"Shalini Reddy", email:"shalini@email.com", orders:3, spent:14997, city:"Hyderabad", joined:"Sep 2023", status:"New" },
];

const reviews = [
  { id:1, customer:"Priya M.", product:"Celestial Pearl Necklace", rating:5, text:"Absolutely stunning! The quality is exceptional and packaging was beautiful.", date:"Jan 14", status:"Pending" },
  { id:2, customer:"Ananya S.", product:"Rose Gold Hoop Earrings", rating:4, text:"Lovely earrings, exactly as pictured. Fast delivery too!", date:"Jan 13", status:"Approved" },
  { id:3, customer:"Deepa N.", product:"Jewel Bouquet - Gold", rating:5, text:"My sister loved it! The most unique gift I've ever given.", date:"Jan 12", status:"Approved" },
  { id:4, customer:"Meera K.", product:"Diamond Tennis Bracelet", rating:3, text:"Good quality but took longer than expected.", date:"Jan 11", status:"Pending" },
];

const coupons = [
  { id:1, code:"GLIMORA20", type:"Percentage", value:20, usage:145, limit:500, expiry:"Feb 28", status:"Active" },
  { id:2, code:"FLAT500", type:"Flat", value:500, usage:89, limit:200, expiry:"Jan 31", status:"Active" },
  { id:3, code:"FREESHIP", type:"Free Shipping", value:0, usage:234, limit:1000, expiry:"Mar 15", status:"Active" },
  { id:4, code:"WELCOME10", type:"Percentage", value:10, usage:500, limit:500, expiry:"Dec 31", status:"Expired" },
];

// ============================================================
// UTILITY COMPONENTS
// ============================================================
const Badge = ({ children, color = COLORS.gold }) => (
  <span style={{ background: color + "20", color, border: `1px solid ${color}40`, padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, whiteSpace: "nowrap" }}>
    {children}
  </span>
);

const StatusBadge = ({ status }) => {
  const map = {
    Active: COLORS.success, Pending: COLORS.warning, Shipped: COLORS.info,
    Delivered: COLORS.success, Confirmed: COLORS.gold, Packed: "#8E44AD",
    Cancelled: COLORS.danger, Refunded: COLORS.muted, "Out of Stock": COLORS.danger,
    Approved: COLORS.success, Expired: COLORS.muted, VIP: COLORS.gold, Regular: COLORS.info, New: COLORS.success
  };
  return <Badge color={map[status] || COLORS.muted}>{status}</Badge>;
};

const Btn = ({ children, variant = "primary", onClick, size = "md", style = {} }) => {
  const styles = {
    primary: { background: COLORS.gold, color: COLORS.white, border: "none" },
    secondary: { background: "transparent", color: COLORS.gold, border: `1px solid ${COLORS.gold}` },
    danger: { background: COLORS.danger, color: COLORS.white, border: "none" },
    ghost: { background: "transparent", color: COLORS.muted, border: `1px solid ${COLORS.border}` },
  };
  const sizes = { sm: { padding: "4px 12px", fontSize: 12 }, md: { padding: "8px 18px", fontSize: 13 }, lg: { padding: "12px 28px", fontSize: 15 } };
  return (
    <button onClick={onClick} style={{ ...styles[variant], ...sizes[size], borderRadius: 8, fontFamily: "Inter", fontWeight: 600, cursor: "pointer", transition: "opacity .15s", ...style }}
      onMouseEnter={e => e.target.style.opacity = ".85"} onMouseLeave={e => e.target.style.opacity = "1"}>
      {children}
    </button>
  );
};

const Card = ({ children, style = {} }) => (
  <div style={{ background: COLORS.white, borderRadius: 14, border: `1px solid ${COLORS.border}`, padding: 20, ...style }}>
    {children}
  </div>
);

const Input = ({ label, value, onChange, type = "text", placeholder = "" }) => (
  <div style={{ marginBottom: 14 }}>
    {label && <label style={{ fontSize: 12, fontWeight: 600, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>{label}</label>}
    <input type={type} value={value} onChange={onChange} placeholder={placeholder}
      style={{ width: "100%", padding: "10px 14px", border: `1px solid ${COLORS.border}`, borderRadius: 8, fontSize: 14, background: COLORS.white, color: COLORS.text, outline: "none", fontFamily: "Inter" }} />
  </div>
);

const Select = ({ label, value, onChange, options }) => (
  <div style={{ marginBottom: 14 }}>
    {label && <label style={{ fontSize: 12, fontWeight: 600, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>{label}</label>}
    <select value={value} onChange={onChange}
      style={{ width: "100%", padding: "10px 14px", border: `1px solid ${COLORS.border}`, borderRadius: 8, fontSize: 14, background: COLORS.white, color: COLORS.text, fontFamily: "Inter", outline: "none" }}>
      {options.map(o => <option key={o}>{o}</option>)}
    </select>
  </div>
);

const Stars = ({ rating }) => "★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating));

const ProgressBar = ({ value, max = 100, color = COLORS.gold }) => (
  <div style={{ background: COLORS.bgLight, borderRadius: 4, height: 6, overflow: "hidden" }}>
    <div style={{ width: `${(value / max) * 100}%`, height: "100%", background: color, borderRadius: 4 }} />
  </div>
);

// ============================================================
// STOREFRONT SCREENS
// ============================================================

// 1. LANDING PAGE
const LandingPage = ({ nav }) => {
  const [heroIdx, setHeroIdx] = useState(0);
  const heroes = [
    { tag: "New Collection 2024", title: "Adorn Yourself\nWith Luxury", sub: "Handcrafted jewellery that tells your story", cta: "Shop Now" },
    { tag: "Limited Edition", title: "Wedding\nCollection", sub: "Timeless pieces for your forever moments", cta: "Explore" },
    { tag: "Custom Gifts", title: "Jewel Bouquets\n& Gift Boxes", sub: "The most unique gifts they'll ever receive", cta: "Build a Gift" },
  ];
  useEffect(() => { const t = setInterval(() => setHeroIdx(i => (i + 1) % 3), 4000); return () => clearInterval(t); }, []);
  const h = heroes[heroIdx];

  const collections = [
    { name: "Necklaces", emoji: "💎", count: 48 }, { name: "Earrings", emoji: "✨", count: 63 },
    { name: "Bracelets", emoji: "💫", count: 29 }, { name: "Rings", emoji: "💍", count: 41 },
    { name: "Watches", emoji: "⌚", count: 15 }, { name: "Gift Boxes", emoji: "🎁", count: 22 },
  ];
  const testimonials = [
    { name: "Riya S.", text: "The pearl necklace I ordered was absolutely stunning. Packaging was a dream.", rating: 5, city: "Mumbai" },
    { name: "Kavya R.", text: "Ordered a jewel bouquet for my sister's wedding. Everyone was speechless!", rating: 5, city: "Bangalore" },
    { name: "Meera P.", text: "Quality is top-notch. My go-to for gifts. Delivered in 2 days!", rating: 5, city: "Kochi" },
  ];

  return (
    <div>
      {/* HERO */}
      <div style={{ background: `linear-gradient(135deg, ${COLORS.charcoal} 0%, #2C2000 100%)`, minHeight: 520, display: "flex", alignItems: "center", padding: "60px 60px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: "45%", height: "100%", background: `radial-gradient(ellipse at center, ${COLORS.gold}15 0%, transparent 70%)` }} />
        <div style={{ position: "absolute", bottom: -80, right: 80, fontSize: 240, opacity: 0.04, userSelect: "none" }}>✦</div>
        <div style={{ maxWidth: 520, zIndex: 1 }}>
          <span style={{ color: COLORS.gold, fontSize: 12, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", border: `1px solid ${COLORS.gold}40`, padding: "4px 16px", borderRadius: 20 }}>{h.tag}</span>
          <h1 style={{ fontFamily: "Playfair Display", fontSize: 52, fontWeight: 700, color: COLORS.white, lineHeight: 1.15, marginTop: 20, whiteSpace: "pre-line" }}>{h.title}</h1>
          <p style={{ color: "#AAA", fontSize: 16, marginTop: 16, lineHeight: 1.6 }}>{h.sub}</p>
          <div style={{ display: "flex", gap: 12, marginTop: 30 }}>
            <Btn onClick={() => nav("categories")} size="lg">{h.cta}</Btn>
            <Btn variant="secondary" size="lg" onClick={() => nav("categories")}>View All</Btn>
          </div>
          <div style={{ display: "flex", gap: 24, marginTop: 36 }}>
            {[["10K+", "Happy Customers"], ["500+", "Products"], ["4.9★", "Rating"]].map(([v, l]) => (
              <div key={l}>
                <div style={{ color: COLORS.gold, fontFamily: "Playfair Display", fontSize: 22, fontWeight: 700 }}>{v}</div>
                <div style={{ color: "#888", fontSize: 11, marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 16, flexWrap: "wrap", maxWidth: 400, justifyContent: "center" }}>
          {products.slice(0,4).map(p => (
            <div key={p.id} onClick={() => nav("product", p)} style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${COLORS.gold}30`, borderRadius: 16, padding: "20px 24px", textAlign: "center", cursor: "pointer", transition: "all .2s", width: 170 }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(201,168,76,0.1)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}>
              <div style={{ fontSize: 40, marginBottom: 8 }}>{p.image}</div>
              <div style={{ color: COLORS.white, fontSize: 13, fontWeight: 500 }}>{p.name}</div>
              <div style={{ color: COLORS.gold, fontSize: 14, fontWeight: 700, marginTop: 4 }}>₹{p.price.toLocaleString()}</div>
              {p.badge && <div style={{ marginTop: 6 }}><Badge>{p.badge}</Badge></div>}
            </div>
          ))}
        </div>
        {/* Slide dots */}
        <div style={{ position: "absolute", bottom: 24, left: 60, display: "flex", gap: 8 }}>
          {[0,1,2].map(i => (
            <div key={i} onClick={() => setHeroIdx(i)} style={{ width: i === heroIdx ? 24 : 8, height: 8, borderRadius: 4, background: i === heroIdx ? COLORS.gold : "#555", cursor: "pointer", transition: "all .3s" }} />
          ))}
        </div>
      </div>

      {/* FEATURED COLLECTIONS */}
      <div style={{ padding: "56px 60px", background: COLORS.cream }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ color: COLORS.gold, fontSize: 11, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase" }}>Browse by Category</div>
          <h2 style={{ fontFamily: "Playfair Display", fontSize: 36, marginTop: 8 }}>Our Collections</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 16 }}>
          {collections.map(c => (
            <div key={c.name} onClick={() => nav("categories")} style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: "28px 16px", textAlign: "center", cursor: "pointer", transition: "all .2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = COLORS.gold; e.currentTarget.style.boxShadow = `0 4px 20px ${COLORS.gold}20`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = COLORS.border; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ fontSize: 36, marginBottom: 10 }}>{c.emoji}</div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{c.name}</div>
              <div style={{ color: COLORS.muted, fontSize: 12, marginTop: 4 }}>{c.count} items</div>
            </div>
          ))}
        </div>
      </div>

      {/* BEST SELLERS */}
      <div style={{ padding: "56px 60px", background: COLORS.bgLight }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
          <div>
            <div style={{ color: COLORS.gold, fontSize: 11, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase" }}>Top Picks</div>
            <h2 style={{ fontFamily: "Playfair Display", fontSize: 36, marginTop: 6 }}>Best Sellers</h2>
          </div>
          <Btn variant="secondary" onClick={() => nav("categories")}>View All →</Btn>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
          {products.slice(0,4).map(p => (
            <div key={p.id} onClick={() => nav("product", p)} style={{ background: COLORS.white, borderRadius: 16, overflow: "hidden", border: `1px solid ${COLORS.border}`, cursor: "pointer", transition: "all .2s" }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = `0 8px 30px ${COLORS.gold}20`}
              onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
              <div style={{ height: 180, background: `linear-gradient(135deg, ${COLORS.charcoal}10, ${COLORS.gold}15)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 64 }}>
                {p.image}
              </div>
              <div style={{ padding: 16 }}>
                {p.badge && <div style={{ marginBottom: 8 }}><Badge>{p.badge}</Badge></div>}
                <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{p.name}</div>
                <div style={{ color: COLORS.muted, fontSize: 12, marginBottom: 8 }}>{p.category}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ color: COLORS.gold, fontWeight: 700, fontSize: 16 }}>₹{p.price.toLocaleString()}</div>
                  <div style={{ color: COLORS.gold, fontSize: 12 }}>★ {p.rating} ({p.reviews})</div>
                </div>
                <Btn style={{ width: "100%", marginTop: 12, textAlign: "center" }} onClick={() => nav("product", p)}>Add to Cart</Btn>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SIGNATURE FEATURES */}
      <div style={{ padding: "56px 60px", background: COLORS.charcoal }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ color: COLORS.gold, fontSize: 11, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase" }}>Exclusively at Glimora</div>
          <h2 style={{ fontFamily: "Playfair Display", fontSize: 36, color: COLORS.white, marginTop: 8 }}>Our Signature Experiences</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {[
            { emoji: "💐", title: "Jewel Bouquets", desc: "Handcrafted bouquets of real flowers intertwined with fine jewellery — a gift unlike any other.", cta: "Build a Bouquet", action: "bouquet-builder" },
            { emoji: "🎁", title: "Custom Gift Boxes", desc: "Curate the perfect gift box with jewellery, accessories, and a personal message card.", cta: "Create a Box", action: "gift-builder" },
          ].map(f => (
            <div key={f.title} style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${COLORS.gold}30`, borderRadius: 20, padding: 36, display: "flex", gap: 24, alignItems: "flex-start" }}>
              <div style={{ fontSize: 52 }}>{f.emoji}</div>
              <div>
                <h3 style={{ fontFamily: "Playfair Display", color: COLORS.white, fontSize: 22, marginBottom: 10 }}>{f.title}</h3>
                <p style={{ color: "#AAA", lineHeight: 1.6, marginBottom: 20 }}>{f.desc}</p>
                <Btn variant="secondary" onClick={() => nav(f.action)}>{f.cta} →</Btn>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* REVIEWS */}
      <div style={{ padding: "56px 60px", background: COLORS.cream }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ color: COLORS.gold, fontSize: 11, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase" }}>What Customers Say</div>
          <h2 style={{ fontFamily: "Playfair Display", fontSize: 36, marginTop: 8 }}>Customer Love</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
          {testimonials.map(t => (
            <div key={t.name} style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 24 }}>
              <div style={{ color: COLORS.gold, fontSize: 18, marginBottom: 12 }}>{Stars(t)}</div>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: COLORS.text, marginBottom: 16 }}>"{t.text}"</p>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{t.name}</div>
                <div style={{ color: COLORS.muted, fontSize: 12 }}>{t.city}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* NEWSLETTER */}
      <div style={{ padding: "56px 60px", background: `linear-gradient(135deg, ${COLORS.gold} 0%, ${COLORS.goldDark} 100%)`, textAlign: "center" }}>
        <h2 style={{ fontFamily: "Playfair Display", fontSize: 36, color: COLORS.white, marginBottom: 12 }}>Join the Glimora Circle</h2>
        <p style={{ color: "rgba(255,255,255,0.8)", marginBottom: 28 }}>Get early access to new collections, exclusive offers & styling tips.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", maxWidth: 440, margin: "0 auto" }}>
          <input placeholder="Your email address" style={{ flex: 1, padding: "12px 18px", borderRadius: 10, border: "none", fontSize: 14, fontFamily: "Inter", outline: "none" }} />
          <Btn style={{ background: COLORS.charcoal }}>Subscribe</Btn>
        </div>
      </div>
    </div>
  );
};

// 2. CATEGORIES PAGE
const CategoriesPage = ({ nav }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("Popular");

  const categories = ["All", "Necklaces", "Earrings", "Bracelets", "Rings", "Anklets", "Watches", "Hair Accessories", "Wallets", "Jewel Bouquets", "Gift Boxes"];
  const filtered = products.filter(p =>
    (activeCategory === "All" || p.category === activeCategory) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "32px 60px" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: "Playfair Display", fontSize: 32, marginBottom: 4 }}>All Collections</h1>
        <p style={{ color: COLORS.muted }}>{filtered.length} products found</p>
      </div>

      {/* Search + Sort */}
      <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍  Search products..."
          style={{ flex: 1, padding: "10px 16px", border: `1px solid ${COLORS.border}`, borderRadius: 10, fontSize: 14, fontFamily: "Inter", outline: "none" }} />
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}
          style={{ padding: "10px 16px", border: `1px solid ${COLORS.border}`, borderRadius: 10, fontSize: 14, fontFamily: "Inter", background: COLORS.white, outline: "none" }}>
          {["Popular", "Price: Low to High", "Price: High to Low", "Newest", "Best Rated"].map(o => <option key={o}>{o}</option>)}
        </select>
      </div>

      {/* Category Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
        {categories.map(c => (
          <button key={c} onClick={() => setActiveCategory(c)}
            style={{ padding: "8px 18px", borderRadius: 20, fontSize: 13, fontWeight: 500, cursor: "pointer", border: activeCategory === c ? `1px solid ${COLORS.gold}` : `1px solid ${COLORS.border}`,
              background: activeCategory === c ? COLORS.gold : COLORS.white, color: activeCategory === c ? COLORS.white : COLORS.text, fontFamily: "Inter", transition: "all .15s" }}>
            {c}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
        {filtered.map(p => (
          <div key={p.id} onClick={() => nav("product", p)} style={{ background: COLORS.white, borderRadius: 16, overflow: "hidden", border: `1px solid ${COLORS.border}`, cursor: "pointer", transition: "all .2s", position: "relative" }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = `0 8px 30px ${COLORS.gold}20`}
            onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
            {p.stock === 0 && <div style={{ position: "absolute", top: 10, right: 10, background: COLORS.danger, color: COLORS.white, fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 10 }}>SOLD OUT</div>}
            <div style={{ height: 180, background: `linear-gradient(135deg, ${COLORS.bgLight}, ${COLORS.goldLight}30)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 64 }}>
              {p.image}
            </div>
            <div style={{ padding: 16 }}>
              {p.badge && <div style={{ marginBottom: 8 }}><Badge>{p.badge}</Badge></div>}
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{p.name}</div>
              <div style={{ color: COLORS.muted, fontSize: 12, marginBottom: 8 }}>{p.category}</div>
              <div style={{ color: COLORS.gold, fontSize: 12, marginBottom: 10 }}>★ {p.rating} · {p.reviews} reviews</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ color: COLORS.gold, fontWeight: 700, fontSize: 16 }}>₹{p.price.toLocaleString()}</div>
                <button onClick={e => { e.stopPropagation(); }} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer" }}>♡</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 3. PRODUCT PAGE
const ProductPage = ({ product = products[0], nav }) => {
  const [qty, setQty] = useState(1);
  const [selectedColor, setSelectedColor] = useState("Gold");
  const [activeTab, setActiveTab] = useState("description");
  const [wishlisted, setWishlisted] = useState(false);
  const [added, setAdded] = useState(false);
  const colors = ["Gold", "Rose Gold", "Silver", "Black"];
  const sizes = ["XS", "S", "M", "L", "XL"];

  return (
    <div style={{ padding: "32px 60px" }}>
      <div style={{ marginBottom: 16, color: COLORS.muted, fontSize: 13 }}>
        <span onClick={() => nav("home")} style={{ cursor: "pointer", color: COLORS.gold }}>Home</span> / <span onClick={() => nav("categories")} style={{ cursor: "pointer", color: COLORS.gold }}>Collections</span> / {product.name}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
        {/* Images */}
        <div>
          <div style={{ background: `linear-gradient(135deg, ${COLORS.bgLight}, ${COLORS.goldLight}20)`, borderRadius: 20, height: 420, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 140, marginBottom: 12, border: `1px solid ${COLORS.border}` }}>
            {product.image}
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            {[1,2,3,4].map(i => (
              <div key={i} style={{ flex: 1, height: 80, background: COLORS.bgLight, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, border: `2px solid ${i === 1 ? COLORS.gold : COLORS.border}`, cursor: "pointer" }}>
                {product.image}
              </div>
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          {product.badge && <div style={{ marginBottom: 12 }}><Badge>{product.badge}</Badge></div>}
          <h1 style={{ fontFamily: "Playfair Display", fontSize: 30, marginBottom: 8, lineHeight: 1.3 }}>{product.name}</h1>
          <div style={{ color: COLORS.gold, marginBottom: 4 }}>★★★★★ <span style={{ color: COLORS.muted, fontSize: 13 }}>({product.reviews} reviews)</span></div>
          <div style={{ color: COLORS.muted, fontSize: 13, marginBottom: 20 }}>SKU: {product.sku} · Category: {product.category}</div>

          <div style={{ fontSize: 32, fontWeight: 700, color: COLORS.charcoal, marginBottom: 4, fontFamily: "Playfair Display" }}>₹{product.price.toLocaleString()}</div>
          <div style={{ color: COLORS.muted, fontSize: 12, textDecoration: "line-through", marginBottom: 20 }}>₹{Math.floor(product.price * 1.3).toLocaleString()}</div>

          {/* Color */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10, textTransform: "uppercase", letterSpacing: 1 }}>Color: <span style={{ color: COLORS.gold }}>{selectedColor}</span></div>
            <div style={{ display: "flex", gap: 8 }}>
              {colors.map(c => (
                <button key={c} onClick={() => setSelectedColor(c)} style={{ padding: "6px 14px", borderRadius: 20, fontSize: 12, cursor: "pointer", fontFamily: "Inter", border: selectedColor === c ? `2px solid ${COLORS.gold}` : `1px solid ${COLORS.border}`, background: selectedColor === c ? `${COLORS.gold}15` : COLORS.white, fontWeight: selectedColor === c ? 600 : 400 }}>{c}</button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10, textTransform: "uppercase", letterSpacing: 1 }}>Quantity</div>
            <div style={{ display: "flex", alignItems: "center", gap: 0, border: `1px solid ${COLORS.border}`, borderRadius: 10, overflow: "hidden", width: "fit-content" }}>
              <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ width: 44, height: 44, border: "none", background: COLORS.bgLight, fontSize: 18, cursor: "pointer", fontFamily: "Inter" }}>−</button>
              <span style={{ width: 52, textAlign: "center", fontWeight: 600, fontSize: 16 }}>{qty}</span>
              <button onClick={() => setQty(qty + 1)} style={{ width: 44, height: 44, border: "none", background: COLORS.bgLight, fontSize: 18, cursor: "pointer", fontFamily: "Inter" }}>+</button>
            </div>
          </div>

          <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
            <Btn size="lg" style={{ flex: 1 }} onClick={() => { setAdded(true); setTimeout(() => setAdded(false), 2000); }}>
              {added ? "✓ Added to Cart!" : "Add to Cart"}
            </Btn>
            <button onClick={() => setWishlisted(!wishlisted)} style={{ padding: "12px 20px", borderRadius: 10, border: `1px solid ${COLORS.border}`, background: wishlisted ? "#FFF0F0" : COLORS.white, fontSize: 20, cursor: "pointer" }}>
              {wishlisted ? "♥" : "♡"}
            </button>
          </div>

          <div style={{ background: COLORS.bgLight, borderRadius: 12, padding: 16, display: "flex", gap: 20, fontSize: 12, color: COLORS.muted }}>
            {["🚚 Free delivery above ₹999", "↩️ 7-day easy returns", "🔒 Secure payment"].map(t => <span key={t}>{t}</span>)}
          </div>

          {/* Tabs */}
          <div style={{ marginTop: 28 }}>
            <div style={{ display: "flex", gap: 0, borderBottom: `1px solid ${COLORS.border}`, marginBottom: 16 }}>
              {["description", "reviews", "faq"].map(t => (
                <button key={t} onClick={() => setActiveTab(t)} style={{ padding: "10px 20px", border: "none", background: "none", borderBottom: activeTab === t ? `2px solid ${COLORS.gold}` : "2px solid transparent", color: activeTab === t ? COLORS.gold : COLORS.muted, fontWeight: 600, fontSize: 13, cursor: "pointer", textTransform: "capitalize", fontFamily: "Inter", marginBottom: -1 }}>{t}</button>
              ))}
            </div>
            {activeTab === "description" && <p style={{ color: COLORS.muted, lineHeight: 1.8, fontSize: 14 }}>Crafted with the finest materials, this {product.name.toLowerCase()} is a testament to Glimora's commitment to luxury. Each piece is hand-inspected and comes in our signature packaging with a certificate of authenticity.</p>}
            {activeTab === "reviews" && reviews.slice(0,3).map(r => (
              <div key={r.id} style={{ borderBottom: `1px solid ${COLORS.border}`, paddingBottom: 16, marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontWeight: 600, fontSize: 13 }}>{r.customer}</span>
                  <span style={{ color: COLORS.gold, fontSize: 12 }}>{"★".repeat(r.rating)}</span>
                </div>
                <p style={{ fontSize: 13, color: COLORS.muted, lineHeight: 1.6 }}>{r.text}</p>
              </div>
            ))}
            {activeTab === "faq" && [["Is the jewellery certified?", "Yes, all products come with a Glimora quality certificate."], ["Can I get it gift-wrapped?", "Yes! Add gift wrap at checkout for ₹99."], ["What's the return policy?", "We offer hassle-free 7-day returns on all products."]].map(([q, a]) => (
              <div key={q} style={{ marginBottom: 16 }}>
                <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4 }}>Q: {q}</div>
                <div style={{ color: COLORS.muted, fontSize: 13, lineHeight: 1.6 }}>A: {a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related */}
      <div style={{ marginTop: 48 }}>
        <h3 style={{ fontFamily: "Playfair Display", fontSize: 24, marginBottom: 20 }}>You May Also Like</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
          {products.slice(4,8).map(p => (
            <div key={p.id} onClick={() => nav("product", p)} style={{ background: COLORS.white, borderRadius: 14, overflow: "hidden", border: `1px solid ${COLORS.border}`, cursor: "pointer" }}>
              <div style={{ height: 120, background: COLORS.bgLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 44 }}>{p.image}</div>
              <div style={{ padding: 12 }}>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{p.name}</div>
                <div style={{ color: COLORS.gold, fontWeight: 700 }}>₹{p.price.toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 4. CART
const CartPage = ({ nav }) => {
  const [cartItems, setCartItems] = useState([
    { ...products[0], qty: 1 }, { ...products[2], qty: 2 }, { ...products[6], qty: 1 }
  ]);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [giftWrap, setGiftWrap] = useState(false);
  const [note, setNote] = useState("");

  const subtotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
  const discount = couponApplied ? Math.floor(subtotal * 0.2) : 0;
  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal - discount + shipping + (giftWrap ? 99 : 0);

  return (
    <div style={{ padding: "32px 60px" }}>
      <h1 style={{ fontFamily: "Playfair Display", fontSize: 32, marginBottom: 24 }}>Shopping Cart</h1>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 32 }}>
        <div>
          {cartItems.map((item, idx) => (
            <Card key={item.id} style={{ marginBottom: 16, display: "flex", gap: 20, alignItems: "center" }}>
              <div style={{ width: 80, height: 80, background: COLORS.bgLight, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }}>{item.image}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>{item.name}</div>
                <div style={{ color: COLORS.muted, fontSize: 12, marginBottom: 8 }}>{item.category}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 0, border: `1px solid ${COLORS.border}`, borderRadius: 8, overflow: "hidden", width: "fit-content" }}>
                  <button onClick={() => setCartItems(c => c.map((i,j) => j === idx ? {...i, qty: Math.max(1, i.qty-1)} : i))} style={{ width: 32, height: 32, border: "none", background: COLORS.bgLight, cursor: "pointer", fontFamily: "Inter" }}>−</button>
                  <span style={{ width: 40, textAlign: "center", fontSize: 14, fontWeight: 600 }}>{item.qty}</span>
                  <button onClick={() => setCartItems(c => c.map((i,j) => j === idx ? {...i, qty: i.qty+1} : i))} style={{ width: 32, height: 32, border: "none", background: COLORS.bgLight, cursor: "pointer", fontFamily: "Inter" }}>+</button>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ color: COLORS.gold, fontWeight: 700, fontSize: 16 }}>₹{(item.price * item.qty).toLocaleString()}</div>
                <button onClick={() => setCartItems(c => c.filter((_,j) => j !== idx))} style={{ color: COLORS.danger, background: "none", border: "none", fontSize: 12, cursor: "pointer", marginTop: 8 }}>Remove</button>
              </div>
            </Card>
          ))}

          <Card style={{ marginTop: 16 }}>
            <div style={{ fontWeight: 600, marginBottom: 12 }}>Order Notes</div>
            <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Any special instructions for your order?"
              style={{ width: "100%", height: 80, padding: "10px 14px", border: `1px solid ${COLORS.border}`, borderRadius: 8, resize: "none", fontSize: 14, fontFamily: "Inter", outline: "none" }} />
          </Card>
        </div>

        <div>
          <Card style={{ marginBottom: 16 }}>
            <div style={{ fontWeight: 600, marginBottom: 16, fontFamily: "Playfair Display", fontSize: 18 }}>Order Summary</div>
            {[["Subtotal", `₹${subtotal.toLocaleString()}`], discount > 0 ? ["Discount (20%)", `-₹${discount.toLocaleString()}`] : null, ["Shipping", shipping === 0 ? "FREE" : `₹${shipping}`], giftWrap ? ["Gift Wrap", "₹99"] : null].filter(Boolean).map(([l, v]) => (
              <div key={l} style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontSize: 14 }}>
                <span style={{ color: COLORS.muted }}>{l}</span>
                <span style={{ fontWeight: 600, color: l === "Discount (20%)" ? COLORS.success : COLORS.text }}>{v}</span>
              </div>
            ))}
            <div style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: 12, marginTop: 4, display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 18 }}>
              <span>Total</span>
              <span style={{ color: COLORS.gold }}>₹{total.toLocaleString()}</span>
            </div>
          </Card>

          <Card style={{ marginBottom: 16 }}>
            <div style={{ fontWeight: 600, marginBottom: 12 }}>Coupon Code</div>
            <div style={{ display: "flex", gap: 8 }}>
              <input value={coupon} onChange={e => setCoupon(e.target.value)} placeholder="Enter code"
                style={{ flex: 1, padding: "10px 14px", border: `1px solid ${COLORS.border}`, borderRadius: 8, fontSize: 14, fontFamily: "Inter", outline: "none" }} />
              <Btn onClick={() => { if (coupon === "GLIMORA20") setCouponApplied(true); }}>Apply</Btn>
            </div>
            {couponApplied && <div style={{ color: COLORS.success, fontSize: 12, marginTop: 8 }}>✓ 20% discount applied!</div>}
            <div style={{ color: COLORS.muted, fontSize: 11, marginTop: 6 }}>Try: GLIMORA20</div>
          </Card>

          <Card style={{ marginBottom: 16 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
              <input type="checkbox" checked={giftWrap} onChange={e => setGiftWrap(e.target.checked)} />
              <div>
                <div style={{ fontWeight: 600, fontSize: 13 }}>Add Gift Wrap (+₹99)</div>
                <div style={{ color: COLORS.muted, fontSize: 11 }}>Luxury packaging with a ribbon & card</div>
              </div>
            </label>
          </Card>

          <Btn size="lg" style={{ width: "100%" }} onClick={() => nav("checkout")}>Proceed to Checkout →</Btn>
          <div style={{ textAlign: "center", marginTop: 12 }}>
            <span style={{ color: COLORS.muted, fontSize: 12, cursor: "pointer" }} onClick={() => nav("categories")}>← Continue Shopping</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// 5. CHECKOUT
const CheckoutPage = ({ nav }) => {
  const [step, setStep] = useState(1);
  const [payment, setPayment] = useState("UPI");
  const [address, setAddress] = useState({ name: "Priya Menon", phone: "9876543210", address: "123 MG Road, Indiranagar", city: "Bangalore", state: "Karnataka", pin: "560038" });

  const paymentMethods = [
    { id: "UPI", label: "UPI", icon: "📱" }, { id: "GPay", label: "Google Pay", icon: "G" },
    { id: "Apple Pay", label: "Apple Pay", icon: "🍎" }, { id: "Card", label: "Credit / Debit Card", icon: "💳" },
    { id: "COD", label: "Cash on Delivery", icon: "💵" },
  ];

  const steps = ["Address", "Payment", "Review"];

  return (
    <div style={{ padding: "32px 60px", maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ fontFamily: "Playfair Display", fontSize: 32, marginBottom: 32 }}>Checkout</h1>

      {/* Step Indicator */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: 40 }}>
        {steps.map((s, i) => (
          <div key={s} style={{ display: "flex", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, background: step > i + 1 ? COLORS.success : step === i + 1 ? COLORS.gold : COLORS.border, color: step >= i + 1 ? COLORS.white : COLORS.muted }}>
                {step > i + 1 ? "✓" : i + 1}
              </div>
              <span style={{ fontSize: 14, fontWeight: step === i + 1 ? 600 : 400, color: step === i + 1 ? COLORS.text : COLORS.muted }}>{s}</span>
            </div>
            {i < 2 && <div style={{ height: 2, width: 60, background: step > i + 1 ? COLORS.success : COLORS.border, margin: "0 16px" }} />}
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 32 }}>
        <div>
          {step === 1 && (
            <Card>
              <h3 style={{ fontFamily: "Playfair Display", fontSize: 20, marginBottom: 20 }}>Delivery Address</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <Input label="Full Name" value={address.name} onChange={e => setAddress({...address, name: e.target.value})} />
                <Input label="Phone" value={address.phone} onChange={e => setAddress({...address, phone: e.target.value})} />
              </div>
              <Input label="Address" value={address.address} onChange={e => setAddress({...address, address: e.target.value})} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                <Input label="City" value={address.city} onChange={e => setAddress({...address, city: e.target.value})} />
                <Input label="State" value={address.state} onChange={e => setAddress({...address, state: e.target.value})} />
                <Input label="PIN Code" value={address.pin} onChange={e => setAddress({...address, pin: e.target.value})} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
                <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 13, color: COLORS.muted }}>
                  <input type="checkbox" defaultChecked /> Save this address
                </label>
                <Btn onClick={() => setStep(2)}>Continue to Payment →</Btn>
              </div>
            </Card>
          )}

          {step === 2 && (
            <Card>
              <h3 style={{ fontFamily: "Playfair Display", fontSize: 20, marginBottom: 20 }}>Payment Method</h3>
              {paymentMethods.map(m => (
                <label key={m.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", border: `2px solid ${payment === m.id ? COLORS.gold : COLORS.border}`, borderRadius: 10, marginBottom: 10, cursor: "pointer", background: payment === m.id ? `${COLORS.gold}08` : COLORS.white }}>
                  <input type="radio" name="payment" checked={payment === m.id} onChange={() => setPayment(m.id)} style={{ accentColor: COLORS.gold }} />
                  <span style={{ fontSize: 20 }}>{m.icon}</span>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{m.label}</span>
                  {payment === m.id && m.id === "UPI" && (
                    <input placeholder="Enter UPI ID" style={{ marginLeft: "auto", padding: "6px 12px", border: `1px solid ${COLORS.border}`, borderRadius: 8, fontSize: 13, fontFamily: "Inter", outline: "none" }} />
                  )}
                </label>
              ))}
              <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
                <Btn variant="ghost" onClick={() => setStep(1)}>← Back</Btn>
                <Btn onClick={() => setStep(3)}>Review Order →</Btn>
              </div>
            </Card>
          )}

          {step === 3 && (
            <Card>
              <h3 style={{ fontFamily: "Playfair Display", fontSize: 20, marginBottom: 20 }}>Review & Place Order</h3>
              <div style={{ background: COLORS.bgLight, borderRadius: 10, padding: 16, marginBottom: 16 }}>
                <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>Delivery To</div>
                <div style={{ fontSize: 14, lineHeight: 1.8 }}>{address.name} · {address.phone}<br />{address.address}, {address.city} - {address.pin}</div>
              </div>
              <div style={{ background: COLORS.bgLight, borderRadius: 10, padding: 16, marginBottom: 20 }}>
                <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>Payment</div>
                <div style={{ fontSize: 14 }}>{payment}</div>
              </div>
              {products.slice(0,3).map(p => (
                <div key={p.id} style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12, paddingBottom: 12, borderBottom: `1px solid ${COLORS.border}` }}>
                  <div style={{ fontSize: 32 }}>{p.image}</div>
                  <div style={{ flex: 1 }}><div style={{ fontWeight: 500, fontSize: 13 }}>{p.name}</div></div>
                  <div style={{ color: COLORS.gold, fontWeight: 700 }}>₹{p.price.toLocaleString()}</div>
                </div>
              ))}
              <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                <Btn variant="ghost" onClick={() => setStep(2)}>← Back</Btn>
                <Btn size="lg" onClick={() => nav("tracking")} style={{ flex: 1 }}>🔒 Place Order — ₹9,797</Btn>
              </div>
            </Card>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <Card>
          <div style={{ fontFamily: "Playfair Display", fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Order Summary</div>
          {products.slice(0,3).map(p => (
            <div key={p.id} style={{ display: "flex", gap: 10, marginBottom: 12, alignItems: "center" }}>
              <div style={{ fontSize: 24, width: 40, height: 40, background: COLORS.bgLight, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>{p.image}</div>
              <div style={{ flex: 1, fontSize: 12 }}><div style={{ fontWeight: 500 }}>{p.name}</div></div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>₹{p.price.toLocaleString()}</div>
            </div>
          ))}
          <div style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: 12, marginTop: 8 }}>
            {[["Subtotal", "₹9,797"], ["Shipping", "FREE"], ["Total", "₹9,797"]].map(([l, v]) => (
              <div key={l} style={{ display: "flex", justifyContent: "space-between", fontSize: l === "Total" ? 16 : 13, fontWeight: l === "Total" ? 700 : 400, color: l === "Total" ? COLORS.gold : COLORS.muted, marginBottom: 8 }}>
                <span>{l}</span><span>{v}</span>
              </div>
            ))}
          </div>
          <div style={{ background: COLORS.bgLight, borderRadius: 10, padding: 12, marginTop: 8, fontSize: 12, color: COLORS.muted, lineHeight: 1.6 }}>
            🔒 Payments are secure & encrypted.<br />🚚 Estimated delivery: 2–4 business days.
          </div>
        </Card>
      </div>
    </div>
  );
};

// 6. ORDER TRACKING
const TrackingPage = ({ nav }) => {
  const steps = [
    { label: "Order Placed", desc: "Your order has been confirmed", done: true, time: "Jan 15, 10:30 AM" },
    { label: "Packed", desc: "Your order is being packed", done: true, time: "Jan 15, 2:00 PM" },
    { label: "Shipped", desc: "Your order is on its way", done: true, time: "Jan 16, 9:00 AM" },
    { label: "Out for Delivery", desc: "Your order is out for delivery", done: false, time: "Expected Jan 17" },
    { label: "Delivered", desc: "Package delivered", done: false, time: "Expected Jan 17" },
  ];
  return (
    <div style={{ padding: "32px 60px", maxWidth: 700, margin: "0 auto" }}>
      <div style={{ background: COLORS.gold, borderRadius: 20, padding: 32, color: COLORS.white, marginBottom: 32, textAlign: "center" }}>
        <div style={{ fontFamily: "Playfair Display", fontSize: 28, marginBottom: 6 }}>Order #GL-2401</div>
        <div style={{ opacity: .8, fontSize: 14 }}>Placed on January 15, 2024 · ₹9,797</div>
        <div style={{ marginTop: 12 }}><Badge color={COLORS.white} style={{ color: COLORS.gold }}>Shipped</Badge></div>
      </div>
      <Card style={{ marginBottom: 24 }}>
        <h3 style={{ fontFamily: "Playfair Display", fontSize: 20, marginBottom: 24 }}>Order Timeline</h3>
        {steps.map((s, i) => (
          <div key={s.label} style={{ display: "flex", gap: 20, marginBottom: i < steps.length - 1 ? 0 : 0 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: s.done ? COLORS.gold : COLORS.border, display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.white, fontSize: 14, fontWeight: 700 }}>{s.done ? "✓" : i + 1}</div>
              {i < steps.length - 1 && <div style={{ width: 2, height: 48, background: i < 2 ? COLORS.gold : COLORS.border, marginTop: 4 }} />}
            </div>
            <div style={{ paddingBottom: i < steps.length - 1 ? 48 : 0, paddingTop: 6 }}>
              <div style={{ fontWeight: 600, fontSize: 15, color: s.done ? COLORS.text : COLORS.muted }}>{s.label}</div>
              <div style={{ fontSize: 13, color: COLORS.muted, marginTop: 2 }}>{s.desc}</div>
              <div style={{ fontSize: 12, color: COLORS.gold, marginTop: 4, fontWeight: 500 }}>{s.time}</div>
            </div>
          </div>
        ))}
      </Card>
      <Card>
        <h3 style={{ fontFamily: "Playfair Display", fontSize: 18, marginBottom: 16 }}>Delivery Details</h3>
        <div style={{ fontSize: 14, lineHeight: 1.8, color: COLORS.muted }}>
          <div><strong style={{ color: COLORS.text }}>Name:</strong> Priya Menon</div>
          <div><strong style={{ color: COLORS.text }}>Address:</strong> 123 MG Road, Indiranagar, Bangalore - 560038</div>
          <div><strong style={{ color: COLORS.text }}>Tracking ID:</strong> DTDC-8847291</div>
        </div>
        <Btn style={{ marginTop: 16 }} variant="secondary">Download Invoice</Btn>
      </Card>
    </div>
  );
};

// 7. ACCOUNT PAGE
const AccountPage = ({ nav }) => {
  const [activeTab, setActiveTab] = useState("orders");
  const tabs = [{ id: "orders", label: "📦 My Orders" }, { id: "wishlist", label: "♡ Wishlist" }, { id: "addresses", label: "📍 Addresses" }, { id: "profile", label: "👤 Profile" }, { id: "returns", label: "↩️ Returns" }];

  return (
    <div style={{ padding: "32px 60px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 28 }}>
        <div>
          <Card style={{ marginBottom: 16, textAlign: "center" }}>
            <div style={{ width: 80, height: 80, borderRadius: "50%", background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldDark})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, margin: "0 auto 12px", color: COLORS.white }}>P</div>
            <div style={{ fontWeight: 700, fontSize: 16 }}>Priya Menon</div>
            <div style={{ color: COLORS.muted, fontSize: 12, marginTop: 4 }}>Member since Jan 2023</div>
            <div style={{ marginTop: 8 }}><Badge>VIP Customer</Badge></div>
          </Card>
          <Card>
            {tabs.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 12px", border: "none", background: activeTab === t.id ? `${COLORS.gold}15` : "transparent", color: activeTab === t.id ? COLORS.gold : COLORS.text, borderRadius: 8, fontWeight: 500, fontSize: 13, cursor: "pointer", fontFamily: "Inter", marginBottom: 2 }}>
                {t.label}
              </button>
            ))}
          </Card>
        </div>
        <div>
          {activeTab === "orders" && (
            <div>
              <h2 style={{ fontFamily: "Playfair Display", fontSize: 24, marginBottom: 20 }}>My Orders</h2>
              {orders.slice(0,5).map(o => (
                <Card key={o.id} style={{ marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontWeight: 600, marginBottom: 4 }}>{o.id}</div>
                    <div style={{ color: COLORS.muted, fontSize: 12 }}>{o.date} · {o.items} items · {o.payment}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ color: COLORS.gold, fontWeight: 700 }}>₹{o.total.toLocaleString()}</div>
                    <StatusBadge status={o.status} />
                    <Btn size="sm" variant="secondary" onClick={() => nav("tracking")}>Track</Btn>
                  </div>
                </Card>
              ))}
            </div>
          )}
          {activeTab === "wishlist" && (
            <div>
              <h2 style={{ fontFamily: "Playfair Display", fontSize: 24, marginBottom: 20 }}>My Wishlist</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
                {products.slice(0,6).map(p => (
                  <div key={p.id} style={{ background: COLORS.white, borderRadius: 14, overflow: "hidden", border: `1px solid ${COLORS.border}`, cursor: "pointer" }} onClick={() => nav("product", p)}>
                    <div style={{ height: 120, background: COLORS.bgLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 44 }}>{p.image}</div>
                    <div style={{ padding: 12 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{p.name}</div>
                      <div style={{ color: COLORS.gold, fontWeight: 700, marginBottom: 8 }}>₹{p.price.toLocaleString()}</div>
                      <Btn size="sm" style={{ width: "100%" }}>Add to Cart</Btn>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === "profile" && (
            <div>
              <h2 style={{ fontFamily: "Playfair Display", fontSize: 24, marginBottom: 20 }}>My Profile</h2>
              <Card>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <Input label="First Name" value="Priya" onChange={() => {}} />
                  <Input label="Last Name" value="Menon" onChange={() => {}} />
                  <Input label="Email" value="priya@email.com" onChange={() => {}} />
                  <Input label="Phone" value="9876543210" onChange={() => {}} />
                </div>
                <Btn style={{ marginTop: 8 }}>Save Changes</Btn>
              </Card>
            </div>
          )}
          {activeTab === "addresses" && (
            <div>
              <h2 style={{ fontFamily: "Playfair Display", fontSize: 24, marginBottom: 20 }}>My Addresses</h2>
              {[{ label: "Home", address: "123 MG Road, Indiranagar, Bangalore - 560038" }, { label: "Office", address: "45 Whitefield Tech Park, Bangalore - 560066" }].map(a => (
                <Card key={a.label} style={{ marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div><div style={{ fontWeight: 600, marginBottom: 4 }}>{a.label}</div><div style={{ color: COLORS.muted, fontSize: 13 }}>{a.address}</div></div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <Btn size="sm" variant="ghost">Edit</Btn>
                    <Btn size="sm" variant="danger">Delete</Btn>
                  </div>
                </Card>
              ))}
              <Btn variant="secondary">+ Add New Address</Btn>
            </div>
          )}
          {activeTab === "returns" && (
            <div>
              <h2 style={{ fontFamily: "Playfair Display", fontSize: 24, marginBottom: 20 }}>Returns & Refunds</h2>
              <Card style={{ textAlign: "center", padding: 48 }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>↩️</div>
                <h3 style={{ fontFamily: "Playfair Display", fontSize: 20, marginBottom: 8 }}>No Active Returns</h3>
                <p style={{ color: COLORS.muted, fontSize: 14, marginBottom: 20 }}>You can request a return for any eligible order within 7 days of delivery.</p>
                <Btn onClick={() => setActiveTab("orders")}>View My Orders</Btn>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// 8. GIFT BUILDER
const GiftBuilderPage = ({ nav }) => {
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState({ box: null, jewellery: [], accessories: [], card: "", wrap: false });
  const boxes = [{ id: 1, name: "Classic Gold Box", price: 299, emoji: "📦" }, { id: 2, name: "Luxury Velvet Box", price: 599, emoji: "🎁" }, { id: 3, name: "Premium Hamper", price: 899, emoji: "🧺" }];
  const jewelleryItems = products.filter(p => ["Necklaces","Earrings","Bracelets","Rings"].includes(p.category)).slice(0,4);
  const accessoryItems = products.filter(p => ["Hair Accessories","Wallets"].includes(p.category));

  const total = (selections.box?.price || 0) +
    selections.jewellery.reduce((s, i) => s + (products.find(p => p.id === i)?.price || 0), 0) +
    (selections.wrap ? 99 : 0);

  const steps = ["Choose Box", "Add Jewellery", "Accessories", "Greeting Card", "Gift Wrap", "Preview"];

  return (
    <div style={{ padding: "32px 60px" }}>
      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <div style={{ color: COLORS.gold, fontSize: 11, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase" }}>Create Your Perfect Gift</div>
        <h1 style={{ fontFamily: "Playfair Display", fontSize: 36, marginTop: 8 }}>Gift Box Builder</h1>
      </div>

      {/* Steps */}
      <div style={{ display: "flex", justifyContent: "center", gap: 0, marginBottom: 36 }}>
        {steps.map((s, i) => (
          <div key={s} style={{ display: "flex", alignItems: "center" }}>
            <div onClick={() => i < step && setStep(i + 1)} style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: i < step ? "pointer" : "default" }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: step > i + 1 ? COLORS.success : step === i + 1 ? COLORS.gold : COLORS.border, color: COLORS.white, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, transition: "all .3s" }}>
                {step > i + 1 ? "✓" : i + 1}
              </div>
              <div style={{ fontSize: 10, marginTop: 6, color: step === i + 1 ? COLORS.gold : COLORS.muted, fontWeight: step === i + 1 ? 600 : 400, whiteSpace: "nowrap" }}>{s}</div>
            </div>
            {i < 5 && <div style={{ width: 40, height: 2, background: step > i + 1 ? COLORS.gold : COLORS.border, marginBottom: 18 }} />}
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 28 }}>
        <Card>
          {step === 1 && (
            <div>
              <h3 style={{ fontFamily: "Playfair Display", fontSize: 22, marginBottom: 20 }}>Select Your Box</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
                {boxes.map(b => (
                  <div key={b.id} onClick={() => setSelections({...selections, box: b})} style={{ padding: 24, textAlign: "center", border: `2px solid ${selections.box?.id === b.id ? COLORS.gold : COLORS.border}`, borderRadius: 16, cursor: "pointer", background: selections.box?.id === b.id ? `${COLORS.gold}08` : COLORS.white, transition: "all .2s" }}>
                    <div style={{ fontSize: 48, marginBottom: 12 }}>{b.emoji}</div>
                    <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{b.name}</div>
                    <div style={{ color: COLORS.gold, fontWeight: 700 }}>₹{b.price}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 style={{ fontFamily: "Playfair Display", fontSize: 22, marginBottom: 20 }}>Choose Jewellery</h3>
              <p style={{ color: COLORS.muted, fontSize: 13, marginBottom: 16 }}>Select up to 3 pieces</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
                {jewelleryItems.map(p => {
                  const selected = selections.jewellery.includes(p.id);
                  return (
                    <div key={p.id} onClick={() => setSelections({...selections, jewellery: selected ? selections.jewellery.filter(i => i !== p.id) : [...selections.jewellery, p.id]})}
                      style={{ display: "flex", gap: 12, padding: 16, border: `2px solid ${selected ? COLORS.gold : COLORS.border}`, borderRadius: 14, cursor: "pointer", background: selected ? `${COLORS.gold}08` : COLORS.white, transition: "all .2s" }}>
                      <div style={{ fontSize: 32 }}>{p.image}</div>
                      <div><div style={{ fontWeight: 600, fontSize: 13 }}>{p.name}</div><div style={{ color: COLORS.gold, fontWeight: 700 }}>₹{p.price.toLocaleString()}</div></div>
                      {selected && <div style={{ marginLeft: "auto", color: COLORS.gold, fontSize: 20 }}>✓</div>}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 style={{ fontFamily: "Playfair Display", fontSize: 22, marginBottom: 20 }}>Add Accessories</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
                {accessoryItems.map(p => (
                  <div key={p.id} onClick={() => {}} style={{ display: "flex", gap: 12, padding: 16, border: `2px solid ${COLORS.border}`, borderRadius: 14, cursor: "pointer" }}>
                    <div style={{ fontSize: 32 }}>{p.image}</div>
                    <div><div style={{ fontWeight: 600, fontSize: 13 }}>{p.name}</div><div style={{ color: COLORS.gold, fontWeight: 700 }}>₹{p.price.toLocaleString()}</div></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h3 style={{ fontFamily: "Playfair Display", fontSize: 22, marginBottom: 20 }}>Add a Greeting Card</h3>
              <textarea value={selections.card} onChange={e => setSelections({...selections, card: e.target.value})} placeholder="Write a personal message for your loved one..."
                style={{ width: "100%", height: 140, padding: "14px 16px", border: `1px solid ${COLORS.border}`, borderRadius: 10, fontSize: 14, fontFamily: "Inter", outline: "none", resize: "none" }} />
              <div style={{ marginTop: 16 }}>
                <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 12 }}>Card Style</div>
                <div style={{ display: "flex", gap: 10 }}>
                  {["Classic White", "Gold Foil", "Floral", "Minimal"].map(s => (
                    <button key={s} style={{ padding: "8px 14px", borderRadius: 20, border: `1px solid ${COLORS.border}`, background: COLORS.white, fontSize: 12, cursor: "pointer", fontFamily: "Inter" }}>{s}</button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <h3 style={{ fontFamily: "Playfair Display", fontSize: 22, marginBottom: 20 }}>Gift Wrap Options</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
                {[{ name: "Luxury Gold", emoji: "✨", price: 99 }, { name: "Satin Ribbon", emoji: "🎀", price: 79 }, { name: "Floral Print", emoji: "🌸", price: 89 }, { name: "Classic White", emoji: "⬜", price: 59 }].map(w => (
                  <div key={w.name} onClick={() => setSelections({...selections, wrap: !selections.wrap})} style={{ padding: 20, border: `2px solid ${selections.wrap ? COLORS.gold : COLORS.border}`, borderRadius: 14, cursor: "pointer", textAlign: "center", background: selections.wrap ? `${COLORS.gold}08` : COLORS.white }}>
                    <div style={{ fontSize: 36, marginBottom: 8 }}>{w.emoji}</div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{w.name}</div>
                    <div style={{ color: COLORS.gold, fontSize: 13, marginTop: 4 }}>+₹{w.price}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 6 && (
            <div style={{ textAlign: "center" }}>
              <h3 style={{ fontFamily: "Playfair Display", fontSize: 24, marginBottom: 20 }}>Your Gift Box Preview</h3>
              <div style={{ background: `linear-gradient(135deg, ${COLORS.charcoal}, #2C2000)`, borderRadius: 24, padding: 48, marginBottom: 24 }}>
                <div style={{ fontSize: 80, marginBottom: 16 }}>{selections.box?.emoji || "🎁"}</div>
                <div style={{ color: COLORS.white, fontFamily: "Playfair Display", fontSize: 22, marginBottom: 8 }}>Glimora Custom Gift Box</div>
                <div style={{ color: COLORS.gold, fontSize: 14 }}>{selections.jewellery.length} jewellery pieces · {selections.wrap ? "Gift wrapped" : "No wrap"}</div>
                {selections.card && <div style={{ marginTop: 16, color: "#CCC", fontSize: 13, fontStyle: "italic" }}>"{selections.card}"</div>}
              </div>
              <Btn size="lg" onClick={() => nav("cart")} style={{ width: "100%" }}>Add to Cart — ₹{total.toLocaleString()}</Btn>
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24 }}>
            {step > 1 && <Btn variant="ghost" onClick={() => setStep(step - 1)}>← Back</Btn>}
            {step < 6 && <Btn onClick={() => setStep(step + 1)} style={{ marginLeft: "auto" }}>Continue →</Btn>}
          </div>
        </Card>

        {/* Summary */}
        <div>
          <Card>
            <div style={{ fontFamily: "Playfair Display", fontSize: 18, marginBottom: 16 }}>Gift Summary</div>
            {selections.box && <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 13 }}>
              <span>{selections.box.emoji} {selections.box.name}</span>
              <span style={{ fontWeight: 600 }}>₹{selections.box.price}</span>
            </div>}
            {selections.jewellery.map(id => {
              const p = products.find(x => x.id === id);
              return p ? <div key={id} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 13 }}>
                <span>{p.image} {p.name}</span>
                <span style={{ fontWeight: 600 }}>₹{p.price.toLocaleString()}</span>
              </div> : null;
            })}
            {selections.wrap && <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 13 }}>
              <span>✨ Gift Wrap</span><span style={{ fontWeight: 600 }}>₹99</span>
            </div>}
            {total > 0 && (
              <div style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: 12, marginTop: 8, display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 16 }}>
                <span>Total</span><span style={{ color: COLORS.gold }}>₹{total.toLocaleString()}</span>
              </div>
            )}
            {total === 0 && <div style={{ color: COLORS.muted, fontSize: 13, textAlign: "center", padding: "12px 0" }}>Start building your gift box!</div>}
          </Card>
        </div>
      </div>
    </div>
  );
};

// 9. BOUQUET BUILDER
const BouquetBuilderPage = ({ nav }) => {
  const [step, setStep] = useState(1);
  const [sel, setSel] = useState({ flowers: [], jewellery: null, ribbon: "Gold", card: "", wrap: "Luxury" });
  const flowerOptions = [{ name: "Red Roses", emoji: "🌹", price: 299 }, { name: "White Lilies", emoji: "🌷", price: 249 }, { name: "Pink Tulips", emoji: "🌸", price: 279 }, { name: "Orchids", emoji: "💐", price: 399 }];
  const total = sel.flowers.reduce((s, f) => s + (flowerOptions.find(x => x.name === f)?.price || 0), 0) + (sel.jewellery ? (products.find(p => p.id === sel.jewellery)?.price || 0) : 0) + 199;
  const steps = ["Flowers", "Jewellery", "Ribbon & Wrap", "Card", "Preview"];

  return (
    <div style={{ padding: "32px 60px" }}>
      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <div style={{ color: COLORS.gold, fontSize: 11, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase" }}>Glimora Signature</div>
        <h1 style={{ fontFamily: "Playfair Display", fontSize: 36, marginTop: 8 }}>Jewel Bouquet Builder</h1>
        <p style={{ color: COLORS.muted, marginTop: 8 }}>Create a bouquet of flowers & fine jewellery — a one-of-a-kind gift</p>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 0, marginBottom: 36 }}>
        {steps.map((s, i) => (
          <div key={s} style={{ display: "flex", alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: step > i + 1 ? COLORS.success : step === i + 1 ? COLORS.gold : COLORS.border, color: COLORS.white, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13 }}>
                {step > i + 1 ? "✓" : i + 1}
              </div>
              <div style={{ fontSize: 10, marginTop: 6, color: step === i + 1 ? COLORS.gold : COLORS.muted, fontWeight: step === i + 1 ? 600 : 400 }}>{s}</div>
            </div>
            {i < 4 && <div style={{ width: 48, height: 2, background: step > i + 1 ? COLORS.gold : COLORS.border, marginBottom: 18 }} />}
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 28 }}>
        <Card>
          {step === 1 && (
            <div>
              <h3 style={{ fontFamily: "Playfair Display", fontSize: 22, marginBottom: 20 }}>Choose Your Flowers</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
                {flowerOptions.map(f => {
                  const selected = sel.flowers.includes(f.name);
                  return (
                    <div key={f.name} onClick={() => setSel({...sel, flowers: selected ? sel.flowers.filter(x => x !== f.name) : [...sel.flowers, f.name]})}
                      style={{ padding: 20, textAlign: "center", border: `2px solid ${selected ? COLORS.gold : COLORS.border}`, borderRadius: 14, cursor: "pointer", background: selected ? `${COLORS.gold}08` : COLORS.white }}>
                      <div style={{ fontSize: 40, marginBottom: 8 }}>{f.emoji}</div>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{f.name}</div>
                      <div style={{ color: COLORS.gold, fontWeight: 700, marginTop: 4 }}>₹{f.price}</div>
                      {selected && <div style={{ color: COLORS.gold, fontSize: 12, marginTop: 4 }}>✓ Selected</div>}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 style={{ fontFamily: "Playfair Display", fontSize: 22, marginBottom: 20 }}>Add a Jewellery Piece</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {products.slice(0, 4).map(p => (
                  <div key={p.id} onClick={() => setSel({...sel, jewellery: sel.jewellery === p.id ? null : p.id})}
                    style={{ display: "flex", gap: 12, padding: 14, border: `2px solid ${sel.jewellery === p.id ? COLORS.gold : COLORS.border}`, borderRadius: 14, cursor: "pointer", background: sel.jewellery === p.id ? `${COLORS.gold}08` : COLORS.white, alignItems: "center" }}>
                    <div style={{ fontSize: 28 }}>{p.image}</div>
                    <div><div style={{ fontWeight: 600, fontSize: 12 }}>{p.name}</div><div style={{ color: COLORS.gold, fontWeight: 700, fontSize: 12 }}>₹{p.price.toLocaleString()}</div></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 style={{ fontFamily: "Playfair Display", fontSize: 22, marginBottom: 20 }}>Ribbon & Wrapping</h3>
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 12 }}>Ribbon Color</div>
                <div style={{ display: "flex", gap: 10 }}>
                  {["Gold", "Silver", "Blush Pink", "White", "Red"].map(r => (
                    <button key={r} onClick={() => setSel({...sel, ribbon: r})} style={{ padding: "8px 16px", borderRadius: 20, border: `2px solid ${sel.ribbon === r ? COLORS.gold : COLORS.border}`, background: sel.ribbon === r ? `${COLORS.gold}15` : COLORS.white, fontWeight: sel.ribbon === r ? 600 : 400, fontSize: 12, cursor: "pointer", fontFamily: "Inter" }}>{r}</button>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 12 }}>Wrapping Paper</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
                  {[{ name: "Luxury Gold", emoji: "✨" }, { name: "Floral Print", emoji: "🌸" }, { name: "Classic White", emoji: "⬜" }].map(w => (
                    <div key={w.name} onClick={() => setSel({...sel, wrap: w.name})} style={{ padding: 16, textAlign: "center", border: `2px solid ${sel.wrap === w.name ? COLORS.gold : COLORS.border}`, borderRadius: 12, cursor: "pointer", background: sel.wrap === w.name ? `${COLORS.gold}08` : COLORS.white }}>
                      <div style={{ fontSize: 28, marginBottom: 6 }}>{w.emoji}</div>
                      <div style={{ fontSize: 12, fontWeight: 500 }}>{w.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h3 style={{ fontFamily: "Playfair Display", fontSize: 22, marginBottom: 20 }}>Message Card</h3>
              <textarea value={sel.card} onChange={e => setSel({...sel, card: e.target.value})} placeholder="Write something heartfelt..."
                style={{ width: "100%", height: 160, padding: "14px 16px", border: `1px solid ${COLORS.border}`, borderRadius: 10, fontSize: 14, fontFamily: "Inter", outline: "none", resize: "none" }} />
            </div>
          )}

          {step === 5 && (
            <div style={{ textAlign: "center" }}>
              <h3 style={{ fontFamily: "Playfair Display", fontSize: 24, marginBottom: 20 }}>Your Bouquet Preview</h3>
              <div style={{ background: `linear-gradient(135deg, #1a0a0a, #2C2000)`, borderRadius: 24, padding: 56, marginBottom: 28, position: "relative" }}>
                <div style={{ fontSize: 100 }}>💐</div>
                <div style={{ position: "absolute", top: 20, right: 20, fontSize: 32 }}>
                  {sel.jewellery ? products.find(p => p.id === sel.jewellery)?.image : "✨"}
                </div>
                <div style={{ color: COLORS.white, fontFamily: "Playfair Display", fontSize: 20, marginTop: 16 }}>Glimora Jewel Bouquet</div>
                <div style={{ color: COLORS.gold, fontSize: 13, marginTop: 8 }}>{sel.flowers.join(", ")} · {sel.ribbon} Ribbon</div>
                {sel.card && <div style={{ marginTop: 16, color: "#CCC", fontSize: 13, fontStyle: "italic" }}>"{sel.card}"</div>}
              </div>
              <div style={{ background: COLORS.bgLight, borderRadius: 12, padding: 16, marginBottom: 24, textAlign: "left" }}>
                <div style={{ fontWeight: 600, marginBottom: 8 }}>Estimated Price</div>
                <div style={{ color: COLORS.gold, fontFamily: "Playfair Display", fontSize: 24, fontWeight: 700 }}>₹{total.toLocaleString()}</div>
              </div>
              <Btn size="lg" onClick={() => nav("cart")} style={{ width: "100%" }}>Add Bouquet to Cart</Btn>
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24 }}>
            {step > 1 && <Btn variant="ghost" onClick={() => setStep(step - 1)}>← Back</Btn>}
            {step < 5 && <Btn onClick={() => setStep(step + 1)} style={{ marginLeft: "auto" }}>Continue →</Btn>}
          </div>
        </Card>

        <Card>
          <div style={{ fontFamily: "Playfair Display", fontSize: 18, marginBottom: 16 }}>Bouquet Summary</div>
          {sel.flowers.map(f => { const fo = flowerOptions.find(x => x.name === f); return fo ? (
            <div key={f} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 8 }}>
              <span>{fo.emoji} {fo.name}</span><span style={{ fontWeight: 600 }}>₹{fo.price}</span>
            </div>
          ) : null; })}
          {sel.jewellery && (() => { const p = products.find(x => x.id === sel.jewellery); return p ? (
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 8 }}>
              <span>{p.image} {p.name}</span><span style={{ fontWeight: 600 }}>₹{p.price.toLocaleString()}</span>
            </div>
          ) : null; })()}
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 8 }}>
            <span>🎀 Ribbon & Wrap</span><span style={{ fontWeight: 600 }}>₹199</span>
          </div>
          {total > 199 && (
            <div style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: 12, marginTop: 8, display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 16 }}>
              <span>Total</span><span style={{ color: COLORS.gold }}>₹{total.toLocaleString()}</span>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

// ============================================================
// ADMIN SCREENS
// ============================================================

// ADMIN DASHBOARD
const AdminDashboard = ({ nav }) => {
  const stats = [
    { label: "Revenue Today", value: "₹42,340", icon: "💰", change: "+18%", color: COLORS.success },
    { label: "Orders Today", value: "23", icon: "📦", change: "+5", color: COLORS.gold },
    { label: "Pending Orders", value: "8", icon: "⏳", change: "Action needed", color: COLORS.warning },
    { label: "Low Stock", value: "4", icon: "⚠️", change: "Restock now", color: COLORS.danger },
    { label: "Visitors Today", value: "1,284", icon: "👥", change: "+12%", color: COLORS.info },
    { label: "Conversion Rate", value: "3.2%", icon: "📈", change: "+0.4%", color: COLORS.success },
  ];
  const monthData = [28, 42, 35, 58, 72, 65, 88, 94, 78, 95, 102, 89];
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const maxVal = Math.max(...monthData);

  return (
    <div style={{ padding: 28 }}>
      <div style={{ marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontFamily: "Playfair Display", fontSize: 28, marginBottom: 4 }}>Dashboard</h1>
          <p style={{ color: COLORS.muted, fontSize: 14 }}>Welcome back! Here's what's happening today.</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <Btn variant="ghost" size="sm">📅 This Month</Btn>
          <Btn size="sm">+ New Order</Btn>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 14, marginBottom: 24 }}>
        {stats.map(s => (
          <Card key={s.label} style={{ padding: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div style={{ fontSize: 22 }}>{s.icon}</div>
              <span style={{ fontSize: 10, color: s.color, fontWeight: 600, background: s.color + "20", padding: "2px 6px", borderRadius: 8 }}>{s.change}</span>
            </div>
            <div style={{ fontFamily: "Playfair Display", fontSize: 22, fontWeight: 700, marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: 11, color: COLORS.muted }}>{s.label}</div>
          </Card>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20, marginBottom: 20 }}>
        {/* Revenue Chart */}
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <h3 style={{ fontFamily: "Playfair Display", fontSize: 18 }}>Monthly Revenue</h3>
            <span style={{ color: COLORS.muted, fontSize: 12 }}>₹8,42,340 this year</span>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 160 }}>
            {monthData.map((v, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div style={{ width: "100%", background: i === 11 ? COLORS.gold : `${COLORS.gold}40`, borderRadius: "4px 4px 0 0", height: `${(v / maxVal) * 140}px`, transition: "all .3s" }} />
                <div style={{ fontSize: 9, color: COLORS.muted }}>{months[i]}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Best Selling */}
        <Card>
          <h3 style={{ fontFamily: "Playfair Display", fontSize: 18, marginBottom: 16 }}>Best Sellers</h3>
          {products.slice(0,5).map((p, i) => (
            <div key={p.id} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: i === 0 ? COLORS.gold : COLORS.bgLight, color: i === 0 ? COLORS.white : COLORS.muted, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }}>{i + 1}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{p.name}</div>
                <ProgressBar value={products.length - i} max={products.length + 2} />
              </div>
              <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.gold }}>₹{(p.price * (10 - i)).toLocaleString()}</div>
            </div>
          ))}
        </Card>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Recent Orders */}
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
            <h3 style={{ fontFamily: "Playfair Display", fontSize: 18 }}>Recent Orders</h3>
            <button onClick={() => nav("admin-orders")} style={{ color: COLORS.gold, fontSize: 12, background: "none", border: "none", cursor: "pointer" }}>View all →</button>
          </div>
          {orders.slice(0,5).map(o => (
            <div key={o.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, paddingBottom: 12, borderBottom: `1px solid ${COLORS.border}` }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{o.id}</div>
                <div style={{ color: COLORS.muted, fontSize: 11 }}>{o.customer} · {o.date}</div>
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <span style={{ fontWeight: 600, fontSize: 13 }}>₹{o.total.toLocaleString()}</span>
                <StatusBadge status={o.status} />
              </div>
            </div>
          ))}
        </Card>

        {/* Inventory Alerts */}
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
            <h3 style={{ fontFamily: "Playfair Display", fontSize: 18 }}>Inventory Alerts</h3>
            <button onClick={() => nav("admin-inventory")} style={{ color: COLORS.gold, fontSize: 12, background: "none", border: "none", cursor: "pointer" }}>Manage →</button>
          </div>
          {products.filter(p => p.stock < 10).map(p => (
            <div key={p.id} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12, paddingBottom: 12, borderBottom: `1px solid ${COLORS.border}` }}>
              <div style={{ fontSize: 24 }}>{p.image}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{p.name}</div>
                <div style={{ marginTop: 4 }}><ProgressBar value={p.stock} max={20} color={p.stock === 0 ? COLORS.danger : COLORS.warning} /></div>
              </div>
              <span style={{ fontSize: 12, fontWeight: 700, color: p.stock === 0 ? COLORS.danger : COLORS.warning }}>{p.stock === 0 ? "SOLD OUT" : `${p.stock} left`}</span>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
};

// ADMIN PRODUCTS
const AdminProducts = ({ nav }) => {
  const [showAdd, setShowAdd] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [form, setForm] = useState({ name: "", category: "Necklaces", price: "", cost: "", stock: "", sku: "", status: "Active", description: "" });
  const [activeTab, setActiveTab] = useState("general");

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) &&
    (category === "All" || p.category === category)
  );

  if (showAdd) {
    const formTabs = ["general", "pricing", "inventory", "media", "variants", "seo", "visibility"];
    return (
      <div style={{ padding: 28 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div>
            <button onClick={() => setShowAdd(false)} style={{ color: COLORS.gold, background: "none", border: "none", fontSize: 13, cursor: "pointer", marginBottom: 6 }}>← Back to Products</button>
            <h2 style={{ fontFamily: "Playfair Display", fontSize: 26 }}>Add New Product</h2>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <Btn variant="ghost">Save Draft</Btn>
            <Btn>Publish Product</Btn>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 20 }}>
          <Card style={{ padding: 0, overflow: "hidden" }}>
            {formTabs.map(t => (
              <button key={t} onClick={() => setActiveTab(t)} style={{ display: "block", width: "100%", textAlign: "left", padding: "12px 16px", border: "none", background: activeTab === t ? `${COLORS.gold}15` : "transparent", color: activeTab === t ? COLORS.gold : COLORS.text, fontWeight: activeTab === t ? 600 : 400, fontSize: 13, cursor: "pointer", fontFamily: "Inter", borderLeft: activeTab === t ? `3px solid ${COLORS.gold}` : "3px solid transparent", textTransform: "capitalize" }}>
                {t === "seo" ? "SEO" : t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </Card>
          <Card>
            {activeTab === "general" && (
              <div>
                <h3 style={{ fontFamily: "Playfair Display", fontSize: 20, marginBottom: 20 }}>General Information</h3>
                <Input label="Product Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="e.g. Pearl Necklace Gold" />
                <div style={{ marginBottom: 14 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>Description</label>
                  <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Describe the product in detail..." style={{ width: "100%", height: 100, padding: "10px 14px", border: `1px solid ${COLORS.border}`, borderRadius: 8, resize: "none", fontSize: 14, fontFamily: "Inter", outline: "none" }} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <Select label="Category" value={form.category} onChange={e => setForm({...form, category: e.target.value})} options={["Necklaces","Earrings","Bracelets","Rings","Anklets","Watches","Hair Accessories","Wallets","Jewel Bouquets","Gift Boxes"]} />
                  <Input label="SKU" value={form.sku} onChange={e => setForm({...form, sku: e.target.value})} placeholder="e.g. JW-011" />
                </div>
                <Input label="Brand" value="Glimora" onChange={() => {}} />
              </div>
            )}
            {activeTab === "pricing" && (
              <div>
                <h3 style={{ fontFamily: "Playfair Display", fontSize: 20, marginBottom: 20 }}>Pricing</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <Input label="Cost Price (₹)" value={form.cost} onChange={e => setForm({...form, cost: e.target.value})} placeholder="0.00" type="number" />
                  <Input label="Selling Price (₹)" value={form.price} onChange={e => setForm({...form, price: e.target.value})} placeholder="0.00" type="number" />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div style={{ marginBottom: 14 }}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>Discount</label>
                    <div style={{ display: "flex", gap: 8 }}>
                      <input placeholder="0" type="number" style={{ flex: 1, padding: "10px 14px", border: `1px solid ${COLORS.border}`, borderRadius: 8, fontSize: 14, fontFamily: "Inter", outline: "none" }} />
                      <select style={{ padding: "10px 12px", border: `1px solid ${COLORS.border}`, borderRadius: 8, fontSize: 14, fontFamily: "Inter", background: COLORS.white, outline: "none" }}>
                        <option>%</option><option>₹</option>
                      </select>
                    </div>
                  </div>
                  <Select label="Tax" value="GST 3%" onChange={() => {}} options={["No Tax","GST 3%","GST 5%","GST 12%","GST 18%"]} />
                </div>
              </div>
            )}
            {activeTab === "inventory" && (
              <div>
                <h3 style={{ fontFamily: "Playfair Display", fontSize: 20, marginBottom: 20 }}>Inventory</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <Input label="Quantity" value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} placeholder="0" type="number" />
                  <Input label="Low Stock Alert at" value="5" onChange={() => {}} type="number" />
                </div>
                <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", fontSize: 13 }}>
                  <input type="checkbox" defaultChecked /> Track inventory for this product
                </label>
              </div>
            )}
            {activeTab === "media" && (
              <div>
                <h3 style={{ fontFamily: "Playfair Display", fontSize: 20, marginBottom: 20 }}>Media</h3>
                <div style={{ border: `2px dashed ${COLORS.border}`, borderRadius: 14, padding: 40, textAlign: "center", cursor: "pointer" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = COLORS.gold}
                  onMouseLeave={e => e.currentTarget.style.borderColor = COLORS.border}>
                  <div style={{ fontSize: 40, marginBottom: 12 }}>📸</div>
                  <div style={{ fontWeight: 600, marginBottom: 4 }}>Upload Images</div>
                  <div style={{ color: COLORS.muted, fontSize: 13 }}>Drag & drop or click to browse</div>
                  <div style={{ color: COLORS.muted, fontSize: 11, marginTop: 4 }}>Supports JPG, PNG, WEBP · Max 5MB each</div>
                </div>
                <div style={{ marginTop: 16 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 8 }}>Upload Video</label>
                  <div style={{ border: `2px dashed ${COLORS.border}`, borderRadius: 10, padding: 20, textAlign: "center", cursor: "pointer" }}>
                    <div style={{ fontSize: 24, marginBottom: 6 }}>🎥</div>
                    <div style={{ fontSize: 13, color: COLORS.muted }}>Upload product video</div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "variants" && (
              <div>
                <h3 style={{ fontFamily: "Playfair Display", fontSize: 20, marginBottom: 20 }}>Product Variants</h3>
                {[{ label: "Colors", options: ["Gold", "Rose Gold", "Silver", "Black"] }, { label: "Size", options: ["XS", "S", "M", "L", "XL"] }, { label: "Material", options: ["Sterling Silver", "Gold Plated", "Pure Gold", "Stainless Steel"] }].map(v => (
                  <div key={v.label} style={{ marginBottom: 20 }}>
                    <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 8 }}>{v.label}</div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {v.options.map(o => (
                        <button key={o} style={{ padding: "6px 14px", borderRadius: 20, border: `1px solid ${COLORS.border}`, fontSize: 12, cursor: "pointer", background: COLORS.white, fontFamily: "Inter" }}>{o}</button>
                      ))}
                      <button style={{ padding: "6px 14px", borderRadius: 20, border: `1px dashed ${COLORS.gold}`, fontSize: 12, cursor: "pointer", background: "transparent", color: COLORS.gold, fontFamily: "Inter" }}>+ Add</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {activeTab === "seo" && (
              <div>
                <h3 style={{ fontFamily: "Playfair Display", fontSize: 20, marginBottom: 20 }}>SEO Settings</h3>
                <Input label="URL Slug" value="celestial-pearl-necklace" onChange={() => {}} />
                <Input label="Meta Title" value="" onChange={() => {}} placeholder="SEO title (50-60 chars)" />
                <div style={{ marginBottom: 14 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>Meta Description</label>
                  <textarea placeholder="SEO description (150-160 chars)" style={{ width: "100%", height: 80, padding: "10px 14px", border: `1px solid ${COLORS.border}`, borderRadius: 8, resize: "none", fontSize: 14, fontFamily: "Inter", outline: "none" }} />
                </div>
              </div>
            )}
            {activeTab === "visibility" && (
              <div>
                <h3 style={{ fontFamily: "Playfair Display", fontSize: 20, marginBottom: 20 }}>Visibility</h3>
                {["Draft", "Active", "Scheduled"].map(s => (
                  <label key={s} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", border: `2px solid ${form.status === s ? COLORS.gold : COLORS.border}`, borderRadius: 10, cursor: "pointer", marginBottom: 10, background: form.status === s ? `${COLORS.gold}08` : COLORS.white }}>
                    <input type="radio" name="status" checked={form.status === s} onChange={() => setForm({...form, status: s})} style={{ accentColor: COLORS.gold }} />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{s}</div>
                      <div style={{ fontSize: 12, color: COLORS.muted }}>{s === "Draft" ? "Not visible to customers" : s === "Active" ? "Visible immediately" : "Set a future publish date"}</div>
                    </div>
                  </label>
                ))}
                {form.status === "Scheduled" && <Input label="Publish Date" type="date" value="" onChange={() => {}} />}
              </div>
            )}
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 28 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h2 style={{ fontFamily: "Playfair Display", fontSize: 26 }}>Products</h2>
        <Btn onClick={() => setShowAdd(true)}>+ Add Product</Btn>
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Search products..." style={{ flex: 1, padding: "10px 16px", border: `1px solid ${COLORS.border}`, borderRadius: 10, fontSize: 14, fontFamily: "Inter", outline: "none" }} />
        <select value={category} onChange={e => setCategory(e.target.value)} style={{ padding: "10px 16px", border: `1px solid ${COLORS.border}`, borderRadius: 10, fontSize: 14, fontFamily: "Inter", background: COLORS.white, outline: "none" }}>
          <option>All</option>
          {[...new Set(products.map(p => p.category))].map(c => <option key={c}>{c}</option>)}
        </select>
        <Btn variant="ghost">Export</Btn>
        <Btn variant="ghost">Import</Btn>
      </div>

      <Card style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: COLORS.bgLight }}>
              {["Image","Product","SKU","Category","Price","Stock","Status","Actions"].map(h => (
                <th key={h} style={{ padding: "12px 14px", textAlign: "left", fontSize: 11, fontWeight: 700, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 1 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, i) => (
              <tr key={p.id} style={{ borderBottom: `1px solid ${COLORS.border}`, background: i % 2 === 0 ? COLORS.white : "#FDFAF5" }}>
                <td style={{ padding: "12px 14px" }}>
                  <div style={{ width: 44, height: 44, background: COLORS.bgLight, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>{p.image}</div>
                </td>
                <td style={{ padding: "12px 14px" }}>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{p.name}</div>
                  <div style={{ color: COLORS.gold, fontSize: 11, marginTop: 2 }}>★ {p.rating} ({p.reviews})</div>
                </td>
                <td style={{ padding: "12px 14px", fontSize: 12, color: COLORS.muted }}>{p.sku}</td>
                <td style={{ padding: "12px 14px", fontSize: 12 }}>{p.category}</td>
                <td style={{ padding: "12px 14px", fontWeight: 700, color: COLORS.gold, fontSize: 14 }}>₹{p.price.toLocaleString()}</td>
                <td style={{ padding: "12px 14px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 12, fontWeight: 600 }}>{p.stock}</span>
                    <ProgressBar value={p.stock} max={25} color={p.stock === 0 ? COLORS.danger : p.stock < 5 ? COLORS.warning : COLORS.success} />
                  </div>
                </td>
                <td style={{ padding: "12px 14px" }}><StatusBadge status={p.stock === 0 ? "Out of Stock" : p.status} /></td>
                <td style={{ padding: "12px 14px" }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    {["👁","✏️","⊕","🗑"].map(a => (
                      <button key={a} title={a === "👁" ? "View" : a === "✏️" ? "Edit" : a === "⊕" ? "Duplicate" : "Delete"} style={{ width: 30, height: 30, border: `1px solid ${COLORS.border}`, background: COLORS.white, borderRadius: 6, cursor: "pointer", fontSize: 12 }}>{a}</button>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

// ADMIN ORDERS
const AdminOrders = ({ nav }) => {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const tabs = ["All", "Pending", "Confirmed", "Packed", "Shipped", "Delivered", "Cancelled", "Refunded"];
  const filtered = activeTab === "All" ? orders : orders.filter(o => o.status === activeTab);

  if (selectedOrder) {
    const o = selectedOrder;
    const timeline = [
      { label: "Order Placed", done: true }, { label: "Confirmed", done: true },
      { label: "Packed", done: ["Packed","Shipped","Delivered"].includes(o.status) },
      { label: "Shipped", done: ["Shipped","Delivered"].includes(o.status) },
      { label: "Delivered", done: o.status === "Delivered" }
    ];
    return (
      <div style={{ padding: 28 }}>
        <button onClick={() => setSelectedOrder(null)} style={{ color: COLORS.gold, background: "none", border: "none", fontSize: 13, cursor: "pointer", marginBottom: 16 }}>← Back to Orders</button>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
          <div>
            <h2 style={{ fontFamily: "Playfair Display", fontSize: 26 }}>Order {o.id}</h2>
            <p style={{ color: COLORS.muted, fontSize: 14, marginTop: 4 }}>Placed on {o.date} · {o.payment}</p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <Btn variant="ghost" size="sm">📄 Invoice</Btn>
            <Btn variant="ghost" size="sm">🏷 Shipping Label</Btn>
            <Btn size="sm">Update Status</Btn>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }}>
          <div>
            <Card style={{ marginBottom: 16 }}>
              <h3 style={{ fontFamily: "Playfair Display", fontSize: 18, marginBottom: 16 }}>Order Timeline</h3>
              <div style={{ display: "flex", gap: 0 }}>
                {timeline.map((t, i) => (
                  <div key={t.label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
                      {i > 0 && <div style={{ flex: 1, height: 2, background: t.done ? COLORS.gold : COLORS.border }} />}
                      <div style={{ width: 28, height: 28, borderRadius: "50%", background: t.done ? COLORS.gold : COLORS.border, color: COLORS.white, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{t.done ? "✓" : i + 1}</div>
                      {i < 4 && <div style={{ flex: 1, height: 2, background: timeline[i + 1]?.done ? COLORS.gold : COLORS.border }} />}
                    </div>
                    <div style={{ fontSize: 10, marginTop: 6, color: t.done ? COLORS.text : COLORS.muted, fontWeight: t.done ? 600 : 400, textAlign: "center" }}>{t.label}</div>
                  </div>
                ))}
              </div>
            </Card>
            <Card style={{ marginBottom: 16 }}>
              <h3 style={{ fontFamily: "Playfair Display", fontSize: 18, marginBottom: 16 }}>Products</h3>
              {products.slice(0, o.items).map(p => (
                <div key={p.id} style={{ display: "flex", gap: 12, alignItems: "center", paddingBottom: 12, marginBottom: 12, borderBottom: `1px solid ${COLORS.border}` }}>
                  <div style={{ width: 48, height: 48, background: COLORS.bgLight, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>{p.image}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 500 }}>{p.name}</div>
                    <div style={{ color: COLORS.muted, fontSize: 12 }}>{p.sku} · Qty: 1</div>
                  </div>
                  <div style={{ fontWeight: 700 }}>₹{p.price.toLocaleString()}</div>
                </div>
              ))}
            </Card>
          </div>
          <div>
            <Card style={{ marginBottom: 16 }}>
              <h3 style={{ fontFamily: "Playfair Display", fontSize: 16, marginBottom: 14 }}>Customer Details</h3>
              <div style={{ fontSize: 14, lineHeight: 2 }}>
                <div style={{ fontWeight: 600 }}>{o.customer}</div>
                <div style={{ color: COLORS.muted }}>📍 {o.city}</div>
                <div style={{ color: COLORS.muted }}>💳 {o.payment}</div>
              </div>
            </Card>
            <Card style={{ marginBottom: 16 }}>
              <h3 style={{ fontFamily: "Playfair Display", fontSize: 16, marginBottom: 14 }}>Payment Summary</h3>
              {[["Subtotal", `₹${o.total.toLocaleString()}`], ["Shipping", "FREE"], ["Total", `₹${o.total.toLocaleString()}`]].map(([l, v]) => (
                <div key={l} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 8, fontWeight: l === "Total" ? 700 : 400, color: l === "Total" ? COLORS.gold : COLORS.muted }}>
                  <span>{l}</span><span>{v}</span>
                </div>
              ))}
            </Card>
            <Card>
              <h3 style={{ fontFamily: "Playfair Display", fontSize: 16, marginBottom: 14 }}>Add Note</h3>
              <textarea placeholder="Internal note about this order..." style={{ width: "100%", height: 80, padding: "10px 12px", border: `1px solid ${COLORS.border}`, borderRadius: 8, resize: "none", fontSize: 13, fontFamily: "Inter", outline: "none" }} />
              <Btn style={{ marginTop: 10, width: "100%" }}>Save Note</Btn>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 28 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h2 style={{ fontFamily: "Playfair Display", fontSize: 26 }}>Orders</h2>
        <div style={{ display: "flex", gap: 10 }}>
          <Btn variant="ghost" size="sm">Export</Btn>
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setActiveTab(t)} style={{ padding: "8px 16px", borderRadius: 20, border: `1px solid ${activeTab === t ? COLORS.gold : COLORS.border}`, background: activeTab === t ? COLORS.gold : COLORS.white, color: activeTab === t ? COLORS.white : COLORS.text, fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: "Inter" }}>
            {t} {t === "All" ? `(${orders.length})` : `(${orders.filter(o => o.status === t).length})`}
          </button>
        ))}
      </div>

      <Card style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: COLORS.bgLight }}>
              {["Order ID","Customer","Items","Total","Status","Date","Payment","Actions"].map(h => (
                <th key={h} style={{ padding: "12px 14px", textAlign: "left", fontSize: 11, fontWeight: 700, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 1 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((o, i) => (
              <tr key={o.id} style={{ borderBottom: `1px solid ${COLORS.border}`, background: i % 2 === 0 ? COLORS.white : "#FDFAF5", cursor: "pointer" }} onClick={() => setSelectedOrder(o)}>
                <td style={{ padding: "12px 14px", fontWeight: 700, color: COLORS.gold, fontSize: 13 }}>{o.id}</td>
                <td style={{ padding: "12px 14px" }}>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{o.customer}</div>
                  <div style={{ fontSize: 11, color: COLORS.muted }}>{o.city}</div>
                </td>
                <td style={{ padding: "12px 14px", fontSize: 13 }}>{o.items}</td>
                <td style={{ padding: "12px 14px", fontWeight: 700, fontSize: 14 }}>₹{o.total.toLocaleString()}</td>
                <td style={{ padding: "12px 14px" }}><StatusBadge status={o.status} /></td>
                <td style={{ padding: "12px 14px", fontSize: 12, color: COLORS.muted }}>{o.date}</td>
                <td style={{ padding: "12px 14px", fontSize: 12 }}>{o.payment}</td>
                <td style={{ padding: "12px 14px" }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button onClick={e => { e.stopPropagation(); setSelectedOrder(o); }} style={{ padding: "4px 10px", border: `1px solid ${COLORS.gold}`, borderRadius: 6, color: COLORS.gold, background: "transparent", fontSize: 11, cursor: "pointer" }}>View</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

// ADMIN INVENTORY
const AdminInventory = ({ nav }) => {
  const stats = [
    { label: "Total Products", value: products.length, icon: "📦", color: COLORS.info },
    { label: "In Stock", value: products.filter(p => p.stock > 5).length, icon: "✅", color: COLORS.success },
    { label: "Low Stock", value: products.filter(p => p.stock > 0 && p.stock <= 5).length, icon: "⚠️", color: COLORS.warning },
    { label: "Out of Stock", value: products.filter(p => p.stock === 0).length, icon: "❌", color: COLORS.danger },
    { label: "Inventory Value", value: "₹3,24,890", icon: "💰", color: COLORS.gold },
  ];
  const [tab, setTab] = useState("stock");

  return (
    <div style={{ padding: 28 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h2 style={{ fontFamily: "Playfair Display", fontSize: 26 }}>Inventory Management</h2>
        <div style={{ display: "flex", gap: 10 }}>
          <Btn variant="ghost" size="sm">📤 Export</Btn>
          <Btn variant="ghost" size="sm">📥 Import</Btn>
          <Btn size="sm">+ Stock Entry</Btn>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 14, marginBottom: 24 }}>
        {stats.map(s => (
          <Card key={s.label} style={{ padding: 16, textAlign: "center" }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ fontFamily: "Playfair Display", fontSize: 22, fontWeight: 700, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 11, color: COLORS.muted, marginTop: 4 }}>{s.label}</div>
          </Card>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {[{ id: "stock", label: "Stock Levels" }, { id: "adjust", label: "Adjustments" }, { id: "purchase", label: "Purchase Entry" }, { id: "history", label: "History" }].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "8px 16px", borderRadius: 20, border: `1px solid ${tab === t.id ? COLORS.gold : COLORS.border}`, background: tab === t.id ? COLORS.gold : COLORS.white, color: tab === t.id ? COLORS.white : COLORS.text, fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: "Inter" }}>{t.label}</button>
        ))}
      </div>

      {tab === "stock" && (
        <Card style={{ padding: 0, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: COLORS.bgLight }}>
                {["Product","SKU","Category","In Stock","Threshold","Status","Actions"].map(h => (
                  <th key={h} style={{ padding: "12px 14px", textAlign: "left", fontSize: 11, fontWeight: 700, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 1 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((p, i) => (
                <tr key={p.id} style={{ borderBottom: `1px solid ${COLORS.border}`, background: i % 2 === 0 ? COLORS.white : "#FDFAF5" }}>
                  <td style={{ padding: "12px 14px" }}>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <span style={{ fontSize: 20 }}>{p.image}</span>
                      <span style={{ fontSize: 13, fontWeight: 500 }}>{p.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: "12px 14px", fontSize: 12, color: COLORS.muted }}>{p.sku}</td>
                  <td style={{ padding: "12px 14px", fontSize: 12 }}>{p.category}</td>
                  <td style={{ padding: "12px 14px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontWeight: 700, fontSize: 15 }}>{p.stock}</span>
                      <div style={{ width: 60 }}><ProgressBar value={p.stock} max={25} color={p.stock === 0 ? COLORS.danger : p.stock <= 5 ? COLORS.warning : COLORS.success} /></div>
                    </div>
                  </td>
                  <td style={{ padding: "12px 14px", fontSize: 12, color: COLORS.muted }}>5</td>
                  <td style={{ padding: "12px 14px" }}><StatusBadge status={p.stock === 0 ? "Out of Stock" : p.stock <= 5 ? "Pending" : "Active"} /></td>
                  <td style={{ padding: "12px 14px" }}>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button style={{ padding: "4px 10px", border: `1px solid ${COLORS.gold}`, borderRadius: 6, color: COLORS.gold, background: "transparent", fontSize: 11, cursor: "pointer" }}>Adjust</button>
                      <button style={{ padding: "4px 10px", border: `1px solid ${COLORS.border}`, borderRadius: 6, color: COLORS.muted, background: "transparent", fontSize: 11, cursor: "pointer" }}>History</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {tab === "adjust" && (
        <Card>
          <h3 style={{ fontFamily: "Playfair Display", fontSize: 20, marginBottom: 20 }}>Stock Adjustment</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Select label="Product" value="Celestial Pearl Necklace" onChange={() => {}} options={products.map(p => p.name)} />
            <Select label="Adjustment Type" value="Add Stock" onChange={() => {}} options={["Add Stock","Remove Stock","Set Exact","Damaged","Returned"]} />
            <Input label="Quantity" value="" onChange={() => {}} type="number" placeholder="0" />
            <Input label="Reason" value="" onChange={() => {}} placeholder="e.g. New purchase, correction..." />
          </div>
          <Btn>Apply Adjustment</Btn>
        </Card>
      )}

      {tab === "purchase" && (
        <Card>
          <h3 style={{ fontFamily: "Playfair Display", fontSize: 20, marginBottom: 20 }}>New Purchase Entry</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Input label="Supplier Name" value="" onChange={() => {}} placeholder="Supplier" />
            <Input label="Invoice Number" value="" onChange={() => {}} placeholder="INV-001" />
            <Input label="Purchase Date" type="date" value="" onChange={() => {}} />
            <Input label="Total Cost (₹)" value="" onChange={() => {}} type="number" />
          </div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 12 }}>Items</div>
            {products.slice(0, 3).map(p => (
              <div key={p.id} style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 10 }}>
                <span style={{ fontSize: 20 }}>{p.image}</span>
                <span style={{ flex: 1, fontSize: 13 }}>{p.name}</span>
                <input placeholder="Qty" type="number" style={{ width: 70, padding: "6px 10px", border: `1px solid ${COLORS.border}`, borderRadius: 6, fontSize: 13, fontFamily: "Inter", outline: "none" }} />
                <input placeholder="Cost" type="number" style={{ width: 90, padding: "6px 10px", border: `1px solid ${COLORS.border}`, borderRadius: 6, fontSize: 13, fontFamily: "Inter", outline: "none" }} />
              </div>
            ))}
            <button style={{ color: COLORS.gold, background: "none", border: "none", fontSize: 13, cursor: "pointer" }}>+ Add more items</button>
          </div>
          <Btn>Save Purchase Entry</Btn>
        </Card>
      )}

      {tab === "history" && (
        <Card style={{ padding: 0, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: COLORS.bgLight }}>
                {["Date","Product","Type","Quantity","By","Reason"].map(h => (
                  <th key={h} style={{ padding: "12px 14px", textAlign: "left", fontSize: 11, fontWeight: 700, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 1 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { date:"Jan 15","product":"Pearl Necklace","type":"Add","qty":"+10","by":"Admin","reason":"New purchase" },
                { date:"Jan 14","product":"Hoop Earrings","type":"Remove","qty":"-2","by":"System","reason":"Order fulfilled" },
                { date:"Jan 13","product":"Tennis Bracelet","type":"Damaged","qty":"-1","by":"Warehouse","reason":"Damaged in transit" },
                { date:"Jan 12","product":"Anklet Chain","type":"Add","qty":"+20","by":"Admin","reason":"Restocked" },
              ].map((r, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                  <td style={{ padding: "12px 14px", fontSize: 12, color: COLORS.muted }}>{r.date}</td>
                  <td style={{ padding: "12px 14px", fontSize: 13, fontWeight: 500 }}>{r.product}</td>
                  <td style={{ padding: "12px 14px" }}><Badge color={r.type === "Add" ? COLORS.success : r.type === "Remove" ? COLORS.info : COLORS.danger}>{r.type}</Badge></td>
                  <td style={{ padding: "12px 14px", fontWeight: 700, color: r.qty.startsWith("+") ? COLORS.success : COLORS.danger, fontSize: 14 }}>{r.qty}</td>
                  <td style={{ padding: "12px 14px", fontSize: 12 }}>{r.by}</td>
                  <td style={{ padding: "12px 14px", fontSize: 12, color: COLORS.muted }}>{r.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
};

// ADMIN CUSTOMERS
const AdminCustomers = ({ nav }) => {
  const [selected, setSelected] = useState(null);
  if (selected) {
    const c = selected;
    return (
      <div style={{ padding: 28 }}>
        <button onClick={() => setSelected(null)} style={{ color: COLORS.gold, background: "none", border: "none", fontSize: 13, cursor: "pointer", marginBottom: 16 }}>← Back to Customers</button>
        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 24 }}>
          <div>
            <Card style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ width: 80, height: 80, borderRadius: "50%", background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldDark})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, color: COLORS.white, margin: "0 auto 12px" }}>{c.name[0]}</div>
              <div style={{ fontWeight: 700, fontSize: 18, fontFamily: "Playfair Display" }}>{c.name}</div>
              <div style={{ color: COLORS.muted, fontSize: 12, marginTop: 4 }}>{c.email}</div>
              <div style={{ marginTop: 8 }}><StatusBadge status={c.status} /></div>
            </Card>
            <Card>
              {[["Orders", c.orders], ["Total Spent", `₹${c.spent.toLocaleString()}`], ["City", c.city], ["Member Since", c.joined]].map(([l, v]) => (
                <div key={l} style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, fontSize: 13 }}>
                  <span style={{ color: COLORS.muted }}>{l}</span>
                  <span style={{ fontWeight: 600 }}>{v}</span>
                </div>
              ))}
            </Card>
          </div>
          <div>
            <Card style={{ marginBottom: 16 }}>
              <h3 style={{ fontFamily: "Playfair Display", fontSize: 20, marginBottom: 16 }}>Purchase History</h3>
              {orders.slice(0, 4).map(o => (
                <div key={o.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, paddingBottom: 12, borderBottom: `1px solid ${COLORS.border}` }}>
                  <div><div style={{ fontWeight: 600, fontSize: 13 }}>{o.id}</div><div style={{ color: COLORS.muted, fontSize: 11 }}>{o.date}</div></div>
                  <div style={{ display: "flex", gap: 10 }}><span style={{ fontWeight: 700 }}>₹{o.total.toLocaleString()}</span><StatusBadge status={o.status} /></div>
                </div>
              ))}
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 28 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h2 style={{ fontFamily: "Playfair Display", fontSize: 26 }}>Customers</h2>
        <Btn variant="ghost" size="sm">Export</Btn>
      </div>
      <Card style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: COLORS.bgLight }}>
              {["Customer","Email","Orders","Lifetime Value","City","Joined","Status","Actions"].map(h => (
                <th key={h} style={{ padding: "12px 14px", textAlign: "left", fontSize: 11, fontWeight: 700, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 1 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {customers.map((c, i) => (
              <tr key={c.id} style={{ borderBottom: `1px solid ${COLORS.border}`, background: i % 2 === 0 ? COLORS.white : "#FDFAF5", cursor: "pointer" }} onClick={() => setSelected(c)}>
                <td style={{ padding: "12px 14px" }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: COLORS.gold, color: COLORS.white, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>{c.name[0]}</div>
                    <span style={{ fontWeight: 500, fontSize: 13 }}>{c.name}</span>
                  </div>
                </td>
                <td style={{ padding: "12px 14px", fontSize: 12, color: COLORS.muted }}>{c.email}</td>
                <td style={{ padding: "12px 14px", fontSize: 13, fontWeight: 600 }}>{c.orders}</td>
                <td style={{ padding: "12px 14px", color: COLORS.gold, fontWeight: 700 }}>₹{c.spent.toLocaleString()}</td>
                <td style={{ padding: "12px 14px", fontSize: 12 }}>{c.city}</td>
                <td style={{ padding: "12px 14px", fontSize: 12, color: COLORS.muted }}>{c.joined}</td>
                <td style={{ padding: "12px 14px" }}><StatusBadge status={c.status} /></td>
                <td style={{ padding: "12px 14px" }}><button onClick={e => { e.stopPropagation(); setSelected(c); }} style={{ padding: "4px 10px", border: `1px solid ${COLORS.gold}`, borderRadius: 6, color: COLORS.gold, background: "transparent", fontSize: 11, cursor: "pointer" }}>View</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

// ADMIN ANALYTICS
const AdminAnalytics = ({ nav }) => {
  const kpis = [
    { label: "Total Revenue", value: "₹8,42,340", change: "+24%", icon: "💰" },
    { label: "Total Orders", value: "1,284", change: "+18%", icon: "📦" },
    { label: "Avg Order Value", value: "₹6,560", change: "+8%", icon: "📊" },
    { label: "Repeat Customers", value: "38%", change: "+5%", icon: "🔄" },
  ];
  const categoryData = [
    { name: "Necklaces", value: 35 }, { name: "Earrings", value: 22 }, { name: "Gift Boxes", value: 18 },
    { name: "Bracelets", value: 12 }, { name: "Rings", value: 8 }, { name: "Other", value: 5 }
  ];

  return (
    <div style={{ padding: 28 }}>
      <div style={{ marginBottom: 24, display: "flex", justifyContent: "space-between" }}>
        <h2 style={{ fontFamily: "Playfair Display", fontSize: 26 }}>Analytics</h2>
        <div style={{ display: "flex", gap: 8 }}>
          {["7 Days","30 Days","3 Months","1 Year"].map(p => (
            <button key={p} style={{ padding: "6px 14px", borderRadius: 20, border: `1px solid ${p === "30 Days" ? COLORS.gold : COLORS.border}`, background: p === "30 Days" ? COLORS.gold : COLORS.white, color: p === "30 Days" ? COLORS.white : COLORS.text, fontSize: 12, cursor: "pointer", fontFamily: "Inter" }}>{p}</button>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
        {kpis.map(k => (
          <Card key={k.label} style={{ padding: 20 }}>
            <div style={{ fontSize: 28, marginBottom: 10 }}>{k.icon}</div>
            <div style={{ fontFamily: "Playfair Display", fontSize: 24, fontWeight: 700, marginBottom: 4 }}>{k.value}</div>
            <div style={{ color: COLORS.muted, fontSize: 12, marginBottom: 8 }}>{k.label}</div>
            <span style={{ color: COLORS.success, fontWeight: 600, fontSize: 12, background: `${COLORS.success}15`, padding: "2px 8px", borderRadius: 10 }}>{k.change} vs last month</span>
          </Card>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        <Card>
          <h3 style={{ fontFamily: "Playfair Display", fontSize: 18, marginBottom: 24 }}>Revenue Trend</h3>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 160 }}>
            {[45,62,48,74,88,72,95,108,90,112,128,145].map((v, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div style={{ width: "100%", background: i === 11 ? COLORS.gold : `${COLORS.gold}35`, borderRadius: "4px 4px 0 0", height: `${(v / 145) * 150}px` }} />
                <div style={{ fontSize: 8, color: COLORS.muted }}>{"JFMAMJJASOND"[i]}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h3 style={{ fontFamily: "Playfair Display", fontSize: 18, marginBottom: 24 }}>Sales by Category</h3>
          {categoryData.map(d => (
            <div key={d.name} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
                <span>{d.name}</span><span style={{ fontWeight: 600 }}>{d.value}%</span>
              </div>
              <ProgressBar value={d.value} color={COLORS.gold} />
            </div>
          ))}
        </Card>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
        {[
          { title: "Abandoned Cart Rate", value: "68%", sub: "₹1,24,320 recoverable", icon: "🛒" },
          { title: "Top Referring Source", value: "Instagram", sub: "42% of traffic", icon: "📱" },
          { title: "Avg Session Duration", value: "4m 22s", sub: "+32 seconds vs last month", icon: "⏱" },
        ].map(s => (
          <Card key={s.title} style={{ textAlign: "center", padding: 24 }}>
            <div style={{ fontSize: 32, marginBottom: 10 }}>{s.icon}</div>
            <div style={{ fontFamily: "Playfair Display", fontSize: 22, fontWeight: 700, marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: 12, color: COLORS.muted, marginBottom: 4 }}>{s.title}</div>
            <div style={{ fontSize: 11, color: COLORS.gold }}>{s.sub}</div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// ADMIN COUPONS
const AdminCoupons = ({ nav }) => {
  const [showAdd, setShowAdd] = useState(false);
  return (
    <div style={{ padding: 28 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h2 style={{ fontFamily: "Playfair Display", fontSize: 26 }}>Coupons & Promotions</h2>
        <Btn onClick={() => setShowAdd(!showAdd)}>+ Create Coupon</Btn>
      </div>

      {showAdd && (
        <Card style={{ marginBottom: 20 }}>
          <h3 style={{ fontFamily: "Playfair Display", fontSize: 20, marginBottom: 20 }}>Create New Coupon</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Input label="Coupon Code" value="" onChange={() => {}} placeholder="e.g. GLIMORA20" />
            <Select label="Discount Type" value="Percentage" onChange={() => {}} options={["Percentage","Flat Discount","Free Shipping"]} />
            <Input label="Discount Value" value="" onChange={() => {}} placeholder="20" type="number" />
            <Input label="Minimum Order Value (₹)" value="" onChange={() => {}} placeholder="0" type="number" />
            <Input label="Usage Limit" value="" onChange={() => {}} placeholder="100" type="number" />
            <Input label="Expiry Date" type="date" value="" onChange={() => {}} />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <Btn>Save Coupon</Btn>
            <Btn variant="ghost" onClick={() => setShowAdd(false)}>Cancel</Btn>
          </div>
        </Card>
      )}

      <Card style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: COLORS.bgLight }}>
              {["Code","Type","Value","Usage","Expiry","Status","Actions"].map(h => (
                <th key={h} style={{ padding: "12px 14px", textAlign: "left", fontSize: 11, fontWeight: 700, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 1 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {coupons.map((c, i) => (
              <tr key={c.id} style={{ borderBottom: `1px solid ${COLORS.border}`, background: i % 2 === 0 ? COLORS.white : "#FDFAF5" }}>
                <td style={{ padding: "12px 14px", fontWeight: 700, fontFamily: "monospace", fontSize: 14, color: COLORS.gold }}>{c.code}</td>
                <td style={{ padding: "12px 14px", fontSize: 13 }}>{c.type}</td>
                <td style={{ padding: "12px 14px", fontWeight: 600 }}>{c.type === "Percentage" ? `${c.value}%` : c.type === "Flat" ? `₹${c.value}` : "FREE"}</td>
                <td style={{ padding: "12px 14px", fontSize: 13 }}>
                  <div>{c.usage}/{c.limit}</div>
                  <ProgressBar value={c.usage} max={c.limit} />
                </td>
                <td style={{ padding: "12px 14px", fontSize: 12, color: COLORS.muted }}>{c.expiry}</td>
                <td style={{ padding: "12px 14px" }}><StatusBadge status={c.status} /></td>
                <td style={{ padding: "12px 14px" }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button style={{ padding: "4px 10px", border: `1px solid ${COLORS.border}`, borderRadius: 6, fontSize: 11, cursor: "pointer", background: "none" }}>Edit</button>
                    <button style={{ padding: "4px 10px", border: `1px solid ${COLORS.danger}`, borderRadius: 6, fontSize: 11, cursor: "pointer", color: COLORS.danger, background: "none" }}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

// ADMIN REVIEWS
const AdminReviews = ({ nav }) => (
  <div style={{ padding: 28 }}>
    <h2 style={{ fontFamily: "Playfair Display", fontSize: 26, marginBottom: 24 }}>Reviews</h2>
    {reviews.map(r => (
      <Card key={r.id} style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 8 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: COLORS.gold, color: COLORS.white, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14 }}>{r.customer[0]}</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{r.customer}</div>
                <div style={{ color: COLORS.muted, fontSize: 11 }}>{r.product} · {r.date}</div>
              </div>
              <div style={{ color: COLORS.gold }}>{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div>
            </div>
            <p style={{ fontSize: 14, color: COLORS.muted, lineHeight: 1.6 }}>{r.text}</p>
            <div style={{ marginTop: 12 }}>
              <input placeholder="Reply to this review..." style={{ width: "100%", padding: "8px 14px", border: `1px solid ${COLORS.border}`, borderRadius: 8, fontSize: 13, fontFamily: "Inter", outline: "none" }} />
            </div>
          </div>
          <div style={{ display: "flex", flex: "column", gap: 8, marginLeft: 20 }}>
            <StatusBadge status={r.status} />
            <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
              <Btn size="sm" variant="secondary">Approve</Btn>
              <Btn size="sm" variant="danger">Reject</Btn>
            </div>
          </div>
        </div>
      </Card>
    ))}
  </div>
);

// ADMIN MARKETING
const AdminMarketing = ({ nav }) => {
  const [tab, setTab] = useState("email");
  return (
    <div style={{ padding: 28 }}>
      <h2 style={{ fontFamily: "Playfair Display", fontSize: 26, marginBottom: 24 }}>Marketing</h2>
      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        {[{ id: "email", label: "📧 Email" }, { id: "whatsapp", label: "📱 WhatsApp" }, { id: "loyalty", label: "⭐ Loyalty" }, { id: "referral", label: "🎁 Referral" }, { id: "gifts", label: "🎫 Gift Cards" }].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "8px 16px", borderRadius: 20, border: `1px solid ${tab === t.id ? COLORS.gold : COLORS.border}`, background: tab === t.id ? COLORS.gold : COLORS.white, color: tab === t.id ? COLORS.white : COLORS.text, fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: "Inter" }}>{t.label}</button>
        ))}
      </div>

      {tab === "email" && (
        <Card>
          <h3 style={{ fontFamily: "Playfair Display", fontSize: 20, marginBottom: 20 }}>Email Campaign</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Input label="Campaign Name" value="" onChange={() => {}} placeholder="e.g. January Sale" />
            <Select label="Audience" value="All Customers" onChange={() => {}} options={["All Customers","VIP Customers","New Customers","Inactive (30+ days)"]} />
          </div>
          <Input label="Subject Line" value="" onChange={() => {}} placeholder="✨ New arrivals just for you!" />
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>Message</label>
            <textarea placeholder="Write your email content here..." style={{ width: "100%", height: 120, padding: "10px 14px", border: `1px solid ${COLORS.border}`, borderRadius: 8, resize: "none", fontSize: 14, fontFamily: "Inter", outline: "none" }} />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <Btn>Send Campaign</Btn>
            <Btn variant="ghost">Schedule</Btn>
            <Btn variant="secondary">Preview</Btn>
          </div>
        </Card>
      )}

      {tab === "whatsapp" && (
        <Card>
          <h3 style={{ fontFamily: "Playfair Display", fontSize: 20, marginBottom: 20 }}>WhatsApp Broadcast</h3>
          <Select label="Template" value="New Collection Alert" onChange={() => {}} options={["New Collection Alert","Order Confirmation","Shipping Update","Festival Offer","Abandoned Cart"]} />
          <Select label="Audience" value="All Customers" onChange={() => {}} options={["All Customers","VIP Only","Recent Buyers"]} />
          <div style={{ background: "#E8F8F5", borderRadius: 14, padding: 20, marginBottom: 16 }}>
            <div style={{ fontWeight: 600, marginBottom: 8, color: "#2C7A5E" }}>📱 Preview</div>
            <div style={{ background: COLORS.white, borderRadius: 10, padding: 14, fontSize: 14, lineHeight: 1.7, maxWidth: 280 }}>
              Hi {"{"}name{"}"} 👋<br />
              Our new *Winter Collection* is live! 💎<br />
              Exclusive 15% off for you today.<br />
              Shop now → glimora.com/new
            </div>
          </div>
          <Btn>Send Broadcast</Btn>
        </Card>
      )}

      {tab === "loyalty" && (
        <Card>
          <h3 style={{ fontFamily: "Playfair Display", fontSize: 20, marginBottom: 20 }}>Loyalty Program</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 20 }}>
            {[{ tier: "Silver", min: "₹0", points: "1x", color: "#9E9E9E" }, { tier: "Gold", min: "₹10,000", points: "2x", color: COLORS.gold }, { tier: "Platinum", min: "₹50,000", points: "3x", color: "#AA76C8" }].map(t => (
              <div key={t.tier} style={{ border: `2px solid ${t.color}`, borderRadius: 14, padding: 20, textAlign: "center" }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>⭐</div>
                <div style={{ fontWeight: 700, fontSize: 16, color: t.color }}>{t.tier}</div>
                <div style={{ color: COLORS.muted, fontSize: 12, marginTop: 4 }}>From {t.min} spend</div>
                <div style={{ fontWeight: 600, marginTop: 8 }}>{t.points} points/₹</div>
              </div>
            ))}
          </div>
          <Input label="Points per ₹100 (Base)" value="10" onChange={() => {}} type="number" />
          <Input label="Redemption Rate (₹ per 100 pts)" value="5" onChange={() => {}} type="number" />
          <Btn>Save Settings</Btn>
        </Card>
      )}

      {tab === "gifts" && (
        <Card>
          <h3 style={{ fontFamily: "Playfair Display", fontSize: 20, marginBottom: 20 }}>Gift Cards</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 20 }}>
            {[500, 1000, 2000, 5000].map(v => (
              <div key={v} style={{ background: `linear-gradient(135deg, ${COLORS.charcoal}, #2C2000)`, borderRadius: 14, padding: 20, color: COLORS.white, textAlign: "center", cursor: "pointer" }}>
                <div style={{ color: COLORS.gold, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Glimora</div>
                <div style={{ fontFamily: "Playfair Display", fontSize: 24, fontWeight: 700 }}>₹{v.toLocaleString()}</div>
                <div style={{ color: "#AAA", fontSize: 11, marginTop: 8 }}>Gift Card</div>
              </div>
            ))}
          </div>
          <Btn>Issue Custom Gift Card</Btn>
        </Card>
      )}
    </div>
  );
};

// ADMIN SETTINGS
const AdminSettings = ({ nav }) => {
  const [tab, setTab] = useState("store");
  const settingsTabs = [{ id: "store", label: "🏪 Store Info" }, { id: "shipping", label: "🚚 Shipping" }, { id: "payments", label: "💳 Payments" }, { id: "staff", label: "👥 Staff & Roles" }, { id: "notifications", label: "🔔 Notifications" }];

  return (
    <div style={{ padding: 28 }}>
      <h2 style={{ fontFamily: "Playfair Display", fontSize: 26, marginBottom: 24 }}>Settings</h2>
      <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 20 }}>
        <Card style={{ padding: 8 }}>
          {settingsTabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 12px", border: "none", background: tab === t.id ? `${COLORS.gold}15` : "transparent", color: tab === t.id ? COLORS.gold : COLORS.text, borderRadius: 8, fontWeight: tab === t.id ? 600 : 400, fontSize: 13, cursor: "pointer", fontFamily: "Inter", marginBottom: 2 }}>{t.label}</button>
          ))}
        </Card>
        <Card>
          {tab === "store" && (
            <div>
              <h3 style={{ fontFamily: "Playfair Display", fontSize: 20, marginBottom: 20 }}>Store Information</h3>
              <Input label="Store Name" value="Glimora Designs" onChange={() => {}} />
              <Input label="Store Email" value="hello@glimora.in" onChange={() => {}} />
              <Input label="Phone" value="+91 98765 43210" onChange={() => {}} />
              <Input label="Address" value="Kochi, Kerala, India" onChange={() => {}} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <Select label="Currency" value="INR (₹)" onChange={() => {}} options={["INR (₹)","USD ($)","EUR (€)"]} />
                <Select label="Timezone" value="Asia/Kolkata (IST)" onChange={() => {}} options={["Asia/Kolkata (IST)"]} />
              </div>
              <Btn>Save Changes</Btn>
            </div>
          )}

          {tab === "shipping" && (
            <div>
              <h3 style={{ fontFamily: "Playfair Display", fontSize: 20, marginBottom: 20 }}>Shipping Settings</h3>
              {[{ label: "Standard Delivery (2-4 days)", price: "₹99", free: "above ₹999" }, { label: "Express Delivery (1-2 days)", price: "₹199", free: "above ₹2,999" }].map(s => (
                <div key={s.label} style={{ border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 16, marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontWeight: 600 }}>{s.label}</div>
                    <div style={{ color: COLORS.muted, fontSize: 12, marginTop: 2 }}>Free {s.free}</div>
                  </div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ fontWeight: 700, color: COLORS.gold }}>{s.price}</span>
                    <Btn size="sm" variant="ghost">Edit</Btn>
                  </div>
                </div>
              ))}
              <Btn variant="secondary">+ Add Shipping Method</Btn>
            </div>
          )}

          {tab === "payments" && (
            <div>
              <h3 style={{ fontFamily: "Playfair Display", fontSize: 20, marginBottom: 20 }}>Payment Methods</h3>
              {[{ name: "UPI", icon: "📱", enabled: true }, { name: "Google Pay", icon: "G", enabled: true }, { name: "Credit / Debit Card", icon: "💳", enabled: true }, { name: "Cash on Delivery", icon: "💵", enabled: true }, { name: "Apple Pay", icon: "🍎", enabled: false }].map(m => (
                <div key={m.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: `1px solid ${COLORS.border}` }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <span style={{ fontSize: 20 }}>{m.icon}</span>
                    <span style={{ fontWeight: 500 }}>{m.name}</span>
                  </div>
                  <div style={{ width: 44, height: 24, borderRadius: 12, background: m.enabled ? COLORS.gold : COLORS.border, position: "relative", cursor: "pointer" }}>
                    <div style={{ width: 18, height: 18, borderRadius: "50%", background: COLORS.white, position: "absolute", top: 3, left: m.enabled ? 23 : 3, transition: "left .2s" }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "staff" && (
            <div>
              <h3 style={{ fontFamily: "Playfair Display", fontSize: 20, marginBottom: 20 }}>Staff & Roles</h3>
              {[{ name: "Divya Nair", role: "Super Admin", email: "divya@glimora.in" }, { name: "Ravi Kumar", role: "Store Manager", email: "ravi@glimora.in" }, { name: "Preethi S.", role: "Customer Support", email: "preethi@glimora.in" }].map(s => (
                <div key={s.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: `1px solid ${COLORS.border}` }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: COLORS.gold, color: COLORS.white, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>{s.name[0]}</div>
                    <div><div style={{ fontWeight: 500 }}>{s.name}</div><div style={{ color: COLORS.muted, fontSize: 12 }}>{s.email}</div></div>
                  </div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <Badge>{s.role}</Badge>
                    <Btn size="sm" variant="ghost">Edit</Btn>
                  </div>
                </div>
              ))}
              <div style={{ marginTop: 16 }}>
                <Btn variant="secondary">+ Invite Staff</Btn>
              </div>
              <div style={{ marginTop: 24 }}>
                <div style={{ fontWeight: 600, marginBottom: 14 }}>Roles & Permissions</div>
                {["Super Admin","Store Manager","Inventory Manager","Customer Support","Marketing Manager"].map(r => (
                  <div key={r} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${COLORS.border}` }}>
                    <span style={{ fontSize: 13 }}>{r}</span>
                    <Btn size="sm" variant="ghost">Manage Permissions</Btn>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "notifications" && (
            <div>
              <h3 style={{ fontFamily: "Playfair Display", fontSize: 20, marginBottom: 20 }}>Notification Settings</h3>
              {[["New Orders", "Get notified when new orders arrive", true], ["Stock Alerts", "When products go below threshold", true], ["Customer Reviews", "New review submitted", true], ["Payment Received", "When payment is confirmed", true], ["Return Requests", "New return or refund request", false]].map(([label, desc, enabled]) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: `1px solid ${COLORS.border}` }}>
                  <div><div style={{ fontWeight: 500, fontSize: 14 }}>{label}</div><div style={{ color: COLORS.muted, fontSize: 12 }}>{desc}</div></div>
                  <div style={{ width: 44, height: 24, borderRadius: 12, background: enabled ? COLORS.gold : COLORS.border, position: "relative", cursor: "pointer" }}>
                    <div style={{ width: 18, height: 18, borderRadius: "50%", background: COLORS.white, position: "absolute", top: 3, left: enabled ? 23 : 3, transition: "left .2s" }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

// ADMIN REPORTS
const AdminReports = ({ nav }) => {
  const reportTypes = [
    { name: "Sales Report", icon: "💰", desc: "Revenue, orders, and sales trends", color: COLORS.gold },
    { name: "Inventory Report", icon: "📦", desc: "Stock levels and movement", color: COLORS.info },
    { name: "Profit Report", icon: "📈", desc: "Profit margins by product", color: COLORS.success },
    { name: "Order Report", icon: "🗂", desc: "Order fulfilment and delivery stats", color: COLORS.warning },
    { name: "Customer Report", icon: "👥", desc: "Customer acquisition and retention", color: "#8E44AD" },
    { name: "Product Performance", icon: "⭐", desc: "Best and worst performing SKUs", color: COLORS.danger },
  ];
  return (
    <div style={{ padding: 28 }}>
      <h2 style={{ fontFamily: "Playfair Display", fontSize: 26, marginBottom: 24 }}>Reports</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginBottom: 28 }}>
        {reportTypes.map(r => (
          <Card key={r.name} style={{ cursor: "pointer", transition: "all .2s" }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = `0 4px 20px ${r.color}20`}
            onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>{r.icon}</div>
            <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 4 }}>{r.name}</div>
            <div style={{ color: COLORS.muted, fontSize: 13, marginBottom: 16 }}>{r.desc}</div>
            <Btn size="sm" style={{ background: r.color }}>Generate Report</Btn>
          </Card>
        ))}
      </div>
      <Card>
        <h3 style={{ fontFamily: "Playfair Display", fontSize: 20, marginBottom: 16 }}>Quick Stats — This Month</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
          {[["Total Sales", "₹3,42,890"], ["Orders Fulfilled", "198"], ["Avg Delivery Time", "2.4 days"], ["Return Rate", "1.8%"]].map(([l, v]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "Playfair Display", fontSize: 24, fontWeight: 700, color: COLORS.gold }}>{v}</div>
              <div style={{ color: COLORS.muted, fontSize: 12, marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

// ============================================================
// NAVIGATION COMPONENTS
// ============================================================
const StorefrontNav = ({ currentPage, nav }) => {
  const navItems = [
    { id: "home", label: "Home" }, { id: "categories", label: "Collections" },
    { id: "gift-builder", label: "Gift Builder" }, { id: "bouquet-builder", label: "Bouquet Builder" },
    { id: "account", label: "Account" },
  ];
  return (
    <nav style={{ background: COLORS.charcoal, padding: "0 60px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, borderBottom: `1px solid ${COLORS.gold}30`, position: "sticky", top: 0, zIndex: 100 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }} onClick={() => nav("home")}>
        <span style={{ fontSize: 22 }}>✦</span>
        <span style={{ fontFamily: "Playfair Display", fontSize: 22, color: COLORS.white, fontWeight: 700 }}>Glimora</span>
        <span style={{ color: COLORS.gold, fontSize: 13, letterSpacing: 2 }}>DESIGNS</span>
      </div>
      <div style={{ display: "flex", gap: 4 }}>
        {navItems.map(item => (
          <button key={item.id} onClick={() => nav(item.id)} style={{ padding: "8px 16px", background: "none", border: "none", color: currentPage === item.id ? COLORS.gold : "#CCC", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "Inter" }}>
            {item.label}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <button onClick={() => nav("cart")} style={{ background: "none", border: "none", color: "#CCC", cursor: "pointer", fontSize: 20 }}>🛒</button>
        <button style={{ background: "none", border: "none", color: "#CCC", cursor: "pointer", fontSize: 20 }}>🔍</button>
        <Btn size="sm" onClick={() => nav("admin")}>Admin ↗</Btn>
      </div>
    </nav>
  );
};

const AdminNav = ({ currentPage, nav }) => {
  const adminItems = [
    { id: "admin", label: "Dashboard", icon: "📊" },
    { id: "admin-products", label: "Products", icon: "💎" },
    { id: "admin-orders", label: "Orders", icon: "📦" },
    { id: "admin-inventory", label: "Inventory", icon: "🏭" },
    { id: "admin-customers", label: "Customers", icon: "👥" },
    { id: "admin-coupons", label: "Coupons", icon: "🏷" },
    { id: "admin-reviews", label: "Reviews", icon: "⭐" },
    { id: "admin-analytics", label: "Analytics", icon: "📈" },
    { id: "admin-marketing", label: "Marketing", icon: "📣" },
    { id: "admin-reports", label: "Reports", icon: "🗂" },
    { id: "admin-settings", label: "Settings", icon: "⚙️" },
  ];

  const newOrders = orders.filter(o => o.status === "Pending").length;

  return (
    <div style={{ width: 220, background: COLORS.charcoal, height: "100vh", position: "fixed", top: 0, left: 0, display: "flex", flexDirection: "column", borderRight: `1px solid ${COLORS.gold}20` }}>
      <div style={{ padding: "24px 20px 20px", borderBottom: `1px solid ${COLORS.gold}20`, cursor: "pointer" }} onClick={() => nav("home")}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 18 }}>✦</span>
          <span style={{ fontFamily: "Playfair Display", fontSize: 18, color: COLORS.white, fontWeight: 700 }}>Glimora</span>
        </div>
        <div style={{ color: COLORS.gold, fontSize: 10, marginTop: 2, letterSpacing: 2 }}>ADMIN PANEL</div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 10px" }}>
        {adminItems.map(item => (
          <button key={item.id} onClick={() => nav(item.id)} style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 12px", border: "none", background: currentPage === item.id ? `${COLORS.gold}20` : "transparent", color: currentPage === item.id ? COLORS.gold : "#AAA", borderRadius: 10, fontWeight: currentPage === item.id ? 600 : 400, fontSize: 13, cursor: "pointer", fontFamily: "Inter", marginBottom: 2, borderLeft: currentPage === item.id ? `3px solid ${COLORS.gold}` : "3px solid transparent", textAlign: "left" }}>
            <span style={{ fontSize: 16 }}>{item.icon}</span>
            <span>{item.label}</span>
            {item.id === "admin-orders" && newOrders > 0 && (
              <span style={{ marginLeft: "auto", background: COLORS.danger, color: COLORS.white, fontSize: 10, fontWeight: 700, padding: "2px 6px", borderRadius: 10 }}>{newOrders}</span>
            )}
          </button>
        ))}
      </div>
      <div style={{ padding: "16px 20px", borderTop: `1px solid ${COLORS.gold}20` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: COLORS.gold, display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.white, fontWeight: 700 }}>D</div>
          <div>
            <div style={{ color: COLORS.white, fontSize: 13, fontWeight: 600 }}>Divya Nair</div>
            <div style={{ color: "#888", fontSize: 11 }}>Super Admin</div>
          </div>
        </div>
        <button onClick={() => nav("home")} style={{ marginTop: 12, width: "100%", padding: "8px", background: "transparent", border: `1px solid ${COLORS.gold}30`, color: "#AAA", borderRadius: 8, fontSize: 12, cursor: "pointer", fontFamily: "Inter" }}>← Back to Store</button>
      </div>
    </div>
  );
};

// ============================================================
// MAIN APP
// ============================================================
export default function App() {
  const [page, setPage] = useState("home");
  const [pageData, setPageData] = useState(null);

  const nav = (p, data = null) => {
    setPage(p);
    setPageData(data);
    window.scrollTo(0, 0);
  };

  const isAdmin = page.startsWith("admin");

  const renderPage = () => {
    switch (page) {
      case "home": return <LandingPage nav={nav} />;
      case "categories": return <CategoriesPage nav={nav} />;
      case "product": return <ProductPage product={pageData || products[0]} nav={nav} />;
      case "cart": return <CartPage nav={nav} />;
      case "checkout": return <CheckoutPage nav={nav} />;
      case "tracking": return <TrackingPage nav={nav} />;
      case "account": return <AccountPage nav={nav} />;
      case "gift-builder": return <GiftBuilderPage nav={nav} />;
      case "bouquet-builder": return <BouquetBuilderPage nav={nav} />;
      case "admin": return <AdminDashboard nav={nav} />;
      case "admin-products": return <AdminProducts nav={nav} />;
      case "admin-orders": return <AdminOrders nav={nav} />;
      case "admin-inventory": return <AdminInventory nav={nav} />;
      case "admin-customers": return <AdminCustomers nav={nav} />;
      case "admin-coupons": return <AdminCoupons nav={nav} />;
      case "admin-reviews": return <AdminReviews nav={nav} />;
      case "admin-analytics": return <AdminAnalytics nav={nav} />;
      case "admin-marketing": return <AdminMarketing nav={nav} />;
      case "admin-reports": return <AdminReports nav={nav} />;
      case "admin-settings": return <AdminSettings nav={nav} />;
      default: return <LandingPage nav={nav} />;
    }
  };

  return (
    <>
      <style>{css}</style>
      {isAdmin ? (
        <div style={{ display: "flex", minHeight: "100vh" }}>
          <AdminNav currentPage={page} nav={nav} />
          <div style={{ marginLeft: 220, flex: 1, background: COLORS.cream, minHeight: "100vh" }}>
            {renderPage()}
          </div>
        </div>
      ) : (
        <div style={{ minHeight: "100vh", background: COLORS.cream }}>
          <StorefrontNav currentPage={page} nav={nav} />
          {renderPage()}
          {/* Footer */}
          <footer style={{ background: COLORS.charcoal, padding: "48px 60px 24px", marginTop: 0 }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 40 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <span style={{ fontSize: 20 }}>✦</span>
                  <span style={{ fontFamily: "Playfair Display", fontSize: 20, color: COLORS.white, fontWeight: 700 }}>Glimora Designs</span>
                </div>
                <p style={{ color: "#888", fontSize: 13, lineHeight: 1.7, maxWidth: 280 }}>Luxury jewellery and unique gift experiences crafted with love. Making every moment sparkle.</p>
                <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
                  {["📸","💙","🐦","📌"].map(s => <span key={s} style={{ fontSize: 20, cursor: "pointer" }}>{s}</span>)}
                </div>
              </div>
              {[{ title: "Collections", links: ["Necklaces","Earrings","Bracelets","Rings","Watches"] }, { title: "Quick Links", links: ["Gift Builder","Bouquet Builder","Occasions","Blog","FAQ"] }, { title: "Support", links: ["Track Order","Returns","Shipping Info","Contact Us","WhatsApp"] }].map(col => (
                <div key={col.title}>
                  <div style={{ color: COLORS.gold, fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>{col.title}</div>
                  {col.links.map(l => <div key={l} style={{ color: "#888", fontSize: 13, marginBottom: 8, cursor: "pointer" }}>{l}</div>)}
                </div>
              ))}
            </div>
            <div style={{ borderTop: `1px solid ${COLORS.gold}20`, paddingTop: 20, display: "flex", justifyContent: "space-between", color: "#666", fontSize: 12 }}>
              <span>© 2024 Glimora Designs. All rights reserved.</span>
              <span>Designed with ♥ for luxury</span>
            </div>
          </footer>
        </div>
      )}
    </>
  );
}
