export default function HeroGlow() {
  return (
    <div
      aria-hidden="true"
      className="hero-glow pointer-events-none absolute inset-x-0 top-0 -z-10 h-[42rem] overflow-hidden"
    >
      <div
        className="absolute top-[-14rem] left-1/2 h-[34rem] w-[50rem] -translate-x-1/2 rounded-full bg-blue-600/25 blur-[110px]"
        style={{ animation: "drift-a 22s ease-in-out infinite" }}
      />
      <div
        className="absolute top-[-8rem] left-[20%] h-[26rem] w-[26rem] rounded-full bg-violet-600/15 blur-[110px]"
        style={{ animation: "drift-b 26s ease-in-out infinite" }}
      />
      <div
        className="absolute top-[-6rem] right-[15%] h-[22rem] w-[22rem] rounded-full bg-cyan-500/10 blur-[110px]"
        style={{ animation: "drift-a 30s ease-in-out infinite reverse" }}
      />
      <div className="absolute inset-0 bg-grid opacity-40" />
    </div>
  );
}
