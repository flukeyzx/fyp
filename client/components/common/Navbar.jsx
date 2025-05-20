"use client";

import { useState, useRef, useEffect } from "react";
import {
  Bell,
  ChevronRight,
  LogOut,
  Palette,
  Settings,
  User,
  User2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { logoutUser } from "@/lib/apis";
import { useToast } from "@/hooks/use-toast";
import { useToken } from "@/context/TokenContext";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const router = useRouter();
  const { user, refetch } = useAuth();
  const { setTheme } = useTheme();
  const { authToken, setAuthToken } = useToken();
  const { toast } = useToast();

  const dropdownRef = useRef(null);

  useEffect(() => {
    if (user?.avatar) {
      setProfileImage(user.avatar);
    } else {
      setProfileImage(null);
    }
  }, [user]);

  const handleLogout = async () => {
    await logoutUser(authToken);
    toast({
      title: "Logout Successful",
      description: "You have been logged out successfully.",
      variant: "default",
    });
    setAuthToken(null);
    setProfileImage(null);
    refetch();
    router.push("/");
    setIsDropdownOpen(false);
  };

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
      setIsThemeOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <nav className="w-full bg-background text-foreground px-10 py-6 h-24 flex items-center justify-between z-50">
      <div className="flex items-center gap-4">
        <div className="px-12 py-3 rounded-lg bg-transparent cursor-pointer shadow-[0_0_20px_rgba(0,131,102,0.3)] dark:shadow-[0_0_15px_rgba(0,255,255,0.3)] hover:shadow-[0_0_25px_rgba(0,131,102,0.7)] dark:hover:shadow-[0_0_25px_rgba(0,255,255,0.6)] transition-shadow duration-300">
          <img src="/assets/joblix.svg" alt="Logo" className="h-5 w-auto" />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div ref={dropdownRef} className="relative group">
          <button
            className="flex items-center justify-center rounded-full w-10 h-10 bg-popover hover:opacity-65 active:opacity-85 cursor-pointer overflow-hidden border-2 border-gray-300"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <User size={20} className="text-muted-foreground" />
            )}
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-popover text-popover-foreground backdrop-blur-xl rounded-xl shadow-2xl ring-1 ring-border/10 py-2 z-50 transition-all duration-300 animate-fade-in">
              <Link
                href="/dashboard/profile"
                className="px-4 py-2 hover:bg-card/60 flex items-center gap-2"
                onClick={() => setIsDropdownOpen(false)}
              >
                <User2 className="w-5 h-5" />
                Profile
              </Link>

              <div
                className="px-4 py-2 hover:bg-card/60 flex items-center gap-2 cursor-pointer justify-between"
                onClick={() => setIsThemeOpen(!isThemeOpen)}
              >
                <div className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Theme
                </div>
                <ChevronRight
                  className={`w-4 h-4 transform ${
                    isThemeOpen ? "rotate-90" : ""
                  }`}
                />
              </div>

              {isThemeOpen && (
                <div className="ml-6 mt-1 space-y-1">
                  <div
                    className="px-4 py-2 hover:bg-card/50 cursor-pointer rounded-md text-sm"
                    onClick={() => {
                      setTheme("light");
                    }}
                  >
                    🌞 Light
                  </div>
                  <div
                    className="px-4 py-2 hover:bg-card/50 cursor-pointer rounded-md text-sm"
                    onClick={() => {
                      setTheme("dark");
                    }}
                  >
                    🌙 Dark
                  </div>
                </div>
              )}

              <Link
                href="/dashboard/profile"
                className="px-4 py-2 hover:bg-card/60 flex items-center gap-2"
                onClick={() => setIsDropdownOpen(false)}
              >
                <Settings className="w-5 h-5" />
                Settings
              </Link>

              <div
                onClick={handleLogout}
                className="px-4 py-2 hover:bg-card/60 flex items-center gap-2 cursor-pointer"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
