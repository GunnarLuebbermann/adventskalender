import type { MetadataRoute } from "next";
import { theme } from "@/lib/theme";

// Macht den Kalender als App installierbar (Homescreen, ohne Browserleiste)
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Isi's Adventskalender",
    short_name: "Advent",
    description: "24 Türchen voller Liebe 💛",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: theme.bg1,
    theme_color: theme.bg1,
    lang: "de",
    icons: [
      { src: "/icon/192", sizes: "192x192", type: "image/png" },
      { src: "/icon/512", sizes: "512x512", type: "image/png" },
      { src: "/icon/512", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
