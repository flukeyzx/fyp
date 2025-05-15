"use client";

import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useState, useEffect } from "react";
import { fetchUserProfile } from "@/lib/apis";
import LoadingSpinner from "@/components/ui/loader";

const AuthContext = createContext(null);

export default function AuthProvider({ authToken, children }) {
  const {
    data: user,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["getProfile"],
    queryFn: () => fetchUserProfile(authToken),
    enabled: !!authToken,
    select: (data) => data.user,
  });

  if (isLoading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, refetch }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
