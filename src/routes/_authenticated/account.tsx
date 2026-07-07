import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, LogOut, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { whatsappGeneralUrl } from "@/lib/whatsapp";
import { useEffect } from "react";

export const Route = createFileRoute("/_authenticated/account")({
  head: () => ({
    meta: [
      { title: "Account — BAS3NJI WORLD" },
      { name: "description", content: "Your BAS3NJI WORLD account." },
    ],
  }),
  component: Account,
});

function Account() {
  const { user, ready } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();

  useEffect(() => {
    if (ready && !user) navigate({ to: "/login", replace: true });
  }, [ready, user, navigate]);

  const signOut = async () => {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    toast.success("Signed out");
    navigate({ to: "/login", replace: true });
  };

  if (!ready || !user) {
    return (
      <div className="min-h-[60vh] grid place-items-center">
        <Loader2 className="size-5 animate-spin text-blood" />
      </div>
    );
  }

  return (
    <div className="px-5 md:px-10 py-16 md:py-24">
      <div className="mx-auto max-w-[1200px]">
        <div className="text-[10px] uppercase tracking-luxe text-blood mb-6">Member</div>
        <h1 className="font-display text-5xl md:text-7xl tracking-brand">Account</h1>

        <div className="mt-16 grid md:grid-cols-2 gap-6">
          <div className="p-10 border border-white/10 bg-white/[0.02]">
            <div className="text-[10px] uppercase tracking-luxe text-white/50">Signed in as</div>
            <div className="mt-3 font-display text-xl tracking-brand break-all">{user.email}</div>
            <div className="mt-6 text-[10px] uppercase tracking-luxe text-white/40">
              Since {new Date(user.created_at).toLocaleDateString(undefined, { month: "long", year: "numeric" })}
            </div>
          </div>

          <a
            href={whatsappGeneralUrl(`Hi BAS3NJI WORLD, I'm a member (${user.email}) — I'd like to place an order.`)}
            target="_blank"
            rel="noreferrer"
            className="group p-10 border border-white/10 bg-blood text-white hover:-translate-y-0.5 transition-transform"
          >
            <div className="text-[10px] uppercase tracking-luxe text-white/70">Priority orders</div>
            <div className="mt-3 font-display text-2xl tracking-brand">Order on WhatsApp</div>
            <div className="mt-6 inline-flex items-center gap-2 text-[10px] uppercase tracking-luxe">
              Open chat <ArrowUpRight className="size-3.5" />
            </div>
          </a>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10">
          <button
            onClick={signOut}
            className="inline-flex items-center gap-3 border border-white/20 px-6 py-3 text-[10px] uppercase tracking-luxe hover:border-blood hover:text-blood transition-colors"
          >
            <LogOut className="size-3.5" /> Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
