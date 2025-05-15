"use client";

import LoadingSpinner from "@/components/ui/loader";
import { useToken } from "@/context/TokenContext";
import { getJobApplication } from "@/lib/apis";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  Clock,
  Mail,
  CheckCircle2,
  X,
  Linkedin,
  FileText,
  Download,
  Globe,
  MapPin,
  Calendar,
  User,
} from "lucide-react";
import Link from "next/link";
import { useState, use } from "react";

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

  console.log(application);
  const app = {
    id: "1",
    job: {
      title: "Senior UX Designer",
      company: "TechCorp",
      location: "San Francisco, CA",
      type: "Full-time",
      posted: "2023-06-01",
      description:
        "We need an experienced designer to lead our SaaS product UX...",
      skills: ["Figma", "User Research", "Prototyping", "UI/UX"],
    },
    candidate: {
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      phone: "+1 (555) 123-4567",
      portfolio: "alexjohnson.design",
      linkedin: "linkedin.com/in/alexjohnson",
    },
    status: "PENDING",
    appliedOn: "2023-06-15",
    cvUrl: "#",
    proposal: `Dear Hiring Team,

I'm excited to apply for the Senior UX Designer position at TechCorp. With 5+ years of experience designing enterprise SaaS products, I've led UX initiatives that:

• Increased user retention by 40% at CurrentCo
• Reduced support tickets by 60% through improved onboarding
• Won 2 industry design awards in 2022

**Why I'm a great fit:**
- Your job description perfectly matches my experience with complex dashboards
- I specialize in accessibility compliance (WCAG 2.1 AA)
- My design system work at PreviousCo reduced development time by 30%

I've attached my portfolio and CV for your review. Looking forward to discussing how I can contribute to your team!

Best regards,
Alex Johnson`,
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-background rounded-lg min-h-screen">
      <div className="h-20 rounded-lg p-5 bg-card flex justify-between items-center mb-8">
        <Link
          href="/dashboard/myapplication"
          className=" flex items-center text-foreground hover:text-foreground/60 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Applications
        </Link>

        <div className="flex gap-3">
          {application.status === "PENDING" && (
            <button className="flex items-center cursor-pointer px-4 py-2 bg-popover text-foreground/70 rounded-lg hover:text-red-800 hover:bg-foreground/90 transition-colors text-sm font-medium">
              <X className="w-4 h-4 mr-2" />
              Unsend Proposal
            </button>
          )}
          <button className="flex items-center cursor-pointer px-4 py-2 bg-popover text-foreground/70 rounded-lg hover:bg-foreground/90 hover:text-primary transition-colors text-sm font-medium">
            Delete Application
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-xl shadow-sm border p-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  {application.job.title}
                </h1>
                <p className="text-lg text-foreground/35 mt-1">
                  {application.job.company}
                </p>
              </div>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  application.status === "PENDING"
                    ? "bg-yellow-100 text-yellow-800"
                    : application.status === "SHORTLISTED"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {application.status === "PENDING" ? (
                  <Clock className="w-4 h-4 mr-1.5" />
                ) : application.status === "SHORTLISTED" ? (
                  <Mail className="w-4 h-4 mr-1.5" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 mr-1.5" />
                )}
                {application.status.toLowerCase()}
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-foreground/70 text-background">
                <MapPin className="w-3 h-3 mr-1.5" />
                {application.job.location}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-foreground/70 text-background">
                <User className="w-3 h-3 mr-1.5" />
                {application.job.employmentType}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-foreground/70 text-background">
                <Calendar className="w-3 h-3 mr-1.5" />
                Applied {new Date(application.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Job Details */}
          <div className="bg-card rounded-xl shadow-sm border p-6">
            <h2 className="text-xl text-foregroundfont-semibold mb-4">
              Job Details
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-foreground/80">
                  Description
                </h3>
                <p className="mt-1 text-foreground/50">
                  {application.job.description}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-foreground/80">
                  Required Skills
                </h3>
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
                <h3 className="text-sm font-medium text-foreground/70">
                  Posted
                </h3>
                <p className="mt-1 text-foreground/70 flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-foreground" />
                  {new Date(application.job.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl shadow-sm  p-6">
            <h2 className="text-xl text-foreground font-semibold mb-4">
              Cover Letter
            </h2>
            <div className="prose max-w-none text-foreground/80 whitespace-pre-line">
              {application.proposal}
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-card rounded-xl shadow-sm border p-6">
            <h2 className="text-xl text-foreground font-semibold mb-4">
              Candidate
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-foreground">Name</h3>
                <p className="mt-1 text-foreground/50 font-medium">
                  {application.applicant.name}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-foreground">Contact</h3>
                <p className="mt-1 text-foreground/50">
                  {application.applicant.email}
                </p>
                <p className="mt-1 text-foreground/50">
                  {application.applicant.location}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-foreground">Links</h3>
              </div>
            </div>
          </div>

          {/* CV Section */}
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
                  Candidate CV
                </h2>
                <a
                  href={application.applicant.resume}
                  download
                  className="flex items-center text-sm text-primary hover:text-primary/50"
                >
                  <Download className="w-4 h-4 mr-1.5" />
                  Download
                </a>
              </div>
              <div className="border  rounded-lg p-4 bg-popover h-64 flex items-center justify-center">
                <div className="text-center">
                  <FileText className="w-12 h-12 mx-auto text-foreground/70 mb-2" />
                  <p className="text-foreground/50">CV_Preview.pdf</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
