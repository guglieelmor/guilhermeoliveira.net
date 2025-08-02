"use client";

import { useEffect, useState } from "react";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";

const formatDate = (data: Date) => {
  const hours = String(data.getHours()).padStart(2, "0");
  const minutes = String(data.getMinutes()).padStart(2, "0");
  const seconds = String(data.getSeconds()).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};

export default function Footer() {
  const data = new Date();
  const [now, setNow] = useState(data);
  const year = data.getFullYear();

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-black dark:bg-white dark:text-black light:text-white">
      <div className="container mx-auto">
        <footer>
          <div>
            <div className="h-[50rem] flex items-center justify-center">
              <TextHoverEffect text="Gulliver" />
            </div>
          </div>
          <div className="flex flex-col items-center justify-between py-32 text-muted-foreground md:flex-row bordered-div-padding space-x-6 text-sm mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div>© guilhermeoliveira.net {year}</div>
            <div>Time → {formatDate(now)}</div>
            <div>Gulliver</div>
          </div>
        </footer>
      </div>
    </section>
  );
}
