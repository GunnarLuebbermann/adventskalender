"use client";
import { useEffect, useState } from "react";

export default function Snowfall() {
  const [flakes, setFlakes] = useState<
    { id: number; left: number; size: number; duration: number; delay: number }[]
  >([]);

  useEffect(() => {
    const count = 35; // Anzahl Schneeflocken
    const newFlakes = Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 0.8 + Math.random() * 1.2,
      duration: 8 + Math.random() * 8,
      delay: Math.random() * 10,
    }));
    setFlakes(newFlakes);
  }, []);

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
