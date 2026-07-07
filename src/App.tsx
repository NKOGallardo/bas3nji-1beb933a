import { Routes, Route, Link } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import Collections from "./pages/Collections";
import Lookbook from "./pages/Lookbook";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Account from "./pages/Account";
import ProtectedRoute from "./components/ProtectedRoute";

function NotFound() {
  useEffect(() => { document.title = "404 — BAS3NJI WORLD"; }, []);
  return (
    <div className="nf">
      <div className="nf__inner">
        <div className="nf__num">404</div>
        <p className="nf__meta">Off the grid</p>
        <Link to="/" className="btn btn--ghost" style={{ marginTop: "2.5rem" }}>Return home</Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/collections" element={<Collections />} />
      <Route path="/lookbook" element={<Lookbook />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/account"
        element={
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
