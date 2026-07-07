import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import hero from "@/assets/hero.jpg";
import look1 from "@/assets/look-1.jpg";
import look2 from "@/assets/look-2.jpg";
import look3 from "@/assets/look-3.jpg";
import story from "@/assets/story.jpg";

export const Route = createFileRoute("/lookbook")({
  head: () => ({
    meta: [
      { title: "Lookbook — BAS3NJI WORLD" },
      { name: "description", content: "The Noir 01 campaign. Editorial imagery from BAS3NJI WORLD." },
    ],
  }),
  component: Lookbook,
});

type Shot = { src: string; span: string; title: string; num: string };

const SHOTS: Shot[] = [
  { src: hero,  span: "md:col-span-8 md:row-span-2 aspect-[4/5] md:aspect-auto", title: "The Hood",   num: "01" },
  { src: look1, span: "md:col-span-4 aspect-[3/4]", title: "Bomber", num: "02" },
  { src: look2, span: "md:col-span-4 aspect-[3/4]", title: "Blood Detail", num: "03" },
  { src: story, span: "md:col-span-6 aspect-[4/5]", title: "Portrait", num: "04" },
  { src: look3, span: "md:col-span-6 aspect-[4/5]", title: "Coat, Walking Away", num: "05" },
];

function Lookbook() {
  return (
    <div className="min-h-app bg-black text-white">
      <Nav />

      <section className="pt-40 pb-16 px-5 md:px-10">
        <div className="mx-auto max-w-[1600px]">
          <div className="text-[10px] uppercase tracking-luxe text-blood mb-6">Campaign · Noir 01</div>
          <h1 className="font-display text-6xl md:text-9xl leading-[0.9] tracking-brand">Lookbook</h1>
          <p className="mt-8 max-w-xl text-sm md:text-base text-white/70">
            Shot in shadow. Cut for the confident. This is the world.
          </p>
        </div>
      </section>

      <section className="px-5 md:px-10 pb-32">
        <div className="mx-auto max-w-[1600px] grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-5 auto-rows-min">
          {SHOTS.map((s, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className={`relative overflow-hidden group ${s.span}`}
            >
              <img src={s.src} alt={s.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-105" />
              <figcaption className="absolute bottom-4 left-4 flex items-center gap-3 text-[10px] uppercase tracking-luxe text-white">
                <span className="text-blood">{s.num}</span>
                <span className="h-px w-6 bg-white/50" />
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
