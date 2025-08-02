"use client";

import SectionForMe from "@/components/pages/index/SectionForMe"; 

export default function Home() {
  return (
    <main className="bordered-div-padding text-muted-foreground space-x-6 border-x border-b text-sm mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-between">
      <div className="container">
        <SectionForMe /> 
      </div>
    </main>
  );
}
