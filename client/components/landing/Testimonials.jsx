"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function ClientsTrustSection() {
  const positions = [
    { top: "50%", left: "50%" },

    { top: "30%", left: "50%" },
    { top: "50%", left: "70%" },
    { top: "70%", left: "50%" },
    { top: "50%", left: "30%" },
    { top: "30%", left: "70%" },

    { top: "30%", left: "30%" },
    { top: "70%", left: "70%" },
    { top: "70%", left: "30%" },
    { top: "20%", left: "50%" },
  ];

  const cards = Array.from({ length: 10 }, (_, idx) => ({
    icon: `/icons/company/icon${(idx % 7) + 1}.svg`,
    position: positions[idx % positions.length],
    zIndex: idx === 0 ? 10 : 1,
    scale: idx === 0 ? 1.2 : 1,
  }));

  const controls = cards.map(() => useAnimation());
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: false });

  useEffect(() => {
    if (inView) {
      controls.forEach((ctrl, i) => {
        ctrl
          .start({
            top: "50%",
            left: "50%",
            x: "-50%",
            y: "-50%",
            scale: 0,
            opacity: 0,
            transition: { duration: 0 },
          })
          .then(() => {
            ctrl.start({
              ...cards[i].position,
              x: 0,
              y: 0,
              scale: cards[i].scale,
              opacity: 1,
              zIndex: cards[i].zIndex,
              transition: {
                type: "spring",
                stiffness: 60,
                damping: 12,
                delay: 0.2 + i * 0.1,
              },
            });
          })
          .then(() => {
            ctrl.start({
              y: [0, -5, 0, 5, 0],
              transition: {
                repeat: Infinity,
                duration: 3 + Math.random() * 2,
                ease: "easeInOut",
              },
            });
          });
      });
    } else {
      controls.forEach((ctrl) =>
        ctrl.start({
          top: "50%",
          left: "50%",
          x: "-50%",
          y: "-50%",
          scale: 0,
          opacity: 0,
          transition: { type: "spring", stiffness: 100, damping: 20 },
        })
      );
    }
  }, [inView, controls, cards]);

  return (
    <section
      ref={ref}
      className="relative py-20 px-6 bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: "url('')",
      }}
    >
      <div className="absolute inset-0 bg-background opacity-0 z-0" />

      <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-4xl font-bold leading-tight">
            Hundreds of Clients <br /> Trust Our{" "}
            <span className="text-primary">Company</span>
          </h2>
          <p className="text-foreground/80">
            Unique layouts, clean designs, pixel-perfect details. Modern
            future-focused digital solutions to grow businesses.
          </p>
          <Button className="bg-gradient-to-r from-secondary/70 via-primary/70 to-primary/90 hover:opacity-90 hover:scale-[1.02] text-background font-semibold px-6 py-3 rounded-lg shadow-md">
            Join Us
          </Button>
        </div>
        <div className="relative h-[500px] w-full">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{
                position: "absolute",
                top: "50%",
                left: "50%",
                x: "-50%",
                y: "-50%",
                scale: 0,
                opacity: 0,
              }}
              animate={controls[idx]}
              style={{
                position: "absolute",
                width: "6rem",
                height: "6rem",
                zIndex: card.zIndex,
                transformOrigin: "center",
              }}
              className="bg-card/25 p-2 rounded-xl backdrop-blur-md flex items-center justify-center border border-white/10"
            >
              <img
                src={card.icon}
                alt="Client logo"
                className="w-full h-full object-contain p-1"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
