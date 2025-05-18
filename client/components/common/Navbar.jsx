"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./../ui/button";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const router = useRouter();
  const { user } = useAuth();

  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);

  useEffect(() => {
    if (user?.avatar) {
      setProfileImage(user.avatar);
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
    setIsDropdownOpen(false);
  };

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }

    if (
      notificationRef.current &&
      !notificationRef.current.contains(event.target)
    ) {
      setIsNotificationsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <nav className="w-full bg-background text-foreground px-6 py-3 h-20 flex items-center justify-between z-50">
      <div className="flex items-center gap-4">
        <div>
          <img src="/assets/joblix.svg" alt="Logo" className="h-6 w-auto" />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div ref={notificationRef} className="relative group">
          <Button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="relative p-2 border border-primary/15 rounded-lg transition duration-200 bg-popover text-card-foreground hover:opacity-75 hover:bg-card/90 active:opacity-60 cursor-pointer"
          >
            <Bell size={30} />
            <span className="absolute top-2 right-2 flex items-center justify-center w-2 h-2 text-xs font-bold bg-red-500 rounded-full"></span>
          </Button>

          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-popover text-popover-foreground backdrop-blur-lg rounded-lg shadow-lg py-2 cursor-pointer">
              <div className="px-4 py-2 hover:bg-primary-light hover:text-primary">
                <p>New job posting available!</p>
              </div>
              <div className="px-4 py-2 hover:bg-primary-light hover:text-primary">
                <p>Your profile has been viewed.</p>
              </div>
              <div className="px-4 py-2 hover:bg-primary-light hover:text-primary">
                <p>You have a new message.</p>
              </div>
            </div>
          )}
        </div>

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
              <User size={20} className="text-gray-600" />
            )}
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-popover text-popover-foreground backdrop-blur-lg rounded-lg shadow-lg py-2 z-50">
              <Link
                href="./../../dashboard/profile"
                className="block px-4 py-2 hover:bg-primary-light hover:text-primary"
                onClick={() => setIsDropdownOpen(false)}
              >
                Profile
              </Link>
              <Link
                href="/settings"
                className="block px-4 py-2 hover:bg-primary-light hover:text-primary"
                onClick={() => setIsDropdownOpen(false)}
              >
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-primary-light hover:text-primary"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
