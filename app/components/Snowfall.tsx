import { pseudoRandom } from "@/lib/pseudoRandom";

const FLAKE_COUNT = 35; // Anzahl Schneeflocken

const flakes = Array.from({ length: FLAKE_COUNT }, (_, i) => ({
  id: i,
  left: pseudoRandom(i, 0) * 100,
  size: 0.8 + pseudoRandom(i, 1) * 1.2,
  duration: 8 + pseudoRandom(i, 2) * 8,
  delay: pseudoRandom(i, 3) * 10,
}));

export default function Snowfall() {
  return (
    <div className="snowfall">
      {flakes.map((flake) => (
        <span
          key={flake.id}
          className="snowflake"
          style={{
            left: `${flake.left}%`,
            fontSize: `${flake.size}rem`,
            animationDuration: `${flake.duration}s`,
            animationDelay: `${flake.delay}s`,
          }}
        >
          ❄️
        </span>
      ))}
    </div>
  );
}
