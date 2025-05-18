"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bookmark, MapPin, Banknote } from "lucide-react";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveJob } from "@/lib/apis";
import { useToast } from "@/hooks/use-toast";
import { usePathname } from "next/navigation";

export default function JobCard({ job, token }) {
  const [bookmarkLoading, setBookmarkLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const isSavedJobsPage = pathname === "/dashboard/saved-jobs";
  const isSaved = job.isSaved;

  return (
    <Link href={`/dashboard/browse/${job.id}`}>
      <Card className="flex flex-col bg-card rounded-xl shadow-md hover:shadow-lg hover:opacity-90 cursor-pointer transition-all duration-300 p-4">
        <CardContent className="flex flex-col gap-3">
          <div className="flex justify-between items-center mb-2">
            <div
              onClick={(e) => {
                e.preventDefault();
                router.push(`/dashboard/company/${job.companyId}`);
              }}
              className="flex items-center gap-2 group"
            >
              <div className="w-10 h-10 border-2 border-gray-300 rounded-full flex items-center justify-center shadow-md overflow-hidden">
                <img
                  src={job.company.logo}
                  alt="company"
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="relative group transition-all duration-200 ease-in hover:opacity-90">
                {job.company.name}
                <span className="absolute -bottom-0.5 left-0 w-0 h-[2px] bg-card-foreground transition-all duration-200 ease-in group-hover:w-full"></span>
              </span>
            </div>

            {job.employmentType && (
              <div
                className={`px-3 py-1 rounded-md text-xs font-semibold ${
                  job.employmentType === "Remote"
                    ? "bg-teal-100 text-teal-600"
                    : job.employmentType === "On-Site"
                    ? "bg-amber-100 text-amber-600"
                    : job.employmentType === "Hybrid"
                    ? "bg-sky-100 text-sky-600"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {job.employmentType}
              </div>
            )}
          </div>

          <h2 className="text-xl font-bold text-foreground leading-tight truncate">
            {job.title}
          </h2>
          <p className="flex items-center w-full gap-1 -mt-2 text-sm text-muted-foreground">
            <MapPin size={16} />
            {job.location}
          </p>

          <div className="flex flex-wrap gap-2 items-center">
            {job.skills.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-popover border border-border text-muted-foreground rounded-md"
              >
                {skill}
              </span>
            ))}
            {job.skills.length > 3 && (
              <span className="text-xs text-muted-foreground">
                +{job.skills.length - 3} more
              </span>
            )}
          </div>

          <p className="flex items-center gap-1 text-md font-bold text-primary">
            <Banknote size={20} />
            <span className="line-clamp-1">
              {job.currency} {job.minSalary.toLocaleString()} - {job.currency}{" "}
              {job.maxSalary.toLocaleString()}
            </span>
          </p>

          <div className="flex items-center gap-2 mt-auto pb-2">
            <Button
              onClick={(e) => {
                e.preventDefault();
                router.push(`/dashboard/job/apply/${job.id}`);
              }}
              className="w-full bg-primary hover:opacity-90 text-primary-foreground cursor-pointer"
            >
              Apply Now
            </Button>
            <Button
              className="w-10 h-10 bg-neutral-600 hover:bg-neutral-700 flex items-center justify-center"
              disabled={bookmarkLoading}
              onClick={async (e) => {
                e.preventDefault();
                setBookmarkLoading(true);
                try {
                  const res = await saveJob(job.id, token);
                  toast({
                    title: res.message || "Job saved successfully.",
                  });

                  await queryClient.invalidateQueries(["jobs", "getSavedJobs"]);
                } catch (err) {
                  console.error("Error saving job", err);

                  const errorMessage =
                    err?.response?.data?.message ||
                    err?.message ||
                    "Something went wrong while saving the job.";

                  toast({
                    title: "Save Failed",
                    description: errorMessage,
                    variant: "destructive",
                  });
                } finally {
                  setBookmarkLoading(false);
                }
              }}
            >
              {bookmarkLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : isSavedJobsPage || isSaved ? (
                <Bookmark size={18} fill="currentColor" />
              ) : (
                <Bookmark size={18} />
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
