import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { whatsappGeneralUrl } from "@/lib/whatsapp";
import look1 from "@/assets/look-1.jpg";
import look2 from "@/assets/look-2.jpg";
import look3 from "@/assets/look-3.jpg";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "Collections — BAS3NJI WORLD" },
      { name: "description", content: "Every BAS3NJI WORLD collection — small drops, obsessive tailoring, cinematic composition." },
    ],
  }),
  component: Collections,
});

const COLLECTIONS = [
  { id: "noir", name: "Noir — Vol. 01", season: "AW26", pieces: 12, image: hero, active: true },
  { id: "silence", name: "Silence — Vol. 02", season: "SS27", pieces: 8, image: look1, active: false },
  { id: "blood", name: "Blood Rite", season: "Capsule", pieces: 4, image: look2, active: false },
  { id: "monolith", name: "Monolith", season: "FW27", pieces: 10, image: look3, active: false },
];

function Collections() {
  return (
    <div className="min-h-app bg-black text-white">
      <Nav />
      <section className="pt-40 pb-24 px-5 md:px-10 border-b border-white/5">
        <div className="mx-auto max-w-[1600px]">
          <div className="text-[10px] uppercase tracking-luxe text-blood mb-6">Archive</div>
          <h1 className="font-display text-6xl md:text-9xl leading-[0.9] tracking-brand">Collections</h1>
          <p className="mt-8 max-w-xl text-sm md:text-base text-white/70 leading-relaxed">
            Each collection is a chapter. Small runs. Numbered. Never restocked. When it's gone, it lives only in the archive — and on the people who moved fast enough.
          </p>
        </div>
      </section>

      <section className="px-5 md:px-10 py-24">
        <div className="mx-auto max-w-[1600px] grid gap-16">
          {COLLECTIONS.map((c, i) => (
            <motion.article
              key={c.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className={`grid md:grid-cols-12 gap-8 items-center ${i % 2 === 1 ? "md:[direction:rtl]" : ""}`}
            >
              <div className="md:col-span-7 relative aspect-[4/3] overflow-hidden group [direction:ltr]">
                <img src={c.image} alt={c.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
              </div>
              <div className="md:col-span-5 [direction:ltr]">
                <div className="flex items-center gap-3 text-[10px] uppercase tracking-luxe">
                  <span className="text-white/40">{c.season}</span>
                  <span className="h-px w-8 bg-white/20" />
                  <span className="text-white/40">{c.pieces} pieces</span>
                  {c.active && <span className="px-2 py-0.5 border border-blood text-blood">Live</span>}
                </div>
                <h2 className="mt-4 font-display text-4xl md:text-6xl tracking-brand">{c.name}</h2>
                <p className="mt-4 max-w-md text-sm text-white/70 leading-relaxed">
                  {c.active
                    ? "The current volume. Available now — order via WhatsApp for size and shipping confirmation."
                    : "Sold out at retail. Select pieces may still be sourced by request."}
                </p>
                <a
                  href={whatsappGeneralUrl(`Hello BAS3NJI WORLD, I'm interested in ${c.name}.`)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex items-center gap-3 border border-white/30 px-6 py-3 text-[10px] uppercase tracking-luxe text-white hover:border-blood hover:text-blood transition-colors"
                >
                  {c.active ? "Shop via WhatsApp" : "Request availability"}
                  <ArrowUpRight className="size-3.5" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-32 text-center">
          <Link to="/lookbook" className="inline-flex items-center gap-3 text-xs uppercase tracking-luxe text-white/60 hover:text-blood">
            See the lookbook <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
