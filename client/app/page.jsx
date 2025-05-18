"use client";

import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import LandingPage from "@/components/common/LandigPage";

const Page = () => {
  const searchParams = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    const successMessage = searchParams.get("success");
    const errorMessage = searchParams.get("error");

    if (successMessage) {
      toast({
        title: "Authentication Successful",
      });
    }

    if (errorMessage) {
      toast({
        title: "Authentication Failed",
        description: "Unable to authenticate your account.",
        variant: "destructive",
      });
    }
  }, [searchParams, toast]);

  return (
    <div>
      <LandingPage />
    </div>
  );
};

export default Page;
