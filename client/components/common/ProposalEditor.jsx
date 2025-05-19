"use client";

import RichTextEditor from "@/components/common/RichTextEditor";
import { applyForJob } from "@/lib/apis";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProposalEditor({ jobId, token }) {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <RichTextEditor
      initialContent="<p>Write your proposal here...</p>"
      placeholder="Write your proposal here..."
      loading={loading}
      submitButtonText="Submit Proposal"
      onSubmit={async (html) => {
        setLoading(true);
        try {
          await applyForJob(jobId, html, token);
          toast({ title: "Job Application submitted successfully." });
          router.push("/dashboard/browse");
        } catch (err) {
          console.error("Error submitting proposal", err);
          toast({
            title: "Submission Failed",
            description:
              err?.response?.data?.message ||
              err?.message ||
              "Something went wrong.",
            variant: "destructive",
          });
        } finally {
          setLoading(false);
        }
      }}
    />
  );
}
