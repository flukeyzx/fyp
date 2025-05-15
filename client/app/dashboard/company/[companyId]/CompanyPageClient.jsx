"use client";

import {
  Building2,
  MapPin,
  Users,
  BadgeCheck,
  Briefcase,
  Building,
  CalendarCheck2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { followCompany, getCompanyJobs } from "@/lib/apis";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useToken } from "@/context/TokenContext";
import LoadingSpinner from "@/components/ui/loader";
import JobCard from "@/components/common/JobsCard";

export default function CompanyPageClient({ company, isFollowing, token }) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { authToken } = useToken();

  const {
    data: companyJobs,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["getCompanyJobs"],
    queryFn: () => getCompanyJobs(company.id, authToken),
    enabled: !!authToken,
    select: (data) => data.jobs,
  });

  const followCompanyHandler = async () => {
    setLoading(true);
    try {
      const res = await followCompany(company.id, token);
      toast({
        title: res.message || "Company followed successfully.",
      });
      await queryClient.invalidateQueries(["getCompanyById", "getIsFollowing"]);
    } catch (error) {
      console.log("Error while following company.", error.message);
      toast({
        title: error.message || "Failed to follow company",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="-mt-36">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return <div>{error.message || "Oops! Something went wrong."}</div>;
  }

  return (
    <div className="max-w-5xl mx-auto py-12 px-6 animate-fadeIn space-y-12">
      <div className="relative h-52 w-full rounded-xl overflow-hidden shadow-md bg-muted flex items-center justify-center">
        {company.banner ? (
          <img
            src={company.banner}
            alt="Company Banner"
            width={"100%"}
            height={"100%"}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-muted-foreground text-lg"></div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="relative">
            <img
              src={company.logo}
              alt="Company Logo"
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
            />
          </div>
          <div className="flex gap-0.5">
            <div>
              <h1 className="text-3xl font-bold">{company.name}</h1>
              {company.industry && (
                <p className="flex items-center gap-2 text-muted-foreground text-sm mt-1">
                  <Building2 size={16} /> {company.industry}{" "}
                </p>
              )}
            </div>
            <BadgeCheck size={22} className="text-blue-500 mt-2" />
          </div>
        </div>
        <Button
          onClick={followCompanyHandler}
          className={` ${
            isFollowing
              ? "bg-black text-white hover:bg-black/90 dark:bg-white dark:hover:bg-white/90 dark:text-black"
              : "bg-primary hover:bg-primary/90"
          } transition-transform duration-300 hover:scale-105 cursor-pointer hover:opacity-90`}
          disabled={loading}
        >
          {loading
            ? isFollowing
              ? "Unfollowing..."
              : "Following..."
            : isFollowing
            ? "Unfollow Company"
            : "Follow Company"}
        </Button>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">About</h2>
        <div className="bg-muted/40 p-6 rounded-lg">
          <p className="leading-relaxed">
            {company.about || "No description provided yet."}
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Company Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-muted/40 p-6 rounded-lg">
          {company.location && (
            <DetailItem
              icon={<MapPin size={20} />}
              label="Location"
              value={company.location}
            />
          )}
          {company.employees && (
            <DetailItem
              icon={<Users size={20} />}
              label="Size"
              value={company.employees}
            />
          )}
          {company.companyType && (
            <DetailItem
              icon={<Building size={20} />}
              label="Type"
              value={company.companyType}
            />
          )}

          {company.foundedYear && (
            <DetailItem
              icon={<CalendarCheck2 size={20} />}
              label="Since"
              value={company.foundedYear}
            />
          )}

          {company.specialties && <div>{company.specialties}</div>}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Jobs Posted</h2>
        <div className="bg-muted/40 p-6 rounded-lg">
          <div className="grid lg:grid-cols-2 gap-4 p-4">
            {companyJobs.length > 0 ? (
              companyJobs.map((job, i) => (
                <JobCard key={i} job={job} token={authToken} />
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No jobs found.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function DetailItem({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-primary">{icon}</div>
      <div>
        <p className="text-muted-foreground text-xs">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}
