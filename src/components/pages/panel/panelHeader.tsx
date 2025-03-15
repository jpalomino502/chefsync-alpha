"use client"
import { useState } from "react"
import Link from "next/link"
import { ChefHat, User, LogOut, Settings } from "lucide-react"

const PanelHeader = ({ handleLogout, texts }) => {
  const [showUserMenu, setShowUserMenu] = useState(false)
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <Link href="/">
          <div className="flex items-center space-x-2">
            <ChefHat className="h-6 w-6 text-black" />
            <span className="text-xl font-bold text-black">ChefSync</span>
          </div>
        </Link>
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center justify-center rounded-full bg-gray-200 h-10 w-10 hover:bg-gray-300 focus:outline-none transition-colors"
            aria-label="Menú de usuario"
          >
            <User className="h-5 w-5 text-black" />
          </button>
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100">
              <Link href="/panel" className="block px-4 py-2 text-sm text-black hover:bg-gray-50">
                Panel de control
              </Link>
              <Link href="/perfil" className="block px-4 py-2 text-sm text-black hover:bg-gray-50">
                Mi perfil
              </Link>
              <Link href="/configuracion" className="block px-4 py-2 text-sm text-black hover:bg-gray-50">
                Configuración
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
              >
                <LogOut className="inline-block mr-2" size={18} />
                {texts.logout}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default PanelHeader
