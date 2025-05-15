"use client";

import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import axios from "@/lib/axios.config";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

const resetPasswordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Both passwords must be the same.",
    path: ["confirmPassword"],
  });

export default function ResetPassword() {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  const {
    mutate: resetPassword,
    isPending,
    error,
    isError,
  } = useMutation({
    mutationFn: async ({ password }) => {
      try {
        const response = await axios.post(`/auth/reset-password/${token}`, {
          password,
        });

        return response.data;
      } catch (error) {
        if (error.response && error.response.data) {
          const serverErrorMessage =
            error.response.data.message || "Internal server error.";
          throw new Error(serverErrorMessage);
        }
        throw new Error("Error while sending resetPassword request.");
      }
    },
    onSuccess: () => {
      toast({
        title: "Password reset successfully.",
      });
      router.push("/");
    },
  });

  const onSubmit = (data) => {
    resetPassword(data);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded-lg p-8 max-w-md w-full border border-gray-200"
      >
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
          Reset Your Password
        </h2>

        <div className="mb-2">
          <Input
            type="password"
            placeholder="Enter new password"
            className="border-gray-300 focus:ring-black focus:border-black"
            {...form.register("password")}
          />
          {form.formState.errors.password && (
            <p className="text-sm text-red-600 mt-2">
              {form.formState.errors.password?.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <Input
            type="password"
            placeholder="Confirm new password"
            className="border-gray-300 focus:ring-black focus:border-black"
            {...form.register("confirmPassword")}
          />
          {form.formState.errors.confirmPassword && (
            <p className="text-sm text-red-600 mt-2">
              {form.formState.errors.confirmPassword?.message}
            </p>
          )}
        </div>
        {isError && (
          <p className="text-red-500 -mt-2 mb-2 pl-1 text-sm">
            {error.message}
          </p>
        )}
        <Button
          type="submit"
          disabled={isPending}
          className="w-full py-3 text-lg font-medium text-white bg-black rounded-md hover:bg-gray-800 transition-all"
        >
          {isPending ? <Loader className="animate-spin" /> : "Reset Password"}
        </Button>
      </form>
    </div>
  );
}
