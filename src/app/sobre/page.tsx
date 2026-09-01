import type { Metadata } from "next";
import Curriculum from "@/components/cv/curriculum";
import Container from "@/components/layout/container";
import { profile } from "@/lib/profile";

export const metadata: Metadata = {
  title: `Currículo - ${profile.name}`,
  description: profile.summaryShort,
  alternates: {
    canonical: "/sobre",
  },
  openGraph: {
    title: `Currículo - ${profile.name}`,
    description: profile.summaryShort,
  },
  twitter: {
    title: `Currículo - ${profile.name}`,
    description: profile.summaryShort,
  },
};

export default function Sobre() {
  return (
    <Container>
      <Curriculum />
    </Container>
  );
}
