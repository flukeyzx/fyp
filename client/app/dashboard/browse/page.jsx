"use client";

import { Plus } from "lucide-react";
import JobsListWithSearch from "@/components/common/JobsListWithSearch";
import Link from "next/link";

export default function BrowsePage() {
  return (
    <div className="p-4 min-h-screen">
      <div className="relative mb-10 flex items-center justify-center">
        <div>
          <h1 className="text-5xl font-bold text-center">Browse Jobs</h1>
          <p className="text-gray-400 mt-2 text-center">
            Find the best jobs that match your skills
          </p>
        </div>

        <Link
          href={`/dashboard/job/create`}
          className="absolute cursor-pointer right-0 flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow hover:bg-primary/90 transition-all duration-300 hover:scale-105"
        >
          <Plus size={18} />
          <span className=" font-medium">Create Job</span>
        </Link>
      </div>

      <JobsListWithSearch />
    </div>
  );
}
