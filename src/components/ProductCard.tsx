import { motion } from "framer-motion";
import { whatsappOrderUrl } from "@/lib/whatsapp";
import { ArrowUpRight } from "lucide-react";

export interface Product {
  id: string;
  name: string;
  price: string;
  category: string;
  image: string;
}

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-white/[0.03]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <a
          href={whatsappOrderUrl({ product: product.name, price: product.price })}
          target="_blank"
          rel="noreferrer"
          className="absolute inset-x-4 bottom-4 flex items-center justify-between border border-white/40 bg-black/60 backdrop-blur px-4 py-3 text-[10px] font-semibold uppercase tracking-luxe text-white opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 hover:border-blood hover:bg-blood"
        >
          Order on WhatsApp
          <ArrowUpRight className="size-3.5" />
        </a>
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-luxe text-white/40">{product.category}</div>
          <h3 className="mt-1 text-sm font-medium tracking-brand text-white">{product.name}</h3>
        </div>
        <div className="text-sm font-medium text-white">{product.price}</div>
      </div>
    </motion.article>
  );
}
