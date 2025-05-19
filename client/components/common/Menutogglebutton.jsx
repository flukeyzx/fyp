"use client";

import { Menu } from "lucide-react";

export default function MenuToggleButton({ isOpen, setIsOpen }) {
  return (
    <div
      className="flex items-center justify-center px-3 py-2 rounded-md cursor-pointer hover:opacity-65 active:opacity-85"
      onClick={() => setIsOpen(!isOpen)}
    >
      <Menu size={24} className="text-inherit" />
    </div>
  );
}
