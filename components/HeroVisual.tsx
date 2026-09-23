"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, Gift } from "lucide-react";

const RAY_COUNT = 16;

export default function HeroVisual() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden sm:aspect-square">
      {/* Ambient glow */}
      <motion.div
        className="absolute h-72 w-72 rounded-full bg-brass/10 blur-3xl sm:h-96 sm:w-96"
        animate={
          prefersReducedMotion
            ? undefined
            : {
                scale: [1, 1.15, 1],
                opacity: [0.3, 0.55, 0.3],
              }
        }
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Corner frame */}
      <div className="absolute left-4 top-4 h-7 w-7 border-l border-t border-brass sm:left-6 sm:top-6" />
      <div className="absolute right-4 top-4 h-7 w-7 border-r border-t border-brass sm:right-6 sm:top-6" />
      <div className="absolute bottom-4 left-4 h-7 w-7 border-b border-l border-brass sm:bottom-6 sm:left-6" />
      <div className="absolute bottom-4 right-4 h-7 w-7 border-b border-r border-brass sm:right-6 sm:bottom-6" />

      {/* Rotating rays */}
      <motion.div
        className="absolute flex h-64 w-64 items-center justify-center sm:h-80 sm:w-80"
        animate={
          prefersReducedMotion
            ? undefined
            : {
                rotate: 360,
              }
        }
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {Array.from({ length: RAY_COUNT }).map((_, index) => (
          <div
            key={index}
            className={`absolute left-1/2 top-1/2 h-5 w-px origin-top ${
              index % 2 === 0 ? "bg-brass/50" : "bg-brass/20"
            }`}
            style={{
              transform: `rotate(${(360 / RAY_COUNT) * index}deg) translateY(112px)`,
            }}
          />
        ))}

        <div className="h-52 w-52 rounded-full border border-brass/30 sm:h-64 sm:w-64" />
      </motion.div>

      {/* Second orbit */}
      <motion.div
        className="absolute h-48 w-48 rounded-full border border-brass/20 sm:h-60 sm:w-60"
        animate={
          prefersReducedMotion
            ? undefined
            : {
                rotate: -360,
              }
        }
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-brass" />
      </motion.div>

      {/* Main BYSG centerpiece */}
      <motion.div
        className="relative z-10 flex h-48 w-48 items-center justify-center rounded-full border border-brass/70 bg-forest shadow-xl sm:h-56 sm:w-56"
        animate={
          prefersReducedMotion
            ? undefined
            : {
                y: [0, -9, 0],
              }
        }
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Inner ring */}
        <div className="absolute inset-3 rounded-full border border-brass/20" />

        {/* Inner glow */}
        <div className="absolute inset-8 rounded-full bg-brass/5 blur-2xl" />

        <div className="relative flex flex-col items-center">
          {/* Crown */}
          <motion.span
            className="mb-1 text-lg text-brass-light"
            animate={
              prefersReducedMotion
                ? undefined
                : {
                    opacity: [0.5, 1, 0.5],
                  }
            }
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            ♕
          </motion.span>

          {/* Brand */}
          <span className="font-display text-[3.5rem] font-semibold italic leading-none tracking-[-0.08em] text-brass-light sm:text-[4.5rem]">
            BYSG
          </span>

          {/* Divider */}
          <div className="my-3 flex items-center gap-2">
            <div className="h-px w-7 bg-brass/60" />
            <div className="h-1 w-1 rounded-full bg-brass" />
            <div className="h-px w-7 bg-brass/60" />
          </div>

          {/* Category */}
          <span className="font-mono text-[8px] uppercase tracking-[0.5em] text-brass-light">
            Gifts
          </span>
        </div>
      </motion.div>

      {/* Floating gift icon */}
      <motion.div
        className="absolute bottom-[20%] left-1/2 z-20 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-2xl border border-brass/50 bg-charcoal/90 text-brass shadow-lg backdrop-blur-sm"
        animate={
          prefersReducedMotion
            ? undefined
            : {
                y: [0, -10, 0],
                rotate: [0, 2, -2, 0],
              }
        }
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Gift className="h-7 w-7" strokeWidth={1.2} />
      </motion.div>

      {/* Sparkle 1 */}
      <motion.div
        className="absolute right-8 top-12 sm:right-12"
        animate={
          prefersReducedMotion
            ? undefined
            : {
                opacity: [0.2, 1, 0.2],
                scale: [0.7, 1.2, 0.7],
                rotate: [0, 15, 0],
              }
        }
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Sparkles className="h-5 w-5 text-brass" strokeWidth={1.2} />
      </motion.div>

      {/* Sparkle 2 */}
      <motion.div
        className="absolute bottom-24 left-8 sm:left-12"
        animate={
          prefersReducedMotion
            ? undefined
            : {
                opacity: [0.2, 0.8, 0.2],
                scale: [0.7, 1, 0.7],
              }
        }
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.8,
        }}
      >
        <Sparkles
          className="h-3.5 w-3.5 text-brass-light"
          strokeWidth={1.2}
        />
      </motion.div>

      {/* Edition tag */}
      <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-charcoal px-4 py-1.5 shadow-lg">
        <span className="font-mono text-[9px] tracking-[0.15em] text-brass-light">
          BYSG
        </span>

        <span className="h-1 w-1 rounded-full bg-brass" />

        <span className="font-mono text-[9px] tracking-wide text-brass-light/70">
          SINCE 2025
        </span>
      </div>
    </div>
  );
}