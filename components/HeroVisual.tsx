"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const RAY_COUNT = 20;

export default function HeroVisual() {
  const prefersReducedMotion = useReducedMotion();

  // Derive a short monogram from the store name, e.g. "BYSIMON GIFTS" -> "BG"
  const monogram = siteConfig.storeName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div className="relative flex aspect-[4/5] items-center justify-center sm:aspect-square">
      {/* Gallery-style corner frame marks */}
      <div className="absolute left-4 top-4 h-6 w-6 border-l border-t border-brass sm:left-6 sm:top-6" />
      <div className="absolute right-4 top-4 h-6 w-6 border-r border-t border-brass sm:right-6 sm:top-6" />
      <div className="absolute bottom-4 left-4 h-6 w-6 border-b border-l border-brass sm:bottom-6 sm:left-6" />
      <div className="absolute bottom-4 right-4 h-6 w-6 border-b border-r border-brass sm:bottom-6 sm:right-6" />

      {/* Rotating layer: sunburst rays + outer ring */}
      <motion.div
        className="absolute flex h-56 w-56 items-center justify-center sm:h-64 sm:w-64"
        animate={prefersReducedMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
      >
        {Array.from({ length: RAY_COUNT }).map((_, i) => (
          <div
            key={i}
            className={`absolute left-1/2 top-1/2 h-4 w-px origin-top ${
              i % 2 === 0 ? "bg-brass" : "bg-brass/40"
            }`}
            style={{ transform: `rotate(${(360 / RAY_COUNT) * i}deg) translateY(96px)` }}
          />
        ))}
        <div className="h-44 w-44 rounded-full border border-brass sm:h-52 sm:w-52" />
      </motion.div>

      {/* Static medallion centerpiece - floats gently, does not rotate */}
      <motion.div
        className="relative flex h-36 w-36 items-center justify-center rounded-full border-2 border-brass-light bg-forest shadow-xl sm:h-40 sm:w-40"
        animate={prefersReducedMotion ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex flex-col items-center">
          <span className="font-display text-4xl italic leading-none text-brass-light sm:text-5xl">
            {monogram}
          </span>
          <span className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.35em] text-brass">
            Gifts
          </span>
        </div>
      </motion.div>

      {/* Sparkle accents */}
      <motion.div
        animate={prefersReducedMotion ? undefined : { opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-8 top-10 sm:right-10"
      >
        <Sparkles className="h-4 w-4 text-brass" strokeWidth={1.5} />
      </motion.div>
      <motion.div
        animate={prefersReducedMotion ? undefined : { opacity: [0.3, 0.9, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        className="absolute bottom-14 left-8 sm:left-10"
      >
        <Sparkles className="h-3 w-3 text-forest-dark" strokeWidth={1.5} />
      </motion.div>

      {/* Numbered edition tag */}
      <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-charcoal px-3.5 py-1.5 shadow-lg">
        <span className="font-mono text-[10px] tracking-wide text-brass-light">No. 001</span>
        <span className="h-1 w-1 rounded-full bg-brass" />
        <span className="font-mono text-[10px] tracking-wide text-brass-light">Curated 2026</span>
      </div>
    </div>
  );
}