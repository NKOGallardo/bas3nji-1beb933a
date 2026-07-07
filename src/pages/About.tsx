import { motion } from "framer-motion";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Logo } from "@/components/Logo";
import { useDocumentHead } from "@/hooks/use-document-head";
import story from "@/assets/story.jpg";
import look3 from "@/assets/look-3.jpg";

export default function About() {
  useDocumentHead({
    title: "The World — BAS3NJI WORLD",
    description: "The story behind BAS3NJI WORLD — a luxury streetwear house built on quiet confidence.",
  });
  return (
    <div className="min-h-app">
      <Nav />

      <section className="about-hero">
        <img src={story} alt="" className="about-hero__img" />
        <div className="about-hero__scrim" />
        <div className="about-hero__inner">
          <div className="eyebrow" style={{ marginBottom: "1.5rem" }}>The World</div>
          <h1 className="about-hero__title">Presence is louder<br />than logos.</h1>
        </div>
      </section>

      <section className="section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="about-manifesto"
        >
          <p><span className="text-blood">BAS3NJI WORLD</span> is a luxury streetwear house. We build small, obsessive collections for people who don't need to shout.</p>
          <p>Our garments are cut with the discipline of couture and worn with the swagger of the street. Heavyweight cottons. Obsessive tailoring. The quiet flash of blood-red detail — a signature the wearer feels before anyone else notices.</p>
          <p>Every drop is numbered. Nothing is restocked. We would rather sell out than settle.</p>
        </motion.div>
      </section>

      <section className="section section--bordered">
        <div className="about-values">
          {[
            { n: "01", t: "Luxury", d: "Heirloom-grade materials, sourced without compromise." },
            { n: "02", t: "Exclusivity", d: "Small runs. Numbered. Once it's gone, it's gone." },
            { n: "03", t: "Confidence", d: "Cuts that carry themselves. No logos required." },
            { n: "04", t: "Culture", d: "Rooted in street. Elevated for the world." },
          ].map((v, i) => (
            <motion.div
              key={v.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
            >
              <div className="about-value__num">{v.n}</div>
              <div className="about-value__title">{v.t}</div>
              <p className="about-value__body">{v.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="about-signature">
        <img src={look3} alt="" className="about-signature__img" />
        <div className="about-signature__inner">
          <Logo size="hero" showWorld />
          <p className="about-signature__meta">Est. 2026 · Made in shadow · Worn in light</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
