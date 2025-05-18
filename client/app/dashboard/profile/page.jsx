"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useToken } from "@/context/TokenContext";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import LoadingSpinner from "@/components/ui/loader";
import {
  getProfileScore,
  getUserCompany,
  updateUserAvatar,
  updateUserPassword,
  updateUserResume,
} from "@/lib/apis";

import ProfileHeader from "@/components/profileparts/ProfileHeader";
import ProfileCompletion from "@/components/profileparts/ProfileCompletion";
import AboutSection from "@/components/profileparts/AboutSection";
import ResumeSection from "@/components/profileparts/ResumeSection";
import AccountSection from "@/components/profileparts/AccountSection";
import CompanySection from "@/components/profileparts/CompanySection";

export default function ProfilePage() {
  const [resume, setResume] = useState(null);
  const [isPasswordChanging, setIsPasswordChanging] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isResumeUploading, setIsResumeUploading] = useState(false);
  const [isPasswordUpdating, setIsPasswordUpdating] = useState(false);
  const [selectedResume, setSelectedResume] = useState(null);

  const { toast } = useToast();
  const { authToken } = useToken();
  const router = useRouter();
  const { user, refetch } = useAuth();

  useEffect(() => {
    if (!authToken) {
      router.push("/auth/signup");
    }
  }, [authToken, router]);

  useEffect(() => {
    if (user?.avatar) {
      setAvatarPreview(user.avatar);
    }
  }, [user]);

  const {
    data: profileScore,
    isLoading: isLoadingProfileScore,
    isError: isErrorProfileScore,
  } = useQuery({
    queryKey: ["getProfileScore"],
    queryFn: () => getProfileScore(authToken),
    enabled: !!authToken,
    select: (data) => data.profileScore,
  });

  const {
    data: company,
    isLoading: isLoadingCompany,
    isError: isErrorCompany,
  } = useQuery({
    queryKey: ["getUserCompany"],
    queryFn: () => getUserCompany(authToken),
    enabled: !!authToken,
    select: (data) => data.company,
  });

  const handleResumeSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedResume(file);
    } else {
      e.target.value = "";
    }
  };

  const handleResumeCancel = () => {
    setSelectedResume(null);
    if (document.getElementById("resume-upload")) {
      document.getElementById("resume-upload").value = "";
    }
  };

  const handleResumeUpload = async () => {
    if (!selectedResume) {
      toast({ title: "Please select a resume file first" });
      return;
    }

    setIsResumeUploading(true);

    try {
      const formData = new FormData();
      formData.append("resume", selectedResume);

      const data = await updateUserResume(formData, authToken);

      setResume(data.resumeUrl);
      setSelectedResume(null);
      toast({ title: "Resume updated successfully" });
      await refetch();
      router.refresh();
    } catch (error) {
      console.error("Error uploading resume:", error);
      toast({
        title: error.message || "Failed to update resume",
        variant: "destructive",
      });
    } finally {
      setIsResumeUploading(false);
      if (document.getElementById("resume-upload")) {
        document.getElementById("resume-upload").value = "";
      }
    }
  };

  const handleEditCompany = () =>
    router.push(`/dashboard/company/edit/${company.id}`);

  const handleAvatarUpload = async (formData) => {
    if (!formData) {
      toast({ title: "Please select an Avatar first" });
      return;
    }

    setIsUploadingAvatar(true);

    try {
      const data = await updateUserAvatar(formData, authToken);

      if (!data.success) {
        toast({ title: data.message || data.error });
        return;
      }

      toast({ title: "Profile picture updated successfully." });
      setAvatarPreview(data.user.avatar);
      await refetch();
      router.refresh();
    } catch (error) {
      console.log("Error while updating user's avatar.", error.message);
      toast({ title: error.message || "Failed to update user's Avatar." });
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const handleEdit = () => {
    router.push("/dashboard/profile/edit");
  };

  const handlePasswordChange = async () => {
    setIsPasswordUpdating(true);

    try {
      if (!user.hasPassword && passwords.new) {
        const res = await updateUserPassword(null, passwords.new, authToken);
        toast({ title: res.message });
        router.refresh();
        return;
      }

      if (passwords.new !== passwords.confirm) {
        toast({ title: "Both passwords should be the same." });
        return;
      }

      const res = await updateUserPassword(
        passwords.current,
        passwords.new,
        authToken
      );
      toast({ title: res.message || "Password updated successfully." });

      setIsPasswordChanging(false);
      setPasswords({
        new: "",
        current: "",
        confirm: "",
      });
      router.refresh();
    } catch (error) {
      console.log("Error while updating user's password.", error.message);
      toast({ title: error.message || "Something went wrong." });
    } finally {
      setIsPasswordUpdating(false);
    }
  };

  const handlePlanUpgrade = () => {};

  if (isLoadingProfileScore || isLoadingCompany) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <LoadingSpinner />
      </div>
    );
  }

  if (isErrorProfileScore || isErrorCompany) {
    return <div>Oops! something went wrong.</div>;
  }

  const isFreePlan = user.subscriptionPlan === "FREE";

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <ProfileHeader
        user={user}
        avatarPreview={avatarPreview}
        onEdit={handleEdit}
        onAvatarUpload={handleAvatarUpload}
        isUploading={isUploadingAvatar}
        setIsUploading={setIsUploadingAvatar}
      />
      <ProfileCompletion profileScore={profileScore} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <AboutSection user={user} />
          <ResumeSection
            user={user}
            selectedResume={selectedResume}
            isResumeUploading={isResumeUploading}
            onResumeSelect={handleResumeSelect}
            onResumeUpload={handleResumeUpload}
            onResumeCancel={handleResumeCancel}
          />
        </div>

        <div className="space-y-6">
          <AccountSection
            user={user}
            isFreePlan={isFreePlan}
            hasPassword={user.hasPassword}
            isPasswordChanging={isPasswordChanging}
            setIsPasswordChanging={setIsPasswordChanging}
            passwords={passwords}
            setPasswords={setPasswords}
            isPasswordUpdating={isPasswordUpdating}
            handlePasswordChange={handlePasswordChange}
            handlePlanUpgrade={handlePlanUpgrade}
          />

          <CompanySection company={company} onEditCompany={handleEditCompany} />
        </div>
      </div>
    </div>
  );
}
