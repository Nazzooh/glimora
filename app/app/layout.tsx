import type { Metadata } from "next";
import { Playfair_Display, Inter, Geist } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Glimora — Luxury Jewellery & Gifts",
    template: "%s | Glimora",
  },
  description:
    "Curating moments of luxury through exquisite jewellery, bespoke gift boxes, and jewel bouquets. Discover timeless pieces crafted for life's finest celebrations.",
  keywords: [
    "luxury jewellery",
    "gift boxes",
    "jewel bouquets",
    "premium accessories",
    "Glimora",
  ],
  openGraph: {
    title: "Glimora — Luxury Jewellery & Gifts",
    description:
      "Curating moments of luxury through exquisite jewellery, bespoke gift boxes, and jewel bouquets.",
    siteName: "Glimora",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", playfair.variable, inter.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
