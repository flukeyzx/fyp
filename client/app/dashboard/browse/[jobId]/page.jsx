"use client";

import {
  BadgeCheck,
  MapPin,
  Wallet,
  Briefcase,
  Calendar,
  BarChart2,
  ArrowLeft,
  ChevronRight,
  Clock,
  Users,
  BriefcaseBusiness,
} from "lucide-react";
import { getJob } from "@/lib/apis";
import { parseDate } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "@/components/ui/loader";
import { Button } from "@/components/ui/button";
import { use } from "react";

export default function JobDetailsPage({ params }) {
  const router = useRouter();
  const { jobId } = use(params);

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["job", jobId],
    queryFn: () => getJob(jobId),
    enabled: !!jobId,
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner />
      </div>
    );

  if (isError)
    return (
      <div className="max-w-5xl mx-auto p-8">
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg">
          {error.message || "Failed to load job details"}
        </div>
      </div>
    );

  const job = data?.job;
  const formattedDate = parseDate(job?.createdAt);

  if (!job) {
    return (
      <div className="max-w-5xl mx-auto p-8">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-600 p-4 rounded-lg">
          Job not found
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Button
          onClick={() => router.back()}
          className="flex items-center gap-2 bg-foreground text-background/80 hover:bg-foreground/90 hover:opacity-80 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Jobs
        </Button>
      </div>

      <div>
        <div className="rounded-2xl p-8 bg-gradient-to-r from-primary/5 to-primary/10 border-b border-border/50">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-6">
              <div
                onClick={() =>
                  router.push(`/dashboard/company/${job.company.id}`)
                }
                className="w-22 h-22 rounded-full overflow-hidden border-2 border-white shadow-md bg-white cursor-pointer"
              >
                <img
                  src={job.company.logo}
                  alt={`${job.company.name} Logo`}
                  className="object-contain w-full h-full"
                />
              </div>
              <div className="mt-3">
                <h1 className="text-3xl font-bold text-foreground">
                  {job.title}
                </h1>
                <div className="flex items-center gap-3 mt-1">
                  <p className="text-muted-foreground flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    {job.location}
                  </p>
                  <span className="text-muted-foreground/50">•</span>
                  <p className="text-muted-foreground">{job.company.name}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex items-center justify-center bg-emerald-900/20 gap-2 p-4 rounded-xl">
                <div className="bg-green-900/40 p-2 rounded-lg">
                  <BriefcaseBusiness className="text-green-500" />
                </div>
                <div>
                  <h2 className="text-sm opacity-90">Applications</h2>
                  <p className="text-xs opacity-75">28 People Clicked Apply</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-8 border-b border-border/50">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-background to-muted/50 p-4 rounded-lg border border-border/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Briefcase className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="font-medium">{job.employmentType}</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-background to-muted/50 p-4 rounded-lg border border-border/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 rounded-lg dark:bg-emerald-900/30">
                  <Wallet className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Salary</p>
                  <p className="font-medium">
                    {job.currency} {job.minSalary.toLocaleString()} -{" "}
                    {job.currency} {job.maxSalary.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-background to-muted/50 p-4 rounded-lg border border-border/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg dark:bg-purple-900/30">
                  <BarChart2 className="w-5 h-5 text-purple-500 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Experience</p>
                  <p className="font-medium">{job.experienceLevel}</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-background to-muted/50 p-4 rounded-lg border border-border/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg dark:bg-yellow-900/30">
                  <Calendar className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Posted</p>
                  <p className="font-medium">{formattedDate}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row mt-4 gap-2">
          <div className="lg:w-2/3 p-8 overflow-y-auto custom-scroll">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Job Description
              </h2>
              <div
                className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: job.description }}
              />
            </div>
          </div>
          <div className="lg:w-1/3 border-l border-border/50 p-8">
            <div className="sticky top-6">
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <BadgeCheck className="w-5 h-5 text-primary" />
                  Required Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 text-sm rounded-full bg-muted text-muted-foreground border border-border/50 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-colors cursor-pointer"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  About {job.company.name}
                </h3>

                <div className="text-sm text-muted-foreground">
                  <p className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {job.company.location}
                  </p>

                  <p className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    {job.company.employees} employees
                  </p>
                </div>
              </div>

              <Link
                href={`/dashboard/job/apply/${jobId}`}
                className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-primary/90 text-primary-foreground font-medium shadow-sm hover:shadow-md cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 hover:opacity-80"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
