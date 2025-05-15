"use client";

import { useState } from "react";
import Sidebar from "@/Components/common/Sidebar";
import Navbar from "@/Components/common/Navbar";

export default function RootLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 left-0 w-full z-50 h-16 bg-background">
        <Navbar />
      </header>

      <div className="flex flex-1">
        <aside
          className={`fixed top-16 left-0 bottom-0 z-40 bg-background text-foreground transition-all duration-300 ease-in-out ${
            isSidebarOpen ? "w-64" : "w-20"
          }`}
        >
          <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        </aside>

        <div
          className="flex-1 transition-all duration-300 ease-in-out"
          style={{ marginLeft: isSidebarOpen ? "16rem" : "5rem" }}
        >
          <main className="px-8 py-4">{children}</main>
        </div>
      </div>
    </div>
  );
}
