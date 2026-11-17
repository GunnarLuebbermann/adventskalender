// Gemeinsames Motiv für App-Icon (Homescreen) und Manifest-Icons.
// Wird von app/icon.tsx und app/apple-icon.tsx mit ImageResponse gerendert.
import { gold, theme } from "@/lib/theme";

export default function AppIcon({ size }: { size: number }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(160deg, ${theme.door1} 0%, ${theme.bg2} 60%, ${theme.bg1} 100%)`,
        position: "relative",
      }}
    >
      <div style={{ fontSize: size * 0.58, marginTop: -size * 0.04 }}>🎁</div>
      <div
        style={{
          position: "absolute",
          bottom: size * 0.07,
          fontSize: size * 0.13,
          fontWeight: 700,
          color: gold.light,
          letterSpacing: size * 0.01,
        }}
      >
        24
      </div>
    </div>
  );
}
