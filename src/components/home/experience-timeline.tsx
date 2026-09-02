"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { Reveal } from "@/components/ui/reveal";
import { companyTenure, formatPeriod } from "@/lib/utils";
import { profile } from "@/lib/profile";

type ExperienceRole = (typeof profile.experience)[number];
type ExperienceGroup = { company: string; roles: ExperienceRole[] };

export default function ExperienceTimeline({
  groups,
}: {
  groups: ExperienceGroup[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.6"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={containerRef} className="relative">
      <div
        aria-hidden="true"
        className="absolute top-2 bottom-2 left-[5px] w-px bg-border"
      />
      <motion.div
        aria-hidden="true"
        style={{ scaleY: lineScale }}
        className="absolute top-2 bottom-2 left-[5px] w-px origin-top bg-blue-500 dark:bg-blue-400"
      />

      <div className="flex flex-col gap-10">
        {groups.map((group, index) => (
          <Reveal key={group.company} delay={index * 0.08} className="pl-8">
            <div className="relative">
              <span
                aria-hidden="true"
                className="absolute top-1.5 -left-8 h-[11px] w-[11px] rounded-full border-2 border-blue-500 bg-background dark:border-blue-400"
              />

              <div className="flex flex-wrap items-center gap-3">
                <Image
                  src={group.roles[0].image}
                  alt={group.company}
                  width={28}
                  height={28}
                  className="h-7 w-7 shrink-0 rounded-md border border-border object-cover"
                />
                <p className="text-sm font-medium text-foreground">
                  {group.company} · {group.roles[0].location}
                </p>
                <p className="font-mono text-xs text-muted-foreground">
                  {companyTenure(group.roles)}
                </p>
              </div>

              <div className="mt-5 flex flex-col gap-6 border-l border-border pl-5">
                {group.roles.map((role) => (
                  <div key={role.role}>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <h3 className="font-display text-sm text-foreground md:text-base">
                        {role.role}
                      </h3>
                      <span
                        className={`font-mono text-[0.6rem] tracking-[0.1em] uppercase ${
                          role.end
                            ? "text-muted-foreground/60"
                            : "text-blue-600 dark:text-blue-400"
                        }`}
                      >
                        {role.end ? "concluído" : "em andamento"}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {formatPeriod(role.start, role.end)}
                    </p>
                    <p className="mt-3 leading-relaxed text-muted-foreground">
                      {role.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {role.tags.slice(0, 6).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-border px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
