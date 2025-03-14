"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import DashboardSidebar from "@/components/pages/dashboard/common/dashboard-sidebar"
import DashboardHeader from "@/components/pages/dashboard/common/dashboard-header"

export default function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { userId: string; commerceId: string }
}) {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [activeView, setActiveView] = useState("Summary")
  const [allowedModules, setAllowedModules] = useState(["Summary", "Menu", "Command", "Bill", "ConfigApp"])

  useEffect(() => {
    const path = pathname.split("/").pop()
    if (path) {
      const view = path.charAt(0).toUpperCase() + path.slice(1)
      setActiveView(view)
    } else {
      setActiveView("Summary")
    }
  }, [pathname])

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)
  const closeSidebar = () => setIsSidebarOpen(false)

  return (
    <div className="relative bg-black min-h-screen overflow-hidden">
      <DashboardSidebar
        userId={params.userId}
        commerceId={params.commerceId}
        isOpen={isSidebarOpen}
        closeSidebar={closeSidebar}
        setIsSidebarOpen={setIsSidebarOpen}
        activeView={activeView}
        allowedModules={allowedModules}
      />
      <DashboardHeader toggleSidebar={toggleSidebar} pageTitle={activeView} />
      <div
        className={`flex flex-col min-h-screen pt-16 lg:pt-0 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "lg:ml-[320px]" : "lg:ml-[100px]"
        }`}
      >
        <main className="flex-1 no-scrollbar overflow-auto bg-white lg:rounded-2xl lg:my-2 lg:mr-2">
          <div className="h-full w-full container mx-auto p-4">{children}</div>
        </main>
      </div>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ease-in-out"
          onClick={closeSidebar}
        ></div>
      )}
    </div>
  )
}

