"use client";

import * as React from "react";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";
import {
  proposalStatusData,
  monthlyProposalsData,
  engagementData,
  jobCategoriesData,
} from "@/public/data/dummy";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const calculateSuccessRate = () => {
  const accepted =
    proposalStatusData.find((d) => d.status === "Accepted")?.count || 0;
  const total = proposalStatusData.reduce((sum, { count }) => sum + count, 0);
  return Math.round((accepted / total) * 100);
};

const calculateMonthlyTrend = () => {
  const last = monthlyProposalsData[monthlyProposalsData.length - 1].proposals;
  const prev = monthlyProposalsData[monthlyProposalsData.length - 2].proposals;
  return Math.round(((last - prev) / prev) * 100);
};

const calculateTopCategory = () => {
  const top = jobCategoriesData.reduce((prev, current) =>
    prev.jobs > current.jobs ? prev : current
  );
  const total = jobCategoriesData.reduce((sum, { jobs }) => sum + jobs, 0);
  return {
    name: top.category,
    percentage: Math.round((top.jobs / total) * 100),
  };
};

export default function ChartDashboard() {
  const successRate = calculateSuccessRate();
  const monthlyTrend = calculateMonthlyTrend();
  const totalEngagement = engagementData.reduce(
    (sum, { count }) => sum + count,
    0
  );
  const topCategory = calculateTopCategory();

  return (
    <div className="mt-20 grid grid-cols-1 gap-4 md:grid-cols-2">
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Application Status</CardTitle>
          <CardDescription>Your proposal breakdown</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={proposalStatusData}
                dataKey="count"
                nameKey="status"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {proposalStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 font-medium leading-none">
            Success rate: {successRate}%
            {successRate >= 50 ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
          </div>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Monthly Applications</CardTitle>
          <CardDescription>Your submission activity</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyProposalsData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Bar
                dataKey="proposals"
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            {monthlyTrend >= 0 ? "Increased" : "Decreased"} by{" "}
            {Math.abs(monthlyTrend)}%
            {monthlyTrend >= 0 ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
          </div>
        </CardFooter>
      </Card>
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Profile Engagement</CardTitle>
          <CardDescription>Employer interactions</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={engagementData}
                dataKey="count"
                nameKey="type"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {engagementData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 font-medium leading-none">
            Total interactions: {totalEngagement}
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
        </CardFooter>
      </Card>
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Job Categories</CardTitle>
          <CardDescription>Popular industries</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={jobCategoriesData}
                dataKey="jobs"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {jobCategoriesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 font-medium leading-none">
            {topCategory.name} leads with {topCategory.percentage}%
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
