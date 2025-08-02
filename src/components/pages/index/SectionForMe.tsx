"use client";

import { cn } from "@/lib/utils";
import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import ColourfulText from "@/components/ui/colourful-text";

export default function SectionForMe() {
  const words = [
    {
      text: "Tech",
    },
    {
      text: "Lead",
    },
    {
      text: "& ",
    },
    {
      text: "Problem",
    },
    {
      text: "Solver",
    },
  ];

  return (
    <div
      className={cn(
        "absolute inset-0",
        "[background-size:56px_56px]",
        "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
        "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
        "bordered-div-padding relative flex flex-col items-center gap-8 border-x text-center md:gap-10 lg:gap-16 lg:!py-25"
      )}
    >
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>

      <div className="pt-45 max-w-4xl space-y-6 md:space-y-8 lg:space-y-12">
        <div>
          <div className="flex items-center justify-center">
            <DirectionAwareHover
              imageUrl={"/images/gulliver.jpg"}
              className="md:h-40 w-40 h-40 md:w-40  rounded-full"
            >
              <p className="font-normal text-xl">It&apos;s a Me, </p>
              <p className="font-bold text-sm">Gulliver!</p>
            </DirectionAwareHover>
          </div>
        </div>
        <span className="text-2xl md:text-5xl lg:text-[3.9em] font-bold text-center text-black dark:text-white relative z-2 font-sans">
          Full-Stack <ColourfulText text="Developer" />
          <br />
          <TypewriterEffectSmooth
            words={words}
            className="text-2xl md:text-5xl lg:text-6xl font-bold text-center text-black dark:text-white relative z-2 font-sans"
          />
        </span>
        <p className="text-muted-foreground mx-auto max-w-[700px] text-sm leading-relaxed md:text-lg lg:text-xl">
          Muito prazer, eu sou o Guilherme Oliveira, um desenvolvedor full-stack
          apaixonado por tecnologia e inovação.
        </p>
      </div>
    </div>
  );
}
