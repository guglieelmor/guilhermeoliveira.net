"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

const PATHS = [
  {
    id: "line-a",
    d: "M 40 220 C 200 60, 350 380, 520 200 S 760 40, 900 220 S 1100 380, 1160 250",
    stroke: "url(#abstract-gradient-a)",
    width: 3,
    opacity: 1,
    glow: "0 0 16px rgba(167,139,250,0.6)",
  },
  {
    id: "line-b",
    d: "M 80 320 C 260 150, 420 350, 600 180 S 860 320, 1040 120",
    stroke: "url(#abstract-gradient-b)",
    width: 2,
    opacity: 0.7,
    glow: "0 0 12px rgba(96,165,250,0.5)",
  },
  {
    id: "line-c",
    d: "M 20 100 C 220 260, 400 40, 600 180 S 900 60, 1180 200",
    stroke: "currentColor",
    width: 1,
    opacity: 0.25,
    dash: "3 8",
  },
  {
    id: "line-d",
    d: "M 0 360 C 300 200, 600 380, 900 180 S 1150 70, 1200 150",
    stroke: "url(#abstract-gradient-b)",
    width: 1.5,
    opacity: 0.35,
  },
];

const TRAVELERS = [
  { path: PATHS[0].d, duration: 8, size: 5, color: "#a78bfa" },
  { path: PATHS[1].d, duration: 11, size: 3.5, color: "#60a5fa" },
  { path: PATHS[3].d, duration: 14, size: 3, color: "#f472b6" },
];

export default function AbstractMark() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "end 35%"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  const mvX = useMotionValue(0.5);
  const mvY = useMotionValue(0.5);
  const springX = useSpring(mvX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mvY, { stiffness: 40, damping: 20 });
  const translateX = useTransform(springX, [0, 1], [-24, 24]);
  const translateY = useTransform(springY, [0, 1], [-16, 16]);

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
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="abstract-mark relative h-[55vh] w-full overflow-hidden sm:h-[65vh]"
    >
      <motion.div
        style={{ x: translateX, y: translateY }}
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0"
      >
        <motion.svg
          style={{ opacity }}
          viewBox="0 0 1200 400"
          preserveAspectRatio="xMidYMid slice"
          className="h-full w-full text-muted-foreground"
          fill="none"
        >
          {PATHS.map((path) => (
            <motion.path
              key={path.id}
              d={path.d}
              stroke={path.stroke}
              strokeOpacity={path.opacity}
              strokeWidth={path.width}
              strokeDasharray={path.dash}
              strokeLinecap="round"
              style={{
                pathLength,
                filter: path.glow ? `drop-shadow(${path.glow})` : undefined,
              }}
            />
          ))}

          {TRAVELERS.map((t, index) => (
            <circle key={index} r={t.size} fill={t.color}>
              <animateMotion
                dur={`${t.duration}s`}
                repeatCount="indefinite"
                path={t.path}
              />
            </circle>
          ))}

          <defs>
            <linearGradient id="abstract-gradient-a" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="50%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#60a5fa" />
            </linearGradient>
            <linearGradient id="abstract-gradient-b" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#a78bfa" />
            </linearGradient>
          </defs>
        </motion.svg>
      </motion.div>
    </div>
  );
}
