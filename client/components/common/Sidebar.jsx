"use client";
import Link from "next/link";
import {
  Home,
  User,
  Bookmark,
  Compass,
  Dock,
  Building2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

export default function Sidebar({ isOpen, setIsOpen }) {
  const pathname = usePathname();

  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
        className={`fixed z-50 top-1/5 -translate-y-1/2
    h-9 w-2 flex items-center justify-center
    bg-popover hover:bg-popover/80 hover:opacity-90 cursor-pointer shadow-md
    rounded-r-full
    transition-all duration-300 ease-in-out
    ${isOpen ? "left-[16rem]" : "left-[5rem]"}
  `}
      >
        {isOpen ? (
          <ChevronLeft
            className="w-6 h-6 text-muted-foreground"
            strokeWidth={2.5}
          />
        ) : (
          <ChevronRight
            className="w-6 h-6 text-muted-foreground"
            strokeWidth={2.5}
          />
        )}
      </Button>

      <div
        className={`fixed top-24 left-0 bottom-0 bg-background/95 py-5 px-3
    ${isOpen ? "w-64" : "w-20"}
    transition-all duration-300 ease-in-out backdrop-blur-md border-r shadow-sm z-40 overflow-hidden
  `}
      >
        <div className="space-y-1">
          {[
            { href: "/dashboard", icon: Home, text: "Home" },
            { href: "/dashboard/browse", icon: Compass, text: "Browse" },
            { href: "/dashboard/profile", icon: User, text: "Profile" },
            {
              href: "/dashboard/my-applications",
              icon: Dock,
              text: "Applications",
            },
            {
              href: "/dashboard/manage-company",
              icon: Building2,
              text: "Manage Company",
            },
            {
              href: "/dashboard/saved-jobs",
              icon: Bookmark,
              text: "Saved Jobs",
            },
          ].map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);

            return (
              <div key={item.text}>
                <Link
                  href={item.href}
                  className={`flex items-center py-2.5 rounded-md transition-all duration-300 ease-in-out
                    ${
                      isOpen
                        ? "gap-3 px-4 justify-start"
                        : "justify-center px-0"
                    }
                    ${
                      isActive
                        ? "bg-primary text-primary-light dark:bg-primary-light dark:text-primary"
                        : "hover:bg-primary hover:text-primary-light dark:hover:bg-primary-light dark:hover:text-primary"
                    }
                  `}
                >
                  <Icon
                    size={20}
                    className={`flex-shrink-0 ${
                      isActive && "dark:text-primary text-primary-light"
                    }`}
                  />
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? "w-auto opacity-100 ml-1" : "w-0 opacity-0"
                    }`}
                  >
                    <span className="whitespace-nowrap">{item.text}</span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
