import { ImageResponse } from "next/og";
import { gold, theme } from "@/lib/theme";

// Vorschaubild für WhatsApp, iMessage & Co. (wird beim Build erzeugt)
export const alt = "Isi's Adventskalender";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: `linear-gradient(180deg, ${theme.bg1} 0%, ${theme.bg2} 50%, ${theme.bg3} 100%)`,
          color: "#fef08a",
          fontFamily: "Georgia, serif",
          position: "relative",
        }}
      >
        {/* Schneeflocken / Funkeln */}
        {[
          [80, 70, 44], [1080, 90, 52], [180, 480, 36], [1010, 470, 40],
          [600, 40, 30], [330, 160, 26], [880, 200, 30], [520, 560, 28],
        ].map(([x, y, s], i) => (
          <div key={i} style={{ position: "absolute", left: x, top: y, fontSize: s, opacity: 0.6 }}>
            {i % 2 ? "✨" : "❄️"}
          </div>
        ))}

        <div style={{ fontSize: 110, marginBottom: 10 }}>🎁 🎄</div>
        <div style={{ fontSize: 84, fontWeight: 700, textShadow: "0 0 30px rgba(255,215,0,0.5)" }}>
          Isi&apos;s Adventskalender
        </div>
        <div style={{ fontSize: 38, marginTop: 24, color: "#fef9c3", fontStyle: "italic" }}>
          24 Türchen voller Liebe 💛
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 14,
            background: `linear-gradient(90deg, ${gold.dark}, ${gold.light}, ${gold.dark})`,
          }}
        />
      </div>
    ),
    size,
  );
}
