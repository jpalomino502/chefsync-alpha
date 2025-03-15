"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "@/services/firebase";

type AuthContextType = {
  user: User | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Estado de autenticación cambiado:", user ? "Usuario conectado" : "Sin usuario");
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (!hydrated) return null;

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
