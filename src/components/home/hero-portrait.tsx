"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { profile } from "@/lib/profile";

const badges = ["Tech Lead", "Full Stack", "SRE", "Professor"];

const badgePositions = [
  "-top-2 -left-4 md:-left-10",
  "top-6 -right-4 md:-right-10",
  "-bottom-2 -left-6 md:-left-12",
  "bottom-8 -right-2 md:-right-8",
];

export default function HeroPortrait() {
  const mvX = useMotionValue(0.5);
  const mvY = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(mvY, [0, 1], [8, -8]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mvX, [0, 1], [-8, 8]), {
    stiffness: 150,
    damping: 20,
  });

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    mvX.set((event.clientX - rect.left) / rect.width);
    mvY.set((event.clientY - rect.top) / rect.height);
  };

  const handleLeave = () => {
    mvX.set(0.5);
    mvY.set(0.5);
  };

  return (
    <div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative flex h-48 w-48 items-center justify-center sm:h-56 sm:w-56 md:h-72 md:w-72"
    >
      <div
        className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500/40 via-fuchsia-500/30 to-blue-500/30 blur-3xl"
        style={{ animation: "glow-pulse 6s ease-in-out infinite" }}
      />

      <motion.div
        style={{ rotateX, rotateY, transformPerspective: 700 }}
        className="relative h-full w-full"
      >
        <div
          className="absolute inset-[-6px] rounded-full opacity-80"
          style={{
            background:
              "conic-gradient(from 0deg, #a78bfa, #f472b6, #60a5fa, #a78bfa)",
            animation: "badge-spin 10s linear infinite",
          }}
        />
        <div className="absolute inset-[3px] rounded-full bg-background" />
        <Image
          alt={profile.name}
          src={profile.avatar}
          width={288}
          height={288}
          priority
          className="relative h-full w-full rounded-full border border-black/10 object-cover dark:border-white/10"
        />
      </motion.div>

      {badges.map((label, index) => (
        <motion.span
          key={label}
          className={`font-display absolute rounded-full border border-black/10 bg-background/80 px-3 py-1.5 text-[0.55rem] tracking-[0.1em] whitespace-nowrap text-foreground uppercase backdrop-blur-sm dark:border-white/10 ${badgePositions[index % badgePositions.length]}`}
          animate={{ y: [0, -8, 0] }}
          transition={{
            duration: 4 + index,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.4,
          }}
        >
          {label}
        </motion.span>
      ))}
    </div>
  );
}
