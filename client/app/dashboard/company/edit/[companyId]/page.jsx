"use client";

import { getCompany } from "@/lib/apis";
import { useRouter } from "next/navigation";
import EditCompanyClient from "./EditCompanyClient";
import { useToken } from "@/context/TokenContext";
import { useQuery } from "@tanstack/react-query";
import { use, useEffect } from "react";
import LoadingSpinner from "@/components/ui/loader";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

export default function EditCompanyPage({ params }) {
  const { companyId } = use(params);
  const router = useRouter();
  const { authToken } = useToken();
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!authToken) {
      router.push("/auth/signup");
    }
  }, []);

  const {
    data: company,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["getCompany"],
    queryFn: () => getCompany(companyId, authToken),
    enabled: !!authToken,
    select: (data) => data.company,
  });

  useEffect(() => {
    if (!isLoading && company && user && user?.id !== company.ownerId) {
      toast({
        title: "You cannot edit the details of this company.",
      });
      router.push("/dashboard/profile");
    }
  }, [company, user, router, toast]);

  if (isLoading) {
    return (
      <div className="-mt-36">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return <div>{error?.message} || Oops! something went wrong.</div>;
  }

  if (!company || !user || user?.id !== company.ownerId) return null;

  return <EditCompanyClient company={company} token={authToken} />;
}
