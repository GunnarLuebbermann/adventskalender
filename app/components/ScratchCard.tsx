"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { pseudoRandom } from "@/lib/pseudoRandom";
import { gold, theme } from "@/lib/theme";

interface Props {
  children: ReactNode;
  /** Schon früher freigerubbelt → direkt aufgedeckt zeigen */
  alreadyRevealed: boolean;
  onReveal: () => void;
}

const BRUSH_RADIUS = 22;
const REVEAL_THRESHOLD = 0.5; // ab 50 % freigerubbelt komplett aufdecken

export default function ScratchCard({ children, alreadyRevealed, onReveal }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);
  const [revealed, setRevealed] = useState(alreadyRevealed);
  const [celebrate, setCelebrate] = useState(false);

  // Rubbelschicht zeichnen
  useEffect(() => {
    if (revealed) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const dpr = window.devicePixelRatio || 1;
    // offsetWidth statt getBoundingClientRect: unabhängig von der Dreh-Animation der Karte
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, gold.dark);
    gradient.addColorStop(0.5, gold.light);
    gradient.addColorStop(1, gold.dark);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // leichte Glitzer-Struktur
    for (let i = 0; i < 160; i++) {
      ctx.fillStyle = `rgba(255,255,255,${0.15 + pseudoRandom(i, 2) * 0.35})`;
      ctx.fillRect(pseudoRandom(i, 0) * width, pseudoRandom(i, 1) * height, 2, 2);
    }

    ctx.fillStyle = theme.bg1;
    ctx.font = "bold 20px Georgia, serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("✨ Hier rubbeln ✨", width / 2, height / 2);
  }, [revealed]);

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const rect = canvas.getBoundingClientRect();
    const point = { x: clientX - rect.left, y: clientY - rect.top };

    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = BRUSH_RADIUS * 2;
    ctx.lineCap = "round";
    ctx.beginPath();
    const from = lastPoint.current ?? point;
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
    lastPoint.current = point;
  };

  const checkProgress = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let cleared = 0;
    // nur jedes 16. Pixel prüfen – reicht völlig und ist schnell
    for (let i = 3; i < data.length; i += 64) if (data[i] === 0) cleared++;
    if (cleared / (data.length / 64) >= REVEAL_THRESHOLD) {
      setRevealed(true);
      setCelebrate(true);
      onReveal();
    }
  };

  return (
    <div ref={containerRef} className="relative mt-6 rounded-2xl overflow-hidden select-none">
      {children}

      {!revealed && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full cursor-pointer"
          style={{ touchAction: "none" }}
          onPointerDown={(e) => {
            drawing.current = true;
            lastPoint.current = null;
            e.currentTarget.setPointerCapture(e.pointerId);
            scratch(e.clientX, e.clientY);
          }}
          onPointerMove={(e) => drawing.current && scratch(e.clientX, e.clientY)}
          onPointerUp={() => {
            drawing.current = false;
            checkProgress();
          }}
          onPointerCancel={() => (drawing.current = false)}
        />
      )}

      {celebrate && (
        <motion.div
          className="pointer-events-none absolute inset-0 flex items-center justify-center text-5xl"
          initial={{ opacity: 1, scale: 0.5 }}
          animate={{ opacity: 0, scale: 2 }}
          transition={{ duration: 1.2 }}
        >
          🎉
        </motion.div>
      )}
    </div>
  );
}
