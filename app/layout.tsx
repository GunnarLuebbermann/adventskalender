import type { Metadata, Viewport } from "next";
import "./globals.css";
import Snowfall from "./components/Snowfall";
import BackgroundMusic from "./components/BackgroundMusic";
import { theme, themeCssVars } from "@/lib/theme";

const description = "24 Türchen voller Liebe 💛";

export const metadata: Metadata = {
  title: "Isi's Adventskalender",
  description,
  // Auf Vercel wird die Domain automatisch erkannt (VERCEL_PROJECT_PRODUCTION_URL),
  // das Vorschaubild kommt aus app/opengraph-image.tsx
  openGraph: {
    title: "🎄 Isi's Adventskalender",
    description,
    type: "website",
    locale: "de_DE",
  },
  // iPhone: „Zum Home-Bildschirm“ öffnet als App ohne Safari-Leiste
  appleWebApp: {
    capable: true,
    title: "Advent",
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  themeColor: theme.bg1,
  // Inhalt darf bis unter Notch/Statusleiste – Abstände über safe-area in globals.css
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" style={themeCssVars() as React.CSSProperties}>
      <body className="relative bg-gradient-to-b from-bg-1 via-bg-2 to-bg-3 text-white min-h-screen">
        <Snowfall />
        <BackgroundMusic />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
