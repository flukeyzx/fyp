"use client";

import { useState } from "react";
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  Mail,
  Calendar,
  ArrowLeft,
  Building2,
  MailIcon,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { applicationsData, jobs } from "./../../DumyData";
import { useQuery } from "@tanstack/react-query";
import { useToken } from "@/context/TokenContext";
import { getAllJobApplications } from "@/lib/apis";
import LoadingSpinner from "@/components/ui/loader";
import { use } from "react";
import { Button } from "@/components/ui/button";

export default function ApplicationsPage({ params }) {
  const { jobId } = use(params);
  const router = useRouter();
  const { authToken } = useToken();

  const [activeFilter, setActiveFilter] = useState("all");
  const [dateSort, setDateSort] = useState("newest");

  const {
    data: applications,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["getAllJobApplications"],
    queryFn: () => getAllJobApplications(jobId, authToken),
    enabled: !!authToken,
    select: (data) => data.applications,
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

  const filteredApplications = (applications || [])
    .filter((app) => app.jobId === jobId)
    .filter((app) => {
      const status = app.status.toLowerCase();
      if (activeFilter === "all") return true;
      return status === activeFilter;
    })
    .sort((a, b) =>
      dateSort === "newest"
        ? new Date(b.applied) - new Date(a.applied)
        : new Date(a.applied) - new Date(b.applied)
    );

  const getStatusIcon = (status) => {
    const normalized = status.toLowerCase();
    const icons = {
      pending: <Clock className="w-4 h-4 text-yellow-500" />,
      shortlisted: <Mail className="w-4 h-4 text-blue-500" />,
      accepted: <CheckCircle2 className="w-4 h-4 text-green-500" />,
      rejected: <AlertCircle className="w-4 h-4 text-red-500" />,
    };
    return (
      icons[normalized] || <AlertCircle className="w-4 h-4 text-gray-500" />
    );
  };

  const getStatusColor = (status) => {
    const normalized = status.toLowerCase();
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      shortlisted: "bg-blue-100 text-blue-800",
      accepted: "bg-green-100 text-green-800",
      rejected: "bg-red-200 text-red-800",
    };
    return colors[normalized] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="max-w mx-auto p-6">
      <Button
        onClick={() => router.back()}
        className="flex items-center bg-foreground cursor-pointer rounded-lg text-background mb-4 hover:bg-foreground/90 text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Button>

      <div className="text-center mb-2">
        <h1 className="text-3xl font-bold text-foreground">Job Applications</h1>
      </div>

      <div className="mb-10 flex items-center justify-center">
        <h2 className="text-sm text-muted-foreground">
          For the role of {applications?.[0]?.job?.title}
        </h2>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex rounded-lg border border-foreground overflow-hidden">
            {["all", "pending", "shortlisted", "accepted", "rejected"].map(
              (filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 text-sm font-medium flex-1 cursor-pointer ${
                    activeFilter === filter
                      ? "bg-foreground text-background"
                      : "text-foreground/60 hover:bg-foreground hover:text-background/60"
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              )
            )}
          </div>
          <div className="flex rounded-lg border border-foreground overflow-hidden">
            {["newest", "oldest"].map((sort) => (
              <button
                key={sort}
                onClick={() => setDateSort(sort)}
                className={`px-4 py-2 text-sm font-medium flex items-center gap-2 ${
                  dateSort === sort
                    ? "bg-foreground text-background"
                    : "text-foreground/60 hover:bg-foreground hover:text-background/60"
                }`}
              >
                <Calendar className="w-4 h-4" />
                {sort.charAt(0).toUpperCase() + sort.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-foreground text-background px-4 py-1 rounded-full text-sm font-medium">
          {filteredApplications.length}{" "}
          {filteredApplications.length === 1 ? "application" : "applications"}
        </div>
      </div>

      <div className="space-y-4">
        {filteredApplications.length === 0 ? (
          <div className="flex justify-center mt-24">
            <div className="flex flex-col items-center justify-center py-10 px-6  max-w-xs w-full">
              <p className="text-lg font-semibold text-foreground">
                No Applications Found
              </p>
              <p className="text-sm text-muted-foreground mt-1 text-center">
                No applications match your current filters.
              </p>
            </div>
          </div>
        ) : (
          filteredApplications.map((application) => {
            return (
              <div
                key={application.id}
                className="rounded-lg border hover:bg-card transition-all overflow-hidden"
              >
                <Link
                  href={`/dashboard/manage-company/applications/details/${application.id}`}
                  className="block p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <img
                      src={application.applicant.avatar}
                      alt={application.applicant.name}
                      className="w-18 h-18 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-semibold text-foreground">
                          {application.applicant.name}
                        </h3>
                        <span className="text-sm font-semibold text-foreground/70">
                          Applied on{" "}
                          {new Date(application.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MailIcon className="w-4 h-4" />
                        {application.applicant.email}
                      </p>
                      {application.applicant.location && (
                        <p className="flex items-center gap-1 text-sm text-muted-foreground">
                          {" "}
                          <MapPin />
                          {application.applicant.location}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
                <div className="border-t border-foreground/60 px-6 py-3 bg-card flex justify-end gap-3">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      application.status
                    )}`}
                  >
                    {getStatusIcon(application.status)}
                    <span className="ml-1.5 capitalize">
                      {application.status === "under review"
                        ? "Under Review"
                        : application.status}
                    </span>
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
