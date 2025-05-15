"use client";

import {
  BadgeCheck,
  MapPin,
  Wallet,
  Briefcase,
  Calendar,
  BarChart2,
} from "lucide-react";
import { getJob } from "@/lib/apis";
import { parseDate } from "@/lib/utils";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { use } from "react";
import LoadingSpinner from "@/components/ui/loader";

export default function JobDetailsPage({ params }) {
  const { jobId } = use(params);

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["job", jobId],
    queryFn: () => getJob(jobId),
    enabled: !!jobId,
  });

  if (isLoading)
    return (
      <div className="-mt-36">
        <LoadingSpinner />
      </div>
    );
  if (isError)
    return (
      <div className="text-red-500 text-sm">
        {error.message || "Failed to load jobs"}
      </div>
    );

  const job = data?.job;

  const formattedDate = parseDate(job.createdAt);

  if (!job) {
    return <div className="p-6 text-destructive">Job not found</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-8 bg-card text-foreground rounded-xl shadow-lg mt-12 border">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden cursor-pointer border-2 border-gray-300">
            <img
              src={job.company.logo}
              alt="Google Logo"
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{job.title}</h1>
            <p className="text-sm text-muted-foreground">{job.location}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/dashboard/job/apply/${jobId}`}
            className="px-8 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm shadow-sm hover:bg-primary/80 hover:shadow cursor-pointer active:bg-primary/90 transition-all duration-200"
          >
            Apply Now
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm text-muted-foreground mb-8">
        <div className="flex items-center gap-2">
          <MapPin size={16} />
          {job.location}
        </div>
        <div className="flex items-center gap-2">
          <Briefcase size={16} />
          {job.employmentType}
        </div>
        <div className="flex items-center gap-2">
          <Wallet size={16} />
          {job.currency} {job.minSalary.toLocaleString()} - {job.currency}{" "}
          {job.maxSalary.toLocaleString()}
        </div>
        <div className="flex items-center gap-2">
          <BarChart2 size={16} />
          {job.experienceLevel}
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={16} />
          Posted on {formattedDate}
        </div>
      </div>

      <h2 className="text-lg font-semibold mb-2">Job Description</h2>
      <div
        className=" text-sm text-muted-foreground 
    [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-4
    [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 
    [&_li]:mb-2 
    [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 
    [&_a]:text-blue-600 [&_a]:underline 
    [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded 
    [&_blockquote]:border-l-4 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:mb-4
    [&_strong]:block [&_strong]:mb-2 [&_b]:block [&_b]:mb-2"
        dangerouslySetInnerHTML={{ __html: job.description }}
      />

      <div className="my-4 flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <BadgeCheck size={16} />
        Required Skills
      </div>
      <div className="flex flex-wrap gap-2">
        {job.skills.map((skill, index) => (
          <span
            key={index}
            className="px-2 py-1 text-xs rounded-md bg-muted text-muted-foreground border border-border"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
