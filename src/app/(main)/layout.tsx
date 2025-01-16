"use client";
import React, { ReactNode, useState } from "react";
import { Menu, X } from "lucide-react";
import Aside from "@/components/Aside/Aside";
import Navbar from "@/components/Navbar/Navbar";

const Layout = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-sky-950/50 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static w-64 h-screen bg-sky-950 text-white z-30 
          transition-transform duration-300 lg:translate-x-0 
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-4 lg:hidden">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <button 
            onClick={toggleSidebar} 
            className="p-2 hover:bg-sky-900 rounded-md"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="h-[calc(100vh-64px)] overflow-y-auto">
          <Aside />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full overflow-hidden">
        <nav className="bg-white shadow-md">
          <div className="px-4 py-3 flex items-center justify-between lg:justify-end">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md hover:bg-gray-100 lg:hidden"
            >
              <Menu className="h-6 w-6 text-gray-700" />
            </button>
            <Navbar />
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-6 bg-[#eceff1] overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;