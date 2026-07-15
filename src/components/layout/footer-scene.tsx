const PIXELS = [
  { x: 4, y: 3, delay: "0s", duration: "5s" },
  { x: 22, y: 7, delay: "1.2s", duration: "6s" },
  { x: 45, y: 2, delay: "2.4s", duration: "4.5s" },
  { x: 68, y: 8, delay: "0.6s", duration: "5.5s" },
  { x: 90, y: 4, delay: "1.8s", duration: "6.5s" },
  { x: 112, y: 6, delay: "3s", duration: "5s" },
  { x: 135, y: 2, delay: "0.9s", duration: "6s" },
  { x: 158, y: 7, delay: "2.1s", duration: "4.8s" },
  { x: 180, y: 3, delay: "1.5s", duration: "5.8s" },
  { x: 196, y: 8, delay: "0.3s", duration: "5.2s" },
];

export default function FooterScene() {
  return (
    <div
      aria-hidden="true"
      className="footer-scene pointer-events-none relative z-10 mx-auto mt-6 h-4 w-full max-w-5xl select-none overflow-hidden"
    >
      <svg
        viewBox="0 0 200 10"
        preserveAspectRatio="none"
        className="h-full w-full text-foreground"
        fill="currentColor"
      >
        {PIXELS.map((pixel, index) => (
          <rect
            key={index}
            x={pixel.x}
            y={pixel.y}
            width="1.2"
            height="1.2"
            style={{
              animation: `footer-scene-twinkle ${pixel.duration} ease-in-out infinite`,
              animationDelay: pixel.delay,
            }}
          />
        ))}
      </svg>
    </div>
  );
}
