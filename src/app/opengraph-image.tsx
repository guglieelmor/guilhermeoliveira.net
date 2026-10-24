import { ImageResponse } from "next/og";

export const alt = "Guilherme Oliveira: lidero engenharia, formo engenheiros.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// O hero em miniatura: dois campos e o título atravessando a costura.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", position: "relative", background: "#0a0a0a" }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 315, bottom: 0, background: "#cdbf22" }} />
        <div style={{ position: "absolute", left: 64, top: 48, fontSize: 30, color: "#fafafa", display: "flex" }}>Guilherme Oliveira</div>
        <div
          style={{
            position: "absolute",
            left: 64,
            right: 64,
            top: 180,
            display: "flex",
            flexDirection: "column",
            fontSize: 112,
            lineHeight: 0.92,
            letterSpacing: -5,
            color: "#fafafa",
          }}
        >
          <span>Lidero engenharia.</span>
          <span style={{ color: "#0a0a0a" }}>Formo engenheiros.</span>
        </div>
        <div style={{ position: "absolute", left: 64, bottom: 48, fontSize: 28, color: "#0a0a0a", display: "flex" }}>
          Tech Lead na Brudam · Professor no IFSUL
        </div>
      </div>
    ),
    size,
  );
}
