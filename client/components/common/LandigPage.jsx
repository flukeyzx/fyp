"use client";
import React from "react";
import { useTheme } from "@/context/ThemeContext";
import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import CategoriesSection from "@/components/landing/CategoriesSection";
import UserFeedback from "@/components/landing/Testimonials";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import CallToActionSection from "@/components/landing/CallToActionSection";
import Footer from "@/components/landing/Footer";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const variants = [
  {
    hidden: { opacity: 0, scale: 0.95, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 60, damping: 14 },
    },
  },
  {
    hidden: { opacity: 0, x: -80, rotateZ: -5 },
    visible: {
      opacity: 1,
      x: 0,
      rotateZ: 0,
      transition: { type: "spring", stiffness: 70, damping: 18 },
    },
  },
  {
    hidden: { opacity: 0, y: 100, perspective: 600, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 80, damping: 20 },
    },
  },
  {
    hidden: { opacity: 0, y: 60, scale: 1.02 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 90,
        damping: 12,
      },
    },
  },
  {
    hidden: {
      opacity: 0,
      rotateX: -10,
      transformOrigin: "top center",
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      rotateX: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 65,
        damping: 16,
      },
    },
  },
];

function AnimatedSection({ children, index }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: false });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [inView, controls]);

  const variant = variants[index % variants.length];

  return (
    <motion.div
      ref={ref}
      variants={variant}
      initial="hidden"
      animate={controls}
      className="overflow-hidden"
    >
      {children}
    </motion.div>
  );
}

function StaggeredWrapper({ children }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.2 },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export default function LandingPage() {
  const { theme } = useTheme();

  const sections = [
    HeroSection,
    () => (
      <StaggeredWrapper>
        <FeaturesSection />
      </StaggeredWrapper>
    ),
    CategoriesSection,
    UserFeedback,
    () => (
      <StaggeredWrapper>
        <TestimonialsSection />
      </StaggeredWrapper>
    ),
    CallToActionSection,
  ];

  return (
    <div
      className={`${theme} min-h-screen bg-background text-foreground font-sans relative overflow-x-hidden`}
    >
      <Header />
      {sections.map((Section, idx) => (
        <AnimatedSection key={idx} index={idx}>
          <Section />
        </AnimatedSection>
      ))}
      <Footer />
    </div>
  );
}
