"use client";

import {
  CheckCircle2,
  Plus,
  ChevronRight,
  XCircle,
  Search,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Input } from "../ui/input";
import { parseDate } from "@/lib/utils";

export default function JobList({ jobs = [] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateSort, setDateSort] = useState("newest");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredJobs = jobs
    .filter((job) => {
      if (statusFilter === "all") return true;
      return job.status?.toLowerCase() === statusFilter;
    })
    .filter((job) => {
      if (!searchQuery) return true;
      return (
        job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (job.skills || []).some((skill) =>
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    })
    .sort((a, b) => {
      if (dateSort === "newest") {
        return new Date(b.posted) - new Date(a.posted);
      } else {
        return new Date(a.posted) - new Date(b.posted);
      }
    });

  return (
    <div className="bg-card rounded-xl shadow-sm overflow-hidden mt-8">
      <div className="p-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Jobs Posted</h2>
        <Link
          href="/dashboard/job/create"
          className="flex items-center px-3 py-2 bg-secondary text-secondary-foreground rounded-lg cursor-pointer hover:opacity-90 hover:scale-[1.02] transition"
        >
          <Plus className="h-4 w-4 mr-2" />
          Post a new Job
        </Link>
      </div>

      <div className="pb-12 px-8 border-b border-foreground/50 flex flex-wrap gap-4">
        <div className="flex rounded-l-lg flex-1 max-w-md">
          <Input
            type="text"
            placeholder="Search jobs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="!h-10 !border-secondary"
          />
        </div>

        <div className="flex rounded-lg border border-secondary overflow-hidden">
          {["all", "open", "close"].map((filter) => (
            <button
              key={filter}
              onClick={() => setStatusFilter(filter)}
              className={`px-4 py-2 text-sm font-medium flex-1 cursor-pointer ${
                statusFilter === filter
                  ? "bg-secondary text-secondary-foreground"
                  : "text-secondary-foreground/80 hover:bg-secondary hover:text-secondary-foreground/80"
              }`}
            >
              {filter === "all"
                ? "All"
                : filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex rounded-lg border border-secondary overflow-hidden">
          {["newest", "oldest"].map((sort) => (
            <button
              key={sort}
              onClick={() => setDateSort(sort)}
              className={`px-4 py-2 text-sm font-medium flex items-center gap-2 cursor-pointer ${
                dateSort === sort
                  ? "bg-secondary text-secondary-foreground"
                  : "text-secondary-foreground/80 hover:bg-secondary hover:text-secondary-foreground/80"
              }`}
            >
              <Calendar className="w-4 h-4" />
              {sort.charAt(0).toUpperCase() + sort.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="divide-y divide-foreground/50">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => {
            const status = job.status?.toLowerCase();
            const statusColor =
              status === "open"
                ? "bg-blue-100 text-blue-800"
                : status === "close"
                ? "bg-red-100 text-red-800"
                : "bg-gray-200 text-gray-800";

            const StatusIcon =
              status === "open"
                ? CheckCircle2
                : status === "close"
                ? XCircle
                : CheckCircle2;

            return (
              <Link
                key={job.id}
                href={`/dashboard/job/details/${job.id}`}
                className="block p-6 hover:bg-primary/10 transition"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}
                      >
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {job.status
                          ? job.status.charAt(0).toUpperCase() +
                            job.status.slice(1)
                          : "Unknown"}
                      </span>
                      <span className="text-sm text-foreground/50">
                        Posted on {parseDate(job.createdAt) || "Unknown date"}
                      </span>
                    </div>
                    <h3 className="mt-2 text-lg font-semibold text-foreground">
                      {job.title || "Untitled Job"}
                    </h3>
                    <div
                      className="mt-2 line-clamp-3 text-sm text-muted-foreground"
                      dangerouslySetInnerHTML={{ __html: job.description }}
                    />
                    <div className="mt-3 flex flex-wrap gap-2">
                      {(job.skills || []).map((skill, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/30 text-foreground/75"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="ml-4 flex flex-col items-end">
                    <div className="flex items-center gap-0.5 text-sm font-semibold text-foreground">
                      {job._count.jobApplication}
                      <span className="text-sm font-normal text-foreground/60 ml-1">
                        {job._count.jobApplication === 1
                          ? "application"
                          : "applications"}
                      </span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-foreground/70 mt-4" />
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <div className="p-6 text-center text-gray-500">
            <p>No jobs found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
