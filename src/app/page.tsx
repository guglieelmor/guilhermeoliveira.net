"use client";

import Curriculum from "@/components/cv/curriculum";
import Container from "@/components/layout/container";
import SectionSocial from "@/components/section/SectionSocial"; 
// import SectionAbout from "@/components/section/SectionAbout";
// import SectionForMe from "@/components/section/SectionForMe";

export default function Home() { 
  return (
    <Container>
      <Curriculum />
      {/* <SectionForMe /> */}
      {/* <SectionAbout /> */}
      {/* <SectionSocial /> */}
    </Container>
  );
}
