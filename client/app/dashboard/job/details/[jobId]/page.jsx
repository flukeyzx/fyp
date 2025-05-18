"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Briefcase,
  MapPin,
  DollarSign,
  Calendar,
  BarChart2,
  FileText,
  BadgeCheck,
  Edit,
  ListChecks,
  UserCheck,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { getJob } from "@/lib/apis";
import LoadingSpinner from "@/components/ui/loader";

export default function JobDetailPreview({ params }) {
  const { jobId } = use(params);
  const router = useRouter();

  const {
    data: job,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["getJob"],
    queryFn: () => getJob(jobId),
    enabled: !!jobId,
    select: (data) => data.job,
  });

  if (isLoading) {
    return (
      <div className="-mt-36">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return <div>{error.message || "Oops something went wrong."}</div>;
  }

  return (
    <div className=" mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-10">
        <Button
          onClick={() => router.back()}
          className="flex items-center bg-foreground p-3 rounded-lg text-background mb-4 hover:bg-foreground/90 text-sm cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to jobs
        </Button>
      </div>
      <div className="bg-popover  rounded-2xl shadow p-6 mb-6">
        <div className="flex justify-between items-start flex-wrap">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {job.title}
            </h1>
            <div className="flex items-center text-foreground/70">
              <MapPin className="w-4 h-4 mr-1 text-primary" />
              <span>{job.location}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-popover rounded-2xl shadow p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <BadgeCheck className="w-5 h-5 mr-2 text-primary" />
              Required Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm rounded-full bg-gradient-to-r from-primary/10 to-primary/20 text-primary border border-primary/30 shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-popover rounded-2xl shadow p-6 ">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-primary" />
              Job Description
            </h2>
            <div className="job-description">
              <div
                className="prose max-w-none list-disc text-foreground/60"
                dangerouslySetInnerHTML={{ __html: job.description }}
              />
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-popover rounded-2xl shadow p-6 ">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <ListChecks className="w-6 h-6 mr-2 text-primary" />
              Additional Info
            </h2>
            <div className="space-y-4 p-2 text-sm">
              <div className="flex items-center text-foreground/75">
                <Briefcase className="w-4 h-4 mr-2 text-primary" />
                <span>{job.employmentType}</span>
              </div>
              <div className="flex items-center text-foreground/75">
                <DollarSign className="w-4 h-4 mr-2 text-primary" />
                <span>
                  {job.currency} {job.minSalary.toLocaleString()} -{" "}
                  {job.currency} {job.maxSalary.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center text-foreground/75">
                <BarChart2 className="w-4 h-4 mr-2 text-primary" />
                <span>{job.experienceLevel}</span>
              </div>
              <div className="flex items-center text-foreground/75">
                <Calendar className="w-4 h-4 mr-2 text-primary" />
                <span>Posted on {job.postedDate}</span>
              </div>
            </div>
          </div>
          <Link
            href={`/dashboard/manage-company/applications/${job.id}`}
            className="block bg-popover rounded-2xl shadow p-6 hover:bg-card transition"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center text-foreground/85">
                <UserCheck className="w-5 h-5 mr-2 text-primary" />
                <div>
                  <div className="text-md font-semibold">
                    Applications Received
                  </div>
                  <div className="text-sm text-foreground/50">
                    {job.applicationCount}{" "}
                    {job.applicationCount === 1
                      ? "application"
                      : "applications"}
                  </div>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-foreground/75" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
