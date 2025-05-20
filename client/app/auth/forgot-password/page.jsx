"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import axios from "@/lib/axios.config";
import { useToast } from "@/hooks/use-toast";
import { Loader } from "lucide-react";

const formSchema = z.object({
  email: z
    .string()
    .email({ message: "Please provide a valid email address." })
    .max(50, { message: "Email must not exceed 50 characters." }),
});

export default function ForgotPassword() {
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
  });

  const {
    mutate: forgotPassword,
    isPending,
    error,
    isError,
  } = useMutation({
    mutationFn: async ({ email }) => {
      const response = await axios.post("/auth/forgot-password", { email });
      return response.data;
    },
    onSuccess: () => {
      toast({
        title: "Reset password link sent successfully.",
      });
      form.reset();
    },
  });

  const onSubmit = (data) => {
    forgotPassword(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary-medium to-background px-4">
      <div className="w-full max-w-md rounded-2xl text-white">
        <div className="text-center mb-8">
          <div className="mb-5 flex items-center justify-center">
            <img src="/assets/joblix.svg" alt="Logo" className="h-15 w-auto" />
          </div>
          <h1 className="text-xl font-semibold text-foreground">
            Forgot your password?
          </h1>
          <p className="text-sm text-foreground/70 mt-1">
            Enter your email and we’ll send you a reset link.
          </p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Input
            type="email"
            placeholder="you@example.com"
            {...form.register("email")}
            className="bg-background border border-gray-700 text-foreground"
          />

          {form.formState.errors.email && (
            <p className="text-red-500 text-sm -mt-2">
              {form.formState.errors.email.message}
            </p>
          )}

          {isError && (
            <p className="text-red-500 text-sm -mt-2">{error.message}</p>
          )}

          <Button
            type="submit"
            disabled={isPending}
            className="w-full py-5 text-black bg-white hover:bg-gray-200 font-semibold"
          >
            {isPending ? (
              <Loader className="animate-spin" />
            ) : (
              "Send Reset Link"
            )}
          </Button>

          <Link
            href="/auth/login"
            className="block text-center mt-3 font-medium text-foreground hover:underline"
          >
            Back to login
          </Link>
        </form>

        <p className="mt-6 text-xs text-center text-foreground/60">
          You acknowledge that you read, and agree to, our{" "}
          <Link href="#" className="underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="#" className="underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
