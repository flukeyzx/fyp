"use client";
import React, { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function FeaturesSection() {
  const features = [
    {
      title: "Smart Job Matching",
      description: "Our algorithm finds the perfect fit for your career goals.",
      lightImage: "/icons/featureicons/smartjob.png",
      darkImage: "/icons/featureicons/smartjob-dark.png",
    },
    {
      title: "Verified Companies",
      description:
        "All employers are vetted for authenticity and professionalism.",
      lightImage: "/icons/featureicons/verifiedcompany.png",
      darkImage: "/icons/featureicons/verifiedcompany-dark.png",
    },
    {
      title: "Career Community",
      description: "Join forums, get tips, and grow your professional network.",
      lightImage: "/icons/featureicons/carriercommunity.png",
      darkImage: "/icons/featureicons/carrercommunity-dark.png",
    },
  ];

  const controls = features.map(() => useAnimation());
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: false });

  useEffect(() => {
    controls.forEach((ctrl, i) => {
      if (inView) {
        ctrl.start({
          opacity: 1,
          scale: 1,
          transition: {
            type: "spring",
            stiffness: 80,
            damping: 12,
            delay: 0.3 + i * 0.15,
          },
        });
      } else {
        ctrl.start({ opacity: 0, scale: 0.8, transition: { duration: 0.3 } });
      }
    });
  }, [inView, controls]);

  return (
    <section id="features" className="py-20 px-6 bg-background" ref={ref}>
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold text-foreground">
          Why Choose Joblix?
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {features.map((feat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={controls[i]}
          >
            <Card className="p-6 text-center shadow-md h-60 flex flex-col justify-between items-center bg-card">
              <div className="w-[50px] h-[50px] mb-4 rounded-md flex items-center justify-center">
                <img
                  src={feat.lightImage}
                  alt={feat.title}
                  className="w-[40px] h-[40px] object-contain dark:hidden"
                />
                <img
                  src={feat.darkImage}
                  alt={feat.title}
                  className="w-[40px] h-[40px] object-contain hidden dark:block"
                />
              </div>
              <h4 className="font-semibold text-xl mb-2 text-foreground">
                {feat.title}
              </h4>
              <p className="text-muted-foreground text-sm">
                {feat.description}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
