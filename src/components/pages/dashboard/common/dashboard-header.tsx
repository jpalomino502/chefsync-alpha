"use client"

import { Menu } from "lucide-react"

interface HeaderProps {
  toggleSidebar: () => void
  pageTitle: string
}

export default function DashboardHeader({ toggleSidebar, pageTitle }: HeaderProps) {
  return (
    <header className="lg:hidden fixed top-0 left-0 right-0 bg-black shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h2 className="text-xl ml-4 font-semibold text-white">{pageTitle}</h2>
          </div>
        </div>
      </div>
    </header>
  )
}

