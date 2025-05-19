"use client";

import OTPInput from "./OTPInput";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "@/lib/axios.config";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function VerifyEmailClient({ email }) {
  const [otp, setOtp] = useState("");
  const { toast } = useToast();
  const router = useRouter();
  const { refetch } = useAuth();

  const decodedEmail = decodeURIComponent(email);

  const {
    mutate: resendOtp,
    isPending: isPendingResendOtp,
    isError: isErrorResendOtp,
    error: errorResendOtp,
  } = useMutation({
    mutationFn: async () => {
      try {
        const response = await axios.post("auth/resend-otp", {
          email: decodedEmail,
        });

        return response.data;
      } catch (error) {
        if (error.response && error.response.data) {
          const serverErrorMessage =
            error.response.data.message || "Internal server error.";
          throw new Error(serverErrorMessage);
        }
        throw new Error("Error while sending OTP request.");
      }
    },
    onSuccess: () => {
      toast({
        title: "OTP resent successfully.",
      });
    },
  });

  const {
    mutate: sendOtp,
    isPending: isPendingSendOtp,
    isError: isErrorSendOtp,
    error: errorSendOtp,
  } = useMutation({
    mutationFn: async (otp) => {
      try {
        const response = await axios.post("/auth/verify-email", {
          email: decodedEmail,
          token: otp,
        });

        return response.data;
      } catch (error) {
        if (error.response && error.response.data) {
          const serverErrorMessage =
            error.response.data.message || "Internal server error.";
          throw new Error(serverErrorMessage);
        }
        throw new Error("Error while sending OTP request.");
      }
    },
    onSuccess: () => {
      toast({
        title: "User registered successfully.",
      });
      refetch();
      router.push("/");
    },
  });

  const handleResendOtp = () => {
    resendOtp();
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    sendOtp(otp);
  };
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-black via-cyan-900 to-blue-900 px-4">
      <form
        onSubmit={handleSendOtp}
        className="bg-gray-900 border border-gray-700 shadow-lg rounded-2xl p-8 max-w-md w-full text-white"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">
          Verify Your Email
        </h2>
        <p className="text-sm text-gray-400 text-center mb-8">
          Enter the 6-digit code we sent to your email address.
        </p>

        <OTPInput otp={otp} setOtp={setOtp} />

        {(isErrorSendOtp || isErrorResendOtp) && (
          <p className="text-red-500 mt-4 -mb-2 text-sm">
            {errorSendOtp?.message || errorResendOtp?.message}
          </p>
        )}

        <Button
          type="submit"
          disabled={isPendingSendOtp || isPendingResendOtp}
          className="w-full mt-6 py-3 text-lg bg-white text-black font-semibold hover:bg-gray-200"
        >
          {isPendingSendOtp ? <Loader className="animate-spin" /> : "Verify"}
        </Button>

        <p className="text-sm text-gray-400 text-center mt-4">
          Didn't receive the code?{" "}
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={isPendingSendOtp || isPendingResendOtp}
            className="text-white underline hover:text-gray-300"
          >
            Resend
          </button>
        </p>
      </form>
    </div>
  );
}
