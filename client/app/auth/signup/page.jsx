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

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters." })
    .max(50, {
      message: "name must not exceed 50 characters.",
    }),
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

export default function Signup() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const { mutate, isPending, error, isError } = useMutation({
    mutationFn: async ({ name, email, password }) => {
      try {
        const response = await axios.post("/auth/signup", {
          name,
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
    onSuccess: (data) => {
      toast({
        title: "Account created successfully.",
      });
      router.push(`/auth/verify-email/${data.user.email}`);
    },
  });

  const onSubmit = async (values) => {
    mutate(values);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-cyan-900 to-blue-900 px-4">
      <div className="w-full max-w-md rounded-2xl text-white">
        <div className="text-center mb-8">
          <div className="mb-5 flex items-center justify-center">
            <img
              src="/assets/joblix.svg"
              alt="Logo"
              className="h-15 w-auto shadow-sm"
            />
          </div>
          <h1 className="text-xl font-semibold">Create Your Account</h1>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Input
            type="text"
            {...form.register("name")}
            placeholder="e.g. John Doe"
            className="bg-gray-900 border border-gray-700 text-white"
          />
          {form.formState.errors.name && (
            <p className="text-red-500 text-sm -mt-2">
              {form.formState.errors.name?.message}
            </p>
          )}

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
            {isPending ? <Loader className="animate-spin" /> : "Signup"}
          </Button>
          <div className="flex justify-center">
            <p className="text-sm text-gray-400 mt-1">
              Already have an account?{" "}
              <Link href="/auth/login" className="underline text-white">
                Login here
              </Link>
            </p>
          </div>
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
          className="w-full py-5 bg-gray-900 hover:bg-cyan-950 cursor-pointer"
        >
          Sign up with Google
        </Button>

        <p className="mt-6 text-xs text-center text-gray-500">
          By signing up, you agree to our{" "}
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
