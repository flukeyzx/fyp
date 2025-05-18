"use client";

import {
  ArrowLeft,
  FileText,
  Mail,
  Clock,
  CheckCircle2,
  XCircle,
  ThumbsUp,
  ThumbsDown,
  WandSparkles,
  Wand2,
  CircleCheckBig,
  Loader2,
  Cross,
  X,
} from "lucide-react";
import Link from "next/link";
import { use } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useToken } from "@/context/TokenContext";
import {
  analyzeResumeWithPrompt,
  getJobApplication,
  getAtsScore,
  updateApplicationStatus,
} from "@/lib/apis";
import { parseDate } from "@/lib/utils";
import LoadingSpinner from "@/components/ui/loader";
import { Button } from "@/Components/ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import ReactMarkdown from "react-markdown";
import { useToast } from "@/hooks/use-toast";

export default function ApplicantDetail({ params }) {
  const [openModal, setOpenModal] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [atsScore, setAtsScore] = useState(null);
  const [isAtsLoading, setIsAtsLoading] = useState(false);
  const [isLoadingShortlist, setIsLoadingShortlist] = useState(false);
  const [isLoadingReject, setIsLoadingReject] = useState(false);
  const [isLoadingAccept, setIsLoadingAccept] = useState(false);

  const { applicationId } = use(params);
  const { authToken } = useToken();
  const router = useRouter();
  const { toast } = useToast();

  const {
    data: application,
    isLoading,
    isError,
    error,
    refetch,
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

  const statusConfig = {
    pending: {
      icon: <Clock className="w-4 h-4" />,
      color: "bg-amber-100 text-amber-800",
      label: "Pending",
    },
    shortlisted: {
      icon: <ThumbsUp className="w-4 h-4" />,
      color: "bg-blue-100 text-blue-800",
      label: "Shortlisted",
    },
    accepted: {
      icon: <CheckCircle2 className="w-4 h-4" />,
      color: "bg-emerald-100 text-emerald-800",
      label: "Accepted",
    },
    rejected: {
      icon: <ThumbsDown className="w-4 h-4" />,
      color: "bg-red-100 text-red-800",
      label: "Rejected",
    },
  };

  const handleShortlist = async () => {
    setIsLoadingShortlist(true);
    try {
      await updateApplicationStatus(application.id, "shortlisted", authToken);
      toast({ title: "Candidate shortlisted successfully." });
      refetch();
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingShortlist(false);
    }
  };

  const handleReject = async () => {
    setIsLoadingReject(true);
    try {
      await updateApplicationStatus(application.id, "rejected", authToken);
      toast({ title: "Candidate rejected successfully." });
      refetch();
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingReject(false);
    }
  };

  const handleAccept = async () => {
    setIsLoadingAccept(true);
    try {
      await updateApplicationStatus(application.id, "accepted", authToken);
      toast({ title: "Candidate accepted successfully." });
      refetch();
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingAccept(false);
    }
  };

  if (!application.applicant) {
    return (
      <div className="min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <button
                onClick={() => router.back()}
                className="flex items-center text-primary hover:text-primary/80 transition-colors w-fit"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                <span className="font-medium">Back to Applications</span>
              </button>
            </div>
            <div className="text-center py-16">
              <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
                <XCircle className="w-12 h-12 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Applicant Not Found
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                No applicant with this ID was found in our records.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const status = statusConfig[application.status.toLowerCase()];

  return (
    <div className="min-h-screen p-4 rounded-2xl">
      <div className="max-w mx-auto overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <Button
              onClick={() => router.back()}
              className="flex items-center bg-foreground cursor-pointer p-3 rounded-lg text-background mb-4 hover:bg-foreground/90 text-sm"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Application
            </Button>
          </div>
        </div>

        {application.applicant.resume && (
          <div className="flex justify-end w-full px-10">
            <Button
              onClick={() => setOpenModal(true)}
              className="flex items-center bg-primary/90 font-semibold cursor-pointer hover:bg-primary/80 hover:scale-[1.02] px-6 py-3 rounded-lg"
            >
              <WandSparkles className="w-4 h-4" />
              Ask with AI
            </Button>
          </div>
        )}

        <div className="p-6 md:p-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                {application.applicant.avatar ? (
                  <div className="w-22 h-22 rounded-full flex items-center justify-center">
                    <img
                      src={application.applicant.avatar}
                      alt={application.applicant.name}
                      className="object-cover rounded-full"
                    />
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary to-primary/70 flex items-center justify-center text-primary-foreground text-2xl font-bold shadow-md">
                    {application.applicant.name.charAt(0)}
                  </div>
                )}
                <div>
                  <h1 className="flex flex-col gap-0.5">
                    <span className="text-3xl font-bold text-foreground">
                      {application.applicant.name}{" "}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {application.applicant.email}
                    </span>
                  </h1>
                  <div className="flex flex-wrap items-center gap-3 mt-3">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${status.color}`}
                    >
                      {status.icon}
                      <span className="ml-1.5">{status.label}</span>
                    </span>
                    <span className="text-muted-foreground text-sm">
                      Applied on {parseDate(application.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-foreground">
                    Cover Letter
                  </h2>
                </div>
                <div className="bg-popover mt-6 p-6 rounded-xl border border-border">
                  <div
                    className="text-foreground/60 whitespace-pre-line leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: application.proposal }}
                  />
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-popover rounded-xl border border-card p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  Actions
                </h2>
                {["ACCEPTED", "REJECTED"].includes(application.status) ? (
                  <div className="flex items-center gap-3">
                    {application.status === "ACCEPTED" ? (
                      <div className="flex flex-col gap-1">
                        <span className="text-green-600 font-medium flex gap-1 items-center">
                          ✅ Accepted
                        </span>
                        <span className="text-muted-foreground text-sm">
                          You’ve accepted this candidate.
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-1">
                        <span className="text-red-600 font-medium flex gap-1 items-center">
                          <X className="w-5 h-5" /> Rejected
                        </span>
                        <span className="text-muted-foreground text-sm">
                          You’ve rejected this candidate.
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      onClick={handleShortlist}
                      disabled={
                        isLoadingAccept || isLoadingReject || isLoadingShortlist
                      }
                      className="flex items-center cursor-pointer justify-center p-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg border border-blue-200 transition-all"
                    >
                      <span>
                        {isLoadingShortlist ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          <span className="flex items-center gap-1">
                            <ThumbsUp className="w-5 h-5" />
                            Shortlist
                          </span>
                        )}
                      </span>
                    </Button>
                    <Button
                      onClick={handleReject}
                      disabled={
                        isLoadingAccept || isLoadingReject || isLoadingShortlist
                      }
                      className="flex items-center justify-center cursor-pointer p-3 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg border border-red-200 transition-all"
                    >
                      <span>
                        {isLoadingReject ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          <span className="flex items-center gap-1">
                            <ThumbsDown className="w-5 h-5" />
                            Reject
                          </span>
                        )}
                      </span>
                    </Button>
                    <Button
                      onClick={handleAccept}
                      disabled={
                        isLoadingAccept || isLoadingReject || isLoadingShortlist
                      }
                      className="col-span-2 flex items-center justify-center cursor-pointer p-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg border border-emerald-200 transition-all"
                    >
                      <span>
                        {isLoadingAccept ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          <span className="flex items-center gap-1">
                            <CircleCheckBig className="w-5 h-5 " />
                            Accept
                          </span>
                        )}
                      </span>
                    </Button>
                  </div>
                )}
              </div>

              <Dialog open={openModal} onOpenChange={setOpenModal}>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Ask about this applicant</DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col gap-4">
                    <Input
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      placeholder="Ask anything about the resume..."
                      className="px-4 py-2 rounded-lg border-2 border-border"
                    />
                    <Button
                      onClick={async () => {
                        setIsAiLoading(true);
                        try {
                          const res = await analyzeResumeWithPrompt(
                            aiPrompt,
                            application.applicant.resume,
                            authToken
                          );
                          setAiResponse(res.result);
                        } catch (err) {
                          setAiResponse(
                            "Failed to get a response. Please try again."
                          );
                          console.log(err);
                        } finally {
                          setIsAiLoading(false);
                        }
                      }}
                      disabled={isAiLoading || !aiPrompt}
                    >
                      {isAiLoading ? "Thinking..." : "Ask"}
                    </Button>
                    {aiResponse && (
                      <div className="bg-muted p-4 rounded-md text-sm text-foreground prose max-w-full overflow-auto max-h-80">
                        <ReactMarkdown>{aiResponse}</ReactMarkdown>
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>

              <div className="bg-popover rounded-xl border border-border p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  Documents
                </h2>
                <div className="space-y-3">
                  {application.applicant.resume ? (
                    <Link
                      href={application.applicant.resume}
                      target="_blank"
                      className="flex items-center justify-between p-3 bg-card rounded-lg border border-border hover:border-primary hover:bg-primary-light transition-all"
                    >
                      <div className="flex items-center">
                        <FileText className="w-5 h-5 text-primary mr-3" />
                        <span className="font-medium">Resume</span>
                      </div>
                    </Link>
                  ) : (
                    <div className="flex flex-col gap-1">
                      <h4 className="">Resume</h4>
                      <p className="text-muted-foreground text-sm">
                        User does not have any resume uploaded.
                      </p>
                    </div>
                  )}
                </div>
                {application.applicant.resume && (
                  <div className="flex flex-col gap-2 mt-4 w-full">
                    <Button
                      className="cursor-pointer w-full"
                      onClick={async () => {
                        setIsAtsLoading(true);
                        const jobDetails = `
                          Title: ${application.job.title}
                          Description: ${application.job.description}
                          Skills: ${application.job.skills.join(", ")}
                          Experience: ${application.job.experienceLevel}
                        `;

                        try {
                          const score = await getAtsScore(
                            application.applicant.resume,
                            jobDetails,
                            authToken
                          );
                          setAtsScore(score.result);
                        } catch (error) {
                          console.error("Failed to get ATS score:", error);
                          setAtsScore("Error calculating ATS score");
                        } finally {
                          setIsAtsLoading(false);
                        }
                      }}
                      disabled={isAtsLoading}
                    >
                      <WandSparkles className="mr-2 h-4 w-4" />
                      {isAtsLoading
                        ? "Calculating..."
                        : "Get ATS Score with AI"}
                    </Button>

                    {atsScore && (
                      <div
                        className={`rounded-md p-3 text-center text-sm shadow-sm border mt-1
                        ${
                          Number(atsScore) < 50
                            ? "bg-red-100 text-red-700 border-red-300"
                            : Number(atsScore) >= 80
                            ? "bg-green-100 text-green-700 border-green-300"
                            : "bg-yellow-100 text-yellow-700 border-yellow-300"
                        }
                      `}
                      >
                        <strong>ATS Score:</strong> {atsScore}%
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
