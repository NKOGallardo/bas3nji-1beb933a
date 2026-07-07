import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight, Instagram } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Logo } from "@/components/Logo";
import { TiltedJ3D } from "@/components/TiltedJ3D";
import { ProductCard, type Product } from "@/components/ProductCard";
import { whatsappGeneralUrl, whatsappOrderUrl } from "@/lib/whatsapp";
import { useDocumentHead } from "@/hooks/use-document-head";

import hero from "@/assets/hero.jpg";
import look1 from "@/assets/look-1.jpg";
import look2 from "@/assets/look-2.jpg";
import look3 from "@/assets/look-3.jpg";
import prod1 from "@/assets/product-1.jpg";
import prod2 from "@/assets/product-2.jpg";
import prod3 from "@/assets/product-3.jpg";
import story from "@/assets/story.jpg";

const FEATURED: Product[] = [
  { id: "p1", name: "Signature Tee — Blood Mark", price: "$120", category: "Essentials", image: prod1 },
  { id: "p2", name: "Noir Cap & Accessories", price: "$85", category: "Accessories", image: prod2 },
  { id: "p3", name: "Aurelian Low — Blood Sole", price: "$340", category: "Footwear", image: prod3 },
];

export default function Home() {
  useDocumentHead({
    title: "BAS3NJI WORLD — Luxury Streetwear",
    description: "Enter BAS3NJI WORLD. Cut in black, white and blood red — luxury streetwear for the confident, the exclusive, the unafraid.",
  });
  return (
    <div className="min-h-app">
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

function Hero() {
  return (
    <section className="hero">
      <img src={hero} alt="BAS3NJI WORLD signature look" className="hero__bg" />
      <div className="hero__scrim" />
      <TiltedJ3D />
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="hero__meta"
      >
        <span>Vol. 01 — Autumn / Winter 26</span>
        <span>Collection · Noir</span>
      </motion.div>
      <div className="hero__center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <Logo size="hero" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="hero__tag"
        >
          A luxury streetwear house — <span className="text-blood">confidence</span>, exclusivity, and modern street culture.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="hero__ctas"
        >
          <a href={whatsappGeneralUrl("Hello BAS3NJI WORLD, I want to shop the new drop.")} target="_blank" rel="noreferrer" className="btn btn--primary">
            Shop the Drop <ArrowUpRight className="icon" />
          </a>
          <Link to="/lookbook" className="btn btn--ghost">
            View Lookbook <ArrowRight className="icon" />
          </Link>
        </motion.div>
      </div>
      <div className="hero__scroll">
        Scroll
        <span className="hero__scroll-line" />
      </div>
    </section>
  );
}

function Marquee() {
  const items = ["Luxury", "· Exclusive ·", "Made for the confident", "· Blood Red ·", "Since 2026", "· BAS3NJI World ·"];
  const all = [...items, ...items, ...items];
  return (
    <div className="marquee">
      <div className="marquee__track">
        {all.map((t, i) => (
          <span key={i} className="marquee__item">{t}</span>
        ))}
      </div>
    </div>
  );
}

function FeaturedCollection() {
  return (
    <section className="section">
      <div className="section__inner fc__grid">
        <div>
          <div className="eyebrow" style={{ marginBottom: "1.5rem" }}>Featured Collection</div>
          <h2 className="fc__title">Noir<br />Volume 01</h2>
          <p className="fc__body">
            Twelve pieces cut for the shadow economy of style — heavyweight cotton, obsessive tailoring, and the quiet flash of blood-red detail.
          </p>
          <Link to="/collections" className="btn btn--outline" style={{ marginTop: "2.5rem", padding: "0.75rem 1.5rem" }}>
            Explore the collection <ArrowRight className="icon" />
          </Link>
        </div>
        <div className="fc__images">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="fc__img-wrap fc__img-wrap--offset">
            <img src={look1} alt="Noir look 01" loading="lazy" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }} className="fc__img-wrap">
            <img src={look2} alt="Noir look 02" loading="lazy" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function BrandStory() {
  return (
    <section className="section section--bordered">
      <div className="section__inner story__grid">
        <div className="story__img">
          <img src={story} alt="BAS3NJI World portrait" loading="lazy" />
        </div>
        <div>
          <div className="eyebrow" style={{ marginBottom: "1.5rem" }}>The World</div>
          <h2 className="story__title">A house built on<br />quiet confidence.</h2>
          <div className="story__body">
            <p>BAS3NJI WORLD is a luxury streetwear house founded on the belief that presence is louder than logos. We build heirloom-grade garments cut with the discipline of couture and the swagger of the street.</p>
            <p>Every drop is small. Every stitch is intentional. Every piece is made to be worn — hard, everywhere, forever.</p>
          </div>
          <Link to="/about" className="btn btn--outline" style={{ marginTop: "2.5rem", padding: "0.75rem 1.5rem" }}>
            Read the story <ArrowRight className="icon" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function LookbookPreview() {
  const shots = [look1, look2, look3, story];
  return (
    <section className="section section--bordered">
      <div className="section__inner">
        <div className="lp__head">
          <div>
            <div className="eyebrow">Editorial</div>
            <h2 className="fc__title" style={{ fontSize: "clamp(2.25rem, 6vw, 4.5rem)" }}>Lookbook</h2>
          </div>
          <Link to="/lookbook" className="btn btn--outline" style={{ padding: "0.75rem 1.5rem" }}>
            View all <ArrowRight className="icon" />
          </Link>
        </div>
        <div className="lp__grid">
          {shots.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className={`lp__tile ${i % 2 === 1 ? "lp__tile--offset" : ""}`}
            >
              <img src={src} alt={`Look ${i + 1}`} loading="lazy" />
              <div className="lp__label">Look 0{i + 1}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedProducts() {
  return (
    <section className="section section--bordered">
      <div className="section__inner">
        <div className="fp__head">
          <div>
            <div className="eyebrow">Available Now</div>
            <h2 className="fc__title" style={{ fontSize: "clamp(2.25rem, 6vw, 4.5rem)" }}>Selected Pieces</h2>
          </div>
          <a href={whatsappGeneralUrl()} target="_blank" rel="noreferrer" className="link-underline" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "var(--tracking-luxe)", color: "rgba(255,255,255,0.7)", display: "inline-flex", alignItems: "center", gap: "0.75rem" }}>
            Full catalogue via WhatsApp <ArrowUpRight className="icon" />
          </a>
        </div>
        <div className="fp__grid">
          {FEATURED.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}

function InstagramPreview() {
  const tiles = [look1, prod1, look2, prod2, look3, prod3];
  return (
    <section className="section section--bordered">
      <div className="section__inner">
        <div className="ig__head">
          <div>
            <div className="eyebrow">On the feed</div>
            <h2 className="fc__title" style={{ fontSize: "clamp(1.875rem, 5vw, 3rem)" }}>@bas3nji.world</h2>
          </div>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="btn btn--outline" style={{ padding: "0.625rem 1.25rem" }}>
            <Instagram className="icon" /> Follow
          </a>
        </div>
        <div className="ig__grid">
          {tiles.map((src, i) => (
            <a key={i} href="https://instagram.com" target="_blank" rel="noreferrer" className="ig__tile">
              <img src={src} alt="" loading="lazy" />
              <div className="ig__tile-fill" />
              <Instagram className="ig__tile-icon" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function BigCTA() {
  return (
    <section className="cta grain">
      <div className="cta__inner">
        <div className="cta__eyebrow">Enter the world</div>
        <h2 className="cta__title">Wear the<br />confidence.</h2>
        <p className="cta__body">
          Every order is personal. Message us on WhatsApp — we'll walk you through sizing, availability, and shipping.
        </p>
        <a href={whatsappOrderUrl({ note: "I'd like to explore the current drop." })} target="_blank" rel="noreferrer" className="btn btn--dark" style={{ marginTop: "3rem" }}>
          Start on WhatsApp <ArrowUpRight className="icon-md" />
        </a>
      </div>
    </section>
  );
}
