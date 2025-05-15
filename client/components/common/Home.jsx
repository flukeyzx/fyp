"use client";

import jobCategories from "@/lib/jobCategories";
import CategoryCarousel from "@/components/common/CategoryCarousel";
import { ArrowRight } from "lucide-react";
import JobStatusSection from "./AppliedJobsStatus";
import Charts from "./Graphs";

export default function Home() {
  return (
    <div className="flex">
      <div className="flex-1 p-8 bg-transparent min-h-screen">
        <div className="relative w-full h-96 flex bg-card text-foreground items-center justify-between px-10 rounded-3xl">
          <div className="absolute inset-0 flex justify-around items-center opacity-80 overflow-hidden">
            <img
              src="/assets/joblix.svg"
              className="w-22 h-22 blur-sm absolute top-[-10%] right-60"
              alt="Logo 1"
            />
            <img
              src="/assets/joblix.svg"
              className="w-32 h-32 blur-sm absolute top-[-10%] left-10 rotate-6"
              alt="Logo 2"
            />
            <img
              src="/assets/joblix.svg"
              className="w-32 h-32 blur-sm absolute bottom-[-10%] right-0 rotate-30"
              alt="Logo 3"
            />
          </div>

          <div className="relative w-1/2 flex flex-wrap justify-center items-center">
            <img
              src="https://media.istockphoto.com/id/1207718210/photo/cinematic-portrait-of-handsome-young-woman-in-neon-lighted-interior.jpg?s=612x612&w=0&k=20&c=nF2puYTbJ7k_fjryTDOh1jy2ASyEsEBpl-yqdCrxBhQ="
              className="absolute w-36 h-60 rounded-lg rotate-[30deg] left-40  shadow-lg"
              alt="Job 1"
            />
            <img
              src="https://www.shutterstock.com/image-photo/future-portrait-female-fashion-model-260nw-1917850937.jpg"
              className="absolute w-36 h-60 rounded-lg rotate-[20deg] left-35 shadow-lg"
              alt="Job 2"
            />
            <img
              src="https://media.istockphoto.com/id/1327291547/photo/portrait-of-handsome-young-caucasian-man-sitting-at-home-in-neon-orange-pink-lighted-room.jpg?s=612x612&w=0&k=20&c=V0QBTllXBGnbN3fyU5hRF6BCX-9PmlSvJCEmdNxU6vk="
              className="absolute w-36 h-60 rounded-lg rotate-[10deg] left-30 shadow-lg"
              alt="Job 3"
            />
            <img
              src="https://media.istockphoto.com/id/1202916314/photo/cinematic-portrait-of-handsome-young-woman-in-neon-lighted-interior.jpg?s=612x612&w=0&k=20&c=iTpmEzJjLkCNqPB95WjHMTdkqJLMdQAMoNt5zEf0Zd4="
              className="absolute w-36 h-60 rounded-lg rotate-[0deg] left-25 shadow-lg"
              alt="Job 5"
            />
            <img
              src="https://thumbs.dreamstime.com/b/portrait-group-people-multicolored-background-neon-light-collage-portraits-different-models-flyer-made-concept-emotions-219681402.jpg"
              className="absolute w-36 h-60 rounded-lg rotate-[-10deg] left-20 shadow-lg"
              alt="Job 4"
            />
          </div>

          <div className="w-1/2 text-right">
            <h1 className="text-5xl font-bold drop-shadow-xl">
              Find Your Dream <span className="gradient-text">Job Now!</span>
            </h1>
          </div>
        </div>
        <Charts />
        <div className="flex justify-center">
          <div className="mt-20 w-60 h-1 bg-gradient-to-r from-sky-400/70 via-blue-500/80 to-cyan-600/60 rounded-full"></div>
        </div>

        <h2 className="mt-24 text-3xl font-bold flex flex-col items-center mb-10">
          Top Job Categories
        </h2>
        <div>
          <CategoryCarousel />
        </div>

        <div className="flex justify-center">
          <div className="mt-20 w-60 h-1 bg-gradient-to-r from-sky-400/70 via-blue-500/80 to-cyan-600/60 rounded-full"></div>
        </div>

        <div className="mt-24 p-6 bg-card backdrop-blur-lg rounded-2xl shadow-lg flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-10 ">Explore Job Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {jobCategories.map((category, index) => (
              <div
                key={index}
                className="group relative flex flex-col p-6 bg-popover rounded-xl shadow-lg cursor-pointer hover:opacity-90 transition duration-300 min-h-40"
                onClick={() => (window.location.href = category.link)}
              >
                <div className="flex-1">
                  <span className="text-lg font-bold leading-tight">
                    {category.title}
                  </span>
                  <p className="text-sm text-gray-400 mt-1">
                    {category.description}
                  </p>
                </div>

                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 ease-in-out">
                  <div className="flex items-center text-sm text-blue-400 gap-1">
                    <span>See More</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <div className="mt-20 w-60 h-1 bg-gradient-to-r from-sky-400/70 via-blue-500/80 to-cyan-600/60 rounded-full"></div>
        </div>

        <div className="mt-24">
          <JobStatusSection />
        </div>

        <div className="flex justify-center">
          <div className="mt-20 w-60 h-1 bg-gradient-to-r from-sky-400/70 via-blue-500/80 to-cyan-600/60 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
