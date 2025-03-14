"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { LayoutGrid, Book, Utensils, DollarSign, LogOut, X, ChefHat, PanelLeft, Settings } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { auth } from "@/services/firebase"

function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024)

  useEffect(() => {
    if (typeof window === "undefined") return

    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return width
}

const texts = {
  summary: "Resumen",
  menu: "Menú",
  command: "Comanda",
  bill: "Cuenta",
  ConfigApp: "Configuración",
  myPanel: "Mi Panel",
}

const navItems = [
  { icon: LayoutGrid, label: "summary", id: "Resumen", path: "" },
  { icon: Utensils, label: "menu", id: "Menu", path: "menu" },
  { icon: Book, label: "command", id: "Command", path: "command" },
  { icon: DollarSign, label: "bill", id: "Bill", path: "bill" },
  { icon: Settings, label: "ConfigApp", id: "ConfigApp", path: "config" },
]

interface NavItemProps {
  icon: React.ElementType
  label: string
  active: boolean
  href?: string
  onClick?: () => void
}

const NavItem = ({ icon: Icon, label, active, href, onClick }: NavItemProps) => {
  if (href) {
    return (
      <Link
        href={href}
        className={`flex w-full items-center gap-5 rounded-2xl p-4 text-base transition-all duration-300 ease-in-out ${
          active ? "text-white bg-white/8" : "text-white/60 hover:bg-white/5 hover:text-white"
        }`}
      >
        <Icon className="h-6 w-6 shrink-0 ml-[6px]" />
        <span className="truncate whitespace-nowrap">{label}</span>
      </Link>
    )
  }

  return (
    <button
      className={`flex w-full items-center gap-5 rounded-2xl p-4 text-base transition-all duration-300 ease-in-out ${
        active ? "text-white bg-white/8" : "text-white/60 hover:bg-white/5 hover:text-white"
      }`}
      onClick={onClick}
    >
      <Icon className="h-6 w-6 shrink-0 ml-[6px]" />
      <span className="truncate whitespace-nowrap">{label}</span>
    </button>
  )
}

interface SidebarProps {
  userId: string
  commerceId: string
  isOpen: boolean
  closeSidebar: () => void
  setIsSidebarOpen: (isOpen: boolean) => void
  activeView: string
  allowedModules?: string[]
}

const DashboardSidebar = ({
  userId,
  commerceId,
  isOpen,
  closeSidebar,
  setIsSidebarOpen,
  activeView,
  allowedModules,
}: SidebarProps) => {
  const router = useRouter()
  const windowWidth = useWindowWidth()
  const isMobile = windowWidth < 1024

  const t = texts

  const filteredNavItems = allowedModules ? navItems.filter((item) => allowedModules.includes(item.id)) : navItems

  const isEmployee = false

  const handleGoToPanel = () => {
    router.push(`/user/${userId}/panel`)
    closeSidebar()
  }

  const handleLogoutEmployee = () => {
    const session = localStorage.getItem("employeeSession")
    localStorage.removeItem("employeeSession")
    if (session) {
      const parsedSession = JSON.parse(session)
      router.push(`/login/${parsedSession.userId}/${parsedSession.commerceId}`)
    } else {
      router.push("/login")
    }
  }

  const handleLogoutAdmin = () => {
    auth.signOut().then(() => {
      router.push("/")
    })
  }

  const mobileVariants = {
    open: { x: 0 },
    closed: { x: -320 },
  }

  const desktopVariants = {
    open: { width: 320 },
    closed: { width: 100 },
  }

  return (
    <motion.div
      className="group fixed inset-y-0 left-0 z-[60] h-full bg-black"
      initial={false}
      animate={isMobile ? (isOpen ? "open" : "closed") : isOpen ? "open" : "closed"}
      variants={isMobile ? mobileVariants : desktopVariants}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      onMouseEnter={() => setIsSidebarOpen(true)}
      onMouseLeave={() => setIsSidebarOpen(false)}
      style={isMobile ? { width: 320 } : {}}
    >
      <div className="flex h-full flex-col justify-between">
        <div className="flex h-24 items-center justify-between px-6">
          <div className="flex items-center pl-2 gap-2">
            <ChefHat className="h-6 w-6 text-white ml-[6px]" />
            <span className={`text-white font-semibold text-xl truncate whitespace-nowrap transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}>
              ChefSync
            </span>
          </div>
          <button onClick={closeSidebar} className="lg:hidden text-white hover:text-gray-300">
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex flex-1 flex-col justify-center gap-3 px-4">
          {filteredNavItems.map((item) => (
            <NavItem
              key={item.id}
              icon={item.icon}
              label={t[item.label as keyof typeof texts]}
              active={item.id === activeView}
              href={`/user/${userId}/commerce/${commerceId}/dashboard${item.path ? `/${item.path}` : ""}`}
            />
          ))}
        </nav>
        <div className="px-4 pb-4">
          {isEmployee ? (
            <NavItem icon={LogOut} label="Cerrar sesión" onClick={handleLogoutEmployee} active={false} />
          ) : (
            <>
              <NavItem icon={PanelLeft} label={t.myPanel} onClick={handleGoToPanel} active={false} />
              <NavItem icon={LogOut} label="Cerrar sesión" onClick={handleLogoutAdmin} active={false} />
            </>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default DashboardSidebar
