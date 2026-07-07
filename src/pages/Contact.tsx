import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { whatsappGeneralUrl, WHATSAPP_NUMBER } from "@/lib/whatsapp";
import { ArrowUpRight, Instagram, MessageCircle, Mail } from "lucide-react";
import { useDocumentHead } from "@/hooks/use-document-head";

export default function Contact() {
  useDocumentHead({
    title: "Contact — BAS3NJI WORLD",
    description: "Reach BAS3NJI WORLD. All orders and enquiries via WhatsApp.",
  });
  return (
    <div className="min-h-app">
      <Nav />
      <section className="pagehead">
        <div className="pagehead__inner">
          <div className="eyebrow" style={{ marginBottom: "1.5rem" }}>Enquiries</div>
          <h1 className="pagehead__title">Contact</h1>
          <p className="pagehead__body">
            All orders, sizing, and press enquiries go through WhatsApp. We answer personally.
          </p>
        </div>
      </section>

      <section className="section" style={{ padding: "4rem var(--pad-x) 6rem" }}>
        <div className="contact-cards">
          <a href={whatsappGeneralUrl()} target="_blank" rel="noreferrer" className="contact-card">
            <MessageCircle className="contact-card__icon" />
            <div className="contact-card__eyebrow">Primary</div>
            <div className="contact-card__title">WhatsApp</div>
            <div className="contact-card__body">+{WHATSAPP_NUMBER}</div>
            <ArrowUpRight className="contact-card__arrow" />
          </a>
          <a href="mailto:hello@bas3nji.world" className="contact-card">
            <Mail className="contact-card__icon" />
            <div className="contact-card__eyebrow">Press & Wholesale</div>
            <div className="contact-card__title">Email</div>
            <div className="contact-card__body">hello@bas3nji.world</div>
            <ArrowUpRight className="contact-card__arrow" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="contact-card">
            <Instagram className="contact-card__icon" />
            <div className="contact-card__eyebrow">Follow</div>
            <div className="contact-card__title">Instagram</div>
            <div className="contact-card__body">@bas3nji.world</div>
            <ArrowUpRight className="contact-card__arrow" />
          </a>
        </div>
      </section>

      <section className="section section--bordered" style={{ padding: "6rem var(--pad-x)" }}>
        <div className="contact-info">
          <div>
            <div className="eyebrow" style={{ marginBottom: "1rem" }}>Studio</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "1.875rem", letterSpacing: "var(--tracking-brand)" }}>The World HQ</div>
            <p style={{ marginTop: "1rem", fontSize: "0.875rem", color: "rgba(255,255,255,0.6)" }}>By appointment only.</p>
          </div>
          <div>
            <div className="eyebrow" style={{ marginBottom: "1rem" }}>Hours</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.875rem", color: "rgba(255,255,255,0.8)" }}>
              <div className="hours-row"><span>Mon — Fri</span><span>10:00 — 20:00</span></div>
              <div className="hours-row"><span>Sat</span><span>12:00 — 22:00</span></div>
              <div className="hours-row"><span>Sun</span><span className="text-blood">Closed</span></div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
