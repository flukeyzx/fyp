"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import jobCategories from "@/lib/jobCategories";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CategoryCarousel() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef(null);

  const total = jobCategories.length;

  const slideTo = (newIndex) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(newIndex);
    setTimeout(() => setIsAnimating(false), 400);
  };

  const nextSlide = () => slideTo((currentIndex + 1) % total);
  const prevSlide = () => slideTo((currentIndex - 1 + total) % total);

  const handleVisibility = (visible) => {
    clearTimeout(timeoutRef.current);
    setShowControls(visible);
    if (!visible) {
      timeoutRef.current = setTimeout(() => setShowControls(false), 400);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!showControls && !isAnimating) nextSlide();
    }, 4000);
    return () => {
      clearInterval(interval);
      clearTimeout(timeoutRef.current);
    };
  }, [showControls, isAnimating]);

  const getVisibleIndexes = () => {
    const prev = (currentIndex - 1 + total) % total;
    const next = (currentIndex + 1) % total;
    return [prev, currentIndex, next];
  };

  const visibleIndexes = getVisibleIndexes();

  return (
    <div
      className="relative w-full max-w-4xl mx-auto group p-6 rounded-lg bg-background text-foreground"
      onMouseEnter={() => handleVisibility(true)}
      onMouseLeave={() => handleVisibility(false)}
    >
      {/* Controls */}
      <div className="absolute inset-0 flex items-center justify-between z-20 pointer-events-none">
        <button
          onClick={prevSlide}
          className={`p-2 rounded-full hover:bg-muted transition-all transform pointer-events-auto ${
            showControls
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-4"
          } shadow-lg ml-4 bg-card cursor-pointer text-card-foreground`}
          aria-label="Previous category"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextSlide}
          className={`p-2 rounded-full hover:bg-muted transition-all transform pointer-events-auto ${
            showControls
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-4"
          } shadow-lg mr-4 bg-card cursor-pointer text-card-foreground`}
          aria-label="Next category"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="h-52 flex items-center justify-center overflow-hidden relative">
        <div className="relative w-full h-full flex items-center justify-center">
          {visibleIndexes.map((index, idx) => {
            const category = jobCategories[index];
            const position = idx - 1;

            return (
              <div
                key={category.id}
                className={`absolute transition-all duration-700 ease-in-out cursor-pointer shadow-lg flex items-center justify-between bg-card/80 backdrop-blur-sm hover:bg-card hover:shadow-xl border border-border ${
                  position === 0
                    ? "scale-110 opacity-100 z-20 w-80 h-44 rounded-xl"
                    : "scale-95 opacity-70 z-10 w-64 h-40 rounded-lg"
                }`}
                style={{
                  transform: `translateX(${position * 260}px)`,
                }}
                onClick={() =>
                  router.push(
                    `/dashboard/browse?q=${encodeURIComponent(category.title)}`
                  )
                }
              >
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-24 h-24 rounded-lg object-cover m-4"
                />
                <div className="text-right pr-4">
                  <h2 className="leading-tight text-lg font-bold text-card-foreground">
                    {category.title}
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    {category.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-6">
        {jobCategories.map((_, index) => (
          <button
            key={index}
            onClick={() => slideTo(index)}
            className={`h-3 rounded-full transition-all ${
              index === currentIndex
                ? "bg-primary w-6"
                : "bg-muted-foreground/30 w-3"
            }`}
            aria-label={`Go to category ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
