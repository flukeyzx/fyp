"use client";

import {
  ArrowRight,
  Bookmark,
  Users,
  Bell,
  MessageSquare,
  CheckCircle,
  Clock,
  X,
  ChevronDown,
  ChevronUp,
  Calendar,
  Rocket,
  User,
  Building2,
  MailCheck,
  Building,
  BriefcaseBusiness,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useToken } from "@/context/TokenContext";
import LoadingSpinner from "../ui/loader";
import {
  getAllNotifications,
  markNotificationsAsRead,
  deleteNotification,
} from "@/lib/apis";
import { formatDistanceToNow } from "date-fns";
import { useToast } from "@/hooks/use-toast";

export function RightSidebar() {
  const [expandedSection, setExpandedSection] = useState(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { authToken } = useToken();

  const {
    data: notifications,
    isLoading: isLoadingNotifications,
    isError: isErrorNotifications,
    error: errorNotification,
    refetch: refetchNotifications,
  } = useQuery({
    queryKey: ["getUnreadNotifications", authToken],
    queryFn: () => getAllNotifications(authToken),
    select: (data) => data.notifications,
  });

  if (isErrorNotifications) {
    return (
      <div>
        <span className="text-red-500 w-80 border-l border-border bg-background">
          {errorNotification.message || "Failed to load notifications."}
        </span>
      </div>
    );
  }

  const suggestedJobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechCorp",
      location: "Remote",
      salary: "$80,000 - $100,000",
      match: "85%",
    },
    {
      id: 2,
      title: "UX Designer",
      company: "DesignHub",
      location: "New York, NY",
      salary: "$90,000 - $110,000",
      match: "78%",
    },
  ];

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const markAllAsRead = async () => {
    setLoading(true);
    if (notifications.length === 0) {
      setLoading(false);
      toast({
        title: "No notifications to mark as read",
        description: "You have no unread notifications.",
        variant: "default",
      });
      return null;
    }
    try {
      await markNotificationsAsRead(
        notifications.map((n) => n.id),
        authToken
      );
      toast({
        title: "All notifications marked as read",
        description: "You have marked all notifications as read.",
        variant: "default",
      });
      refetchNotifications();
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
      toast({
        title: "Error",
        description: "Failed to mark all notifications as read.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    setLoading(true);
    try {
      await markNotificationsAsRead([id], authToken);
      toast({
        title: "Notification marked as read",
        description: "You have marked the notification as read.",
        variant: "default",
      });
      refetchNotifications();
    } catch (error) {
      console.error("Error marking notification as read:", error);
      toast({
        title: "Error",
        description: "Failed to mark notification as read.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteHandler = async (id) => {
    setLoading(true);
    try {
      await deleteNotification(id, authToken);
      toast({
        title: "Notification deleted",
        description: "You have deleted the notification.",
        variant: "default",
      });
      refetchNotifications();
    } catch (error) {
      console.error("Error deleting notification:", error);
      toast({
        title: "Error",
        description: "Failed to delete notification.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside className="hidden lg:block w-80 border-l border-border bg-background">
      <div className="sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto custom-scroll pr-2">
        <div className="space-y-6 p-4">
          <div className="border border-border rounded-2xl bg-popover shadow-sm">
            <button
              className="flex items-center justify-between w-full p-4 hover:bg-card/80 transition-colors rounded-2xl cursor-pointer"
              onClick={() => toggleSection("events")}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
                  <Calendar className="w-5 h-5" />
                </div>
                <h3 className="font-medium">Upcoming Events </h3>
              </div>
              {expandedSection === "events" ? (
                <ChevronUp className="w-5 h-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              )}
            </button>

            <AnimatePresence initial={false}>
              {expandedSection === "events" && (
                <motion.div
                  className="space-y-3 p-4 pt-0"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  <div className="flex items-start gap-3 p-3 hover:bg-card/80 cursor-pointer rounded-xl transition">
                    <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
                      <Rocket className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Tech Job Fair 2023</h4>
                      <p className="text-sm text-muted-foreground">
                        Oct 15-17 • Virtual
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 hover:bg-card/80 cursor-pointer rounded-xl transition">
                    <div className="p-2 rounded-xl bg-purple-500/10 text-purple-500">
                      <Bookmark className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Resume Workshop</h4>
                      <p className="text-sm text-muted-foreground">
                        Sep 28 • Online
                      </p>
                    </div>
                  </div>
                  <button className="w-full flex items-center justify-center gap-2 text-sm text-primary hover:underline">
                    View all events <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="border border-border rounded-2xl bg-popover shadow-sm">
            <button
              className="flex items-center justify-between w-full p-4 hover:bg-card/80 cursor-pointer transition-colors rounded-2xl"
              onClick={() => toggleSection("jobs")}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-green-500/10 text-green-500">
                  <Users className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">Suggestions</h3>
                  <span className="text-sm text-muted-foreground">(soon)</span>
                </div>
              </div>
              {expandedSection === "jobs" ? (
                <ChevronUp className="w-5 h-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              )}
            </button>

            <AnimatePresence initial={false}>
              {expandedSection === "jobs" && (
                <motion.div
                  className="space-y-3 p-4 pt-0"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  {suggestedJobs.map((job) => (
                    <div
                      key={job.id}
                      className="border border-border rounded-xl p-3 hover:bg-card/80 cursor-pointer transition"
                    >
                      <h4 className="font-medium">{job.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {job.company} • {job.location}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-green-500 font-medium">
                          {job.salary}
                        </span>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                          {job.match} Match
                        </span>
                      </div>
                    </div>
                  ))}
                  <button className="w-full flex items-center justify-center gap-2 text-sm text-primary hover:underline">
                    See all jobs <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="border border-border rounded-2xl bg-popover shadow-sm max-h-[500px] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-red-500/10 text-red-500">
                  <Bell className="w-5 h-5" />
                </div>
                <h3 className="font-medium">Notifications</h3>
              </div>
              <button
                onClick={markAllAsRead}
                className="text-sm text-primary hover:underline cursor-pointer"
              >
                Mark all read
              </button>
            </div>

            <div className="flex-1 overflow-y-auto max-h-[400px] px-4 pb-4 custom-scroll">
              {loading || isLoadingNotifications ? (
                <div className="flex items-center justify-center -mt-78">
                  <LoadingSpinner />
                </div>
              ) : notifications.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-6">
                  No notifications found.
                </p>
              ) : (
                <div className="space-y-4 pr-2 pt-4">
                  {notifications.map((notif) => (
                    <NotificationCard
                      key={notif.id}
                      {...notif}
                      onMarkAsRead={markAsRead}
                      onDelete={deleteHandler}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

const NotificationCard = ({
  id,
  fromType,
  type,
  message,
  isRead,
  createdAt,
  onMarkAsRead,
  onDelete,
}) => {
  const getIcon = () => {
    switch (type) {
      case "FOLLOW":
        return (
          <div className="flex gap-2 items-center">
            <User className="w-5 h-5 text-blue-500" />
            <span className="text-xs">Follow</span>
          </div>
        );
      case "MESSAGE":
        return (
          <div className="flex gap-2 items-center">
            <MessageSquare className="w-5 h-5 text-indigo-500" />
            <span className="text-xs">Message</span>
          </div>
        );
      case "JOB_APPLICATION":
        return (
          <div className="flex gap-2 items-center">
            <Building className="w-5 h-5 text-indigo-500" />
            <span className="text-xs">Job Application</span>
          </div>
        );
      case "HIRING_UPDATE":
        return (
          <div className="flex gap-2 items-center">
            <Bell className="w-5 h-5 text-emerald-500" />
            <span className="text-xs">Hiring Update</span>
          </div>
        );
      case "APPLICATION_SUBMITTED":
        return (
          <div className="flex gap-2 items-center">
            <MailCheck className="w-5 h-5 text-amber-500" />
            <span className="text-xs">Application Submittion</span>
          </div>
        );
      case "NEW_JOB":
        return (
          <div className="flex gap-2 items-center">
            <BriefcaseBusiness className="w-5 h-5 text-green-500" />
            <span className="text-xs">New Job</span>
          </div>
        );
      case "SYSTEM":
        return <Bell className="w-5 h-5 text-red-500" />;
      case "CUSTOM":
      default:
        return <Bell className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getFromEntityIcon = () => {
    if (fromType === "USER")
      return <User className="w-4 h-4 text-muted-foreground" />;
    if (fromType === "COMPANY")
      return <Building2 className="w-4 h-4 text-muted-foreground" />;
    return null;
  };

  return (
    <div
      className={`p-4 rounded-xl border group transition relative cursor-pointer ${
        !isRead
          ? "bg-primary/5 border-primary/10"
          : "bg-background border-border"
      }`}
    >
      <button
        onClick={() => onDelete(id)}
        className="absolute cursor-pointer top-4 right-4 text-muted-foreground hover:text-destructive transition"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="flex flex-col gap-3 items-start">
        <div>{getIcon()}</div>
        <div className="flex-1">
          <p className="text-sm text-foreground">{message}</p>
          <div className="flex items-center gap-2 mt-2">
            {getFromEntityIcon()}
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          {!isRead && (
            <button
              onClick={() => onMarkAsRead(id)}
              className="group/button flex gap-2 px-2 items-center text-xs p-1 rounded-full transition cursor-pointer hover:bg-primary hover:text-primary-foreground"
            >
              Mark as read
              <CheckCircle className="w-4 h-4 text-primary group-hover/button:text-primary-foreground transition-all duration-300 ease-in" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
