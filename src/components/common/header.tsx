"use client"
import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { Menu, X, User, ChefHat, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AuthModal } from "./AuthModal"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/auth-context"
import { useAuthActions } from "@/hooks/use-auth-actions"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { user } = useAuth() // Use the auth context instead of local state
  const { logout } = useAuthActions()

  const headerRef = useRef<HTMLElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)
  const mobileUserMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)

    const handleClickOutside = (event: MouseEvent) => {
      if (
        headerRef.current?.contains(event.target as Node) ||
        profileRef.current?.contains(event.target as Node) ||
        mobileUserMenuRef.current?.contains(event.target as Node)
      )
        return

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

  const handleLogout = async () => {
    await logout()
    setIsProfileMenuOpen(false)
    setIsMenuOpen(false)
  }

  const getPanelUrl = () => (user?.uid ? `/panel/${user.uid}` : "/")

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
            <Link href="#features" className="text-sm text-black hover:text-zinc-900">
              Características
            </Link>
            <Link href="#showcase" className="text-sm text-black hover:text-zinc-900">
              Ejemplos
            </Link>
            <Link href="#pricing" className="text-sm text-black hover:text-zinc-900">
              Precios
            </Link>
            <Link href="#support" className="text-sm text-black hover:text-zinc-900">
              Soporte
            </Link>
          </nav>
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                  className="flex items-center justify-center rounded-full bg-gray-200 h-10 w-10 hover:bg-gray-300"
                >
                  <User className="h-5 w-5 text-black" />
                </button>
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100">
                    <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center gap-3">
                      <User className="h-6 w-6 text-black" />
                      <div>
                      <p className="text-zinc-900">{user.displayName || "Usuario"}</p>
                      {user.email && <p className="text-xs text-gray-500">{user.email}</p>}
                      </div>
                    </div>
                    <div className="py-2">
                      <Link
                        href={getPanelUrl()}
                        className="flex items-center px-4 py-2.5 text-sm text-black hover:bg-gray-50"
                      >
                        Panel de control
                      </Link>
                      <Link
                        href="/perfil"
                        className="flex items-center px-4 py-2.5 text-sm text-black hover:bg-gray-50"
                      >
                        Mi perfil
                      </Link>
                      <Link
                        href="/configuracion"
                        className="flex items-center px-4 py-2.5 text-sm text-black hover:bg-gray-50"
                      >
                        Configuración
                      </Link>
                    </div>
                    <div className="py-2 border-t border-gray-100 bg-gray-50">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left flex items-center px-4 py-2.5 text-sm text-red-600 hover:bg-gray-100"
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
                <Button variant="outline" size="sm" onClick={() => setIsLoginOpen(true)}>
                  Iniciar sesión
                </Button>
                <Button variant="default" size="sm" onClick={() => setIsLoginOpen(true)}>
                  Registrarse
                </Button>
              </div>
            )}
          </div>
          <div className="md:hidden flex items-center gap-3">
            {user ? (
              <button
                onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                className="flex items-center justify-center rounded-full bg-gray-200 h-8 w-8 hover:bg-gray-300"
              >
                <User className="h-4 w-4 text-black" />
              </button>
            ) : (
              <Button variant="outline" size="sm" onClick={() => setIsLoginOpen(true)}>
                Iniciar sesión
              </Button>
            )}
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>
      <AuthModal isOpen={isLoginOpen} setIsOpen={setIsLoginOpen} />
    </>
  )
}

