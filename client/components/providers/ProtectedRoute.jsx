"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import axios from "@/lib/axios.config";
import LoadingSpinner from "../ui/loader";

export default function ProtectedRoute({ children }) {
  const router = useRouter();

  const { data: authenticatedUser, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      try {
        const response = await axios.get("/auth/profile");

        if (!response || !response.data || response.status !== 200) {
          throw new Error("User not authenticated");
        }

        return response.data;
      } catch (error) {
        throw new Error("User not authenticated.");
      }
    },
  });

  useEffect(() => {
    if (!isLoading && !authenticatedUser) {
      router.push("/auth/login");
    }
  }, [isLoading, authenticatedUser, router]);

  if (isLoading) {
    return (
      <div className="-mt-36">
        <LoadingSpinner />
      </div>
    );
  }

  if (!authenticatedUser) {
    return null;
  }

  return <>{children}</>;
}
