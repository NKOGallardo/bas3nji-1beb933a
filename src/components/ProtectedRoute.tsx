import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../utils/supabase"; // Use your correct import path
import { User } from "@supabase/supabase-js";

export default function ProtectedRoute({ children }: { children: React.JSX.Element }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // 1. Start with a loading state

  useEffect(() => {
    // 2. Check the current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // 3. Listen for changes (this catches the moment Google logs them in)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 4. CRUCIAL: Wait until Supabase finishes reading the Google hash token
  if (loading) {
    return <div className="loading-screen">Loading your account...</div>; 
  }

  // 5. If no user after checking, redirect back to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}