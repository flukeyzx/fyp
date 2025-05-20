"use client";
import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Briefcase,
  Eye,
  FileText,
  TrendingUp,
  BarChart2,
  ArrowRight,
  Calendar,
} from "lucide-react";
import Link from "next/link";

const companyStats = {
  totalApplications: 124,
  unseenApplications: 28,
  liveJobs: 9,
  closedJobs: 4,
};

const dummyJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    applications: 42,
    unseenApplications: 8,
    status: "live",
    postedDate: new Date().toISOString().split("T")[0],
  },
  {
    id: 2,
    title: "UX/UI Designer",
    applications: 36,
    unseenApplications: 5,
    status: "live",
    postedDate: new Date(Date.now() - 86400000).toISOString().split("T")[0], // yesterday
  },
];

export default function CompanyDashboard() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () =>
    setCurrentIndex((prev) => (prev + 1) % dummyJobs.length);
  const handlePrev = () =>
    setCurrentIndex((prev) => (prev === 0 ? dummyJobs.length - 1 : prev - 1));

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Company Hiring Dashboard
        </h2>
        <p className="text-muted-foreground">
          Manage your job postings and applications
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <Link href="/dashboard/company/applications" className="group">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 p-6 rounded-xl border border-blue-200 dark:border-blue-800 shadow-sm transition-all hover:shadow-md group-hover:border-blue-300 dark:group-hover:border-blue-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-300 mb-1">
                  Total Applications
                </p>
                <p className="text-3xl font-bold text-blue-800 dark:text-blue-100">
                  {companyStats.totalApplications}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-white/50 dark:bg-black/20">
                <FileText className="w-6 h-6 text-blue-600 dark:text-blue-300" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-blue-600 dark:text-blue-300">
              <span>View all</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </Link>

        <Link
          href="/dashboard/company/applications?filter=unseen"
          className="group"
        >
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 p-6 rounded-xl border border-purple-200 dark:border-purple-800 shadow-sm transition-all hover:shadow-md group-hover:border-purple-300 dark:group-hover:border-purple-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-300 mb-1">
                  Unseen Applications
                </p>
                <p className="text-3xl font-bold text-purple-800 dark:text-purple-100">
                  {companyStats.unseenApplications}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-white/50 dark:bg-black/20">
                <Eye className="w-6 h-6 text-purple-600 dark:text-purple-300" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-purple-600 dark:text-purple-300">
              <span>Review now</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </Link>

        <Link href="/dashboard/company/jobs?filter=live" className="group">
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 p-6 rounded-xl border border-green-200 dark:border-green-800 shadow-sm transition-all hover:shadow-md group-hover:border-green-300 dark:group-hover:border-green-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-300 mb-1">
                  Live Jobs
                </p>
                <p className="text-3xl font-bold text-green-800 dark:text-green-100">
                  {companyStats.liveJobs}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-white/50 dark:bg-black/20">
                <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-300" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600 dark:text-green-300">
              <span>Manage jobs</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </Link>

        <Link href="/dashboard/company/jobs?filter=closed" className="group">
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 p-6 rounded-xl border border-orange-200 dark:border-orange-800 shadow-sm transition-all hover:shadow-md group-hover:border-orange-300 dark:group-hover:border-orange-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600 dark:text-orange-300 mb-1">
                  Closed Jobs
                </p>
                <p className="text-3xl font-bold text-orange-800 dark:text-orange-100">
                  {companyStats.closedJobs}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-white/50 dark:bg-black/20">
                <BarChart2 className="w-6 h-6 text-orange-600 dark:text-orange-300" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-orange-600 dark:text-orange-300">
              <span>View analytics</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </Link>
      </div>

      <div className="relative mb-8">
        <h3 className="text-xl font-semibold text-foreground mb-4">
          Recent Job Postings
        </h3>

        <div className="relative">
          {dummyJobs.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-background p-2 rounded-full shadow-md border border-border hover:bg-accent transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-background p-2 rounded-full shadow-md border border-border hover:bg-accent transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          <Link
            href={`/dashboard/company/jobs/${dummyJobs[currentIndex]?.id}`}
            className="block"
          >
            <div className="bg-card border border-border rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md hover:border-primary/50 group">
              <div
                className={`absolute right-7 top-5 inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                  dummyJobs[currentIndex]?.status === "live"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                    : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                }`}
              >
                {dummyJobs[currentIndex]?.status === "live" ? "Live" : "Closed"}
              </div>

              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-24 h-24 flex items-center justify-center bg-muted rounded-lg flex-shrink-0">
                  <Briefcase className="w-10 h-10 text-muted-foreground" />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {dummyJobs[currentIndex]?.title || "No title"}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <FileText className="w-5 h-5" />
                      <span>
                        {dummyJobs[currentIndex]?.applications || 0}{" "}
                        applications
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Eye className="w-5 h-5" />
                      <span>
                        {dummyJobs[currentIndex]?.unseenApplications || 0} new
                        to review
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-5 h-5" />
                      <span>
                        Posted: {dummyJobs[currentIndex]?.postedDate || "N/A"}
                      </span>
                    </div>
                  </div>
                  <div className="absolute right-5 top-[40%] mt-6 inline-flex items-center text-muted-foreground opacity-70">
                    <span>Click anywhere to view details</span>
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
