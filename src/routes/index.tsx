import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight, Instagram } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Logo } from "@/components/Logo";
import { TiltedJ3D } from "@/components/TiltedJ3D";
import { ProductCard, type Product } from "@/components/ProductCard";
import { whatsappGeneralUrl, whatsappOrderUrl } from "@/lib/whatsapp";

import hero from "@/assets/hero.jpg";
import look1 from "@/assets/look-1.jpg";
import look2 from "@/assets/look-2.jpg";
import look3 from "@/assets/look-3.jpg";
import prod1 from "@/assets/product-1.jpg";
import prod2 from "@/assets/product-2.jpg";
import prod3 from "@/assets/product-3.jpg";
import story from "@/assets/story.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BAS3NJI WORLD — Luxury Streetwear" },
      { name: "description", content: "Enter BAS3NJI WORLD. Cut in black, white and blood red — luxury streetwear for the confident, the exclusive, the unafraid." },
      { property: "og:image", content: "https://id-preview--15b913fd-c39c-4952-a189-581eb2c440a8.lovable.app/og.jpg" },
    ],
  }),
  component: Home,
});

const FEATURED: Product[] = [
  { id: "p1", name: "Signature Tee — Blood Mark", price: "$120", category: "Essentials", image: prod1 },
  { id: "p2", name: "Noir Cap & Accessories", price: "$85", category: "Accessories", image: prod2 },
  { id: "p3", name: "Aurelian Low — Blood Sole", price: "$340", category: "Footwear", image: prod3 },
];

function Home() {
  return (
    <div className="min-h-app bg-black text-white overflow-x-hidden">
      <Nav />
      <Hero />
      <Marquee />
      <FeaturedCollection />
      <BrandStory />
      <LookbookPreview />
      <FeaturedProducts />
      <InstagramPreview />
      <BigCTA />
      <Footer />
    </div>
  );
}

/* ---------------- Hero ---------------- */
function Hero() {
  return (
    <section className="relative min-h-app w-full overflow-hidden">
      <img
        src={hero}
        alt="BAS3NJI WORLD signature look — model in all black"
        width={1600}
        height={1920}
        className="absolute inset-0 h-full w-full object-cover object-center opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black" />
      <TiltedJ3D />

      {/* Top meta strip */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="absolute inset-x-0 top-24 md:top-28 z-10 flex justify-between px-5 md:px-10 text-[10px] uppercase tracking-luxe text-white/60"
      >
        <span>Vol. 01 — Autumn / Winter 26</span>
        <span className="hidden md:inline">Collection · Noir</span>
      </motion.div>

      {/* Center wordmark */}
      <div className="relative z-10 flex min-h-app flex-col items-center justify-center px-5 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <Logo size="hero" className="text-white drop-shadow-[0_20px_60px_rgba(0,0,0,0.5)]" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="mt-8 max-w-md text-xs md:text-sm uppercase tracking-luxe text-white/70"
        >
          A luxury streetwear house — <span className="text-blood">confidence</span>, exclusivity, and modern street culture.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href={whatsappGeneralUrl("Hello BAS3NJI WORLD, I want to shop the new drop.")}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 border border-blood bg-blood px-8 py-4 text-[10px] font-semibold uppercase tracking-luxe text-white transition-transform hover:-translate-y-0.5"
          >
            Shop the Drop
            <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <Link
            to="/lookbook"
            className="group inline-flex items-center gap-3 border border-white/30 px-8 py-4 text-[10px] font-semibold uppercase tracking-luxe text-white transition-colors hover:border-white hover:bg-white hover:text-black"
          >
            View Lookbook
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-[9px] uppercase tracking-luxe text-white/40"
      >
        <div className="flex flex-col items-center gap-2">
          <span>Scroll</span>
          <span className="block h-8 w-px bg-white/30 animate-pulse" />
        </div>
      </motion.div>
    </section>
  );
}

/* ---------------- Marquee ---------------- */
function Marquee() {
  const items = ["Luxury", "· Exclusive ·", "Made for the confident", "· Blood Red ·", "Since 2026", "· BAS3NJI World ·"];
  return (
    <div className="border-y border-white/10 bg-black py-6 overflow-hidden">
      <div className="flex animate-[marquee_28s_linear_infinite] gap-16 whitespace-nowrap">
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i} className="font-display text-2xl tracking-brand text-white/80 flex items-center gap-16">
            {t}
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-33.333%); } }`}</style>
    </div>
  );
}

/* ---------------- Featured collection ---------------- */
function FeaturedCollection() {
  return (
    <section className="relative bg-black text-white py-32 md:py-48 px-5 md:px-10">
      <div className="mx-auto max-w-[1600px] grid md:grid-cols-12 gap-10 items-end">
        <div className="md:col-span-5">
          <div className="text-[10px] uppercase tracking-luxe text-blood mb-6">Featured Collection</div>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-brand">
            Noir <br /> Volume 01
          </h2>
          <p className="mt-8 max-w-md text-sm text-white/70 leading-relaxed">
            Twelve pieces cut for the shadow economy of style — heavyweight cotton, obsessive tailoring, and the quiet flash of blood-red detail.
          </p>
          <Link
            to="/collections"
            className="mt-10 inline-flex items-center gap-3 border-b border-white/30 pb-1 text-[11px] uppercase tracking-luxe text-white hover:border-blood hover:text-blood transition-colors"
          >
            Explore the collection <ArrowRight className="size-3.5" />
          </Link>
        </div>

        <div className="md:col-span-7 grid grid-cols-2 gap-3 md:gap-5">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[3/4] overflow-hidden translate-y-8"
          >
            <img src={look1} alt="Noir look 01" loading="lazy" className="h-full w-full object-cover transition-transform duration-[1200ms] hover:scale-105" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[3/4] overflow-hidden"
          >
            <img src={look2} alt="Noir look 02 — blood detail" loading="lazy" className="h-full w-full object-cover transition-transform duration-[1200ms] hover:scale-105" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Brand story ---------------- */
function BrandStory() {
  return (
    <section className="relative bg-black py-32 md:py-48 px-5 md:px-10 border-t border-white/5">
      <div className="mx-auto max-w-[1600px] grid md:grid-cols-2 gap-16 items-center">
        <div className="relative aspect-[4/5] overflow-hidden">
          <img src={story} alt="BAS3NJI World — portrait" loading="lazy" className="h-full w-full object-cover" />
          <div className="absolute inset-0 border border-white/10" />
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-luxe text-blood mb-6">The World</div>
          <h2 className="font-display text-4xl md:text-6xl leading-[0.95] tracking-brand mb-8">
            A house built on <br /> quiet confidence.
          </h2>
          <div className="space-y-5 text-sm md:text-base text-white/70 leading-relaxed max-w-lg">
            <p>
              BAS3NJI WORLD is a luxury streetwear house founded on the belief that presence is louder than logos. We build heirloom-grade garments cut with the discipline of couture and the swagger of the street.
            </p>
            <p>
              Every drop is small. Every stitch is intentional. Every piece is made to be worn — hard, everywhere, forever.
            </p>
          </div>
          <Link
            to="/about"
            className="mt-10 inline-flex items-center gap-3 border border-white/30 px-6 py-3 text-[10px] uppercase tracking-luxe text-white hover:border-blood hover:text-blood transition-colors"
          >
            Read our story <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Lookbook preview ---------------- */
function LookbookPreview() {
  const shots = [look3, look1, look2, hero];
  return (
    <section className="relative bg-black py-32 md:py-48 px-5 md:px-10 border-t border-white/5">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex items-end justify-between gap-6 mb-16">
          <div>
            <div className="text-[10px] uppercase tracking-luxe text-blood mb-4">Campaign</div>
            <h2 className="font-display text-4xl md:text-6xl tracking-brand">Lookbook — Noir 01</h2>
          </div>
          <Link to="/lookbook" className="hidden md:inline-flex items-center gap-3 text-[11px] uppercase tracking-luxe text-white/70 hover:text-blood transition-colors">
            All looks <ArrowRight className="size-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {shots.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`relative aspect-[3/4] overflow-hidden ${i % 2 === 1 ? "md:translate-y-12" : ""}`}
            >
              <img src={src} alt={`Look ${i + 1}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1200ms] hover:scale-105" />
              <div className="absolute bottom-3 left-3 text-[9px] uppercase tracking-luxe text-white/80">Look 0{i + 1}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Featured products ---------------- */
