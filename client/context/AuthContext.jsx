"use client";

import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useState, useEffect } from "react";
import { fetchUserProfile } from "@/lib/apis";
import LoadingSpinner from "@/components/ui/loader";
import { useRouter } from "next/navigation";

const AuthContext = createContext(null);

export default function AuthProvider({ authToken, children }) {
  const router = useRouter();
  const {
    data: user,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["getProfile"],
    queryFn: () => fetchUserProfile(authToken),
    select: (data) => data.user,
  });

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/signup");
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, refetch, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
