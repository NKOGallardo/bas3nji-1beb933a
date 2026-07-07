import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Logo } from "@/components/Logo";
import { ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — BAS3NJI WORLD" },
      { name: "description", content: "Sign in to your BAS3NJI WORLD account." },
    ],
  }),
  component: Login,
});

function Login() {
  const { user, ready } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (ready && user) navigate({ to: "/account", replace: true });
  }, [ready, user, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back");
      } else {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        toast.success("Check your email to confirm");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-app bg-black text-white grid md:grid-cols-2">
      {/* Image side */}
      <div className="hidden md:block relative overflow-hidden">
        <img src={hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/70" />
        <div className="relative z-10 h-full flex flex-col justify-between p-10">
          <Link to="/" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-luxe text-white/70 hover:text-blood link-underline w-fit">
            <ArrowLeft className="size-3" /> Back to the world
          </Link>
          <div>
            <Logo size="xl" />
            <p className="mt-6 max-w-sm text-sm text-white/70">
              Members get first access to drops, private previews, and priority orders.
            </p>
          </div>
        </div>
      </div>

      {/* Form side */}
      <div className="flex items-center justify-center px-6 py-16 md:p-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <Link to="/" className="md:hidden inline-flex items-center mb-10">
            <Logo size="md" />
          </Link>
          <div className="text-[10px] uppercase tracking-luxe text-blood mb-4">
            {mode === "signin" ? "Members" : "Join the world"}
          </div>
          <h1 className="font-display text-4xl md:text-5xl tracking-brand">
            {mode === "signin" ? "Sign in" : "Create account"}
          </h1>
          <p className="mt-4 text-sm text-white/60">
            {mode === "signin" ? "Access your account and orders." : "First access to every drop."}
          </p>

          <form onSubmit={submit} className="mt-10 space-y-5">
            <div>
              <label className="block text-[10px] uppercase tracking-luxe text-white/50 mb-2">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-white/20 py-3 text-sm text-white outline-none focus:border-blood transition-colors"
                placeholder="you@world.com"
                autoComplete="email"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-luxe text-white/50 mb-2">Password</label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b border-white/20 py-3 text-sm text-white outline-none focus:border-blood transition-colors"
                placeholder="••••••••"
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-8 w-full inline-flex items-center justify-center gap-3 border border-blood bg-blood px-6 py-4 text-[10px] font-semibold uppercase tracking-luxe text-white transition-transform hover:-translate-y-0.5 disabled:opacity-60"
            >
              {loading ? <Loader2 className="size-4 animate-spin" /> : (
                <>
                  {mode === "signin" ? "Sign in" : "Create account"}
                  <ArrowRight className="size-3.5" />
                </>
              )}
            </button>
          </form>

          <button
            type="button"
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="mt-10 text-[11px] uppercase tracking-luxe text-white/50 hover:text-blood transition-colors"
          >
            {mode === "signin" ? "New here? Create an account →" : "Already a member? Sign in →"}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
