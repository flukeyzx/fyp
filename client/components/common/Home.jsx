"use client";

import jobCategories from "@/lib/jobCategories";
import CategoryCarousel from "@/components/common/CategoryCarousel";
import {
  ArrowRight,
  Zap,
  Briefcase,
  ChevronRight,
  ArrowRightCircle,
} from "lucide-react";
import { RightSidebar } from "./RightSideBar";
import Link from "next/link";
import SearchBar from "@/components/common/JobSearch";
import SuggestedCompanies from "./SuggestedCompanies";
import ModernFooter from "./FooterforCompany";

export default function Home() {
  return (
    <div>
      <div className="flex">
        <div className="flex-1 p-8 bg-transparent min-h-screen">
          <SearchBar />

          <div className="max-w-7xl mx-auto mt-24 rounded-xl">
            <img
              src="/assets/banner2.svg"
              alt="Banner 2"
              className="object-contain rounded-xl flex-1 w-full h-auto"
            />
          </div>

          <div className="flex justify-center">
            <div className="mt-20 w-60 h-1 bg-gradient-to-r from-secondary/70 via-primary/70 to-primary/90 rounded-full"></div>
          </div>
          <h2 className="mt-24 text-3xl font-bold flex flex-col items-center mb-10">
            Top Job Categories
          </h2>
          <div>
            <CategoryCarousel />
          </div>

          <div className="flex justify-center">
            <div className="mt-20 w-60 h-1 bg-gradient-to-r from-secondary/70 via-primary/70 to-primary/90 rounded-full"></div>
          </div>
          <div className="mt-24">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-2 rounded-full text-sm font-medium mb-4">
                <Zap className="w-4 h-4" />
                <span>Hot Categories</span>
              </div>
              <h2 className="text-4xl font-bold text-foreground mb-3">
                Explore In-Demand Fields
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover opportunities in trending industries
              </p>
            </div>
            <div className="px-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {jobCategories.slice(0, 9).map((category, index) => (
                  <Link
                    key={index}
                    href={`/dashboard/browse?q=${encodeURIComponent(
                      category.title
                    )}`}
                    className="group relative overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-all duration-300 min-h-[240px] border border-border bg-gradient-to-br from-primary/5 via-background to-secondary/10"
                  >
                    <div className="relative z-10 h-full flex flex-col p-8">
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        {category.title}
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        {category.description}
                      </p>

                      <div className="mt-auto">
                        <span className="flex justify-between items-center w-35 px-4 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary">
                          Search Jobs <ArrowRightCircle className="w-4 h-4" />
                        </span>
                      </div>
                      <div className="absolute bottom-6 right-6 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center transform translate-x-8 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <ArrowRight className="w-4 h-4 text-primary" />
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="text-center mt-16">
              <Link
                href={"/dashboard/browse"}
                className="inline-flex items-center px-6 py-3 bg-primary text-background rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-all hover:bg-primary/90"
              >
                Browse All Categories
                <ChevronRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="mt-15 w-60 h-1 bg-gradient-to-r from-secondary/70 via-primary/70 to-primary/90 rounded-full"></div>
          </div>

          <div className="mt-15">
            <SuggestedCompanies />
          </div>

          <div className="flex justify-center">
            <div className="mt-15 w-60 h-1 bg-gradient-to-r from-secondary/70 via-primary/70 to-primary/90 rounded-full"></div>
          </div>
        </div>

        <RightSidebar />
      </div>
      <div>
        <ModernFooter />
      </div>
    </div>
  );
}
