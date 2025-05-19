import jobCategories from "@/lib/jobCategories";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import React, { useEffect } from "react";

export default function CategoriesSection() {
  const cats = jobCategories.slice(0, 4);
  const controls = cats.map(() => useAnimation());
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: false });

  useEffect(() => {
    controls.forEach((ctrl, i) => {
      if (inView) {
        ctrl.start({
          opacity: 1,
          y: 0,
          transition: {
            type: "spring",
            stiffness: 75,
            damping: 14,
            delay: 0.2 + i * 0.1,
          },
        });
      } else {
        ctrl.start({
          opacity: 0,
          y: 50,
          transition: { duration: 0.3 },
        });
      }
    });
  }, [inView, controls]);

  return (
    <section
      id="categories"
      className="py-16 bg-background text-foreground"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-10">Job Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {cats.map((category, i) => (
            <motion.a
              key={category.id}
              href={category.link}
              className="bg-card text-card-foreground rounded-2xl overflow-hidden shadow-md hover:-translate-y-1 hover:shadow-lg transition-transform"
              initial={{ opacity: 0, y: 50 }}
              animate={controls[i]}
            >
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-1">{category.title}</h3>
                <p className="text-sm">{category.description}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
