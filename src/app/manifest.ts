import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Guilherme Oliveira - Tech Lead | Software Engineer | Full Stack | SRE",
    short_name: "Guilherme Oliveira",
    description:
      "Tech Lead, professor e desenvolvedor full stack construindo produtos robustos e escaláveis.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
    ],
  };
}
