"use client";

import {
  ArrowRight,
  Briefcase,
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
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function RightSidebar() {
  const [expandedSection, setExpandedSection] = useState(null);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "application",
      title: "Application submitted",
      description:
        "Your application for Frontend Developer at TechCorp has been submitted.",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      type: "message",
      title: "New message",
      description: "You have a new message from the recruiter at DesignHub.",
      time: "1 day ago",
      read: true,
    },
  ]);

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

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  return (
    <aside className="hidden lg:block w-80 border-l border-border bg-background">
      <div className="sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto custom-scroll pr-2">
        <div className="space-y-6 p-4">
          <div className="border border-border rounded-2xl bg-popover shadow-sm">
            <button
              className="flex items-center justify-between w-full p-4 hover:bg-accent/50 transition-colors rounded-t-2xl"
              onClick={() => toggleSection("events")}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
                  <Calendar className="w-5 h-5" />
                </div>
                <h3 className="font-medium">Upcoming Events</h3>
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
                  <div className="flex items-start gap-3 p-3 hover:bg-accent/30 rounded-xl transition">
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
                  <div className="flex items-start gap-3 p-3 hover:bg-accent/30 rounded-xl transition">
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
              className="flex items-center justify-between w-full p-4 hover:bg-accent/50 transition-colors rounded-t-2xl"
              onClick={() => toggleSection("jobs")}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-green-500/10 text-green-500">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="font-medium">Suggested For You</h3>
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
                      className="border border-border rounded-xl p-3 hover:bg-accent/30 transition"
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
          <div className="border border-border rounded-2xl bg-popover shadow-sm">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-red-500/10 text-red-500">
                  <Bell className="w-5 h-5" />
                </div>
                <h3 className="font-medium">Notifications</h3>
              </div>
              <button
                onClick={markAllAsRead}
                className="text-sm text-primary hover:underline"
              >
                Mark all read
              </button>
            </div>

            <div className="space-y-3 px-4 pb-4 max-h-96 overflow-y-auto custom-scroll">
              {notifications.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-6">
                  No new notifications
                </p>
              ) : (
                notifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    layout
                    className={`p-3 rounded-xl border transition ${
                      !notification.read
                        ? "bg-primary/5 border-primary/10"
                        : "bg-background border-border"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex gap-3">
                        <div
                          className={`mt-0.5 ${
                            !notification.read
                              ? "text-primary"
                              : "text-muted-foreground"
                          }`}
                        >
                          {notification.type === "application" && (
                            <Briefcase className="w-5 h-5" />
                          )}
                          {notification.type === "message" && (
                            <MessageSquare className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <h4
                            className={`text-sm font-medium ${
                              !notification.read
                                ? "text-foreground"
                                : "text-muted-foreground"
                            }`}
                          >
                            {notification.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {notification.description}
                          </p>
                          <span className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {notification.time}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="text-muted-foreground hover:text-primary"
                            title="Mark as read"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="text-muted-foreground hover:text-destructive"
                          title="Delete"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
