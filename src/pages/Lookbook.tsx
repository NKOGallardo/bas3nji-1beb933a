import { motion } from "framer-motion";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { useDocumentHead } from "@/hooks/use-document-head";
import hero from "@/assets/pic8.jpg";
import look1 from "@/assets/pic9.jpg";
import look2 from "@/assets/pic10.jpg";
import look3 from "@/assets/pic11.jpg";
import story from "@/assets/pic12.jpg";

const SHOTS = [
  { src: hero, cls: "lb-1", title: "The Hood", num: "01" },
  { src: look1, cls: "lb-2", title: "Bomber", num: "02" },
  { src: look2, cls: "lb-3", title: "Blood Detail", num: "03" },
  { src: story, cls: "lb-4", title: "Portrait", num: "04" },
  { src: look3, cls: "lb-5", title: "Coat, Walking Away", num: "05" },
];

export default function Lookbook() {
  useDocumentHead({
    title: "Lookbook — BAS3NJI WORLD",
    description: "The Noir 01 campaign. Editorial imagery from BAS3NJI WORLD.",
  });
  return (
    <div className="min-h-app">
      <Nav />
      <section className="pagehead">
        <div className="pagehead__inner">
          <div className="eyebrow" style={{ marginBottom: "1.5rem" }}>Campaign · Noir 01</div>
          <h1 className="pagehead__title">Lookbook</h1>
          <p className="pagehead__body">Shot in shadow. Cut for the confident. This is the world.</p>
        </div>
      </section>

      <section style={{ padding: "0 var(--pad-x) 8rem" }}>
        <div className="section__inner lookbook__grid">
          {SHOTS.map((s, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className={`lb__fig ${s.cls}`}
            >
              <img src={s.src} alt={s.title} loading="lazy" />
              <figcaption className="lb__cap">
                <span className="text-blood">{s.num}</span>
                <span className="lb__cap-rule" />
                <span>{s.title}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
