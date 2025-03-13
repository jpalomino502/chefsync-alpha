"use client"

import { LogOut } from "lucide-react"

interface UserHeaderProps {
  userName: string
  showUserMenu: boolean
  setShowUserMenu: (show: boolean) => void
  handleLogout: () => void
  texts: {
    logout: string
  }
}

export default function UserHeader({ userName, showUserMenu, setShowUserMenu, handleLogout, texts }: UserHeaderProps) {
  return (
    <nav className="bg-white shadow-md relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <div className="flex items-center">
            <span className="text-3xl text-black">ChefSync</span>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl cursor-pointer"
            >
              {userName.charAt(0).toUpperCase()}
            </button>
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <LogOut className="inline-block mr-2" size={18} />
                  {texts.logout}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

