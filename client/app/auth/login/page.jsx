"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import axios from "@/lib/axios.config";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Loader } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const formSchema = z.object({
  email: z
    .string()
    .email({ message: "Please provide a valid email format." })
    .max(50, {
      message: "email must not exceed 50 characters.",
    }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." })
    .max(50, {
      message: "password must not exceed 50 characters.",
    }),
});

export default function Login() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
  });
  const { refetch } = useAuth();

  const { mutate, isPending, error, isError } = useMutation({
    mutationFn: async ({ email, password }) => {
      try {
        const response = await axios.post("/auth/login", {
          email,
          password,
        });
        return response.data;
      } catch (error) {
        if (error.response && error.response.data) {
          const serverErrorMessage =
            error.response.data.message || "Internal server error.";
          throw new Error(serverErrorMessage);
        }
        throw new Error("Error while sending signup request.");
      }
    },
    onSuccess: () => {
      toast({
        title: "User logged in successfully.",
      });
      refetch();
      router.push("/");
    },
    onError: (error) => {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values) => {
    mutate(values);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-cyan-900 to-blue-900 px-4">
      <div className="w-full max-w-md  rounded-2xl text-white">
        <div className="text-center mb-8">
          <div className="mb-5 flex items-center justify-center">
            <img
              src="/assets/joblix.svg"
              alt="Logo"
              className="h-15 w-auto shadow-sm"
            />
          </div>
          <h1 className="text-xl font-semibold">Yooo, welcome back!</h1>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Input
            type="email"
            {...form.register("email")}
            placeholder="johndoe@email.com"
            className="bg-gray-900 border border-gray-700 text-white"
          />
          {form.formState.errors.email && (
            <p className="text-red-500 text-sm -mt-2">
              {form.formState.errors.email?.message}
            </p>
          )}

          <Input
            type="password"
            {...form.register("password")}
            placeholder="Enter your password"
            className="bg-gray-900 border border-gray-700 text-white"
          />
          {form.formState.errors.password && (
            <p className="text-red-500 text-sm -mt-2">
              {form.formState.errors.password?.message}
            </p>
          )}

          {isError && (
            <p className="text-red-500 text-sm -mt-2">{error.message}</p>
          )}

          <Button
            type="submit"
            disabled={
              Object.keys(form.formState.errors).length > 0 || isPending
            }
            className="w-full py-5 text-black bg-white hover:bg-gray-200 font-semibold"
          >
            {isPending ? <Loader className="animate-spin" /> : "Sign in"}
          </Button>
          <div className="flex justify-end">
            <p className="text-sm text-gray-400 mt-1">
              First time here?{" "}
              <Link href="/auth/signup" className="underline text-white">
                Sign up for free
              </Link>
            </p>
          </div>
          <Link
            href="/auth/forgot-password"
            className="block text-center mt-3 font-semibold text-white hover:underline"
          >
            Forgot your password?
          </Link>
        </form>

        <div className="my-4 flex items-center gap-2">
          <hr className="flex-grow border-gray-600" />
          <span className="text-gray-400 text-sm">OR</span>
          <hr className="flex-grow border-gray-600" />
        </div>

        <Button
          type="button"
          disabled={isPending}
          onClick={() => {
            window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`;
          }}
          className="w-full py-5 bg-gray-900 cursor-pointer hover:bg-cyan-950"
        >
          Sign in with Google
        </Button>

        <p className="mt-6 text-xs text-center text-gray-500">
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
