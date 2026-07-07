import { QueryClient, QueryClientProvider, useQueryClient } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { Toaster } from "sonner";
import { supabase } from "@/integrations/supabase/client";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4">
      <div className="max-w-md text-center">
        <div className="font-display text-8xl tracking-brand text-white">404</div>
        <p className="mt-6 text-xs uppercase tracking-luxe text-white/60">Off the grid</p>
        <Link
          to="/"
          className="mt-10 inline-flex items-center gap-3 border border-white/30 px-6 py-3 text-[10px] font-semibold uppercase tracking-luxe text-white transition-colors hover:border-blood hover:text-blood"
        >
          Return home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4">
      <div className="max-w-md text-center">
        <div className="font-display text-4xl tracking-brand text-white">Something broke</div>
        <p className="mt-3 text-xs uppercase tracking-luxe text-white/60">{error.message}</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-10 border border-blood bg-blood px-6 py-3 text-[10px] font-semibold uppercase tracking-luxe text-white transition-transform hover:-translate-y-0.5"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#000000" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { name: "apple-mobile-web-app-title", content: "BAS3NJI WORLD" },
      { name: "application-name", content: "BAS3NJI WORLD" },
      { name: "format-detection", content: "telephone=no" },
      { title: "BAS3NJI WORLD — Luxury Streetwear" },
      { name: "description", content: "BAS3NJI WORLD. A luxury streetwear house. Confidence, exclusivity, and modern street culture — cut in black, white, and blood red." },
      { property: "og:title", content: "BAS3NJI WORLD — Luxury Streetwear" },
      { name: "twitter:title", content: "BAS3NJI WORLD — Luxury Streetwear" },
      { property: "og:description", content: "A luxury streetwear house. Confidence, exclusivity, and modern street culture." },
      { name: "twitter:description", content: "A luxury streetwear house. Confidence, exclusivity, and modern street culture." },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@300;400;500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function AuthBridge() {
  const router = useRouter();
  const qc = useQueryClient();
  const lastUserId = useRef<string | null>(null);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (mounted) lastUserId.current = data.session?.user?.id ?? null;
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "INITIAL_SESSION" || event === "TOKEN_REFRESHED") return;
      const nextUserId = session?.user?.id ?? null;
      const userChanged = lastUserId.current !== nextUserId;
      lastUserId.current = nextUserId;
      if (event === "SIGNED_OUT") { qc.clear(); router.invalidate(); return; }
      if (event === "SIGNED_IN" && !userChanged) return;
      if (event !== "SIGNED_IN" && event !== "USER_UPDATED" && event !== "PASSWORD_RECOVERY") return;
      router.invalidate();
    });
    return () => { mounted = false; subscription.unsubscribe(); };
  }, [router, qc]);
  return null;
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const setAppHeight = () => {
      const viewportHeight = window.visualViewport?.height ?? 0;
      const nextHeight = Math.max(window.innerHeight, viewportHeight, document.documentElement.clientHeight);
      document.documentElement.style.setProperty("--app-height", `${nextHeight}px`);
    };
    setAppHeight();
    window.addEventListener("resize", setAppHeight);
    window.addEventListener("orientationchange", setAppHeight);
    return () => {
      window.removeEventListener("resize", setAppHeight);
      window.removeEventListener("orientationchange", setAppHeight);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthBridge />
      <Outlet />
      <Toaster
        position="top-center"
        offset={{ top: "calc(env(safe-area-inset-top) + 1rem)" }}
        toastOptions={{
          unstyled: true,
          classNames: {
            toast: "ei-toast",
            title: "ei-toast-title",
            description: "ei-toast-desc",
            error: "ei-toast-error",
          },
        }}
      />
    </QueryClientProvider>
  );
}
