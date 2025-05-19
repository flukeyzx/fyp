"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown, Star } from "lucide-react";
import { testimonials } from "./userfeedback";

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="testimonials" className="py-20 px-6 bg-background">
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold">What Our Users Say</h3>
      </div>

      <div className="relative max-w-3xl mx-auto group">
        <div className="absolute top-1/2 -translate-y-1/2 right-[-70px] flex flex-col gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            onClick={handlePrev}
            variant="secondary"
            size="icon"
            className="w-10 h-10 rounded-full shadow-md"
          >
            <ChevronUp className="w-5 h-5" />
          </Button>
          <Button
            onClick={handleNext}
            variant="secondary"
            size="icon"
            className="w-10 h-10 rounded-full shadow-md"
          >
            <ChevronDown className="w-5 h-5" />
          </Button>
        </div>
        <div className="relative h-auto flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <Card className="p-15 shadow-lg text-center h-full flex flex-row justify-between items-center space-y-4">
                <div className="flex items-center gap-4">
                  <img
                    src={testimonials[current].image}
                    alt={testimonials[current].name}
                    className="rounded-full w-16 h-16 object-cover"
                  />
                  <div className="text-left">
                    <h6 className="font-semibold">
                      {testimonials[current].name}
                    </h6>
                    <p className="text-sm text-muted-foreground">
                      {testimonials[current].role}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="italic text-muted-foreground max-w-xs text-center">
                    "{testimonials[current].message}"
                  </p>
                  <div className="flex justify-center gap-1 items-center">
                    <h1>Ratting </h1>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        className={`w-5 h-5 ${
                          index < testimonials[current].rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
