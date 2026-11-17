// Deterministischer "Zufall" (0–1) aus Index + Kanal.
// Rein (pure) → gleiche Werte auf Server und Client, kein Math.random im Render.
export function pseudoRandom(index: number, channel = 0): number {
  const x = Math.sin(index * 12.9898 + channel * 78.233) * 43758.5453;
  return x - Math.floor(x);
}
