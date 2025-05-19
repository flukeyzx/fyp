"use client";

import ProposalEditor from "@/components/common/ProposalEditor";
import { useToken } from "@/context/TokenContext";
import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function ApplyJobPage({ params }) {
  const { jobId } = use(params);
  const { authToken } = useToken();
  const router = useRouter();

  useEffect(() => {
    if (!authToken) {
      router.push("/auth/signup");
    }
  }, []);

  return (
    <div>
      <Button
        onClick={() => router.back()}
        className="bg-foreground hover:bg-foreground/90 mt-6 mx-12 cursor-pointer"
      >
        <ArrowLeft />
        Back to job
      </Button>
      <div className="max-w-3xl mx-auto mt-10 space-y-6">
        <h1 className="text-3xl font-bold">Apply for Job</h1>
        <p className="text-muted-foreground -mt-4">
          Write proposal to attract employeer's and stand out.
        </p>
        <ProposalEditor jobId={jobId} token={authToken} />
      </div>
    </div>
  );
}
