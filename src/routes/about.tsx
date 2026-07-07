import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import story from "@/assets/story.jpg";
import look3 from "@/assets/look-3.jpg";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "The World — BAS3NJI WORLD" },
      { name: "description", content: "The story behind BAS3NJI WORLD — a luxury streetwear house built on quiet confidence." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="min-h-app bg-black text-white">
      <Nav />

      {/* Editorial hero */}
      <section className="relative min-h-[80vh] flex items-end overflow-hidden">
        <img src={story} alt="" className="absolute inset-0 h-full w-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
        <div className="relative z-10 px-5 md:px-10 pb-16 md:pb-24 max-w-[1600px] mx-auto w-full">
          <div className="text-[10px] uppercase tracking-luxe text-blood mb-6">The World</div>
          <h1 className="font-display text-5xl md:text-8xl lg:text-9xl leading-[0.9] tracking-brand max-w-4xl">
            Presence is louder <br /> than logos.
          </h1>
        </div>
      </section>

      {/* Manifesto */}
      <section className="px-5 md:px-10 py-32">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8 text-base md:text-lg text-white/80 leading-relaxed"
          >
            <p>
              <span className="text-blood">BAS3NJI WORLD</span> is a luxury streetwear house. We build small, obsessive collections for people who don't need to shout.
            </p>
            <p>
              Our garments are cut with the discipline of couture and worn with the swagger of the street. Heavyweight cottons. Obsessive tailoring. The quiet flash of blood-red detail — a signature the wearer feels before anyone else notices.
            </p>
            <p>
              Every drop is numbered. Nothing is restocked. We would rather sell out than settle.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values grid */}
      <section className="px-5 md:px-10 py-32 border-t border-white/5">
        <div className="mx-auto max-w-[1600px] grid md:grid-cols-4 gap-10">
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
              <div className="text-blood text-xs tracking-luxe">{v.n}</div>
              <div className="mt-3 font-display text-2xl tracking-brand">{v.t}</div>
              <p className="mt-3 text-sm text-white/60 leading-relaxed">{v.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Big signature */}
      <section className="relative py-32 md:py-48 px-5 md:px-10 border-t border-white/5 overflow-hidden">
        <img src={look3} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="relative text-center">
          <Logo size="hero" className="text-white" showWorld />
          <p className="mt-8 text-[10px] uppercase tracking-luxe text-white/50">Est. 2026 · Made in shadow · Worn in light</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
