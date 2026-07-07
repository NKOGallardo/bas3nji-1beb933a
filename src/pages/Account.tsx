import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { LogOut, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { whatsappGeneralUrl } from "@/lib/whatsapp";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { useDocumentHead } from "@/hooks/use-document-head";

export default function Account() {
  useDocumentHead({ title: "Account — BAS3NJI WORLD", description: "Your BAS3NJI WORLD account." });
  const { user } = useAuth();
  const navigate = useNavigate();

  const signOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out");
    navigate("/login", { replace: true });
  };

  if (!user) return null;

  return (
    <div className="min-h-app">
      <Nav />
      <div style={{ paddingTop: "5rem" }} />
      <div className="account">
        <div className="account__inner">
          <div className="eyebrow" style={{ marginBottom: "1.5rem" }}>Member</div>
          <h1 className="account__title">Account</h1>

          <div className="account__grid">
            <div className="account__card">
              <div className="account__label">Signed in as</div>
              <div className="account__value">{user.email}</div>
              <div className="account__meta">
                Since {new Date(user.created_at).toLocaleDateString(undefined, { month: "long", year: "numeric" })}
              </div>
            </div>

            <a
              href={whatsappGeneralUrl(`Hi BAS3NJI WORLD, I'm a member (${user.email}) — I'd like to place an order.`)}
              target="_blank"
              rel="noreferrer"
              className="account__card account__card--blood"
            >
              <div className="account__label" style={{ color: "rgba(255,255,255,0.7)" }}>Priority orders</div>
              <div className="account__value">Order on WhatsApp</div>
              <div style={{ marginTop: "1.5rem", display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: 10, textTransform: "uppercase", letterSpacing: "var(--tracking-luxe)" }}>
                Open chat <ArrowUpRight className="icon" />
              </div>
            </a>
          </div>

          <div className="account__actions">
            <button onClick={signOut} className="btn btn--outline">
              <LogOut className="icon" /> Sign out
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
