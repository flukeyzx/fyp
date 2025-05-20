"use client";

import { getCompany, isFollowingCompany } from "@/lib/apis";
import CompanyPageClient from "./CompanyPageClient";
import { use } from "react";
import { useToken } from "@/context/TokenContext";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "@/components/ui/loader";
import { notFound } from "next/navigation";

export default function CompanyPage({ params }) {
  const { companyId } = use(params);
  const { authToken } = useToken();

  const {
    data: company,
    isLoading: isLoadingCompany,
    isError: isErrorCompany,
    error: errorCompany,
  } = useQuery({
    queryKey: ["getCompanyById"],
    queryFn: () => getCompany(companyId, authToken),
    enabled: !!authToken,
    select: (data) => data.company,
  });

  const {
    data: isFollowing,
    isLoading: isLoadingFollowing,
    isError: isErrorFollowing,
    error: errorFollowing,
  } = useQuery({
    queryKey: ["getIsFollowing"],
    queryFn: () => isFollowingCompany(companyId, authToken),
    enabled: !!authToken,
    select: (data) => data.isFollowing,
  });

  if (isLoadingCompany) {
    return (
      <div className="-mt-36">
        <LoadingSpinner />
      </div>
    );
  }

  if (isLoadingFollowing) {
    return (
      <div className="-mt-36">
        <LoadingSpinner />
      </div>
    );
  }

  if (isErrorCompany || isErrorFollowing) {
    return (
      <div className="text-red-500 text-sm">
        {errorCompany?.message || errorFollowing?.message} || Oops! something
        went wrong.
      </div>
    );
  }

  if (!company) {
    notFound();
  }

  return (
    <CompanyPageClient
      company={company}
      isFollowing={isFollowing}
      token={authToken}
    />
  );
}
