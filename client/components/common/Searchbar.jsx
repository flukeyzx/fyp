"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function searchbar() {
  return (
    <div className="flex items-center justify-center flex-1 mt-10">
      <div className=" flex items-center w-full max-w-xl">
        <Input
          type="text"
          placeholder="Search by Job Title, Keyword or Company..."
          className="p-4 pl-4 h-10 pr-12 w-full rounded-full border bg-popover shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <Button className="py-5 mx-1 bg-foreground right-0 text-background hover:opacity-60 hover:bg-foreground rounded-lg">
          <Search size={30} strokeWidth={2} />
        </Button>
      </div>
    </div>
  );
}
