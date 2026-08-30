"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export default function HeroParallaxBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Each blob moves at a different speed for a gentle layered-depth feel.
  const slow = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 60]);
  const medium = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 120]);
  const fast = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 180]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <motion.div
        style={{ y: slow }}
        className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-brass/40 blur-[90px]"
      />
      <motion.div
        style={{ y: medium }}
        className="absolute right-[-6rem] top-8 h-80 w-80 rounded-full bg-rose/50 blur-[90px]"
      />
      <motion.div
        style={{ y: fast }}
        className="absolute left-1/4 top-[26rem] h-72 w-72 rounded-full bg-forest/25 blur-[90px]"
      />
    </div>
  );
}
