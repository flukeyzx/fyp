"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoadingSpinner from "../ui/loader";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute({ children }) {
  const router = useRouter();

  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && user === null) {
      router.push("/auth/login");
    }
  }, [user, isLoading, router]);

  if (isLoading || user === undefined) {
    return (
      <div className="flex items-center justify-center h-screen -mt-36">
        <LoadingSpinner />
      </div>
    );
  }

  return <>{children}</>;
}
