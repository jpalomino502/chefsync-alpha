// header.tsx
"use client"
import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import {
  Menu,
  X,
  User,
  ChefHat,
  Bell,
  Search,
  Settings,
  Sliders,
  LucideImage,
  DollarSign,
  HelpCircle,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { AuthModal } from "./AuthModal"
import { cn } from "@/lib/utils"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  const headerRef = useRef<HTMLElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)
  const mobileUserMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) setUser(JSON.parse(storedUser))

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        (headerRef.current && headerRef.current.contains(event.target as Node)) ||
        (profileRef.current && profileRef.current.contains(event.target as Node)) ||
        (mobileUserMenuRef.current && mobileUserMenuRef.current.contains(event.target as Node))
      ) {
        return
      }
      setIsMenuOpen(false)
      setIsProfileMenuOpen(false)
    }

    window.addEventListener("scroll", handleScroll)
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    setUser(null)
    setIsProfileMenuOpen(false)
    setIsMenuOpen(false)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
    setIsProfileMenuOpen(false)
  }

  // Modificación: generar la URL del panel como /panel/userid
  const getPanelUrl = () => {
    if (!user || !user.uid) return "/"
    return `/panel/${user.uid}`
  }

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "sticky top-0 z-50 w-full border-b transition-all duration-200",
          isScrolled ? "bg-white/95 shadow-md border-transparent" : "bg-white/90 border-gray-200 shadow-sm",
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex justify-between items-center h-16">
          <Link
            href="/"
            className="flex items-center space-x-2 text-xl tracking-tight text-black hover:text-zinc-900 transition-colors"
          >
            <ChefHat className="h-6 w-6" />
            <span>ChefSync</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-sm text-black hover:text-zinc-900 relative group py-1.5">
              Características
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gray-900 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200"></span>
            </Link>
            <Link href="#showcase" className="text-sm text-black hover:text-zinc-900 relative group py-1.5">
              Ejemplos
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gray-900 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200"></span>
            </Link>
            <Link href="#pricing" className="text-sm text-black hover:text-zinc-900 relative group py-1.5">
              Precios
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gray-900 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200"></span>
            </Link>
            <Link href="#support" className="text-sm text-black hover:text-zinc-900 relative group py-1.5">
              Soporte
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gray-900 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200"></span>
            </Link>
          </nav>
          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" size="icon" className="mr-1" aria-label="Buscar">
              <Search className="h-5 w-5" />
            </Button>
            {user && (
              <Button variant="ghost" size="icon" className="mr-1 relative" aria-label="Notificaciones">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </Button>
            )}
            {user ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                  className="flex items-center justify-center rounded-full bg-gray-200 h-10 w-10 hover:bg-gray-300 focus:outline-none transition-colors ring-offset-2 focus:ring-2 focus:ring-primary/20"
                  aria-label="Menú de usuario"
                >
                  <User className="h-5 w-5 text-black" />
                </button>
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg overflow-hidden z-20 border border-gray-100 animate-in fade-in slide-in-from-top-5 duration-200">
                    <div className="p-4 border-b border-gray-100 bg-gray-50">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center overflow-hidden">
                          <User className="h-6 w-6 text-black" />
                        </div>
                        <div>
                          <p className="text-zinc-900">{user.name || "Usuario"}</p>
                          {user.email && <p className="text-xs text-gray-500">{user.email}</p>}
                        </div>
                      </div>
                    </div>
                    <div className="py-2">
                      <Link
                        href={getPanelUrl()}
                        className="flex items-center px-4 py-2.5 text-sm text-black hover:bg-gray-50 transition-colors"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        <ChefHat className="h-4 w-4 mr-2 text-gray-500" />
                        Panel de control
                      </Link>
                      <Link
                        href="/perfil"
                        className="flex items-center px-4 py-2.5 text-sm text-black hover:bg-gray-50 transition-colors"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        <User className="h-4 w-4 mr-2 text-gray-500" />
                        Mi perfil
                      </Link>
                      <Link
                        href="/configuracion"
                        className="flex items-center px-4 py-2.5 text-sm text-black hover:bg-gray-50 transition-colors"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
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
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="text-sm" onClick={() => setIsLoginOpen(true)}>
                  Iniciar sesión
                </Button>
                <Button variant="default" size="sm" className="text-sm" onClick={() => setIsLoginOpen(true)}>
                  Registrarse
                </Button>
              </div>
            )}
          </div>
          <div className="md:hidden flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-black" aria-label="Buscar">
              <Search className="h-5 w-5" />
            </Button>
            {user && (
              <Button variant="ghost" size="icon" className="text-black relative" aria-label="Notificaciones">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </Button>
            )}
            {user ? (
              <button
                onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                className="flex items-center justify-center rounded-full bg-gray-200 h-8 w-8 hover:bg-gray-300 focus:outline-none transition-colors"
                aria-label="Menú de usuario"
              >
                <User className="h-4 w-4 text-black" />
              </button>
            ) : (
              <Button variant="outline" size="sm" className="text-xs" onClick={() => setIsLoginOpen(true)}>
                Iniciar sesión
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-black hover:text-zinc-900 hover:bg-gray-100"
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>
      {isMenuOpen && (
        <div className="md:hidden fixed top-16 inset-x-0 z-50 bg-white border-t border-gray-100 shadow-sm transition-all duration-300 ease-in-out">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-1">
              <Link
                href="#features"
                className="text-base text-black hover:text-zinc-900 hover:bg-gray-50 rounded-md px-3 py-2.5 transition-colors flex items-center"
                onClick={closeMenu}
              >
                <Sliders className="h-4 w-4 mr-3 text-gray-500" />
                Características
              </Link>
              <Link
                href="#showcase"
                className="text-base text-black hover:text-zinc-900 hover:bg-gray-50 rounded-md px-3 py-2.5 transition-colors flex items-center"
                onClick={closeMenu}
              >
                <LucideImage className="h-4 w-4 mr-3 text-gray-500" />
                Ejemplos
              </Link>
              <Link
                href="#pricing"
                className="text-base text-black hover:text-zinc-900 hover:bg-gray-50 rounded-md px-3 py-2.5 transition-colors flex items-center"
                onClick={closeMenu}
              >
                <DollarSign className="h-4 w-4 mr-3 text-gray-500" />
                Precios
              </Link>
              <Link
                href="#support"
                className="text-base text-black hover:text-zinc-900 hover:bg-gray-50 rounded-md px-3 py-2.5 transition-colors flex items-center"
                onClick={closeMenu}
              >
                <HelpCircle className="h-4 w-4 mr-3 text-gray-500" />
                Soporte
              </Link>
            </nav>
          </div>
        </div>
      )}
      {user && isProfileMenuOpen && (
        <div
          ref={mobileUserMenuRef}
          className="md:hidden fixed right-4 top-16 w-64 bg-white rounded-lg shadow-lg overflow-hidden z-[100] border border-gray-100 animate-in fade-in slide-in-from-top-5 duration-200"
        >
          <div className="p-4 border-b border-gray-100 bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center overflow-hidden">
                <User className="h-6 w-6 text-black" />
              </div>
              <div>
                <p className="text-zinc-900">{user.name || "Usuario"}</p>
                {user.email && <p className="text-xs text-gray-500">{user.email}</p>}
              </div>
            </div>
          </div>
          <div className="py-2">
            <Link
              href={getPanelUrl()}
              className="flex items-center px-4 py-2.5 text-sm text-black hover:bg-gray-50 transition-colors"
              onClick={() => setIsProfileMenuOpen(false)}
            >
              <ChefHat className="h-4 w-4 mr-2 text-gray-500" />
              Panel de control
            </Link>
            <Link
              href="/perfil"
              className="flex items-center px-4 py-2.5 text-sm text-black hover:bg-gray-50 transition-colors"
              onClick={() => setIsProfileMenuOpen(false)}
            >
              <User className="h-4 w-4 mr-2 text-gray-500" />
              Mi perfil
            </Link>
            <Link
              href="/configuracion"
              className="flex items-center px-4 py-2.5 text-sm text-black hover:bg-gray-50 transition-colors"
              onClick={() => setIsProfileMenuOpen(false)}
            >
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
      {(isMenuOpen || isProfileMenuOpen) && (
        <div className="md:hidden fixed inset-0 bg-black/20 z-40" onClick={closeMenu} aria-hidden="true" />
      )}
      <AuthModal isOpen={isLoginOpen} setIsOpen={setIsLoginOpen} />
    </>
  )
}
