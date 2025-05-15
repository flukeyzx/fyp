"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import jobCategories from "@/lib/jobCategories";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CategoryCarousel() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef(null);
  const carouselRef = useRef(null);

  const memoizedCategories = useMemo(
    () =>
      jobCategories.map((category, index) => {
        const position =
          (index - currentIndex + jobCategories.length) % jobCategories.length;
        return {
          ...category,
          position,
          isActive: position === 0,
          isNext: position === 1,
          isPrev: position === jobCategories.length - 1,
        };
      }),
    [currentIndex, jobCategories]
  );

  const slideTo = (newIndex) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(newIndex);
    setTimeout(() => setIsAnimating(false), 400);
  };

  const nextSlide = () => slideTo((currentIndex + 1) % jobCategories.length);
  const prevSlide = () =>
    slideTo((currentIndex - 1 + jobCategories.length) % jobCategories.length);

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

  return (
    <div
      className="relative w-full max-w-4xl mx-auto group p-6 rounded-lg"
      ref={carouselRef}
      onMouseEnter={() => handleVisibility(true)}
      onMouseLeave={() => handleVisibility(false)}
    >
      <div className="absolute inset-0 flex items-center justify-between z-20 pointer-events-none">
        <button
          onClick={prevSlide}
          className={`p-2 rounded-full hover:bg-muted transition-all transform pointer-events-auto ${
            showControls
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-4"
          } shadow-lg ml-4 bg-card cursor-pointer`}
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
          } shadow-lg mr-4 bg-card cursor-pointer`}
          aria-label="Next category"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          {memoizedCategories.map((category) => (
            <div
              key={category.id}
              className={`absolute transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] cursor-pointer will-change-transform ${
                category.isActive
                  ? "z-20 scale-100 opacity-100 translate-x-0"
                  : category.isNext
                  ? "z-10 scale-95 opacity-90 translate-x-64"
                  : category.isPrev
                  ? "z-10 scale-95 opacity-90 -translate-x-64"
                  : "z-0 scale-90 opacity-0 translate-x-0"
              }`}
              onClick={() => router.push(category.link)}
            >
              <div
                className={`p-6 rounded-xl bg-gradient-to-br from-card to-muted border border-white/20 hover:border-white/60 transition-all ${
                  category.isActive ? "w-80 h-48" : "w-64 h-40"
                }`}
              >
                <div className="flex flex-col h-full px-4 py-2">
                  <h2
                    className={`${
                      category.isActive ? "text-xl" : "text-base"
                    } font-semibold mb-2`}
                  >
                    {category.title}
                  </h2>
                  <p
                    className={`${
                      category.isActive ? "text-sm" : "text-xs"
                    } text-muted-foreground line-clamp-3`}
                  >
                    {category.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-6">
        {jobCategories.map((_, index) => (
          <button
            key={index}
            onClick={() => slideTo(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex
                ? "bg-primary w-6"
                : "bg-muted-foreground/30"
            }`}
            aria-label={`Go to category ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
