import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileText,
  File,
  FileX,
  UploadCloud,
  ArrowUpRight,
  Loader,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCallback, useRef } from "react";

const ResumeSection = ({
  user,
  selectedResume,
  isResumeUploading,
  onResumeSelect,
  onResumeUpload,
  onResumeCancel,
}) => {
  const inputRef = useRef(null);

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
        <CardTitle className="text-xl flex text-foreground items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          Resume
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between bg-popover p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <div
              className={`p-3 rounded-lg ${
                user.resume
                  ? "bg-green-100 text-green-600"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {user.resume ? (
                <File className="w-5 h-5" />
              ) : (
                <FileX className="w-5 h-5" />
              )}
            </div>
            <div>
              <h3 className="font-medium">
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
          className="border-dashed border-2 border-gray-300 p-6 rounded-lg cursor-pointer text-center text-gray-500"
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
              className="gap-2"
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
              <span className="text-gray-600">
                Selected: {selectedResume.name}
              </span>
              <button
                onClick={onResumeCancel}
                className="text-primary hover:underline"
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
