"use client";

import EditProfileClient from "./EditProfileClient";
import { useRouter } from "next/navigation";
import { useToken } from "@/context/TokenContext";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

export default function EditProfilePage() {
  const router = useRouter();

  const { authToken } = useToken();

  useEffect(() => {
    if (!authToken) {
      router.push("/auth/signup");
    }
  }, []);

  const { user, refetch } = useAuth();

  return <EditProfileClient user={user} token={authToken} refetch={refetch} />;
}
