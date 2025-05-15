"use client";

import ProposalEditor from "@/components/common/ProposalEditor";
import { useToken } from "@/context/TokenContext";
import { use, useEffect } from "react";
import { useRouter } from "next/navigation";

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
    <div className="max-w-3xl mx-auto mt-10 space-y-6">
      <h1 className="text-3xl font-bold">Apply for Job</h1>
      <p className="text-gray-400 -mt-4">
        Write proposal to attract employeer's and stand out.
      </p>
      <ProposalEditor jobId={jobId} token={authToken} />
    </div>
  );
}
