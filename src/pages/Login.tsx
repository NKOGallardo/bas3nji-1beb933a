import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Logo } from "@/components/Logo";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useDocumentHead } from "@/hooks/use-document-head";
import hero from "@/assets/pic4.jpg";
import { createDemoAccount, isDemoAuthEnabled, signInDemoAccount } from "@/lib/demo-auth";

export default function Login() {
  useDocumentHead({ title: "Sign in — BAS3NJI WORLD", description: "Sign in to your BAS3NJI WORLD account." });
  const { user, ready } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (ready && user) navigate("/account", { replace: true });
  }, [ready, user, navigate]);

  const getAuthErrorMessage = (err: unknown) => {
    if (err instanceof Error) {
      const message = err.message.toLowerCase();
      if (message.includes("email not confirmed")) {
        return "Please confirm your email before signing in. Check your inbox for the confirmation link.";
      }
      if (message.includes("invalid login credentials")) {
        return "That email/password combination is not valid. Please try again or create an account.";
      }
      return err.message;
    }

    return "Something went wrong";
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isDemoAuthEnabled()) {
        if (mode === "signin") {
          signInDemoAccount(email, password);
          toast.success("Welcome back");
          navigate("/account", { replace: true });
          return;
        }

        createDemoAccount(email, password);
        toast.success("Account created — you’re signed in");
        navigate("/account", { replace: true });
        return;
      }

      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back");
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/account` },
        });

        if (error) throw error;

        if (data.session) {
          toast.success("Account created — you’re signed in");
          navigate("/account", { replace: true });
          return;
        }

        toast.success("Account created. Please check your email to confirm your address.");
      }
    } catch (err) {
      toast.error(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const google = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/account` },
      });
      if (error) throw error;
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Google sign-in failed");
    }
  };

  return (
    <div className="login">
      <div className="login__aside">
        <img src={hero} alt="" />
        <div className="login__aside-scrim" />
        <div className="login__aside-inner">
          <Link to="/" className="login__back link-underline">
            <ArrowLeft className="icon-sm" /> Back to the world
          </Link>
          <div>
            <Logo size="xl" />
            <p style={{ marginTop: "1.5rem", maxWidth: "24rem", fontSize: "0.875rem", color: "rgba(255,255,255,0.7)" }}>
              Members get first access to drops, private previews, and priority orders.
            </p>
          </div>
        </div>
      </div>

      <div className="login__form-wrap">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="login__form">
          <Link to="/" style={{ display: "inline-flex", marginBottom: "2.5rem" }} className="login-mobile-only">
            <Logo size="md" />
          </Link>
          <div className="eyebrow" style={{ marginBottom: "1rem" }}>
            {mode === "signin" ? "Members" : "Join the world"}
          </div>
          <h1 className="login__title">{mode === "signin" ? "Sign in" : "Create account"}</h1>
          <p className="login__sub">
            {mode === "signin" ? "Access your account and orders." : "First access to every drop."}
          </p>

          <form onSubmit={submit} className="login__fields">
            <label className="field">
              <span className="field__label">Email</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="field__input"
                placeholder="you@world.com"
                autoComplete="email"
              />
            </label>
            <label className="field">
              <span className="field__label">Password</span>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="field__input"
                placeholder="••••••••(AKA password)"
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
              />
            </label>

            <button type="submit" disabled={loading} className="btn btn--primary btn--full login__submit">
              {loading ? <span className="spinner" /> : <>
                {mode === "signin" ? "Sign in" : "Create account"} <ArrowRight className="icon" />
              </>}
            </button>
          </form>

          <div className="login__divider">or</div>

          <button type="button" onClick={google} className="btn btn--ghost btn--full">
            Continue with Google
          </button>

          <button
            type="button"
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="login__switch link-underline"
            style={{ display: "block", marginTop: "2.5rem" }}
          >
            {mode === "signin" ? "New here? Create an account →" : "Already a member? Sign in →"}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
