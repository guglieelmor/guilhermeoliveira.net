"use client";

import { motion } from "motion/react";

const OFFSETS = {
  up: { x: 0, y: 14 },
  left: { x: -18, y: 0 },
  right: { x: 18, y: 0 },
};

export function Reveal({
  children,
  delay = 0,
  direction = "up",
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: keyof typeof OFFSETS;
  className?: string;
}) {
  const { x, y } = OFFSETS[direction];

  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
