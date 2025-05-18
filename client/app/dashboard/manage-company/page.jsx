"use client";

import LoadingSpinner from "@/components/ui/loader";
import CompanyProfile from "@/components/common/CompanyProfile";
import JobList from "@/components/common/JobList";
import { useQuery } from "@tanstack/react-query";
import { useToken } from "@/context/TokenContext";
import { getCompanyJobs, getUserCompany } from "@/lib/apis";
import { useRouter } from "next/navigation";

export default function CompanyManage() {
  const { authToken } = useToken();

  const router = useRouter();

  const {
    data: company,
    isLoading: isLoadingCompany,
    isError: isErrorCompany,
    error: errorCompany,
  } = useQuery({
    queryKey: ["getUserCompany"],
    queryFn: () => getUserCompany(authToken),
    enabled: !!authToken,
    select: (data) => data.company,
  });

  const {
    data: jobs,
    isLoading: isLoadingJobs,
    isError: isErrorJobs,
    error: errorJobs,
  } = useQuery({
    queryKey: ["getCompanyJobs", company?.id],
    queryFn: () => getCompanyJobs(company.id, authToken),
    enabled: !!company && !!company.id && !!authToken,
    select: (data) => data.jobs,
  });

  if (isLoadingCompany || isLoadingJobs) {
    return (
      <div className="-mt-36">
        <LoadingSpinner />
      </div>
    );
  }

  if (isErrorCompany || isErrorJobs) {
    return (
      <div>
        {errorCompany.message ||
          errorJobs.message ||
          "Oops something went wrong."}
      </div>
    );
  }

  return company ? (
    <div className="space-y-8">
      <CompanyProfile company={company} />
      <JobList jobs={jobs} />
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6 p-6 bg-card/80 rounded-2xl shadow-sm">
      <h2 className="text-2xl font-bold">No Company Profile Found</h2>
      <p className=" max-w-md text-sm text-muted-foreground">
        To start hiring talent on{" "}
        <span className="font-medium text-primary">Joblix</span>, you need to
        create a company profile. This helps showcase your brand and build trust
        with job seekers.
      </p>
      <button
        onClick={() => {
          router.push("/dashboard/company/create");
        }}
        className="px-6 py-3 bg-primary hover:bg-primary/80 font-medium rounded-xl transition duration-200 cursor-pointer"
      >
        Create Your Company Profile
      </button>
    </div>
  );
}
