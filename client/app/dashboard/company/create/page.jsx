"use client";

import { useToken } from "@/context/TokenContext";
import { useRouter } from "next/navigation";
import CreateCompanyClient from "./CreateCompanyClient";
import { useEffect } from "react";

export default function CreateCompanyPage() {
  const { authToken } = useToken();
  const router = useRouter();

  useEffect(() => {
    if (!authToken) {
      router.push("/auth/signup");
    }
  }, []);

  return <CreateCompanyClient token={authToken} />;
}
