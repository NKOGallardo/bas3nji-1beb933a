import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { whatsappGeneralUrl } from "@/lib/whatsapp";
import { useDocumentHead } from "@/hooks/use-document-head";
import look1 from "@/assets/pic3.jpg";
import look2 from "@/assets/pic6.jpg";
import look3 from "@/assets/pic7.jpg";
import hero from "@/assets/pic4.jpg";

const COLLECTIONS = [
  { id: "noir", name: "Noir — Vol. 01", season: "AW26", pieces: 12, image: hero, active: true },
  { id: "silence", name: "Silence — Vol. 02", season: "SS27", pieces: 8, image: look1, active: false },
  { id: "blood", name: "Blood Rite", season: "Capsule", pieces: 4, image: look2, active: false },
  { id: "monolith", name: "Monolith", season: "FW27", pieces: 10, image: look3, active: false },
];

export default function Collections() {
  useDocumentHead({
    title: "Collections — BAS3NJI WORLD",
    description: "Every BAS3NJI WORLD collection — small drops, obsessive tailoring, cinematic composition.",
  });
  return (
    <div className="min-h-app">
      <Nav />
      <section className="pagehead pagehead--bordered">
        <div className="pagehead__inner">
          <div className="eyebrow" style={{ marginBottom: "1.5rem" }}>Archive</div>
          <h1 className="pagehead__title">Collections</h1>
          <p className="pagehead__body">
            Each collection is a chapter. Small runs. Numbered. Never restocked. When it's gone, it lives only in the archive — and on the people who moved fast enough.
          </p>
        </div>
      </section>

      <section className="section" style={{ padding: "6rem var(--pad-x)" }}>
        <div className="section__inner col-list">
          {COLLECTIONS.map((c, i) => (
            <motion.article
              key={c.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9 }}
              className={`col-item ${i % 2 === 1 ? "col-item--rev" : ""}`}
            >
              <div className="col-item__media">
                <img src={c.image} alt={c.name} loading="lazy" />
              </div>
              <div>
                <div className="col-item__tags">
                  <span>{c.season}</span>
                  <span className="col-item__rule" />
                  <span>{c.pieces} pieces</span>
                  {c.active && <span className="col-item__badge">Live</span>}
                </div>
                <h2 className="col-item__title">{c.name}</h2>
                <p className="col-item__body">
                  {c.active
                    ? "The current volume. Available now — order via WhatsApp for size and shipping confirmation."
                    : "Sold out at retail. Select pieces may still be sourced by request."}
                </p>
                <a
                  href={whatsappGeneralUrl(`Hello BAS3NJI WORLD, I'm interested in ${c.name}.`)}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn--outline"
                  style={{ marginTop: "2rem", padding: "0.75rem 1.5rem" }}
                >
                  {c.active ? "Shop via WhatsApp" : "Request availability"} <ArrowUpRight className="icon" />
                </a>
              </div>
            </motion.article>
          ))}
          <div style={{ textAlign: "center", marginTop: "4rem" }}>
            <Link to="/lookbook" className="link-underline" style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "var(--tracking-luxe)", color: "rgba(255,255,255,0.6)" }}>
              See the lookbook <ArrowRight className="icon" style={{ display: "inline", verticalAlign: "middle", marginLeft: 8 }} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
