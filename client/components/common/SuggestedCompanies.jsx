"use client";

import {
  Building2,
  MapPin,
  ArrowRight,
  Zap,
  Users,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getTopFollowedCompanies } from "@/lib/apis";
import LoadingSpinner from "../ui/loader";
import { useToken } from "@/context/TokenContext";
import { useRouter } from "next/navigation";

const SuggestedCompanies = () => {
  const { authToken } = useToken();
  const router = useRouter();

  const {
    data: companies,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["topFollowedCompanies"],
    queryFn: () => getTopFollowedCompanies(authToken),
    enabled: !!authToken,
    select: (data) => data.companies,
  });

  if (isLoading) {
    return (
      <div className="mt-20">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-500">
          Error fetching companies: {error.message}
        </p>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4">
          <Zap className="w-4 h-4" />
          <span>Top Employers</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
          Discover Top Followed Companies
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore opportunities at innovative companies across industries
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {companies.map((company) => (
          <div
            key={company.id}
            onClick={() => router.push(`/dashboard/company/${company.id}`)}
            className="relative rounded-xl backdrop-blur-md border bg-gradient-to-tl from-popover/40 via-card/50 to-muted/40 hover:bg-primary/5 cursor-pointer py-6 px-4 shadow-md hover:shadow-xl transition group overflow-hidden"
          >
            <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-primary transition duration-300 pointer-events-none"></div>

            <div className="h-40 flex items-center justify-center">
              <img
                src={company.logo}
                alt={`${company.name} logo`}
                className="h-20 w-20 object-contain rounded-lg bg-background p-2 shadow-md group-hover:scale-105 transition-transform"
              />
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold group-hover:text-primary transition">
                  {company.name}
                </h3>
                <span className="text-xs text-primary font-medium">
                  {company._count.followers} Followers
                </span>
              </div>

              <div className="text-sm  space-y-1">
                <div className="flex items-center text-muted-foreground gap-1">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{company.location}</span>
                </div>
                <div className="flex items-center text-muted-foreground gap-1">
                  <Building2 className="w-4 h-4 text-primary" />
                  <span>{company.industry}</span>
                </div>
              </div>

              <div className="flex justify-between text-xs text-muted-foreground font-medium pt-2">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-primary" />
                  <span>{company.employees} Employees</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>Since {company.foundedYear}</span>
                </div>
              </div>
            </div>

            <Link
              href={`/dashboard/company/${company.id}`}
              className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
            >
              <div className="p-2 rounded-full bg-primary/20 hover:bg-primary/40 transition-colors">
                <ArrowRight className="w-5 h-5 text-primary" />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SuggestedCompanies;
