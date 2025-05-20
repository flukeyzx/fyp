"use client";

import {
  User,
  MapPin,
  Link as LinkIcon,
  Briefcase,
  Calendar,
  Mail,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserPublicProfile } from "@/lib/apis";
import { useToken } from "@/context/TokenContext";
import LoadingSpinner from "@/components/ui/loader";
import Link from "next/link";

export default function UserProfile({ params }) {
  const { userId } = use(params);
  const { authToken } = useToken();

  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["getUserPublicProfile"],
    queryFn: () => getUserPublicProfile(userId, authToken),
    enabled: !!authToken,
    select: (data) => data.user,
  });

  if (isLoading) {
    return (
      <div className="-mt-36">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <p>{error.message || "Oops! something went wrong."}</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">
      <div className="flex justify-center gap-2 items-center text-center space-y-4">
        <Avatar className="w-32 h-32 border-4 border-background shadow-md">
          <AvatarImage src={user.avatar} />
          <AvatarFallback className="text-2xl font-medium bg-gradient-to-br from-primary to-primary-light text-white">
            {user.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>

        <div>
          <h1 className="text-3xl font-bold text-foreground/95">{user.name}</h1>
          <div className="mt-2 text-sm text-muted-foreground space-y-1">
            <div className="flex items-center justify-center gap-2">
              <Mail className="w-4 h-4" />
              <span>{user.email}</span>
            </div>
            {user.location && (
              <div className="flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{user.location}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 md:col-span-2 bg-background border border-border rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground mb-2">
            About Me
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {user.bio || "User does not have any bio."}
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-background border border-border rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-foreground mb-2">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {user.skills?.length > 0 ? (
                user.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full font-medium"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-xs text-muted-foreground">
                  User does not have any skills.
                </span>
              )}
            </div>
          </div>

          <div className="bg-background border border-border rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-foreground mb-2">
              Resume
            </h2>
            {user.resume ? (
              <Link
                href={user.resume}
                target="_blank"
                className="text-sm text-primary hover:underline flex items-center gap-1"
              >
                <LinkIcon className="w-4 h-4" />
                View Resume (PDF)
              </Link>
            ) : (
              <p className="text-muted-foreground text-sm">
                User does not have a resume.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
