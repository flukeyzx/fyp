"use client";

import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/ui/loader";
import { useToken } from "@/context/TokenContext";
import { getJobApplication } from "@/lib/apis";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Mail,
  CheckCircle2,
  X,
  FileText,
  XCircle,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import { use } from "react";
import { useState } from "react";


export default function ProposalView({ params }) {
  const { applicationId } = use(params);
  const [showCV, setShowCV] = useState(true);
  const { authToken } = useToken();

  const {
    data: application,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["getJobApplication"],
    queryFn: () => getJobApplication(applicationId, authToken),
    enabled: !!authToken,
    select: (data) => data.application,
  });

  if (isLoading) {
    return (
      <div className="-mt-36">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return <div>{error.message || "Oops! something went wrong."}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-background rounded-lg min-h-screen">
      <div className="h-20 rounded-lg p-5 bg-card flex justify-between items-center mb-8">
        <Link
          href="/dashboard/my-applications"
          className="flex items-center text-foreground hover:text-foreground/60 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Applications
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-xl shadow-sm border p-6">
            <div
              className={`flex flex-col gap-4 p-6 rounded-xl border shadow-sm ${
                application.status === "PENDING"
                  ? "bg-yellow-200 text-black"
                  : application.status === "SHORTLISTED"
                  ? "bg-sky-200 text-black"
                  : application.status === "ACCEPTED"
                  ? "bg-green-200 text-black"
                  : "bg-red-300 text-black"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold">Application Status</h1>
                  <p className="text-sm mt-1">Keep track of your application's journey.</p>
                </div>
                <span
                  className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${
                    application.status === "PENDING"
                      ? "bg-white text-yellow-800"
                      : application.status === "SHORTLISTED"
                      ? "bg-white text-sky-800"
                      : application.status === "ACCEPTED"
                      ? "bg-white text-green-800"
                      : "bg-white text-red-800"
                  }`}
                >
                  {application.status === "PENDING" ? (
                    <Clock className="w-4 h-4 mr-1.5" />
                  ) : application.status === "SHORTLISTED" ? (
                    <Mail className="w-4 h-4 mr-1.5" />
                  ) : application.status === "ACCEPTED" ? (
                    <CheckCircle2 className="w-4 h-4 mr-1.5" />
                  ) : (
                    <XCircle className="w-4 h-4 mr-1.5" />
                  )}
                  {application.status.toLowerCase()}
                </span>
              </div>

              <div className="rounded-lg p-2">
                {application.status === "PENDING" && (
                  <p>Your application has been submitted and is under review.</p>
                )}
                {application.status === "SHORTLISTED" && (
                  <p>Congratulations! You've been shortlisted.</p>
                )}
                {application.status === "ACCEPTED" && (
                  <p>Great news! Your application has been accepted.</p>
                )}
                {application.status === "REJECTED" && (
                  <p>Unfortunately, your application was not selected.</p>
                )}
              </div>

              <div className="text-right">
                Applied on: {new Date(application.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>

          <Link
            href={`/dashboard/browse/${application.jobId}`}
            className="relative bg-card rounded-xl shadow-sm border p-6 group hover:shadow-md hover:opacity-90 flex flex-col justify-between"
          >
            <h2 className="text-2xl text-foreground font-semibold mb-4">Job Details</h2>
            <div className="absolute top-4 right-4 text-primary text-sm flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              See Details
              <ArrowRight className="w-4 h-4" />
            </div>
            <div className="space-y-4">
              <div>
                <h2>Title</h2>
                <p className="mt-1 text-foreground/80 font-semibold text-xl">
                  {application.job.title}
                </p>
                <h3 className="mt-2 text-sm font-medium text-foreground/80">Description</h3>
                <p
                  dangerouslySetInnerHTML={{ __html: application.job.description }}
                  className="text-foreground/50 line-clamp-4 pt-2"
                />
              </div>
              <div>
                <h3 className="text-sm font-medium text-foreground/80">Required Skills</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {application.job.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-foreground/70 text-background rounded-full text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-foreground/70">Posted</h3>
                <p className="mt-1 text-foreground/70 flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-foreground" />
                  {new Date(application.job.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </Link>

          <div className="bg-card rounded-xl shadow-sm p-6">
            <h2 className="text-xl text-foreground font-semibold mb-4">Your Proposal</h2>
            <div
              dangerouslySetInnerHTML={{ __html: application.proposal }}
              className="prose max-w-none text-foreground/80 whitespace-pre-line"
            ></div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card rounded-xl shadow-sm border p-6">
            <h2 className="text-xl text-foreground font-semibold mb-4">Your Information</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-foreground">Name</h3>
                <p className="mt-1 text-foreground/50 font-medium">{application.applicant.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-foreground">Contact</h3>
                <p className="mt-1 text-foreground/50">{application.applicant.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-foreground">Location</h3>
                <p className="mt-1 text-foreground/50">{application.applicant.location}</p>
              </div>
            </div>
          </div>

          {showCV && (
            <div className="bg-card rounded-xl shadow-sm border p-6 relative">
              <button
                onClick={() => setShowCV(false)}
                className="absolute top-4 right-4 text-foreground hover:text-foreground/60"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl text-foreground font-semibold flex items-center gap-2">
                  <FileText className="text-primary w-5 h-5" />
                  Your Resume
                </h2>
              </div>

              <div className="border rounded-lg p-4 bg-popover h-64 flex items-center justify-center relative overflow-hidden">
                {application.applicant.resume ? (
                  <iframe
                    src={application.applicant.resume}
                    title="Resume Preview"
                    className="p-0 w-full h-full rounded-lg"
                  />
                ) : (
                  <div className="text-center">
                    <FileText className="w-12 h-12 mx-auto text-foreground/70 mb-2" />
                    <p className="text-foreground/50">No resume uploaded</p>
                  </div>
                )}
              </div>

              {application.applicant.resume && (
                <Link
                  href={application.applicant.resume}
                  target="_blank"
                  className="flex items-center text-sm text-primary hover:text-primary/50"
                >
                  <Button className="p-0 flex items-center gap-1 w-full mt-4 cursor-pointer">
                    <ArrowRight className="w-4 h-4 mr-1.5" />
                    View Full
                  </Button>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}