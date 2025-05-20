"use client";

import { getUserCompany } from "@/lib/apis";
import JobForm from "@/components/common/JobForm";
import { useToken } from "@/context/TokenContext";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "@/components/ui/loader";
import { useEffect } from "react";

export default function CreateJobPage() {
  const { authToken } = useToken();
  const router = useRouter();

  useEffect(() => {
    if (!authToken) {
      router.push("/auth/signup");
    }
  }, []);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getUserCompany"],
    queryFn: () => getUserCompany(authToken),
    enabled: !!authToken,
  });

  useEffect(() => {
    if (data && !data.company) {
      router.push("/dashboard/company/create");
    }
  }, [data, router]);

  if (isLoading || !data) {
    return (
      <div className="-mt-36">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-500 text-sm">
        {error.message} || Oops! Something went wrong.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold">Create a New Job</h1>
        <p className="text-gray-500 mt-2">
          Fill out the form below to post a new job opening for your company
        </p>
      </div>

      <JobForm token={authToken} />
    </div>
  );
}
