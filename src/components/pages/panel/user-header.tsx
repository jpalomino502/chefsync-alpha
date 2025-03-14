"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { ChefHat, User, LogOut, Settings } from "lucide-react";

export default function UserHeader() {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsProfileMenuOpen(false);
  };

  const getPanelUrl = () => {
    if (!user || !user.uid) return "/";
    return `/user/${user.uid}/panel`;
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
      setIsProfileMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-md relative z-10 w-full px-6 flex justify-between items-center h-16">
      {/* Logo y título */}
      <div className="flex items-center space-x-2 text-xl tracking-tight">
        <ChefHat className="h-6 w-6" />
        <span>ChefSync</span>
      </div>
      
      {/* Botón de usuario y menú */}
      <div className="flex items-center gap-2">
        {user ? (
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileMenuOpen((prev) => !prev)}
              className="flex items-center justify-center rounded-full bg-gray-200 h-10 w-10 hover:bg-gray-300 focus:outline-none transition-colors"
              aria-label="Menú de usuario"
            >
              <User className="h-5 w-5 text-black" />
            </button>
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-lg shadow-lg overflow-hidden z-20 bg-white border border-gray-100">
                <div className="p-4 border-b bg-gray-50">
                  <div className="flex items-center gap-3">
                    <User className="h-6 w-6 text-black" />
                    <div>
                      <p className="text-zinc-900">{user.name || "Usuario"}</p>
                      {user.email && <p className="text-xs text-gray-500">{user.email}</p>}
                    </div>
                  </div>
                </div>
                <div className="py-2">
                  <Link href={getPanelUrl()} className="flex items-center px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ">
                    <ChefHat className="h-4 w-4 mr-2 text-gray-500" />
                    Panel de control
                  </Link>
                  <Link href="/perfil" className="flex items-center px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors text-black">
                    <User className="h-4 w-4 mr-2 text-gray-500" />
                    Mi perfil
                  </Link>
                  <Link href="/configuracion" className="flex items-center px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors text-black">
                    <Settings className="h-4 w-4 mr-2 text-gray-500" />
                    Configuración
                  </Link>
                </div>
                <div className="py-2 border-t border-gray-100 bg-gray-50">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left flex items-center px-4 py-2.5 text-sm text-red-600 hover:bg-gray-100 transition-colors"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Cerrar sesión
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button className="text-sm">Iniciar sesión</button>
        )}
      </div>
    </nav>
  );
}
