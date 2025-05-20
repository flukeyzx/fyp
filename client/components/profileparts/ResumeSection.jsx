"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileText,
  File,
  FileX,
  UploadCloud,
  ArrowUpRight,
  Loader,
  Sparkles,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCallback, useRef, useState } from "react";
import { generateProfileDataThroughResume } from "@/lib/apis";
import { useToken } from "@/context/TokenContext";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { set } from "zod";

const ResumeSection = ({
  user,
  selectedResume,
  isResumeUploading,
  onResumeSelect,
  onResumeUpload,
  onResumeCancel,
}) => {
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const { authToken } = useToken();
  const { toast } = useToast();
  const { refetch } = useAuth();

  const handleDrop = useCallback(
    (event) => {
      event.preventDefault();
      const file = event.dataTransfer.files[0];
      if (file && file.type === "application/pdf") {
        onResumeSelect({ target: { files: [file] } });
      }
    },
    [onResumeSelect]
  );

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleClickContainer = () => {
    if (inputRef.current) inputRef.current.click();
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl flex text-foreground items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Resume
          </div>
          {user.resume && (
            <div className="font-normal text-sm">
              <Button
                disabled={loading}
                onClick={async () => {
                  setLoading(true);
                  if (!user.resume) {
                    toast({
                      title: "No resume uploaded",
                      description:
                        "Please upload a resume to generate profile data.",
                      variant: "destructive",
                    });
                    setLoading(false);
                    return;
                  }
                  try {
                    await generateProfileDataThroughResume(
                      user.resume,
                      authToken
                    );
                    toast({
                      title: "Profile data generated",
                      description:
                        "Your profile data has been generated using AI.",
                      variant: "default",
                    });
                    refetch();
                  } catch (error) {
                    console.error("Error generating profile data:", error);
                    toast({
                      title: "Error",
                      description: "Failed to generate profile data.",
                      variant: "destructive",
                    });
                  } finally {
                    setLoading(false);
                  }
                }}
                className="cursor-pointer bg-gradient-to-r from-primary to-secondary/80 text-primary-foreground hover:opacity-90 hover:scale-[1.02] transition"
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    <Sparkles />
                    generate profile data using AI
                  </>
                )}
              </Button>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between bg-popover p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <div
              className={`p-3 rounded-lg ${
                user.resume
                  ? "bg-green-100 text-green-600"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {user.resume ? (
                <File className="w-5 h-5" />
              ) : (
                <FileX className="w-5 h-5" />
              )}
            </div>
            <div>
              <h3 className="font-medium text-foreground">
                {user.resume ? "Resume uploaded" : "No resume uploaded"}
              </h3>
              {user.resume && (
                <a
                  href={user.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline flex items-center gap-1"
                >
                  View resume <ArrowUpRight className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        </div>

        <div
          className="border-dashed border-2 border-card-foreground/70 p-6 rounded-lg cursor-pointer text-center text-muted-foreground text-sm hover:bg-muted transition"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={handleClickContainer}
        >
          Drag and drop your resume here or click to upload
          <Input
            ref={inputRef}
            id="resume-upload"
            type="file"
            accept="application/pdf"
            onChange={onResumeSelect}
            disabled={isResumeUploading}
            className="hidden"
          />
        </div>

        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={onResumeUpload}
              disabled={!selectedResume || isResumeUploading}
              className="gap-2 disabled:opacity-100 disabled:cursor-not-allowed cursor-pointer"
            >
              {isResumeUploading ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <UploadCloud className="w-4 h-4" />
                  Upload
                </>
              )}
            </Button>
          </div>
          {selectedResume && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Selected: {selectedResume.name}
              </span>
              <button
                onClick={onResumeCancel}
                className="text-primary hover:underline cursor-pointer"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResumeSection;