function FeaturedProducts() {
  return (
    <section className="relative bg-black py-32 md:py-48 px-5 md:px-10 border-t border-white/5">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex items-end justify-between gap-6 mb-16">
          <div>
            <div className="text-[10px] uppercase tracking-luxe text-blood mb-4">Available Now</div>
            <h2 className="font-display text-4xl md:text-6xl tracking-brand">Selected Pieces</h2>
          </div>
          <a
            href={whatsappGeneralUrl()}
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline-flex items-center gap-3 text-[11px] uppercase tracking-luxe text-white/70 hover:text-blood transition-colors"
          >
            Full catalogue via WhatsApp <ArrowUpRight className="size-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          {FEATURED.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Instagram preview ---------------- */
function InstagramPreview() {
  const tiles = [look1, prod1, look2, prod2, look3, prod3];
  return (
    <section className="relative bg-black py-32 md:py-40 px-5 md:px-10 border-t border-white/5">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-[10px] uppercase tracking-luxe text-blood mb-4">On the feed</div>
            <h2 className="font-display text-3xl md:text-5xl tracking-brand">@bas3nji.world</h2>
          </div>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-white/30 px-5 py-2.5 text-[10px] uppercase tracking-luxe text-white hover:border-blood hover:text-blood transition-colors">
            <Instagram className="size-3.5" /> Follow
          </a>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-1 md:gap-2">
          {tiles.map((src, i) => (
            <a
              key={i}
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="group relative aspect-square overflow-hidden"
            >
              <img src={src} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-blood/0 transition-colors duration-500 group-hover:bg-blood/40" />
              <Instagram className="absolute inset-0 m-auto size-6 text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Big CTA ---------------- */
function BigCTA() {
  return (
    <section className="relative bg-blood py-32 md:py-48 px-5 md:px-10 overflow-hidden">
      <div className="absolute inset-0 grain" />
      <div className="relative mx-auto max-w-[1400px] text-center">
        <div className="text-[10px] uppercase tracking-luxe text-white/70 mb-8">Enter the world</div>
        <h2 className="font-display text-5xl md:text-8xl lg:text-9xl leading-[0.9] tracking-brand text-white">
          Wear the <br /> confidence.
        </h2>
        <p className="mt-8 mx-auto max-w-lg text-sm text-white/80 leading-relaxed">
          Every order is personal. Message us on WhatsApp — we'll walk you through sizing, availability, and shipping.
        </p>
        <a
          href={whatsappOrderUrl({ note: "I'd like to explore the current drop." })}
          target="_blank"
          rel="noreferrer"
          className="mt-12 inline-flex items-center gap-3 border border-white bg-black px-10 py-5 text-[10px] font-semibold uppercase tracking-luxe text-white transition-transform hover:-translate-y-0.5"
        >
          Start on WhatsApp <ArrowUpRight className="size-4" />
        </a>
      </div>
    </section>
  );
}
