"use client";

import { useState } from "react";
import { parseResumeToProfile, updateUserProfile } from "@/lib/apis";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

export default function AutoFillFromResume({
  token,
  refetch,
  router,
  setFormData,
}) {
  const [resumeFile, setResumeFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setResumeFile(file);
  };

  const handleAutoFill = async () => {
    if (!resumeFile) {
      toast.error("Please upload a resume file first.");
      return;
    }

    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append("resume", resumeFile);

      const extractedData = await parseResumeToProfile(formData, token);

      if (!extractedData || !extractedData.name) {
        toast.error("Unable to extract valid data from the resume.");
        return;
      }

      // Update form visually and save it
      setFormData((prev) => ({
        ...prev,
        ...extractedData,
      }));

      await updateUserProfile(extractedData, token);
      await refetch();

      toast.success("Profile auto-filled from resume.");
      router.push("/dashboard/profile");
    } catch (error) {
      console.error("Resume parsing failed:", error);
      toast.error("Failed to process resume. Please try a different file.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-3">
      <Input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
        disabled={isProcessing}
      />
      <Button type="button" onClick={handleAutoFill} disabled={isProcessing}>
        {isProcessing ? "Processing..." : "Auto-Fill from Resume"}
      </Button>
    </div>
  );
}
