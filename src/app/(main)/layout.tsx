"use client";
import React, { ReactNode, useState } from "react";
import { Menu, X } from "lucide-react";
import Aside from "@/components/Aside/Aside";
import Navbar from "@/components/Navbar/Navbar";

const Layout = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Overlay for Sidebar on Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-sky-950 bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky inset-y-0 left-0 
          w-64 text-white bg-sky-950
          transform transition-transform duration-300 ease-in-out z-30
          lg:translate-x-0 h-full
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Mobile Sidebar Header */}
        <div className="flex justify-between items-center p-4 lg:hidden">
          <h1 className="text-xl font-bold text-white">Dashboard</h1>
          <button onClick={toggleSidebar} className="p-2 text-white">
            <X className="h-6 w-6" />
          </button>
        </div>
        <Aside />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Navbar */}
        <nav className="bg-white shadow-md z-10 sticky top-0">
          <div className="px-4 py-3 flex items-center justify-between lg:justify-end">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md lg:hidden hover:bg-gray-100 focus:outline-none"
            >
              <Menu className="h-6 w-6 text-gray-700" />
            </button>
            <Navbar />
          </div>
        </nav>

        {/* Content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 md:p-4 bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
