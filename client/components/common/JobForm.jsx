"use client";

import { useForm, Controller, useWatch } from "react-hook-form";
import { useState } from "react";
import { Plus, Sparkles, ClipboardCopy, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import locations from "@/public/data/locations";
import RichTextEditor from "./RichTextEditor";
import { generateThroughAI, createJob } from "@/lib/apis";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import currencies from "@/public/data/currencies";

export default function JobForm({ token }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [loadingAI, setLoadingAI] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [aiQuery, setAiQuery] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const titleValue = useWatch({ control, name: "title" });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const skillsArray = data.skills.split(",").map((skill) => skill.trim());
      data.skills = skillsArray;
      await createJob(data, token);
      toast({
        title: "Job created successfully.",
      });
      router.push("/dashboard/browse");
    } catch (err) {
      console.error(err);
      alert("Error creating job", err.message);
    } finally {
      setLoading(false);
    }
  };

  const generateAI = async (token) => {
    if (!aiQuery) return;
    setLoadingAI(true);
    try {
      const res = await generateThroughAI(aiQuery, token);
      const content = res.result;
      setAiResponse(content);
    } catch (error) {
      alert("Failed to generate using AI");
    } finally {
      setLoadingAI(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(aiResponse);
    setCopySuccess(true);
    toast({
      variant: "success",
      title: "Text copied to clipboard",
    });

    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border-2 border-muted rounded-xl shadow px-10 py-8 space-y-4"
      >
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Job Details</h2>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center gap-1">
                  <Sparkles size={16} /> Generate with AI
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Generate Content with AI</DialogTitle>
                </DialogHeader>

                <Textarea
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  placeholder={`Ask something like: "Write a job description for ${
                    titleValue || "a developer"
                  }"`}
                />

                <Button
                  onClick={() => generateAI(token)}
                  disabled={loadingAI}
                  className="w-full"
                >
                  {loadingAI ? "Generating..." : "Generate"}
                </Button>

                {aiResponse && (
                  <div className="bg-muted p-4 rounded-md mt-4 relative">
                    <div
                      dangerouslySetInnerHTML={{ __html: aiResponse }}
                      className="text-sm whitespace-pre-wrap"
                    ></div>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={copyToClipboard}
                      className="absolute top-2 right-2"
                    >
                      {copySuccess ? (
                        <Check size={16} className="text-green-500" />
                      ) : (
                        <ClipboardCopy size={16} />
                      )}
                    </Button>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>

          <div>
            <label className="font-semibold mb-1 block">Job Title</label>
            <Input
              {...register("title", { required: true })}
              placeholder="e.g. Frontend Developer"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">Job title is required</p>
            )}
          </div>

          <div>
            <label className="font-semibold mb-1 block">Job Description</label>
            <Controller
              name="description"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <RichTextEditor
                  value={field.value}
                  onChange={field.onChange}
                  showSubmitButton={false}
                />
              )}
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">
                Job description is required
              </p>
            )}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Additional Info</h2>

          <div>
            <label className="font-semibold mb-1 block">Skills</label>
            <input
              {...register("skills")}
              placeholder="e.g. React, Node.js, MongoDB"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold mb-1 block">Minimum Salary</label>
              <input
                type="number"
                {...register("minSalary", {
                  required: true,
                  valueAsNumber: true,
                  validate: (value) =>
                    value >= 0 || "Must be a positive number",
                })}
                placeholder="e.g. 50000"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              />
              {errors.minSalary && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.minSalary.message}
                </p>
              )}
            </div>

            <div>
              <label className="font-semibold mb-1 block">Maximum Salary</label>
              <input
                type="number"
                {...register("maxSalary", {
                  required: true,
                  valueAsNumber: true,
                  validate: (value) =>
                    value >= 0 || "Must be a positive number",
                })}
                placeholder="e.g. 80000"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              />
              {errors.maxSalary && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.maxSalary.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold mb-1 block">Location</label>
              <select
                {...register("location", { required: true })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm bg-muted"
              >
                <option value="">Select Location</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
              {errors.location && (
                <p className="text-red-500 text-xs mt-1">
                  Location is required
                </p>
              )}
            </div>

            <div>
              <label className="font-semibold mb-1 block">Currency</label>
              <select
                {...register("currency", { required: true })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm bg-muted"
              >
                <option value="">Select Currency</option>
                {currencies.map((cur) => (
                  <option key={cur} value={cur}>
                    {cur}
                  </option>
                ))}
              </select>
              {errors.currency && (
                <p className="text-red-500 text-xs mt-1">
                  Currency is required
                </p>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold mb-1 block">
                Employment Type
              </label>
              <select
                {...register("employmentType", { required: true })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm bg-muted"
              >
                <option value="">Select</option>
                <option value="On-Site">On-Site</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            <div>
              <label className="font-semibold mb-1 block">
                Experience Level
              </label>
              <select
                {...register("experienceLevel", { required: true })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm bg-muted"
              >
                <option value="">Select</option>
                <option value="Entry">Entry</option>
                <option value="Mid">Mid</option>
                <option value="Senior">Senior</option>
                <option value="Lead">Lead</option>
              </select>
            </div>
          </div>
        </section>

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={loading}
            className="mt-6 bg-primary hover:bg-primary/90 transition-all text-white px-6 py-3 rounded-lg text-sm font-medium flex items-center gap-2 shadow cursor-pointer"
          >
            <Plus size={16} /> {loading ? "Crearting..." : "Create Job"}
          </Button>
        </div>
      </form>
    </>
  );
}
