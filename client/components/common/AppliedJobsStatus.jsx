"use client";
import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Briefcase,
  CheckCircle2,
  XCircle,
  Clock,
  MapPin,
  DollarSign,
  Calendar,
} from "lucide-react";

const dummyJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    companyLogo: "",
    description: "Develop modern web applications using React and Next.js",
    location: "San Francisco, CA (Remote)",
    salary: "$120,000 - $150,000",
    appliedDate: "2023-06-15",
    employementStatus: "Pending",
  },
  {
    id: 2,
    title: "UX/UI Designer",
    companyLogo: "",
    description: "Create beautiful user interfaces and design systems",
    location: "New York, NY",
    salary: "$90,000 - $110,000",
    appliedDate: "2023-06-10",
    employementStatus: "Accepted",
  },
  {
    id: 3,
    title: "Full Stack Engineer",
    companyLogo: "",
    description: "Build end-to-end features for our SaaS platform",
    location: "Austin, TX (Hybrid)",
    salary: "$110,000 - $130,000",
    appliedDate: "2023-06-05",
    employementStatus: "Rejected",
  },
  {
    id: 4,
    title: "Product Manager",
    companyLogo: "",
    description: "Lead product development from conception to launch",
    location: "Boston, MA",
    salary: "$130,000 - $160,000",
    appliedDate: "2023-05-28",
    employementStatus: "Pending",
  },
];

export default function JobStatusSection() {
  const [filter, setFilter] = useState("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const filteredJobs =
    filter === "all"
      ? dummyJobs
      : dummyJobs.filter(
          (job) => job.employementStatus.toLowerCase() === filter.toLowerCase()
        );

  const handleNext = () =>
    setCurrentIndex((prev) => (prev + 1) % filteredJobs.length);
  const handlePrev = () =>
    setCurrentIndex((prev) =>
      prev === 0 ? filteredJobs.length - 1 : prev - 1
    );

  const stats = {
    total: filteredJobs.length,
    rejected: filteredJobs.filter((job) => job.employementStatus === "Rejected")
      .length,
    accepted: filteredJobs.filter((job) => job.employementStatus === "Accepted")
      .length,
    pending: filteredJobs.filter((job) => job.employementStatus === "Pending")
      .length,
  };

  const statusColors = {
    Pending: { bg: "bg-blue-100", text: "text-blue-800", icon: Clock },
    Accepted: {
      bg: "bg-green-100",
      text: "text-green-800",
      icon: CheckCircle2,
    },
    Rejected: { bg: "bg-red-100", text: "text-red-800", icon: XCircle },
    default: { bg: "bg-gray-100", text: "text-gray-800", icon: Briefcase },
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Your Job Application Status
        </h2>
        <p className="text-muted-foreground">
          Track all your job applications in one place
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: "Total Applications",
            value: stats.total,
            icon: Briefcase,
            color: "bg-primary/10 text-primary",
          },
          {
            label: "Accepted",
            value: stats.accepted,
            icon: CheckCircle2,
            color: "bg-green-100 text-green-800",
          },
          {
            label: "Pending",
            value: stats.pending,
            icon: Clock,
            color: "bg-blue-100 text-blue-800",
          },
          {
            label: "Rejected",
            value: stats.rejected,
            icon: XCircle,
            color: "bg-red-100 text-red-800",
          },
        ].map((stat, index) => (
          <div
            key={index}
            className={`p-5 rounded-xl border border-border shadow-sm transition-all hover:shadow-md ${stat.color}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </p>
                <p className="text-3xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className="p-3 rounded-lg bg-white/50 dark:bg-black/20">
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative mb-8">
        {filteredJobs.length > 0 ? (
          <div className="bg-card border border-border rounded-xl shadow-sm p-6 transition-all duration-300">
            <div
              className={`absolute top-6 right-6 flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                statusColors[filteredJobs[currentIndex]?.employementStatus]
                  ?.bg || statusColors.default.bg
              } ${
                statusColors[filteredJobs[currentIndex]?.employementStatus]
                  ?.text || statusColors.default.text
              }`}
            >
              {filteredJobs[currentIndex]?.employementStatus || "Unknown"}
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-24 h-24 flex items-center justify-center bg-muted rounded-lg flex-shrink-0">
                {filteredJobs[currentIndex]?.companyLogo ? (
                  <img
                    src={filteredJobs[currentIndex].companyLogo}
                    alt="Company logo"
                    className="w-16 h-16 object-contain"
                  />
                ) : (
                  <Briefcase className="w-10 h-10 text-muted-foreground" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {filteredJobs[currentIndex]?.title || "No title"}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-5 h-5" />
                    <span>
                      {filteredJobs[currentIndex]?.location ||
                        "Location not specified"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-muted-foreground">
                    <DollarSign className="w-5 h-5" />
                    <span>
                      {filteredJobs[currentIndex]?.salary ||
                        "Salary not specified"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-5 h-5" />
                    <span>
                      Applied:{" "}
                      {filteredJobs[currentIndex]?.appliedDate ||
                        "Date not available"}
                    </span>
                  </div>
                </div>

                {filteredJobs[currentIndex]?.description && (
                  <p className="mt-4 text-muted-foreground">
                    {filteredJobs[currentIndex].description}
                  </p>
                )}
              </div>
            </div>

            {filteredJobs.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-background p-2 rounded-full shadow-md border border-border hover:bg-accent transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-background p-2 rounded-full shadow-md border border-border hover:bg-accent transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="bg-card border border-border rounded-xl p-10 text-center text-muted-foreground text-lg shadow-inner flex flex-col items-center justify-center gap-4">
            <Briefcase className="w-12 h-12 text-muted-foreground/50" />
            <p>No jobs found matching your criteria</p>
          </div>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {["all", "accepted", "pending", "rejected"].map((status) => {
          const Icon =
            statusColors[status.charAt(0).toUpperCase() + status.slice(1)]
              ?.icon || Briefcase;
          return (
            <button
              key={status}
              onClick={() => {
                setFilter(status);
                setCurrentIndex(0);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === status
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-muted hover:bg-muted/70 text-muted-foreground"
              }`}
            >
              <Icon className="w-4 h-4" />
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
