"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "@/components/pages/dashboard/sidebar";
import Header from "@/components/pages/dashboard/header";
import { Summary } from "@/components/pages/dashboard/summary";
import { textos } from "@/constants/texts";

const Menu = ({ commerceId }: { commerceId: string }) => <div>Menu Component</div>;
const Command = ({ commerceId }: { commerceId: string }) => <div>Command Component</div>;
const Bill = ({ commerceId }: { commerceId: string }) => <div>Bill Component</div>;
const ConfigApp = ({ commerceId }: { commerceId: string }) => <div>ConfigApp Component</div>;

export default function Dashboard() {
  const { userId, commerceId } = useParams();
  const router = useRouter();
  const [activeView, setActiveView] = useState("Summary");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [allowedModules, setAllowedModules] = useState<string[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const t = textos.sidebar;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.uid !== userId) router.push("/");
      setCurrentUser(user);
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

  const commerceIdStr = Array.isArray(commerceId) ? commerceId[0] : (commerceId as string);

  const getPageTitle = () => {
    switch (activeView) {
      case "Summary":
        return t.summary;
      case "Menu":
        return t.menu;
      case "Command":
        return t.command;
      case "Bill":
        return t.bill;
      case "ConfigApp":
        return t.configApp;
      default:
        return "";
    }
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="relative bg-black h-screen overflow-hidden">
      <Sidebar
        currentUser={currentUser}
        isOpen={isSidebarOpen}
        closeSidebar={closeSidebar}
        setActiveView={setActiveView}
        setIsSidebarOpen={setIsSidebarOpen}
        activeView={activeView}
        allowedModules={allowedModules}
      />
      <Header toggleSidebar={toggleSidebar} pageTitle={getPageTitle()} />
      <div
        className={`flex flex-col h-screen pt-16 lg:pt-0 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "lg:ml-[320px]" : "lg:ml-[100px]"
        }`}
      >
        <main className="flex-1 no-scrollbar overflow-auto bg-white lg:rounded-2xl lg:my-2 lg:mr-2">
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
}
