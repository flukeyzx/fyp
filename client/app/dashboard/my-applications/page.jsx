"use client";

import { useState } from "react";
import { Clock, CheckCircle2, AlertCircle, Mail, Calendar } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getUserJobApplications } from "@/lib/apis";
import { useToken } from "@/context/TokenContext";
import LoadingSpinner from "@/components/ui/loader";

export default function JobApplicationsList() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [dateSort, setDateSort] = useState("newest");

  const { authToken } = useToken();

  const {
    data: applications,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["getUserJobApplications"],
    queryFn: () => getUserJobApplications(authToken),
    enabled: !!authToken,
    select: (data) => data.applications,
  });

  const filteredApplications = [...(applications || [])]
    .filter(
      (app) =>
        activeFilter === "all" || app.status === activeFilter.toUpperCase()
    )
    .sort((a, b) => {
      return dateSort === "newest"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt);
    });

  const getStatusIcon = (status) => {
    const icons = {
      PENDING: <Clock className="w-4 h-4 text-yellow-500" />,
      SHORTLISTED: <Mail className="w-4 h-4 text-blue-500" />,
      ACCEPTED: <CheckCircle2 className="w-4 h-4 text-green-500" />,
      REJECTED: <AlertCircle className="w-4 h-4 text-red-500" />,
    };
    return icons[status] || icons.PENDING;
  };

  const getStatusColor = (status) => {
    const colors = {
      PENDING: "bg-yellow-100 text-yellow-800",
      SHORTLISTED: "bg-blue-100 text-blue-800",
      ACCEPTED: "bg-green-100 text-green-800",
      REJECTED: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

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
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            My Application's History
          </h1>
          <p className="text-foreground/60 mt-1">
            {filteredApplications.length}{" "}
            {filteredApplications.length === 1 ? "application" : "applications"}
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex rounded-lg border border-secondary overflow-hidden">
          {["all", "pending", "shortlisted", "accepted", "rejected"].map(
            (filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 text-sm font-medium flex-1 cursor-pointer ${
                  activeFilter === filter
                    ? "bg-secondary text-secondary-foreground"
                    : "text-secondary-foreground/70 hover:bg-secondary hover:text-secondary-foreground/90"
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            )
          )}
        </div>
        <div className="flex rounded-lg border border-secondary overflow-hidden">
          {["newest", "oldest"].map((sort) => (
            <button
              key={sort}
              onClick={() => setDateSort(sort)}
              className={`px-4 py-2 text-sm font-medium flex items-center gap-2 cursor-pointer ${
                dateSort === sort
                  ? "bg-secondary text-secondary-foreground"
                  : "text-secondary-foreground/70 hover:bg-secondary hover:text-secondary-foreground/60"
              }`}
            >
              <Calendar className="w-4 h-4" />
              {sort.charAt(0).toUpperCase() + sort.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        {filteredApplications.length === 0 ? (
          <div
            className="flex justify-center mt-24"
            key={filteredApplications.id}
          >
            <div className="flex flex-col items-center justify-center py-10 px-6 bg-card rounded-lg shadow max-w-xs w-full">
              <p className="text-lg font-semibold text-foreground">
                No Applications Found
              </p>
              <p className="text-sm text-muted-foreground mt-1 text-center">
                Start applying to jobs and track your applications here.
              </p>
              <Link href="/dashboard/browse" className="pt-6">
                <Button className="cursor-pointer w-full">Browse Jobs</Button>
              </Link>
            </div>
          </div>
        ) : (
          filteredApplications.map((application) => (
            <div
              key={application.id}
              className="rounded-lg border hover:bg-primary/12 transition-all overflow-hidden"
            >
              <Link
                href={`/dashboard/my-applications/${application.id}`}
                className="block p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    {application.job.company.logo && (
                      <img
                        src={application.job.company.logo}
                        alt={application.job.company.name}
                        className="w-18 h-18 rounded-full object-cover"
                      />
                    )}

                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold text-foreground">
                        {application.job.title}
                      </h3>
                      <p className="text-foreground/70 text-sm">
                        {application.job.company.name} •{" "}
                        {application.job.location} •{" "}
                        {application.job.company.industry}
                      </p>
                      <p className="text-foreground/60 text-xs">
                        Posted on{" "}
                        {new Date(
                          application.job.createdAt
                        ).toLocaleDateString()}{" "}
                        • {application.job.type || "Full-Time"}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-between h-full gap-2">
                    <p className="text-sm text-foreground/50">
                      Applied on{" "}
                      {new Date(application.createdAt).toLocaleDateString()}
                    </p>
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
                    {application.status.toLowerCase()}
                  </span>
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
