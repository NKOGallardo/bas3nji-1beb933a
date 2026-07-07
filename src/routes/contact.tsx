import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { whatsappGeneralUrl, WHATSAPP_NUMBER } from "@/lib/whatsapp";
import { ArrowUpRight, Instagram, MessageCircle, Mail } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — BAS3NJI WORLD" },
      { name: "description", content: "Reach BAS3NJI WORLD. All orders and enquiries via WhatsApp." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div className="min-h-app bg-black text-white">
      <Nav />

      <section className="pt-40 pb-16 px-5 md:px-10">
        <div className="mx-auto max-w-[1600px]">
          <div className="text-[10px] uppercase tracking-luxe text-blood mb-6">Enquiries</div>
          <h1 className="font-display text-6xl md:text-9xl leading-[0.9] tracking-brand">Contact</h1>
          <p className="mt-8 max-w-xl text-sm md:text-base text-white/70">
            All orders, sizing, and press enquiries go through WhatsApp. We answer personally.
          </p>
        </div>
      </section>

      <section className="px-5 md:px-10 py-16 md:py-24">
        <div className="mx-auto max-w-[1600px] grid md:grid-cols-3 gap-6">
          <a
            href={whatsappGeneralUrl()}
            target="_blank"
            rel="noreferrer"
            className="group relative p-10 border border-white/10 hover:border-blood transition-colors bg-black"
          >
            <MessageCircle className="size-6 text-blood" />
            <div className="mt-8 text-[10px] uppercase tracking-luxe text-white/50">Primary</div>
            <div className="mt-2 font-display text-3xl tracking-brand">WhatsApp</div>
            <div className="mt-4 text-sm text-white/70">+{WHATSAPP_NUMBER}</div>
            <ArrowUpRight className="absolute top-6 right-6 size-4 text-white/40 group-hover:text-blood transition-colors" />
          </a>

          <a
            href="mailto:hello@bas3nji.world"
            className="group relative p-10 border border-white/10 hover:border-blood transition-colors bg-black"
          >
            <Mail className="size-6 text-blood" />
            <div className="mt-8 text-[10px] uppercase tracking-luxe text-white/50">Press & Wholesale</div>
            <div className="mt-2 font-display text-3xl tracking-brand">Email</div>
            <div className="mt-4 text-sm text-white/70">hello@bas3nji.world</div>
            <ArrowUpRight className="absolute top-6 right-6 size-4 text-white/40 group-hover:text-blood transition-colors" />
          </a>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="group relative p-10 border border-white/10 hover:border-blood transition-colors bg-black"
          >
            <Instagram className="size-6 text-blood" />
            <div className="mt-8 text-[10px] uppercase tracking-luxe text-white/50">Follow</div>
            <div className="mt-2 font-display text-3xl tracking-brand">Instagram</div>
            <div className="mt-4 text-sm text-white/70">@bas3nji.world</div>
            <ArrowUpRight className="absolute top-6 right-6 size-4 text-white/40 group-hover:text-blood transition-colors" />
          </a>
        </div>
      </section>

      <section className="px-5 md:px-10 py-24 border-t border-white/5">
        <div className="mx-auto max-w-[1600px] grid md:grid-cols-2 gap-16">
          <div>
            <div className="text-[10px] uppercase tracking-luxe text-blood mb-4">Studio</div>
            <div className="font-display text-3xl tracking-brand">The World HQ</div>
            <p className="mt-4 text-sm text-white/60">By appointment only.</p>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-luxe text-blood mb-4">Hours</div>
            <div className="space-y-2 text-sm text-white/80">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span>Mon — Fri</span><span>10:00 — 20:00</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span>Sat</span><span>12:00 — 22:00</span>
              </div>
              <div className="flex justify-between">
                <span>Sun</span><span className="text-blood">Closed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
