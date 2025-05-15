"use client";

import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  UploadCloud,
  Mail,
  MapPin,
  Info,
  Sparkles,
  Pencil,
  FileX,
  File,
  FileText,
  UserPen,
  UserCog,
  Loader,
  Building2,
  Key,
  Shield,
  ArrowUpRight,
  ChevronRight,
} from "lucide-react";
import ProfileProgress from "@/components/common/ProfileProgress";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import {
  fetchUserProfile,
  getProfileScore,
  getUserCompany,
  updateUserAvatar,
  updateUserPassword,
  updateUserResume,
} from "@/lib/apis";
import { useToken } from "@/context/TokenContext";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import LoadingSpinner from "@/components/ui/loader";

export default function ProfilePage() {
  const [resume, setResume] = useState(null);
  const [isPasswordChanging, setIsPasswordChanging] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isResumeUploading, setIsResumeUploading] = useState(false);
  const [isPasswordUpdating, setIsPasswordUpdating] = useState(false);
  const [selectedResume, setSelectedResume] = useState(null);

  const fileInputRef = useRef(null);
  const { toast } = useToast();

  const { authToken } = useToken();
  const router = useRouter();

  useEffect(() => {
    if (!authToken) {
      router.push("/auth/signup");
    }
  }, []);

  const { user, refetch } = useAuth();

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
    const fileInput = document.getElementById("resume-upload");

    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleResumeUpload = async () => {
    if (!selectedResume) {
      toast({
        title: "Please select a resume file first",
      });
      return;
    }

    setIsResumeUploading(true);

    try {
      const formData = new FormData();
      formData.append("resume", selectedResume);

      const data = await updateUserResume(formData, authToken);

      setResume(data.resumeUrl);
      setSelectedResume(null);
      toast({
        title: "Resume updated successfully",
      });

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

  const handleEditCompany = () => {
    router.push(`/dashboard/company/edit/${company.id}`);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedAvatar(file);
      const previewUrl = URL.createObjectURL(file);
      setAvatarPreview(previewUrl);
    }
  };

  const handleAvatarUpload = async () => {
    if (!selectedAvatar) {
      toast({
        title: "Please select an Avatar first",
      });
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("avatar", selectedAvatar);

      const data = await updateUserAvatar(formData, authToken);

      if (!data.success) {
        toast({
          title: data.message || data.error,
        });
        return;
      }

      toast({
        title: "Profile picture updated successfully.",
      });

      setSelectedAvatar(null);
      setAvatarPreview(data.user.avatar);
      await refetch();

      router.refresh();
    } catch (error) {
      console.log("Error while updating user's avatar.", error.message);
      toast({
        title: error.message || "Failed to update user's Avatar.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleEdit = () => {
    router.push("/dashboard/profile/edit");
  };

  const handlePasswordChange = async () => {
    setIsPasswordUpdating(true);
    try {
      if (!hasPassword && passwords.new) {
        const res = await updateUserPassword(null, passwords.new, authToken);
        toast({
          title: res.message,
        });

        router.refresh();
        return;
      }

      if (passwords.new !== passwords.confirm) {
        toast({
          title: "Both passwords should be the same.",
        });
        return;
      }

      const res = await updateUserPassword(
        passwords.current,
        passwords.new,
        token
      );
      toast({
        title: res.message || "Password updated successfully.",
      });

      setIsPasswordChanging(false);
      router.refresh();
    } catch (error) {
      console.log("Error while updating user's password.", error.message);
      toast({
        title: error.message || "Something went wrong.",
      });
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
  const { hasPassword } = user;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-end justify-between">
        <div className="flex items-center gap-6">
          <div className="relative group">
            <label htmlFor="avatar-upload" className="cursor-pointer">
              <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                <AvatarImage src={avatarPreview} />
                <AvatarFallback className="text-2xl font-medium bg-gradient-to-br from-primary to-primary-light text-white">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 rounded-full bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Pencil className="w-6 h-6 text-white" />
              </div>
            </label>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleAvatarChange}
              className="hidden"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
            <div className="flex items-center gap-2 mt-1 text-gray-600">
              <Mail className="w-4 h-4" />
              <span>{user.email}</span>
            </div>
            {user.location && (
              <div className="flex items-center gap-2 mt-1 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{user.location}</span>
              </div>
            )}
          </div>
        </div>

        <Button onClick={handleEdit} variant="outline" className="gap-2">
          <Pencil className="w-4 h-4" />
          Edit Profile
        </Button>
      </div>

      <div className="bg-gradient-to-r from-primary to-primary-light rounded-xl p-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">Profile Strength</h2>
            <p className="text-primary-100">
              {profileScore >= 80
                ? "Excellent!"
                : profileScore >= 50
                ? "Good, but could be better"
                : "Needs improvement"}
            </p>
          </div>
          <div className="w-full md:w-64">
            <Progress
              value={profileScore}
              className="h-3 bg-white/20"
              indicatorClassName="bg-white"
            />
            <div className="flex justify-between mt-1 text-sm">
              <span>0%</span>
              <span>{profileScore}%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* About Section */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl flex items-center gap-2">
                <UserPen className="w-5 h-5 text-primary" />
                About
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {user.bio ? (
                <p className="text-gray-700">{user.bio}</p>
              ) : (
                <div className="text-gray-500 italic">No bio added yet</div>
              )}

              {user.skills && user.skills.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-500">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {user.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Resume Section */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Resume
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-3 rounded-lg ${
                      user.resume
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {user.resume ? (
                      <File className="w-5 h-5" />
                    ) : (
                      <FileX className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium">
                      {user.resume ? "Resume uploaded" : "No resume uploaded"}
                    </h3>
                    {user.resume && (
                      <a
                        href={user.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline flex items-center gap-1"
                      >
                        View resume <ArrowUpRight className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <Input
                      id="resume-upload"
                      type="file"
                      accept="application/pdf"
                      onChange={handleResumeSelect}
                      disabled={isResumeUploading}
                      className="cursor-pointer"
                    />
                  </div>
                  <Button
                    onClick={handleResumeUpload}
                    disabled={!selectedResume || isResumeUploading}
                    className="gap-2"
                  >
                    {isResumeUploading ? (
                      <Loader className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <UploadCloud className="w-4 h-4" />
                        Upload
                      </>
                    )}
                  </Button>
                </div>
                {selectedResume && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      Selected: {selectedResume.name}
                    </span>
                    <button
                      onClick={handleResumeCancel}
                      className="text-primary hover:underline"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Account Section */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl flex items-center gap-2">
                <UserCog className="w-5 h-5 text-primary" />
                Account
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Plan</h3>
                    <p className="font-medium">
                      {isFreePlan ? "Free Plan" : "Premium Plan"}
                    </p>
                  </div>
                  {isFreePlan && (
                    <Button
                      onClick={handlePlanUpgrade}
                      className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
                    >
                      Upgrade
                    </Button>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">AI Usage</span>
                    <span>{user.apiCallsThisMonth}/5</span>
                  </div>
                  <Progress
                    value={(user.apiCallsThisMonth / 5) * 100}
                    className="h-2"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Job Applications</span>
                    <span>{user.jobsAppliedThisMonth}/5</span>
                  </div>
                  <Progress
                    value={(user.jobsAppliedThisMonth / 5) * 100}
                    className="h-2"
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-gray-500" />
                    <span className="font-medium">Password</span>
                  </div>
                  {!isPasswordChanging && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsPasswordChanging(true)}
                      className="gap-2"
                    >
                      <Key className="w-4 h-4" />
                      {hasPassword ? "Change" : "Set"}
                    </Button>
                  )}
                </div>

                {isPasswordChanging && (
                  <div className="space-y-4">
                    <Separator />
                    <div className="grid gap-4">
                      {hasPassword && (
                        <div className="space-y-2">
                          <Label htmlFor="current-password">
                            Current Password
                          </Label>
                          <Input
                            type="password"
                            id="current-password"
                            value={passwords.current}
                            placeholder="Enter current password"
                            className="!h-10"
                            onChange={(e) =>
                              setPasswords({
                                ...passwords,
                                current: e.target.value,
                              })
                            }
                          />
                        </div>
                      )}
                      <div className="space-y-2">
                        <Label htmlFor="new-password">
                          {hasPassword ? "New Password" : "Set Password"}
                        </Label>
                        <Input
                          type="password"
                          id="new-password"
                          value={passwords.new}
                          placeholder={
                            hasPassword
                              ? "Create new password"
                              : "Set your password"
                          }
                          className="!h-10"
                          onChange={(e) =>
                            setPasswords({ ...passwords, new: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">
                          Confirm {hasPassword ? "New " : ""}Password
                        </Label>
                        <Input
                          type="password"
                          id="confirm-password"
                          value={passwords.confirm}
                          placeholder={`Confirm ${
                            hasPassword ? "new " : ""
                          }password`}
                          className="!h-10"
                          onChange={(e) =>
                            setPasswords({
                              ...passwords,
                              confirm: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <Button
                        onClick={handlePasswordChange}
                        disabled={isPasswordUpdating}
                        className="flex-1"
                      >
                        {isPasswordUpdating ? (
                          <Loader className="w-4 h-4 animate-spin" />
                        ) : (
                          "Update Password"
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsPasswordChanging(false);
                          setPasswords({ current: "", new: "", confirm: "" });
                        }}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Company Section */}
          {company && (
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-primary" />
                    Your Company
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleEditCompany}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                    {company.logo ? (
                      <img
                        src={company.logo}
                        alt="Company Logo"
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <Building2 className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium">{company.name}</h3>
                    <p className="text-sm text-gray-600">{company.industry}</p>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span>{company.location || "Location not specified"}</span>
                  </div>

                  {company.about && (
                    <div className="pt-2">
                      <h4 className="text-sm font-medium text-gray-500 mb-1">
                        About
                      </h4>
                      <p className="text-sm text-gray-700 line-clamp-3">
                        {company.about}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
