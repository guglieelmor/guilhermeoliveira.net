"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

export default function AuroraBackground() {
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const springX = useSpring(mvX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mvY, { stiffness: 40, damping: 20 });

  const x1 = useTransform(springX, (v) => v * 40);
  const y1 = useTransform(springY, (v) => v * 26);
  const x2 = useTransform(springX, (v) => v * -32);
  const y2 = useTransform(springY, (v) => v * 22);
  const x3 = useTransform(springX, (v) => v * 20);
  const y3 = useTransform(springY, (v) => v * -28);

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      mvX.set((event.clientX / window.innerWidth - 0.5) * 2);
      mvY.set((event.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mvX, mvY]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        style={{ x: x1, y: y1 }}
        className="absolute -top-1/3 -left-1/4 h-[38rem] w-[38rem]"
      >
        <div
          className="h-full w-full rounded-full bg-violet-600/50 blur-[100px]"
          style={{ animation: "aurora-drift-a 24s ease-in-out infinite" }}
        />
      </motion.div>

      <motion.div
        style={{ x: x2, y: y2 }}
        className="absolute -top-1/4 -right-1/4 h-[32rem] w-[32rem]"
      >
        <div
          className="h-full w-full rounded-full bg-fuchsia-500/40 blur-[100px]"
          style={{ animation: "aurora-drift-b 28s ease-in-out infinite" }}
        />
      </motion.div>

      <motion.div
        style={{ x: x3, y: y3 }}
        className="absolute bottom-[-12rem] left-1/3 h-[34rem] w-[34rem]"
      >
        <div
          className="h-full w-full rounded-full bg-blue-500/35 blur-[100px]"
          style={{ animation: "aurora-drift-c 32s ease-in-out infinite" }}
        />
      </motion.div>

      <div className="absolute inset-0 bg-background/20" />
    </div>
  );
}
