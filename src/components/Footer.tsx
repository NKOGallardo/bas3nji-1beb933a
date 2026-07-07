import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { whatsappGeneralUrl } from "@/lib/whatsapp";
import { Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-black text-white">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 pt-20 pb-10">
        <div className="grid gap-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo size="lg" />
            <p className="mt-6 max-w-sm text-sm text-white/60 leading-relaxed">
              A luxury streetwear house. Confidence, exclusivity, and modern street culture — cut in black, white, and blood red.
            </p>
          </div>

          <FooterCol title="Shop">
            <FooterLink to="/collections">Collections</FooterLink>
            <FooterLink to="/lookbook">Lookbook</FooterLink>
            <FooterExtLink href={whatsappGeneralUrl()}>Order via WhatsApp</FooterExtLink>
          </FooterCol>

          <FooterCol title="World">
            <FooterLink to="/about">Our story</FooterLink>
            <FooterLink to="/contact">Contact</FooterLink>
            <FooterLink to="/login">Account</FooterLink>
          </FooterCol>

          <FooterCol title="Follow">
            <FooterExtLink href="https://instagram.com">
              <span className="inline-flex items-center gap-2"><Instagram className="size-3" /> Instagram</span>
            </FooterExtLink>
            <FooterExtLink href={whatsappGeneralUrl()}>WhatsApp</FooterExtLink>
          </FooterCol>
        </div>

        <div className="mt-20 flex flex-col-reverse gap-6 md:flex-row md:items-center md:justify-between border-t border-white/5 pt-8">
          <p className="text-[10px] uppercase tracking-luxe text-white/40">
            © {new Date().getFullYear()} BAS3NJI WORLD. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-[10px] uppercase tracking-luxe text-white/40">
            <span>Made in shadow</span>
            <span className="h-1 w-1 rounded-full bg-blood" />
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
      <div className="text-[10px] font-semibold uppercase tracking-luxe text-white/40 mb-5">{title}</div>
      <ul className="space-y-3">{children}</ul>
    </div>
  );
}

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li>
      <Link to={to} className="text-sm text-white/80 hover:text-blood transition-colors">
        {children}
      </Link>
    </li>
  );
}

function FooterExtLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <a href={href} target="_blank" rel="noreferrer" className="text-sm text-white/80 hover:text-blood transition-colors">
        {children}
      </a>
    </li>
  );
}
