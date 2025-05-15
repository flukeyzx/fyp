"use client";

import { Card, CardContent } from "@/components/ui/card";
import { getSavedJobs } from "@/lib/apis";
import JobCard from "@/components/common/JobsCard";
import { FileText } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToken } from "@/context/TokenContext";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "@/components/ui/loader";
import { useEffect } from "react";

export default function SavedJobsPage() {
  const { authToken } = useToken();
  const router = useRouter();

  useEffect(() => {
    if (!authToken) {
      router.push("/auth/signup");
    }
  }, []);

  const {
    data: jobs,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["getSavedJobs"],
    queryFn: () => getSavedJobs(authToken),
    enabled: !!authToken,
    select: (data) => data.jobs,
  });

  if (isLoading) {
    return (
      <div className="-mt-36">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-500 text-sm">
        {error.message} || Oops! something went wrong.
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="flex justify-center items-center mt-24">
        <div className="w-full sm:w-96 p-6 ">
          <CardContent className="flex flex-col items-center justify-center text-center">
            <FileText size={48} className=" mb-4" />
            <h2 className="text-xl font-semibold  mb-2">No Saved Jobs</h2>
            <p className="text-sm  mb-4">
              You don't have any saved jobs at the moment. Explore and save jobs
              that interest you.
            </p>
            <Link
              href={"/dashboard/browse"}
              className="w-full bg-primary hover:opacity-90 text-primary-foreground cursor-pointer py-1.5 rounded-md"
            >
              Explore Jobs
            </Link>
          </CardContent>
        </div>
      </div>
    );
  }

  return (
    <div className="p-2 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold">Saved Jobs</h1>
        <p className="text-gray-400 mt-2">
          Here are the jobs that you have saved
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6 items-stretch">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} token={authToken} />
        ))}
      </div>
    </div>
  );
}
