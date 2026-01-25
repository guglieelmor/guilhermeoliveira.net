"use client";

import Curriculum from "@/components/cv/curriculum";
import Container from "@/components/layout/container";
import SectionAbout from "@/components/section/SectionAbout";
import SectionForMe from "@/components/section/SectionForMe";
import SectionSocial from "@/components/section/SectionSocial";
 
export default function Home() { 
  return (
    <Container>
      <Curriculum />
      {/* <SectionForMe /> */}
      {/* <SectionAbout /> */}
      <SectionSocial />
    </Container>
  );
}
