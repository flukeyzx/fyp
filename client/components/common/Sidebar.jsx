import Link from "next/link";
import { Home, User, Bookmark, Compass, Dock, Building2 } from "lucide-react";
import { usePathname } from "next/navigation";
import MenuToggleButton from "./MenuToggleButton";

export default function Sidebar({ isOpen, setIsOpen }) {
  const pathname = usePathname();

  return (
    <div
      className={`fixed top-16 left-0 bottom-0 bg-background/95 py-5 px-3 ${
        isOpen ? "w-64" : "w-20"
      } transition-all duration-300 ease-in-out backdrop-blur-md border-r shadow-sm z-50 overflow-hidden`}
    >
      <div className="flex h-10 w-14 rounded-lg items-center justify-center mb-5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90">
        <MenuToggleButton isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>

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
          { href: "/dashboard/saved-jobs", icon: Bookmark, text: "Saved Jobs" },
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
                  ${isOpen ? "gap-3 px-4 justify-start" : "justify-center px-0"}
                  ${
                    isActive
                      ? "text-primary-light bg-primary dark:bg-primary-light dark:text-primary"
                      : "hover:bg-primary hover:text-primary-light dark:hover:bg-primary-light dark:hover:text-primary"
                  }
                `}
              >
                <Icon
                  size={20}
                  className={`flex-shrink-0 ${
                    isActive ? "text-priamry-light dark:text-primary" : ""
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
  );
}
