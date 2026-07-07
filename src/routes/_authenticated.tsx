import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/_authenticated")({
  component: AuthedLayout,
});

function AuthedLayout() {
  return (
    <div className="min-h-app bg-black text-white">
      <Nav />
      <div className="pt-20">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
