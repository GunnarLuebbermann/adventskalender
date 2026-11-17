// 🎨 Farbschemata des Kalenders.
// Zum Wechseln einfach ACTIVE_THEME ändern – alle Seiten, App-Icon und
// WhatsApp-Vorschau übernehmen die Farben automatisch.
// Gold (Rahmen, Buttons, Schrift) bleibt in allen Varianten gleich.

export type Palette = {
  /** Hintergrund, von ganz dunkel (bg0) bis hell (bg4) */
  bg0: string;
  bg1: string;
  bg2: string;
  bg3: string;
  bg4: string;
  /** Türchen: offen, noch nicht angeschaut (Verlauf) */
  door1: string;
  door2: string;
  /** Türchen: schon angeschaut (Verlauf) */
  opened1: string;
  opened2: string;
  /** Türchen: noch gesperrt */
  locked: string;
  lockedBorder: string;
};

export const palettes = {
  /** 2025: klassisches Weihnachtsrot */
  rot: {
    bg0: "#2c0d0d",
    bg1: "#3b0a0a",
    bg2: "#5e1515",
    bg3: "#8a1d1d",
    bg4: "#b32a2a",
    door1: "#a00000",
    door2: "#e03b3b",
    opened1: "#7a1010",
    opened2: "#a83030",
    locked: "#3d0b0b",
    lockedBorder: "#5a1d1d",
  },
  /** Tannengrün mit Gold */
  tanne: {
    bg0: "#071a11",
    bg1: "#0b2618",
    bg2: "#123d27",
    bg3: "#1a5637",
    bg4: "#237047",
    door1: "#17663f",
    door2: "#2f9461",
    opened1: "#114a2e",
    opened2: "#1d6a43",
    locked: "#0a2116",
    lockedBorder: "#1d4a33",
  },
  /** Mitternachtsblau – goldene Sterne am Nachthimmel */
  nacht: {
    bg0: "#060b1f",
    bg1: "#0b1430",
    bg2: "#14224f",
    bg3: "#1f336f",
    bg4: "#2c4590",
    door1: "#1e3a8a",
    door2: "#3a5fc8",
    opened1: "#172c66",
    opened2: "#26428f",
    locked: "#0a1230",
    lockedBorder: "#22305e",
  },
  /** Beere / Pflaume – warm und etwas edler */
  beere: {
    bg0: "#1a0819",
    bg1: "#270c25",
    bg2: "#3f1440",
    bg3: "#5b1d5a",
    bg4: "#782775",
    door1: "#7a1f6e",
    door2: "#ad3d9a",
    opened1: "#5a1752",
    opened2: "#802c72",
    locked: "#260b24",
    lockedBorder: "#4a1a46",
  },
} satisfies Record<string, Palette>;

export type ThemeName = keyof typeof palettes;

export const ACTIVE_THEME: ThemeName = "tanne";

// NEXT_PUBLIC_THEME erlaubt zum Ausprobieren einen anderen Build, ohne den Code zu ändern
const envTheme = process.env.NEXT_PUBLIC_THEME as ThemeName | undefined;
export const theme: Palette = palettes[envTheme && envTheme in palettes ? envTheme : ACTIVE_THEME];

/** Gold-Töne (für alle Farbschemata gleich) */
export const gold = { base: "#d4af37", light: "#f5d76e", dark: "#b8912b" };

/** CSS-Variablen für <html style>, genutzt von den Tailwind-Farben in globals.css */
export function themeCssVars(): Record<string, string> {
  return {
    "--bg-0": theme.bg0,
    "--bg-1": theme.bg1,
    "--bg-2": theme.bg2,
    "--bg-3": theme.bg3,
    "--bg-4": theme.bg4,
    "--door-1": theme.door1,
    "--door-2": theme.door2,
    "--opened-1": theme.opened1,
    "--opened-2": theme.opened2,
    "--locked": theme.locked,
    "--locked-border": theme.lockedBorder,
  };
}
