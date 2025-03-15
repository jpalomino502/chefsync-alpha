"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutGrid,
  Book,
  Utensils,
  DollarSign,
  LogOut,
  X,
  ChefHat,
  PanelLeft,
  Settings,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { textos } from "@/constants/texts";

interface SidebarTexts {
  summary: string;
  menu: string;
  command: string;
  bill: string;
  configApp: string;
  myPanel: string;
  cerrarSesion: string;
  appName: string;
}

function useWindowWidth() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return width;
}

type NavItemLabel = keyof SidebarTexts;

const navItems: { icon: React.ElementType; label: NavItemLabel; id: string }[] = [
  { icon: LayoutGrid, label: "summary", id: "Summary" },
  { icon: Utensils, label: "menu", id: "Menu" },
  { icon: Book, label: "command", id: "Command" },
  { icon: DollarSign, label: "bill", id: "Bill" },
  { icon: Settings, label: "configApp", id: "ConfigApp" },
];

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  active: boolean;
  onClick: () => void;
}

const NavItem = ({ icon: Icon, label, active, onClick }: NavItemProps) => {
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
  );
};

interface SidebarProps {
  currentUser: any;
  isOpen: boolean;
  closeSidebar: () => void;
  setActiveView: (view: string) => void;
  setIsSidebarOpen: (open: boolean) => void;
  activeView: string;
  allowedModules: string[];
  language?: string;
}

const Sidebar = ({
  currentUser,
  isOpen,
  closeSidebar,
  setActiveView,
  setIsSidebarOpen,
  activeView,
  allowedModules,
  language = "es",
}: SidebarProps) => {
  const router = useRouter();
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 1024;
  const validLanguages = ["es", "en"];
  const selectedLanguage = validLanguages.includes(language) ? language : "es";
  const t: SidebarTexts = textos.sidebar;

  const filteredNavItems = allowedModules
    ? navItems.filter((item) => allowedModules.includes(item.id))
    : navItems;

  const isEmployee = !currentUser;

  const handleGoToPanel = () => {
    const uid = currentUser?.uid;
    if (uid) {
      router.push(`/panel/${uid}`);
      closeSidebar();
    }
  };

  const handleLogoutEmployee = () => {
    const session = localStorage.getItem("employeeSession");
    localStorage.removeItem("employeeSession");
    if (session) {
      const parsed = JSON.parse(session);
      router.push(`/login/${parsed.userId}/${parsed.commerceId}`);
    } else {
      router.push("/login");
    }
  };

  const mobileVariants = {
    open: { x: 0 },
    closed: { x: -320 },
  };

  const desktopVariants = {
    open: { width: 320 },
    closed: { width: 100 },
  };

  return (
    <motion.div
      className="group fixed inset-y-0 left-0 z-[60] h-full bg-black"
      initial={false}
      animate={isMobile ? (isOpen ? "open" : "closed") : (isOpen ? "open" : "closed")}
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
            <span
              className={`text-white font-semibold text-xl truncate whitespace-nowrap transition-opacity duration-300 ${
                isOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              {t.appName || "ChefSync"}
            </span>
          </div>
          {isMobile && (
            <button onClick={closeSidebar} className="lg:hidden text-white hover:text-gray-300">
              <X className="h-6 w-6" />
            </button>
          )}
        </div>
        <nav className="flex flex-1 flex-col justify-center gap-3 px-4">
          {filteredNavItems.map((item) => (
            <NavItem
              key={item.id}
              icon={item.icon}
              label={t[item.label] || item.label}
              active={item.id === activeView}
              onClick={() => {
                setActiveView(item.id);
                closeSidebar();
              }}
            />
          ))}
        </nav>
        <div className="px-4 pb-4">
          {isEmployee ? (
            <NavItem
              icon={LogOut}
              label={t.cerrarSesion || "Cerrar sesión"}
              onClick={handleLogoutEmployee}
              active={false}
            />
          ) : (
            <NavItem
              icon={PanelLeft}
              label={t.myPanel || "Mi Panel"}
              onClick={handleGoToPanel}
              active={false}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
