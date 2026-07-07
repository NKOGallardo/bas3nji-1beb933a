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
      className="product"
    >
      <div className="product__media">
        <img src={product.image} alt={product.name} loading="lazy" />
        <div className="product__overlay" />
        <a
          href={whatsappOrderUrl({ product: product.name, price: product.price })}
          target="_blank"
          rel="noreferrer"
          className="product__cta"
        >
          Order on WhatsApp
          <ArrowUpRight className="icon" />
        </a>
      </div>
      <div className="product__foot">
        <div>
          <div className="product__cat">{product.category}</div>
          <h3 className="product__name">{product.name}</h3>
        </div>
        <div className="product__price">{product.price}</div>
      </div>
    </motion.article>
  );
}
