import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { whatsappGeneralUrl } from "@/lib/whatsapp";
import { Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__grid">
          <div>
            <Logo size="lg" />
            <p className="footer__intro">
              A luxury streetwear house. Confidence, exclusivity, and modern street culture — cut in black, white, and blood red.
            </p>
          </div>

          <FooterCol title="Shop">
            <li><Link to="/collections">Collections</Link></li>
            <li><Link to="/lookbook">Lookbook</Link></li>
            <li><a href={whatsappGeneralUrl()} target="_blank" rel="noreferrer">Order via WhatsApp</a></li>
          </FooterCol>

          <FooterCol title="World">
            <li><Link to="/about">Our story</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/login">Account</Link></li>
          </FooterCol>

          <FooterCol title="Follow">
            <li>
              <a href="https://www.instagram.com/bas3njiworld?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                <Instagram className="icon-sm" /> Instagram
              </a>
            </li>
            <li><a href={whatsappGeneralUrl()} target="_blank" rel="noreferrer">WhatsApp</a></li>
          </FooterCol>
        </div>

        <div className="footer__bottom">
          <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "var(--tracking-luxe)", color: "rgba(255,255,255,0.4)" }}>
            © {new Date().getFullYear()} BAS3NJI WORLD. All rights reserved.
          </p>
          <div className="footer__meta">
            <span>Made in shadow</span>
            <span className="footer__meta-dot" />
            <span>Worn in light</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="footer__col-title">{title}</div>
      <ul className="footer__list">{children}</ul>
    </div>
  );
}
