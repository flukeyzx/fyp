"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      router.push(`/dashboard/browse?q=${encodeURIComponent(trimmedQuery)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="max-w-2xl w-full mx-auto m-10">
      <div className="flex items-center rounded-xl transition-all duration-300 gap-2 ">
        <div className="relative flex-1">
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search with any keyword, job title or skill..."
            className="w-full !py-3 !px-6 !rounded-full !border-secondary-foreground/60 !focus-with:ring-none placeholder:text-secondary-foreground/70 text-secondary-foreground shadow-md shadow-secondary/10 bg-background/10 hover:bg-background/20 focus:bg-background/20 focus:shadow-lg focus:shadow-secondary/20 transition-all duration-300"
            aria-label="Search input"
          />
          <Search
            className="absolute right-4 top-1/2 transform -translate-y-1/2"
            size={20}
          />
        </div>
        <Button className="bg-gradient-to-r from-secondary/70 via-primary/70 to-primary/90 hover:opacity-90 hover:scale-[1.02] cursor-pointer font-semibold py-6 px-8 rounded-full transition-all duration-300 hover:shadow-lg">
          Search
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
