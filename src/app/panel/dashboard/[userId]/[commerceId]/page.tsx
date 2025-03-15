"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "@/components/pages/dashboard/sidebar";
import Header from "@/components/pages/dashboard/header";
import Summary from "@/components/pages/dashboard/summary";
import Menu from "@/components/pages/dashboard/menu";
import Command from "@/components/pages/dashboard/command";
import Bill from "@/components/pages/dashboard/bill";
import ConfigApp from "@/components/pages/dashboard/configApp";

const Dashboard = () => {
  const { userId, commerceId } = useParams();
  const router = useRouter();
  const [activeView, setActiveView] = useState("Summary");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [allowedModules, setAllowedModules] = useState<string[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const currentUser = JSON.parse(storedUser);
      if (currentUser.uid !== userId) router.push("*");
      setAllowedModules(["Summary", "Menu", "Command", "Bill", "ConfigApp"]);
    } else {
      const session = localStorage.getItem("employeeSession");
      if (session) {
        const parsed = JSON.parse(session);
        setAllowedModules(parsed.allowedModules || []);
      } else {
        router.push("/login");
      }
    }
  }, [userId, router]);

  useEffect(() => {
    localStorage.setItem("activeView", activeView);
  }, [activeView]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);
  const commerceIdStr = Array.isArray(commerceId) ? commerceId[0] : commerceId;

  return (
    <div className="relative bg-black h-screen overflow-hidden">
      <Sidebar
        currentUser={JSON.parse(localStorage.getItem("user") || "null")}
        isOpen={isSidebarOpen}
        closeSidebar={closeSidebar}
        setActiveView={setActiveView}
        setIsSidebarOpen={setIsSidebarOpen}
        activeView={activeView}
        language="es"
        allowedModules={allowedModules}
      />
      <Header
        toggleSidebar={toggleSidebar}
        pageTitle={
          activeView === "Summary"
            ? "Resumen"
            : activeView === "Menu"
            ? "Menú"
            : activeView === "Command"
            ? "Comanda"
            : activeView === "Bill"
            ? "Cuenta"
            : activeView === "ConfigApp"
            ? "Configuración"
            : ""
        }
      />
      <div
        className={`flex flex-col h-screen pt-16 lg:pt-0 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "lg:ml-[320px]" : "lg:ml-[100px]"
        }`}
      >
        <main className="flex-1 overflow-auto bg-white lg:rounded-2xl lg:my-2 lg:mr-2">
          <div className="h-full w-full container mx-auto p-4">
            {activeView === "Summary" && <Summary commerceId={commerceIdStr} />}
            {activeView === "Menu" && <Menu commerceId={commerceIdStr} />}
            {activeView === "Command" && <Command commerceId={commerceIdStr} />}
            {activeView === "Bill" && <Bill commerceId={commerceIdStr} />}
            {activeView === "ConfigApp" && <ConfigApp commerceId={commerceIdStr} />}
          </div>
        </main>
      </div>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ease-in-out"
          onClick={closeSidebar}
        ></div>
      )}
    </div>
  );
};

export default Dashboard;
