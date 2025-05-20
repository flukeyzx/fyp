"use client";

import JobsListWithSearch from "@/components/common/JobsListWithSearch";
import { useSearchParams } from "next/navigation";

export default function BrowsePage() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q");

  return (
    <div className="p-4 min-h-screen">
      <div className="relative mb-10 flex items-center justify-center">
        <div>
          <h1 className="text-5xl font-bold text-center">Explore Jobs</h1>
          <p className="text-muted-foreground mt-2 text-center">
            Find the best jobs that match your skills
          </p>
        </div>
      </div>

      <JobsListWithSearch initialSearchQuery={q} />
    </div>
  );
}
